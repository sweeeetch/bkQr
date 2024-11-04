// server.js
const express = require("express");
const { google } = require("googleapis");
const cors = require("cors");
const fs = require("fs");

// Load service account credentials from the JSON file
const credentials = JSON.parse(fs.readFileSync("credentials.json", "utf-8"));

// Google Sheets ID (get it from the URL of your Google Sheet)
const SPREADSHEET_ID = "106928848018211240404";

const app = express();
app.use(cors());
app.use(express.json());

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

app.post("/api/addUser", async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber } = req.body;

    const sheets = google.sheets({ version: "v4", auth });
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "Sheet1!A:D", // Adjust the range if necessary
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[firstName, lastName, email, phoneNumber]],
      },
    });

    res.status(200).send("User data added to Google Sheets");
  } catch (error) {
    console.error("Error adding data to Google Sheets:", error);
    res.status(500).send("Failed to add data to Google Sheets");
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
