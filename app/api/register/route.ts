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

    // If the user exists, return an error message
    if (existingUser) {
      return NextResponse.json({ message: "Email is already in use", status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    // Create a new user using the UserModel
    const newUser = await UserModel.create({ email, password: hashedPassword }); // Create a new User using the UserModel

    return NextResponse.json({ message: "User created successfully", user: newUser }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "Error", error }, { status: 500 })
  }
}
