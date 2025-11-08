import FormField from '../edit/editform/FormField';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectInputProps {
  id: string;
  name: string;
  label: string;
  description?: string;
  required?: boolean;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function SelectInput({
  id,
  name,
  label,
  description,
  required,
  error,
  options,
  placeholder,
  value,
  onChange,
}: SelectInputProps) {
  return (
    <FormField id={id} label={label} description={description} required={required} error={error}>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
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
