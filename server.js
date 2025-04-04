import * as database from './database.js'
import express from 'express'
import cors from 'cors'

const app = express();
app.use(express.json())

// #region Trainee
app.get('/api/GetTrainee/:id', cors(), async (req, res) => {
  const id = req.params.id
  const trainee = await database.getTrainee(id)
  res.json(trainee);
});

app.post('/api/CreateTrainee/', cors(), async (req, res) => {
  const trainee = req.body
  const status = await database.createTrainee(trainee) // 201 if created, 400 if bad
  res.sendStatus(status);
});

app.post('/api/UpdateTrainee/', cors(), async (req, res) => {
  const { id, trainee } = req.body
  const status = await database.updateTrainee(id, trainee) // 200 if created, 400 if bad
  res.sendStatus(status);
});

app.get('/api/GetSessions/:id', cors(), async (req, res) => {
  const id = req.params.id
  const result = await database.getSessions(id)
  res.json(result);
});

app.get('/api/GetNutritionTracker/:id', cors(), async (req, res) => {
  const id = req.params.id
  const result = await database.getNutritionTracker(id)
  res.json(result);
});

app.get('/api/GetWorkoutPlan/:id', cors(), async (req, res) => {
  const id = req.params.id
  const result = await database.getWorkoutPlan(id)
  res.json(result);
});

app.get('/api/GetPaymentMethod/:id', cors(), async (req, res) => {
  const id = req.params.id
  const result = await database.getPaymentMethod(id)
  res.json(result);
});

app.get('/api/GetFoodPresets/:id', cors(), async (req, res) => {
  const id = req.params.id
  const result = await database.getFoodPresets(id)
  res.json(result);
});
// #endregion

// ExpressJS code
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('An unhandled exception occured.')
})

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);