const mongoose = require('mongoose');

const connectDatabase = async () => {
    try {
        const response = await mongoose.connect("mongodb://127.0.0.1:27017/como_DB")
        if (response) console.log('Connected to database 👍')
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDatabase