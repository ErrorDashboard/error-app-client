import { FormInput } from 'components/FormInput/FormInput';
import { VITE_BASE_API_URL } from 'configs';
import { useCurrentUserContext } from 'global/context/currentUserContextProvider';
import useForm from 'hooks/useForm';
import type { SyntheticEvent } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRegistrationType } from 'types/user.type';
import { RegistrationValidation } from 'validations/user.validations';

const initialState = {
  email: '',
  password: '',
  passwordConfirm: '',
};

export const RegisterForm = () => {
  const { form, handleChange, validate, errors } = useForm<
    Partial<UserRegistrationType>
  >(initialState, RegistrationValidation);
  const [validationErrors, setValidationErrors] = useState<Record<
    string,
    string
  > | null>(null);
  const [errorState, setErrorState] = useState<boolean | null>(null);

  const navigate = useNavigate();
  const { setCurrentUserData, setAccessToken } = useCurrentUserContext();

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationResult = validate();

    if (validationResult.hasError) {
      return;
    }

    if (form.password !== form.passwordConfirm) {
      setValidationErrors((prevState: any) => ({
        ...prevState,
        password: 'Passwords do not match',
        passwordConfirm: 'Passwords do not match',
      }));
      return;
    }

    const registrationFormData = {
      email: form.email,
      password: form.password,
    };

    try {
      const response = await fetch(
        `http://${VITE_BASE_API_URL}/v1/users/signup`,
        {
          body: JSON.stringify(registrationFormData),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        },
      );

      const data = await response.json();
      setCurrentUserData(data.user);
      setAccessToken(data.accessToken);
      navigate('/');
    } catch {
      setErrorState(true);
    }
  };

  return (
    <form className="w-full flex flex-col pt-14" onSubmit={handleSubmit}>
      <div className="flex flex-col justify-center items-center text-center pb-8">
        {errorState && (
          <p className="error-text">
            Registration Failed, check email or password
          </p>
        )}
        <FormInput
          id="email"
          error={errors.errorMessages.email}
          label="Email"
          name="email"
          onChange={handleChange}
          type="email"
          value={form.email}
        />
        <FormInput
          id="password"
          error={errors.errorMessages.password || validationErrors?.password}
          label="Password"
          name="password"
          onChange={handleChange}
          type="password"
          value={form.password}
        />
        <FormInput
          id="passwordConfirm"
          error={
            errors.errorMessages.passwordConfirm ||
            validationErrors?.passwordConfirm
          }
          label="Confirm Password"
          name="passwordConfirm"
          onChange={handleChange}
          type="password"
          value={form.passwordConfirm}
        />
      </div>
      <button className="btn-primary" type="submit">
        Register
      </button>
    </form>
  );
};
