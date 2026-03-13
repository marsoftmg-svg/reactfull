import { useState } from "react";

function RegisterForm() {
  const [form, setForm] = useState({ name: "", email: "", age: "" });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const rules = {
    name:  v => v.trim().length < 2   ? "Min. 2 znaki"        : "",
    email: v => !v.includes("@")      ? "Nieprawidłowy e-mail" : "",
    age:   v => (+v < 18 || +v > 120) ? "Wiek 18-120"          : "",
  };

  const getError = (field) =>
    (touched[field] || submitted) ? rules[field](form[field]) : "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    setTouched(prev => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const hasErrors = Object.keys(rules).some(k => rules[k](form[k]));
    if (!hasErrors) alert("Zarejestrowano: " + JSON.stringify(form));
  };

  const fields = [
    { name: "name",  label: "Imię i nazwisko", type: "text",   placeholder: "Jan Kowalski" },
    { name: "email", label: "E-mail",           type: "email",  placeholder: "jan@example.com" },
    { name: "age",   label: "Wiek",             type: "number", placeholder: "25" },
  ];

  return (
    <div style={{ maxWidth: 360 }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {fields.map(({ name, label, type, placeholder }) => (
          <div key={name}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{label}</label>
            <input
              name={name} type={type} value={form[name]}
              onChange={handleChange} onBlur={handleBlur}
              placeholder={placeholder}
              style={{
                padding: "8px 12px", borderRadius: 6, width: "100%", boxSizing: "border-box",
                border: `2px solid ${getError(name) ? "#ef4444" : "#cbd5e1"}`, fontSize: 14,
              }}
            />
            {getError(name) && <span style={{ color: "#ef4444", fontSize: 12 }}>{getError(name)}</span>}
          </div>
        ))}
        <button type="submit" style={{ padding: 10, background: "#10b981", color: "white", border: "none", borderRadius: 6, cursor: "pointer", fontWeight: 600 }}>
          Zarejestruj
        </button>
      </form>
    </div>
  );
}

export default RegisterForm