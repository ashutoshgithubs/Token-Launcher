import React from 'react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
    const navigate = useNavigate()
  return (
    <div  className="my-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Page Not Found! :)</h1>
      <Button onClick={()=>navigate('/')}>Home</Button>
    </div>
  )
}
