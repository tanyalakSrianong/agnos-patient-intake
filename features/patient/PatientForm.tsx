"use client";

import { usePatientForm } from "./usePatientForm";
import { FormField, SelectField } from "./FormField";

export default function PatientForm() {
  const {
    errors,
    form,
    handleChange,
    handleSubmit,
    hydrated,
    progress,
    startAgain,
    submitted,
  } = usePatientForm();

  if (!hydrated) return null;

  return (
    <>
      <div className="page-heading">
        <div>
          <span className="step-label">Patient intake</span>
          <h1>Your information</h1>
          <p>Please tell us a little about yourself before your visit.</p>
        </div>
        {!submitted && (
          <div className="progress-summary">
            <div>
              <span style={{ width: `${progress}%` }} />
            </div>
            <small>{progress}% complete</small>
          </div>
        )}
      </div>

      {submitted ? (
        <section className="form-card success-card">
          <span className="success-icon">✓</span>
          <h2>Your information has been submitted</h2>
          <p>Thank you. The care team can now review your intake details.</p>
          <button className="primary-button" type="button" onClick={startAgain}>
            Start a new form
          </button>
        </section>
      ) : (
        <div className="form-layout">
          <form className="form-card" onSubmit={handleSubmit} noValidate>
            <h2 className="section-title">Personal details</h2>
            <p className="section-subtitle">
              Fields marked with an asterisk are required.
            </p>

            <div className="field-grid">
              <FormField label="First name" name="firstName" value={form.firstName} error={errors.firstName} onChange={handleChange} required />
              <FormField label="Middle name" name="middleName" value={form.middleName} onChange={handleChange} optional />
              <FormField label="Last name" name="lastName" value={form.lastName} error={errors.lastName} onChange={handleChange} required />
              <FormField label="Date of birth" name="dateOfBirth" value={form.dateOfBirth} error={errors.dateOfBirth} onChange={handleChange} placeholder="DD/MM/YYYY" inputMode="numeric" maxLength={10} required />
              <SelectField label="Gender" name="gender" value={form.gender} error={errors.gender} onChange={handleChange} options={["Female", "Male", "Non-binary", "Prefer not to say"]} />
              <FormField label="Phone number" name="phone" type="tel" value={form.phone} error={errors.phone} onChange={handleChange} placeholder="091-111-1111" inputMode="numeric" maxLength={12} required />
              <FormField label="Email address" name="email" type="email" value={form.email} error={errors.email} onChange={handleChange} placeholder="name@example.com" required />
              <SelectField label="Preferred language" name="preferredLanguage" value={form.preferredLanguage} error={errors.preferredLanguage} onChange={handleChange} options={["Thai", "English", "Chinese", "Japanese", "Other"]} />

              <div className="field-group field-full">
                <label htmlFor="address">Address *</label>
                <textarea
                  className={`field-control ${errors.address ? "invalid" : ""}`}
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="House number, street, district, province"
                />
                {errors.address && <span className="field-error">{errors.address}</span>}
              </div>

              <FormField label="Nationality" name="nationality" value={form.nationality} error={errors.nationality} onChange={handleChange} required />
              <FormField label="Religion" name="religion" value={form.religion} onChange={handleChange} optional />
              <FormField label="Emergency contact name" name="emergencyContactName" value={form.emergencyContactName} error={errors.emergencyContactName} onChange={handleChange} optional />
              <FormField label="Emergency contact phone" name="emergencyContactPhone" type="tel" value={form.emergencyContactPhone} error={errors.emergencyContactPhone} onChange={handleChange} placeholder="091-111-1111" inputMode="numeric" maxLength={12} optional />
              <FormField label="Relationship" name="emergencyContactRelationship" value={form.emergencyContactRelationship} error={errors.emergencyContactRelationship} onChange={handleChange} optional />
            </div>

            <div className="form-actions">
              <p>
                By submitting, you confirm that the information provided is
                accurate.
              </p>
              <button className="primary-button" type="submit">
                Submit information
              </button>
            </div>
          </form>

          <aside className="side-column">
            <div className="side-card">
              <div className="sync-indicator">
                <span className="status-dot" />
                Updating in real time
              </div>
              <p>Your care team can see your progress as you complete the form.</p>
            </div>
            <div className="side-card">
              <h3>Need help?</h3>
              <p>
                Ask a staff member if you are unsure about any of the requested
                information.
              </p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
