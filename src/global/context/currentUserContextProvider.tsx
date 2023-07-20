import { VITE_BASE_API_URL } from 'configs';
import { TokenData } from 'interfaces/auth.interface';
import { ReactNode, useContext, useEffect, useReducer } from 'react';
import { BaseUserType } from 'types/user.type';
import * as currentUserActions from '../actions/currentUserActions';
import {
  currentUserReducer,
  initialState,
} from '../reducers/currentUserReducer';
import { CurrentUserContext } from './currentUserContext';

interface CurrentUserProviderProps {
  children: ReactNode;
}

export const useCurrentUserContext = () => useContext(CurrentUserContext);

const CurrentUserProvider = ({ children }: CurrentUserProviderProps) => {
  const [state, dispatch] = useReducer(currentUserReducer, initialState);

  // TODO: Deal with expiry time
  const isAuthenticated = !!state.accessToken;

  const actions = {
    setAccessToken: (accessToken: TokenData | null) =>
      dispatch(currentUserActions.setAccessToken(accessToken)),
    setCurrentUserData: (currentUserData: BaseUserType | null) =>
      dispatch(currentUserActions.setCurrentUserData(currentUserData)),
  };

  const getUserData = async () => {
    try {
      const response = await fetch(`http://${VITE_BASE_API_URL}/v1/users`, {
        credentials: 'include',
        headers: {
          Authorization: `${state.accessToken?.token}`,
        },
      });
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        // Check if currentUserData exists or if accessToken exists
        // TODO: Add a check on the expiration
        if (!state.currentUserData && !state.accessToken) {
          const response = await getUserData();
          actions.setCurrentUserData(response.user);
          actions.setAccessToken(response.accessToken);
        }
      } catch (error) {
        console.error(error);
      }
    };
    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.accessToken]);

  return (
    <CurrentUserContext.Provider
      value={{
        ...state,
        ...actions,
        isAuthenticated,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
