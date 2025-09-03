"use server";

export async function loginAction(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (email === "teste@teste.com" && password === "123456") {
    return { success: true, message: "Login realizado com sucesso!" };
  }

  return { success: false, message: "Credenciais inválidas" };
}
