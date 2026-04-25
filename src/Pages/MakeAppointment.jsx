import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./appointments.css";

const STORAGE_KEY = "gbb_appointments_v1";

const CENTERS = [
  "Gondar Blood Bank — Main Center",
  "University of Gondar Hospital Branch",
  "Azezo Community Clinic",
  "Maraki Health Post",
  "Mobile Drive — Piazza",
];

const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Unknown"];

const DONATION_TYPES = [
  { id: "whole", label: "Whole Blood", duration: "45–60 min" },
  { id: "plasma", label: "Plasma (Apheresis)", duration: "60–90 min" },
  { id: "platelets", label: "Platelets (Apheresis)", duration: "90–120 min" },
  { id: "double-red", label: "Double Red Cells", duration: "60–80 min" },
];

const TIME_SLOTS = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30",
];

const STATUS_LABELS = {
  upcoming: "Confirmed",
  completed: "Completed",
  cancelled: "Cancelled",
};

const todayISO = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
};

const generateRef = () =>
  "GBB-" + Math.random().toString(36).slice(2, 7).toUpperCase() + "-" +
  String(Date.now()).slice(-4);

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  age: "",
  bloodType: "",
  center: CENTERS[0],
  donationType: "whole",
  date: "",
  time: "",
  notes: "",
  consent: false,
};

