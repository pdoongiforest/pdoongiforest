import FormField from '../edit/editform/FormField';

interface TextInputProps {
  id: string;
  name: string;
  label: string;
  description?: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
  maxLength?: number;
  minLength?: number;
  min?: number;
  max?: number;
  type?: 'text' | 'password' | 'number';
  autoComplete?: 'off' | 'on';
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function TextInput({
  id,
  name,
  label,
  description,
  required,
  error,
  placeholder,
  maxLength,
  minLength,
  min,
  max,
  type = 'text',
  autoComplete,
  value,
  onChange,
}: TextInputProps) {
  return (
    <FormField id={id} label={label} description={description} required={required} error={error}>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-white focus:outline-primary/50 h-8 px-2 rounded-md"
        aria-describedby={error ? `${id}-error` : description ? `${id}-description` : undefined}
        aria-invalid={!!error}
        aria-required={required}
        placeholder={placeholder}
        maxLength={maxLength}
        minLength={minLength}
        autoComplete={autoComplete}
        min={min}
        max={max}
      />
    </FormField>
  );
}

export default TextInput;
