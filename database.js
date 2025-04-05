import mysql from 'mysql2'
// Really bad practice, demonstrational purposes only
// const pool = mysql.createPool({
//     host: '',
//     user: '',
//     password: '',
//     database: ''
// }).promise()

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
