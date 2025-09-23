export type IUser = {
  email: string;
  password: string;
  username: string;
};

export const STORAGE_KEY = "user";
export const TOKEN_KEY = "token";

export const authAPI = {
  login: (
    email: string,
    password: string
  ): Promise<{ user: IUser; token: string }> => {
    return new Promise((resolve, reject) => {
      const storedUser = localStorage.getItem(STORAGE_KEY);
      if (!storedUser) {
        return reject(new Error("No user found. Please register first."));
      }

      const user: IUser = JSON.parse(storedUser);
      if (user.email === email && user.password === password) {
        const token = Math.random().toString(36).substring(2);
        localStorage.setItem(TOKEN_KEY, token);

        resolve({ user, token });
      } else {
        reject(new Error("Invalid email or password."));
      }
    });
  },

  register: (
    username: string,
    email: string,
    password: string,
  ): Promise<{ user: IUser }> => {
    return new Promise((resolve) => {
      const user: IUser = { email, password, username };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      resolve({ user });
    });
  },
};
