'use client'

import { useState } from "react"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { redirect } from "next/navigation"

function Spinner() {
  return (
    <svg
      className="animate-spin text-white"
      width="20"
      height="20"
      viewBox="0 0 50 50"
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="31.4 31.4"
      />
    </svg>
  )
}

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirm = formData.get("confirm-password") as string

    if (password !== confirm) {
      setError("As senhas não coincidem.")
      return
    }

    setLoading(true)
    setError("")

    await authClient.signUp.email(
      {
        email,
        password,
        name,
      },
      {
        onSuccess: () => redirect("/login"),
        onError: (ctx) => setError(ctx.error.message),
        onResponse: () => setLoading(false),
      }
    )
  }

  return (
    <Card {...props} className="max-w-md mx-auto mt-10 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Criar conta
        </CardTitle>
        <CardDescription className="text-center">
          Preencha as informações abaixo para se cadastrar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignup}>
          <FieldGroup className="space-y-3">
            <Field>
              <FieldLabel htmlFor="name">Nome completo</FieldLabel>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Ex: Ana Souza"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="email">E-mail</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="exemplo@email.com"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Senha</FieldLabel>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Mínimo 8 caracteres"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirmar senha
              </FieldLabel>
              <Input
                id="confirm-password"
                name="confirm-password"
                type="password"
                placeholder="Repita sua senha"
                required
              />
            </Field>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <Button
              className="w-full mt-4"
              type="submit"
              disabled={loading}
            >
              {loading ? <Spinner /> : "Criar conta"}
            </Button>

            <p className="text-sm text-center text-muted-foreground mt-3">
              Já tem uma conta?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Entrar
              </Link>
            </p>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
