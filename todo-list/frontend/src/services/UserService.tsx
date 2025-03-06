import Api from "../config/Api";
import { RegisterFormType, LoginFormType } from "../types/FormType";
import { AxiosError } from "axios";

const UserService = {
  register: async (params: RegisterFormType) => {
    try {
      const response = await Api.post("/users", params);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return {
          success: false,
          error: error.response.data
        };
      }
      return {
        success: false,
        error: {
          message: 'An unexpected error occurred',
          statusCode: 500
        }
      };
    }
  },

  login: async (params: LoginFormType) => {
    try {
      const response = await Api.post("/auth/login", params);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return {
          success: false,
          error: error.response.data
        };
      }
      return {
        success: false,
        error: {
          message: 'An unexpected error occurred',
          statusCode: 500
        }
      };
    }
  },

  logout: () => {
    localStorage.removeItem("token");
  }
};

export default UserService;