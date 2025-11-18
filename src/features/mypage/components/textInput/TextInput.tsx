import FormField from '../edit/editform/FormField';
import type { UseFormRegister, FieldError, FieldValues, Path } from 'react-hook-form';

interface TextInputProps<T extends FieldValues = FieldValues> {
  id: string;
  name: Path<T>;
  label: string;
  value?: string | number;
  description?: string;
  required?: boolean;
  error?: FieldError;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  minLength?: number;
  min?: number;
  max?: number;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCompositionStart?: (e: React.CompositionEvent<HTMLInputElement>) => void;
  onCompositionEnd?: (e: React.CompositionEvent<HTMLInputElement>) => void;
  type?: 'text' | 'password' | 'number' | 'email';
  autoComplete?: 'off' | 'on';
  disabled?: boolean;
  register?: UseFormRegister<T>;
  validation?: Parameters<UseFormRegister<T>>[1];
}

function TextInput<T extends FieldValues = FieldValues>({
  id,
  name,
  label,
  value,
  description,
  required = false,
  error,
  onChange,
  onKeyDown,
  onInput,
  onCompositionStart,
  onCompositionEnd,
  placeholder,
  maxLength,
  minLength,
  min,
  max,
  type = 'text',
  autoComplete,
  disabled,
  register,
  validation,
}: TextInputProps<T>) {
  const registerProps = register ? register(name, validation) : {};

  return (
    <FormField
      id={id}
      label={label}
      description={description}
      required={required}
      error={error?.message}
    >
      <input
        type={type}
        id={id}
        {...registerProps}
        className="w-full bg-white focus:outline-primary/50 h-8 px-2 rounded-md disabled:bg-gray-200 disabled:cursor-not-allowed"
        aria-describedby={error ? `${id}-error` : description ? `${id}-description` : undefined}
        aria-invalid={!!error}
        aria-required={required}
        aria-disabled={disabled}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        minLength={minLength}
        autoComplete={autoComplete}
        min={min}
        max={max}
        disabled={disabled}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onInput={onInput}
        onCompositionStart={onCompositionStart}
        onCompositionEnd={onCompositionEnd}
      />
    </FormField>
  );
}

export default TextInput;
