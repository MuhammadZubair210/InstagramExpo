import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Fire from "../Fire";
import firebase from "firebase";
const profileImageSize = 36;
const padding = 12;

export default class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTrue: false,
      totalLikes: this.props.like,
      isDisable: false
    };
    this.checkLikedBy();
  }

  componentDidMount() {
    // console.log(this.props)
    if (!this.props.imageWidth) {
      // Get the size of the web image
      Image.getSize(this.props.image, (width, height) => {
        this.setState({ width, height });
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    nextProps.likedby.filter(s => {
      if (s.uid === firebase.auth().currentUser.uid) {
        this.setState({ isTrue: true });
      }
    });
  }

  checkLikedBy = () => {
    this.props.likedby.filter(s => {
      if (s.uid === firebase.auth().currentUser.uid) {
        this.setState({ isTrue: true });
        this.props._onRefresh();
      }
    });
  };

  likee = i => {
    if (!this.state.isTrue) {
      this.props
        .likefunc(i)
        .then(s => {
          this.checkLikedBy();
          this.setState({
            isTrue: true,
            totalLikes: this.state.totalLikes + 1
          });
        })
        .catch(e => {});
    }
  };

  render() {
    const { text, name, imageWidth, imageHeight, uid, image } = this.props;

    // Reduce the name to something
    const imgW = imageWidth || this.state.width;
    const imgH = imageHeight || this.state.height;
    const aspect = imgW / imgH || 1;

    return (
      <View>
        <Header image={{ uri: image }} name={name} />
        <Image
          resizeMode="contain"
          style={{
            backgroundColor: "#D8D8D8",
            width: "100%",
            aspectRatio: aspect
          }}
          source={{ uri: image }}
        />
        <Metadata
          isDisable={this.state.isDisable}
          totalLikes={this.state.totalLikes}
          isTrue={this.state.isTrue}
          ind={this.props.ind}
          like={this.likee}
          name={name}
          description={text}
        />
      </View>
    );
  }
}

const Metadata = ({ ...props }) => (
  <View style={styles.padding}>
    <IconBar props={props} />
    <Text style={styles.text}>{props.name}</Text>
    <Text style={styles.subtitle}>{props.description}</Text>
  </View>
);

const Header = ({ name, image }) => (
  <View style={[styles.row, styles.padding]}>
    <View style={styles.row}>
      <Image style={styles.avatar} source={image} />
      <Text style={styles.text}>{name}</Text>
    </View>
    <Icon name="ios-more" />
  </View>
);

const Icon = ({ name, isTrue }) => (
  <Ionicons
    style={
      isTrue === true ? { marginRight: 8, color: "red" } : { marginRight: 8 }
    }
    name={name}
    size={26}
    color="black"
  />
);

const IconBar = ({ ...props }) => (
  <View>
    <View style={styles.row}>
      <View style={styles.row}>
        <TouchableOpacity
          disabled={props.props.isDisable}
          onPress={() => {
            props.props.like(props.props.ind);
          }}
        >
          <Icon isTrue={props.props.isTrue} name="ios-heart-outline" />
        </TouchableOpacity>
        <Icon name="ios-chatbubbles-outline" />
        <Icon name="ios-send-outline" />
      </View>
      <Icon name="ios-bookmark-outline" />
    </View>
    <Text style={{ margin: 2, fontWeight: "bold" }}>
      {props.props.totalLikes} Likes
    </Text>
  </View>
);

const styles = StyleSheet.create({
  text: { fontWeight: "600" },
  subtitle: {
    opacity: 0.8
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  padding: {
    padding
  },
  avatar: {
    aspectRatio: 1,
    backgroundColor: "#D8D8D8",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#979797",
    borderRadius: profileImageSize / 2,
    width: profileImageSize,
    height: profileImageSize,
    resizeMode: "cover",
    marginRight: padding
  }
});
