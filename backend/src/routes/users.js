const express = require('express')
const router = express.Router()
const { registerNewUser, loginUser } = require('../controllers/users')
const authMiddleware = require('../middleware/auth-middleware')


router.post('/register', registerNewUser)
router.post('/login', loginUser)
router.get('/user', authMiddleware, (req, res) => {
    const {userId, fullName, email, mobile} = req.userInfo
    res.json({
        user: {
            _id: userId,
            fullName,
            email, 
            mobile
        }
    })
})

module.exports = router