import type { EventChangeType } from 'shared/types';

interface FormInputProps {
  error?: string;
  id: string;
  label: string;
  name: string;
  onChange: (e: EventChangeType) => void;
  type: string;
  value?: string;
}

export const FormInput = ({
  id,
  label,
  name,
  type,
  error,
  onChange,
  value,
}: FormInputProps) => {
  const hasError = !!error;

  return (
    <div className={`${hasError ? 'error-field' : 'input-field'} form-field`}>
      <div>
        <label htmlFor={id}>{label}:</label>
        <input
          id={id}
          name={name}
          type={type}
          onChange={onChange}
          value={value}
        />
      </div>
      {hasError && <p className="error-text">{error}</p>}
    </div>
  );
};
