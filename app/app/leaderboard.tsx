import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert } from 'react-native';
import { getTopScores, clearLeaderboard }  from '../services/api';
import  { Link }  from 'expo-router';

type ScoreEntry = {
    name : string;
    reactionTime: number;
}
export default function LeaderboardScreen() {
    const [scores, setScores] = useState<ScoreEntry[]>([]);

    useEffect(() => {
        const loadScores = async () =>{
            try {
                const data = await getTopScores();
                setScores(data);
                console.log('Leaderboard loaded');
            } catch (error){
                console.error('Failed to load scores:', error);
            }
        };
        loadScores();
    }, []);

 

const handleClearLeaderboard = () => {
  clearLeaderboard()
    .then(() => {
      Alert.alert('Leaderboard cleared!');
      setScores([]);
    })
    .catch(error => {
      console.error('Failed to clear leaderboard:', error);
      Alert.alert('Error clearing leaderboard');
    });
};


    return(
      <View style={styles.container}>
            <Text style={styles.title}>Leaderboard</Text>
            <FlatList
                data={scores}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Text style={styles.item}>
            #{index + 1} — {item.name}: {item.reactionTime}ms
          </Text>
        )}
      />
      
      <Link href="/" style={{ marginTop: 20 }}>
        <Text style={{ color: 'blue' }}>← Back to Game</Text>
      </Link>

      <Button
      title="Clear Leaderboard"
      color="red"
      disabled={scores.length === 0}
      onPress={handleClearLeaderboard}
      />
      {scores.length === 0 && (
      <Text style={{color: 'gray', marginTop: 10}}>
        No scores to clear yet; play ten rounds to see all scores.
        </Text> 
      )}
      
      
      </View>
    
  );

  
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  item: { fontSize: 18, marginBottom: 8 },
});


