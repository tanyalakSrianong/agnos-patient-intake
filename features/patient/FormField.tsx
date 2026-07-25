import { ChangeEvent } from "react";
import { PatientFormData } from "./model";

export type FormFieldProps = {
  label: string;
  name: keyof PatientFormData;
  value: string;
  type?: string;
  placeholder?: string;
  inputMode?: "numeric" | "tel" | "email" | "text";
  maxLength?: number;
  error?: string;
  required?: boolean;
  optional?: boolean;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => void;
};

export function FormField({
  label,
  name,
  value,
  type = "text",
  placeholder,
  inputMode,
  maxLength,
  error,
  required,
  optional,
  onChange,
}: FormFieldProps) {
  return (
    <div className="field-group">
      <label htmlFor={name}>
        {label} {required && "*"}{" "}
        {optional && <span className="optional">(optional)</span>}
      </label>
      <input
        className={`field-control ${error ? "invalid" : ""}`}
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        inputMode={inputMode}
        maxLength={maxLength}
        onChange={onChange}
      />
      {error && <span className="field-error">{error}</span>}
    </div>
  );
}

export function SelectField({
  label,
  name,
  value,
  options,
  error,
  onChange,
}: FormFieldProps & { options: string[] }) {
  return (
    <div className="field-group">
      <label htmlFor={name}>{label} *</label>
      <select
        className={`field-control ${error ? "invalid" : ""}`}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <span className="field-error">{error}</span>}
    </div>
  );
}
