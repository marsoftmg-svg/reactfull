import { useState } from "react";

function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.email.includes("@"))  errs.email    = "Nieprawidłowy e-mail";
    if (form.password.length < 8)   errs.password = "Min. 8 znaków";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  const inputStyle = (field) => ({
    padding: "8px 12px", borderRadius: 6, width: "100%", boxSizing: "border-box",
    border: `2px solid ${errors[field] ? "#ef4444" : "#cbd5e1"}`,
    outline: "none", fontSize: 14,
  });

  return (
    <div style={{ maxWidth: 360 }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600 }}>E-mail</label>
          <input name="email" type="email" value={form.email}
            onChange={handleChange} placeholder="jan@example.com" style={inputStyle("email")} />
          {errors.email && <span style={{ color: "#ef4444", fontSize: 12 }}>{errors.email}</span>}
        </div>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600 }}>Hasło</label>
          <input name="password" type="password" value={form.password}
            onChange={handleChange} placeholder="Min. 8 znaków" style={inputStyle("password")} />
          {errors.password && <span style={{ color: "#ef4444", fontSize: 12 }}>{errors.password}</span>}
        </div>
        <button type="submit" style={{ padding: "10px", background: "#6366f1", color: "white", border: "none", borderRadius: 6, cursor: "pointer", fontWeight: 600 }}>
          Zaloguj
        </button>
        {success && <p style={{ color: "#10b981", textAlign: "center" }}>Zalogowano!</p>}
      </form>
    </div>
  );
}

export default LoginForm