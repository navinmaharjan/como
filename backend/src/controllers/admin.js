const jwt = require("jsonwebtoken");

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

      const adminToken = jwt.sign ({
         email, 
         password
      }, process.env.SECRET_KEY, {expiresIn: '30m'})

      return res.status(200).json({adminToken, isLoggedIn: true,  msg: "Admin login successful" });

   } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "An error occurred during login" });
   }
};

module.exports = { adminLogin }