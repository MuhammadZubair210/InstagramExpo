import uuid from "uuid";

import shrinkImageAsync from "./utils/shrinkImageAsync";
import uploadPhoto from "./utils/uploadPhoto";

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

const collectionName = "posts";
var Totalposts = []
class Fire {
  constructor() {
    firebase.initializeApp({
      apiKey: "AIzaSyDiH0B8iJih4bB0qAvz8JOYBvfsYhA_do0",
      authDomain: "campus-b3198.firebaseapp.com",
      databaseURL: "https://campus-b3198.firebaseio.com",
      projectId: "campus-b3198",
      storageBucket: "campus-b3198.appspot.com",
      messagingSenderId: "269991644581"
    });
    // Some nonsense...
    firebase.firestore().settings({ timestampsInSnapshots: true });

    // Listen for auth
    firebase.auth().onAuthStateChanged(async user => {
      if (!user) {
        await firebase.auth().signInAnonymously();
      }
    });
  }
  // Download Data
  getPaged = async ({ size, start }) => {
    let ref = this.collection.orderBy("timestamp", "desc").limit(size);
    // let ref = this.collection.orderBy("timestamp", "desc");

    try {
      if (start) {
        ref = ref.startAfter(start);
      }

      const querySnapshot = await ref.get();
      const data = [];
      querySnapshot.forEach(function(doc) {
        if (doc.exists) {
          const post = doc.data() || {};

          // Reduce the name
          const user = post.user || {};

          const name = user.deviceName;
          const reduced = {
            key: doc.id,
            name: (name || "Secret Duck").trim(),
            ...post
          };
          data.push(reduced);
          Totalposts = data
        }
      });

      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      // this.getLatest(data)
      return { data, cursor: lastVisible };
    } catch ({ message }) {
      alert(message);
    }
  };

  getLatest = (array) => {
    console.log("arrayarrayarrayarrayarray",array)
    // return 
  }

  getUserPhotos = async ()=>{
    let ref = this.collectionUser.where("uid", "==", firebase.auth().currentUser.uid)
    let name;
    try {
        
        const querySnapshot = await ref.get();
        const data = null;
        let name = ""
      querySnapshot.forEach(function(doc) {

        data = doc.data().photos
        name = doc.data().username
      });
      return  {data:data, name:name} ;
    } catch ({ message }) {
      alert(message);
    }
  }

  // Upload Data
  uploadPhotoAsync = async uri => {
    const path = `${collectionName}/${this.uid}/${uuid.v4()}.jpg`;
    return uploadPhoto(uri, path);
  };

  post = async ({ text, image: localUri }) => {
    try {
      const { uri: reducedImage, width, height } = await shrinkImageAsync(
        localUri
      );

      let that = this;

      const remoteUri = await this.uploadPhotoAsync(reducedImage);
      this.collectionUser
        .where("uid", "==", firebase.auth().currentUser.uid)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            let obj = {
              text,
              uid: that.uid,
              timestamp: that.timestamp,
              imageWidth: width,
              imageHeight: height,
              image: remoteUri,
              like:0,
              likedby:[],
              user: { deviceName: doc.data().username }
            };
            that.collection
              .add(obj)
              .then(s => {

                that.collection.doc(s.id).update({key: s.id})
                that.collectionUser
                  .doc(doc.data().uid)
                  .get()
                  .then(function(querySnapshott) {
                    let array = [];
                    array = querySnapshott.data().photos;
                    array.push(obj);
                    that.collectionUser
                      .doc(doc.data().uid)
                      .update({ photos: array });
                  });
              });
          });
        })
        .catch(function(error) {
        });
    } catch ({ message }) {
      alert(message);
    }
  };

  users = async ({ uid, username, email }) => {
    try {

      this.collectionUser.doc(uid).set({
        uid: uid,
        username: username,
        email: email,
        photos: [],
        likes:[]
      });
    } catch ({ message }) {
      alert(message);
    }
  };

  like = async (id,posts) => {
    this.collection.doc(posts[id].ikey).get().then(success=>{
       let num =  Number (success.data().like);
       let array = [] 
       array  = success.data().likedby;
       array.push({uid: firebase.auth().currentUser.uid})
        this.collection.doc(posts[id].ikey).update({like:num+1, likedby: array})
        .then(e=>{
          console.log(e)

          
        })
        .catch(e=>{
          console.log("e",e)
        })
    })
  };

  // Helpers
  get collection() {
    return firebase.firestore().collection(collectionName);
  }

  get collectionUser() {
    return firebase.firestore().collection("users");
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
  get timestamp() {
    return Date.now();
  }
}

Fire.shared = new Fire();
export default Fire;
