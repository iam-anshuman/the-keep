"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"


export default function ModeToggle() {
  const {theme , setTheme } = useTheme()

if (theme === "dark") {
    return (
    <Button onClick={() => setTheme("light")}>
        <Moon size={24} />
    </Button>
    )
}
else{
    return (
      <Button onClick={() => setTheme("dark")}>
        <Sun size={24} />
      </Button>
    )
}
}
