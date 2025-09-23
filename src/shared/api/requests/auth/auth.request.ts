import { authAPI } from "../../mock-auth-api/mockAuth";
import type { bodyLoginType, bodyRegisterType } from "./auth.model";

export const login = async (data: bodyLoginType) => {
  const res = await authAPI.login(data.email, data.password);
  return res;
};

export const register = async (data: bodyRegisterType) => {
  const res = await authAPI.register(data.username, data.email, data.password);
  return res;
};
