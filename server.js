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

// #region Payment

app.post('/api/Payment', cors(), async (req, res) => {
  // Creates a new payment
  const payment = req.body;
  const status = await database.createPayment(payment);
  res.sendStatus(status);
});

app.get('/api/Payment/:id', cors(), async (req, res) => {
  // Retrieves a single payment by its ID
  const id = req.params.id;
  const payment = await database.getPayment(id);
  res.json(payment);
});

app.get('/api/Payment/Trainer/:id', cors(), async (req, res) => {
  //Gets all payments made by or received by a trainer
  const id = req.params.id;
  const payments = await database.getPaymentsByTrainerId(id);
  res.json(payments);
});

app.get('/api/Payment/Trainee/:id', cors(), async (req, res) => {
  //Gets all payments made by or received by a trainee
  const id = req.params.id;
  const payments = await database.getPaymentsByTraineeId(id);
  res.json(payments);
});

// #endregion

// #region Collect

app.post('/api/Collect/Withdraw', cors(), async (req, res) => {
  // Allows a trainer to request a withdrawal from their account
  const { trainerId, amount } = req.body;
  const success = await database.processWithdrawal(trainerId, amount);
  res.sendStatus(success ? 200 : 400);
});

app.get('/api/Collect/History/:trainerId', cors(), async (req, res) => {
  // Retrieves a trainer's full payment transaction history
  const trainerId = req.params.trainerId;
  const transactions = await database.getTransactionHistory(trainerId);
  res.json(transactions);
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

//#region CalorieTracker
app.get('/api/CalorieTracker/:id', cors(), async (req, res) => {
  // Get a list of all calorie trackers (history) by trainee id
  const id = req.params.id
  const calorieTrackers = await database.getCalorieTrackers(id)
  res.json(calorieTrackers);
});

app.post('/api/CalorieTracker', cors(), async (req, res) => {
  // Creates a CalorieTracker
  const calorieTracker = req.body
  const status = await database.createCalorieTracker(calorieTracker)
  res.sendStatus(status);
});

app.get('/api/CalorieTracker/:id/:date', cors(), async (req, res) => {
  // Get a specific calorieTracker for trainee id and date
  const id = req.params.id
  const date = req.params.date
  const calorieTracker = await database.getCalorieTracker(id, date)
  res.json(calorieTracker);
});

app.put('/api/CalorieTracker/:id/:date', cors(), async (req, res) => {
  // Updates a calorietracker
  const id = req.params.id
  const date = req.params.date
  const calorieTracker = req.body
  const status = await database.updateCalorieTracker(id, date, calorieTracker)
  res.sendStatus(status);
});
//regionend

//#region Workout Plan
app.get('/api/WorkoutPlan/:id', cors(), async (req, res) => {
  // Get a specific workoutPlan
  const id = req.params.id
  const workoutPlan = await database.getWorkoutPlan(id)
  res.json(workoutPlan);
});

app.post('/api/WorkoutPlan', cors(), async (req, res) => {
  // Creates a Workoutplan
  const workoutPlan = req.body
  const status = await database.createworkoutplan(workoutPlan)
  res.sendStatus(status);
});
//regionend


// ExpressJS code
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('An unhandled exception occured. Please try again later.')
})

const port = 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));