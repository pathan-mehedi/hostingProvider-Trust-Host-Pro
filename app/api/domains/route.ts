import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  const supabase = createServerClient()

  // Get user from auth header
  const authHeader = request.headers.get("authorization")
  if (!authHeader) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser(authHeader.replace("Bearer ", ""))

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data: domains, error } = await supabase
    .from("domains")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ domains })
}

export async function POST(request: NextRequest) {
  const supabase = createServerClient()
  const body = await request.json()

  // Get user from auth header
  const authHeader = request.headers.get("authorization")
  if (!authHeader) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser(authHeader.replace("Bearer ", ""))

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data: domain, error } = await supabase
    .from("domains")
    .insert({
      user_id: user.id,
      domain_name: body.domain_name,
      registration_date: new Date().toISOString().split("T")[0],
      expiry_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      nameservers: body.nameservers || [],
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ domain })
}
