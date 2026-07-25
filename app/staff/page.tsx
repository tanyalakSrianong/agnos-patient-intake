import AppHeader from "../../components/AppHeader";
import PatientMonitor from "../../features/staff/PatientMonitor";

export default function StaffPage() {
  return (
    <main className="app-shell">
      <AppHeader />
      <div className="page-container">
        <PatientMonitor />
      </div>
    </main>
  );
}
