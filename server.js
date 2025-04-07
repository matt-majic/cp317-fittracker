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

// Simple
app.post('/api/WorkoutPlan/Buy', cors(), async (req, res) => {
  const workoutPlan = req.body
  const result = await database.buyWorkoutPlan(workoutPlan)

  if (result.status !== 200) {
    return res.sendStatus(result.status)
  }

  res.status(200).json({
    serviceId: result.serviceId,
    newBalance: result.newBalance
  })
})

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
  const workoutPlan = req.body
  const result = await database.createWorkoutPlan(workoutPlan)

  if (result.status !== 200) {
    return res.sendStatus(result.status)
  }

  res.status(200).json({ serviceId: result.serviceId })
})

//regionend

// #region Nutrition Tracker
app.post('/api/Nutrition/AddFood', cors(), async (req, res) => {
  // Adds a food item to the user's nutrition tracker
  const { userId, foodId, quantity } = req.body;
  const result = await database.addFood(userId, foodId, quantity);
  res.sendStatus(result);
});

app.post('/api/Nutrition/ModifyFood', cors(), async (req, res) => {
  // Modifys a food item quantity in the user's nutrition tracker
  const { userId, foodId, quantity } = req.body;
  const result = await database.modifyFoodQuantity(userId, foodId, quantity);
  res.sendStatus(result);
});

app.get('/api/Nutrition/TotalCalories/:id', cors(), async (req, res) => {
  // Gets the day's total calories for the user's current nutrition log
  const id = req.params.id;
  const result = await database.getTotalCalories(id);
  res.json(result);
});

app.get('/api/Nutrition/FoodLog/:userId', cors(), async (req, res) => {
  // Gets the list of food items the user has logged
  const userId = req.params.userId;
  const result = await database.getFoodLog(userId);
  res.json(result);
});

// #endregion

// #region Application

app.get('/api/Application/WorkoutPlans', cors(), async (req, res) => {
  // Get all workout plans
  const result = await database.getAllWorkoutPlans();
  res.json(result);
});

app.get('/api/Application/MetList/', cors(), async (req, res) => {
  // Retrieve MET information for activities
  const result = await database.getMetList();
  res.json(result);
});

// #endregion

// #region Food 
app.post('/api/FoodPresets', cors(), async (req, res) => {
  // Add a new food preset for a trainee
  const { traineeId, food } = req.body;
  const result = await database.addFoodPreset(traineeId, food);
  res.sendStatus(result);
});

app.delete('/api/FoodPresets', cors(), async (req, res) => {
  // Remove a food preset from the trainee's list
  const { traineeId, foodId } = req.body;
  const result = await database.removeFoodPreset(traineeId, foodId);
  res.sendStatus(result);
});

// #endregion

// #region Services Controller
app.post('/api/ServicesController/ActiveSessions', cors(), async (req, res) => {
  // Adds an active session
  const { sessionId } = req.body
  const status = await database.addActiveSession(sessionId)
  res.sendStatus(status);
});

app.delete('/api/ServicesController/ActiveSessions', cors(), async (req, res) => {
  // Remove an active session
  const { sessionId } = req.body
  const status = await database.removeActiveSession(sessionId)
  res.sendStatus(status);
});

app.get('/api/ServicesController/ActiveSessions/:traineeId', cors(), async (req, res) => {
  // Retrieve active sessions for trainee id
  const id = req.params.traineeId;
  const result = await database.fetchActiveSessions(id);
  res.json(result);
});

// #endregion

// #region Activity

app.get('/api/Activity/:id', cors(), async (req, res) => {
  // Retrieve a specific activity by ID
  const id = req.params.id;
  const result = await database.getActivity(id);
  res.json(result);
});

app.get('/api/Activity/User/:userId', cors(), async (req, res) => {
  // Get all activities logged by a specific user
  const userId = req.params.userId;
  const result = await database.getActivitiesByUser(userId);
  res.json(result);
});

app.post('/api/Activity', cors(), async (req, res) => {
  // Log a new activity for a user
  const { userId, activity } = req.body;
  const result = await database.addActivity(userId, activity);
  res.sendStatus(result);
});

app.delete('/api/Activity/:id', cors(), async (req, res) => {
  // Delete a specific activity
  const id = req.params.id;
  const result = await database.deleteActivity(id);
  res.sendStatus(result);
});

// #endregion

// #region Payment method

app.get('/api/PaymentMethod/:traineeId', cors(), async (req, res) => {
  //Get the saved payment method for a trainee
  const traineeId = req.params.traineeId;
  const result = await database.getPaymentMethod(traineeId);
  res.json(result);
});

app.post('/api/PaymentMethod', cors(), async (req, res) => {
  // Add or update a trainee's payment method
  const { traineeId, paymentMethod } = req.body;
  const result = await database.savePaymentMethod(traineeId, paymentMethod);
  res.sendStatus(result);
});

app.delete('/api/PaymentMethod/:traineeId', cors(), async (req, res) => {
  // Delete the saved payment method for a trainee
  const traineeId = req.params.traineeId;
  const result = await database.deletePaymentMethod(traineeId);
  res.sendStatus(result);
});

// #endregion

// #region Nutrition Controller

app.post('/api/Nutrition/CalculateMacros', cors(), async (req, res) => {
  // Calculates macro goals based on user input
  const { weight, goal, activityLevel } = req.body;
  const result = await database.calculateMacros(weight, goal, activityLevel);
  res.json(result);
});

app.get('/api/Nutrition/Analyze/:userId', cors(), async (req, res) => {
  // Analyzes current nutrition log for a user
  const userId = req.params.userId;
  const result = await database.analyzeNutrition(userId);
  res.json(result);
});

app.get('/api/Nutrition/Recommendations/:userId', cors(), async (req, res) => {
  // Provides nutrition tips or suggestions for a user
  const userId = req.params.userId;
  const result = await database.getNutritionRecommendations(userId);
  res.json(result);
});

// #endregion


// ExpressJS code
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('An unhandled exception occured. Please try again later.')
})

const port = 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));