import FormField from '../edit/editform/FormField';
import type { UseFormRegister, FieldError, FieldValues, Path } from 'react-hook-form';

interface TextareaInputProps<T extends FieldValues = FieldValues> {
  id: string;
  name: Path<T>;
  label: string;
  description?: string;
  required?: boolean;
  error?: FieldError;
  placeholder?: string;
  maxLength?: number;
  rows?: number;
  register?: UseFormRegister<T>;
  validation?: Parameters<UseFormRegister<T>>[1];
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function TextareaInput<T extends FieldValues = FieldValues>({
  id,
  name,
  label,
  description,
  required,
  error,
  placeholder,
  maxLength,
  rows = 5,
  register,
  validation,
  onChange,
}: TextareaInputProps<T>) {
  const registerProps = register ? register(name, validation) : {};

  return (
    <FormField
      id={id}
      label={label}
      description={description}
      required={required}
      error={error?.message}
    >
      <textarea
        id={id}
        {...registerProps}
        className="w-full bg-white focus:outline-primary/50 resize-none min-h-30 p-2 rounded-md"
        aria-describedby={error ? `${id}-error` : description ? `${id}-description` : undefined}
        aria-invalid={!!error}
        aria-required={required}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
        spellCheck="false"
        autoComplete="off"
        onChange={onChange}
      />
    </FormField>
  );
}

export default TextareaInput;
