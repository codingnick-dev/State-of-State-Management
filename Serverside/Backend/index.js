const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var cors = require('cors')
app.use(express.json()); //Make sure u have added this line
app.use(cors())
let userHistory = {};

app.get("/userHistory/last/:username", function (req, res) {
  if (!userHistory[req.params.username]) {
    userHistory[req.params.username] = { step: 0, history: [""] };
  }
  let step = userHistory[req.params.username].step;
  console.log(userHistory);
  let nextStep = step < userHistory[req.params.username].history.length;
  res.json({text: userHistory[req.params.username].history[step], nextStep: nextStep});
});

app.post("/userHistory/add/:username", function (req, res) {
  if (!userHistory[req.params.username]) {
    userHistory[req.params.username] = { step: 0, history: [req.body.text] };
  } else {
    let currentStep = userHistory[req.params.username].step;
    userHistory[req.params.username].step =
      userHistory[req.params.username].step + 1;
    userHistory[req.params.username].history.splice(currentStep + 1);
    userHistory[req.params.username].history.push(req.body.text);
  }
  res.json({text: req.body.text, nextStep: false});
});

app.get("/userHistory/stepback/:username", function (req, res) {
  if (
    userHistory[req.params.username] &&
    userHistory[req.params.username].step !== 0
  ) {
    let step = --userHistory[req.params.username].step;
	res.json({text: userHistory[req.params.username].history[step], nextStep: true});
  } else {
    res.json({text: userHistory[req.params.username].history[0], nextStep: true});
  }
});

app.get("/userHistory/stepforward/:username", function (req, res) {
  if (
    userHistory[req.params.username].history
  ) {
    let step = ++userHistory[req.params.username].step;
	let nextStep = step+1 < userHistory[req.params.username].history.length;
	res.json({text: userHistory[req.params.username].history[step], nextStep: nextStep});
  } else {
	res.json({text: "", nextStep: false});
  }
});

app.listen(3000);
