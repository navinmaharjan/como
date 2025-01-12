const express = require('express')
const router = express.Router()
const { adminLogin } = require('../controllers/admin')
const authMiddleware = require('../middleware/auth-middleware')

router.post('/admin/login', adminLogin)
router.get('/admin/dashboard', authMiddleware, (req, res) => {
    res.json({
        message: 'Welcome to admin dashboard'
    })
})

module.exports = router