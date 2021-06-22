const express = require("express");

const cors = require("cors");
const app = express();


app.use(cors({ optionSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

// require statements

app.get("/api/timestamp/:date_string?", (req, res) => {
  const date_string = req.params.date_string;
  let date;

  if (!date_string) {
    date = new Date();
  } else {
    if (!isNaN(date_string)) {
      date = new Date(parseInt(date_string, 10));
    } else {
      date = new Date(date_string);
    }
  }

  if (date.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  }
});

app.listen(process.env.PORT || 3000,
	() => console.log("Server is running..."));
