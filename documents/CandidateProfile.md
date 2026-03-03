# Candidate Profile Page — Component Reference

**File:** `src/pages/CandidateProfile.jsx`  
**Component:** `CandidateProfile` (default export)

The Candidate Profile page is a full dashboard for a logged-in candidate. It shows their profile sidebar, session statistics, a promotional booking banner, and lists of upcoming and completed mock interview sessions. Profile editing and session detail viewing are handled via overlay modals.

---

## Page Layout

```
┌────────────────────────────────────────────────────────────────────┐
│  STICKY HEADER  (bg-white · border-b · z-30)                       │
│  "Welcome back," · "👋 Hello Matthew, your dashboard!"             │
│                                              [Refer & Earn]        │
├────────────────────────────────────────────────────────────────────┤
│  BODY  max-w-7xl · flex md:flex-row · gap-6 · px-4 py-6           │
│                                                                    │
│  ┌──────────────┐   ┌──────────────────────────────────────────┐  │
│  │   SIDEBAR    │   │             MAIN CONTENT                 │  │
│  │  md:w-72     │   │             flex-1                       │  │
│  │  (sticky)    │   │                                          │  │
│  │              │   │  ┌────────┐ ┌────────┐ ┌────────┐       │  │
│  │  Avatar      │   │  │ Stats  │ │ Stats  │ │ Stats  │       │  │
│  │  Edit btn    │   │  │  Card  │ │  Card  │ │  Card  │       │  │
│  │  Name / Role │   │  └────────┘ └────────┘ └────────┘       │  │
│  │  Email       │   │                                          │  │
│  │  Location    │   │  ┌──────────────────────────────────┐   │  │
│  │  Joined date │   │  │  Promo Banner (yellow gradient)  │   │  │
│  │  Bio         │   │  │  "Book your next mock interview" │   │  │
│  │  Interests   │   │  │                   [Book Now →]   │   │  │
│  │              │   │  └──────────────────────────────────┘   │  │
│  └──────────────┘   │                                          │  │
│                     │  Upcoming Sessions  (list)               │  │
│                     │  ┌─────────────────────────────────┐    │  │
│                     │  │  SessionCard (type="upcoming")  │    │  │
│                     │  └─────────────────────────────────┘    │  │
│                     │                                          │  │
│                     │  Completed Sessions  (list)              │  │
│                     │  ┌─────────────────────────────────┐    │  │
│                     │  │  SessionCard (type="completed") │    │  │
│                     │  └─────────────────────────────────┘    │  │
│                     └──────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────┘
          ↕  (overlay portals rendered outside AnimatePresence)
    ┌────────────────────┐      ┌──────────────────────┐
    │   EditProfileModal │      │  SessionDetailsModal  │
    └────────────────────┘      └──────────────────────┘
```

> **Loading state:** `LoadingScreen` is shown for 2 seconds via `AnimatePresence mode="wait"` before the dashboard fades in.

---

## State

| State             | Type             | Default   | Purpose                                                  |
| ----------------- | ---------------- | --------- | -------------------------------------------------------- |
| `isLoading`       | `boolean`        | `true`    | Controls `LoadingScreen` vs dashboard visibility         |
| `isEditModalOpen` | `boolean`        | `false`   | Opens / closes `EditProfileModal`                        |
| `selectedSession` | `object \| null` | `null`    | Session passed to `SessionDetailsModal`; `null` = closed |
| `userData`        | `object`         | see below | Candidate profile data (editable)                        |

### `userData` shape

```js
{
  name:       "Matthew Loganoretti",
  email:      "matthew.l@email.com",
  location:   "San Francisco, CA",
  joinedDate: "January 2024",
  img:        "https://...",   // avatar URL
  bio:        "Aspiring product manager...",
  interests:  ["Product Management", "Strategy", "System Design", "Leadership"],
}
```

---

## Derived Values

### `stats` array

Built inline from mock data — passed one item at a time to `StatsCard`:

| Label          | Value source               | Icon                       |
| -------------- | -------------------------- | -------------------------- |
| Completed      | `completedSessions.length` | `CheckCircle` (yellow-500) |
| Pending        | `upcomingSessions.length`  | `Clock` (gray-400)         |
| Total Sessions | sum of both                | `LayoutDashboard` (black)  |

---

## Animation

