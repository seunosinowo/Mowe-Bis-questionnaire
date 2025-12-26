"use client"

import type React from "react"

import { useEffect } from "react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    document.documentElement.classList.remove("dark")
  }, [])

  return <>{children}</>
}
