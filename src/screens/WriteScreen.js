// WriteScreen.js
import React, { useContext, useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
// 중요: 아래 라이브러리를 임포트
import { Dropdown } from "react-native-element-dropdown";
import { DataContext } from "../../DataContext";
import { Button } from "react-native-web";

export default function WriteScreen() {
  // DataContext에서 데이터 가져옴
  const { centerData, outerData, allDetailGoals } = useContext(DataContext);

  // 선택된 값 상태
  const [selectedSubGoal, setSelectedSubGoal] = useState("");
  const [selectedDetailGoal, setSelectedDetailGoal] = useState("");

  const [diaryText, setDiaryText] = useState("");

  // react-native-element-dropdown은 data 배열의 각 아이템이 {label, value} 형태를 권장
  // => outerData / allDetailGoals를 변환해서 사용
  const subGoalsData = useMemo(
    () =>
      outerData.map((sg, i) => ({
        label: sg.sub_goal || "(없음)",
        value: sg.sub_goal || "",
      })),
    [outerData]
  );

  const detailGoalsData = useMemo(
    () =>
      allDetailGoals.map((dg, i) => ({
        label: dg.det_goal || "(없음)",
        value: dg.det_goal || "",
      })),
    [allDetailGoals]
  );

  return (
    <View style={styles.container}>
      {/* 상단 문구 */}
      <Text style={styles.title}>
        <Text style={{ color: "#0077ff" }}>{centerData}</Text>, 달성해볼까요?
      </Text>

      {/* 1) 주요 목표 드롭다운 */}
      <Text style={styles.label}>주요 목표를 선택하세요.</Text>
      <Dropdown
        style={styles.dropdown}
        containerStyle={styles.dropdownContainer}
        data={subGoalsData}
        labelField="label"
        valueField="value"
        placeholder="(선택하세요)"
        value={selectedSubGoal}
        onChange={(item) => {
          setSelectedSubGoal(item.value);
        }}
      />

      {/* 2) 세부 목표 드롭다운 */}
      <Text style={styles.label}>세부 목표를 선택하세요.</Text>
      <Dropdown
        style={styles.dropdown}
        containerStyle={styles.dropdownContainer}
        data={detailGoalsData}
        labelField="label"
        valueField="value"
        placeholder="(선택하세요)"
        value={selectedDetailGoal}
        onChange={(item) => {
          setSelectedDetailGoal(item.value);
        }}
      />
      {/* 세부 목표를 선택했을 때만 3줄 일기 작성 TextInput 표시 */}
      {selectedDetailGoal ? (
        <View style={styles.diaryContainer}>
          <Text style={styles.label}>세 줄 일기를 작성해 보세요.</Text>
          <View style={styles.grid}>
            <TextInput
              style={styles.selectedText}
              multiline
              numberOfLines={3}
              placeholder="예) 오늘은 이 목표를 위해 간단한 준비를 했다..."
              value={diaryText}
              onChangeText={(text) => setDiaryText(text)}
            />
          </View>
          <TouchableOpacity style={styles.deleteButton}>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>작성하기</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

// 스타일
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontWeight: "600",
    marginBottom: 5,
  },
  // 드롭다운 자체
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 20,
    height: 40,
    justifyContent: "center",
  },
  // 드롭다운 옵션(메뉴) container 스타일
  dropdownContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
  },
  selectedText: {
    marginTop: 10,
    fontSize: 16,
  },
  grid: {
    paddingHorizontal: 8,
    marginBottom: 20,
    height: 160,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 5, // For shadow on Android
    shadowColor: "#000", // For shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  deleteButton: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#0077ff",
    paddingVertical: 5,
    alignItems: "flex-end",
    paddingHorizontal: 10,
    alignSelf: "flex-end",
    borderRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1, // Shadow transparency
    shadowRadius: 4, // Shadow blur radius
    elevation: 4, // Shadow for Android
  },
});
