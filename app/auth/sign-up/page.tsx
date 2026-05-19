import { redirect } from "next/navigation"

// Sign-up is disabled — this is a single-owner site.
// Anyone hitting /auth/sign-up is redirected to /auth/login.
export default function Page() {
  redirect("/auth/login")
}
