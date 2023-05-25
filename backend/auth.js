function post(req, res) {
  if(req.session.loggedin) return res.redirect("/");
	if(req.body.username && req.body.password) {
    const logins = require("../json/logins.json");
    if(logins.find(l => l.username === req.body.username)) {
      if(logins.find(l => l.username === req.body.username && l.password === req.body.password)) {
        
        req.session.loggedin = true;
        req.session.username = req.body.username;
        req.session.password = req.body.password;
        req.session.avatar = "https://cdn.discordapp.com/embed/avatars/0.png";

        console.log(`> ${req.body.username} logged in!`);
        return res.redirect("/todo");
        
      } else return res.send(`Incorrect password entered for username: ${req.body.username}`);
    } else return res.send(`You entered a non-existent username: ${req.body.username}`);
  } else return res.send("Please enter a valid username & password!");
}

module.exports = { post }