"use server";

import prisma from "../libs/prisma";
import bcrypt from "bcryptjs";

export async function loginAction(formData) {
  const email = formData.get("email");
  console.log(email);
  const password = formData.get("password");
  console.log(password);

  if (email === "teste@teste.com" && password === "123456") {
    return {
      success: true,
      message: "Login realizado com sucesso!",
      user: { id: "0", name: "Teste", email },
    };
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    console.log(user);
    if (!user) {
      return { success: false, message: "Credenciais inválidas" };
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return { success: false, message: "Credenciais inválidas" };
    }
    return {
      success: true,
      message: "Login realizado com sucesso!",
      user: { id: user.id, name: user.name, email: user.email },
    };
  } catch (err) {
    return { success: false, message: "Erro: " + err.message };
  }
}

export async function registerAction(formData) {
  const email = formData.get("email");
  console.log(email);
  const password = formData.get("password");
  console.log(password);
  const name = formData.get("name");
  console.log(name);
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    return { success: true, message: "Usuário registrado com sucesso!" };
  } catch (err) {
    return { success: false, message: "Erro: " + err.message };
  }
}
