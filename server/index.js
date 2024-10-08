const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Endpoint to handle user registration
app.post("/register", (req, res) => {
  const { email, username, password } = req.body;

  // Read the existing data from MOCK_DATA.json
  const filePath = path.join(
    __dirname,
    "../App/src/components/MOCK_DATA.json"
  );

  const newUserData = {
    id: Math.floor(Math.random() * 1000),
    email,
    first_name: username,
    pwd: password,
  };

  // Read the file asynchronously with a callback
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    const mockData = JSON.parse(data);

    // Do something with the mockData, like adding new user data
    mockData.push(newUserData);

    // Write the file asynchronously with a callback
    fs.writeFile(filePath, JSON.stringify(mockData, null, 2), "utf8", (err) => {
      if (err) {
        console.error("Error writing to file:", err);
        return;
      }
      console.log("User data successfully added!");
    });
  });

  res.send("User registration successful");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
