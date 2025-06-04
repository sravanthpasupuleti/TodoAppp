// frontend/screens/HomeScreen.js
import React, { useState ,  useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
//import { useEffect } from 'react';
import { requestNotificationPermission, scheduleReminder } from '../utils/notifications';
import { requestNotificationPermission, scheduleReminder } from '../utils/notifications';

export default function HomeScreen({ route }) {
  const { user } = route.params;

  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [tasks, setTasks] = useState([]);

   // <-- Add this useEffect here to request notification permission on mount
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const handleAddTask = async () => {
  if (!description) {
    Alert.alert('Validation Error', 'Please enter a task description.');
    return;
  }

  const newTask = { id: Date.now(), description, startTime };
  setTasks([...tasks, newTask]);
  setDescription('');
  setStartTime(new Date());

  await scheduleReminder(newTask);  // 🔔 Schedule the reminder

  Alert.alert('Task Added', 'Reminder scheduled 15 mins before task.');
};

    const newTask = { id: Date.now(), description, startTime };
    setTasks([...tasks, newTask]);
    setDescription('');
    setStartTime(new Date());
    Alert.alert('Task Added', 'Reminder will be set (coming up next).');
    // 🔔 TODO: schedule notification 15 mins before
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Hello, {user.name} 👋</Text>

      <TextInput
        placeholder="Task Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />

      <View style={styles.dateTimeSection}>
        <Button title="Pick Start Time" onPress={() => setShowPicker(true)} />
        <Text style={{ marginTop: 10 }}>Start Time: {startTime.toLocaleTimeString()}</Text>
      </View>

      {showPicker && (
        <DateTimePicker
          value={startTime}
          mode="time"
          display="default"
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) setStartTime(selectedDate);
          }}
        />
      )}

      <Button title="Add Task" onPress={handleAddTask} />

      <Text style={styles.taskHeading}>Your Tasks</Text>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <Text style={styles.taskText}>{item.description}</Text>
            <Text style={styles.timeText}>⏰ {item.startTime.toLocaleTimeString()}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, borderRadius: 5, marginBottom: 12 },
  dateTimeSection: { marginBottom: 12 },
  taskHeading: { fontSize: 18, fontWeight: 'bold', marginTop: 20 },
  taskCard: {
    backgroundColor: '#e8f0fe',
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
  },
