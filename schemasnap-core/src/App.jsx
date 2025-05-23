import React, { useState } from "react";
import "../index.css";

export default function App() {
  const [sqlInput, setSqlInput] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleAnalyze = async () => {
    if (!sqlInput.trim()) {
      setFeedback("Please enter some SQL.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sql: sqlInput })
      });
      const data = await res.json();
      setFeedback(data.suggestions?.join("\n") || "No feedback returned.");
    } catch (error) {
      setFeedback("Something went wrong. Make sure the server is running.");
    }
  };

  return (
    <>
      <header>
        <h1>SchemaSnap</h1>
        <span>Developer SQL Feedback Tool</span>
      </header>
      <main>
        <h2>SQL Schema Analyzer</h2>
        <textarea
          rows={10}
          placeholder="Paste your CREATE TABLE statements here..."
          value={sqlInput}
          onChange={(e) => setSqlInput(e.target.value)}
        />
        <div className="btn-area">
          <button onClick={handleAnalyze}>Analyze</button>
        </div>
        {feedback && (
          <div className="feedback">
            <h2>Feedback</h2>
            <pre>{feedback}</pre>
          </div>
        )}
      </main>
      <footer>
        &copy; {new Date().getFullYear()} SchemaSnap. All rights reserved.
      </footer>
    </>
  );
}
