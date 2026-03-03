# Auth Page — Component Reference

**File:** `src/pages/Auth .jsx`  
**Component:** `AuthPage` (default export)

The Auth page is a full-screen, animated two-panel layout that handles both **Candidate** and **Interviewer** authentication flows. Role-switching swaps the panel positions via Framer Motion layout animation.

---

## Page Layout

```
┌──────────────────────────────────────────────────────────┐
│               h-dvh  ·  grid lg:grid-cols-2              │
│                                                          │
│  ┌─────────────────────┐  ┌─────────────────────────┐   │
│  │   BRANDING PANEL    │  │       FORM PANEL        │   │
│  │  (yellow gradient)  │  │      (white bg)         │   │
│  │                     │  │  ┌─────────────────┐    │   │
│  │  Title              │  │  │  ColloQLogo     │    │   │
│  │  Subtitle           │  │  │  RoleSwitcher   │    │   │
│  │  Bullet points      │  │  └─────────────────┘    │   │
│  │                     │  │  Progress Bar (step)    │   │
│  │                     │  │  ┌─────────────────┐    │   │
│  │                     │  │  │ AuthCard  OR    │    │   │
│  │                     │  │  │ StepOneBasic OR │    │   │
│  │                     │  │  │ StepTwoPro...   │    │   │
│  │                     │  │  └─────────────────┘    │   │
│  └─────────────────────┘  └─────────────────────────┘   │
└──────────────────────────────────────────────────────────┘
```

> **Panel swap:** When the role is `INTERVIEWER` the branding panel moves to `lg:order-2` and the form panel to `lg:order-1` — controlled by Framer Motion `layout` prop.

---

## State

| State | Type | Default | Purpose |
|---|---|---|---|
| `role` | `string` | `ROLE.CANDIDATE` | Active role (`"candidate"` \| `"interviewer"`) |
| `auth` | `{ email, password }` | `{ email:"", password:"" }` | Login field values |
| `isAuthed` | `boolean` | `false` | Whether the user passed the auth card step |
| `step` | `number` | `1` | Interviewer multi-step form step (1 or 2) |
| `profile` | `object` | see below | Interviewer profile build-up data |

### `profile` shape

```js
{
  bio:             "",   // short bio text
  company:         "",   // current company name
  designation:     "",   // job title
  experienceYears: "",   // years of experience
  specializations: [],   // array of selected tags
  githubUrl:       "",   // GitHub profile URL
  linkedinUrl:     "",   // LinkedIn profile URL
  cvFile:          null, // uploaded File object
}
```

---

## Derived / Memoized Values

| Value | Depends on | Description |
|---|---|---|
| `progress` | `isInterviewer`, `isAuthed`, `step` | Progress bar % — `50` on step 1, `100` on step 2 |
| `brandingCopy` | `role` | `{ title, subtitle, bullets }` — switches text between roles |
| `isInterviewer` | `role` | `true` when `role === ROLE.INTERVIEWER` |

---

## Flow Diagram

```
AuthPage loads
     │
     ▼
RoleSwitcher (Candidate / Interviewer)
     │
     ├─── CANDIDATE ──────────────────────────────────────────┐
     │                                                        │
     │    AuthCard (roleLabel="Candidate")                    │
     │    → onEmail / onGoogle → mockAuthenticate()           │
     │    (no further steps for candidate)                    │
     │                                                        │
     └─── INTERVIEWER ────────────────────────────────────────┐
                                                              │
          !isAuthed                                           │
          └── AuthCard (roleLabel="Interviewer")              │
              → onEmail / onGoogle → mockAuthenticate()       │
                    │                                         │
              isAuthed = true                                 │
                    │                                         │
              step === 1                                      │
              └── StepOneBasic (bio, company, designation,    │
                                experienceYears)              │
                    │                                         │
              [Continue] → step = 2                           │
                    │                                         │
              step === 2                                      │
              └── StepTwoProfessional (specializations,       │
                                       githubUrl,             │
                                       linkedinUrl, cvFile)   │
                    │                                         │
              [Submit Profile] → alert (mock submit)          │
```

---

## Components Used

### 1. `ColloQLogo`
**File:** `src/components/ColloQLogo.jsx`

Renders the ColloQ brand logo/wordmark. Placed in the top-left of the form panel alongside the "Mock Interview Platform" sub-label.

```jsx
<ColloQLogo />
```

---

### 2. `RoleSwitcher`
**File:** `src/components/Auth/Roleswitcher.jsx`

Animated pill toggle that switches between **Candidate** and **Interviewer** roles. Uses a Framer Motion sliding highlight behind the active button.

```jsx
<RoleSwitcher role={role} onChange={handleRoleChange} />
```

| Prop | Type | Description |
|---|---|---|
| `role` | `string` | Currently active role (`ROLE.CANDIDATE` \| `ROLE.INTERVIEWER`) |
| `onChange` | `(nextRole) => void` | Called when a role button is clicked |

**Internally imports:** `ROLE` from `src/data/Auth .js`

---

### 3. `AuthCard`
**File:** `src/components/Auth/Authcard.jsx`

The sign-in form card. Supports Google OAuth button and email + password fields. Renders for both roles — the `roleLabel` prop customises the heading.

```jsx
<AuthCard
  roleLabel="Candidate"       // or "Interviewer"
  auth={auth}                 // { email, password }
  setAuth={setAuth}
  onGoogle={mockAuthenticate}
  onEmail={mockAuthenticate}
  showSuccess={false}
/>
```

