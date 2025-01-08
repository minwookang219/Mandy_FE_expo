import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
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

  const [recommendedGoals, setRecommendedGoals] = useState([]); // 추천 목표 저장

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

  const fetchRecommendedGoals = async () => {
    try {
      const currentSubGoal = subGoals[currentSubGoalIndex].subGoal;

      const response = await fetch(
        `http://143.248.228.45:8000/CGPT/${encodeURIComponent(currentSubGoal)}`, // URL에 Sub Goal 포함
        {
          method: "GET", // GET 요청
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.text(); // 서버에서 문자열 반환
        const goals = data.split(", "); // ", "로 나눠 배열로 변환
        const cleanedGoals = goals.map((goal) => goal.replace(/^"|"$/g, "")); // 각 요소에서 쌍따옴표 제거
        setRecommendedGoals(cleanedGoals);
      } else {
        Alert.alert("오류", "목표 추천을 가져오는 중 오류가 발생했습니다.");
      }
    } catch (error) {
      Alert.alert("네트워크 오류", "서버와의 연결에 실패했습니다.");
    }
  };

  const handleRecommendedGoalClick = (goal) => {
    // Detail Goals 중 첫 번째 빈 칸에 추천 목표 채우기
    const updatedSubGoals = [...subGoals];
    const emptyIndex = updatedSubGoals[
      currentSubGoalIndex
    ].detailGoals.findIndex((dg) => dg === "");
    if (emptyIndex !== -1) {
      updatedSubGoals[currentSubGoalIndex].detailGoals[emptyIndex] = goal;
      setSubGoals(updatedSubGoals);
    } else {
      Alert.alert("알림", "모든 세부 목표가 이미 채워져 있습니다.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            {recommendedGoals.length > 0 && (
              <View style={styles.recommendedGoalsContainer}>
                {recommendedGoals.map((goal, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.recommendedGoalButton}
                    onPress={() => handleRecommendedGoalClick(goal)}
                  >
                    <Text style={{ color: "#fff" }}>{goal}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

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
              {/* AI 목표 추천 버튼 */}
              {subGoals[currentSubGoalIndex].subGoal.trim() !== "" && (
                <TouchableOpacity
                  style={styles.aiRecommendationButton}
                  onPress={fetchRecommendedGoals}
                >
                  <Image
                    source={require("../../assets/gpt.png")} // gpt.png 파일 경로
                    style={styles.aiRecommendationImage}
                  />
                </TouchableOpacity>
              )}
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
              <TouchableOpacity
                onPress={handlePrevious}
                style={styles.preButton}
              >
                <Text>{"이전으로"}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleNext} style={styles.nxtButton}>
                <Text>{"다음으로"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
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
  recommendedGoalsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  recommendedGoalButton: {
    backgroundColor: "#0077ff",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
  },
  aiRecommendationButton: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#0ea982",
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
  aiRecommendationImage: {
    width: 16, // 이미지 너비
    height: 16, // 이미지 높이
    resizeMode: "contain", // 이미지 크기 조정
  },
});

export default CreateScreen;
