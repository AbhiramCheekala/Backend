const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectToDatabase = require("./db/database");
const ContactRoutes = require("./routes/ContactRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectToDatabase();

// Routes
app.use("/api", ContactRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
