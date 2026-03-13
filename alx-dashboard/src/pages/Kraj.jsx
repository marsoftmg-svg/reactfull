import { useState, useEffect } from "react";


function CountryForm() {
  const [countries, setCountries] = useState([]);   // [{code, name}]
  const [status, setStatus]       = useState("loading");
  const [error, setError]         = useState("");
 
  const [form, setForm] = useState({ country: "", city: "" });
  const [submitted, setSubmitted] = useState(false);
 
  // ── Fetch przy montowaniu ──────────────────────────────────
  useEffect(() => {
    let cancelled = false;   // cleanup flag – zapobiega setState po odmontowaniu
 
    async function loadCountries() {
      setStatus("loading");
      setError("");
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,cca2"
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
 
        const data = await res.json();
 
        if (cancelled) return;   // komponent już odmontowany – nie aktualizuj stanu
 
        // Mapowanie: { name: { common: "Poland" }, cca2: "PL" } → { code, name }
        const list = data
          .map(c => ({ code: c.cca2, name: c.name.common }))
          .sort((a, b) => a.name.localeCompare(b.name));   // alfabetycznie
 
        setCountries(list);
        setStatus("ok");
        // Ustaw domyślną wartość na pierwszy kraj z listy
        setForm(prev => ({ ...prev, country: list[0]?.code ?? "" }));
 
      } catch (err) {
        if (cancelled) return;
        setError(err.message);
        setStatus("error");
      }
    }
 
    loadCountries();
 
    // Cleanup – uruchamia się przy odmontowaniu lub ponownym odpaleniu efektu
    return () => { cancelled = true; };
  }, []);   // [] – tylko przy montowaniu, nigdy ponownie
 
  // ── Retry ─────────────────────────────────────────────────
  // Żeby ponowić fetch wystarczy zmienić stan który jest w tablicy zależności.
  // Trik: osobny licznik retry wymusza re-run useEffect.
  const [retryCount, setRetryCount] = useState(0);
 
  useEffect(() => {
    if (retryCount === 0) return;   // pomijamy pierwsze renderowanie
 
    let cancelled = false;
 
    async function reload() {
      setStatus("loading");
      setError("");
      try {
        const res  = await fetch("https://restcountries.com/v3.1/all?fields=name,cca2");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (cancelled) return;
        const list = data
          .map(c => ({ code: c.cca2, name: c.name.common }))
          .sort((a, b) => a.name.localeCompare(b.name));
        setCountries(list);
        setStatus("ok");
        setForm(prev => ({ ...prev, country: list[0]?.code ?? "" }));
      } catch (err) {
        if (cancelled) return;
        setError(err.message);
        setStatus("error");
      }
    }
 
    reload();
    return () => { cancelled = true; };
  }, [retryCount]);
 
  // ── Handlers ──────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.country || !form.city.trim()) return;
    setSubmitted(true);
  };
 
  // ── Render ─────────────────────────────────────────────────
  const selectStyle = {
    padding: "8px 12px", borderRadius: 6, width: "100%",
    border: "2px solid #cbd5e1", fontSize: 14, background: "white",
  };
 
  const inputStyle = {
    padding: "8px 12px", borderRadius: 6, width: "100%", boxSizing: "border-box",
    border: "2px solid #cbd5e1", fontSize: 14,
  };
 
  if (submitted) {
    const countryName = countries.find(c => c.code === form.country)?.name ?? form.country;
    return (
      <div style={{ maxWidth: 360 }}>
        <div style={{ padding: 16, background: "#ecfdf5", borderRadius: 8, border: "1px solid #6ee7b7" }}>
          <p style={{ color: "#065f46", fontWeight: 600, marginBottom: 8 }}>✅ Zapisano lokalizację</p>
          <p style={{ color: "#064e3b", fontSize: 14 }}>
            {form.city}, {countryName} ({form.country})
          </p>
        </div>
        <button
          onClick={() => setSubmitted(false)}
          style={{ marginTop: 12, padding: "8px 16px", background: "#6366f1", color: "white", border: "none", borderRadius: 6, cursor: "pointer" }}
        >
          ← Wróć
        </button>
      </div>
    );
  }
 
  return (
    <div style={{ maxWidth: 360, display: "flex", flexDirection: "column", gap: 14 }}>
 
      {/* Pole: Kraj */}
      <div>
        <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>
          Kraj
        </label>
 
        {/* Status: ładowanie */}
        {status === "loading" && (
          <select disabled style={{ ...selectStyle, color: "#94a3b8" }}>
            <option>⏳ Pobieranie krajów...</option>
          </select>
        )}
 
        {/* Status: błąd */}
        {status === "error" && (
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <select disabled style={{ ...selectStyle, borderColor: "#ef4444", color: "#ef4444", flex: 1 }}>
              <option>❌ Błąd: {error}</option>
            </select>
            <button
              onClick={() => setRetryCount(n => n + 1)}
              style={{ padding: "8px 12px", background: "#ef4444", color: "white", border: "none", borderRadius: 6, cursor: "pointer", whiteSpace: "nowrap", fontSize: 13 }}
            >
              Retry
            </button>
          </div>
        )}
 
        {/* Status: dane załadowane */}
        {status === "ok" && (
          <select name="country" value={form.country} onChange={handleChange} style={selectStyle}>
            {countries.map(c => (
              <option key={c.code} value={c.code}>
                {c.name} ({c.code})
              </option>
            ))}
          </select>
        )}
 
        <span style={{ fontSize: 11, color: "#94a3b8" }}>
          {status === "ok" ? `${countries.length} krajów załadowanych` : ""}
        </span>
      </div>
 
      {/* Pole: Miasto */}
      <div>
        <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 4 }}>
          Miasto
        </label>
        <input
          name="city" type="text" value={form.city}
          onChange={handleChange} placeholder="np. Gdańsk"
          style={inputStyle}
        />
      </div>
 
      <button
        onClick={handleSubmit}
        disabled={status !== "ok" || !form.city.trim()}
        style={{
          padding: "10px", background: status === "ok" ? "#6366f1" : "#cbd5e1",
          color: "white", border: "none", borderRadius: 6,
          cursor: status === "ok" ? "pointer" : "not-allowed", fontWeight: 600,
        }}
      >
        Zapisz lokalizację
      </button>
    </div>
  );
}

export default CountryForm