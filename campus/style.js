import {Dimensions} from "react-native";
const { width } = Dimensions.get("window");

export default {

containerView: {
  flex: 1,
},
loginScreenContainer: {
  flex: 1,
},
logoText: {
  fontSize: 35,
  fontWeight: "800",
  marginTop: 90,
  marginBottom: 25,
  textAlign: 'center',
},
logoBelowText: {
  fontSize: 25,
  fontWeight: "600",
  marginTop: 10,
  marginBottom: 10,
  textAlign: 'center',
},
loginFormView: {
  flex: 1
},
loginFormTextInput: {
  height: 43,
  fontSize: 14,
  borderRadius: 5,
  borderWidth: 1,
  borderColor: '#eaeaea',
  backgroundColor: '#fafafa',
  paddingLeft: 10,
  marginLeft: 15,
  marginRight: 15,
  marginTop: 5,
  marginBottom: 5,

},
loginButton: {
  backgroundColor: '#3897f1',
  borderRadius: 5,
  height: 45,
  marginTop: 10,
  width:width*0.92,
  alignSelf:"center"
},
RouteButton: {
  backgroundColor: 'green',
  borderRadius: 5,
  height: 45,
  marginTop: 10,
  width:width*0.92,
  alignSelf:"center"
},
fbLoginButton: {
  height: 45,
  marginTop: 10,
  backgroundColor: 'transparent',
},
};