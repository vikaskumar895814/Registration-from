const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const port = 3019;

const app = express();
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/students", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once("open", () => {
  console.log("MongoDB connection successful");
});

// User schema definition
const userSchema = new mongoose.Schema({
  regd_no: String,
  name: String,
  email: String,
  branch: String,


});

// User model definition
const User = mongoose.model("User", userSchema);

// GET route to serve form
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "form.html"));
});

// POST route for form submission
app.post("/post", async (req, res) => {
  const { regd_no, name, email, branch,phone } = req.body;
  
  try {
    // Create a new user document and save it to the database
    const user = new User({
      regd_no,
      name,
      email,
      branch,
    
    });
    await user.save();
    console.log(user);
    res.send("Form submission successful");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error submitting the form");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
