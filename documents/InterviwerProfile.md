# Interviewer Profile Page — Component Reference

**File:** `src/pages/InterviwerProfile.jsx`  
**Component:** `InterviwerProfile` (default export)

The Interviewer Profile page is the main dashboard for a logged-in expert interviewer. It displays their profile sidebar, performance stats, a practice mode toggle, incoming candidate booking requests, and upcoming scheduled interviews. Wallet management and profile editing are handled via overlay modals. A toast notification system provides inline feedback.

---

## Page Layout

```
┌────────────────────────────────────────────────────────────────────┐
│  NavbarTop  (sticky · bg-white · border-b · z-30)                  │
│  "Interviewer Dashboard"               [Wallet icon] [Edit icon]   │
├────────────────────────────────────────────────────────────────────┤
│  BODY  max-w-7xl · flex md:flex-row · gap-6 · px-4 py-6           │
│                                                                    │
│  ┌──────────────┐   ┌──────────────────────────────────────────┐  │
│  │ SidebarPro-  │   │             MAIN CONTENT                 │  │
│  │  fileCard    │   │             flex-1                       │  │
│  │  md:w-72     │   │                                          │  │
│  │  (sticky)    │   │  ┌─────────┐ ┌─────────┐ ┌──────────┐  │  │
│  │              │   │  │ Pending │ │Approved │ │ Total    │  │  │
│  │  Avatar      │   │  │Requests │ │Sessions │ │Earnings  │  │  │
│  │  Edit btn    │   │  └─────────┘ └─────────┘ └──────────┘  │  │
│  │  Name / Role │   │                    StatsRow             │  │
│  │  Email       │   │                                          │  │
│  │  Location    │   │  ┌──────────────────────────────────┐   │  │
│  │  Joined date │   │  │      JoinAsCandidateCard         │   │  │
│  │  LinkedIn    │   │  │  [Interviewer Mode] [Candidate]  │   │  │
│  │  GitHub      │   │  └──────────────────────────────────┘   │  │
│  │  Download CV │   │                                          │  │
│  │  Bio         │   │  Pending Requests section               │  │
│  │  Expertise   │   │  ┌──────────────────────────────────┐   │  │
│  │              │   │  │         RequestCard              │   │  │
│  └──────────────┘   │  └──────────────────────────────────┘   │  │
│                     │                                          │  │
│                     │  ┌──────────────────────────────────┐   │  │
│                     │  │       UpcomingInterviews         │   │  │
│                     │  └──────────────────────────────────┘   │  │
│                     └──────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────┘
        ↕  (overlay portals)
 ┌──────────────────┐   ┌────────────────────┐   ┌───────────┐
 │  MyWalletPanel   │   │  ProfileEditModal  │   │   Toast   │
 └──────────────────┘   └────────────────────┘   └───────────┘
```

> **Loading state:** `LoadingScreen` is shown for 2 seconds via `AnimatePresence mode="wait"` before the dashboard fades in (`opacity: 0 → 1, duration: 0.6`).

---

## State

| State        | Type             | Default | Purpose                                          |
| ------------ | ---------------- | ------- | ------------------------------------------------ |
| `isLoading`  | `boolean`        | `true`  | Controls `LoadingScreen` vs dashboard visibility |
| `openWallet` | `boolean`        | `false` | Opens / closes `MyWalletPanel` modal             |
| `openEdit`   | `boolean`        | `false` | Opens / closes `ProfileEditModal`                |
| `toast`      | `object \| null` | `null`  | Feeds the `Toast` notification system            |

### `toast` shape

```js
{ type: "success" | "error" | "info",  message: string }
// null = no toast showing
```

---

## Flow Diagram

```
InterviwerProfile mounts
        │
        ▼
isLoading = true  →  LoadingScreen shown (2 s)
        │
        ▼
isLoading = false  →  Dashboard fades in
        │
        ├── NavbarTop
        │     ├── [Wallet icon]  → openWallet = true  → MyWalletPanel opens
        │     │       └── onClose / withdraw action → toast fires
        │     └── [Edit icon]   → openEdit = true   → ProfileEditModal opens
        │             └── onClose / save → toast fires
        │
        ├── SidebarProfileCard
        │     └── [Edit Profile] button (internal) → own ProfileEditModal instance
        │
        ├── StatsRow  (read-only display)
        │
        ├── JoinAsCandidateCard
        │     ├── [Interviewer Mode]  → info text shown
        │     └── [Candidate Mode]   → "Book a session" CTA shown
        │
        ├── Pending Requests section
        │     └── RequestCard → [Approve] / [Decline] (static in current build)
        │
        └── UpcomingInterviews
              └── simulated fetch → skeleton → interview rows → [Join Call]
```

