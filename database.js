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
    try {
        const trainee = await query('SELECT * FROM trainees WHERE user_id = ?', [id])
        return trainee[0]
    } catch (error) {
        console.error('Error: Get Trainee', error.message)
        return 400
    }
}

export async function createTrainee(trainee) {
    try {
        const userResult = await query(
            'INSERT INTO users (email, password, firstName, lastName) VALUES (?, ?, ?, ?)',
            [trainee["email"], trainee["password"], trainee["firstName"], trainee["lastName"]]
        )
        const userId = userResult.insertId

        await query(
            `INSERT INTO trainees (user_id, height, weight, gender, age, weightGoal, weightGoalDuration, interests)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [userId, trainee["height"], trainee["weight"], trainee["gender"], trainee["age"], trainee["weightGoal"], trainee["weightGoalDuration"], trainee[" interests"]]
        )

        return 200
    } catch (error) {
        console.error('Error: Create Trainee', error.message)
        return 400
    }
}


export async function updateTrainee(id, trainee) {
    try {
        await query(
            `UPDATE trainees
            SET height = ?, weight = ?, gender = ?, age = ?, weightGoal = ?, weightGoalDuration = ?, interests = ?
            WHERE user_id = ?`,
            [trainee["height"], trainee["weight"], trainee["gender"], trainee["age"], trainee["weightGoal"], trainee["weightGoalDuration"], trainee["interests"], id]
        )
    } catch (error) {
        console.error('Error: Update Trainee', error.message)
        return 400
    }
    return 200
}


export async function getTraineeSessions(id) {
    try {
        const sessions = await query(
            `SELECT s.*, sess.link
             FROM services s
             JOIN sessions sess ON s.id = sess.service_id
             WHERE s.trainee_id = ?`,
            [id]
        )
        return sessions
    } catch (error) {
        console.error('Error: Get Trainee Sessions', error.message)
        return 500
    }
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
    try {
        const calorieTracker = await query('SELECT * FROM calorie_trackers WHERE user_id = ?', [id])
        return calorieTracker
    } catch (error) {
        console.error('Error: Get Calorie Trackers', error.message)
        return 500
    }
}

export async function createCalorieTracker(calorieTracker) {
    try {
        const { user_id, date, calorieIn, calorieOut, calorieGoal } = calorieTracker

        await query(
            'INSERT INTO calorie_trackers (user_id, date, calorieIn, calorieOut, calorieGoal) VALUES (?, ?, ?, ?, ?)',
            [user_id, date, calorieIn, calorieOut, calorieGoal]
        )

        return 200
    } catch (error) {
        console.error('Error: Create Calorie Tracker', error.message)
        return 500
    }
}


export async function getCalorieTracker(id, date) {
    try {
        const calorieTracker = await query('SELECT * FROM calorie_trackers WHERE user_id = ? AND date = ?', [id, date])
        return calorieTracker[0]
    } catch (error) {
        console.error('Error: Get Calorie Tracker', error.message)
        return 500
    }
}

export async function updateCalorieTracker(id, date, calorieTracker) {
    try {
        const { calorieIn, calorieOut, calorieGoal } = calorieTracker

        await query(
            `UPDATE calorie_trackers
            SET calorieIn = ?, calorieOut = ?, calorieGoal = ?
            WHERE user_id = ? AND date = ?`,
            [calorieIn, calorieOut, calorieGoal, id, date]
        )
        return 200
    } catch (error){
        console.error('Error: Update Calorie Tracker', error.message)
        return 500
    }
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