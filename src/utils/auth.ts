export const login = (username: string, password: string): boolean => {
  const admin = { username: "admin", password: "admin123" };
  const user = { username: "user", password: "user123" };

  if (username === admin.username && password === admin.password) {
    localStorage.setItem("role", "admin");
    localStorage.setItem("isAuthenticated", "true");
    return true;
  } else if (username === user.username && password === user.password) {
    localStorage.setItem("role", "user");
    localStorage.setItem("isAuthenticated", "true");
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem("role");
  localStorage.removeItem("isAuthenticated");
};

export const isAdmin = (): boolean => {
  return localStorage.getItem("role") === "admin";
};

export const isUser = (): boolean => {
  return localStorage.getItem("role") === "user";
};

export const isAuthenticated = (): boolean => {
  return localStorage.getItem("isAuthenticated") === "true";
};
