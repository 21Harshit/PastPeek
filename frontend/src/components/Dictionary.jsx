
import React, { useState, useEffect } from "react";
import axios from "axios";

const TodayInHistory = () => {
  const [today, setToday] = useState(new Date());
  const [articles, setArticles] = useState([]);
  const [todayFact, setTodayFact] = useState(null);

  const [savedArticles, setSavedArticles] = useState(
    JSON.parse(localStorage.getItem("savedArticles")) || []
  );
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || {}
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [day, setDay] = useState(today.getDate());

  // 🔹 Fetch from Wikipedia API
  const fetchHistory = async (m, d, isToday = false) => {
    if (!isToday) {
      setLoading(true);
      setArticles([]);
      setError("");
    }

    try {
      const res = await axios.get(
        `https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${m}/${d}`
      );

      const events = res.data.events.slice(0, 5).map((event, index) => ({
        id: `${m}-${d}-${event.year}-${index}`,
        title: `Event in ${event.year}`,
        date: `${m}-${d}`,
        description: event.text,
      }));

      if (isToday) {
        setTodayFact(events[0]);
        localStorage.setItem("todayFact", JSON.stringify(events[0]));
      } else {
        setArticles(events);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch historical events.");
      if (isToday) {
        setTodayFact(null);
        localStorage.removeItem("todayFact");
      }
    } finally {
      if (!isToday) setLoading(false);
    }
  };

  // 🔹 Update current date hourly
  useEffect(() => {
    const timer = setInterval(() => setToday(new Date()), 60 * 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  // 🔹 Load today's fact (cached per day)
  useEffect(() => {
    const stored = localStorage.getItem("todayFact");
    const todayKey = `${today.getMonth() + 1}-${today.getDate()}`;

    if (stored) {
      const fact = JSON.parse(stored);
      if (fact.date === todayKey) {
        setTodayFact(fact);
        return;
      }
    }

    fetchHistory(today.getMonth() + 1, today.getDate(), true);
  }, [today]);

  // 🔹 Persist saved items & notes
  useEffect(() => {
    localStorage.setItem("savedArticles", JSON.stringify(savedArticles));
  }, [savedArticles]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const saveArticle = (article) => {
    if (!savedArticles.find((a) => a.id === article.id)) {
      setSavedArticles([...savedArticles, article]);
    }
  };

  const deleteArticle = (id) => {
    setSavedArticles(savedArticles.filter((a) => a.id !== id));
    const updated = { ...notes };
    delete updated[id];
    setNotes(updated);
  };

  const handleNoteChange = (id, value) => {
    setNotes({ ...notes, [id]: value });
  };

  const renderDays = () => {
    const daysInMonth = new Date(today.getFullYear(), month, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  };

  return (
    <div
      style={{
        margin: "15px auto",
        padding: "20px",
        fontFamily: "Arial",
        backgroundColor: "#e9ecccff",
        borderRadius: "12px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
        maxWidth: "900px",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#8b4513" }}>
        Today in History
      </h1>

      <p style={{ textAlign: "center", fontStyle: "italic" }}>
        {today.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>

      {/* 🔹 Today's Fact */}
      {todayFact && (
        <div style={cardStyle}>
          <h2 style={headingStyle}>Today's Fact</h2>
          <h3 style={headingStyle}>{todayFact.title}</h3>
          <p style={dateStyle}>{todayFact.date}</p>
          <p>{todayFact.description}</p>
          <button style={saveBtn} onClick={() => saveArticle(todayFact)}>
            Save
          </button>
        </div>
      )}

      {/* 🔹 Search */}
       {/* <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <select value={month} onChange={(e) => setMonth(+e.target.value)}>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>

        <select value={day} onChange={(e) => setDay(+e.target.value)}>
          {renderDays().map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <button onClick={() => fetchHistory(month, day)}>Search</button>
      </div>  */}

      <div
  style={{
    textAlign: "center",
    marginBottom: "20px",
    fontFamily: "Arial, sans-serif",
  }}
>
  <select
    value={month}
    onChange={(e) => setMonth(+e.target.value)}
    style={{
      padding: "8px 12px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      marginRight: "10px",
      fontSize: "14px",
      fontFamily: "inherit",
    }}
  >
    {Array.from({ length: 12 }, (_, i) => (
      <option key={i + 1} value={i + 1}>
        {new Date(0, i).toLocaleString("en-IN", { month: "long" })}
      </option>
    ))}
  </select>

  <select
    value={day}
    onChange={(e) => setDay(+e.target.value)}
    style={{
      padding: "8px 12px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      marginRight: "10px",
      fontSize: "14px",
      fontFamily: "inherit",
    }}
  >
    {renderDays().map((d) => (
      <option key={d} value={d}>
        {d}
      </option>
    ))}
  </select>

  <button
    onClick={() => fetchHistory(month, day)}
    style={{
      padding: "8px 16px",
      borderRadius: "8px",
      border: "none",
      backgroundColor: "#f97316", // orange
      color: "#fff",
      fontWeight: "bold",
      fontSize: "14px",
      cursor: "pointer",
    }}
  >
    Search
  </button>
</div>

     

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {articles.map((a) => (
        <div key={a.id} style={cardStyle}>
          <h3 style={headingStyle}>{a.title}</h3>
          <p style={dateStyle}>{a.date}</p>
          <p>{a.description}</p>
          <button style={saveBtn} onClick={() => saveArticle(a)}>
            Save
          </button>
        </div>
      ))}

      {/* 🔹 Saved + Notes */}
      {savedArticles.length > 0 && (
        <div>
          <h2 style={headingStyle}>📌 Saved Events & Notes</h2>
          {savedArticles.map((f) => (
            <div key={f.id} style={cardStyle}>
              <h4>{f.title}</h4>
              <p>{f.description}</p>
              <textarea
                placeholder="Add notes..."
                value={notes[f.id] || ""}
                onChange={(e) => handleNoteChange(f.id, e.target.value)}
                style={{ width: "100%", marginTop: "10px" }}
              />
              <button
                style={{ ...saveBtn, backgroundColor: "#dc2626" }}
                onClick={() => deleteArticle(f.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const cardStyle = {
  backgroundColor: "#fff",
  padding: "15px",
  borderRadius: "10px",
  marginBottom: "20px",
  position: "relative",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
};

const headingStyle = { color: "#8b4513" };
const dateStyle = { fontStyle: "italic", color: "#a05a2c" };

const saveBtn = {
  position: "absolute",
  top: "15px",
  right: "15px",
  padding: "6px 12px",
  backgroundColor: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export default TodayInHistory;






