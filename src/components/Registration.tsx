import { useState } from "react";

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

  const isValidPhone = (phone: string) =>
    (phone.replace(/\D/g, "").length >= 10);

  const [step, setStep] = useState(1);
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

  const handleSubmit = async () => {
    const errs = validateStep3();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const formUrl =
      "https://docs.google.com/forms/d/e/1FAIpQLSc-QrNrm4h5cSuXvD8J4ljaEQlvtJydh_VyIy7xdko1LZuqyg/formResponse";

    const data = new URLSearchParams();
    data.append("entry.1449250348", form.firstName);
    data.append("entry.1597530860", form.email);
    data.append("entry.1032938545", form.phone);
    data.append("entry.1792812930", form.role);
    data.append("entry.672793834", form.helpWith.join(", "));
    if (form.otherHelp) data.append("entry.672793834", form.otherHelp);
    data.append("entry.1415336900", form.contactMethod);
    data.append("entry.200915716", form.bestTime);
    data.append("entry.1618686886", form.notes);

    await fetch(formUrl, { method: "POST", mode: "no-cors", body: data });

    alert("Submitted!");
    setStep(1);
    setErrors({});
  };

  const emailErr = form.email !== "" && !isValidEmail(form.email);
  const phoneErr = form.phone !== "" && !isValidPhone(form.phone);
  const errMsg = "text-xs text-red-500 mt-0.5 mb-2";
  const inputBase =
    "w-full p-4 border rounded-xl transition focus:outline-none";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-2xl">

        {/* STEP INDICATOR */}
        <div className="mb-6 flex justify-between">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex flex-col items-center w-full">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition
                  ${step >= num ? "bg-teal-600 text-white" : "bg-gray-200 text-gray-500"}
                  ${step === num ? "ring-4 ring-teal-200" : ""}`}
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
              className={`${inputBase} mb-3 focus:ring-2 focus:ring-teal-200`}
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
              className={`${inputBase} ${
                emailErr
                  ? "border-red-500 focus:ring-2 focus:ring-red-200"
                  : "focus:ring-2 focus:ring-teal-200"
              }`}
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
              className={`${inputBase} ${
                phoneErr
                  ? "border-red-500 focus:ring-2 focus:ring-red-200"
                  : "focus:ring-2 focus:ring-teal-200"
              }`}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            {phoneErr ? (
              <p className={errMsg}>Please enter a valid phone number.</p>
            ) : (
              <div className="mb-3" />
            )}

            <button
              onClick={() => { if (isStep1Valid()) setStep(2); }}
              disabled={!isStep1Valid()}
              className={`w-full py-3 rounded-xl font-medium transition mt-1
                ${!isStep1Valid()
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-teal-600 text-white hover:bg-teal-700"}`}
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
              {(["Student", "Parent", "Educator", "Other"] as const).map((role) => (
                <button
                  key={role}
                  onClick={() => setForm({ ...form, role })}
                  className={`p-4 rounded-xl border text-sm font-medium transition
                    ${form.role === role
                      ? "bg-teal-600 text-white border-teal-600"
                      : "bg-white hover:border-teal-500"}`}
                >
                  {role}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="w-1/2 bg-gray-200 py-3 rounded-xl font-medium"
              >
                Back
              </button>
              <button
                onClick={() => { if (isStep2Valid()) setStep(3); }}
                disabled={!isStep2Valid()}
                className={`w-1/2 py-3 rounded-xl font-medium transition
                  ${!isStep2Valid()
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-teal-600 text-white hover:bg-teal-700"}`}
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
              {([
                "College Applications",
                "Essay Help",
                "Choosing Colleges",
                "Choosing a Major",
                "Extracurricular Planning",
                "SAT Tutoring",
                "Academic Counseling",
                "Interview Prep",
                "Other",
              ] as const).map((item) => (
                <button
                  key={item}
                  onClick={() => toggleHelpWith(item)}
                  className={`p-3 rounded-xl border text-xs font-medium transition
                    ${form.helpWith.includes(item)
                      ? "bg-teal-600 text-white border-teal-600"
                      : "bg-white hover:border-teal-500"}`}
                >
                  {item}
                </button>
              ))}
            </div>
            {errors.helpWith && <p className={errMsg}>{errors.helpWith}</p>}

            {form.helpWith.includes("Other") && (
              <input
                className={`${inputBase} mb-4 focus:ring-2 focus:ring-teal-200`}
                placeholder="Please specify..."
                value={form.otherHelp}
                onChange={(e) => setForm({ ...form, otherHelp: e.target.value })}
              />
            )}

            <p className="text-sm font-medium text-gray-700 mb-2 mt-2">
              Preferred method of contact <span className="text-red-500">*</span>
            </p>
            <div className="grid grid-cols-3 gap-2 mb-1">
              {(["Phone Call", "Text Message", "Email"] as const).map((method) => (
                <button
                  key={method}
                  onClick={() => {
                    setErrors((prev) => ({ ...prev, contactMethod: undefined }));
                    setForm({ ...form, contactMethod: method });
                  }}
                  className={`p-2 rounded-xl border text-xs font-medium transition
                    ${form.contactMethod === method
                      ? "bg-teal-600 text-white border-teal-600"
                      : "bg-white hover:border-teal-500"}`}
                >
                  {method}
                </button>
              ))}
            </div>
            {errors.contactMethod && (
              <p className={errMsg}>{errors.contactMethod}</p>
            )}

            <p className="text-sm font-medium text-gray-700 mb-2 mt-3">
              Best time to reach you <span className="text-red-500">*</span>
            </p>
            <input
              className={`${inputBase} mb-1 focus:ring-2 focus:ring-teal-200`}
              placeholder="e.g. Weekdays after 5pm PST"
              value={form.bestTime}
              onChange={(e) => setForm({ ...form, bestTime: e.target.value })}
            />
            {errors.bestTime && <p className={errMsg}>{errors.bestTime}</p>}

            <p className="text-sm font-medium text-gray-700 mb-2 mt-3">
              Anything else I should know <span className="text-red-500">*</span>
            </p>
            <textarea
              className="w-full p-4 border rounded-xl h-28 mb-1 focus:outline-none focus:ring-2 focus:ring-teal-200 transition"
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
                disabled={!isStep3Valid()}
                className={`w-1/2 py-3 rounded-xl font-medium transition
                  ${!isStep3Valid()
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-teal-600 text-white hover:bg-teal-700"}`}
              >
                Submit →
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}