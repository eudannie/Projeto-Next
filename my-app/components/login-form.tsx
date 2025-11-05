"use client"

import { useState } from "react"
import { redirect, useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { set } from "better-auth"

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    const result = await authClient.signIn.email({
      email,
      password,
    },

    {
      onSuccess: () => redirect("/dashboard"),
      onRequest: () => setLoading(true),
      onResponse: () => setLoading(false),
      onError: (ctx) => setError(ctx.error.message)
    }
  
  
  
  )

  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Entrar</CardTitle>
        <CardDescription>Faça login com seu e-mail e senha</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleLogin}>
          <FieldGroup>
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input
                type="email"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Field>

            <Field>
              <FieldLabel>Senha</FieldLabel>
              <Input
                type="password"
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Field>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <Button type="submit" className="w-full mt-4" disabled={loading}>
              {loading ? "Carregando..." : "Entrar"}
            </Button>

            <FieldDescription className="text-center mt-2">
              Não tem conta? <a href="/signup" className="underline">Criar conta</a>
            </FieldDescription>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
