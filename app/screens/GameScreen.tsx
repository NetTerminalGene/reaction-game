import React, { useState, useRef } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function GameScreen() {
    const [status, setStatus] = useState<'idle' | 'waiting' | 'ready' | 'done'>('idle');
    const [reactionTime, setReactionTime] = useState<number | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
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

    const submitScore = async () => {
        const name = prompt("Enter your name:");
        if (!name || !reactionTime) return;

        try {
            await axios.post('http://localhost:3001/scores', {
                name,
                reactionTime,
            });
            Alert.alert('Submitted!', 'Your score was saved.');
        } catch (err) {
            Alert.alert('Error', 'Could not submit score.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.statusText}>
                {status === 'idle' && 'Tap Start to begin'}
                {status === 'waiting' && 'Wait for it...'}
                {status === 'ready' && 'TAP!'}
                {status === 'done' && `Your time: ${reactionTime} ms`}
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


            {status === 'done' && (
                <Button title="Submit Score" onPress={submitScore} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
    statusText: { fontSize: 24, marginBottom: 20 },
});
