"use client";

import { useState } from "react";
import { loginAction } from "../../actions/auth";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [result, setResult] = useState(null);

  const handleLogin = async (formData) => {
    const res = await loginAction(formData);
    setResult(res);
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-6">
          <h1 className="text-2xl font-bold text-blue-600">ApexFinance</h1>
          <h2 className="text-xl font-semibold">Acesse sua conta</h2>
          <p className="text-gray-500 text-sm">
            Gerencie seus cupons, acompanhe resultados e conecte sua loja a
            novos clientes.
          </p>

          <form action={handleLogin} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Insira seu e-mail"
                className="mt-1 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Insira sua senha"
                className="mt-1 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="text-right mt-1">
                <Link
                  href="#"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Esqueci minha senha
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white rounded-md py-2 font-semibold hover:bg-blue-700 transition"
            >
              Entrar →
            </button>
          </form>

          {result && (
            <p
              className={`text-sm mt-2 ${
                result.success ? "text-green-600" : "text-red-600"
              }`}
            >
              {result.message}
            </p>
          )}

          <p className="text-sm text-gray-600 text-center">
            Ainda não tem uma conta?{" "}
            <Link href="#" className="text-blue-600 hover:underline">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex w-1/2 bg-gradient-to-r rounded-l-3xl from-[#5488DD] to-[#55B0FF] text-white items-center justify-center p-8 relative">
        <Image
          src="/loginbg.png"
          alt="Equipe"
          fill
          className="object-cover opacity-30 rounded-l-3xl"
        />
        <div className="relative max-w-md">
          <h2 className="text-3xl font-bold leading-tight">
            Sua gestão financeira com mais clareza e controle.
          </h2>
          <p className="mt-4 text-sm text-gray-100">
            Lorem ipsum et dictum sagittis viverra vitae massa dignissim erat
            malesuada nunc arcu cras id sed.
          </p>
        </div>
      </div>
    </div>
  );
}
