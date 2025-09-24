"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "../../server/actions/auth";
import { EnvelopeSimple, Lock } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [result, setResult] = useState(null);
  const router = useRouter();

  const handleLogin = async (formData) => {
    const email = String(formData.get("email")).toLowerCase();
    const password = String(formData.get("password"));

    const normalizedFormData = new FormData();
    normalizedFormData.append("email", email);
    normalizedFormData.append("password", password);

    const res = await loginAction(normalizedFormData);
    setResult(res);
    if (res && res.success) {
      try {
        localStorage.setItem("isLogged", "true");
        if (res.user && res.user.name) {
          localStorage.setItem("userName", String(res.user.name));
        }
      } catch (e) {}
      router.push("/CRM");
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-full lg:w-1/2 flex items-center justify-center ">
        <div className="max-w-md w-full space-y-7">
          <h1 className="text-4xl font-bold text-blue-600 mb-8">Nex Tools</h1>
          <h2 className="text-3xl font-semibold mb-2">Acesse sua conta</h2>
          <p className="text-[#8E90A2] text-[16px]">
            Gerencie seus cupons, acompanhe resultados e
          </p>
          <p className="text-[#8E90A2] relative -top-7 text-[16px]">
            conecte sua loja a novos clientes.
          </p>

          <form action={handleLogin} className="mt-6 space-y-4">
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
                  className="mt-1 w-full rounded-[12px] border-2 border-[#E7E8F6] pl-10 py-2 text-sm "
                />
              </div>
            </div>

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
                  className="mt-1 w-full rounded-[12px] border-2 border-[#E7E8F6] pl-10 py-2 text-sm "
                />
              </div>
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
              Entrar
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
            <Link href="/register" className="text-blue-600 hover:underline">
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
        <div className="relative max-w-[632px]">
          <h2 className="text-[72px] font-semibold leading-tight">
            Sua gestão financeira com mais clareza e controle.
          </h2>
          <p className="mt-4 text-sm text-gray-100">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea quas
            minima atque pariatur cum hic, repudiandae nemo natus consectetur
            corporis obcaecati provident dicta debitis id dignissimos alias
            molestiae eum sed?
          </p>
        </div>
      </div>
    </div>
  );
}
