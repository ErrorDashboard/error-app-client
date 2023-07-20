import { TokenData } from 'interfaces/auth.interface';
import { createContext } from 'react';
import { BaseUserType } from 'types/user.type';
import { initialState as currentUserInitialState } from '../reducers/currentUserReducer';

export interface CurrentUserContextType {
  accessToken: TokenData | null;
  currentUserData: BaseUserType | null;
  isAuthenticated: boolean | null;
  setAccessToken: (accessToken: TokenData | null) => void;
  setCurrentUserData: (currentUserData: BaseUserType | null) => void;
}

export const CurrentUserContext = createContext<CurrentUserContextType>(
  currentUserInitialState,
);
