import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SpeechBubble = ({ children, style }) => {
  return (
    <View style={(styles.container, style)}>
      <View style={styles.speechBubble}>
        <Text style={styles.text}>{children}</Text>
      </View>
      <View style={styles.speechBubbleTail} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start", // 말풍선과 꼬리 정렬
    position: "relative", // 꼬리와 말풍선 위치 설정
  },
  speechBubble: {
    width: 200, // 말풍선의 너비 증가
    height: 80,
    padding: 10, // 텍스트 안쪽 여백
    backgroundColor: "#CBE3FF", // 말c풍선의 배경색
    borderRadius: 10, // 둥근 모서리

    justifyContent: "center", // 텍스트 수직 정렬
    alignItems: "center", // 텍스트 수평 정렬
  },
  text: {
    color: "#333", // 텍스트 색상
    fontSize: 20, // 텍스트 크기
    fontWeight: "bold", // 텍스트 굵기
  },
  speechBubbleTail: {
    position: "absolute", // 위치를 말풍선에 상대적으로 배치
    bottom: -10, // 말풍선 아래쪽에 배치
    left: 20, // 말풍선 왼쪽에서 약간 떨어진 위치
    width: 0, // 삼각형의 너비는 없음
    height: 0, // 삼각형의 높이는 없음
    borderTopWidth: 10, // 투명 삼각형의 위쪽
    borderTopColor: "transparent", // 투명 색상
    borderRightWidth: 20, // 오른쪽 삼각형
    borderRightColor: "#CBE3FF", // 말풍선과 같은 색상
    transform: [{ rotate: "180deg" }],
    borderBottomWidth: 10, // 투명 삼각형의 아래쪽
    borderBottomColor: "transparent", // 투명 색상
  },
});

export default SpeechBubble;
