import express from "express";
import { google } from "googleapis";
import request from "request";
import cors from "cors";
import URLParse from "url-parse";
import queryParse from "query-string";
import bodyParser from "body-parser";
import axios from "axios";

// 215941199593-uru7dgjiqu5p1vov99k7n73p0mhu80fu.apps.googleusercontent.com

// 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

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  const oauth2Client = new google.auth.OAuth2(
    "215941199593-uru7dgjiqu5p1vov99k7n73p0mhu80fu.apps.googleusercontent.com",
    "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",
    "http://localhost:3001/steps"
  );

  const scopes = [
    "https://www.googleapis.com/auth/fitness.activity.read  profile email openid",
  ];

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    state: JSON.stringify({
      callbackUrl: req.body.callbackUrl,
      userID: req.body.userID,
    }),
  });

  request(url, (err, response, body) => {
    console.log("error", err);
    console.log("StatusCode", response && response.statusCode);

    res.send({ url });
  });
});

app.get("/steps", async (req, res) => {
  const queryURL = new URLParse(req.url);
  const code = queryParse.parse(queryURL.query).code;

  const oauth2Client = new google.auth.OAuth2(
    "215941199593-uru7dgjiqu5p1vov99k7n73p0mhu80fu.apps.googleusercontent.com",
    "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",
    "http://localhost:3001/steps"
  );

  const tokens = await oauth2Client.getToken(code);
  console.log(tokens)
  res.send("everything is fine");

  let stepArray = [];

  try {
    const result = await axios({
      method: "POST",
      headers: {
        Authorization: "Bearer " + tokens.tokens.access_token,
      },
      "Content-Type": "application/json",
      url: `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
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
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
