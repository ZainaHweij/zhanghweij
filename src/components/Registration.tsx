import { useState } from "react";
import emailjs from "@emailjs/browser";

// ─── EmailJS config ──────────────────────────────────────────────────────────
// 1. Sign up free at https://www.emailjs.com
// 2. Create a service (Gmail, Outlook, etc.) → copy the Service ID
// 3. Create an email template → copy the Template ID
//    In the template body use these variables:
//      {{to_email}}  {{first_name}}  {{role}}  {{help_with}}
//      {{contact_method}}  {{best_time}}  {{notes}}  {{phone}}
// 4. Go to Account → copy your Public Key
const EMAILJS_SERVICE_ID = "service_8oi6c3b";
const EMAILJS_TEMPLATE_ID = "template_hxh4ysg";
const EMAILJS_PUBLIC_KEY = "n74Cl2vNN3th6wT5D";
// ─────────────────────────────────────────────────────────────────────────────

const BRAND = "#2e2a79";
const BRAND_LIGHT = "#eeedf8";
const BRAND_HOVER = "#231f5e";
const BRAND_RING = "#b8b5e8";

type FormData = {
  firstName: string;
  email: string;
  phone: string;
  role: string;
  helpWith: string[];
  otherHelp: string;
  contactMethod: string;
  bestTime: string;
  notes: string;
};

type FormErrors = {
  helpWith?: string;
  contactMethod?: string;
  bestTime?: string;
  notes?: string;
};

