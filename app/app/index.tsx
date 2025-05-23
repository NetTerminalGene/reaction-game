import React, { useState, useRef } from 'react';
import { View, Text, Button, StyleSheet, Alert, Pressable } from 'react-native';
import { submitScore } from '../services/api';
import { Link } from 'expo-router';

export default function GameScreen() {
    const [status, setStatus] = useState<'idle' | 'waiting' | 'ready' | 'done'>('idle');
    const [reactionTime, setReactionTime] = useState<number | null>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const startTimeRef = useRef<number | null>(null);

    const startGame = () => {
        setStatus('waiting');
        setReactionTime(null);

        const delay = Math.floor(Math.random() * 3000) + 2000;
        timeoutRef.current = setTimeout(() => {
            setStatus('ready');
            startTimeRef.current = Date.now();
        }, delay);
    };

    const handlePress = () => {
        if (status === 'waiting') {
            Alert.alert('Too soon!', 'Wait for "TAP!" to appear.');
            resetGame();
        } else if (status === 'ready') {
            const time = Date.now() - (startTimeRef.current || 0);
            setReactionTime(time);
            setStatus('done');
        }
    };

    const resetGame = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setStatus('idle');
    };

    const handleSubmit = async () => {
        const name = prompt("Enter your name:");
        if (!name || !reactionTime) return;

        try {
            await submitScore(name, reactionTime);
            alert('Score submitted!');
        } catch (err) {
            console.error(err);
            alert('Failed to submit score.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.statusText}>
                {status === 'idle' && 'Tap Start to begin'}
                {status === 'waiting' && 'Wait for it...'}
                {status === 'ready' && 'TAP!'}
                {status === 'done' && `Your reaction time: ${reactionTime} ms`}
            </Text>


            <Button title={
                status === 'idle' || status === 'done'? 'Start': status === 'ready' ? 'TAP!': 'Wait...'
                }
                onPress={() => {
                    if (status === 'idle' || status === 'done') {
                        startGame();
                    } else if (status === 'ready') {
                        handlePress();
                    } else {
                        Alert.alert('Too soon!', 'Wait for "TAP!" to appear.');
                        resetGame();
                    }
                }}
                disabled={status === 'waiting'}
            />

            <View style={{height: 20}}/>

            {status === 'done' && (
                <>
                <Button title="Submit Score" onPress={handleSubmit} />
                
                <Link href="/leaderboard" asChild>
                <Pressable 
                onPress={handlePress}
                style={styles.leaderboardButton}>
                    <Text style={styles.leaderboardButtonText}>VIEW LEADERBOARD</Text>
                     
                </Pressable>
                </Link>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
    statusText: { fontSize: 24, marginBottom: 20 },

    leaderboardButton: {
    marginTop: 20,
    paddingVertical: 5,
    paddingHorizontal: 24,
    backgroundColor: '#0099FF',
    borderRadius: 5,
    alignItems: 'center',
  },
  leaderboardButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});


