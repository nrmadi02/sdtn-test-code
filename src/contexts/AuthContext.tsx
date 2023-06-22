import { getDetailMe } from "@/service/auth";
import type { IResponseAuth, IUser } from "@/types";
import axiosInstance from "@/utils/axios";
import axios from "@/utils/axios";
import {
  getLocalAccessToken,
  getLocalRefreshToken,
  isValidToken,
  setSession,
} from "@/utils/token";
import { type ReactNode, createContext, useEffect, useReducer } from "react";

enum AuthActionKind {
  INITIALIZE = "INITIALIZE",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  REGISTER = "REGISTER",
}

interface AuthContextAction {
  type: AuthActionKind;
  payload: AuthContextType;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isInitialized?: boolean;
  user: IUser | null;
}

interface AuthContextState extends AuthContextType {
  method: string;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}


const initialState: AuthContextType = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers = {
  INITIALIZE: (state: AuthContextType, action: AuthContextAction) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state: AuthContextType, action: AuthContextAction) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state: AuthContextType) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state: AuthContextType, action: AuthContextAction) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
};

const reducer = (state: AuthContextType, action: AuthContextAction) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext<AuthContextState>({
  ...initialState,
  method: "jwt",
  login: () => Promise.resolve(),
  logout: function (): void {
    throw new Error("Function not implemented.");
  }
});

interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = getLocalAccessToken();
        const refreshToken = getLocalRefreshToken();

        if (accessToken && refreshToken && isValidToken(accessToken)) {
          setSession(accessToken, refreshToken);

          const { data: user } = await getDetailMe();

          dispatch({
            type: AuthActionKind.INITIALIZE,
            payload: {
              isAuthenticated: true,
              user: user,
            },
          });
        } else {
          dispatch({
            type: AuthActionKind.INITIALIZE,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: AuthActionKind.INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize().catch((err) => console.log(err));
  }, []);

  const login = async (email: string, password: string) => {
    const response = await axios.post<IResponseAuth>("/backend/auth/login", {
      email,
      password,
    });

    const { access_token, refresh_token } = response.data.data;
    

    if (access_token && refresh_token) {
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${access_token}`;
      setSession(access_token, refresh_token);

      const { data: user } = await getDetailMe();
      dispatch({
        type: AuthActionKind.LOGIN,
        payload: {
          isAuthenticated: true,
          user,
        },
      });
    }
   
  };

  const logout = () => {
    setSession(null, null);
    dispatch({
      type: AuthActionKind.LOGOUT,
      payload: {
        isAuthenticated: false,
        isInitialized: false,
        user: null,
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
