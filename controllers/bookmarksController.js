// bookmarksController.js

// Dependencies
const express = require("express");
// Files
const bookmarksArray = require("../models/bookmark");

// `.Router` creates a new controller
// that handles a sub-route.
// In this case, it will handle everything
// that starts with `/bookmarks`.
const bookmarks = express.Router();

// Routes
// The "/bookmarks" part of the route is already assumed because app.js
// has delegated it to us with its `app.use` line. So we just need "/"
// as our route here, and it's still /bookmarks.

// Get all bookmarks
// GET /bookmarks
bookmarks.get("/", (_, response) => {
  console.log("GET request to /bookmarks");
  response.json(bookmarksArray);
});

// Get one bookmark by index
// GET /bookmarks/:index
// A request to /bookmarks/1 will result in request.params.index having the value 1
bookmarks.get("/:index", (request, response) => {
  if (bookmarksArray[request.params.index]) {
    response.json(bookmarksArray[request.params.index]);
  } else {
    response.status(404).json({ error: "Resource not found" });
  }
});

// Create one bookmark.
// POST /bookmarks
// (the `/bookmarks` is already there thanks to app.js delegating it to us )
// A request to POST /bookmarks will need to include WHAT to add
// POST to /bookmarks... but post WHAT? post THIS to bookmarks
bookmarks.post("/", (request, response) => {
  console.log("POST to /bookmarks");
  bookmarksArray.push(request.body);
  response.status(201).json(bookmarksArray);
});

// One problem with the above approach: if we restart the server, the data is gone!
// We'll fix that with databases so that our data sticks around even if our server crashes.
// The technical term for this is: persistence.

// Export the bookmarks controller/router
// so that `app` can delegate the `/bookmarks`
// route to it.
module.exports = bookmarks;
