export const login = (username: string, password: string): boolean => {
    const admin = { username: "admin", password: "admin123" };
    const user = { username: "user", password: "user123" };
  
    if (username === admin.username && password === admin.password) {
      localStorage.setItem("role", "admin");
      return true;
    } else if (username === user.username && password === user.password) {
      localStorage.setItem("role", "user");
      return true;
    }
    return false;
  };
  
  export const logout = () => {
    localStorage.removeItem("role");
  };
  
  export const isAdmin = (): boolean => {
    return localStorage.getItem("role") === "admin";
  };
  
  export const isUser = (): boolean => {
    return localStorage.getItem("role") === "user";
  };