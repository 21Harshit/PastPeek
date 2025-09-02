
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const TodayInHistory = () => {
//   const today = new Date();
//   const [articles, setArticles] = useState([]);

//   // ✅ Load persisted data from localStorage
//   const [savedArticles, setSavedArticles] = useState(
//     JSON.parse(localStorage.getItem("savedArticles")) || []
//   );
//   const [notes, setNotes] = useState(
//     JSON.parse(localStorage.getItem("notes")) || {}
//   );
//   const [todayFact, setTodayFact] = useState(
//     JSON.parse(localStorage.getItem("todayFact")) || null
//   );

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [month, setMonth] = useState(today.getMonth() + 1);
//   const [day, setDay] = useState(today.getDate());

//   // Fetch fact (for search or today)
//   const fetchHistory = async (selectedMonth, selectedDay, isToday = false) => {
//     if (!isToday) {
//       setLoading(true);
//       setError("");
//       setArticles([]);
//     }

//     try {
//       const response = await axios.get(
//         `https://numbersapi.p.rapidapi.com/${selectedMonth}/${selectedDay}/date`,
//         {
//           headers: {
//             "x-rapidapi-host": "numbersapi.p.rapidapi.com",
//             "x-rapidapi-key": "c3f5771564msh2776e97d9d59195p1601e0jsn6339a4482d14",
//           },
//           params: { fragment: "true", json: "true" },
//         }
//       );

//       if (response.data) {
//         const fact = {
//           id: `${selectedMonth}-${selectedDay}-${response.data.year}`, // unique ID
//           title: `Event in ${response.data.year}`,
//           date: `${selectedMonth}-${selectedDay}`,
//           description: response.data.text,
//         };

//         if (isToday) {
//           setTodayFact(fact);
//           localStorage.setItem("todayFact", JSON.stringify(fact)); // ✅ persist today's fact
//         } else {
//           setArticles([fact]); // searched results
//         }
//       } else {
//         setError("No historical event found for this date.");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("API error. Check your key or network.");
//     } finally {
//       if (!isToday) setLoading(false);
//     }
//   };

//   // Load today's fact once (only if not already stored)
//   useEffect(() => {
//     if (!todayFact) {
//       fetchHistory(today.getMonth() + 1, today.getDate(), true);
//     }
//   },[]);

//   // Fetch when user searches
//   useEffect(() => {
//     fetchHistory(month, day, false);
//   }, [month, day]);

//   // ✅ Persist savedArticles
//   useEffect(() => {
//     localStorage.setItem("savedArticles", JSON.stringify(savedArticles));
//   }, [savedArticles]);

//   // ✅ Persist notes
//   useEffect(() => {
//     localStorage.setItem("notes", JSON.stringify(notes));
//   }, [notes]);

//   // Save article
//   const saveArticle = (article) => {
//     if (!savedArticles.find((a) => a.id === article.id)) {
//       setSavedArticles([...savedArticles, article]);
//     }
//   };

//   // Delete / Unsave article
//   const deleteArticle = (id) => {
//     setSavedArticles(savedArticles.filter((a) => a.id !== id));
//     const updatedNotes = { ...notes };
//     delete updatedNotes[id];
//     setNotes(updatedNotes);
//   };

//   // Notes handler
//   const handleNoteChange = (id, text) => {
//     setNotes({ ...notes, [id]: text });
//   };

//   const renderDays = () => {
//     const daysInMonth = new Date(today.getFullYear(), month, 0).getDate();
//     return Array.from({ length: daysInMonth }, (_, i) => i + 1);
//   };

//   return (
//     <div
//       style={{
//         margin: "50px auto",
//         padding: "25px",
//         fontFamily: "Arial, sans-serif",
//         backgroundColor: "#e9e7ddff",
//         borderRadius: "12px",
//         boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
//       }}
//     >
//       <h1 style={{ textAlign: "center", marginBottom: "10px", color: "#8b4513" }}>
//         Today in History
//       </h1>

//       <p
//         style={{
//           textAlign: "center",
//           marginBottom: "25px",
//           color: "#555",
//           fontStyle: "italic",
//         }}
//       >
//         {today.toLocaleDateString("en-IN", {
//           month: "long",
//           day: "numeric",
//           year: "numeric",
//         })}
//       </p>

//       {/* 🔹 Always visible Present Day Fact */}
//       {todayFact && (
//         <div
//           style={{
//             marginBottom: "30px",
//             padding: "15px",
//             backgroundColor: "#fff",
//             borderRadius: "10px",
//             boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//             position: "relative",
//           }}
//         >
//           <h2 style={{ color: "#8b4513", marginBottom: "8px" }}>Today's Fact</h2>
//           <h3 style={{ color: "#8b4513", marginBottom: "8px" }}>
//             {todayFact.title}
//           </h3>
//           <p style={{ fontStyle: "italic", color: "#a05a2c" }}>
//             {todayFact.date}
//           </p>
//           <p style={{ lineHeight: "1.6" }}>{todayFact.description}</p>
//           <button
//             onClick={() => saveArticle(todayFact)}
//             style={{
//               position: "absolute",
//               top: "15px",
//               right: "15px",
//               padding: "6px 12px",
//               borderRadius: "6px",
//               border: "none",
//               backgroundColor: "#2563eb",
//               color: "#fff",
//               fontWeight: "bold",
//               cursor: "pointer",
//             }}
//           >
//             Save
//           </button>
//         </div>
//       )}

//       {/* Date selectors */}
//       <div style={{ marginBottom: "20px", textAlign: "center" }}>
//         <label style={{ marginRight: "10px", fontWeight: "bold" }}>Month:</label>
//         <select
//           value={month}
//           onChange={(e) => setMonth(Number(e.target.value))}
//           style={{ padding: "6px", borderRadius: "6px", marginRight: "15px" }}
//         >
//           {Array.from({ length: 12 }, (_, i) => (
//             <option key={i + 1} value={i + 1}>
//               {i + 1}
//             </option>
//           ))}
//         </select>

//         <label style={{ marginRight: "10px", fontWeight: "bold" }}>Day:</label>
//         <select
//           value={day}
//           onChange={(e) => setDay(Number(e.target.value))}
//           style={{ padding: "6px", borderRadius: "6px" }}
//         >
//           {renderDays().map((d) => (
//             <option key={d} value={d}>
//               {d}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Articles Section */}
//       {loading && <p>Loading events...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {!loading &&
//         articles.map((article) => (
//           <div
//             key={article.id}
//             style={{
//               marginBottom: "20px",
//               padding: "15px",
//               backgroundColor: "#fff",
//               borderRadius: "10px",
//               boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//               position: "relative",
//             }}
//           >
//             <h3 style={{ color: "#8b4513", marginBottom: "8px" }}>
//               {article.title}
//             </h3>
//             <p style={{ fontStyle: "italic", color: "#a05a2c" }}>
//               {article.date}
//             </p>
//             <p style={{  lineHeight: "1.6" }}>{article.description}</p>
//             <button
//               onClick={() => saveArticle(article)}
//               style={{
//                 position: "absolute",
//                 top: "15px",
//                 right: "15px",
//                 padding: "6px 12px",
//                 borderRadius: "6px",
//                 border: "none",
//                 backgroundColor: "#2563eb",
//                 color: "#fff",
//                 fontWeight: "bold",
//                 cursor: "pointer",
//               }}
//             >
//               Save
//             </button>
//           </div>
//         ))}

//       {/* Saved Section with Notes */}
//       {savedArticles.length > 0 && (
//         <div style={{ marginTop: "30px" }}>
//           <h2 style={{ color: "#8b4513", marginBottom: "12px" }}>
//             📌 Saved Events & Notes
//           </h2>
//           {savedArticles.map((fact) => (
//             <div
//               key={fact.id}
//               style={{
//                 background: "#fff",
//                 padding: "15px",
//                 borderRadius: "10px",
//                 marginBottom: "15px",
//                 boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//               }}
//             >
//               <h4 style={{ color: "#a05a2c" }}>
//                 {fact.date}: {fact.title}
//               </h4>
//               <p>{fact.description}</p>
//               <textarea
//                 placeholder="Add your notes here..."
//                 value={notes[fact.id] || ""}
//                 onChange={(e) => handleNoteChange(fact.id, e.target.value)}
//                 style={{
//                   width: "100%",
//                   marginTop: "10px",
//                   padding: "8px",
//                   borderRadius: "6px",
//                   border: "1px solid #ccc",
//                 }}
//               />
//               <button
//                 onClick={() => deleteArticle(fact.id)}
//                 style={{
//                   marginTop: "10px",
//                   padding: "6px 12px",
//                   borderRadius: "6px",
//                   border: "none",
//                   backgroundColor: "#dc2626",
//                   color: "#fff",
//                   cursor: "pointer",
//                 }}
//               >
//                 Delete
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TodayInHistory;

import React, { useState, useEffect } from "react";
import axios from "axios";

const TodayInHistory = () => {
  const today = new Date();

  const [todayFact, setTodayFact] = useState(
    JSON.parse(localStorage.getItem("todayFact")) || null
  );

  const [articles, setArticles] = useState([]); // searched results
  const [savedArticles, setSavedArticles] = useState(
    JSON.parse(localStorage.getItem("savedArticles")) || []
  );
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || {}
  );

  const [month, setMonth] = useState(today.getMonth() + 1);
  const [day, setDay] = useState(today.getDate());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Fetch a fact
  const fetchHistory = async (m, d) => {
    try {
      const { data } = await axios.get(
        `https://numbersapi.p.rapidapi.com/${m}/${d}/date`,
        {
          headers: {
            "x-rapidapi-host": "numbersapi.p.rapidapi.com",
            "x-rapidapi-key": "c3f5771564msh2776e97d9d59195p1601e0jsn6339a4482d14",
          },
          params: { fragment: "true", json: "true" },
        }
      );

      if (!data) return null;

      return {
        id: `${m}-${d}-${data.year}`,
        title: `Event in ${data.year}`,
        date: `${m}-${d}`,
        description: data.text,
      };
    } catch (err) {
      console.error(err);
      setError("API error. Check your key or network.");
      return null;
    }
  };

  // 🔹 Load real today’s fact (once)
  useEffect(() => {
    if (!todayFact) {
      fetchHistory(today.getMonth() + 1, today.getDate()).then((fact) => {
        if (fact) {
          setTodayFact(fact);
          localStorage.setItem("todayFact", JSON.stringify(fact));
        }
      });
    }
  }, []);

  // 🔹 Fetch when user changes dropdown
  useEffect(() => {
    setLoading(true);
    fetchHistory(month, day).then((fact) => {
      if (fact) {
        setArticles([fact]);
      } else {
        setArticles([]);
        setError("No fact found for this date.");
      }
      setLoading(false);
    });
  }, [month, day]);

  // 🔹 Persist savedArticles & notes
  useEffect(() => {
    localStorage.setItem("savedArticles", JSON.stringify(savedArticles));
  }, [savedArticles]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Save article
  const saveArticle = (article) => {
    if (!savedArticles.find((a) => a.id === article.id)) {
      setSavedArticles([...savedArticles, article]);
    }
  };

  // Delete article
  const deleteArticle = (id) => {
    setSavedArticles(savedArticles.filter((a) => a.id !== id));
    const updatedNotes = { ...notes };
    delete updatedNotes[id];
    setNotes(updatedNotes);
  };

  const handleNoteChange = (id, text) => {
    setNotes({ ...notes, [id]: text });
  };

  const renderDays = () => {
    const daysInMonth = new Date(today.getFullYear(), month, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  };

  return (
    <div style={{ margin: "50px auto", padding: "25px", maxWidth: "700px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "10px" }}>📜 Today in History</h1>

      {/* 🔹 Today’s Fact */}
      {todayFact && (
        <section
          style={{
            marginBottom: "30px",
            padding: "15px",
            background: "#fff",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <h2 style={{ marginBottom: "8px", color: "#8b4513" }}>Today’s Fact</h2>
          <h3>{todayFact.title}</h3>
          <p><i>{todayFact.date}</i></p>
          <p>{todayFact.description}</p>
          <button onClick={() => saveArticle(todayFact)}>💾 Save</button>
        </section>
      )}

      {/* 🔹 Date selectors */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <label>Month:</label>
        <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <label style={{ marginLeft: "15px" }}>Day:</label>
        <select value={day} onChange={(e) => setDay(Number(e.target.value))}>
          {renderDays().map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      {/* 🔹 Selected Date Fact */}
      {loading && <p>Loading...</p>}
      {!loading &&
        articles.map((a) => (
          <section
            key={a.id}
            style={{
              marginBottom: "20px",
              padding: "15px",
              background: "#fff",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            <h3>{a.title}</h3>
            <p><i>{a.date}</i></p>
            <p>{a.description}</p>
            <button onClick={() => saveArticle(a)}>💾 Save</button>
          </section>
        ))}

      {/* 🔹 Saved Articles */}
      {savedArticles.length > 0 && (
        <section style={{ marginTop: "30px" }}>
          <h2>📌 Saved Events & Notes</h2>
          {savedArticles.map((fact) => (
            <div key={fact.id} style={{ marginBottom: "15px" }}>
              <h4>{fact.date}: {fact.title}</h4>
              <p>{fact.description}</p>
              <textarea
                placeholder="Add notes..."
                value={notes[fact.id] || ""}
                onChange={(e) => handleNoteChange(fact.id, e.target.value)}
              />
              <button onClick={() => deleteArticle(fact.id)}>❌ Delete</button>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default TodayInHistory;
