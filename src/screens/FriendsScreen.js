import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";

const MOCK_RANKING_DATA = [
  { user_id: 1, user_name: "강건우", ach_rate: 95.5 },
  { user_id: 2, user_name: "윤서진", ach_rate: 89.3 },
  { user_id: 3, user_name: "YSJ", ach_rate: 72.1 },
  { user_id: 4, user_name: "KGW", ach_rate: 68.7 },
  { user_id: 5, user_name: "넙죽이", ach_rate: 55.2 },
];
const FriendsScreen = () => {
  const [rankingData, setRankingData] = useState(
    MOCK_RANKING_DATA.sort((a, b) => b.ach_rate - a.ach_rate) // 성취율 기준으로 정렬
  );

  //   const [rankingData, setRankingData] = useState([]);
  //   const [loading, setLoading] = useState(true);

  // 서버에서 데이터 가져오기
  //   const fetchRankingData = async () => {
  //     try {
  //       const response = await fetch("http://143.248.228.45:8000/rankings");
  //       if (response.ok) {
  //         const data = await response.json();
  //         const sortedData = data.sort((a, b) => b.ach_rate - a.ach_rate);
  //         setRankingData(sortedData);
  //       } else {
  //         console.error("Failed to fetch ranking data");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching ranking data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchRankingData();
  //   }, []);

  // 순위 렌더링
  const renderRank = (index) => {
    switch (index) {
      case 0:
        return (
          <Image
            source={require("../../assets/gold.png")}
            style={styles.rankIcon}
          />
        );
      default:
        return <Text style={styles.rank}>{`#${index + 1}`}</Text>;
    }
  };

  // 개별 카드 렌더링
  const renderCard = ({ item, index }) => (
    <View style={styles.card}>
      <View style={styles.rankContainer}>{renderRank(index)}</View>
      <View style={styles.cardContent}>
        <Text style={styles.userName}>{item.user_name}</Text>
        <Text style={styles.achRate}>{`성취도: ${item.ach_rate.toFixed(
          2
        )}%`}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={rankingData}
        keyExtractor={(item) => item.user_id.toString()}
        renderItem={renderCard}
      />
    </View>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0077FF",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  rankContainer: {
    width: 50,
    alignItems: "center",
  },
  rank: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0077FF",
  },
  rankIcon: {
    width: 30,
    height: 30,
  },
  cardContent: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  achRate: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
});
