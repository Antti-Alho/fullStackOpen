import express from 'express';
import routes from './routes/index';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());


const PORT = 3001;

app.use('/api', routes);

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.get('/', (_req, res) => {
  res.send('hello world');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});