| Prop | Type | Description |
|---|---|---|
| `roleLabel` | `string` | Shown in the card heading |
| `auth` | `{ email, password }` | Controlled field values |
| `setAuth` | `setState fn` | Updates email/password state |
| `onGoogle` | `() => void` | Fired when "Continue with Google" clicked |
| `onEmail` | `() => void` | Fired when email sign-in submitted |
| `showSuccess` | `boolean` | (unused in current build) |

**Internally uses:** `Field` component for input fields.

---

### 4. `StepOneBasic`
**File:** `src/components/Auth/Steponebasic.jsx`  
**Shown:** Interviewer flow · Step 1 (after `isAuthed === true`)

Collects the interviewer's basic professional information.

```jsx
<StepOneBasic profile={profile} setProfile={setProfile} />
```

| Prop | Type | Description |
|---|---|---|
| `profile` | `object` | Full profile state |
| `setProfile` | `setState fn` | Updates profile fields |

**Fields rendered:**

| Field | Profile key | Component |
|---|---|---|
| Bio | `bio` | `Textarea` |
| Company | `company` | `Field` |
| Designation | `designation` | `Field` |
| Experience (Years) | `experienceYears` | `Field` |

**Internally uses:** `Field`, `Textarea` components.

---

### 5. `StepTwoProfessional`
**File:** `src/components/Auth/StepTwoProfessional.jsx`  
**Shown:** Interviewer flow · Step 2

Collects specializations, social links, and a CV upload.

```jsx
<StepTwoProfessional
  profile={profile}
  setProfile={setProfile}
  specializationOptions={SPECIALIZATION_OPTIONS}
  toggleSpecialization={toggleSpecialization}
/>
```

| Prop | Type | Description |
|---|---|---|
| `profile` | `object` | Full profile state |
| `setProfile` | `setState fn` | Updates profile fields |
| `specializationOptions` | `string[]` | Tag list from `SPECIALIZATION_OPTIONS` constant |
| `toggleSpecialization` | `(tag) => void` | Adds/removes a tag from `profile.specializations` |

**Sections rendered:**

| Section | Profile key | Input type |
|---|---|---|
| Specialization tags | `specializations` | Toggle buttons |
| GitHub URL | `githubUrl` | `Field` |
| LinkedIn URL | `linkedinUrl` | `Field` |
| CV Upload | `cvFile` | `<label>` file input |

**Internally uses:** `Field` component.

---

### 6. `Field` _(shared primitive)_
**File:** `src/components/Auth/Field.jsx`

A styled text input with a leading icon. Used by `AuthCard`, `StepOneBasic`, and `StepTwoProfessional`.

```jsx
<Field
  icon={<Mail className="h-4 w-4" />}
  placeholder="Email address"
  value={value}
  onChange={(v) => setState(v)}
  type="text"   // optional, defaults to "text"
/>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `icon` | `ReactNode` | — | Icon rendered on the left |
| `placeholder` | `string` | — | Input placeholder text |
| `value` | `string` | — | Controlled value |
| `onChange` | `(string) => void` | — | Called with the new string value |
| `type` | `string` | `"text"` | HTML input type |

---

## Data / Constants

**File:** `src/data/Auth .js`

```js
export const ROLE = {
  CANDIDATE:   "candidate",
  INTERVIEWER: "interviewer",
};

export const SPECIALIZATION_OPTIONS = [
  "React", "Java", "Spring Boot", "Node.js",
  "System Design", "Data Structures", "SQL", "DevOps", "UI/UX",
];
```

| Export | Used by |
|---|---|
| `ROLE` | `AuthPage`, `RoleSwitcher` |
| `SPECIALIZATION_OPTIONS` | `AuthPage` → passed as prop to `StepTwoProfessional` |

---

## Key Functions (`AuthPage`)

| Function | Triggered by | What it does |
|---|---|---|
| `handleRoleChange(nextRole)` | `RoleSwitcher.onChange` | Sets role; resets interviewer flow if switching away |
| `resetInterviewerFlow()` | "Back to Auth" button | Resets `isAuthed`, `step`, and `auth` fields |
| `mockAuthenticate()` | `AuthCard.onGoogle` / `AuthCard.onEmail` | Sets `isAuthed = true` (mock — no real API call) |
| `toggleSpecialization(tag)` | `StepTwoProfessional` | Adds/removes `tag` from `profile.specializations` |

---

## Animation

| Element | Library | Technique |
|---|---|---|
| Panel swap (role change) | Framer Motion | `layout` prop on `<motion.section>` |
| Branding text change | Framer Motion | `key` change triggers `initial → animate` |
| Progress bar fill | Framer Motion | `animate={{ width: \`${progress}%\` }}` |
| Form step transitions | Framer Motion | `AnimatePresence mode="wait"` + `fadeSlide` variant |

### `fadeSlide` variant

```js
const fadeSlide = {
  initial:    { opacity: 0, y: 10,  filter: "blur(4px)" },
  animate:    { opacity: 1, y: 0,   filter: "blur(0px)" },
  exit:       { opacity: 0, y: -10, filter: "blur(4px)" },
  transition: { duration: 0.35, ease: "easeOut" },
};
```

---

## File & Import Map

```
src/pages/Auth .jsx
 ├── src/data/Auth .js              (ROLE, SPECIALIZATION_OPTIONS)
 ├── src/components/ColloQLogo.jsx
 └── src/components/Auth/
      ├── Roleswitcher.jsx          → uses src/data/Auth .js
      ├── Authcard.jsx              → uses Field.jsx
      ├── Steponebasic.jsx          → uses Field.jsx, Textarea .jsx
      ├── StepTwoProfessional.jsx   → uses Field.jsx
      ├── Field.jsx                 (shared primitive)
      └── Textarea .jsx             (shared primitive)
```
