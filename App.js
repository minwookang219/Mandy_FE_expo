import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useRoute, useNavigation } from "@react-navigation/native";

import { CurvedBottomBarExpo } from "react-native-curved-bottom-bar";
import CustomHeader from "./src/components/CustomHeader";
import SpeechBubble from "./src/components/SpeechBubble";
import HomeIcon from "./assets/home.svg";
import FriendsIcon from "./assets/friends.svg";
import WriteIcon from "./assets/write.svg";
import ThumbIcon from "./assets/thumb.svg";

// 화면 컴포넌트
import { DataProvider } from "./DataContext";
import HomeScreen from "./src/screens/HomeScreen";
import CreateScreen from "./src/screens/CreateScreen";
import WriteScreen from "./src/screens/WriteScreen";
import RecordScreen from "./src/screens/RecordScreen";
import InitialScreen from "./src/screens/InitialScreen";
import FriendsScreen from "./src/screens/FriendsScreen";
import { DataContext } from "./DataContext";
// 네비게이터 생성
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{
          header: () => (
            <CustomHeader>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <ThumbIcon width={90} height={90} />
                <SpeechBubble style={{ marginLeft: 30 }}>
                  아자아자화이자
                </SpeechBubble>
              </View>
            </CustomHeader>
          ),
        }}
      />
      <Stack.Screen
        name="Create"
        component={CreateScreen}
        options={{
          header: () => (
            <CustomHeader>
              <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                만다라트 생성
              </Text>
            </CustomHeader>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function WriteStack() {
  const { mainGoal } = useContext(DataContext);
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="Write"
        component={WriteScreen}
        options={{
          header: () => (
            <CustomHeader>
              <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                <Text style={{ color: "#0077ff" }}>{mainGoal}</Text>,
                달성해볼까요?
              </Text>
            </CustomHeader>
          ),
        }}
      />
      <Stack.Screen
        name="Record"
        component={RecordScreen}
        options={({ route }) => ({
          header: () => (
            <CustomHeader>
              <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                <Text style={{ color: "#0077ff" }}>
                  {route.params?.det_goal || "목표"}
                </Text>
                {"의 달성 기록이에요."}
              </Text>
            </CustomHeader>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

function FriendsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FriendsMain"
        component={FriendsScreen}
        options={{
          header: () => (
            <CustomHeader>
              <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                달성도 순위
              </Text>
            </CustomHeader>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const [isLogin, setLogin] = useState(false);
  const handleLogin = () => {
    setLogin(true);
  };

  const renderIcon = (routeName, selectedTab) => {
    let IconComponent = null;

    switch (routeName) {
      case "Home":
        IconComponent = (
          <HomeIcon fill={routeName === selectedTab ? "#2B8EFF" : "#ccc"} />
        );
        break;
      case "Write":
        IconComponent = (
          <WriteIcon fill={routeName === selectedTab ? "#2B8EFF" : "#ccc"} />
        );
        break;
      case "Friends":
        IconComponent = (
          <FriendsIcon fill={routeName === selectedTab ? "#2B8EFF" : "#ccc"} />
        );
        break;
      default:
        break;
    }
    return IconComponent;
  };

  const renderTabBar = ({ routeName, selectedTab, navigate }) => (
    <TouchableOpacity
      onPress={() => navigate(routeName)}
      style={styles.tabButton}
    >
      {renderIcon(routeName, selectedTab)}
    </TouchableOpacity>
  );

  return (
    <DataProvider>
      <NavigationContainer>
        {isLogin ? (
          <CurvedBottomBarExpo.Navigator
            style={styles.bottomBar}
            height={65}
            circleWidth={55}
            bgColor="#fff"
            initialRouteName="Home"
            borderTopLeftRight
            renderCircle={({ navigate }) => (
              <Animated.View>
                <TouchableOpacity
                  style={[styles.btnCircle, { bottom: 25 }]}
                  onPress={() => navigate("WriteStack")}
                >
                  <WriteIcon width={35} height={35} fill="#fff" />
                </TouchableOpacity>
              </Animated.View>
            )}
            tabBar={renderTabBar}
          >
            <CurvedBottomBarExpo.Screen
              name="Home"
              component={HomeStack}
              position="LEFT"
              options={{
                headerShown: false, // 기본 헤더 숨기기
                unmountOnBlur: true,
              }}
            />
            <CurvedBottomBarExpo.Screen
              name="WriteStack" // WriteStack 등록
              component={WriteStack}
              position="CENTER"
              options={{
                headerShown: false, // 기본 헤더 숨기기
                unmountOnBlur: true,
              }}
            />
            <CurvedBottomBarExpo.Screen
              name="Friends"
              component={FriendsStack}
              position="RIGHT"
              options={{
                headerShown: false, // 기본 헤더 숨기기
                unmountOnBlur: true,
              }}
            />
          </CurvedBottomBarExpo.Navigator>
        ) : (
          <InitialScreen handleLogin={handleLogin} />
        )}
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
    justifyContent: "center",
  },
  bottomBar: {
    position: "absolute",
    borderRadius: 20,
    elevation: 1000,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  btnCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2B8EFF",
    shadowColor: "#1A1A23",
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.2,
    shadowRadius: 0.41,
    elevation: 5,
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
