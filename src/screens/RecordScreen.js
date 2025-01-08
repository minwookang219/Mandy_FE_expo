// RecordScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import DeleteIcon from "../../assets/delete.svg";

// 월 표기(3글자)
const MONTH_ABBR = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

export default function RecordScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  // HomeScreen/WriteScreen 등에서 넘어온 det_id
  const { det_id } = route.params || {};

  const [records, setRecords] = useState([]);

  // 1) 서버에서 해당 det_id의 기록 목록 가져오기
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        // 예시: GET /myapp/records?det_id=xxx
        const response = await fetch(
          `http://143.248.228.45:8000/achieve/achievements/${det_id}/`
        );
        const data = await response.json();
        // data가 [{record_id, det_id, record_content, record_date}, ...] 라고 가정
        setRecords(data);
        console.log("GET 성공");
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    };

    if (det_id) {
      fetchRecords();
    }
  }, [det_id]);

  // 2) 날짜 파싱 헬퍼
  const parseDate = (dateString) => {
    // record_date 예: "2023-11-10 13:05:00" (서버 포맷에 맞춰 수정)
    // 시간 구분자가 다르면 "2023-11-10T13:05:00" 식으로 처리해야 할 수도 있음
    const dateObj = new Date(dateString.replace(" ", "T"));
    const month = MONTH_ABBR[dateObj.getMonth()] || "N/A";
    const day = dateObj.getDate();
    return { month, day };
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://143.248.228.45:8000/achieve/achievements/${id}/`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("삭제 성공");
        setRecords((prevRecords) =>
          prevRecords.filter((record) => record.id !== id)
        );
      } else {
        console.error("삭제 실패:", response.status);
      }
    } catch (error) {
      console.error("삭제 요청 중 오류 발생:", error);
    }
  };

  // 3) 각 item(기록)을 렌더링
  const renderItem = ({ item }) => {
    const { month, day } = parseDate(item.record_date);

    return (
      <View style={styles.recordContainer}>
        {/* 왼쪽 날짜 표시 영역 */}
        <View style={styles.dateBox}>
          <Text style={styles.monthText}>{month}</Text>
          <Text style={styles.dayText}>{day}</Text>
        </View>

        {/* 오른쪽 기록 내용 영역 */}
        <View style={styles.contentBox}>
          <Text style={styles.contentText}>{item.record_content}</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleDelete(item.id)}
          styles={styles.deleteButton}
        >
          <DeleteIcon width={30} height={30} fill="#C7C7C7" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* 상단 헤더나 뒤로가기 버튼 등 필요시 추가 */}
      {/* List */}
      <FlatList
        data={records}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
}

// 스타일
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  recordContainer: {
    flexDirection: "row",
    marginBottom: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    overflow: "hidden",
  },
  dateBox: {
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fafafa",
    borderRightWidth: 1,
    borderRightColor: "#ccc",
    padding: 8,
  },
  monthText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#f00", // 필요에 맞춰 색상 변경
  },
  dayText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111",
  },
  contentBox: {
    flex: 1,
    padding: 8,
    justifyContent: "center",
  },
  contentText: {
    fontSize: 14,
    color: "#333",
  },
  deleteButton: {
    paddingTop: 3,
    marginLeft: 8,
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});
