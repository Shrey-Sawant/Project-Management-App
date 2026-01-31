import { Request, Response } from "express"
import bcrypt from "bcryptjs"
import { User } from "../models/user.model.js"


export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" })
      return
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      res.status(409).json({ message: "User already exists" })
      return
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    })

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    })
  } catch (error) {
    res.status(500).json({ message: "Signup failed" })
  }
}

/* ---------------- LOGIN ---------------- */

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" })
      return
    }

    const user = await User.findOne({ email }).select("+password")

    if (!user || !user.password) {
      res.status(401).json({ message: "Invalid credentials" })
      return
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password // ✅ now guaranteed string
    )

    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid credentials" })
      return
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    })
  } catch (error) {
    res.status(500).json({ message: "Login failed" })
  }
}

/* ---------------- GET USERS ---------------- */

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().select("-password")
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users" })
  }
}
