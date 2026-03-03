# Bookings Page — Component Reference

**File:** `src/pages/bookings.jsx`  
**Component:** `Bookings` (default export)

The Bookings page lets a candidate search, filter, and book a mock interview session with an available expert interviewer. It has a sticky navbar, level/type filter selectors, a responsive interviewer grid, and a modal-based booking flow.

---

## Page Layout

```
┌──────────────────────────────────────────────────────────────┐
│  NAVBAR  (sticky · z-50)                                     │
│  ColloQLogo                        Candidate name · Avatar   │
├──────────────────────────────────────────────────────────────┤
│  MAIN  max-w-7xl                                             │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Hero & Search                                       │   │
│  │  "Book Your Interviewer"  +  Search input            │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Filter Panel  (bg-white · rounded-xl · shadow-sm)   │   │
│  │  ── Select Level  (Intern … Lead)                    │   │
│  │  ── Engineering Type  (Frontend … UI/UX)             │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Available Experts  (grid 1 / md:2 / lg:3 cols)      │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐           │   │
│  │  │Interviewer│  │Interviewer│  │Interviewer│           │   │
│  │  │  Card    │  │  Card    │  │  Card    │           │   │
│  │  └──────────┘  └──────────┘  └──────────┘           │   │
│  │  (empty state: SearchX icon + "No Experts Found")    │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  FOOTER  ·  © ColloQ  · Privacy · Terms · Support           │
└──────────────────────────────────────────────────────────────┘
                           ↕ (portal overlay)
           ┌───────────────────────────────────────┐
           │          BookingModal  (z-60)          │
           └───────────────────────────────────────┘
```

---

## State

| State                 | Type             | Default      | Purpose                                                         |
| --------------------- | ---------------- | ------------ | --------------------------------------------------------------- |
| `selectedLevel`       | `string`         | `"Intern"`   | Active experience level filter                                  |
| `selectedType`        | `string`         | `"Frontend"` | Active engineering type filter                                  |
| `searchQuery`         | `string`         | `""`         | Text search against name and tags                               |
| `selectedInterviewer` | `object \| null` | `null`       | The interviewer passed to `BookingModal`; `null` = modal closed |

---

## Filter Data

### Experience Levels

```js
["Intern", "Trainee", "Associate", "Junior", "Mid-level", "Senior", "Lead"];
```

### Engineering Types

```js
["Frontend", "Backend", "FullStack", "QA", "DevOps", "Mobile", "UI/UX"];
```

---

## Interviewer Data Shape

Each object in `allInterviewers` follows this structure:

```js
{
  id:          number,    // unique identifier
  name:        string,    // display name
  role:        string,    // job title (e.g. "Senior SE")
  company:     string,    // employer name
  rating:      number,    // e.g. 4.9
  reviews:     number,    // total review count
  experience:  string,    // e.g. "8 years"
  level:       string,    // must match a value in `levels[]`
  type:        string,    // must match a value in `types[]`
  description: string,    // short bio / speciality text
  tags:        string[],  // tech / skill tags
  available:   string,    // e.g. "Available Now" | "Tomorrow"
  image:       string,    // avatar image URL
}
```

### Sample Records

| #   | Name             | Level     | Type      | Company                 |
| --- | ---------------- | --------- | --------- | ----------------------- |
| 1   | Priya Sharma     | Senior    | Frontend  | Epic Lanka Technologies |
| 2   | Arjun Perera     | Lead      | Backend   | Sysco LABS              |
| 3   | Sanduni Silva    | Mid-level | QA        | WSO2                    |
| 4   | Dilshan Silva    | Intern    | Frontend  | 99x                     |
| 5   | Chamari Atapattu | Associate | FullStack | IFS                     |

---

## Filtering Logic (`useMemo`)

```js
const filteredInterviewers = useMemo(() => {
  return allInterviewers.filter((person) => {
    const matchLevel = person.level === selectedLevel;
    const matchType = person.type === selectedType;
    const matchSearch =
      person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.tags.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    return matchLevel && matchType && matchSearch;
  });
}, [selectedLevel, selectedType, searchQuery]);
```

All three conditions are AND-ed — a card only renders if it passes level, type, **and** the text search.

---

## Flow Diagram

```
User arrives at /bookings
        │
        ▼
Sees filter panel + interviewer grid
        │
        ├── Changes level pill  → selectedLevel updates → filteredInterviewers recomputes
        ├── Changes type pill   → selectedType updates  → filteredInterviewers recomputes
        └── Types in search box → searchQuery updates   → filteredInterviewers recomputes
                │
                ▼
        Clicks "Book Session" on an InterviewerCard
                │
                ▼
        selectedInterviewer = person  →  BookingModal opens
                │
                ├── Picks a date (calendar)
                ├── Picks a time slot
                └── Clicks "Confirm Booking"
                        │
                        ▼
                  showSuccess = true → success screen shown
                        │
                        ▼
                  Clicks "Done"
                        │
                        ▼
                  onClose() → selectedInterviewer = null → modal closes
```

---

## Components Used

### 1. `ColloQLogo`

**File:** `src/components/ColloQLogo.jsx`

Renders the animated ColloQ brand wordmark. "Collo" uses an orange-to-yellow gradient; "Q" has a pulsing sound-bar decoration.