export default function Registration() {
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Strip non-digits and require between 10 and 15 digits (ITU-T E.164)
  const isValidPhone = (phone: string) => {
    const digits = phone.replace(/\D/g, "").length;
    return digits >= 10 && digits <= 15;
  };

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const [form, setForm] = useState<FormData>({
    firstName: "",
    email: "",
    phone: "",
    role: "",
    helpWith: [],
    otherHelp: "",
    contactMethod: "",
    bestTime: "",
    notes: "",
  });

  const isStep1Valid = (): boolean =>
    form.firstName.trim().length > 0 &&
    isValidEmail(form.email) &&
    isValidPhone(form.phone);

  const isStep2Valid = (): boolean => form.role !== "";

  const isStep3Valid = (): boolean =>
    form.helpWith.length > 0 &&
    form.contactMethod !== "" &&
    form.bestTime.trim().length > 0 &&
    form.notes.trim().length > 0;

  const validateStep3 = (): FormErrors => {
    const errs: FormErrors = {};
    if (form.helpWith.length === 0)
      errs.helpWith = "Please select at least one option.";
    if (!form.contactMethod)
      errs.contactMethod = "Please select a contact method.";
    if (!form.bestTime.trim())
      errs.bestTime = "Please enter the best time to reach you.";
    if (!form.notes.trim())
      errs.notes = "Please tell us anything else we should know.";
    return errs;
  };

  const toggleHelpWith = (value: string) => {
    setErrors({});
    setForm((prev) => ({
      ...prev,
      helpWith: prev.helpWith.includes(value)
        ? prev.helpWith.filter((v) => v !== value)
        : [...prev.helpWith, value],
    }));
  };

  const helpSummary = () => {
    if (form.helpWith.includes("Other") && form.otherHelp) {
      return [
        ...form.helpWith.filter((h) => h !== "Other"),
        form.otherHelp,
      ].join(", ");
    }
    return form.helpWith.join(", ");
  };

  const handleSubmit = async () => {
    const errs = validateStep3();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);

    // 1. Google Forms submission
    try {
      const formUrl =
        "https://docs.google.com/forms/d/e/1FAIpQLSc-QrNrm4h5cSuXvD8J4ljaEQlvtJydh_VyIy7xdko1LZuqyg/formResponse";
      const data = new URLSearchParams();
      data.append("entry.1449250348", form.firstName);
      data.append("entry.1597530860", form.email);
      data.append("entry.1032938545", form.phone);
      data.append("entry.1792812930", form.role);
      data.append("entry.672793834", helpSummary());
      data.append("entry.1415336900", form.contactMethod);
      data.append("entry.200915716", form.bestTime);
      data.append("entry.1618686886", form.notes);
      await fetch(formUrl, { method: "POST", mode: "no-cors", body: data });
    } catch (_) {
      // no-cors always throws — safe to ignore
    }

    // 2. Confirmation email via EmailJS
    try {
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_email: form.email,
          first_name: form.firstName,
          phone: form.phone,
          role: form.role,
          help_with: helpSummary(),
          contact_method: form.contactMethod,
          best_time: form.bestTime,
          notes: form.notes,
        },
        EMAILJS_PUBLIC_KEY,
      );
      console.log("EmailJS success:", result.status, result.text);
    } catch (err: unknown) {
      const e = err as { status?: number; text?: string };
      console.error("EmailJS failed — status:", e?.status, "text:", e?.text);
      console.error("EmailJS raw:", err);
    }

    setSubmitting(false);
    setSubmitted(true);
  };

  const emailErr = form.email !== "" && !isValidEmail(form.email);
  const phoneErr = form.phone !== "" && !isValidPhone(form.phone);
  const errMsg = "text-xs text-red-500 mt-0.5 mb-2";
  const inputBase =
    "w-full p-4 border rounded-xl transition focus:outline-none";

  const primaryBtn = (active: boolean): React.CSSProperties => ({
    background: active ? BRAND : "#D1D5DB",
    color: active ? "#fff" : "#6B7280",
    cursor: active ? "pointer" : "not-allowed",
    transition: "background 0.2s",
  });

  const toggleBtn = (selected: boolean): React.CSSProperties => ({
    background: selected ? BRAND : "#fff",
    color: selected ? "#fff" : "#111827",
    border: selected ? `1.5px solid ${BRAND}` : "1px solid #E5E7EB",
    transition: "all 0.15s",
  });

  // ── Success screen ─────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-2xl text-center">
          <div
            className="mx-auto mb-6 flex items-center justify-center rounded-full"
            style={{ width: 80, height: 80, background: BRAND_LIGHT }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="20" fill={BRAND} />
              <path
                d="M12 20.5l6 6 10-12"
                stroke="#fff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900 mb-3">
            You're all set!
          </h1>
          <p className="text-gray-600 text-lg mb-2">
            Thanks, <span className="font-semibold">{form.firstName}</span>!
            We'll be in contact soon.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            A confirmation has been sent to{" "}
            <span className="font-medium" style={{ color: BRAND }}>
              {form.email}
            </span>
            .
          </p>

          {/* Response summary */}
          <div
            className="text-left rounded-xl p-5 mb-8 text-sm space-y-1"
            style={{ background: BRAND_LIGHT }}
          >
            <p className="font-semibold mb-3" style={{ color: BRAND }}>
              Your responses
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Name:</span> {form.firstName}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Email:</span> {form.email}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Phone:</span> {form.phone}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Role:</span> {form.role}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Help with:</span> {helpSummary()}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Contact via:</span>{" "}
              {form.contactMethod}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Best time:</span> {form.bestTime}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Notes:</span> {form.notes}
            </p>
          </div>

          <button
            className="py-3 px-8 rounded-xl font-medium text-white"
            style={{ background: BRAND }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = BRAND_HOVER)
            }
            onMouseLeave={(e) => (e.currentTarget.style.background = BRAND)}
            onClick={() => {
              setSubmitted(false);
              setStep(1);
              setErrors({});
              setForm({
                firstName: "",
                email: "",
                phone: "",
                role: "",
                helpWith: [],
                otherHelp: "",
                contactMethod: "",
                bestTime: "",
                notes: "",
              });
            }}
          >
            Submit another response
          </button>
        </div>
      </div>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex-col flex items-center justify-center mb-20">
      <div id="register" className="text-center mb-4 w-full max-w-2xl">
        <h2 className="text-6xl font-extrabold tracking-tight text-gray-900 mb-2">
          Register Now
        </h2>
        <p className="text-xl text-gray-500 mb-4">
          Fill out the form below to get started — it only takes a minute.
        </p>
      </div>
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-2xl">
        {/* STEP INDICATOR */}
        <div className="mb-6 flex justify-between">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex flex-col items-center w-full">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-semibold"
                style={{
                  background: step >= num ? BRAND : "#E5E7EB",
                  color: step >= num ? "#fff" : "#6B7280",
                  outline: step === num ? `4px solid ${BRAND_RING}` : "none",
                  outlineOffset: "2px",
                }}
              >
                {num}
              </div>
            </div>
          ))}
        </div>

        {/* HEADER */}
        <div className="mb-6 text-left">
          <h1 className="text-4xl font-extrabold text-gray-900">Step {step}</h1>
          <h2 className="text-xl font-medium text-gray-700 mt-1">
            {step === 1 && "Your Information"}
            {step === 2 && "About You"}
            {step === 3 && "How I Can Help You"}
          </h2>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <label className="mb-1 text-sm font-medium text-gray-700 block">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              className={`${inputBase} mb-3`}
              placeholder="Jane"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            />

            <label className="mb-1 text-sm font-medium text-gray-700 block">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="jane@example.com"
              className={`${inputBase} ${emailErr ? "border-red-500" : ""}`}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            {emailErr ? (
              <p className={errMsg}>Please enter a valid email address.</p>
            ) : (
              <div className="mb-3" />
            )}

            <label className="mb-1 text-sm font-medium text-gray-700 block">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              placeholder="(555) 123-4567"
              className={`${inputBase} ${phoneErr ? "border-red-500" : ""}`}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            {phoneErr ? (
              <p className={errMsg}>
                Please enter a valid phone number (10–15 digits).
              </p>
            ) : (
              <div className="mb-3" />
            )}

            <button
              onClick={() => {
                if (isStep1Valid()) setStep(2);
              }}
              disabled={!isStep1Valid()}
              className="w-full py-3 rounded-xl font-medium mt-1"
              style={primaryBtn(isStep1Valid())}
            >
              Next →
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <p className="text-sm font-medium text-gray-700 mb-3">
              What best describes you? <span className="text-red-500">*</span>
            </p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {(["Student", "Parent", "Educator", "Other"] as const).map(
                (role) => (
                  <button
                    key={role}
                    onClick={() => setForm({ ...form, role })}
                    className="p-4 rounded-xl text-sm font-medium"
                    style={toggleBtn(form.role === role)}
                  >
                    {role}
                  </button>
                ),
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="w-1/2 bg-gray-200 py-3 rounded-xl font-medium"
              >
                Back
              </button>
              <button
                onClick={() => {
                  if (isStep2Valid()) setStep(3);
                }}
                disabled={!isStep2Valid()}
                className="w-1/2 py-3 rounded-xl font-medium"
                style={primaryBtn(isStep2Valid())}
              >
                Next →
              </button>
            </div>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <p className="text-sm font-medium text-gray-700 mb-2">
              What can I help you with? <span className="text-red-500">*</span>
            </p>
            <div className="grid grid-cols-2 gap-2 mb-1">
              {(
                [
                  "College Applications",
                  "Essay Help",
                  "Choosing Colleges",
                  "Choosing a Major",
                  "Extracurricular Planning",
                  "SAT Tutoring",
                  "Academic Counseling",
                  "Interview Prep",
                  "Other",
                ] as const
              ).map((item) => (
                <button
                  key={item}
                  onClick={() => toggleHelpWith(item)}
                  className="p-3 rounded-xl text-xs font-medium"
                  style={toggleBtn(form.helpWith.includes(item))}
                >
                  {item}
                </button>
              ))}
            </div>
            {errors.helpWith && <p className={errMsg}>{errors.helpWith}</p>}

            {form.helpWith.includes("Other") && (
              <input
                className={`${inputBase} mb-4 mt-2`}
                placeholder="Please specify..."
                value={form.otherHelp}
                onChange={(e) =>
                  setForm({ ...form, otherHelp: e.target.value })
                }
              />
            )}

            <p className="text-sm font-medium text-gray-700 mb-2 mt-3">
              Preferred method of contact{" "}
              <span className="text-red-500">*</span>
            </p>
            <div className="flex gap-6">
              {(["Phone Call", "Text Message", "Email"] as const).map(
                (method) => (
                  <label
                    key={method}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="contactMethod"
                      value={method}
                      checked={form.contactMethod === method}
                      onChange={() => {
                        setErrors((prev) => ({
                          ...prev,
                          contactMethod: undefined,
                        }));
                        setForm({ ...form, contactMethod: method });
                      }}
                      className="w-4 h-4 accent-[#2e2a79]"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {method}
                    </span>
                  </label>
                ),
              )}
            </div>
            {errors.contactMethod && (
              <p className={errMsg}>{errors.contactMethod}</p>
            )}

            <p className="text-sm font-medium text-gray-700 mb-2 mt-3">
              Best time to reach you <span className="text-red-500">*</span>
            </p>
            <input
              className={`${inputBase} mb-1`}
              placeholder="e.g. Weekdays after 5pm PST"
              value={form.bestTime}
              onChange={(e) => setForm({ ...form, bestTime: e.target.value })}
            />
            {errors.bestTime && <p className={errMsg}>{errors.bestTime}</p>}

            <p className="text-sm font-medium text-gray-700 mb-2 mt-3">
              Anything else I should know{" "}
              <span className="text-red-500">*</span>
            </p>
            <textarea
              className="w-full p-4 border rounded-xl h-28 mb-1 focus:outline-none transition"
              placeholder="Tell me more about how I can help you..."
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
            {errors.notes && <p className={errMsg}>{errors.notes}</p>}

            <div className="flex gap-3 mt-3">
              <button
                onClick={() => setStep(2)}
                className="w-1/2 bg-gray-200 py-3 rounded-xl font-medium"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={!isStep3Valid() || submitting}
                className="w-1/2 py-3 rounded-xl font-medium"
                style={primaryBtn(isStep3Valid() && !submitting)}
              >
                {submitting ? "Submitting…" : "Submit →"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
