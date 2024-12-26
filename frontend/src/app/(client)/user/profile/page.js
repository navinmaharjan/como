'use client'

import React from 'react'
import { useSelector } from 'react-redux';

const UserProfilePage = () => {
  const { userDetails, isLoggedIn } = useSelector((state) => state.user);
  return (
    <div>{JSON.stringify(userDetails)}</div>
  )
}

export default UserProfilePage