```jsx
<ColloQLogo />
// optional props:
// size      — Tailwind text size class  (default: "text-2xl")
// className — extra classes             (default: "")
```

| Prop        | Type     | Default      | Description                |
| ----------- | -------- | ------------ | -------------------------- |
| `size`      | `string` | `"text-2xl"` | Tailwind font-size class   |
| `className` | `string` | `""`         | Additional wrapper classes |

---

### 2. `InterviewerCard`

**File:** `src/components/Bookings/InterviewerCard.jsx`

A self-contained card displaying one interviewer's profile summary. Clicking **Book Session** calls `onBook` with the person object, which opens the `BookingModal`.

```jsx
<InterviewerCard
  person={person} // interviewer data object
  onBook={setSelectedInterviewer}
/>
```

| Prop     | Type               | Description                                                         |
| -------- | ------------------ | ------------------------------------------------------------------- |
| `person` | `object`           | Full interviewer data object (see shape above)                      |
| `onBook` | `(person) => void` | Called when "Book Session" is clicked; receives the `person` object |

**Card anatomy (top → bottom):**

| Section               | Data shown                                     |
| --------------------- | ---------------------------------------------- |
| Avatar + online dot   | `person.image`, green dot                      |
| Name + role · company | `person.name`, `person.role`, `person.company` |
| Star rating badge     | `person.rating`                                |
| Description quote     | `person.description` (2-line clamp)            |
| Skill tags            | `person.tags[]`                                |
| Footer row            | `person.experience`, `person.available`        |
| CTA button            | "Book Session →" → calls `onBook(person)`      |

---

### 3. `BookingModal`

**File:** `src/components/Bookings/BookingModal.jsx`

A full-screen overlay modal split into two panels: left (interviewer profile summary) and right (calendar + time slot picker). Renders `null` when `selectedInterviewer` is `null`.

```jsx
<BookingModal
  selectedInterviewer={selectedInterviewer} // null = hidden
  onClose={closeModal}
/>
```

| Prop                  | Type             | Description                                              |
| --------------------- | ---------------- | -------------------------------------------------------- |
| `selectedInterviewer` | `object \| null` | The booked person; `null` closes the modal               |
| `onClose`             | `() => void`     | Called on close button or after "Done" on success screen |

#### Internal State

| State          | Type             | Default                    | Description                           |
| -------------- | ---------------- | -------------------------- | ------------------------------------- |
| `selectedDate` | `number`         | `new Date().getDate()`     | Selected calendar day number          |
| `selectedTime` | `string \| null` | `null`                     | Selected time slot string             |
| `currentMonth` | `number`         | `new Date().getMonth()`    | Displayed calendar month (0–11)       |
| `currentYear`  | `number`         | `new Date().getFullYear()` | Displayed calendar year               |
| `showSuccess`  | `boolean`        | `false`                    | Flips to success screen after confirm |

#### Internal Constants

```js
timeSlots = [
  "09:00 AM - 10:00 AM",
  "11:00 AM - 12:00 PM",
  "02:00 PM - 03:00 PM",
  "04:30 PM - 05:30 PM",
  "08:00 PM - 09:00 PM",
];
```

#### Modal Panels

```
┌──────────────────────────────────────────────────────────────┐
│                  BookingModal  max-w-4xl                     │
│                                                              │
│  ┌────────────────┐  ┌──────────────────────────────────┐   │
│  │  LEFT  lg:w-1/3│  │  RIGHT  lg:w-2/3                 │   │
│  │  (bg-gray-50)  │  │                                  │   │
│  │                │  │  ┌──────────┐  ┌──────────────┐  │   │
│  │  Avatar        │  │  │ Calendar │  │  Time Slots  │  │   │
│  │  Name / Role   │  │  │  picker  │  │  (5 buttons) │  │   │
│  │  Company       │  │  └──────────┘  └──────────────┘  │   │
│  │  ─────────     │  │                                  │   │
│  │  Exp / Rating  │  │  [Confirm Booking] ← disabled    │   │
│  │                │  │   until date + time selected     │   │
│  └────────────────┘  └──────────────────────────────────┘   │
│                                                              │
│  ── on showSuccess ─────────────────────────────────────┐   │
│  │  🎉  Booking Successful!                              │   │
│  │  Date · Time  confirmation summary                    │   │
│  │  [Done]                                               │   │
│  └───────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
```

#### Confirm Button Logic

```
selectedTime && selectedDate  →  active   (bg-[#FFD000] text-black)
otherwise                     →  disabled (bg-gray-100 text-gray-400 cursor-not-allowed)
```

---

## Key Functions

| Function                                  | Triggered by             | What it does                                                       |
| ----------------------------------------- | ------------------------ | ------------------------------------------------------------------ |
| `closeModal()`                            | `BookingModal.onClose`   | Sets `selectedInterviewer = null`, closing the modal               |
| `handleBookingConfirm()` _(inside modal)_ | "Confirm Booking" button | Sets `showSuccess = true` if both date and time are selected       |
| `filteredInterviewers` (memo)             | State changes            | Re-filters `allInterviewers` on every level / type / search change |

---

## File & Import Map

```
src/pages/bookings.jsx
 ├── src/components/ColloQLogo.jsx
 └── src/components/Bookings/
      ├── InterviewerCard.jsx
      └── BookingModal.jsx
```
