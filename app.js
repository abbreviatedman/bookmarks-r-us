// app.js

// Files
const bookmarksController = require("./controllers/bookmarksController");
// DEPENDENCIES
const express = require("express");

// Create the Express app.
const app = express();

// MIDDLEWARE

// JSON-parsing middleware
// For every request, parse incoming information as JSON.
// IMPORTANT: make sure this comes *before* any controllers!
// Otherwise, they won't have their stuff parsed from JSON.
app.use(express.json());

// In the middle of every request, check if the endpoint starts with /bookmarks
// If so, send it to the bookmarks controller/router.
app.use("/bookmarks", bookmarksController);

// The home route.
app.get("/", () => {
  console.log("GET request to /");
  response.send("Hello and welcome to bookmarks!");
});

// Star (*) matches anything we haven't matched yet.
app.get("*", (_, response) => {
  response.status(404).json({ error: "Page not found" });
});

// Export our app for `server.js`.
module.exports = app;
