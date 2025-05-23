import axios from 'axios';

const API_URL = 'https://reaction-game-henna.vercel.app/:3001';

export const submitScore = async (name: string, reactionTime: number) =>{
    return axios.post(`${API_URL}/scores`, { name, reactionTime});
};

export const getTopScores = async () => {
    const res = await axios.get(`${API_URL}/scores`);
    return res.data;
};

export const clearLeaderboard = async () => {
    return await fetch('http://localhost:3001/scores/all',{
        method: 'DELETE',
    });
};