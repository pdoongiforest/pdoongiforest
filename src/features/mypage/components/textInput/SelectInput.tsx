import FormField from '../edit/editform/FormField';
import type { UseFormRegister, FieldError, FieldValues, Path } from 'react-hook-form';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectInputProps<T extends FieldValues = FieldValues> {
  id: string;
  name: Path<T>;
  label: string;
  description?: string;
  required?: boolean;
  error?: FieldError;
  errors?: FieldError | undefined;
  options: SelectOption[];
  placeholder?: string;
  register?: UseFormRegister<T>;
  validation?: Parameters<UseFormRegister<T>>[1];
}

function SelectInput<T extends FieldValues = FieldValues>({
  id,
  name,
  label,
  description,
  required,
  error,

  options,
  placeholder,
  register,
  validation,
}: SelectInputProps<T>) {
  const registerProps = register ? register(name, validation) : {};

  return (
    <FormField id={id} label={label} description={description} required={required}>
      <select
        id={id}
        {...registerProps}
        className="w-full bg-white focus:outline-primary/50 h-8 px-2 rounded-md"
        aria-describedby={error ? `${id}-error` : description ? `${id}-description` : undefined}
        aria-invalid={!!error}
        aria-required={required}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FormField>
  );
}

export default SelectInput;
