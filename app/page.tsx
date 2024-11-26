'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'


export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const supabase = createClient()


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      alert('Error logging in')
    } else {
      router.push('/pages/home')
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100">
      <form onSubmit={handleLogin} className="bg-white p-10 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4">Login</h2>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="flex justify-center">
          <button type="submit" className="bg-blue-500 text-white p-2 w-24 rounded">
            Login
          </button>
        </div>
        <div className="flex justify-center mt-8">
          Don´t have an account?
          <button
            type="button"
            onClick={() => router.push('/pages/register')}
            className="text-blue-500 underline ml-1"
          >
            register here
          </button>
        </div>
      </form>
    </div>
  )
}