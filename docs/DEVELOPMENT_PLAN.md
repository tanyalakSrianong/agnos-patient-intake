# Development Planning

## 1. Project structure

The project uses the Next.js App Router and a feature-based structure.

```text
app/
  page.tsx                  Role-selection landing page
  patient/page.tsx          Patient route composition
  staff/page.tsx            Staff route composition
components/
  AppHeader.tsx             Shared navigation
features/
  patient/
    PatientForm.tsx         Patient form presentation
    FormField.tsx           Reusable form controls
    usePatientForm.ts       Form state and user interactions
    model.ts                Domain types and field definitions
    validation.ts           Patient-input business rules
    formatters.ts           Date and phone formatting
    realtime.ts             Storage and synchronization adapter
  staff/
    PatientMonitor.tsx      Staff dashboard presentation
    usePatientSession.ts    Staff real-time subscription
```

The route files only compose pages. Patient-specific code is grouped by feature,
while shared site-level UI remains in `components`.

## 2. Design decisions

### Visual direction

- Blue and teal communicate trust, clarity, and healthcare familiarity.
- White cards on a pale background keep long forms easy to scan.
- Status badges use distinct semantic colors for filling, inactive, and
  submitted states.
- Copy is concise and avoids technical language for patients.

### Responsive behavior

- Desktop forms use two columns to reduce scrolling.
- Mobile forms collapse to one column.
- The staff details grid uses three columns on desktop, two on tablet, and one
  on mobile.
- Buttons and native form controls remain large enough for touch input.

### Accessibility

- Every form field has an associated label.
- Errors are shown beside the relevant control and not communicated by color
  alone.
- Native input and select elements preserve keyboard behavior.
- Text and interactive elements use high-contrast colors.

## 3. Component architecture

The implementation follows separation of concerns without introducing
unnecessary layers:

- **Presentation:** `PatientForm`, `FormField`, and `PatientMonitor`
- **Application state:** `usePatientForm` and `usePatientSession`
- **Domain rules:** `model`, `validation`, and `formatters`
- **Infrastructure:** `realtime`

This keeps components focused and makes business rules testable independently
from the user interface.

## 4. Real-time synchronization flow

```text
Patient enters or updates a field
  -> usePatientForm formats the value
  -> React form state is updated
  -> a PatientSession is created
  -> the session is saved to localStorage
  -> the session is broadcast through BroadcastChannel
  -> usePatientSession receives the message
  -> Staff View renders the latest values and status
```

The patient status becomes:

- `filling` immediately after input
- `inactive` after 12 seconds without input
- `submitted` after the form passes validation and is submitted

`localStorage` retains the latest state after a refresh. `BroadcastChannel`
provides instant synchronization between tabs in the same browser.

For a production multi-device deployment, the infrastructure adapter can be
replaced by Supabase Realtime or another hosted WebSocket provider without
changing the presentation components or validation rules.

## 5. Validation strategy

- Required patient fields cannot be empty.
- Email must have a valid email format.
- Thai phone numbers use `000-000-0000`.
- Date of birth uses `DD/MM/YYYY`, must be a real Gregorian date, and must have a
  year between 1900 and the current year.
- Emergency contact is optional, but name, phone, and relationship must all be
  provided when any one of them is entered.

## 6. Trade-offs and next steps

The assignment prioritizes a clear user experience, responsive behavior, and an
understandable architecture. Authentication and a persistent hosted database
were kept out of scope. The real-time implementation is isolated behind an
adapter so that hosted cross-device synchronization is the next incremental
change rather than a rewrite.
