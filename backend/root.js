const fs = require("fs");
const path = require("path");

function get(req, res) {
  const todo = fs.readFileSync("./backend/todo.html");
  if(req.session.loggedin) return res.send(
    todo.toString()
    .replaceAll("${req.session.avatar}", req.session.avatar)
    .replaceAll("${req.session.username}", req.session.username)
  );
  else return res.sendFile(path.join(__dirname + "/login.html"));
}

module.exports = { get }