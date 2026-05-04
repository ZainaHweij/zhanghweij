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

export default function Registration() {
  const [step, setStep] = useState(1);

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

  const toggleHelpWith = (value: string) => {
    setForm((prev) => ({
      ...prev,
      helpWith: prev.helpWith.includes(value)
        ? prev.helpWith.filter((v) => v !== value)
        : [...prev.helpWith, value],
    }));
  };

  const handleSubmit = async () => {
    const formUrl =
      "https://docs.google.com/forms/d/e/1FAIpQLSc-QrNrm4h5cSuXvD8J4ljaEQlvtJydh_VyIy7xdko1LZuqyg/formResponse";

    const data = new URLSearchParams();

    // STEP 1
    data.append("entry.1449250348", form.firstName);
    data.append("entry.1597530860", form.email);
    data.append("entry.1032938545", form.phone);

    // STEP 2
    data.append("entry.1792812930", form.role);

    // STEP 3 - HELP
    data.append("entry.672793834", form.helpWith.join(", "));
    if (form.otherHelp) {
      data.append("entry.672793834", form.otherHelp);
    }

    // CONTACT METHOD (NO "OTHER")
    data.append("entry.1415336900", form.contactMethod);

    // EXTRA INFO
    data.append("entry.200915716", form.bestTime);
    data.append("entry.1618686886", form.notes);

    await fetch(formUrl, {
      method: "POST",
      mode: "no-cors",
      body: data,
    });

    alert("Submitted!");
    setStep(1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-2xl">

        {/* STEP INDICATOR */}
        <div className="mb-6 flex justify-between">
          {[1, 2, 3].map((num) => {
            const active = step >= num;
            const current = step === num;

            return (
              <div key={num} className="flex flex-col items-center w-full">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition
                    ${
                      active
                        ? "bg-teal-600 text-white"
                        : "bg-gray-200 text-gray-500"
                    }
                    ${current ? "ring-4 ring-teal-200" : ""}
                  `}
                >
                  {num}
                </div>
              </div>
            );
          })}
        </div>

        {/* HEADER */}
        <div className="mb-6 text-left">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Step {step}
          </h1>

          <h2 className="text-xl font-medium text-gray-700 mt-1">
            {step === 1 && "Your Information"}
            {step === 2 && "About You"}
            {step === 3 && "How I Can Help You"}
          </h2>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <input
              placeholder="First Name"
              className="w-full mb-3 p-4 border rounded-xl"
              value={form.firstName}
              onChange={(e) =>
                setForm({ ...form, firstName: e.target.value })
              }
            />

            <input
              placeholder="Email"
              className="w-full mb-3 p-4 border rounded-xl"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <input
              placeholder="Phone"
              className="w-full mb-3 p-4 border rounded-xl"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />

            <button
              onClick={() => setStep(2)}
              className="bg-teal-600 text-white w-full py-3 rounded-xl"
            >
              Next →
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {["Student", "Parent", "Educator", "Other"].map((role) => (
                <button
                  key={role}
                  onClick={() => setForm({ ...form, role })}
                  className={`p-4 rounded-xl border text-sm font-medium transition
                    ${
                      form.role === role
                        ? "bg-teal-600 text-white border-teal-600"
                        : "bg-white hover:border-teal-500"
                    }`}
                >
                  {role}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="w-1/2 bg-gray-200 py-3 rounded-xl"
              >
                Back
              </button>

              <button
                onClick={() => setStep(3)}
                className="w-1/2 bg-teal-600 text-white py-3 rounded-xl"
              >
                Next →
              </button>
            </div>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            {/* HELP OPTIONS */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {[
                "College Applications",
                "Essay Help",
                "Choosing Colleges",
                "Choosing a Major",
                "Extracurricular Planning",
                "SAT Tutoring",
                "Academic Counseling",
                "Interview Prep",
                "Other",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => toggleHelpWith(item)}
                  className={`p-3 rounded-xl border text-xs font-medium transition
                    ${
                      form.helpWith.includes(item)
                        ? "bg-teal-600 text-white border-teal-600"
                        : "bg-white hover:border-teal-500"
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* OTHER HELP INPUT */}
            {form.helpWith.includes("Other") && (
              <input
                className="w-full p-3 border rounded-xl mb-4"
                placeholder="Please specify..."
                value={form.otherHelp}
                onChange={(e) =>
                  setForm({ ...form, otherHelp: e.target.value })
                }
              />
            )}

            {/* LABEL */}
            <p className="text-sm font-medium text-gray-700 mb-2">
              Preferred method of contact
            </p>

            {/* CONTACT METHODS */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {["Phone Call", "Text Message", "Email"].map((method) => (
                <button
                  key={method}
                  onClick={() =>
                    setForm({ ...form, contactMethod: method })
                  }
                  className={`p-2 rounded-xl border text-xs font-medium transition
                    ${
                      form.contactMethod === method
                        ? "bg-teal-600 text-white border-teal-600"
                        : "bg-white hover:border-teal-500"
                    }`}
                >
                  {method}
                </button>
              ))}
            </div>

            {/* BEST TIME */}
            <p className="text-sm font-medium text-gray-700 mb-2">
              Best time to reach you
            </p>

            <input
              className="w-full p-4 border rounded-xl mb-4"
              placeholder="e.g. Weekdays after 5pm PST"
              value={form.bestTime}
              onChange={(e) =>
                setForm({ ...form, bestTime: e.target.value })
              }
            />

            {/* NOTES */}
            <p className="text-sm font-medium text-gray-700 mb-2">
              Anything else I should know
            </p>

            <textarea
              className="w-full p-4 border rounded-xl h-28 mb-4"
              placeholder="Tell me more about how I can help you..."
              value={form.notes}
              onChange={(e) =>
                setForm({ ...form, notes: e.target.value })
              }
            />

            {/* BUTTONS */}
            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="w-1/2 bg-gray-200 py-3 rounded-xl"
              >
                Back
              </button>

              <button
                onClick={handleSubmit}
                className="w-1/2 bg-teal-600 text-white py-3 rounded-xl"
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