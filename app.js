// Import necessary modules
const express = require("express");
const dayjs = require("dayjs");
dayjs().format();

// Create Express app
const app = express();
const PORT = 3000;

// Define endpoints
app.get("/api/dates/today", (req, res) => {
  const currentDate = dayjs().format("dddd MMM DD, YYYY");
  res.status(200).json({ date: currentDate });
});

app.get("/api/dates/tomorrow", (req, res) => {
  const nextDate = dayjs().add(1, "day").format("dddd MMM DD, YYYY");
  res.status(200).json({ date: nextDate });
});

app.get("/api/dates/yesterday", (req, res) => {
  const prevDate = dayjs().subtract(1, "day").format("dddd MMM DD, YYYY");
  res.status(200).json({ date: prevDate });
});

app.get("/api/day-of-week/:year/:month/:day", (req, res) => {
  const { year, month, day } = req.params;
  const dayOfWeek = dayjs(`${year}-${month}-${day}`).format("dddd");
  res.status(200).json({ dayOfWeek });
});

app.get("/api/current-time", (req, res) => {
  const format = req.query.format || "24";
  const currentTime = dayjs().format(
    format === "12" ? "h:mm:ss A" : "HH:mm:ss"
  );
  res.status(200).json({ currentTime });
});

app.get("/api/timestamp", (req, res) => {
  const format = req.query.format || "milliseconds";
  const timestamp = format === "seconds" ? dayjs().unix() : dayjs().valueOf();
  res.status(200).json({ timestamp });
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
