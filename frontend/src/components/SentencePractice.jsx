// import React, { useState } from "react";

// const SentencePractice = () => {
//   const [sentence, setSentence] = useState("");
//   const [sentences, setSentences] = useState([]);

//   const addSentence = () => {
//     if (sentence) setSentences([...sentences, sentence]);
//     setSentence("");
//   };

//   return (
//     <div className="card">
//       <h2>Sentence Practice</h2>
//       <div>
//         <input type="text" placeholder="Write sentence" value={sentence} onChange={e=>setSentence(e.target.value)} />
//         <button onClick={addSentence}>Add</button>
//       </div>
//       {sentences.length>0 && <ul>{sentences.map((s,i)=><li key={i}>{s}</li>)}</ul>}
//     </div>
//   );
// };

// export default SentencePractice;.

import React, { useState } from "react";

const SentencePractice = () => {
  const [sentences, setSentences] = useState([]);
  const [input, setInput] = useState("");

  const addSentence = () => {
    if (input) setSentences([...sentences, input]);
    setInput("");
  };

  return (
    <div style={{ marginTop: "30px", maxWidth: "700px", margin: "50px auto" }}>
      <h2>Sentence Practice</h2>
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write a sentence"
          style={{ flex: 1, padding: "8px", fontSize: "16px", borderRadius: "8px", border: "1px solid #ccc" }}
        />
        <button onClick={addSentence} style={{ padding: "8px 16px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "8px" }}>Add</button>
      </div>
      {sentences.length > 0 && (
        <ul style={{ paddingLeft: "20px" }}>
          {sentences.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
      )}
    </div>
  );
};

export default SentencePractice;

