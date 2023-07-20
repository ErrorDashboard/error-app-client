import { FormInput } from 'components/FormInput/FormInput';
import { VITE_BASE_API_URL } from 'configs';
import { useCurrentUserContext } from 'global/context/currentUserContextProvider';
import useForm from 'hooks/useForm';
import type { SyntheticEvent } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginValidation } from 'validations/user.validations';

const initialState = {
  email: '',
  password: '',
};

export const LoginForm = () => {
  const { form, handleChange, validate, errors } = useForm(
    initialState,
    LoginValidation,
  );
  const navigate = useNavigate();
  const { setCurrentUserData, setAccessToken } = useCurrentUserContext();
  const [validationErrors, setValidationErrors] = useState<Record<
    string,
    string
  > | null>(null);
  const [errorState, setErrorState] = useState<boolean | null>(null);

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationResult = validate();
    if (validationResult.hasError) {
      setValidationErrors(validationResult.errorMessages);
    } else {
      try {
        const response = await fetch(
          `http://${VITE_BASE_API_URL}/v1/auth/login`,
          {
            body: JSON.stringify(form),
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
    }
  };

  return (
    <form className="w-full flex flex-col pt-14" onSubmit={handleSubmit}>
      <div className="flex flex-col justify-center items-center text-center pb-8">
        {errorState && (
          <p className="error-text">Login Failed, check email or password</p>
        )}
        <FormInput
          label="Email"
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={errors.errorMessages.email || validationErrors?.email}
        />
        <FormInput
          label="Password"
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          error={
            errors.errorMessages.password || validationErrors?.passwordConfirm
          }
        />
      </div>
      <button className="btn-primary" type="submit">
        Login
      </button>
    </form>
  );
};
