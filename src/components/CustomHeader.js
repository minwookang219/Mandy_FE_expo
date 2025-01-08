import React from "react";
import { View, StyleSheet } from "react-native";

export default function CustomHeader({ children }) {
  return <View style={styles.headerContainer}>{children}</View>;
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 200, // 헤더 높이
    backgroundColor: "#fff",
    borderRadius: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    justifyContent: "center", // 수직 가운데 정렬
    alignItems: "center", // 수평 가운데 정렬
    paddingHorizontal: 15,
    elevation: 4, // For shadow on Android
    shadowColor: "#444", // For shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});