---

## Components Used

### 1. `LoadingScreen`

**File:** `src/components/LoadingScreen.jsx`

Full-screen centered spinner shown while `isLoading` is `true`. Fades out via Framer Motion `exit` animation when swapped by `AnimatePresence`.

```jsx
<LoadingScreen message="Loading Expert Profile..." />
```

| Prop      | Type     | Default        | Description                                      |
| --------- | -------- | -------------- | ------------------------------------------------ |
| `message` | `string` | `"Loading..."` | Uppercase tracking label shown below the spinner |

---

### 2. `NavbarTop`

**File:** `src/components/Interviwer-Profile/NavbarTop.jsx`

Sticky top navigation bar. Shows the dashboard title on the left and two icon buttons (Wallet, Edit Profile) on the right. Each button has a tooltip that appears on hover.

```jsx
<NavbarTop
  onWallet={() => setOpenWallet(true)}
  onEdit={() => setOpenEdit(true)}
/>
```

| Prop       | Type         | Description                                   |
| ---------- | ------------ | --------------------------------------------- |
| `onWallet` | `() => void` | Called when the Wallet icon is clicked        |
| `onEdit`   | `() => void` | Called when the Edit (Pencil) icon is clicked |

**Header buttons:**

| Button       | Icon     | Action                                    |
| ------------ | -------- | ----------------------------------------- |
| My Wallet    | `Wallet` | Calls `onWallet` → opens `MyWalletPanel`  |
| Edit Profile | `Pencil` | Calls `onEdit` → opens `ProfileEditModal` |

---

### 3. `SidebarProfileCard`

**File:** `src/components/Interviwer-Profile/SidebarProfileCard.jsx`

Self-contained sticky sidebar card for the interviewer's profile. Manages its own local `profile` state seeded from `defaultProfile`. Includes its own internal `ProfileEditModal` and `Toast` instances — editing here updates only the sidebar display (demo mode).

```jsx
<SidebarProfileCard />
// No props — fully self-contained
```

**Internal state:**

| State      | Default          | Description                                      |
| ---------- | ---------------- | ------------------------------------------------ |
| `profile`  | `defaultProfile` | Local profile data (name, email, location, etc.) |
| `openEdit` | `false`          | Controls the sidebar's own `ProfileEditModal`    |
| `toast`    | `null`           | Local toast for "Profile updated" feedback       |

**Default profile shape:**

```js
{
  name:       "Priya Sharma",
  email:      "priya.sharma@email.com",
  location:   "Colombo, Sri Lanka",
  joinedDate: "October 2025",
  bio:        "Senior Software Engineer...",
  avatar:     "https://randomuser.me/api/portraits/women/68.jpg",
  skills:     ["System Design", "DSA", "React", "Node.js", "Leadership"],
  linkedin:   "https://linkedin.com/in/priyasharma",
  github:     "https://github.com/priyasharma",
  cv:         "#",
}
```

**Sidebar sections (top → bottom):**

| Section                            | Data field                                  |
| ---------------------------------- | ------------------------------------------- |
| Circular avatar + green online dot | `profile.avatar`                            |
| "Edit Profile" pill button         | opens internal `ProfileEditModal`           |
| Name + "Expert Interviewer" badge  | `profile.name`                              |
| Email · Location · Joined date     | `profile.email`, `.location`, `.joinedDate` |
| LinkedIn + GitHub icon links       | `profile.linkedin`, `profile.github`        |
| Download CV button (yellow)        | `profile.cv`                                |
| Bio quote block                    | `profile.bio`                               |
| Expertise skill tags (yellow)      | `profile.skills[]`                          |

---

### 4. `StatsRow`

**File:** `src/components/Interviwer-Profile/StatsRow.jsx`

Renders three statistic tiles in a `sm:grid-cols-3` grid. Data is hardcoded in the component (static mock).

```jsx
<StatsRow />
// No props — data is internal
```

