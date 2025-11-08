import FormField from '../edit/editform/FormField';

interface TextareaInputProps {
  id: string;
  name: string;
  label: string;
  description?: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
  maxLength?: number;
  rows?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function TextareaInput({
  id,
  name,
  label,
  description,
  required,
  error,
  placeholder,
  maxLength,
  rows = 5,
  value,
  onChange,
}: TextareaInputProps) {
  return (
    <FormField id={id} label={label} description={description} required={required} error={error}>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-white focus:outline-primary/50 resize-none min-h-30 p-2 rounded-md"
        aria-describedby={error ? `${id}-error` : description ? `${id}-description` : undefined}
        aria-invalid={!!error}
        aria-required={required}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
      />
    </FormField>
  );
}

export default TextareaInput;
