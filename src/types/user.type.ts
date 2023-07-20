export type UserLoginType = {
  email: string;
  password: string;
};

export type UserRegistrationType = UserLoginType & {
  passwordConfirm: string;
};

export type BaseUserType = {
  _id: string;
  email?: string;
  githubId?: string;
  googleId?: string;
};
