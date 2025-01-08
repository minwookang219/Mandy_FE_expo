import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import axios from "axios";
import { useContext } from "react";
import { DataContext } from "../../DataContext";

export default function InitialScreen({ handleLogin }) {
  const { setId } = useContext(DataContext);
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://143.248.228.45:8000/register/", {
        username,
        email,
        password,
      });
      if (response.data.success) {
        Alert.alert("회원가입 성공", response.data.message);
        setIsLogin(true);
      } else {
        Alert.alert("회원가입 실패", response.data.message);
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
      Alert.alert("회원가입 실패", "오류가 발생했습니다.");
    }
  };

  const handleAttempt = async () => {
    try {
      const response = await axios.post("http://143.248.228.45:8000/login/", {
        email,
        password,
      });
      if (response.data.success) {
        Alert.alert("로그인 성공", response.data.message);
        handleLogin(); // App.js의 handleLogin_screen 호출
      } else {
        Alert.alert("로그인 실패", response.data.message);
      }
    } catch (error) {
      console.error("로그인 오류:", error.message);
      Alert.alert("로그인 실패", "오류가 발생했습니다.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? "로그인" : "회원가입"}</Text>

      {!isLogin && (
        <TextInput
          style={styles.input}
          placeholder="사용자 이름"
          value={username}
          onChangeText={setUsername}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="이메일"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title={isLogin ? "로그인" : "회원가입"}
        onPress={isLogin ? handleAttempt : handleRegister}
      />
      <Button
        title={isLogin ? "회원가입으로 이동" : "로그인으로 이동"}
        onPress={() => setIsLogin(!isLogin)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});
