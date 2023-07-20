import { ValidationSchemaType } from 'hooks/useForm';
import { UserLoginType, UserRegistrationType } from 'types/user.type';

export const LoginValidation: ValidationSchemaType<UserLoginType> = {
  email: {
    pattern: /^[\w%+.-]+@[\d.A-Za-z-]+\.[A-Za-z]{2,}$/,
    required: true,
  },
  password: {
    minLength: 7,
    required: true,
  },
};

export const RegistrationValidation: ValidationSchemaType<UserRegistrationType> =
  {
    email: {
      pattern: /^[\w%+.-]+@[\d.A-Za-z-]+\.[A-Za-z]{2,}$/,
      required: true,
    },
    password: {
      minLength: 7,
      required: true,
    },
    passwordConfirm: {
      minLength: 7,
      required: true,
    },
  };
