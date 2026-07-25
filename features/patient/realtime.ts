import { PatientFormData, PatientSession, PatientStatus } from "./model";

const STORAGE_KEY = "agnos-patient-session";
const CHANNEL_NAME = "agnos-patient-realtime";

export function createPatientChannel() {
  return new BroadcastChannel(CHANNEL_NAME);
}

export function loadPatientSession(): PatientSession | null {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (!saved) return null;

  try {
    return JSON.parse(saved) as PatientSession;
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function createPatientSession(
  data: PatientFormData,
  status: PatientStatus,
): PatientSession {
  return { data, status, updatedAt: Date.now() };
}

export function savePatientSession(session: PatientSession) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}
