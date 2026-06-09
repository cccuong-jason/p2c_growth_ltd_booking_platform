"use client";

import { useMemo, useState, useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Accessibility,
  ArrowLeft,
  ArrowRight,
  Brain,
  BriefcaseBusiness,
  Check,
  Dumbbell,
  HeartPulse,
  Home,
  Loader2,
  MapPin,
  ShieldCheck,
  Stethoscope,
  Activity,
  UserCheck,
  User,
  Users,
  Mail,
  Phone,
  Calendar,
  Languages,
  Info,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Clock,
  X,
  Hash,
  AlertCircle
} from "lucide-react";

import { submitBooking, type ActionState } from "@/lib/actions";
import { medicalLegalReferralTypes, serviceCategories, type ServiceCategory } from "@/lib/booking";
import { cn } from "@/lib/utils";
import { BentoCard } from "@/components/ui/bento-card";

const initialState: ActionState = { ok: false, message: "" };

const serviceIcons = {
  elderly: Accessibility,
  neurological: Brain,
  post_surgery: HeartPulse,
  sports_gym: Dumbbell,
  occupational: BriefcaseBusiness,
  medico_legal: Stethoscope
};

const COUNTRY_CODES = [
  { code: "+44", label: "UK (+44)", flag: "🇬🇧" },
  { code: "+84", label: "VN (+84)", flag: "🇻🇳" },
  { code: "+1", label: "US (+1)", flag: "🇺🇸" },
  { code: "+82", label: "KR (+82)", flag: "🇰🇷" },
  { code: "+852", label: "HK (+852)", flag: "🇭🇰" },
  { code: "+886", label: "TW (+886)", flag: "🇹🇼" },
  { code: "+65", label: "SG (+65)", flag: "🇸🇬" },
  { code: "+61", label: "AU (+61)", flag: "🇦🇺" },
];

// --- Validation Helpers ---
const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone: string) => /^\d{7,15}$/.test(phone);
const validateAge = (dob: string) => {
  if (!dob) return false;
  const birthDate = new Date(dob);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  return age >= 0 && age <= 150;
};

