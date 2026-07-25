import AppHeader from "../../components/AppHeader";
import PatientForm from "../../features/patient/PatientForm";

export default function PatientPage() {
  return (
    <main className="app-shell">
      <AppHeader />
      <div className="page-container">
        <PatientForm />
      </div>
    </main>
  );
}
