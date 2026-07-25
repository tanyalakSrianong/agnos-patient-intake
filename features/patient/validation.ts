import {
  PatientFormData,
  PatientFormErrors,
  requiredPatientFields,
} from "./model";

const phonePattern = /^0\d{2}-\d{3}-\d{4}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidGregorianDate(value: string) {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
  if (!match) return false;

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  const currentYear = new Date().getFullYear();
  const date = new Date(year, month - 1, day);

  return (
    year >= 1900 &&
    year <= currentYear &&
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

export function validatePatientForm(form: PatientFormData) {
  const errors: PatientFormErrors = {};

  requiredPatientFields.forEach((key) => {
    if (!form[key].trim()) errors[key] = "This field is required";
  });

  if (form.email && !emailPattern.test(form.email)) {
    errors.email = "Enter a valid email address";
  }
  if (form.dateOfBirth && !isValidGregorianDate(form.dateOfBirth)) {
    errors.dateOfBirth =
      "Enter a valid date in DD/MM/YYYY using the Gregorian year";
  }
  if (form.phone && !phonePattern.test(form.phone)) {
    errors.phone = "Enter a 10-digit phone number";
  }

  const hasEmergencyContact = Boolean(
    form.emergencyContactName.trim() ||
      form.emergencyContactPhone.trim() ||
      form.emergencyContactRelationship.trim(),
  );

  if (hasEmergencyContact) {
    if (!form.emergencyContactName.trim()) {
      errors.emergencyContactName = "Enter the emergency contact's name";
    }
    if (!form.emergencyContactPhone.trim()) {
      errors.emergencyContactPhone =
        "Enter the emergency contact's phone number";
    } else if (!phonePattern.test(form.emergencyContactPhone)) {
      errors.emergencyContactPhone = "Enter a 10-digit phone number";
    }
    if (!form.emergencyContactRelationship.trim()) {
      errors.emergencyContactRelationship =
        "Enter their relationship to the patient";
    }
  }

  return errors;
}
