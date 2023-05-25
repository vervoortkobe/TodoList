const express = require("express");
const path = require("path");
const fs = require("fs");
const morgan = require("morgan");
const session = require("express-session");
require("dotenv").config();
const PORT = 3000;

const app = express();

app.use(session({
	secret: process.env.EXPRESS_APP_SESSIONSECRET,
	resave: true,
	saveUninitialized: true
}));

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  require("./backend/root.js").get(req, res);
});

app.get("/login", (req, res) => {
  return res.redirect("/");
});

app.post("/login", (req, res) => {
  return res.redirect("/");
});

app.get("/auth", (req, res) => {
  return res.redirect("/");
});

app.post("/auth", (req, res) => {
  require("./backend/auth.js").post(req, res);
});

app.get("/dlogin", (req, res) => {
  return res.redirect(process.env.AUTHURL);
});

app.post("/dlogin", (req, res) => {
  return res.redirect("/");
});

app.get("/dauth", (req, res) => {
  require("./backend/dauth.js").get(req, res);
});

app.post("/logout", (req, res) => {
  require("./backend/logout.js").post(req, res);
});

app.get("/ping", (req, res) => {
  return res.send("online");
});

app.get("*", (req, res) => {
  return res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`⚡ | WebServer listening on [http://localhost${PORT}]!`);
});
