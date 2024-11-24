const Admin = require('../models/admin')

const adminLogin = async (req, res) => {
   const adminEmail = process.env.ADMIN_EMAIL;
   const adminPassword = process.env.ADMIN_PASSWORD;
   const { email, password } = req.body;

   try {
      if (email !== adminEmail) {
         return res.status(401).json({ msg: "Invalid login email" });
      }

      if (password !== adminPassword) {
         return res.status(401).json({ msg: "Wrong password" });
      }

      return res.status(200).json({isLoggedIn: true,  msg: "Admin login successful" });

   } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "An error occurred during login" });
   }
};

module.exports = { adminLogin }