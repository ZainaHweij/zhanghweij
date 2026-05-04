import { useState } from "react";

type FormData = {
  firstName: string;
  email: string;
  phone: string;
};

export default function Registration() {
  const [form, setForm] = useState<FormData>({
    firstName: "",
    email: "",
    phone: "",
  });

  const handleSubmit = async () => {
    const formUrl =
      "https://docs.google.com/forms/d/e/1FAIpQLSc-QrNrm4h5cSuXvD8J4ljaEQlvtJydh_VyIy7xdko1LZuqyg/formResponse";

    const data = new FormData();
    data.append("entry.1449250348", form.firstName);
    data.append("entry.1597530860", form.email);
    data.append("entry.1032938545", form.phone);

    await fetch(formUrl, {
      method: "POST",
      mode: "no-cors",
      body: data,
    });

    alert("Submitted!");
    setForm({ firstName: "", email: "", phone: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-2xl">

        <h2 className="text-2xl font-semibold mb-6">
          Step 1: Your Information
        </h2>

        <input
          type="text"
          placeholder="First Name"
          value={form.firstName}
          className="w-full mb-4 p-4 border rounded-xl"
          onChange={(e) =>
            setForm({ ...form, firstName: e.target.value })
          }
        />

        <div className="flex gap-4">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            className="w-1/2 p-4 border rounded-xl"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Phone"
            value={form.phone}
            className="w-1/2 p-4 border rounded-xl"
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
          />
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 bg-teal-600 text-white px-6 py-3 rounded-xl w-full"
        >
          Submit →
        </button>

      </div>
    </div>
  );
}