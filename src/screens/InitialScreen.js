import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React from "react";

const InitialScreen = ({ handleLogin }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/splash-icon.png")}
          style={styles.image}
        />
      </View>
      <TouchableOpacity activeOpacity={0.7} onPress={handleLogin}>
        <Text style={styles.button}>로그인</Text>
      </TouchableOpacity>
    </View>
  );
};
const { width } = Dimensions.get("window");

const IMAGE_SIZE = width / 3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  },
  loginContainer: {},
  button: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#ff8585",
    alignSelf: "flex-end",
    alignItems: "flex-end",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1, // Shadow transparency
    shadowRadius: 4, // Shadow blur radius
    elevation: 4, // Shadow for Android
  },
});

export default InitialScreen;
