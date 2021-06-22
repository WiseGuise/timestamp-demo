const express = require("express");

const cors = require("cors");
const app = express();


app.use(cors({ optionSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

// require statements
app.get("/api/timestamp/", (req, res) => {
  var returnDate = new Date();
  res.json({ unix: returnDate.valueOf(), utc: returnDate.toUTCString() });
});




app.get("/api/timestamp/:date_string?", (req, res) => {
  var requireString = req.params.date_string;
  var returnDate;

  if (!isNaN(date_string) && date_string.length == 13) {
    date = (parseInt(date_string, 10));
  } else {
    if (/^/d{4}-{2}-{2}.test(requireString)) {
      requireString = parseInt(requireString);
      returnDate = new Date(requireString);
    } else {
      if (returnDate.getTime() !== returnDate.getTime()) {
        res.json({ error: "Invalid Date" });
      }
    } res.json({ unix: date.getTime(), utc: date.toUTCString() });
  });



app.listen(process.env.PORT || 3000,
	() => console.log("Server is running..."));
