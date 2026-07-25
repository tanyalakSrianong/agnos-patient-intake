"use client";

import { useEffect, useMemo, useState } from "react";
import {
  emptyPatientForm,
  PatientSession,
} from "../patient/model";
import {
  createPatientChannel,
  loadPatientSession,
} from "../patient/realtime";

const initialSession: PatientSession = {
  data: emptyPatientForm,
  status: "inactive",
  updatedAt: 0,
};

export function usePatientSession() {
  const [session, setSession] = useState<PatientSession>(initialSession);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const saved = loadPatientSession();
    const channel = createPatientChannel();
    channel.onmessage = (event: MessageEvent<PatientSession>) => {
      setSession(event.data);
    };
    const restoreTimer = window.setTimeout(() => {
      if (saved) setSession(saved);
      setConnected(true);
    }, 0);

    return () => {
      window.clearTimeout(restoreTimer);
      channel.close();
    };
  }, []);

  const hasData = useMemo(
    () => Object.values(session.data).some((value) => value.trim()),
    [session.data],
  );

  return { connected, hasData, session };
}
