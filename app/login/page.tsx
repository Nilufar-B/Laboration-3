"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Login = () => {
  const [userData, setUserData] = useState({ email: '', password: '' })
    const [error, setError] = useState("")
    const router = useRouter()

    const isValidEmail = (email: string) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
        return emailRegex.test(email)
    }

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setUserData({ ...userData, [event.target.name]: event.target.value });
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const { email, password } = userData

        if (!isValidEmail(email)) {
            setError("Invalid email")
            return
        }

        if (password.length < 5) {
            setError("Password is invalid")
            return
        }

        try {
           
            const res = await fetch("api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            })
            console.log(res)

            if (res.status === 401) {
                setError("Invalid credentials")
            } else if (res.status === 200) {
                setError("");
                router.push("/dashboard")
            }
        } catch (error) {
            setError("Error, try again")
            console.log(error)
        }
    }

    return (
        <div className='flex min-h-screen flex-col items-center justify-between p-24'>
            <div className='bg [#212121] p-8 rounded shadow-md w-96'>
                <h3 className='text-4xl text-center font-semibold mb-8'>Login</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        name='email'
                        value={userData.email}
                        onChange={handleOnChange}
                        className='w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black'
                        placeholder='Email'
                        required
                    />
                    <input
                        type='password'
                        name='password'
                        value={userData.password}
                        onChange={handleOnChange}
                        className='w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black'
                        placeholder='Password'
                        required
                    />
                    <button
                        type='submit'
                        className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'
                    >
                        Login
                    </button>
                    <p className='text-red-600 text-[16px] mb-4'>{error && error}</p>
                </form>
                <div className='text-center text-gray-500 mt-4'>-OR-</div>
                <div className='flex justify-center items-center mt-2'>
                <p className='text-center mt-2 text-sm'> Don`t have an account?
                <Link className='text-blue-500 hover:underline mt-2' href='/register'>
                     Register here.
                </Link>
                </p>
                </div>
            </div>
        </div>
    )
}

export default Login
