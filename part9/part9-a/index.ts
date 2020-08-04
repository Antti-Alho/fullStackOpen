import express from 'express';
import { calculateBmi as bmiCalc} from './bmiCalculator'
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const weight = Number(req.query.weight)
    const height = Number(req.query.height)
    if (isNaN(weight) || isNaN(height)) throw new Error('malformatted parameters')
    const response = {
      weight: weight,
      height: height,
      bmi: bmiCalc(height, weight)
    }
    res.send(response)
  } catch (e) {
    res.status(500).send({error: "malformatted parameters"})
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});