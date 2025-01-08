// WriteScreen.js
import React, { useContext, useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { DataContext } from "../../DataContext";
import { useNavigation } from "@react-navigation/native";

export default function WriteScreen() {
  const navigation = useNavigation();
  // DataContext에서 데이터 가져옴
  const { mainGoal, outerData, allDetailGoals } = useContext(DataContext);

  // 선택된 값 상태
  const [selectedDetailGoalId, setSelectedDetailGoalId] = useState(null);
  const [selectedSubGoal, setSelectedSubGoal] = useState("");
  const [selectedDetailGoal, setSelectedDetailGoal] = useState("");

  const [record_content, setRecordContent] = useState("");

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
      allDetailGoals.map((dg) => ({
        label: dg.det_goal || "(없음)",
        value: dg.det_id,
      })),
    [allDetailGoals]
  );

  const handleSubmit = async () => {
    try {
      console.log(selectedDetailGoal);
      const response = await fetch(
        "http://143.248.228.45:8000/achieve/achievements/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            det_id: selectedDetailGoal.det_id, // detailGoal의 ID
            content: record_content, // 작성한 내용
          }),
        }
      );

      if (response.ok) {
        console.log("작성 완료");
        var det_id = selectedDetailGoal.det_id;
        var det_goal = selectedDetailGoal.det_goal;
        console.log(det_id);
        navigation.navigate("Record", { det_id, det_goal });
      } else {
        console.log("작성 실패: 응답 오류", response.status);
      }
    } catch (error) {
      console.log("작성 실패:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* 상단 문구 */}

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
        value={selectedDetailGoalId}
        onChange={(item) => {
          const foundDetailGoal = allDetailGoals.find(
            (dg) => dg.det_id === item.value
          );
          setSelectedDetailGoal(foundDetailGoal);
        }}
      />
      {/* 세부 목표를 선택했을 때만 3줄 일기 작성 TextInput 표시 */}
      {selectedDetailGoal ? (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.diaryContainer}>
            <Text style={styles.label}>세 줄 일기를 작성해 보세요.</Text>
            <View style={styles.grid}>
              <TextInput
                style={styles.selectedText}
                multiline
                numberOfLines={3}
                placeholder="예) 오늘은 이 목표를 위해 간단한 준비를 했다..."
                value={record_content}
                onChangeText={(text) => setRecordContent(text)}
              />
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleSubmit}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                작성하기
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
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
    fontSize: 20,
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
