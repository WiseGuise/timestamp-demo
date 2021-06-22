const express = require("express");

const cors = require("cors");
const app = express();


app.use(cors({ optionSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

// require statements

app.get("/api/timestamp/:dateString?", (req, res) => {
  const dateString = req.params.dateString;
  let dateRequest;

  if (!dateString) {
    dateRequest = new Date();
  } else {
    if (!isNaN(dateString)) {
      dateRequest = new Date(parseInt(dateString, 10));
    } else {
      dateRequest = new Date(dateString);
    }
  }

  if (date.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({ unix: dateRequest.getTime(), utc: dateReqest.toUTCString() });
  }
});

app.listen(process.env.PORT || 3000,
	() => console.log("Server is running..."));
