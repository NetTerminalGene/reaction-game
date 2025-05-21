import express, { Request, Response } from 'express';
import cors from 'cors';
import { db } from './firebase'; 

const app = express();
app.use(cors());
app.use(express.json()); 


app.post('/scores', async (req: Request, res: Response) => {
  const { name, reactionTime } = req.body;

  if (!name || !reactionTime) {
    res.status(400).json({ error: 'Missing fields' });
    return;
  }

  try {
    await db.collection('scores').add({
      name,
      reactionTime,
      createdAt: new Date().toISOString(),
    });

    res.status(201).json({ message: 'Score saved!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save score' });
  }
});

app.get('/scores', async (_req: Request, res: Response) => {
  try {
    const snapshot = await db.collection('scores').orderBy('reactionTime').limit(10).get();
    const scores = snapshot.docs.map(doc => doc.data());
    res.json(scores);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch scores' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
