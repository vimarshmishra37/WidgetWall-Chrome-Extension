const express = require("express");
const session = require("express-session");
const { google } = require("googleapis");
const path = require("path");
const crypto = require("crypto");
const cors = require("cors");

const oAuth2Client = new google.auth.OAuth2(
  "215941199593-uru7dgjiqu5p1vov99k7n73p0mhu80fu.apps.googleusercontent.com",
  "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",
  "http://localhost:3001/steps"
);

const scopes = [
  "https://www.googleapis.com/auth/fitness.activity.read",
  "https://www.googleapis.com/auth/fitness.blood_glucose.read",
  "https://www.googleapis.com/auth/fitness.blood_pressure.read",
  "https://www.googleapis.com/auth/fitness.body.read",
  "https://www.googleapis.com/auth/fitness.body_temperature.read",
  "https://www.googleapis.com/auth/fitness.heart_rate.read",
];

const secretKey = crypto.randomBytes(32).toString("hex");

const app = express();

app.use(cors());

app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/auth", (req, res) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });

  res.redirect(authUrl);
});

app.get("/steps", async (req, res) => {
  const { code } = req.query;

  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    req.session.tokens = tokens;
    // res.send(tokens);
    res.redirect("/fitness-data");
  } catch (error) {
    console.error("Error retrieving access token:", error);
    res.status(500).send("Authentication error");
  }
});

app.get("/fitness-data", async (req, res) => {
  try {
    const fitness = google.fitness({
      version: "v1",
      auth: oAuth2Client,
    });


    const sevenDaysInMilliseconds = 7 * 24 * 60 * 60 * 1000;

    const startTimeMillis = Date.now() - sevenDaysInMilliseconds;
    const endTimeMillis = Date.now();

    const response = await fitness.users.dataset.aggregate({
      userId: "me",
      requestBody: {
        aggregateBy: [
          {
            dataTypeName: "com.google.step_count.delta",
          },
        ],
        bucketByTime: { durationMillis: 86400000 },
        startTimeMillis,
        endTimeMillis,
      },
    });

    const fitnessData = response.data.bucket;
    const formattedData = [];

    fitnessData.map((data) => {
      const date = new Date(parseInt(data.startTimeMillis));
      const formattedDate = date.toDateString();

      const formattedEntry = {
        date: formattedDate,
        step_count: 0,
      };

      const datasetMap = data.dataset;
      datasetMap.map((mydataSet) => {
        const point = mydataSet.point;

        if (point && point.length > 0) {
          const value = point[0].value;
          switch (mydataSet.dataSourceId) {
            case "derived:com.google.step_count.delta:com.google.android.gms:aggregated":
              formattedEntry.step_count = value[0].intVal || 0;
              break;
            default:
              break;
          }
        }
      });

      formattedData.push(formattedEntry);
    });

    console.log("Fitness data Fetched");

    res.send({formattedData})
  } catch (error) {
    console.error("Error fetching fitness data:", error);
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
