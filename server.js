const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

module.exports = app;

const PORT = process.env.PORT || 4001;

// Add middleware for handling CORS requests from index.html
app.use(cors());

// Add middware for parsing request bodies here:
app.use(bodyParser.json());

// Mount your existing apiRouter below at the '/api' path.
const apiRouter = require("./server/api");
app.use("/api", apiRouter);

// This conditional is here for testing purposes:
if (!module.parent) {
  // Add your code to start the server listening at PORT below:
  app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
  });
}
