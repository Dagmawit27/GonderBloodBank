const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  console.error("VITE_API_URL is not defined");
}
export const checkUsername = async (username) => {
  const response = await fetch(
    `${BASE_URL}/donor/check-username?username=${encodeURIComponent(username)}`
  );

  return await response.json();
};


export const registerUser = async (registrationData) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registrationData),
  });

  return await response.json();
};


export const loginUser = async (form) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

  return await response.json();
};