export default function MakeAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [confirmation, setConfirmation] = useState(null);
  const [step, setStep] = useState(1);

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setAppointments(JSON.parse(raw));
    } catch (e) {
      console.warn("Could not load appointments", e);
    }
  }, []);

  // Persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
    } catch (e) {
      console.warn("Could not save appointments", e);
    }
  }, [appointments]);

  // Auto-mark past appointments as completed
  useEffect(() => {
    const now = new Date();
    setAppointments((prev) =>
      prev.map((a) => {
        if (a.status === "upcoming") {
          const dt = new Date(`${a.date}T${a.time || "00:00"}`);
          if (dt < now) return { ...a, status: "completed" };
        }
        return a;
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateField = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validateStep = (s) => {
    const e = {};
    if (s === 1) {
      if (!form.fullName.trim() || form.fullName.trim().length < 2)
        e.fullName = "Please enter your full legal name.";
      if (!/^\S+@\S+\.\S+$/.test(form.email))
        e.email = "Enter a valid email address.";
      if (!/^[+\d\s()-]{7,}$/.test(form.phone))
        e.phone = "Enter a valid phone number.";
      const age = parseInt(form.age, 10);
      if (!age || age < 17 || age > 70)
        e.age = "Donors must be between 17 and 70 years old.";
    }
    if (s === 2) {
      if (!form.center) e.center = "Please select a donation center.";
      if (!form.donationType) e.donationType = "Select a donation type.";
    }
    if (s === 3) {
      if (!form.date) e.date = "Please select a date.";
      else if (form.date < todayISO()) e.date = "Date must be in the future.";
      if (!form.time) e.time = "Please select a time slot.";
      if (!form.consent) e.consent = "You must accept the eligibility declaration.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) setStep((s) => Math.min(3, s + 1));
  };
  const handleBack = () => setStep((s) => Math.max(1, s - 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    if (editingId) {
      setAppointments((prev) =>
        prev.map((a) =>
          a.id === editingId ? { ...a, ...form, updatedAt: new Date().toISOString() } : a
        )
      );
      const updated = appointments.find((a) => a.id === editingId);
      setConfirmation({ ...updated, ...form, mode: "updated" });
    } else {
      const ref = generateRef();
      const newAppt = {
        id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
        reference: ref,
        ...form,
        status: "upcoming",
        createdAt: new Date().toISOString(),
      };
      setAppointments((prev) => [newAppt, ...prev]);
      setConfirmation({ ...newAppt, mode: "created" });
    }

    setForm(initialForm);
    setEditingId(null);
    setStep(1);
  };

  const handleEdit = (appt) => {
    setForm({
      fullName: appt.fullName,
      email: appt.email,
      phone: appt.phone,
      age: appt.age,
      bloodType: appt.bloodType,
      center: appt.center,
      donationType: appt.donationType,
      date: appt.date,
      time: appt.time,
      notes: appt.notes || "",
      consent: true,
    });
    setEditingId(appt.id);
    setStep(1);
    setConfirmation(null);
    document.getElementById("appointment-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCancel = (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "cancelled" } : a))
    );
  };

  const handleDelete = (id) => {
    if (!window.confirm("Permanently remove this appointment record?")) return;
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  const handleReset = () => {
    setForm(initialForm);
    setErrors({});
    setEditingId(null);
    setStep(1);
  };

  const filtered = useMemo(() => {
    return appointments
      .filter((a) => (filter === "all" ? true : a.status === filter))
      .filter((a) => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return (
          a.fullName.toLowerCase().includes(q) ||
          a.reference.toLowerCase().includes(q) ||
          a.email.toLowerCase().includes(q) ||
          a.center.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time) * -1);
  }, [appointments, filter, search]);

  const stats = useMemo(() => {
    return {
      total: appointments.length,
      upcoming: appointments.filter((a) => a.status === "upcoming").length,
      completed: appointments.filter((a) => a.status === "completed").length,
      cancelled: appointments.filter((a) => a.status === "cancelled").length,
    };
  }, [appointments]);

  const formatDate = (d, t) => {
    if (!d) return "";
    const dt = new Date(`${d}T${t || "00:00"}`);
    return dt.toLocaleDateString("en-GB", {
      weekday: "long", day: "numeric", month: "long", year: "numeric",
    });
  };

  const donationTypeLabel = (id) =>
    DONATION_TYPES.find((t) => t.id === id)?.label || id;

  return (
    <div className="s-home">

      {/* Hero */}
      <header className="s-hero">
        <div className="s-container s-hero-inner">
          <div className="badge fade-in">
            <span className="dot"></span>
            <span className="badge-text">Donor Services</span>
          </div>
          <h1 className="s-h1">Schedule & Manage Your Donation <em>Appointment</em></h1>
          <p className="s-lead">
            Book a confidential appointment at one of our internationally accredited
            collection centers. Manage, reschedule, or cancel your visits at any
            time — all in one secure place.
          </p>
          <div className="appt-hero-stats">
            <div><strong>{stats.total}</strong><span>Total Records</span></div>
            <div><strong>{stats.upcoming}</strong><span>Upcoming</span></div>
            <div><strong>{stats.completed}</strong><span>Completed</span></div>
            <div><strong>{stats.cancelled}</strong><span>Cancelled</span></div>
          </div>
        </div>
      </header>

      {/* Confirmation banner */}
      {confirmation && (
        <div className="appt-confirm" role="status">
          <div className="appt-confirm-inner">
            <div>
              <h3>
                {confirmation.mode === "updated"
                  ? "Appointment Updated"
                  : "Appointment Confirmed"}
              </h3>
              <p>
                Reference <strong>{confirmation.reference}</strong> ·{" "}
                {formatDate(confirmation.date, confirmation.time)} at{" "}
                <strong>{confirmation.time}</strong> · {confirmation.center}
              </p>
              <p className="appt-confirm-note">
                A confirmation email will be sent to {confirmation.email}.
                Please arrive 10 minutes early with a valid photo ID.
              </p>
            </div>
            <button className="appt-btn-ghost" onClick={() => setConfirmation(null)}>
              Dismiss
            </button>
          </div>
        </div>
      )}

      <main className="appt-main">
        {/* Booking Form */}
        <section id="appointment-form" className="appt-form-section">
          <div className="appt-section-head">
            <h2>{editingId ? "Edit Appointment" : "Book a New Appointment"}</h2>
            <p>
              {editingId
                ? "Update your appointment details below."
                : "Complete the three steps below. All information is confidential."}
            </p>
          </div>

          {/* Stepper */}
          <ol className="appt-steps">
            {[
              { n: 1, label: "Donor Information" },
              { n: 2, label: "Donation Details" },
              { n: 3, label: "Date & Confirmation" },
            ].map((s) => (
              <li
                key={s.n}
                className={
                  step === s.n ? "active" : step > s.n ? "done" : ""
                }
              >
                <span className="appt-step-num">{step > s.n ? "✓" : s.n}</span>
                <span className="appt-step-label">{s.label}</span>
              </li>
            ))}
          </ol>

          <form onSubmit={handleSubmit} className="appt-form" noValidate>
            {step === 1 && (
              <div className="appt-grid-2">
                <div className="appt-field">
                  <label htmlFor="fullName">Full Legal Name *</label>
                  <input
                    id="fullName"
                    type="text"
                    value={form.fullName}
                    onChange={(e) => updateField("fullName", e.target.value)}
                    placeholder="e.g., Tewodros Alemu"
                    autoComplete="name"
                  />
                  {errors.fullName && <small className="err">{errors.fullName}</small>}
                </div>
                <div className="appt-field">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="name@example.com"
                    autoComplete="email"
                  />
                  {errors.email && <small className="err">{errors.email}</small>}
                </div>
                <div className="appt-field">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="+251 9XX XXX XXX"
                    autoComplete="tel"
                  />
                  {errors.phone && <small className="err">{errors.phone}</small>}
                </div>
                <div className="appt-field">
                  <label htmlFor="age">Age *</label>
                  <input
                    id="age"
                    type="number"
                    min="17"
                    max="70"
                    value={form.age}
                    onChange={(e) => updateField("age", e.target.value)}
                    placeholder="17 – 70"
                  />
                  {errors.age && <small className="err">{errors.age}</small>}
                </div>
                <div className="appt-field">
                  <label htmlFor="bloodType">Blood Type (optional)</label>
                  <select
                    id="bloodType"
                    value={form.bloodType}
                    onChange={(e) => updateField("bloodType", e.target.value)}
                  >
                    <option value="">Select if known</option>
                    {BLOOD_TYPES.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {step === 2 && (
              <>
                <div className="appt-field">
                  <label htmlFor="center">Donation Center *</label>
                  <select
                    id="center"
                    value={form.center}
                    onChange={(e) => updateField("center", e.target.value)}
                  >
                    {CENTERS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  {errors.center && <small className="err">{errors.center}</small>}
                </div>

                <div className="appt-field">
                  <label>Donation Type *</label>
                  <div className="appt-cards">
                    {DONATION_TYPES.map((t) => (
                      <button
                        type="button"
                        key={t.id}
                        className={`appt-card ${form.donationType === t.id ? "selected" : ""}`}
                        onClick={() => updateField("donationType", t.id)}
                      >
                        <strong>{t.label}</strong>
                        <span>{t.duration}</span>
                      </button>
                    ))}
                  </div>
                  {errors.donationType && <small className="err">{errors.donationType}</small>}
                </div>

                <div className="appt-field">
                  <label htmlFor="notes">Additional Notes (optional)</label>
                  <textarea
                    id="notes"
                    rows="3"
                    value={form.notes}
                    onChange={(e) => updateField("notes", e.target.value)}
                    placeholder="Medical conditions, accessibility needs, language preference..."
                  />
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="appt-grid-2">
                  <div className="appt-field">
                    <label htmlFor="date">Preferred Date *</label>
                    <input
                      id="date"
                      type="date"
                      min={todayISO()}
                      value={form.date}
                      onChange={(e) => updateField("date", e.target.value)}
                    />
                    {errors.date && <small className="err">{errors.date}</small>}
                  </div>
                  <div className="appt-field">
                    <label htmlFor="time">Preferred Time *</label>
                    <select
                      id="time"
                      value={form.time}
                      onChange={(e) => updateField("time", e.target.value)}
                    >
                      <option value="">Select a time slot</option>
                      {TIME_SLOTS.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    {errors.time && <small className="err">{errors.time}</small>}
                  </div>
                </div>

                <div className="appt-summary">
                  <h4>Summary</h4>
                  <ul>
                    <li><span>Donor</span><strong>{form.fullName || "—"}</strong></li>
                    <li><span>Contact</span><strong>{form.email || "—"} · {form.phone || "—"}</strong></li>
                    <li><span>Center</span><strong>{form.center}</strong></li>
                    <li><span>Type</span><strong>{donationTypeLabel(form.donationType)}</strong></li>
                    <li><span>When</span><strong>{form.date ? formatDate(form.date) : "—"} {form.time && `at ${form.time}`}</strong></li>
                  </ul>
                </div>

                <label className="appt-consent">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => updateField("consent", e.target.checked)}
                  />
                  <span>
                    I declare that the information provided is accurate and consent
                    to the screening procedures in accordance with WHO and ISO 15189
                    international donor safety standards.
                  </span>
                </label>
                {errors.consent && <small className="err">{errors.consent}</small>}
              </>
            )}

            <div className="appt-form-actions">
              <button
                type="button"
                className="appt-btn-ghost"
                onClick={handleReset}
              >
                Reset
              </button>
              <div className="appt-form-nav">
                {step > 1 && (
                  <button type="button" className="appt-btn-secondary" onClick={handleBack}>
                    ← Back
                  </button>
                )}
                {step < 3 && (
                  <button type="button" className="appt-btn-primary" onClick={handleNext}>
                    Continue →
                  </button>
                )}
                {step === 3 && (
                  <button type="submit" className="appt-btn-primary">
                    {editingId ? "Save Changes" : "Confirm Appointment"}
                  </button>
                )}
              </div>
            </div>
          </form>
        </section>

        {/* Manage Appointments */}
        <section id="manage-appointment" className="appt-manage-section">
          <div className="appt-section-head">
            <h2>Manage Appointments</h2>
            <p>Review, reschedule, or cancel your scheduled donations.</p>
          </div>

          <div className="appt-toolbar">
            <input
              type="search"
              placeholder="Search by name, reference, email or center…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="appt-search"
            />
            <div className="appt-tabs">
              {[
                { id: "all", label: `All (${stats.total})` },
                { id: "upcoming", label: `Upcoming (${stats.upcoming})` },
                { id: "completed", label: `Completed (${stats.completed})` },
                { id: "cancelled", label: `Cancelled (${stats.cancelled})` },
              ].map((t) => (
                <button
                  key={t.id}
                  className={filter === t.id ? "active" : ""}
                  onClick={() => setFilter(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="appt-empty">
              <p>No appointments to display.</p>
              <span>Submit the form above to create your first appointment.</span>
            </div>
          ) : (
            <div className="appt-list">
              {filtered.map((a) => (
                <article key={a.id} className={`appt-item status-${a.status}`}>
                  <div className="appt-item-date">
                    <strong>
                      {new Date(`${a.date}T${a.time || "00:00"}`).toLocaleDateString("en-GB", {
                        day: "2-digit", month: "short",
                      })}
                    </strong>
                    <span>
                      {new Date(`${a.date}T${a.time || "00:00"}`).getFullYear()}
                    </span>
                    <span className="appt-item-time">{a.time}</span>
                  </div>

                  <div className="appt-item-body">
                    <div className="appt-item-head">
                      <h3>{a.fullName}</h3>
                      <span className={`appt-status status-${a.status}`}>
                        {STATUS_LABELS[a.status]}
                      </span>
                    </div>
                    <p className="appt-item-meta">
                      <span>📍 {a.center}</span>
                      <span>🩸 {donationTypeLabel(a.donationType)}{a.bloodType && ` · ${a.bloodType}`}</span>
                    </p>
                    <p className="appt-item-contact">
                      Ref <strong>{a.reference}</strong> · {a.email} · {a.phone}
                    </p>
                    {a.notes && <p className="appt-item-notes">“{a.notes}”</p>}
                  </div>

                  <div className="appt-item-actions">
                    {a.status === "upcoming" && (
                      <>
                        <button className="appt-btn-secondary" onClick={() => handleEdit(a)}>
                          Reschedule
                        </button>
                        <button className="appt-btn-ghost" onClick={() => handleCancel(a.id)}>
                          Cancel
                        </button>
                      </>
                    )}
                    <button className="appt-btn-ghost danger" onClick={() => handleDelete(a.id)}>
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Information panel */}
        <aside className="appt-info">
          <h3>What to Expect</h3>
          <ul>
            <li><strong>Bring valid ID.</strong> Passport, national ID or driver's license.</li>
            <li><strong>Hydrate & eat.</strong> Drink water and have a balanced meal beforehand.</li>
            <li><strong>Allow 60 minutes.</strong> Including registration, screening and recovery.</li>
            <li><strong>Confidentiality.</strong> All medical information is processed under HIPAA-equivalent standards.</li>
          </ul>
          <p className="appt-info-note">
            For urgent assistance, contact our 24/7 donor line at{" "}
            <a href="tel:+251581110000">+251 58 111 0000</a>.
          </p>
        </aside>
      </main>
    </div>
  );
}