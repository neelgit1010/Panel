// const express = require("express");
// const fs = require("fs");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const path = require("path");

// const app = express();
// app.use(bodyParser.json());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors());

// // Endpoint to handle user registration
// app.post("/register", (req, res) => {
//   const { email, username, password } = req.body;

//   // Read the existing data from MOCK_DATA.json
//   const filePath = path.join(
//     __dirname,
//     "../App/src/components/MOCK_DATA.json"
//   );

//   const newUserData = {
//     id: Math.floor(Math.random() * 1000),
//     email,
//     first_name: username,
//     pwd: password,
//   };

//   // Read the file asynchronously with a callback
//   fs.readFile(filePath, "utf8", (err, data) => {
//     if (err) {
//       console.error("Error reading file:", err);
//       return;
//     }
//     const mockData = JSON.parse(data);

//     // Do something with the mockData, like adding new user data
//     mockData.push(newUserData);

//     // Write the file asynchronously with a callback
//     fs.writeFile(filePath, JSON.stringify(mockData, null, 2), "utf8", (err) => {
//       if (err) {
//         console.error("Error writing to file:", err);
//         return;
//       }
//       console.log("User data successfully added!");
//     });
//   });

//   res.send("User registration successful");
// });

// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// -------------------------------------------------------------------------------------------------------

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();

// Connect to MongoDB
require("./models/db");

// Routes
const authRoute = require("./routes/auth");
const productsRoute = require("./routes/products");
const userDataRoute = require("./routes/userData");
const resetRoute = require("./utils/email");

const PORT = process.env.PORT || 5000;

app.get('/respond', (req, res) => res.send('Hello World!'));

app.use("/auth", authRoute);
app.use("/product", productsRoute);
app.use("/userData", userDataRoute);
app.use("/reset-password", resetRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