| Element               | Variant / Technique                                                 |
| --------------------- | ------------------------------------------------------------------- |
| Page load             | `AnimatePresence mode="wait"` — swaps `LoadingScreen` → dashboard   |
| Sidebar slide-in      | `initial: { x: -40, opacity: 0 }` → `animate: { x: 0, opacity: 1 }` |
| Main content sections | `staggerContainer` with `staggerChildren: 0.2`                      |
| Each content block    | `fadeInUp` — `{ y: 30 → 0, opacity: 0 → 1, duration: 0.8 }`         |
| Promo banner hover    | `whileHover={{ scale: 1.005 }}`                                     |

### Variants

```js
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.2 } },
};
```

---

## Flow Diagram

```
CandidateProfile mounts
        │
        ▼
isLoading = true  →  LoadingScreen shown (2 s)
        │
        ▼
isLoading = false  →  Dashboard fades in
        │
        ├── [Refer & Earn] button  (no-op in current build)
        │
        ├── Sidebar → [Edit Profile] button
        │       │
        │       └── isEditModalOpen = true  →  EditProfileModal opens
        │               │
        │               └── onClose / Save  →  isEditModalOpen = false
        │                                      userData updated if saved
        │
        ├── Stats Cards  (read-only display)
        │
        ├── Promo Banner → [Book Now]
        │       └── navigate("/bookings")
        │
        ├── Upcoming Sessions list
        │       └── click any SessionCard
        │               └── selectedSession = session  →  SessionDetailsModal opens
        │                       └── onClose  →  selectedSession = null
        │
        └── Completed Sessions list  (display only, no modal)
```

---

## Components Used

### 1. `LoadingScreen`

**File:** `src/components/LoadingScreen.jsx`

Full-screen centered loader shown while `isLoading` is `true`. Uses a CSS keyframe animation with four ColloQ-yellow squares and fades out via `AnimatePresence exit`.

```jsx
<LoadingScreen message="Loading ColloQ Dashboard..." />
```

| Prop      | Type     | Default        | Description                             |
| --------- | -------- | -------------- | --------------------------------------- |
| `message` | `string` | `"Loading..."` | Uppercase label shown below the spinner |

---

### 2. `Sidebar`

**File:** `src/components/Candidate-Profile/Sidebar.jsx`

Sticky left-panel card displaying the candidate's avatar, contact info, bio, and interest tags. The "Edit Profile" button inside it fires `onEditClick` to open the edit modal.

```jsx
<Sidebar userProfile={userData} onEditClick={() => setIsEditModalOpen(true)} />
```

| Prop          | Type         | Description                                  |
| ------------- | ------------ | -------------------------------------------- |
| `userProfile` | `object`     | Full `userData` object                       |
| `onEditClick` | `() => void` | Called when "Edit Profile" button is clicked |

**Sidebar sections (top → bottom):**

| Section                            | Data field                                      |
| ---------------------------------- | ----------------------------------------------- |
| Circular avatar + green online dot | `userProfile.img`                               |
| "Edit Profile" pill button         | calls `onEditClick`                             |
| Name + "Candidate" role badge      | `userProfile.name`                              |
| Email · Location · Joined date     | `userProfile.email`, `.location`, `.joinedDate` |
| Bio quote block                    | `userProfile.bio`                               |
| Interests tag pills (yellow)       | `userProfile.interests[]`                       |

---

### 3. `StatsCard`

**File:** `src/components/Candidate-Profile/StatsCard.jsx`

Small statistic tile showing an icon, numeric value, and label. Three are rendered in a `sm:grid-cols-3` grid.

```jsx
<StatsCard
  icon={<CheckCircle className="w-5 h-5 text-yellow-500" />}
  value={3}
  label="Completed"
/>
```

| Prop    | Type               | Description                       |
| ------- | ------------------ | --------------------------------- |
| `icon`  | `ReactNode`        | Lucide icon element               |
| `value` | `number \| string` | The stat value displayed large    |
| `label` | `string`           | Descriptive label below the value |

---

### 4. `SessionCard`

**File:** `src/components/Candidate-Profile/SessionCard.jsx`

Renders one mock interview session row. Appearance differs based on the `type` prop.

```jsx
// Upcoming — clickable, opens SessionDetailsModal
<SessionCard type="upcoming" session={session} />

// Completed — shows star rating + feedback block
<SessionCard type="completed" session={session} />
```

| Prop      | Type                        | Description                           |
| --------- | --------------------------- | ------------------------------------- |
| `type`    | `"upcoming" \| "completed"` | Controls which layout variant renders |
| `session` | `object`                    | Session data object (see shape below) |

**Session data shape (from `sessionData.js`):**

