// login.ts

import { UserModel } from "@/utils/models/userModel"
import { User } from "@/utils/types/user"
import { dbConnect } from "@/utils/db"
import bcrypt from "bcrypt"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  await dbConnect(); // Connect to the MongoDB database

  try {
    const { email, password }: User = await request.json() // Parse JSON from the request body

    // Validate the request body
    if (!email || !password) {
      return NextResponse.json({ message: "Invalid request body" }, { status: 400 })
    }

    const existingUser = await UserModel.findOne({ email })

    // If the user doesn't exist, return an error message
    if (!existingUser) {
      return NextResponse.json({ message: "User not found", status: 404 })
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password)

    // If the password doesn't match, return an error message
    if (!passwordMatch) {
      return NextResponse.json({ message: "Invalid credentials", status: 401 })
    }

    // Return a success message for login
    return NextResponse.json({ message: "Login successful", user: existingUser })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "Error", error }, { status: 500 })
  }
}
