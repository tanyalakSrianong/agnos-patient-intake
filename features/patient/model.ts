export type PatientStatus = "inactive" | "filling" | "submitted";

export type PatientFormData = {
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  preferredLanguage: string;
  nationality: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelationship: string;
  religion: string;
};

export type PatientSession = {
  data: PatientFormData;
  status: PatientStatus;
  updatedAt: number;
};

export type PatientFormErrors = Partial<
  Record<keyof PatientFormData, string>
>;

export const emptyPatientForm: PatientFormData = {
  firstName: "",
  middleName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  phone: "",
  email: "",
  address: "",
  preferredLanguage: "",
  nationality: "",
  emergencyContactName: "",
  emergencyContactPhone: "",
  emergencyContactRelationship: "",
  religion: "",
};

export const requiredPatientFields: Array<keyof PatientFormData> = [
  "firstName",
  "lastName",
  "dateOfBirth",
  "gender",
  "phone",
  "email",
  "address",
  "preferredLanguage",
  "nationality",
];

export const patientDisplayFields: Array<{
  key: keyof PatientFormData;
  label: string;
}> = [
  { key: "firstName", label: "First name" },
  { key: "middleName", label: "Middle name" },
  { key: "lastName", label: "Last name" },
  { key: "dateOfBirth", label: "Date of birth" },
  { key: "gender", label: "Gender" },
  { key: "phone", label: "Phone number" },
  { key: "email", label: "Email address" },
  { key: "address", label: "Address" },
  { key: "preferredLanguage", label: "Preferred language" },
  { key: "nationality", label: "Nationality" },
  { key: "emergencyContactName", label: "Emergency contact" },
  { key: "emergencyContactPhone", label: "Emergency contact phone" },
  {
    key: "emergencyContactRelationship",
    label: "Emergency contact relationship",
  },
  { key: "religion", label: "Religion" },
];
