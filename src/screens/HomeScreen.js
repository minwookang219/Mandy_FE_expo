import React, { useContext, useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  TextInput,
} from "react-native";
import PencilIcon from "../../assets/pencil.svg";
import CheckIcon from "../../assets/submit.svg";
import { useNavigation } from "@react-navigation/native";
import { DataContext } from "../../DataContext";

const { width } = Dimensions.get("window");
const CONTAINER_SIZE = width - 40;
const ITEM_SIZE = (CONTAINER_SIZE - 40) / 3;

// Mock 데이터
const mockData = {
  id: 1,
  title: "2025",
  main_goal: "중심 목표",
  sub_goals: [
    { sub_id: 1, sub_goal: "1번 목표" },
    { sub_id: 2, sub_goal: "2번 목표" },
    { sub_id: 3, sub_goal: "3번 목표" },
    { sub_id: 4, sub_goal: "4번 목표" },
    { sub_id: 6, sub_goal: "6번 목표" },
    { sub_id: 7, sub_goal: "7번 목표" },
    { sub_id: 8, sub_goal: "8번 목표" },
    { sub_id: 9, sub_goal: "9번 목표" },
  ],
  detail_goals: [
    { det_id: 101, sub_id: 1, det_goal: "세부1" },
    { det_id: 102, sub_id: 1, det_goal: "세부2" },
    { det_id: 103, sub_id: 1, det_goal: "세부3" },
    { det_id: 104, sub_id: 1, det_goal: "세부4" },
    { det_id: 105, sub_id: 1, det_goal: "세부5" },
    { det_id: 106, sub_id: 1, det_goal: "세부6" },
    { det_id: 107, sub_id: 1, det_goal: "세부7" },
    { det_id: 108, sub_id: 1, det_goal: "세부8" },
  ],
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const [isEditing, setIsEditing] = useState(false);
  // 상태 관리
  const {
    // DataContext에서 가져옴
    data,
    id,
    title,
    centerData,
    outerData,
    allDetailGoals,
    setTitle,
    setCenterData,
    setOuterData,
  } = useContext(DataContext);

  // 도형 데이터
  const shapes = [
    {
      id: "1",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 7,
    },
    {
      id: "2",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      borderBottomLeftRadius: 7,
      borderBottomRightRadius: 7,
    },
    {
      id: "3",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      borderBottomLeftRadius: 7,
      borderBottomRightRadius: 30,
    },
    {
      id: "4",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 7,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 7,
    },
    {
      id: "5",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    },
    {
      id: "6",
      borderTopLeftRadius: 7,
      borderTopRightRadius: 30,
      borderBottomLeftRadius: 7,
      borderBottomRightRadius: 30,
    },
    {
      id: "7",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 7,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    },
    {
      id: "8",
      borderTopLeftRadius: 7,
      borderTopRightRadius: 7,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    },
    {
      id: "9",
      borderTopLeftRadius: 7,
      borderTopRightRadius: 30,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    },
  ];

  const scaleAnim = useRef(new Animated.Value(1)).current; // 초기 크기 1
  const fadeAnimGrid = useRef(new Animated.Value(1)).current; // 전체 그리드 투명도 애니메이션
  const translateXAnim = useRef(new Animated.Value(0)).current; // x축 이동
  const translateYAnim = useRef(new Animated.Value(0)).current; // y축 이동

  const handleBoxPress = (subGoal, index) => {
    if (isEditing) return;
    // 클릭한 사각형의 위치 계산
    const row = Math.floor(index / 3); // 클릭된 사각형의 행
    const col = index % 3; // 클릭된 사각형의 열
    // (셀의 중심) = (셀의 왼쪽 상단 x좌표 + ITEM_SIZE/2, y좌표 + ITEM_SIZE/2)
    const cellCenterX = col * ITEM_SIZE + ITEM_SIZE / 2;
    const cellCenterY = row * ITEM_SIZE + ITEM_SIZE / 2;

    // 그리드 중앙
    const gridCenterX = CONTAINER_SIZE / 2;
    const gridCenterY = CONTAINER_SIZE / 2;

    // 이동해야 하는 거리 = (그리드 중앙) - (셀의 중심)
    const translateX = gridCenterX - cellCenterX;
    const translateY = gridCenterY - cellCenterY;

    Animated.parallel([
      // 1. 클릭된 사각형 Zoom In
      Animated.timing(translateXAnim, {
        toValue: translateX, // x축 이동
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: translateY, // y축 이동
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 5, // Zoom in
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnimGrid, {
        toValue: 1, // 투명하게 만들기
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // 3. 데이터 변경
      setCenterData(subGoal.sub_goal);
      const filtered = allDetailGoals.filter(
        (item) => item.sub_id === subGoal.sub_id
      );
      setOuterData(filtered);

      // 축소 애니메이션
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1, // 원래 크기로 복귀
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(translateXAnim, {
          toValue: 0, // x축 원래 위치
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 0, // y축 원래 위치
          duration: 300,
          useNativeDriver: true,
        }),
        // 4. 전체 Fade In
        Animated.timing(fadeAnimGrid, {
          toValue: 1, // 전체 불투명화
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const handleTitlePress = () => {
    setCenterData(data.main_goal);
    setOuterData(data.sub_goals);
  };

  const handleEditToggle = async () => {
    if (!isEditing) {
      // 현재 편집 모드가 아님 -> 편집 모드로 전환
      setIsEditing(true);
    } else {
      // 현재 편집 모드임 -> 체크 아이콘 누름
      setIsEditing(false);

      // [예시] 서버에 PATCH 요청
      try {
        // 아래는 fetch() 예시
        await fetch("http://143.248.228.45:8000/myapp/update/", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            title: title,
            main_goal: centerData,
            sub_goals: outerData,
          }),
        });

        console.log("PATCH 성공");
      } catch (err) {
        console.log("PATCH 실패: ", err);
      }
    }
  };

  const handleChangeBoxText = (text, outIndex) => {
    // outerData를 복사한 뒤 해당 인덱스의 텍스트만 업데이트
    const newOuterData = [...outerData];
    if (!newOuterData[outIndex]) {
      newOuterData[outIndex] = {};
    }
    // det_goal (세부 목표) 또는 sub_goal 중 무엇을 수정하는지에 따라 다름
    // 여기서는 'det_goal' 키가 있으면 det_goal, 아니면 sub_goal 로 가정
    if (newOuterData[outIndex]) {
      if (newOuterData[outIndex].det_goal !== undefined) {
        newOuterData[outIndex].det_goal = text;
      } else {
        newOuterData[outIndex].sub_goal = text;
      }
    }
    setOuterData(newOuterData);
  };

  const handleDeletePress = async () => {
    if (!mainId) {
      console.log("main_id가 없습니다.");
      return;
    }
    try {
      const response = await fetch(`http://143.248.228.45:8000/myapp/delete`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("DELETE 성공");
        // 필요한 후처리 (예: 화면 초기화, 다른 페이지로 이동 등)
        // 만다라트 목록 페이지로 돌아간다거나, state를 초기화할 수도 있겠죠.
      } else {
        console.log("DELETE 실패: 응답 오류", response.status);
      }
    } catch (error) {
      console.log("DELETE 실패:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* 상단 타이틀 */}
      <View style={styles.titleContainer}>
        <View style={styles.leftBlock}>
          <TouchableOpacity onPress={handleTitlePress} activeOpacity={0.5}>
            {isEditing ? (
              <TextInput
                style={styles.title}
                value={title}
                onChangeText={setTitle}
              />
            ) : (
              <Text style={styles.title}>{title || "로딩 중..."}</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleEditToggle}
          >
            {isEditing ? (
              <CheckIcon width={24} height={24} fill="#000" />
            ) : (
              <PencilIcon width={24} height={24} fill="#000" />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.rightBlock}>
          {/* 편집 모드가 아닐 때: "추가하기" 버튼 */}
          {!isEditing ? (
            <TouchableOpacity
              onPress={() => navigation.navigate("Create")}
              style={styles.addButton}
            >
              <Text>{"추가하기"}</Text>
            </TouchableOpacity>
          ) : (
            // 편집 모드일 때: "삭제하기" 버튼
            <TouchableOpacity
              onPress={handleDeletePress}
              style={styles.deleteButton}
            >
              <Text style={{ fontWeight: "bold", color: "#fff" }}>
                {"삭제하기"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* 3x3 그리드 */}
      {id ? (
        <Animated.View
          style={[
            styles.grid,
            {
              transform: [
                { translateX: translateXAnim }, // x축 이동
                { translateY: translateYAnim }, // y축 이동
                { scale: scaleAnim }, // 확대/축소
              ],
            },
            { opacity: fadeAnimGrid },
          ]}
        >
          {shapes.map((shape, index) => {
            // 중심 목표 표시 (ID가 5인 경우)
            if (shape.id === "5") {
              return (
                <View
                  key={shape.id}
                  style={[
                    styles.box,
                    {
                      width: ITEM_SIZE,
                      height: ITEM_SIZE,
                      borderTopLeftRadius: shape.borderTopLeftRadius,
                      borderTopRightRadius: shape.borderTopRightRadius,
                      borderBottomLeftRadius: shape.borderBottomLeftRadius,
                      borderBottomRightRadius: shape.borderBottomRightRadius,
                    },
                  ]}
                >
                  {isEditing ? (
                    <TextInput
                      style={styles.boxEditText}
                      value={centerData || ""}
                      onChangeText={setCenterData}
                    />
                  ) : (
                    <Text style={styles.boxText}>
                      {centerData || "로딩 중..."}
                    </Text>
                  )}
                </View>
              );
            }

            const outIndex =
              Number(shape.id) < 5
                ? Number(shape.id) - 1
                : Number(shape.id) - 2;

            // 외곽 목표 표시
            const subGoal = outerData[outIndex];

            return (
              <TouchableOpacity
                key={shape.id}
                style={[
                  styles.box,
                  {
                    width: ITEM_SIZE,
                    height: ITEM_SIZE,
                    borderTopLeftRadius: shape.borderTopLeftRadius,
                    borderTopRightRadius: shape.borderTopRightRadius,
                    borderBottomLeftRadius: shape.borderBottomLeftRadius,
                    borderBottomRightRadius: shape.borderBottomRightRadius,
                  },
                ]}
                onPress={() =>
                  !isEditing && subGoal && handleBoxPress(subGoal, index)
                }
                activeOpacity={isEditing ? 1 : 0.7}
              >
                {isEditing ? (
                  <TextInput
                    style={styles.boxEditText}
                    value={subGoal ? subGoal.det_goal || subGoal.sub_goal : ""}
                    onChangeText={(text) => handleChangeBoxText(text, outIndex)}
                  />
                ) : (
                  <Text style={styles.boxText}>
                    {subGoal ? subGoal.det_goal || subGoal.sub_goal : ""}
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
        </Animated.View>
      ) : (
        <View style={styles.grid}>
          <Text>{"추가하기"}</Text>
        </View>
      )}
    </View>
  );
};

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // 왼쪽 블록 - 오른쪽 블록 사이 간격
    alignItems: "flex-start",
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 15,
  },
  leftBlock: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  rightBlock: {
    // 특별한 스타일 없으면 생략 가능
    alignItems: "flex-end",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "flex-start",
    alignItems: "flex-start",
  },
  grid: {
    flexWrap: "wrap",
    width: CONTAINER_SIZE,
    height: CONTAINER_SIZE,
    borderRadius: 30,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    elevation: 5, // For shadow on Android
    shadowColor: "#000", // For shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  box: {
    backgroundColor: "#b3d9ff",
    borderColor: "#EDF5FF",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, // Shadow transparency
    shadowRadius: 4, // Shadow blur radius
    elevation: 4, // Shadow for Android
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  iconButton: {
    marginLeft: 10, // 제목과 아이콘 간격
    marginRight: 70,
  },
  addButton: {
    fontSize: 18,
    fontWeight: "600",
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
  deleteButton: {
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

export default HomeScreen;
