// DataContext.js
import React, { createContext, useState, useEffect } from "react";

// 전역 Context
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // fetch에서 사용하는 이름들에 맞춰서 상태 정의
  const [data, setData] = useState(null);
  const [id, setId] = useState(null);
  const [title, setTitle] = useState("");
  const [mainGoal, setMainGoal] = useState(""); // WriteScreen용, 언제나 서버 main_goal
  const [centerData, setCenterData] = useState(""); // 중앙(메인 목표)
  const [outerData, setOuterData] = useState([]); // 바깥(서브 목표)
  const [allDetailGoals, setAllDetailGoals] = useState([]); // 세부 목표

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://143.248.228.45:8000/myapp/read/3/"
        );
        const fetchedData = await response.json();

        // sub_goals 처리
        const subGoals = fetchedData.sub_goals || [];
        const subGoalsToFill = Math.max(0, 8 - subGoals.length); // 음수 방지
        const filledSubGoals = [
          ...subGoals,
          ...Array(subGoalsToFill).fill({ sub_id: "", sub_goal: "" }),
        ];

        // detail_goals 처리
        const detailGoals = fetchedData.detail_goals || [];
        const detailGoalsToFill = Math.max(0, 8 - detailGoals.length); // 음수 방지
        const filledDetailGoals = [
          ...detailGoals,
          ...Array(detailGoalsToFill).fill({
            det_id: "",
            sub_id: "",
            det_goal: "",
          }),
        ];

        setData(fetchedData);
        setId(fetchedData.id);
        setTitle(fetchedData.title); // 제목 업데이트
        setMainGoal(fetchedData.main_goal);
        setCenterData(fetchedData.main_goal); // 중앙 = 메인 목표
        setOuterData(filledSubGoals); // 바깥 = 서브 목표 8개
        setAllDetailGoals(filledDetailGoals); // 세부 목표 데이터 설정
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // 비동기 함수 호출
  }, []);

  return (
    <DataContext.Provider
      value={{
        data,
        id,
        title,
        centerData,
        outerData,
        allDetailGoals,
        mainGoal,
        setData,
        setId,
        setTitle,
        setCenterData,
        setOuterData,
        setAllDetailGoals,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