// --- Schedule Picker Component (with Time Popover) ---
function SchedulePicker({ value, onChange, error }: { value: string; onChange: (val: string) => void; error?: string }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showTimePopover, setShowTimePopover] = useState(false);
  const [tempSelectedDate, setTempSelectedDate] = useState<Date | null>(value ? new Date(value) : null);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);
  
  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();
  
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = daysInMonth(year, month);
  const startDay = firstDayOfMonth(year, month);
  
  const isPastMonth = (targetYear: number, targetMonth: number) => {
    const today = new Date();
    return targetYear < today.getFullYear() || (targetYear === today.getFullYear() && targetMonth < today.getMonth());
  };

  const prevMonth = () => {
    const prevDate = new Date(year, month - 1, 1);
    if (!isPastMonth(prevDate.getFullYear(), prevDate.getMonth())) {
      setCurrentDate(prevDate);
    }
  };
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const selectedDateStr = value ? new Date(value).toDateString() : null;

  // Clinic Hours:
  // Weekdays: 5pm-9pm (17:00-21:00)
  // Weekends: 8:30am-9pm (08:30-21:00)
  const timeSlots = [];
  if (tempSelectedDate) {
    const dayOfWeek = tempSelectedDate.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    if (isWeekend) {
      timeSlots.push("08:30");
      for (let i = 9; i <= 20; i++) {
        timeSlots.push(`${i < 10 ? '0' + i : i}:00`);
        timeSlots.push(`${i < 10 ? '0' + i : i}:30`);
      }
      timeSlots.push("21:00");
    } else {
      for (let i = 17; i <= 20; i++) {
        timeSlots.push(`${i}:00`);
        timeSlots.push(`${i}:30`);
      }
      timeSlots.push("21:00");
    }
  }

  const handleDayClick = (date: Date) => {
    setTempSelectedDate(date);
    setShowTimePopover(true);
  };

  const handleTimeSelect = (time: string) => {
    if (tempSelectedDate) {
      const [hours, minutes] = time.split(':').map(Number);
      const newDate = new Date(tempSelectedDate);
      newDate.setHours(hours, minutes, 0, 0);
      onChange(newDate.toISOString());
      setShowTimePopover(false);
    }
  };

  if (!hasHydrated) return <div className="min-h-[400px] animate-pulse bg-slate-50 rounded-3xl" />;

  return (
    <div className="relative">
      <div className={cn("w-full bg-white rounded-3xl border p-6 shadow-sm transition-colors", error ? "border-rose-200 bg-rose-50/10" : "border-slate-100")}>
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-black text-ink">{monthNames[month]} {year}</h3>
          <div className="flex gap-2">
            <button 
              type="button" 
              onClick={prevMonth} 
              disabled={Boolean(isPastMonth(year, month - 1))}
              className="p-2 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors text-slate-600 disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button type="button" onClick={nextMonth} className="p-2 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors text-slate-600">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-2 mb-2">
          {weekDays.map(d => (
            <div key={d} className="text-center text-[10px] font-black uppercase tracking-widest text-slate-400 py-2">
              {d}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: startDay }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}
          {Array.from({ length: days }).map((_, i) => {
            const day = i + 1;
            const date = new Date(year, month, day, 12, 0, 0);
            const isSelected = selectedDateStr === date.toDateString();
            const isToday = new Date().toDateString() === date.toDateString();
            const isPast = date < new Date(new Date().setHours(0,0,0,0));

            return (
              <button
                key={day}
                type="button"
                disabled={Boolean(isPast)}
                onClick={() => handleDayClick(date)}
                className={cn(
                  "aspect-square rounded-xl text-sm font-bold transition-all flex flex-col items-center justify-center relative group",
                  isPast ? "text-slate-200 cursor-not-allowed" : 
                  isSelected ? "bg-ocean text-white shadow-lg shadow-blue-500/30 scale-105" : 
                  "bg-slate-50 text-ink hover:bg-ocean/10 hover:text-ocean"
                )}
              >
                {day < 10 ? `0${day}` : day}
                {isToday && !isSelected && <div className="absolute bottom-1.5 w-1 h-1 rounded-full bg-ocean" />}
                {isSelected && <div className="absolute bottom-1.5 w-3 h-0.5 rounded-full bg-white/50" />}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {showTimePopover && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-white/60 backdrop-blur-sm rounded-3xl"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 10 }}
              className="w-full max-w-sm bg-white border border-slate-200 shadow-2xl rounded-[2rem] p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                   <p className="text-[10px] font-black text-ocean uppercase tracking-widest mb-1">Select Time</p>
                   <h4 className="text-sm font-bold text-ink">{tempSelectedDate?.toDateString()}</h4>
                </div>
                <button 
                  type="button" 
                  onClick={() => setShowTimePopover(false)}
                  className="h-8 w-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map(time => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => handleTimeSelect(time)}
                    className="py-2.5 rounded-xl text-xs font-bold bg-slate-50 text-ink border border-slate-100 hover:border-ocean/30 hover:bg-ocean/5 hover:text-ocean transition-all"
                  >
                    {time}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={cn("mt-6 flex items-center gap-3 p-4 rounded-2xl transition-colors", error ? "bg-rose-50 border border-rose-100" : "bg-blue-50/50 border border-blue-100")}>
         {error ? <AlertCircle className="h-4 w-4 text-rose-500" /> : <Clock className="h-4 w-4 text-ocean" />}
         <p className={cn("text-xs font-medium", error ? "text-rose-600" : "text-slate-600")}>
           {error ? error : value ? (
             <>Selected: <span className="font-bold text-ink">{new Date(value).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}</span></>
           ) : (
             "Please select a date on the calendar."
           )}
         </p>
      </div>
    </div>
  );
}

// --- Form Components ---
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      className="inline-flex h-12 w-full md:w-auto items-center justify-center gap-2 rounded-xl bg-ocean px-8 text-sm font-black text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-600 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none" 
      disabled={Boolean(pending)}
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Check className="h-4 w-4" aria-hidden />}
      Confirm & Submit
    </button>
  );
}

function InputWithIcon({ icon: Icon, label, error, ...props }: any) {
  return (
    <label className="block">
      <span className="block text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-2">{label}</span>
      <div className="relative group">
        <div className={cn("absolute left-4 top-1/2 -translate-y-1/2 transition-colors", error ? "text-rose-400" : "text-slate-400 group-focus-within:text-ocean")}>
          <Icon className="h-4 w-4" aria-hidden />
        </div>
        <input 
          className={cn(
            "w-full rounded-xl border pl-11 pr-4 py-3 text-sm text-ink placeholder-slate-400 transition-all shadow-sm outline-none",
            error 
              ? "border-rose-200 bg-rose-50/30 focus:border-rose-400 focus:ring-4 focus:ring-rose-500/10" 
              : "border-slate-200 bg-white focus:border-ocean focus:ring-4 focus:ring-ocean/10"
          )} 
          {...props} 
        />
      </div>
      {error && (
        <p className="mt-1.5 text-[10px] font-bold text-rose-500 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}
    </label>
  );
}

// --- Main Wizard Component ---
export function BookingWizard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [service, setService] = useState<ServiceCategory>(serviceCategories[0].id);
  const [medicalLegalReferralType, setMedicalLegalReferralType] = useState("");
  const [visitType, setVisitType] = useState<"clinic" | "home">("clinic");
  const [bookingDate, setBookingDate] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("en");
  const [countryCode, setCountryCode] = useState("+44");
  const [isBookingForSelf, setIsBookingForSelf] = useState(true);
  const [patientData, setPatientData] = useState({
    patientName: "",
    customerName: "",
    relationshipToPatient: "",
    patientPhone: "",
    patientEmail: "",
    dob: ""
  });
  const [addressData, setAddressData] = useState({
    ukPostcode: "",
    addressDetails: ""
  });
  
  // Validation State
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [state, action] = useActionState(submitBooking, initialState);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [step]);

  const steps = [
    { label: "SERVICE", icon: Activity, desc: "Area of support" },
    { label: "DETAILS", icon: UserCheck, desc: "Patient info" },
    { label: "SCHEDULE", icon: Clock, desc: "Select date" },
    { label: "CONFIRM", icon: ShieldCheck, desc: "Review consent" }
  ];

  const progress = ((step + 1) / steps.length) * 100;
  const isSuccess = state.ok;
  
  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};
    
    if (currentStep === 0) {
      if (service === "medico_legal" && !medicalLegalReferralType) {
        newErrors.medicalLegalReferralType = "Please select a referral reason.";
      }
    }
    
    if (currentStep === 1) {
      if (!patientData.patientName.trim()) newErrors.patientName = "Patient name is required.";
      
      if (!isBookingForSelf) {
        if (!patientData.customerName.trim()) newErrors.customerName = "Your name is required.";
        if (!patientData.relationshipToPatient.trim()) newErrors.relationshipToPatient = "Relationship is required.";
      }

      if (!patientData.patientEmail.trim()) {
        newErrors.patientEmail = "Email address is required.";
      } else if (!validateEmail(patientData.patientEmail)) {
        newErrors.patientEmail = "Please enter a valid email address.";
      }
      if (!patientData.patientPhone.trim()) {
        newErrors.patientPhone = "Phone number is required.";
      } else if (!validatePhone(patientData.patientPhone)) {
        newErrors.patientPhone = "Enter 7-15 digits only.";
      }
      if (!patientData.dob) {
        newErrors.dob = "Date of birth is required.";
      } else if (!validateAge(patientData.dob)) {
        newErrors.dob = "Max age is 150 years.";
      }

      if (visitType === "home") {
        if (!addressData.ukPostcode.trim()) newErrors.ukPostcode = "Postcode is required.";
        if (!addressData.addressDetails.trim()) newErrors.addressDetails = "Address is required.";
      }
    }

    if (currentStep === 2) {
      if (!bookingDate || !bookingDate.includes('T')) {
        newErrors.bookingDate = "Please select a date and time slot.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  if (!hasHydrated) return null;

  return (
    <div ref={containerRef} className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-start scroll-mt-32">
      
      {/* Sidebar Progress */}
      <aside className="w-full lg:w-[280px] shrink-0 space-y-6 lg:sticky lg:top-32">
        <BentoCard className="p-6 md:p-8 bg-white border-slate-100 shadow-sm overflow-visible">
          <div className="hidden lg:flex flex-col gap-10 relative">
            <div className="absolute left-[23px] top-6 bottom-6 w-0.5 bg-slate-100" />
            <div 
              className="absolute left-[23px] top-6 w-0.5 bg-ocean transition-all duration-500 origin-top" 
              style={{ height: `${isSuccess ? 100 : (step / (steps.length - 1)) * 100}%` }} 
            />

            {steps.map((s, i) => {
              const Icon = s.icon;
              const isCompleted = isSuccess || i < step;
              const isActive = !isSuccess && i === step;

              return (
                <div key={i} className="flex items-center gap-6 group relative">
                  <button
                    type="button"
                    onClick={() => i < step && setStep(i)}
                    disabled={Boolean(i > step)}
                    className={cn(
                      "w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 shadow-sm z-10",
                      isCompleted ? "bg-ocean border-ocean text-white" : 
                      isActive ? "bg-white border-ocean text-ocean ring-4 ring-ocean/10" : 
                      "bg-white border-slate-100 text-slate-300"
                    )}
                  >
                    {isCompleted ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                  </button>
                  <div className="flex flex-col">
                    <span className={cn(
                      "text-[10px] font-black tracking-widest uppercase",
                      isActive ? "text-ocean" : isCompleted ? "text-ocean opacity-60" : "text-slate-400"
                    )}>
                      {s.label}
                    </span>
                    <span className={cn(
                      "text-xs font-bold mt-0.5",
                      isActive ? "text-ink" : "text-slate-400"
                    )}>
                      {s.desc}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile View Progress */}
          <div className="lg:hidden flex flex-col gap-4">
             <div className="flex items-center justify-between">
                <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                  {isSuccess ? "Complete" : `Step ${step + 1} of ${steps.length}`}
                </span>
                <span className="text-sm font-black text-ink">{isSuccess ? 100 : Math.round(progress)}% Complete</span>
             </div>
             <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${isSuccess ? 100 : progress}%` }}
                  className="h-full bg-ocean"
                />
             </div>
          </div>
        </BentoCard>

        <BentoCard className="hidden lg:block p-6 bg-porcelain border-slate-100">
           <div className="flex items-center gap-3 text-ocean mb-3">
              <Info className="h-4 w-4" />
              <span className="text-[10px] font-black tracking-widest uppercase">Need help?</span>
           </div>
           <p className="text-xs font-medium text-slate-500 leading-relaxed">
             Our team is available Mon-Fri, 9am - 5pm to assist with your booking request.
           </p>
           <a href="tel:+442012345678" className="inline-block mt-4 text-xs font-bold text-ink hover:text-ocean transition-colors">+44 (0) 20 1234 5678</a>
        </BentoCard>
      </aside>

      {/* Main Content Card */}
      <div className="flex-1 w-full space-y-6">
        <BentoCard className={cn("p-0 shadow-soft-xl border-slate-200 bg-white relative overflow-hidden", isSuccess ? "min-h-[500px] flex items-center justify-center" : "")}>
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-12 text-center flex flex-col items-center justify-center w-full"
              >
                <div className="relative flex items-center justify-center h-40 w-40 mb-6">
                  {/* Concentric rings */}
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full bg-blue-50"
                  />
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 0.75, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                    className="absolute inset-0 rounded-full bg-blue-100"
                  />
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.3 }}
                    className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-ocean shadow-xl shadow-blue-500/30"
                  >
                    <Check className="h-10 w-10 text-white" strokeWidth={3} />
                  </motion.div>
                </div>
                
                <motion.h2 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                  className="text-3xl md:text-4xl font-extrabold text-ink tracking-tight mb-4 display-heading"
                >
                  Request Received!
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                  className="text-lg font-medium text-slate-500 max-w-md mx-auto leading-relaxed"
                >
                  Your request has been successfully recorded and a confirmation email has been sent. Our team will review the details and coordinate your booking arrangement shortly.
                </motion.p>
              </motion.div>
            ) : (
              <motion.div key="form" exit={{ opacity: 0 }} className="flex flex-col h-full w-full">
                <div className="p-8 md:p-10 border-b border-slate-100 bg-slate-50/30">
                  <AnimatePresence mode="wait">
                      {step === 0 && (
                        <motion.div key="t0" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}>
                          <h2 className="text-2xl md:text-3xl font-extrabold text-ink tracking-tight">Choose support area</h2>
                          <p className="mt-2 text-sm md:text-base font-medium text-slate-500">Select the closest category for your coordination request.</p>
                        </motion.div>
                      )}
                      {step === 1 && (
                        <motion.div key="t1" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}>
                          <h2 className="text-2xl md:text-3xl font-extrabold text-ink tracking-tight">Patient details</h2>
                          <p className="mt-2 text-sm md:text-base font-medium text-slate-500">Tell us a bit about who you are and what you need.</p>
                        </motion.div>
                      )}
                      {step === 2 && (
                        <motion.div key="t2" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}>
                          <h2 className="text-2xl md:text-3xl font-extrabold text-ink tracking-tight">Schedule Visit</h2>
                          <p className="mt-2 text-sm md:text-base font-medium text-slate-500">Pick a preferred date and time for your coordination.</p>
                        </motion.div>
                      )}
                      {step === 3 && (
                        <motion.div key="t3" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}>
                          <h2 className="text-2xl md:text-3xl font-extrabold text-ink tracking-tight">Review & Confirm</h2>
                          <p className="mt-2 text-sm md:text-base font-medium text-slate-500">Make sure everything looks correct before submitting.</p>
                        </motion.div>
                      )}
                  </AnimatePresence>
                </div>

                <form action={action} className="p-8 md:p-10">
                  {/* Persisted Hidden Inputs */}
                  <input type="hidden" name="serviceCategory" value={service} />
                  <input type="hidden" name="medicalLegalReferralType" value={medicalLegalReferralType} />
                  <input type="hidden" name="visitType" value={visitType} />
                  <input type="hidden" name="bookingDate" value={bookingDate} />
                  <input type="hidden" name="patientName" value={patientData.patientName} />
                  <input type="hidden" name="customerName" value={patientData.customerName} />
                  <input type="hidden" name="relationshipToPatient" value={patientData.relationshipToPatient} />
                  <input type="hidden" name="countryCode" value={countryCode} />
                  <input type="hidden" name="patientPhone" value={patientData.patientPhone} />
                  <input type="hidden" name="patientEmail" value={patientData.patientEmail} />
                  <input type="hidden" name="dob" value={patientData.dob} />
                  <input type="hidden" name="preferredLanguage" value={preferredLanguage} />
                  <input type="hidden" name="ukPostcode" value={addressData.ukPostcode} />
                  <input type="hidden" name="addressDetails" value={addressData.addressDetails} />

                  <div className="min-h-[300px]">
                    <AnimatePresence mode="wait">
                      {step === 0 && (
                        <motion.div
                          key="step0"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-6"
                        >
                          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                            {serviceCategories.map((item) => {
                              const Icon = serviceIcons[item.id];
                              const isSelected = service === item.id;

                              return (
                                <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              setService(item.id);
                              if (item.id !== "medico_legal") setMedicalLegalReferralType("");
                              setErrors({});
                            }}
                            className={cn(
                              "group rounded-2xl border p-4 text-left transition-all relative overflow-hidden",
                              isSelected
                                ? "border-ocean bg-ocean/5 shadow-md ring-1 ring-ocean/20"
                                : "border-slate-200 bg-white hover:border-ocean/40"
                            )}
                          >
                            <div className="relative z-10">
                              <span className={cn(
                                "flex h-10 w-10 items-center justify-center rounded-xl transition-colors",
                                isSelected ? "bg-ocean text-white shadow-sm" : "bg-slate-100 text-slate-400 group-hover:bg-ocean/10 group-hover:text-ocean"
                              )}>
                                <Icon className="h-5 w-5" aria-hidden />
                              </span>
                              <span className={cn(
                                "mt-4 block text-xs font-bold leading-tight",
                                isSelected ? "text-ocean" : "text-ink"
                              )}>{item.title}</span>
                            </div>
                            {isSelected && (
                              <div className="absolute top-2 right-2 text-ocean">
                                 <Check className="h-4 w-4" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                    {service === "medico_legal" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="space-y-2 mt-4"
                      >
                        <label className="block">
                          <span className="block text-xs font-bold uppercase tracking-widest text-ocean mb-2">Referral reason</span>
                          <div className="relative group">
                            <select
                              className={cn(
                                "w-full rounded-xl border bg-white px-4 py-3 text-sm text-ink transition-all appearance-none outline-none",
                                errors.medicalLegalReferralType ? "border-rose-200 bg-rose-50/30 ring-rose-500/10" : "border-blue-200 focus:border-ocean focus:ring-4 focus:ring-ocean/10"
                              )}
                              required
                              value={medicalLegalReferralType}
                              onChange={(event) => {
                                setMedicalLegalReferralType(event.target.value);
                                setErrors({});
                              }}
                            >
                              <option value="" disabled>Select referral reason...</option>
                              {medicalLegalReferralTypes.map((type) => (
                                <option key={type.id} value={type.id}>{type.label}</option>
                              ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                               <ChevronDown className="h-4 w-4" />
                            </div>
                          </div>
                        </label>
                        {errors.medicalLegalReferralType && (
                          <p className="text-[10px] font-bold text-rose-500 flex items-center gap-1.5 ml-1">
                             <AlertCircle className="h-3 w-3" />
                             {errors.medicalLegalReferralType}
                          </p>
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-8"
                  >
                    <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-6">
                       <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Reservation Contact</h4>
                       <div className="flex gap-4">
                          {[
                            { id: true, label: "Booking for myself" },
                            { id: false, label: "Booking for someone else" }
                          ].map((opt) => (
                            <button
                              key={String(opt.id)}
                              type="button"
                              onClick={() => {
                                setIsBookingForSelf(opt.id);
                                setErrors({});
                              }}
                              className={cn(
                                "flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all border",
                                isBookingForSelf === opt.id 
                                  ? "bg-white border-ocean text-ocean shadow-sm ring-4 ring-ocean/5" 
                                  : "bg-transparent border-slate-200 text-slate-500 hover:bg-white"
                              )}
                            >
                              {opt.label}
                            </button>
                          ))}
                       </div>

                       <AnimatePresence mode="wait">
                          {!isBookingForSelf && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="grid gap-4 md:grid-cols-2 mt-6 pt-6 border-t border-slate-200/60">
                                <InputWithIcon 
                                  icon={User} 
                                  label="Your Full Name" 
                                  placeholder="Contact person" 
                                  error={errors.customerName}
                                  value={patientData.customerName} 
                                  onChange={(e: any) => {
                                    setPatientData({ ...patientData, customerName: e.target.value });
                                    if (errors.customerName) setErrors({ ...errors, customerName: "" });
                                  }} 
                                />
                                <InputWithIcon 
                                  icon={Users} 
                                  label="Relationship to patient" 
                                  placeholder="e.g. Parent, Carer, Case Manager" 
                                  error={errors.relationshipToPatient}
                                  value={patientData.relationshipToPatient} 
                                  onChange={(e: any) => {
                                    setPatientData({ ...patientData, relationshipToPatient: e.target.value });
                                    if (errors.relationshipToPatient) setErrors({ ...errors, relationshipToPatient: "" });
                                  }} 
                                />
                              </div>
                            </motion.div>
                          )}
                       </AnimatePresence>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <InputWithIcon 
                        icon={User} 
                        label={isBookingForSelf ? "Full Name" : "Patient Full Name"}
                        placeholder={isBookingForSelf ? "Enter your full name" : "Enter patient's full name"} 
                        required 
                        error={errors.patientName}
                        value={patientData.patientName} 
                        onChange={(e: any) => {
                          setPatientData({ ...patientData, patientName: e.target.value });
                          if (errors.patientName) setErrors({ ...errors, patientName: "" });
                        }} 
                      />
                      <InputWithIcon 
                        icon={Calendar} 
                        label="Date of birth" 
                        type="date" 
                        required 
                        error={errors.dob}
                        value={patientData.dob} 
                        onChange={(e: any) => {
                          setPatientData({ ...patientData, dob: e.target.value });
                          if (errors.dob) setErrors({ ...errors, dob: "" });
                        }} 
                      />
                      
                      {/* Phone Input with Combined Country Code */}
                      <label className="block">
                        <span className="block text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-2">Phone number</span>
                        <div className={cn(
                          "flex h-11 w-full rounded-xl border bg-white transition-all shadow-sm overflow-hidden group",
                          errors.patientPhone 
                            ? "border-rose-200 focus-within:border-rose-400 focus-within:ring-4 focus-within:ring-rose-500/10" 
                            : "border-slate-200 focus-within:border-ocean focus-within:ring-4 focus-within:ring-ocean/10"
                        )}>
                          <div className="relative flex items-center bg-slate-50/50 border-r border-slate-100 px-3 hover:bg-slate-50 transition-colors">
                            <div className="flex items-center gap-1.5 cursor-pointer">
                               <span className="text-base">{COUNTRY_CODES.find(c => c.code === countryCode)?.flag}</span>
                               <ChevronDown className="h-3 w-3 text-slate-400 group-hover:text-ocean transition-colors" />
                            </div>
                            <select 
                              className="absolute inset-0 opacity-0 cursor-pointer w-full"
                              value={countryCode}
                              onChange={(e) => setCountryCode(e.target.value)}
                            >
                              {COUNTRY_CODES.map(c => (
                                <option key={c.code} value={c.code}>{c.flag} {c.label}</option>
                              ))}
                            </select>
                          </div>
                          
                          <div className="flex-1 relative flex items-center">
                             <div className={cn("absolute left-4 transition-colors", errors.patientPhone ? "text-rose-400" : "text-slate-400 group-focus-within:text-ocean")}>
                               <Phone className="h-4 w-4" aria-hidden />
                             </div>
                             <input 
                               className="w-full bg-transparent pl-11 pr-4 py-2 text-sm text-ink placeholder-slate-400 outline-none" 
                               type="tel" 
                               placeholder="7000 000000" 
                               required 
                               value={patientData.patientPhone} 
                               onChange={(e: any) => {
                                 setPatientData({ ...patientData, patientPhone: e.target.value.replace(/\D/g, '') });
                                 if (errors.patientPhone) setErrors({ ...errors, patientPhone: "" });
                               }} 
                             />
                          </div>
                        </div>
                        {errors.patientPhone && (
                          <p className="mt-1.5 text-[10px] font-bold text-rose-500 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.patientPhone}
                          </p>
                        )}
                      </label>

                      <InputWithIcon 
                        icon={Mail} 
                        label="Email address" 
                        type="email" 
                        placeholder="name@example.com" 
                        required 
                        error={errors.patientEmail}
                        value={patientData.patientEmail} 
                        onChange={(e: any) => {
                          setPatientData({ ...patientData, patientEmail: e.target.value });
                          if (errors.patientEmail) setErrors({ ...errors, patientEmail: "" });
                        }} 
                      />
                      <div className="relative group">
                        <span className="block text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-2">Preferred Language</span>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-ocean transition-colors pointer-events-none">
                            <Languages className="h-4 w-4" />
                          </div>
                          <select 
                            className="w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 py-3 text-sm text-ink transition-all focus:border-ocean focus:outline-none focus:ring-4 focus:ring-ocean/10 shadow-sm appearance-none font-bold" 
                            value={preferredLanguage}
                            onChange={(e) => setPreferredLanguage(e.target.value)}
                          >
                            <option value="en">English</option>
                            <option value="zh-Hant">Traditional Chinese</option>
                            <option value="zh-Hans">Simplified Chinese</option>
                            <option value="vi">Vietnamese</option>
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                             <ChevronDown className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100">
                      <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-4">Visit preference</h4>
                      <div className="grid gap-3 md:grid-cols-2">
                        <button
                          type="button"
                          onClick={() => {
                            setVisitType("clinic");
                            setErrors({});
                          }}
                          className={cn(
                            "flex items-center gap-4 rounded-2xl border p-4 text-left transition-all",
                            visitType === "clinic" ? "border-ocean bg-ocean/5 shadow-sm ring-1 ring-ocean/20" : "border-slate-200 bg-white hover:border-ocean/40"
                          )}
                        >
                          <span className={cn(
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                            visitType === "clinic" ? "bg-ocean text-white shadow-sm" : "bg-slate-100 text-slate-400"
                          )}>
                            <MapPin className="h-5 w-5" aria-hidden />
                          </span>
                          <div>
                            <span className={cn("block text-sm font-bold", visitType === "clinic" ? "text-ocean" : "text-ink")}>Clinic Visit</span>
                            <span className="block text-xs font-medium text-slate-500">In-person facilities</span>
                          </div>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setVisitType("home");
                            setErrors({});
                          }}
                          className={cn(
                            "flex items-center gap-4 rounded-2xl border p-4 text-left transition-all",
                            visitType === "home" ? "border-ocean bg-ocean/5 shadow-sm ring-1 ring-ocean/20" : "border-slate-200 bg-white hover:border-ocean/40"
                          )}
                        >
                          <span className={cn(
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                            visitType === "home" ? "bg-ocean text-white shadow-sm" : "bg-slate-100 text-slate-400"
                          )}>
                            <Home className="h-5 w-5" aria-hidden />
                          </span>
                          <div>
                            <span className={cn("block text-sm font-bold", visitType === "home" ? "text-ocean" : "text-ink")}>Home Visit</span>
                            <span className="block text-xs font-medium text-slate-500">At your location</span>
                          </div>
                        </button>
                      </div>
                    </div>

                    <AnimatePresence>
                      {visitType === "home" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 rounded-2xl border border-cyan-100 bg-cyan-50/30 p-5 space-y-5">
                            <InputWithIcon 
                              icon={MapPin} 
                              label="Postcode" 
                              placeholder="e.g. SW1A 1AA" 
                              required 
                              error={errors.ukPostcode}
                              value={addressData.ukPostcode}
                              onChange={(e: any) => {
                                setAddressData({ ...addressData, ukPostcode: e.target.value });
                                if (errors.ukPostcode) setErrors({ ...errors, ukPostcode: "" });
                              }}
                            />
                            <label className="block">
                              <span className="block text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-2">Address details</span>
                              <textarea 
                                className={cn(
                                  "w-full min-h-[80px] resize-none rounded-xl border px-4 py-3 text-sm text-ink placeholder-slate-400 transition-all shadow-sm outline-none",
                                  errors.addressDetails 
                                    ? "border-rose-200 bg-rose-50/30 focus:border-rose-400 focus:ring-4 focus:ring-rose-500/10" 
                                    : "border-slate-200 bg-white focus:border-ocean focus:ring-4 focus:ring-ocean/10"
                                )} 
                                placeholder="House number, street, city..." 
                                required 
                                value={addressData.addressDetails}
                                onChange={(e) => {
                                  setAddressData({ ...addressData, addressDetails: e.target.value });
                                  if (errors.addressDetails) setErrors({ ...errors, addressDetails: "" });
                                }}
                              />
                              {errors.addressDetails && (
                                <p className="mt-1.5 text-[10px] font-bold text-rose-500 flex items-center gap-1">
                                  <AlertCircle className="h-3 w-3" />
                                  {errors.addressDetails}
                                </p>
                              )}
                            </label>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div className="pt-2">
                      <SchedulePicker 
                        value={bookingDate} 
                        onChange={(val) => {
                          setBookingDate(val);
                          setErrors({});
                        }} 
                        error={errors.bookingDate}
                      />
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                     <div className="rounded-[1.5rem] border border-slate-100 bg-slate-50/50 p-6 space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                          <div className="flex items-center gap-3">
                             <div className="h-2 w-2 rounded-full bg-ocean animate-pulse" />
                             <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Final Review</span>
                          </div>
                          <span className="rounded-full bg-blue-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-ocean">Ready to Submit</span>
                        </div>
                        
                        <div className="grid gap-3">
                           {[
                             { label: "Category", value: serviceCategories.find(c => c.id === service)?.title, icon: Activity },
                             { label: isBookingForSelf ? "Patient" : "Booking For", value: isBookingForSelf ? patientData.patientName : `${patientData.patientName} (${patientData.relationshipToPatient})`, icon: User },
                             { label: "Phone", value: `${countryCode} ${patientData.patientPhone}`, icon: Phone },
                             { label: "Visit", value: visitType === "home" ? "Home Visit" : "Clinic Visit", icon: MapPin },
                             { label: "Schedule", value: bookingDate ? new Date(bookingDate).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' }) : "Not set", icon: Calendar }
                           ].map((item, idx) => (
                             <div key={idx} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-3 text-slate-500 font-medium">
                                   <item.icon className="h-4 w-4" />
                                   <span>{item.label}</span>
                                </div>
                                <span className="font-bold text-ink">{item.value}</span>
                             </div>
                           ))}
                        </div>
                     </div>

                     <div className="rounded-2xl border border-blue-50 bg-blue-50/30 p-5 flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm border border-blue-100 text-ocean">
                          <Info className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-ink">Almost there!</h4>
                          <p className="mt-1 text-xs font-medium leading-relaxed text-slate-500">
                            Your request details look great. Once you click &quot;Confirm & Submit&quot;, our coordination journey officially begins.
                          </p>
                        </div>
                     </div>

                    <div className="space-y-3">
                      {[
                        ["acknowledgeCoordinatorOnly", "I acknowledge P2C Growth is a booking and coordination platform."],
                        ["consentContact", "I consent to be contacted about this request."],
                        ["acknowledgeEmergencyAdvice", "I acknowledge emergencies require 999 or NHS care."]
                      ].map(([name, label]) => (
                        <label key={name} className="flex gap-4 rounded-xl border border-slate-100 bg-white p-4 text-sm font-semibold text-slate-600 transition hover:border-ocean/20 cursor-pointer shadow-sm">
                          <div className="pt-0.5">
                            <input name={name} type="checkbox" required className="h-5 w-5 rounded border-slate-300 text-ocean focus:ring-ocean" />
                          </div>
                          <span className="leading-tight">
                            {label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {state.message && !state.ok && (
              <div className="mt-6">
                <p className="rounded-xl p-4 text-sm font-semibold border border-rose-200 bg-rose-50 text-rose-700">
                  {state.message}
                </p>
              </div>
            )}

            <div className="mt-10 flex flex-col-reverse gap-3 md:flex-row md:items-center md:justify-between pt-6 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setStep((current) => Math.max(0, current - 1));
                  setErrors({});
                }}
                className="inline-flex h-12 w-full md:w-auto items-center justify-center gap-2 rounded-xl bg-white border border-slate-200 px-8 text-sm font-bold text-slate-600 shadow-sm transition-all hover:bg-slate-50 hover:text-ink active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
                disabled={Boolean(step === 0)}
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
                Back
              </button>
              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleContinue}
                  className="inline-flex h-12 w-full md:w-auto items-center justify-center gap-2 rounded-xl bg-ocean px-8 text-sm font-black text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-600 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
                >
                  Continue <ArrowRight className="h-4 w-4" aria-hidden />
                </button>
              ) : (
                <SubmitButton />
              )}
            </div>
          </form>
          </motion.div>
          )}
          </AnimatePresence>
        </BentoCard>
      </div>
    </div>
  );
}
