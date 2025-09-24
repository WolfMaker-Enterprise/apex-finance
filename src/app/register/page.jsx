"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerAction } from "../../server/actions/auth";
import { User, EnvelopeSimple, Lock } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (formData) => {
    if (loading) return;

    const name = String(formData.get("name")).trim();
    const email = String(formData.get("email")).toLowerCase().trim();
    const password = String(formData.get("password"));
    const confirmPassword = String(formData.get("confirmPassword"));

    if (!name || !email || !password || !confirmPassword) {
      setResult({ success: false, message: "Preencha todos os campos." });
      return;
    }
    if (password.length < 6) {
      setResult({
        success: false,
        message: "A senha deve ter pelo menos 6 caracteres.",
      });
      return;
    }
    if (password !== confirmPassword) {
      setResult({ success: false, message: "As senhas não coincidem." });
      return;
    }

    const normalized = new FormData();
    normalized.append("name", name);
    normalized.append("email", email);
    normalized.append("password", password);

    setLoading(true);
    const res = await registerAction(normalized);
    setLoading(false);
    setResult(res);

    if (res && res.success) {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Coluna esquerda: formulário */}
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <div className="max-w-md w-full space-y-7">
          <h1 className="text-4xl font-bold text-blue-600 mb-8">Nex Tools</h1>

          <h2 className="text-3xl font-semibold mb-2">Cadastre sua conta</h2>
          <p className="text-[#8E90A2] text-[16px]">
            Lorem ipsum integer laoreet ornare amet pellentesque.
          </p>
          <p className="text-[#8E90A2] relative -top-7 text-[16px]">
            Adipisicing dolor maecenas nunc.
          </p>

          <form action={handleRegister} className="mt-6 space-y-4">
            {/* Nome */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Nome
              </label>
              <div className="relative">
                <span className="absolute left-3 top-6 -translate-y-1/2 text-[#C0C1D1]">
                  <User size={20} />
                </span>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Insira seu nome"
                  className="mt-1 w-full rounded-[12px] border-2 border-[#E7E8F6] pl-10 py-2 text-sm"
                />
              </div>
            </div>

            {/* E-mail */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                E-mail
              </label>
              <div className="relative">
                <span className="absolute left-3 top-6 -translate-y-1/2 text-[#C0C1D1]">
                  <EnvelopeSimple size={20} />
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Insira seu e-mail"
                  className="mt-1 w-full rounded-[12px] border-2 border-[#E7E8F6] pl-10 py-2 text-sm"
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Senha
              </label>
              <div className="relative">
                <span className="absolute left-3 top-6 -translate-y-1/2 text-[#C0C1D1]">
                  <Lock size={20} />
                </span>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Insira sua senha"
                  className="mt-1 w-full rounded-[12px] border-2 border-[#E7E8F6] pl-10 py-2 text-sm"
                  minLength={6}
                />
              </div>
            </div>

            {/* Confirmar Senha */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium"
              >
                Repita a senha
              </label>
              <div className="relative">
                <span className="absolute left-3 top-6 -translate-y-1/2 text-[#C0C1D1]">
                  <Lock size={20} />
                </span>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  placeholder="Insira sua senha"
                  className="mt-1 w-full rounded-[12px] border-2 border-[#E7E8F6] pl-10 py-2 text-sm"
                  minLength={6}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white rounded-md py-2 font-semibold hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Cadastrando..." : "Cadastrar"}
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
            Já tem uma conta?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Faça login
            </Link>
          </p>
        </div>
      </div>

      {/* Coluna direita: imagem + gradiente + headline */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-r from-[#5488DD] to-[#55B0FF] text-white items-center justify-center p-8 relative rounded-l-3xl">
        <Image
          src="/registerbg.jpg" /* troque pela imagem específica do cadastro se quiser */
          alt="Equipe"
          fill
          className="object-cover opacity-30 rounded-l-3xl"
          priority
        />
        <div className="relative max-w-[632px]">
          <h2 className="text-[72px] font-semibold leading-tight">
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
