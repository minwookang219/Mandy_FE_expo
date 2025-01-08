import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function GoogleLoginScreen({ navigation }) {
  // Google 로그인 설정
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: "1034784985558-0t1qao5f8m2i65amqb5003akhdud05da.apps.googleusercontent.com", // Google 클라이언트 ID
    scopes: ["profile", "email"], // 최소한의 범위 설정
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      handleGoogleLogin(id_token);
    }
  }, [response]);

  // Google ID 토큰으로 Django 서버와 통신
  const handleGoogleLogin = async (idToken) => {
    try {
      const res = await axios.post("http://143.248.228.45:8000/auth/google/", {
        id_token: idToken,
      });

      const { access_token } = res.data;
      await AsyncStorage.setItem("access_token", access_token);
      Alert.alert("로그인 성공!", "홈 화면으로 이동합니다.");
      navigation.navigate("Home");
    } catch (error) {
      if (error.response) {
        console.error("서버 응답 오류:", error.response.data);
      } else if (error.request) {
        console.error("요청 오류:", error.request);
      } else {
        console.error("기타 오류:", error.message);
      }
      Alert.alert("로그인 실패", "Google 로그인을 확인하세요.");
    }
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Google로 로그인</Text>
      <TouchableOpacity
        style={styles.button}
        disabled={!request}
        onPress={() => {
          promptAsync();
        }}
      >
        <Text style={styles.buttonText}>Google 로그인</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4285F4",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