**Stat tiles:**

| Label             | Value    | Icon colour        | Background     |
| ----------------- | -------- | ------------------ | -------------- |
| Pending Requests  | 4        | Yellow (`#FACC15`) | `bg-[#FEF9C3]` |
| Approved Sessions | 12       | Green (`#22C55E`)  | `bg-[#DCFCE7]` |
| Total Earnings    | ₹ 18,500 | Blue (`#0EA5E9`)   | `bg-[#E0F2FE]` |

---

### 5. `JoinAsCandidateCard`

**File:** `src/components/Interviwer-Profile/JoinAsCandidateCard.jsx`

A "Practice Mode" toggle card. Lets the interviewer switch between **Interviewer Mode** (info text) and **Candidate Mode** (booking CTA). Built with internal `mode` state; no props required.

```jsx
<JoinAsCandidateCard />
// No props — self-contained toggle
```

**Internal state:**

| State  | Default         | Values                           |
| ------ | --------------- | -------------------------------- |
| `mode` | `"interviewer"` | `"interviewer"` \| `"candidate"` |

**Mode content:**

| Mode            | Content shown                                               |
| --------------- | ----------------------------------------------------------- |
| `"interviewer"` | Info text: "You are currently in Interviewer Mode…"         |
| `"candidate"`   | Yellow info card + "Book a mock interview session →" button |

---

### 6. `RequestCard`

**File:** `src/components/Interviwer-Profile/RequestCard.jsx`

Displays a single incoming booking request from a candidate. Currently renders static mock data (Sarah Williams). Shows the candidate's avatar, name, status badge, date/time chips, fee, a message bubble, and Approve/Decline action buttons.

```jsx
<RequestCard />
// No props — static mock data in current build
```

**Card anatomy (top → bottom):**

| Section                 | Detail                                                      |
| ----------------------- | ----------------------------------------------------------- |
| Amber accent bar (left) | Visual priority indicator                                   |
| Candidate avatar + name | "Sarah Williams"                                            |
| Status badge            | "Pending" (emerald)                                         |
| Role                    | "Product Manager"                                           |
| Chips row               | Date · Time · "1 Session" · "Product Strategy"              |
| Total fee               | `$150`                                                      |
| Message bubble          | Candidate's note to the interviewer                         |
| Action buttons          | [Decline] (red `XCircle`) · [Approve] (green `CheckCircle`) |

---

### 7. `UpcomingInterviews`

**File:** `src/components/Interviwer-Profile/UpcomingInterviews.jsx`

Fetches (simulated via `setTimeout`) a list of upcoming interview sessions and renders them with skeleton loaders while loading. Each row shows topic, date/time, status badge, and a "Join Call" button.

```jsx
<UpcomingInterviews />
// No props — self-contained with internal fetch simulation
```

**Internal state:**

| State        | Default | Description                                  |
| ------------ | ------- | -------------------------------------------- |
| `interviews` | `[]`    | List of interview objects loaded after 1.2 s |
| `loading`    | `true`  | Shows skeleton placeholders while `true`     |

**Interview object shape:**

```js
{ id: number, topic: string, date: string, status: "Scheduled" }
```

**Render states:**

| Condition                 | Output                                                  |
| ------------------------- | ------------------------------------------------------- |
| `loading = true`          | 2 animated skeleton `div`s                              |
| `interviews.length === 0` | "No upcoming interviews." empty state                   |
| interviews available      | Rows with topic badge, date, status, [Join Call] button |

---

### 8. `MyWalletPanel`

**File:** `src/components/Interviwer-Profile/MyWalletPanel.jsx`

A full-featured wallet overlay modal. Displays current balance, transaction history, withdraw form, and bank account management. Internal toast state is separate from the page-level `toast`.

```jsx
<MyWalletPanel
  open={openWallet}
  onClose={() => setOpenWallet(false)}
  setToast={setToast}
  modal
/>
```

| Prop       | Type          | Description                                |
| ---------- | ------------- | ------------------------------------------ |
| `open`     | `boolean`     | Shows / hides the panel                    |
| `onClose`  | `() => void`  | Called to close the wallet panel           |
| `setToast` | `setState fn` | Fires page-level toast on withdraw actions |
| `modal`    | `boolean`     | Renders as a full overlay (vs inline)      |

