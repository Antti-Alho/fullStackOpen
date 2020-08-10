import express from 'express';
import { calculateBmi as bmiCalc} from './bmiCalculator';
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
      bmi: bmiCalc(height, weight)
    };
    res.send(response);
  } catch (e) {
    res.status(500).send({error: "malformatted parameters"});
  }
});

app.post('/exercises', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const daily_exercises = req.body.daily_exercises as Array<number>;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const target = Number(req.body.target);

    if (!daily_exercises || !target) {
      res.status(400).json({
        error: 'parameters missing'
      });
    }
    console.log(daily_exercises);
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