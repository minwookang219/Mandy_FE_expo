import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Tabbar from "@mindinventory/react-native-tab-bar-interaction";

// SVG 아이콘 (Expo 환경에서 사용하려면 아래 전제사항 필수)
// 1) npx expo install react-native-svg
// 2) npm install --save-dev react-native-svg-transformer
// 3) metro.config.js 설정
import HomeIcon from "./assets/home.svg";
import FriendsIcon from "./assets/friends.svg";
import WriteIcon from "./assets/write.svg";

// 화면 컴포넌트
import { DataProvider } from "./DataContext";
import HomeScreen from "./src/screens/HomeScreen";
import CreateScreen from "./src/screens/CreateScreen";
import WriteScreen from "./src/screens/WriteScreen";

const FriendsScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.text}>친구 화면</Text>
  </View>
);

// 커스텀 탭바
function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.name}
            onPress={onPress}
            style={styles.tabButton}
          >
            {route.name === "Home" && (
              <HomeIcon
                width={24}
                height={24}
                fill={isFocused ? "#4DB6AC" : "gray"}
              />
            )}
            {route.name === "Friends" && (
              <FriendsIcon
                width={24}
                height={24}
                fill={isFocused ? "#4DB6AC" : "gray"}
              />
            )}
            {route.name === "Write" && (
              <WriteIcon
                width={28}
                height={28}
                fill={isFocused ? "#4DB6AC" : "gray"}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// 네비게이터 생성
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// HomeStack 예시
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="Create" component={CreateScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <DataProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
          }}
          tabBar={(props) => <CustomTabBar {...props} />}
        >
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="Write" component={WriteScreen} />
          <Tab.Screen name="Friends" component={FriendsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}

// 스타일
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  tabBar: {
    flexDirection: "row",
    height: 70,
    backgroundColor: "white",
    justifyContent: "space-around",
    alignItems: "center",
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    color: "gray",
    marginTop: 4,
  },
  labelFocused: {
    color: "#4DB6AC",
  },
});
