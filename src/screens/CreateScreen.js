import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

const CreateScreen = () => {
  const [title, setTitle] = useState("");
  const [mainGoal, setMainGoal] = useState("");
  const [subGoals, setSubGoals] = useState(
    Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      subGoal: "",
      detailGoals: Array.from({ length: 8 }, () => ""),
    }))
  );

  const [currentSubGoalIndex, setCurrentSubGoalIndex] = useState(0); // 현재 Sub Goal Index
  const [currentScreen, setCurrentScreen] = useState("title"); // 현재 화면 상태 (title | subGoals)

  const handleSubGoalChange = (value) => {
    const updatedSubGoals = [...subGoals];
    updatedSubGoals[currentSubGoalIndex].subGoal = value;
    setSubGoals(updatedSubGoals);
  };

  const handleDetailGoalChange = (detailIndex, value) => {
    const updatedSubGoals = [...subGoals];
    updatedSubGoals[currentSubGoalIndex].detailGoals[detailIndex] = value;
    setSubGoals(updatedSubGoals);
  };

  const handleNext = () => {
    if (currentScreen === "title") {
      // 제목 입력 화면에서 Sub Goal 입력 화면으로 전환
      setCurrentScreen("subGoals");
    } else if (currentSubGoalIndex < subGoals.length - 1) {
      // Sub Goal 입력 화면에서 다음 Sub Goal로 전환
      setCurrentSubGoalIndex((prevIndex) => prevIndex + 1);
    } else {
      Alert.alert("알림", "모든 Sub Goal 입력이 완료되었습니다.");
    }
  };

  const handlePrevious = () => {
    if (currentSubGoalIndex > 0) {
      setCurrentSubGoalIndex((prevIndex) => prevIndex - 1); // 이전 Sub Goal로 전환
    } else {
      setCurrentScreen("title"); // Sub Goal 입력 화면에서 제목 입력 화면으로 전환
    }
  };

  const handleSubmit = async () => {
    const payload = {
      title,
      main_goal: mainGoal,
      sub_goals: subGoals.map((sg) => ({
        sub_goal: sg.subGoal,
        detail_goals: sg.detailGoals,
      })),
    };

    try {
      const response = await fetch("http://143.248.228.45:8000/myapp/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        Alert.alert("성공", "만다라트가 성공적으로 생성되었습니다!");
      } else {
        Alert.alert("오류", "만다라트 생성 중 오류가 발생했습니다.");
      }
    } catch (error) {
      Alert.alert("네트워크 오류", "서버와의 연결에 실패했습니다.");
    }
  };

  return (
    <View style={styles.container}>
      {currentScreen === "title" && (
        <>
          <TextInput
            style={styles.input}
            placeholder="제목을 입력하세요"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="중심 목표를 입력하세요"
            value={mainGoal}
            onChangeText={setMainGoal}
          />
          <Button title="다음으로" onPress={handleNext} />
        </>
      )}

      {/* Sub Goal 및 Detail Goals 입력 화면 */}
      {currentScreen === "subGoals" && (
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginHorizontal: 5,
              marginVertical: 20,
            }}
          >
            <View>
              <Text style={styles.title}>
                세부 목표 {currentSubGoalIndex + 1}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                {"완료"}
              </Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder={`Sub Goal ${currentSubGoalIndex + 1}`}
            value={subGoals[currentSubGoalIndex].subGoal}
            onChangeText={handleSubGoalChange}
          />
          {/* 3x3 Detail Goal 텍스트 박스 그리드 */}
          <View style={styles.grid}>
            {subGoals[currentSubGoalIndex].detailGoals.map(
              (detailGoal, detailIndex) => (
                <TextInput
                  key={detailIndex}
                  style={styles.detailInput}
                  placeholder={`Goal ${detailIndex + 1}`}
                  value={detailGoal}
                  onChangeText={(value) =>
                    handleDetailGoalChange(detailIndex, value)
                  }
                />
              )
            )}
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginHorizontal: 5,
              marginVertical: 20,
            }}
          >
            <TouchableOpacity onPress={handlePrevious} style={styles.preButton}>
              <Text>{"이전으로"}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNext} style={styles.nxtButton}>
              <Text>{"다음으로"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  subGoalContainer: {
    marginBottom: 20,
  },
  detailInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    margin: 5,
    width: "30%", // 3개씩 배치되도록 설정
    textAlign: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 10,
  },
  preButton: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    backgroundColor: "#ddd",
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: "flex-end",
    alignItems: "flex-end",
    borderRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1, // Shadow transparency
    shadowRadius: 4, // Shadow blur radius
    elevation: 4, // Shadow for Android
  },
  nxtButton: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    backgroundColor: "#84BDFF",
    alignSelf: "flex-end",
    alignItems: "flex-end",
    paddingLeft: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1, // Shadow transparency
    shadowRadius: 4, // Shadow blur radius
    elevation: 4, // Shadow for Android
  },
  submitButton: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#0077FF",
    alignSelf: "flex-end",
    alignItems: "flex-end",
    paddingLeft: 10,
    paddingVertical: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1, // Shadow transparency
    shadowRadius: 4, // Shadow blur radius
    elevation: 4, // Shadow for Android
  },
});

export default CreateScreen;
