import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const email = typeof body?.email === "string" ? body.email : ""
    const password = typeof body?.password === "string" ? body.password : ""

    const adminEmail = process.env.ADMIN_EMAIL ?? ""
    const adminPassword = process.env.ADMIN_PASSWORD ?? ""

    if (!adminEmail || !adminPassword) {
      return NextResponse.json({ error: "Admin credentials not configured" }, { status: 500 })
    }

    if (email === adminEmail && password === adminPassword) {
      return NextResponse.json({ ok: true }, { status: 200 })
    }

    return NextResponse.json({ ok: false }, { status: 401 })
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}
