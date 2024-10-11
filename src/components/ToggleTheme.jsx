import React from 'react'
import { Moon, Sun } from "lucide-react"
import { useState, useEffect } from 'react'
import { Button } from './ui/button'

export default function ToggleTheme() {
        const [theme, setTheme] = useState('light')
        useEffect(() => {
          const savedTheme = localStorage.getItem('theme') || 'light'
          setTheme(savedTheme)
          document.documentElement.classList.toggle('dark', savedTheme === 'dark')
        }, [])
      
        const toggleTheme = () => {
          const newTheme = theme === 'light' ? 'dark' : 'light'
          setTheme(newTheme)
          localStorage.setItem('theme', newTheme)
          document.documentElement.classList.toggle('dark', newTheme === 'dark')
        }
      
        return (
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="fixed top-4 right-4 z-10"
          >
            {theme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
          </Button>
        )
 }

