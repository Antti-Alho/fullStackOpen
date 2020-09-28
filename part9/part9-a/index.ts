import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const weight = Number(req.query.weight);
    const height = Number(req.query.height);
    if (isNaN(weight) || isNaN(height)) throw new Error('malformatted parameters');
    const response = {
      weight: weight,
      height: height,
      bmi: calculateBmi(height, weight)
    };
    res.send(response);
  } catch (e) {
    if (e instanceof Error) res.status(400).send({ error: e.message });
    else throw e;
  }
});

app.post('/exercises', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const daily_exercises: Array<number> = req.body.daily_exercises as Array<number>;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const target: number = req.body.target as number;
    if (!daily_exercises || !target) {
      res.status(400).json({
        error: 'parameters missing'
      });
    }
    const response = calculateExercises(daily_exercises, target);
    res.send(response);
  } catch (e) {
    if (e instanceof Error) res.status(400).send({ error: e.message });
    else throw e;
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});