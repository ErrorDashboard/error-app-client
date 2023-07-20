import { TokenData } from 'interfaces/auth.interface';
import { BaseUserType } from 'types/user.type';

export type Action = {
  payload: BaseUserType | TokenData | null;
  type: string;
};

export type ActionType = 'SET_CURRENT_USER_DATA' | 'SET_ACCESS_TOKEN';

export const setCurrentUserData = (payload: BaseUserType | null): Action => ({
  payload,
  type: 'SET_CURRENT_USER_DATA' as ActionType,
});

export const setAccessToken = (payload: TokenData | null): Action => ({
  payload,
  type: 'SET_ACCESS_TOKEN' as ActionType,
});
