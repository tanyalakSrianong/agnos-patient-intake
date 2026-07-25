"use client";

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { formatPatientField } from "./formatters";
import {
  emptyPatientForm,
  PatientFormData,
  PatientFormErrors,
  PatientStatus,
  requiredPatientFields,
} from "./model";
import {
  createPatientChannel,
  createPatientSession,
  loadPatientSession,
  savePatientSession,
} from "./realtime";
import { validatePatientForm } from "./validation";

export function usePatientForm() {
  const [form, setForm] = useState<PatientFormData>(emptyPatientForm);
  const [errors, setErrors] = useState<PatientFormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const channelRef = useRef<BroadcastChannel | null>(null);
  const inactiveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const saved = loadPatientSession();
    channelRef.current = createPatientChannel();
    const restoreTimer = window.setTimeout(() => {
      if (saved) {
        setForm(saved.data);
        setSubmitted(saved.status === "submitted");
      }
      setHydrated(true);
    }, 0);

    return () => {
      window.clearTimeout(restoreTimer);
      channelRef.current?.close();
      if (inactiveTimerRef.current) clearTimeout(inactiveTimerRef.current);
    };
  }, []);

  const progress = useMemo(() => {
    const completed = requiredPatientFields.filter((key) =>
      form[key].trim(),
    ).length;
    return Math.round((completed / requiredPatientFields.length) * 100);
  }, [form]);

  function publish(data: PatientFormData, status: PatientStatus) {
    const session = createPatientSession(data, status);
    savePatientSession(session);
    channelRef.current?.postMessage(session);
  }

  function scheduleInactive(data: PatientFormData) {
    if (inactiveTimerRef.current) clearTimeout(inactiveTimerRef.current);
    inactiveTimerRef.current = setTimeout(() => publish(data, "inactive"), 12000);
  }

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const key = event.target.name as keyof PatientFormData;
    const value = formatPatientField(key, event.target.value);
    const next = { ...form, [key]: value };

    setForm(next);
    setErrors((current) => ({ ...current, [key]: undefined }));
    publish(next, "filling");
    scheduleInactive(next);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validatePatientForm(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    if (inactiveTimerRef.current) clearTimeout(inactiveTimerRef.current);
    publish(form, "submitted");
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function startAgain() {
    setForm(emptyPatientForm);
    setErrors({});
    setSubmitted(false);
    publish(emptyPatientForm, "inactive");
  }

  return {
    errors,
    form,
    handleChange,
    handleSubmit,
    hydrated,
    progress,
    startAgain,
    submitted,
  };
}
