# Agnos Patient Intake Assignment

A responsive patient intake form and real-time staff monitoring interface built
with Next.js, TypeScript, and Tailwind CSS.

## Live application

https://agnos-assignment-rho.vercel.app

Available routes:

- `/patient` — patient intake form
- `/staff` — real-time staff monitoring view

## Tech stack

- Next.js App Router
- React and TypeScript
- Tailwind CSS
- BroadcastChannel for real-time browser synchronization
- localStorage for refresh persistence

## Run locally

```bash
npm install
npm run dev
```

Open:

- `http://localhost:3000` — role selection
- `http://localhost:3000/patient` — patient form
- `http://localhost:3000/staff` — staff monitoring view

For the real-time demo, open the patient and staff pages in separate tabs in the
same browser. Changes made in the patient form appear in the staff view
immediately.

## Project structure

```text
app/
  page.tsx          Role-selection landing page
  patient/page.tsx  Patient route composition
  staff/page.tsx    Staff route composition
  layout.tsx        Shared page metadata and root layout
  globals.css       Global styling and responsive rules
components/
  AppHeader.tsx     Shared application header
features/
  patient/
    PatientForm.tsx     Patient form UI
    FormField.tsx       Reusable input and select components
    usePatientForm.ts   Form state and interaction
    model.ts            Shared patient types and constants
    validation.ts       Business validation rules
    formatters.ts       Phone and date formatting
    realtime.ts         Browser real-time and storage adapter
  staff/
    PatientMonitor.tsx    Staff monitoring UI
    usePatientSession.ts  Real-time staff subscription
```

## Component architecture

- Server Components render the static landing page and shared layout.
- Route files stay small and only compose each page.
- Feature folders group patient and staff behavior by business capability.
- UI, state, validation, formatting, and real-time infrastructure are separated.
- The real-time adapter can be replaced without changing form components.

## Real-time synchronization flow

The current prototype uses the browser `BroadcastChannel` API:

1. A patient edits a field.
2. The patient page publishes the full form state to a named channel.
3. The staff page receives the message and updates immediately.
4. A copy is stored in `localStorage` so refreshing either page keeps the latest
   state.
5. The status changes to `Actively filling`, `Inactive` after 12 seconds without
   input, or `Submitted` when the form passes validation.

For production, the channel can be replaced with Supabase Realtime while keeping
the form and display components unchanged.

## Design decisions

- A calm blue and teal healthcare palette communicates trust and clarity.
- The patient form uses a single-column mobile layout and a two-column desktop
  layout.
- Required and optional fields are clearly identified.
- Validation messages appear next to the relevant fields.
- The staff dashboard prioritizes patient status and the most recently entered
  information.

## Validation

- Required-field validation
- Email-format validation
- Thai phone numbers are formatted automatically as `091-111-1111`
- Date of birth uses `DD/MM/YYYY` and accepts valid Gregorian years only
- Emergency contact is optional, but name, phone number, and relationship are
  all required when any emergency-contact field is entered
- Accessible form labels and keyboard-friendly native controls

## Current prototype limitation

`BroadcastChannel` synchronizes tabs in the same browser and is ideal for a
dependency-free demonstration. Cross-device synchronization requires a hosted
real-time service such as Supabase Realtime.

## Documentation

See `docs/DEVELOPMENT_PLAN.md` for project structure, design decisions,
component architecture, real-time synchronization flow, validation strategy,
and implementation trade-offs.
