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
        return {}
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
            [userId, trainee["height"], trainee["weight"], trainee["gender"], trainee["age"], trainee["weightGoal"], trainee["weightGoalDuration"], trainee["interests"]]
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
        return []
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
// #endregion

// #region Trainer
export async function getTrainer(id) {
    try {
        const result = await query(
            `SELECT * FROM trainers WHERE user_id = ?`,
            [id]
        )
        return result[0]
    } catch (error) {
        console.error('Error: Get Trainer', error.message)
        return []
    }
}
export async function createTrainer(trainer) {
    try {
        const userResult = await query(
            'INSERT INTO users (email, password, firstName, lastName) VALUES (?, ?, ?, ?)',
            [trainer["email"], trainer["password"], trainer["firstName"], trainer["lastName"]]
        )
        const userId = userResult.insertId

        await query(
            `INSERT INTO trainers (user_id, qualifications, experience, bankingInfo, balance)
             VALUES (?, ?, ?, ?, ?)`,
            [userId, trainer["qualifications"], trainer["experience"], trainer["bankingInfo"], trainer["balance"]]
        )

        return 200
    } catch (error) {
        console.error('Error: Create Trainer', error.message)
        return 400
    }
}
export async function updateTrainer(id, trainer) {
    try {
        await query(
            `UPDATE trainers
            SET qualifications = ?, experience = ?, bankingInfo = ?, balance = ?
            WHERE user_id = ?`,
            [trainer["qualifications"], trainer["experience"], trainer["bankingInfo"], trainer["balance"], id]
        )
    } catch (error) {
        console.error('Error: Update Trainer', error.message)
        return 400
    }
    return 200
}
export async function getTrainerSessions(id) {
    try {
        const sessions = await query(
            `SELECT s.*, sess.link
             FROM services s
             JOIN sessions sess ON s.id = sess.service_id
             WHERE s.trainer_id = ?`,
            [id]
        )
        return sessions
    } catch (error) {
        console.error('Error: Get Trainer Sessions', error.message)
        return []
    }
}
export async function getTrainerWorkoutPlans(id) {
    try {
        const result = await query(
            `SELECT *
            FROM workout_plans wp JOIN services s ON wp.service_id = s.id
            JOIN trainers tr ON s.trainer_id = tr.user_id
            WHERE 
            tr.user_id = ?`,
            [id]
        )
        return result
    } catch (error) {
        console.error('Error: Get Trainer Workout Plans', error.message)
        return []
    }
}
export async function getTrainerBankingInfo(id) {
    try {
        const result = await query(
            `SELECT t.user_id, t.bankingInfo
            FROM trainers t
            WHERE t.user_id = ?`,
            [id]
        )
        return result
    } catch (error) {
        console.error('Error: Get Trainer BankingInfo', error.message)
        return []
    }
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

// Simple Payment
export async function buyWorkoutPlan(workoutPlan) {
    try {
        const result = await createWorkoutPlan(workoutPlan)

        if (result.status !== 200) {
            return 400
        }

        const { serviceId } = result

        const service = await query(
            `SELECT trainer_id FROM services WHERE id = ?`,
            [serviceId]
        )

        if (service.length === 0) {
            console.error('Error: Service not found after creation')
            return 400
        }

        const { trainer_id } = service[0]
        // Assuming each cost $25 for simplicity
        await query(
            `UPDATE trainers
             SET balance = balance + 25
             WHERE user_id = ?`,
            [trainer_id]
        )

        return 200
    } catch (error) {
        console.error('Error: Buy Workout Plan', error.message)
        return 400
    }
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
export async function getSession(serviceId) {
    try {
        const session = await query(
            `SELECT sess.*, s.*
             FROM sessions sess
             JOIN services s ON sess.service_id = s.id
             WHERE sess.service_id = ?`,
            [serviceId]
        )
        return session[0] // Return single session object
    } catch (error) {
        console.error('Error: Get Session', error.message)
        return []
    }
}

export async function createSession(session) {
    try {
        const serviceResult = await query(
            `INSERT INTO services (trainee_id, trainer_id, name, description, totalCalories, date)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [session["trainee_id"], session["trainer_id"], session["name"], session["description"], session["totalCalories"], session["date"]]
        )
        const serviceId = serviceResult.insertId

        await query(
            `INSERT INTO sessions (service_id, link)
             VALUES (?, ?)`,
            [serviceId, session["link"]]
        )

        return 200
    } catch (error) {
        console.error('Error: Create Session', error.message)
        return 400
    }
}
export async function updateSession(serviceId, session) {
    try {
        await query(
            `UPDATE services
             SET name = ?, description = ?, totalCalories = ?, date = ?
             WHERE id = ?`,
            [session["name"], session["description"], session["totalCalories"], session["date"], session["serviceId"]]
        )

        await query(
            `UPDATE sessions
             SET link = ?
             WHERE service_id = ?`,
            [session["link"], serviceId]
        )

        return 200
    } catch (error) {
        console.error('Error: Update Session', error.message)
        return 400
    }
}

// #endregion


// #region CalorieTracker
export async function getCalorieTrackers(id) {
    try {
        const calorieTracker = await query('SELECT * FROM calorie_trackers WHERE user_id = ?', [id])
        return calorieTracker
    } catch (error) {
        console.error('Error: Get Calorie Trackers', error.message)
        return []
    }
}

export async function createCalorieTracker(calorieTracker) {
    try {
        await query(
            'INSERT INTO calorie_trackers (user_id, date, calorieIn, calorieOut, calorieGoal) VALUES (?, ?, ?, ?, ?)',
            [calorieTracker["user_id"], calorieTracker["date"], calorieTracker["calorieIn"], calorieTracker["calorieOut"], calorieTracker["calorieGoal"]]
        )
        return 200
    } catch (error) {
        console.error('Error: Create Calorie Tracker', error.message)
        return 400
    }
}


export async function getCalorieTracker(id, date) {
    try {
        const calorieTracker = await query('SELECT * FROM calorie_trackers WHERE user_id = ? AND date = ?', [id, date])
        return calorieTracker[0]
    } catch (error) {
        console.error('Error: Get Calorie Tracker', error.message)
        return []
    }
}

export async function updateCalorieTracker(id, date, calorieTracker) {
    try {
        await query(
            `UPDATE calorie_trackers
            SET calorieIn = ?, calorieOut = ?, calorieGoal = ?
            WHERE user_id = ? AND date = ?`,
            [calorieTracker["calorieIn"], calorieTracker["calorieOut"], calorieTracker["calorieGoal"], id, date]
        )
        return 200
    } catch (error) {
        console.error('Error: Update Calorie Tracker', error.message)
        return 400
    }
}
// #endregion

// #region WorkoutPlan
export async function getWorkoutPlan(id) {
    try {
        const workout_plan = await query(
            `SELECT wp.*, s.*
             FROM workout_plans wp
             JOIN services s ON wp.service_id = s.id
             WHERE s.trainee_id = ?`,
            [id]
        )
        return workout_plan
    } catch (error) {
        console.error('Error: Get Workout Plan', error.message)
        return []
    }
}

export async function createWorkoutPlan(workoutPlan) {
    try {
        const serviceResult = await query(
            `INSERT INTO services (trainee_id, trainer_id, name, description, totalCalories, date)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [workoutPlan["trainee_id"], workoutPlan["trainer_id"], workoutPlan["name"], workoutPlan["description"], workoutPlan["totalCalories"], workoutPlan["date"]]
        )
        const serviceId = serviceResult.insertId

        await query(
            `INSERT INTO workout_plans (service_id, file)
             VALUES (?, ?)`,
            [serviceId, workoutPlan["file"]]
        )

        return { status: 200, serviceId }
    } catch (error) {
        console.error('Error: Create Workout Plan', error.message)
        return { status: 400 }
    }
}


// #endregion


// #region Nutrition Tracker
export async function addFood(userId, foodId, quantity) {
    try {
        await query(
            'INSERT INTO nutrition_trackers (user_id, date, food_item_id, quantity) VALUES (?, CURRENT_DATE, ?, ?)',
            [userId, foodId, quantity]
        )
        return 200
    } catch (error) {
        console.error('Error: Add Food', error.message)
        return 400
    }
}
export async function modifyFoodQuantity(userId, foodId, quantity) {
    try {
        if (quantity <= 0)
            await query(
                'DELETE FROM nutrition_trackers WHERE user_id = ? AND food_item_id = ? AND date = CURRENT_DATE',
                [userId, foodId]
            )
        else
            await query(
                `UPDATE nutrition_trackers
                SET quantity = ?
                WHERE user_id = ? AND date = CURRENT_DATE AND food_item_id = ?`,
                [quantity, userId, foodId]
            )
        return 200
    } catch (error) {
        console.error('Error: Remove Food', error.message)
        return 400
    }
}
export async function getTotalCalories(userId) {
    try {
        const result = await query(
            `SELECT SUM(ft.calories * nt.quantity) AS totalCalories
            FROM nutrition_trackers nt
            JOIN food_items ft ON nt.food_item_id = ft.id
            WHERE nt.user_id = ? AND nt.date = CURRENT_DATE
            `, [userId]
        )
        return result
    } catch (error) {
        console.error('Error: Get Total Calories', error.message)
        return []
    }
}
export async function getFoodLog(userId) {
    try {
        const result = await query(
            `SELECT fi.name AS foodName, nt.quantity, fi.calories
            FROM nutrition_trackers nt
            JOIN food_items fi ON nt.food_item_id = fi.id
            WHERE nt.user_id = ? AND nt.date = CURRENT_DATE`, [userId]
        )
        return result
    } catch (error) {
        console.error('Error: Get Food Log', error.message)
        return []
    }
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