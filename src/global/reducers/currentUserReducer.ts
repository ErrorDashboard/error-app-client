import { TokenData } from 'interfaces/auth.interface';

interface CurrentUserState {
  accessToken: TokenData | null;
  currentUserData: any | null;
  isAuthenticated: boolean | null;
  setAccessToken: () => void;
  setCurrentUserData: () => void;
}

interface CurrentUserAction {
  type: string;
  payload?: any;
}

export const initialState: CurrentUserState = {
  accessToken: null,
  currentUserData: null,
  isAuthenticated: null,
  setAccessToken: () => {},
  setCurrentUserData: () => {},
};

export const currentUserReducer = (
  state: CurrentUserState,
  action: CurrentUserAction,
) => {
  switch (action.type) {
    case 'SET_CURRENT_USER_DATA':
      return { ...state, currentUserData: action.payload };
    case 'SET_ACCESS_TOKEN':
      return { ...state, accessToken: action.payload };
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
};
