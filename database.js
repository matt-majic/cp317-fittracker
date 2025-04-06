import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
    port: process.env.SQL_PORT
}).promise()

export default pool

//Helper
async function query(sql, params) {
    const [rows] = await pool.query(sql, params)
    return rows
}


// #region Trainee
export async function getTrainee(id) {
    const trainee = await query('SELECT * FROM trainees WHERE user_id = ?', [id])
    return trainee[0]
}

export async function createTrainee(trainee) {
    const { email, password, firstName, lastName, height, weight, gender, age, weightGoal, weightGoalDuration, interests } = trainee

    // Step 1: Insert into users
    const userResult = await query(
        'INSERT INTO users (email, password, firstName, lastName) VALUES (?, ?, ?, ?)',
        [email, password, firstName, lastName]
    )
    const userId = userResult.insertId

    // Step 2: Insert into trainees
    await query(
        `INSERT INTO trainees (user_id, height, weight, gender, age, weightGoal, weightGoalDuration, interests)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [userId, height, weight, gender, age, weightGoal, weightGoalDuration, interests]
    )

    return 200
}


export async function updateTrainee(id, trainee) {
    const { height, weight, gender, age, weightGoal, weightGoalDuration, interests } = trainee

    await query(
        `UPDATE trainees
         SET height = ?, weight = ?, gender = ?, age = ?, weightGoal = ?, weightGoalDuration = ?, interests = ?
         WHERE user_id = ?`,
        [height, weight, gender, age, weightGoal, weightGoalDuration, interests, id]
    )

    return 200
}


export async function getTraineeSessions(id) {
    const sessions = await query(
        `SELECT s.*, sess.link
         FROM services s
         JOIN sessions sess ON s.id = sess.service_id
         WHERE s.trainee_id = ?`,
        [id]
    )
    return sessions
}

export async function getNutritionTracker(id) {
    return { id: id }
}

export async function getTraineeWorkoutPlans(id) {
    return { id: id }
}

export async function getFoodPresets(id) {
    return { id: id }
}

export async function getPaymentMethod(id) {
    return { id: id }
}
// #endregion

// #region Trainer
export async function getTrainer(id) {
    return { id: id }
}
export async function createTrainer(trainer) {
    return 200
}
export async function updateTrainer(id, trainer) {
    return 200
}
export async function getTrainerSessions(id) {
    return { id: id }
}
export async function getTrainerWorkoutPlans(id) {
    return { id: id }
}
export async function getTrainerBankingInfo(id) {
    return { id: id }
}
// #endregion

// #region Payment
export async function createPayment(payment) {
    return 200
}
export async function getPayment(id) {
    return { id: id }
}
export async function getPaymentsByTrainerId(id) {
    return { id: id }
}
export async function updatePaymentStatus(id, newStatus) {
    return 200
}
export async function getPaymentsByTraineeId(id) {
    return { id: id }
}
// #endregion

// #region Collect
export async function processWithdrawal(trainerId, amount) {
    return true
}
export async function getTransactionHistory(trainerId) {
    return { trainerId: trainerId }
}
// #endregion


// #region Session
export async function getSession(id) {
    return { id: id }
}
export async function createSession(trainee) {
    return 200
}
export async function updateSession(id, session) {
    return 200
}
// #endregion


// #region CalorieTracker
export async function getCalorieTrackers(id) {
    return { id: id }
}
export async function createCalorieTracker(id) {
    return 200
}
export async function getCalorieTracker(id, date) {
    return { id: id, date: date }
}
export async function calorieTrackerController(id, date) {
    return true
}
export async function updateCalorieTracker(id, date) {
    return 200
}
// #endregion

// #region WorkoutPlan
export async function getWorkoutPlan(id) {
    return { id: id }
}
export async function createWorkoutPlan(id) {
    return 200
}
// #endregion

// #region Nutrition Tracker
export async function addFood(userId, food, quantity) {
    return 200
}
export async function removeFood(userId, food) {
    return 200
}
export async function getTotalCalories(userId) {
    return { userId: userId, totalCalories: 1234 }
}
export async function getFoodLog(userId) {
    return { userId: userId, foodItems: [] }
}
// #endregion

// #region Application
export async function getAllWorkoutPlans() {
    return [{ name: 'Workout Plan 1' }]
}
export async function getMetList() {
    return [{ met: 7.5 }]
}
// #endregion

// #region Food
export async function addFoodPreset(traineeId, food) {
    return 200
}
export async function removeFoodPreset(traineeId, foodId) {
    return 200
}
// #endregion

// #region Services Controller
export async function addActiveSession(sessionId) {
    return 200
}
export async function removeActiveSession(sessionId) {
    return 200
}
export async function fetchActiveSessions(traineeId) {
    return { id: traineeId }
}
// #endregion

// #region Activity
export async function getActivity(id) {
    return { id: id }
}
export async function getActivitiesByUser(userId) {
    return { userId: userId, activities: [] }
}
export async function addActivity(userId, activity) {
    return 200
}
export async function deleteActivity(id) {
    return 200
}
// #endregion

// #region Payment Method
export async function getPaymentMethod(traineeId) {
    return { traineeId: traineeId }
}
export async function savePaymentMethod(traineeId, paymentMethod) {
    return 200
}
export async function deletePaymentMethod(traineeId) {
    return 200
}
// #endregion

// #region Nutrition Controller
export async function calculateMacros(weight, goal, activityLevel) {
    return { weight: weight }
}
export async function analyzeNutrition(userId) {
    return { userId: userId }
}
export async function getNutritionRecommendations(userId) {
    return { userId: userId }
}
// #endregion