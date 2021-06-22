const express = require("express");

const cors = require("cors");
const app = express();
const port = process.env.port || 3000;

app.use(cors({ optionSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

// require statements

app.get("/api/timestamp/:dateString?", (req, res) => {
  const dateString = req.params.dateString;
  let date;

  if (!dateString) {
    date = new Date();
  } else {
    if (!isNaN(dateString)) {
      date = new Date(parseInt(dateString, 10));
    } else {
      date = new Date(dateString);
    }
  }

  if (date.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
