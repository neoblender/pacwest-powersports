// PacWest Powersports - simple Express server
// Serves the single-page front-end from the /public directory.

const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve all static assets (index.html, etc.) from /public
app.use(express.static(path.join(__dirname, "public")));

// Fallback: send index.html for any unmatched route (single-page app)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`PacWest Powersports running on http://localhost:${PORT}`);
});
