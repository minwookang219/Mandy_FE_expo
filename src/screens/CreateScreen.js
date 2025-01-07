import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';

const CreateScreen = () => {
  const [title, setTitle] = useState('');
  const [mainGoal, setMainGoal] = useState('');
  const [subGoals, setSubGoals] = useState(
    Array.from({length: 8}, (_, i) => ({
      id: i + 1,
      subGoal: '',
      detailGoals: Array.from({length: 8}, () => ''),
    })),
  );

  const handleSubGoalChange = (index, value) => {
    const updatedSubGoals = [...subGoals];
    updatedSubGoals[index].subGoal = value;
    setSubGoals(updatedSubGoals);
  };

  const handleDetailGoalChange = (subGoalIndex, detailIndex, value) => {
    const updatedSubGoals = [...subGoals];
    updatedSubGoals[subGoalIndex].detailGoals[detailIndex] = value;
    setSubGoals(updatedSubGoals);
  };

  const handleSubmit = async () => {
    const payload = {
      title,
      main_goal: mainGoal,
      sub_goals: subGoals.map(sg => ({
        sub_goal: sg.subGoal,
        detail_goals: sg.detailGoals,
      })),
    };

    try {
      const response = await fetch('http://143.248.228.45:8000/myapp/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        Alert.alert('성공', '만다라트가 성공적으로 생성되었습니다!');
      } else {
        Alert.alert('오류', '만다라트 생성 중 오류가 발생했습니다.');
      }
    } catch (error) {
      Alert.alert('네트워크 오류', '서버와의 연결에 실패했습니다.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>만다라트 생성</Text>

      {/* 제목 입력 */}
      <TextInput
        style={styles.input}
        placeholder="제목을 입력하세요"
        value={title}
        onChangeText={setTitle}
      />

      {/* 중심 목표 입력 */}
      <TextInput
        style={styles.input}
        placeholder="중심 목표를 입력하세요"
        value={mainGoal}
        onChangeText={setMainGoal}
      />

      {/* 세부 목표 입력 */}
      {subGoals.map((subGoal, subGoalIndex) => (
        <View key={subGoal.id} style={styles.subGoalContainer}>
          <TextInput
            style={styles.input}
            placeholder={`Sub Goal ${subGoalIndex + 1}`}
            value={subGoal.subGoal}
            onChangeText={value => handleSubGoalChange(subGoalIndex, value)}
          />
          {subGoal.detailGoals.map((detailGoal, detailIndex) => (
            <TextInput
              key={detailIndex}
              style={styles.detailInput}
              placeholder={`Detail Goal ${detailIndex + 1}`}
              value={detailGoal}
              onChangeText={value =>
                handleDetailGoalChange(subGoalIndex, detailIndex, value)
              }
            />
          ))}
        </View>
      ))}

      {/* 제출 버튼 */}
      <Button title="저장하기" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
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
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginBottom: 5,
    fontSize: 14,
  },
});

export default CreateScreen;
