import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Image,
  Button,
  RefreshControl
} from "react-native";
import Fire from "../Fire";
import firebase from 'firebase'
const { width, height } = Dimensions.get("window");

export default class ProfileScreen extends React.Component {


  state = {
    loaded: true,
    data: null,
    photos: [],
    username: "",
    loading: false,
    profileImg: null
  };

  componentDidMount() {
    this.getUserPhotos();
  }
  getUserPhotos = () => {
    this.setState({ loading: true });
    Fire.shared.getUserPhotos().then(s => {
      this.setState({ photos: s.data, username: s.name, loading: false });
    });
  };

  renderHeader = photos => {
    return (
      <View style={{ padding: 20, flexDirection: "row" }}>
        <View style={styles.profileImage}>
        
          {(photos !== null) ? 
            (photos.length > 0) ? (
            <Image
              resizeMode="cover"
              style={styles.image}
              source={{ uri: photos[photos.length -1].image }}
            />
          ) : <Text />:<Text />}
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 5
          }}
        >
          <View
            style={{
              // borderWidth: 1,
              width: "100%",
              marginLeft: 1,
              alignItems: "center"
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {this.state.username}
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              marginLeft: 1,
              alignItems: "center",
              marginTop:5
            }}
          >
            <Button
              style={{
                backgroundColor: "green",
                width: "100%",
                borderRadius: 5
              }}
              onPress={() => {
                firebase
                  .auth()
                  .signOut()
                  .then(s => {
                    this.props.navigation.navigate("Rt");
                  })
                  .catch();
              }}
              title="Logout"
            />
          </View>
        </View>
      </View>
    );
  };

  renderItem = (item, index) => {
    return (
      <View style={styles.gridImgContainer}>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={{ uri: item.image }}
        />
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader(this.state.photos)}
        <Text style={{ fontSize: 20, fontWeight: "bolder", padding: 10 }}>
          Posts
        </Text>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={this.state.loading}
              onRefresh={this.getUserPhotos}
            />
          }
          numColumns={3}
          data={this.state.photos}
          renderItem={({ item, index }) => this.renderItem(item, index)}
          keyExtractor={item => item.uid}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },

  gridImgContainer: {
    padding: 2.5,
    display: "flex",
    backgroundColor: "#fff"
  },
  profileImage: {
    width: width * 0.2,
    height: width * 0.2,
    borderWidth: 1,
    marginRight: 10
  },
  imgpr: {
    width: width,
    height: width,
    borderRadius: width * 0.5
  },
  image: {
    height: height * 0.18,
    width: height * 0.18
  }
});
