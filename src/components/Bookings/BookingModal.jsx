import React, { useState } from "react";
import {
  X,
  PartyPopper,
  CalendarCheck,
  Star,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  CreditCard,
} from "lucide-react";

const BookingModal = ({ selectedInterviewer, onClose }) => {
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showSuccess, setShowSuccess] = useState(false);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const timeSlots = [
    "09:00 AM - 10:00 AM",
    "11:00 AM - 12:00 PM",
    "02:00 PM - 03:00 PM",
    "04:30 PM - 05:30 PM",
    "08:00 PM - 09:00 PM",
  ];

  // Helper to get days in month
  const getDaysInMonth = (month, year) =>
    new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  const handleBookingConfirm = () => {
    if (selectedTime && selectedDate) {
      setShowSuccess(true);
    }
  };

  if (!selectedInterviewer) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/30 backdrop-blur-[2px] animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden relative flex flex-col lg:flex-row h-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors z-20"
        >
          <X className="h-5 w-5" />
        </button>

        {showSuccess ? (
          <div className="w-full flex flex-col items-center justify-center p-8 lg:p-16 text-center animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-5 shadow-inner">
              <PartyPopper className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Booking Successful!
            </h3>
            <p className="text-sm text-gray-500 max-w-sm mx-auto mb-6">
              Interview with{" "}
              <span className="font-bold text-gray-800">
                {selectedInterviewer.name}
              </span>{" "}
              is confirmed. Check your email for details.
            </p>

            <div className="bg-gray-50 rounded-xl p-4 w-full max-w-xs border border-gray-100 mb-6 flex flex-col gap-3">
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
                  <CalendarCheck className="h-5 w-5 text-[#E8960A]" />
                </div>
                <div>
                  <p className="text-[8px] uppercase font-bold text-gray-400 tracking-tighter">
                    Date & Time
                  </p>
                  <p className="text-xs font-bold text-gray-800">
                    {months[currentMonth]} {selectedDate}, {selectedTime}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm overflow-hidden border">
                  <img
                    src={selectedInterviewer.image}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </div>
                <div>
                  <p className="text-[8px] uppercase font-bold text-gray-400 tracking-tighter">
                    Interviewer
                  </p>
                  <p className="text-xs font-bold text-gray-800">
                    {selectedInterviewer.name}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition-all active:scale-95 shadow-lg"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            {/* Left Side: Profile */}
            <div className="w-full lg:w-1/3 p-6 bg-gray-50 flex flex-col items-center justify-center text-center border-r border-gray-100 shrink-0">
              <div className="relative mb-4">
                <img
                  src={selectedInterviewer.image}
                  alt={selectedInterviewer.name}
                  className="w-24 h-24 lg:w-32 lg:h-32 rounded-xl object-cover shadow-lg border-2 border-white"
                />
                <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white shadow-md" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-0.5">
                {selectedInterviewer.name}
              </h3>
              <p className="text-[#E8960A] font-bold text-[10px] uppercase tracking-wider mb-1">
                {selectedInterviewer.role}
              </p>
              <p className="text-gray-500 text-xs mb-4">
                {selectedInterviewer.company}
              </p>

              <div className="w-full space-y-2 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-[10px]">
                  <span className="text-gray-400 font-bold uppercase tracking-tighter">
                    Exp
                  </span>
                  <span className="font-bold text-gray-700">
                    {selectedInterviewer.experience}
                  </span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-gray-400 font-bold uppercase tracking-tighter">
                    Rating
                  </span>
                  <span className="font-bold text-gray-700 flex items-center gap-1">
                    <Star className="h-2.5 w-2.5 fill-yellow-400 text-yellow-400" />{" "}
                    {selectedInterviewer.rating}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side: Calendar & Times */}
            <div className="w-full lg:w-2/3 p-6 flex flex-col overflow-y-auto">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <CalendarIcon className="h-4 w-4 text-[#E8960A]" />
                </div>
                <div>
                  <h4 className="text-md font-bold text-gray-900">
                    Schedule Interview
                  </h4>
                  <p className="text-[10px] text-gray-400">
                    Select date and slot.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Calendar */}
                <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-xs text-gray-800">
                      {months[currentMonth]} {currentYear}
                    </span>
                    <div className="flex gap-1">
                      <button
                        onClick={() =>
                          setCurrentMonth((prev) =>
                            prev === 0 ? 11 : prev - 1,
                          )
                        }
                        className="p-1 hover:bg-gray-100 rounded-md"
                      >
                        <ChevronLeft className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() =>
                          setCurrentMonth((prev) =>
                            prev === 11 ? 0 : prev + 1,
                          )
                        }
                        className="p-1 hover:bg-gray-100 rounded-md"
                      >
                        <ChevronRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-1 mb-1.5">
                    {days.map((d) => (
                      <div
                        key={d}
                        className="text-[9px] font-bold text-gray-300 text-center uppercase"
                      >
                        {d[0]}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((day, idx) => (
                      <button
                        key={idx}
                        disabled={!day}
                        onClick={() => setSelectedDate(day)}
                        className={`h-7 w-full flex items-center justify-center rounded-md text-[10px] font-bold transition-all ${
                          !day
                            ? "bg-transparent cursor-default"
                            : selectedDate === day
                              ? "bg-[#FFD000] text-black shadow-sm"
                              : "hover:bg-gray-50 text-gray-600"
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Slots */}
                <div className="space-y-1.5">
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                    Available Slots
                  </p>
                  {timeSlots.map((time, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedTime(time)}
                      className={`w-full p-2.5 rounded-lg text-left font-bold text-[10px] transition-all border flex items-center justify-between group ${
                        selectedTime === time
                          ? "bg-gray-900 text-white border-gray-900"
                          : "bg-white text-gray-600 border-gray-100 hover:border-gray-200"
                      }`}
                    >
                      {time}
                      {selectedTime === time && (
                        <CheckCircle2 className="h-3 w-3 text-[#FFD000]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-50 text-center">
                <button
                  onClick={handleBookingConfirm}
                  disabled={!selectedTime || !selectedDate}
                  className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 ${
                    selectedTime && selectedDate
                      ? "bg-[#FFD000] text-black hover:opacity-95"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
                  }`}
                >
                  <CreditCard className="h-4 w-4" />
                  Confirm Booking
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
