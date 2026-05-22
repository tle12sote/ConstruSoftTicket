const API_URL = "http://localhost:5010/api/auth";

// 🔐 LOGIN
export const login = async (data) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Credenciales incorrectas");
  }

  const result = await response.json();

  // 🔥 GUARDAR TOKEN (CLAVE)
  localStorage.setItem("token", result.token);

  return result;
};

// 📝 REGISTER
export const register = async (data) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error al registrar");
  }

  return await response.json();
};

// 🔓 LOGOUT (BONUS)
export const logout = () => {
  localStorage.removeItem("token");
};