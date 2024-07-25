const express = require("express");
const bodyParser = require("body-parser");
const { OAuth2Client } = require("google-auth-library");
const { google } = require("googleapis");
const axios = require("axios");
const session = require("express-session");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

const oauth2Client = new OAuth2Client(
  "215941199593-uru7dgjiqu5p1vov99k7n73p0mhu80fu.apps.googleusercontent.com",
  "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",
  "http://localhost:3001/steps"
);

app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using https
  })
);

// Route to start the OAuth flow
app.get("/auth", (req, res) => {
  const authorizeUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/fitness.activity.read",
      "https://www.googleapis.com/auth/fitness.location.read",
    ],
  });
  res.redirect(authorizeUrl);
});

// OAuth2 callback route
app.get("/steps", async (req, res) => {
  const { code } = req.query;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    req.session.tokens = tokens;
    res.redirect("/fitness-data");
  } catch (error) {
    console.error("Error retrieving access token:", error);
    res.status(500).send("Authentication error");
  }
});

// Route to fetch step count data
app.get("/fitness-data", async (req, res) => {
  if (!req.session.tokens) {
    return res.status(401).send("User not authenticated");
  }

  oauth2Client.setCredentials(req.session.tokens);

  const fitness = google.fitness({ version: "v1", auth: oauth2Client });

  const startTime = new Date();
  startTime.setHours(0, 0, 0, 0); // Start of today
  const endTime = new Date();

  const startTimeNs = startTime.getTime() * 1e6; // Convert to nanoseconds
  const endTimeNs = endTime.getTime() * 1e6; // Convert to nanoseconds

  try {
    const result = await axios({
      method: "POST",
      headers: {
        Authorization: "Bearer " + req.session.tokens.access_token,
      },
      "Content-Type": "application/json",
      url: `https://www.googleapis.com/fitness/v1/users/me/dataSources`,
      data: {
        aggregateBy: [
          {
            dataTypeName: "com.google.step_count.delta",
            dataSourceId:
              "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps",
          },
        ],
        bucketByTime: { durationMillis: 86400000 },
        startTimeMillis: 1627776000000,
        endTimeMillis: 1627862399999,
      },
    });

    console.log(result);
    res.json(result)
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