```js
{
  id:              number,
  interviewerName: string,
  interviewerRole: string,
  interviewerImg:  string,   // avatar URL
  date:            string,   // e.g. "Feb 15, 2026"
  time:            string,   // e.g. "10:30 AM - 11:30 AM"
  category:        string,   // e.g. "System Design"
  status:          string,   // "Confirmed" | "Pending" | "Completed"
  meetingLink:     string,
  // completed sessions also have:
  rating:          number,   // e.g. 4.8
  feedback:        string,
}
```

**Layout variants:**

| `type`        | Right-side content                                              |
| ------------- | --------------------------------------------------------------- |
| `"upcoming"`  | Status badge (`Confirmed` / `Pending`) + "View Details" button  |
| `"completed"` | Star rating row + feedback quote block + "View Feedback" button |

---

### 5. `EditProfileModal`

**File:** `src/components/Candidate-Profile/EditProfileModal.jsx`

Full-screen overlay modal (`z-60`) for editing the candidate's profile. Changes are committed to parent state via `setUserData` on form submit. Includes backdrop blur and scale-in animation.

```jsx
<EditProfileModal
  isOpen={isEditModalOpen}
  onClose={() => setIsEditModalOpen(false)}
  userData={userData}
  setUserData={setUserData}
/>
```

| Prop          | Type          | Description                                        |
| ------------- | ------------- | -------------------------------------------------- |
| `isOpen`      | `boolean`     | Controls render (used by parent `AnimatePresence`) |
| `onClose`     | `() => void`  | Closes the modal without saving                    |
| `userData`    | `object`      | Current profile data used to seed the form         |
| `setUserData` | `setState fn` | Called with the new profile object on save         |

**Form sections:**

| Section       | Fields                                         |
| ------------- | ---------------------------------------------- |
| Profile photo | Avatar preview + "Change Profile Photo" button |
| Basic info    | Full Name, Location                            |
| Bio           | Textarea                                       |
| Links         | Website, LinkedIn, GitHub                      |
| Interests     | Tag list with add / remove per tag             |

**Internal state:**

| State         | Default           | Description                            |
| ------------- | ----------------- | -------------------------------------- |
| `formData`    | `userData` (prop) | Local copy of the form being edited    |
| `newInterest` | `""`              | Input value for adding an interest tag |

---

### 6. `SessionDetailsModal`

**File:** `src/components/Candidate-Profile/SessionDetailsModal.jsx`

Overlay modal (`z-70`) showing full detail for a clicked upcoming session. Renders `null` if `isOpen` is `false` or `session` is `null`. Contains a "Join Interview Room" CTA button.

```jsx
<SessionDetailsModal
  isOpen={!!selectedSession}
  onClose={() => setSelectedSession(null)}
  session={selectedSession}
/>
```

| Prop      | Type             | Description                                   |
| --------- | ---------------- | --------------------------------------------- |
| `isOpen`  | `boolean`        | If `false` (or session null), renders nothing |
| `onClose` | `() => void`     | Clears `selectedSession` in parent            |
| `session` | `object \| null` | The session to display                        |

**Modal sections:**

| Section                        | Data shown                 |
| ------------------------------ | -------------------------- |
| Yellow top strip               | decorative accent bar      |
| "Mock Interview" badge + topic | `session.topic`            |
| Date info card                 | `session.date`             |
| Time info card                 | `session.time`             |
| Interviewer card               | `session.interviewer`      |
| Blue notice block              | Camera/mic preparation tip |
| "Join Interview Room" button   | Static CTA (video icon)    |

---

## Data Source

**File:** `src/data/sessionData.js`

| Export              | Used for                                  |
| ------------------- | ----------------------------------------- |
| `upcomingSessions`  | `stats[1].value`, Upcoming Sessions list  |
| `completedSessions` | `stats[0].value`, Completed Sessions list |

Both arrays are imported directly — no API calls in the current build.

---

## Routing

```jsx
import { useNavigate } from "react-router-dom";
const navigate = useNavigate();

// Promo banner "Book Now" button:
onClick={() => navigate("/bookings")
```

The only navigation action in this page redirects to `/bookings`.

---

## File & Import Map

```
src/pages/CandidateProfile.jsx
 ├── react-router-dom                              (useNavigate)
 ├── framer-motion                                 (motion, AnimatePresence)
 ├── src/data/sessionData.js                       (upcomingSessions, completedSessions)
 ├── src/components/LoadingScreen.jsx
 └── src/components/Candidate-Profile/
      ├── Sidebar.jsx
      ├── StatsCard.jsx
      ├── SessionCard.jsx
      ├── EditProfileModal.jsx
      └── SessionDetailsModal.jsx
```
