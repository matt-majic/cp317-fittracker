import mysql from 'mysql2'
import dotenv from 'dotenv'
// To access the SQL server, you must get the .env file from Discord
// const pool = mysql.createPool({
//     host: process.env.SQL_HOST,
//     user: process.env.SQL_USER,
//     password: process.env.SQL_PASSWORD,
//     database: process.env.SQL_DATABASE
// }).promise()
// dotenv.config()

// #region Trainee
export async function getTrainee(id) {
    return { id: id }
}

export async function createTrainee(trainee) {
    return 200
}

export async function updateTrainee(id, trainee) {
    return 200
}

export async function getTraineeSessions(id) {
    return { id: id }
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
    return 201
}

export async function getPayment(id) {
    return { id: id }
}

export async function getPaymentsByUserId(userId) {
    return { userId: userId }
}

export async function updatePaymentStatus(id, newStatus) {
    return 200
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
    return { id: id }
}
export async function calorieTrackerController(id, date) {
    return true
}
export async function updateCalorieTracker(id, date) {
    return 200
}
// #endregion

// #region workoutplan
export async function getWorkoutPlan(id) {
    return { id: id }
}
export async function createworkoutplan(id) {
    return 200
}
// #endregion

