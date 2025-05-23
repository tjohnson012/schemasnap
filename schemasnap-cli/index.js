#!/usr/bin/env node
const axios = require('axios');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Paste your SQL schema:
", async function(sql) {
  try {
    const res = await axios.post("http://localhost:3001/api/feedback", { sql });
    console.log("\nFeedback:");
    res.data.suggestions.forEach((s, i) => console.log(`${i + 1}. ${s}`));
  } catch (e) {
    console.error("Error:", e.response ? e.response.data : e.message);
  } finally {
    rl.close();
  }
});
