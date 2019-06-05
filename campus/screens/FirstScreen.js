
import React, { Component } from "react";

import styles from "../style";
import {
  Keyboard,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import { Button } from "react-native-elements";
import firebase from "firebase";
import Fire from "../Fire";

class FirstScreen extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    isLogin: true,
    logged: false
  };


  onSignupPress = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(s => {
        this.setState({isLogin: true})
        Fire.shared
          .users({
            uid: s.user.uid,
            email: this.state.email,
            username: this.state.username
          })
      })
      .catch(e=>{
        Alert.alert(e.message);
      })
  };

  onSigninPress = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(s => {
        this.setState({ logged: true });
        this.props.navigation.navigate("Main")
      })
      .catch(e => {
        Alert.alert(e.message);
      });
  };

  render() {
    
    return (
        <KeyboardAvoidingView style={styles.containerView} behavior="padding">
        {!this.state.isLogin ? (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.loginScreenContainer}>
              <View style={styles.loginFormView}>
                <Text style={styles.logoText}>Campus</Text>
                <Text style={styles.logoBelowText}>Signup</Text>

                <TextInput
                  value={this.state.username}
                  placeholder="Username"
                  placeholderColor="#c4c3cb"
                  style={styles.loginFormTextInput}
                  onChangeText={s => {
                    this.setState({ username: s });
                  }}
                />
                <TextInput
                  value={this.state.email}
                  placeholder="Email"
                  placeholderColor="#c4c3cb"
                  style={styles.loginFormTextInput}
                  onChangeText={s => {
                    this.setState({ email: s });
                  }}
                />
                <TextInput
                  value={this.state.password}
                  placeholder="Password"
                  placeholderColor="#c4c3cb"
                  style={styles.loginFormTextInput}
                  secureTextEntry={true}
                  onChangeText={s => {
                    this.setState({ password: s });
                  }}
                />
                {this.state.email !== "" &&
                this.state.password !== "" &&
                this.state.username !== "" ? (
                  <Button
                    buttonStyle={styles.loginButton}
                    onPress={() => this.onSignupPress()}
                    title="Signup"
                  />
                ) : (
                  <Button
                    disabled
                    buttonStyle={styles.loginButton}
                    onPress={() => this.onSignupPress()}
                    title="Signup"
                  />
                )}

                <Text style={{ alignSelf: "center", marginTop: 2 }}>
                  Already Joined ?
                </Text>
                <Button
                  buttonStyle={styles.RouteButton}
                  onPress={() => this.setState({ isLogin: true })}
                  title="Goto LogIn"
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        ) : (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.loginScreenContainer}>
              <View style={styles.loginFormView}>
                <Text style={styles.logoText}>Campus</Text>
                <Text style={styles.logoBelowText}>Login</Text>
                <TextInput
                  value={this.state.email}
                  placeholder="Email"
                  placeholderColor="#c4c3cb"
                  style={styles.loginFormTextInput}
                  onChangeText={s => {
                    this.setState({ email: s });
                  }}
                />
                <TextInput
                  value={this.state.password}
                  placeholder="Password"
                  placeholderColor="#c4c3cb"
                  style={styles.loginFormTextInput}
                  secureTextEntry={true}
                  onChangeText={s => {
                    this.setState({ password: s });
                  }}
                />
                  {this.state.email !== "" &&
                this.state.password !== "" ? (
                <Button
                  buttonStyle={styles.loginButton}
                  onPress={() => this.onSigninPress()}
                  title="Login"
                />):(
                <Button
                disabled
                  buttonStyle={styles.loginButton}
                  onPress={() => this.onSigninPress()}
                  title="Login"
                />)}

                <Text style={{ alignSelf: "center", marginTop: 2 }}>
                  Didn't Joined Yet ?{" "}
                </Text>
                  <Button
                    buttonStyle={styles.RouteButton}
                    onPress={() => this.setState({ isLogin: false })}
                    title="Join Now"
                  />
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}
      </KeyboardAvoidingView>
    );
  }
}
export default FirstScreen