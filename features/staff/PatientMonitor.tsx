"use client";

import { patientDisplayFields } from "../patient/model";
import { usePatientSession } from "./usePatientSession";

export default function PatientMonitor() {
  const { connected, hasData, session } = usePatientSession();
  const fullName =
    [session.data.firstName, session.data.middleName, session.data.lastName]
      .filter(Boolean)
      .join(" ") || "New patient";
  const initials =
    [session.data.firstName, session.data.lastName]
      .filter(Boolean)
      .map((name) => name[0]?.toUpperCase())
      .join("") || "NP";
  const statusText = {
    filling: "Actively filling",
    inactive: "Inactive",
    submitted: "Submitted",
  }[session.status];

  return (
    <>
      <div className="page-heading">
        <div>
          <span className="step-label">Staff dashboard</span>
          <h1>Patient intake monitor</h1>
          <p>Review patient information as it is entered.</p>
        </div>
      </div>

      <div className="staff-toolbar">
        <div className="live-status">
          <span className="status-dot" />
          {connected ? "Live connection active" : "Connecting…"}
        </div>
        <span className={`status-badge status-${session.status}`}>
          {statusText}
        </span>
      </div>

      {!hasData ? (
        <section className="staff-card empty-state">
          <span className="empty-state-mark">P</span>
          <h2>Waiting for patient input</h2>
          <p>Open the patient form in another tab and start entering information.</p>
        </section>
      ) : (
        <section className="staff-card">
          <header className="patient-summary">
            <span className="patient-avatar">{initials}</span>
            <div>
              <h2>{fullName}</h2>
              <p>
                Last updated{" "}
                {new Date(session.updatedAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <span className={`status-badge status-${session.status}`}>
              {statusText}
            </span>
          </header>

          <div className="details-grid">
            {patientDisplayFields.map((field) => (
              <div className="detail-item" key={field.key}>
                <small>{field.label}</small>
                <strong className={!session.data[field.key] ? "empty-value" : ""}>
                  {session.data[field.key] || "Not provided"}
                </strong>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
