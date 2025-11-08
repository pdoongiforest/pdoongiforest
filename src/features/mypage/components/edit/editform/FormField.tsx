interface FormFieldProps {
  id: string;
  label: string;
  description?: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

function FormField({ id, label, description, required, error, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="block">
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-label="필수">
            *
          </span>
        )}
      </label>
      {children}
      {description && (
        <p id={`${id}-description`} className="text-sm text-gray-500">
          {description}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default FormField;
