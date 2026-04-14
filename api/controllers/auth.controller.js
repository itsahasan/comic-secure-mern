const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../models/User")

exports.signup = async (req, res) => {
  try {
    const { username, email, password, role } = req.body

    // 🔐 Hash password
    const hash = await bcrypt.hash(password, 12)

    const user = await User.create({
      username,
      email,
      password: hash,
      role: role || "fiend",
    })

    res.status(201).json({ message: "User created", user })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ message: "Invalid credentials" })

    // 🔐 Compare password
    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(401).json({ message: "Invalid credentials" })

    // 🔑 Create token with expiration
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    )

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })

    res.json({ message: "Login successful" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.signout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  })

  res.json({ message: "Logged out successfully" })
}

exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
