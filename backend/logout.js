function post(req, res) {
  if(req.session.loggedin) {
    console.log(`> ${req.session.username} logged out!`);
		req.session.destroy();
		return res.redirect("/");
  } else return res.redirect("/");
}

module.exports = { post }