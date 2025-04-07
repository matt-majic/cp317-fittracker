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

// #region Login
export async function attemptLogin(email, password) {
    // Really crappy implementation, for demonstrational purposes only
    try {
        const result = await query('SELECT id FROM users WHERE email = ? AND password = ?', [email, password])
        const userId = result[0].id
        const traineeObj = await getTrainee(userId)
        const trainerObj = await getTrainer(userId)
        if (traineeObj != null) {
            return { userId: userId, userType: "Trainee", status: 200 }
        }
        else if (trainerObj != null) {
            return { userId: userId, userType: "Trainer", status: 200 }
        }
    } catch (error) {
        console.error('Error: Attempt Login', error.message)
    }
    return { userId: null, userType: null, status: 400 }
}
// #endregion

// #region Trainee
export async function getTrainee(id) {
    try {
        const trainee = await query('SELECT * FROM trainees WHERE user_id = ?', [id])
        return trainee[0]
    } catch (error) {
        console.error('Error: Get Trainee', error.message)
        return null
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
    try {
        const tracker = await query(
            `SELECT nutrition_trackers.*
             FROM nutrition_trackers
             JOIN trainees t ON nutrition_trackers.user_id = t.user_id
             WHERE t.user_id = ?`,
            [id]
        )
        return tracker
    } catch (error) {
        console.error('Error: Get Nutrition Tracker', error.message)
        return 400
    }
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
        return null
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
        return null
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
        return null
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
        const totalCals = await getTotalCalories(userId)
        // Update calorie tracker with total cals for today
        await query(
            `UPDATE calorie_trackers
            SET calorieIn = ?
            WHERE user_id = ? AND date = CURRENT_DATE`,
            [totalCals, userId]
        )
        return 200
    } catch (error) {
        console.error('Error: Add Food (NT)', error.message)
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
        const totalCals = await getTotalCalories(userId)
        // Update calorie tracker with total cals for today
        await query(
            `UPDATE calorie_trackers
                SET calorieIn = ?
                WHERE user_id = ? AND date = CURRENT_DATE`,
            [totalCals, userId]
        )
        return 200
    } catch (error) {
        console.error('Error: Remove Food (NT)', error.message)
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
    try {
        const workoutPlans = await query(
            `SELECT workout_plans.*, services.*
             FROM workout_plans
             JOIN services ON workout_plans.service_id = services.id
             WHERE services.trainee_id IS NULL`
        )

        return workoutPlans
    } catch (error) {
        console.error('Error: Get All Workout Plans', error.message)
        return []
    }
}

// #endregion

// #region Food
export async function addFoodItem(food) {
    try {
        await query(
            'INSERT INTO food_items (name, calories) VALUES (?, ?)',
            [food["name"], food["calories"]]
        )
        return 200
    } catch (error) {
        console.error('Error: Add Food Item', error.message)
        return 400
    }
}
export async function removeFoodItem(foodId) {
    try {
        await query(
            'DELETE FROM food_items WHERE id = ?',
            [foodId]
        )
        return 200
    } catch (error) {
        console.error('Error: Remove Food Item', error.message)
        return 400
    }
}
// #endregion

// #region Service Controller

export async function getTraineeServices(traineeId) {
    try {
        const services = await query(
            `SELECT services.*, workout_plans.file AS workoutPlanFile, sess.link AS sessionLink
             FROM services
             LEFT JOIN workout_plans ON services.id = workout_plans.service_id
             LEFT JOIN sessions sess ON services.id = sess.service_id
             WHERE services.trainee_id = ?`,
            [traineeId]
        )

        return services
    } catch (error) {
        console.error('Error: Get Trainee Services', error.message)
        return 400
    }
}

export async function completeService(traineeId, serviceId) {
    try {
        const service = await query(
            `SELECT totalCalories FROM services WHERE id = ? AND trainee_id = ?`,
            [serviceId, traineeId]
        )

        const totalCalories = service[0].totalCalories
        const today = new Date().toISOString().slice(0, 10)

        
        const existingTracker = await query(
            `SELECT * FROM calorie_trackers WHERE user_id = ? AND date = ?`,
            [traineeId, today]
        )

        if (existingTracker.length === 0) {
            await query(
                `INSERT INTO calorie_trackers (user_id, date, calorieIn, calorieOut, calorieGoal)
                 VALUES (?, ?, 0, ?, 2000)`,
                [traineeId, today, totalCalories]
            )
        } else {
            await query(
                `UPDATE calorie_trackers
                 SET calorieOut = calorieOut + ?
                 WHERE user_id = ? AND date = ?`,
                [totalCalories, traineeId, today]
            )
        }

        return 200
    } catch (error) {
        console.error('Error: Complete Service', error.message)
        return 400
    }
}


// #endregion

// #region Payment Method
export async function getPaymentMethod(traineeId) {
    try {
        const paymentMethod = await query(
            'SELECT * FROM payment_methods WHERE user_id = ?',
            [traineeId]
        )
        return paymentMethod[0]

    } catch (error) {
        console.error('Error: Get Payment Method', error.message)
        return 400
    }
}

export async function savePaymentMethod(traineeId, paymentMethod) {
    try {

        const { issuer, cardHolderName, cardNum, expiration, cvv, billingAddress } = paymentMethod

        await query(
            `INSERT INTO payment_methods (user_id, issuer, cardHolderName, cardNum, expiration, cvv, billingAddress)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [traineeId, issuer, cardHolderName, cardNum, expiration, cvv, billingAddress]
        )
    
        return 200

    } catch (error) {

        console.error('Error: Save Payment Method', error.message)
        return 400
    }
}

export async function deletePaymentMethod(traineeId) {
    try {
        await query(
            'DELETE FROM payment_methods WHERE user_id = ?',
            [traineeId]
        )
        return 200

    } catch (error) {

        console.error('Error: Delete Payment Method', error.message)
        return 400
    }
}

// #endregion