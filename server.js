import * as database from './database.js'
import express from 'express'
import cors from 'cors'

const app = express();
app.use(express.json())

// #region Trainee
app.get('/api/Trainee/:id', cors(), async (req, res) => {
  // Get a trainee by id
  const id = req.params.id
  const trainee = await database.getTrainee(id)
  res.json(trainee);
});

app.post('/api/Trainee', cors(), async (req, res) => {
  // Creates a trainee
  const trainee = req.body
  const status = await database.createTrainee(trainee) // 200 if created, 400 if bad
  res.sendStatus(status);
});

app.put('/api/Trainee/:id', cors(), async (req, res) => {
  // Updates a trainee
  const trainee = req.body
  const id = req.params.id
  const status = await database.updateTrainee(id, trainee) // 200 if created, 400 if bad
  res.sendStatus(status);
});

app.get('/api/Trainee/:id/Sessions', cors(), async (req, res) => {
  // Get all trainee sessions by trainee id
  const id = req.params.id
  const result = await database.getTraineeSessions(id)
  res.json(result);
});

app.get('/api/Trainee/:id/NutritionTracker', cors(), async (req, res) => {
  // Get nutrition trackers by trainee id
  const id = req.params.id
  const result = await database.getNutritionTracker(id)
  res.json(result);
});

app.get('/api/Trainee/:id/WorkoutPlans', cors(), async (req, res) => {
  // Get trainee workout plans by trainee id
  const id = req.params.id
  const result = await database.getTraineeWorkoutPlans(id)
  res.json(result);
});

app.get('/api/Trainee/:id/PaymentMethod', cors(), async (req, res) => {
  // Get trainee payment method by trainee id
  const id = req.params.id
  const result = await database.getPaymentMethod(id)
  res.json(result);
});

app.get('/api/Trainee/:id/FoodPresets', cors(), async (req, res) => {
  // Get trainee food presets by trainee id
  const id = req.params.id
  const result = await database.getFoodPresets(id)
  res.json(result);
});
// #endregion

// #region Trainer
app.get('/api/Trainer/:id', cors(), async (req, res) => {
  // Get a trainer by id
  const id = req.params.id
  const trainer = await database.getTrainer(id)
  res.json(trainer);
});

app.post('/api/Trainer', cors(), async (req, res) => {
  // Creates a trainer
  const trainer = req.body
  const status = await database.createTrainer(trainer) // 200 if created, 400 if bad
  res.sendStatus(status);
});

app.put('/api/Trainer/:id', cors(), async (req, res) => {
  // Updates a trainer
  const id = req.params.id
  const trainer = req.body
  const status = await database.updateTrainer(id, trainer) // 200 if created, 400 if bad
  res.sendStatus(status);
});

app.get('/api/Trainer/:id/Sessions', cors(), async (req, res) => {
  // Get all trainer sessions by trainer id
  const id = req.params.id
  const result = await database.getTrainerSessions(id)
  res.json(result);
});

app.get('/api/Trainer/:id/WorkoutPlans', cors(), async (req, res) => {
  // Get all trainer workout plans by trainer id
  const id = req.params.id
  const result = await database.getTrainerWorkoutPlans(id)
  res.json(result);
});

app.get('/api/Trainer/:id/BankingInfo', cors(), async (req, res) => {
  // Get trainer banking info by trainer id
  const id = req.params.id
  const result = await database.getTrainerBankingInfo(id)
  res.json(result);
});

// #endregion

// #region Session
app.get('/api/Session/:id', cors(), async (req, res) => {
  // Get a session by id
  const id = req.params.id
  const session = await database.getSession(id)
  res.json(session);
});

app.post('/api/Session', cors(), async (req, res) => {
  // Creates a session
  const session = req.body
  const status = await database.createSession(session) // 200 if created, 400 if bad
  res.sendStatus(status);
});

app.put('/api/Session/:id', cors(), async (req, res) => {
  // Updates a session
  const session = req.body
  const id = req.params.id
  const status = await database.updateSession(id, session) // 200 if created, 400 if bad
  res.sendStatus(status);
});
// #endregion

// ExpressJS code
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('An unhandled exception occured. Please try again later.')
})

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);