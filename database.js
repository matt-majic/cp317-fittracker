import mysql from 'mysql2'
// Really bad practice, demonstrational purposes only
// const pool = mysql.createPool({
//     host: '',
//     user: '',
//     password: '',
//     database: ''
// }).promise()

export async function getTrainee(id) {
    return { id: 0 }
}

export async function createTrainee(trainee) {
    return 200
}

export async function updateTrainee(id, trainee) {
    return 200
}

export async function getSessions(id) {
    return { id: 0 }
}

export async function getNutritionTracker(id) {
    return { id: 0 }
}

export async function getWorkoutPlan(id) {
    return { id: 0 }
}

export async function getFoodPresets(id) {
    return { id: 0 }
}