**Internal mock data:**

```js
dummyBanks = [{ id, name }]; // HDFC Bank, ICICI Bank
dummyTransactions = [{ id, date, type, sessionId, status, amount }]; // Earning / Withdraw entries
```

**`StatusChip` sub-component** (internal):

| `status`    | Colour | Icon          |
| ----------- | ------ | ------------- |
| `"Paid"`    | Green  | `CheckCircle` |
| `"Failed"`  | Red    | `XCircle`     |
| `"Pending"` | Yellow | `Clock`       |

---

### 9. `ProfileEditModal`

**File:** `src/components/Interviwer-Profile/ProfileEditModal.jsx`

Overlay modal (`z-110`) for editing the interviewer's expert profile. Fires `setToast` with a success message on save, then closes. Renders `null` when `open` is `false`.

```jsx
<ProfileEditModal
  open={openEdit}
  onClose={() => setOpenEdit(false)}
  setToast={setToast}
/>
```

| Prop       | Type          | Description                                                                   |
| ---------- | ------------- | ----------------------------------------------------------------------------- |
| `open`     | `boolean`     | If `false`, renders nothing                                                   |
| `onClose`  | `() => void`  | Closes the modal                                                              |
| `setToast` | `setState fn` | Fires `{ message: "Profile updated successfully!", type: "success" }` on save |

**Internal `formData` state shape:**

```js
{
  name:     "Priya Sharma",
  email:    "priya.sharma@email.com",
  location: "Colombo, Western Province",
  bio:      "Senior Software Engineer...",
  skills:   "System Design, DSA, React, Node.js, Leadership",
  github:   "https://github.com/priyasharma",
  linkedin: "https://linkedin.com/in/priyasharma",
  avatar:   "https://randomuser.me/api/portraits/women/68.jpg",
  cvName:   "My_Resume.pdf",
}
```

**Form sections:**

| Section       | Fields                                                   |
| ------------- | -------------------------------------------------------- |
| Profile photo | Clickable avatar with camera overlay + hidden file input |
| Basic info    | Name, Location                                           |
| Bio           | Textarea                                                 |
| Skills        | Text input (comma-separated)                             |
| Social links  | GitHub URL, LinkedIn URL                                 |
| CV upload     | File input with current filename display                 |

---

### 10. `Toast`

**File:** `src/components/Interviwer-Profile/Toast.jsx`

Fixed bottom-center notification banner. Auto-dismisses after 2.2 seconds. Renders `null` when `toast` is `null`.

```jsx
<Toast toast={toast} setToast={setToast} />
```

| Prop       | Type             | Description                                           |
| ---------- | ---------------- | ----------------------------------------------------- |
| `toast`    | `object \| null` | `{ type, message }` — `null` hides the toast          |
| `setToast` | `setState fn`    | Called with `null` after the 2.2 s timeout to dismiss |

**Toast types and icons:**

| `type`       | Icon          | Colour |
| ------------ | ------------- | ------ |
| `"success"`  | `CheckCircle` | Green  |
| `"error"`    | `XCircle`     | Red    |
| `"info"`     | `Info`        | Blue   |
| _(fallback)_ | `Info`        | Blue   |

---

## File & Import Map

```
src/pages/InterviwerProfile.jsx
 ├── framer-motion                                       (motion, AnimatePresence)
 ├── src/components/LoadingScreen.jsx
 └── src/components/Interviwer-Profile/
      ├── NavbarTop.jsx
      ├── SidebarProfileCard.jsx
      │    ├── ProfileEditModal.jsx   (own internal instance)
      │    └── Toast.jsx             (own internal instance)
      ├── StatsRow.jsx
      ├── JoinAsCandidateCard.jsx
      ├── CandidateRequests.jsx      (imported but unused in current JSX)
      ├── RequestCard.jsx
      ├── UpcomingInterviews.jsx
      ├── MyWalletPanel.jsx
      │    ├── Modal.jsx             (internal wrapper)
      │    └── Toast.jsx             (internal instance)
      ├── ProfileEditModal.jsx       (page-level instance)
      └── Toast.jsx                  (page-level instance)
```

> **Note:** `CandidateRequests` is imported at the top of `InterviwerProfile.jsx` but not rendered in the current JSX — it is likely a planned replacement for `RequestCard`.
