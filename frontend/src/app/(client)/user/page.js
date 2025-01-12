'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const DashboardPage = () => {
  const [welcomeMessage, setWelcomeMessage] = useState('')
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          router.push('/auth/login')
          return
        }

        const response = await axios.get("http://localhost:8000/user", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response)
        setWelcomeMessage(response.data.message)
        setUser(response.data.user)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        if (error.response && error.response.status === 401) {
          setError('Unauthorized access. Please log in again.')
          localStorage.removeItem('token')
          router.push('/login')
        } else {
          setError('An error occurred while fetching dashboard data.')
        }
      }
    }

    fetchDashboardData()
  }, [router])

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="p-4">
      {/* <h1 className="text-2xl font-bold mb-4">Dashboard</h1> */}
      {welcomeMessage && <p className="mb-4">{welcomeMessage}</p>}
      {user && (
        <div>
          <h2 className="text-xl font-semibold mb-2">User Information</h2>
          <p>Username: {user.fullName}</p>
          <p>Email: {user.email}</p>
          <p>User ID: {user._id}</p>
        </div>
      )}
    </div>
  )
}

export default DashboardPage
