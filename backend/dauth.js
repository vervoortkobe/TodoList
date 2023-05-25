const fetch = require("node-fetch");

async function getJSONRes(body) {
  let fullBody = "";

  for await (const data of body) {
    fullBody += data.toString();
  }
  return JSON.parse(fullBody);
}
  
async function get(req, res) {
  if(req.session.loggedin) return res.redirect("/");
  else {
    let code = req.query.code;
    if(!code) return res.redirect("/");
  
    if(code) {
      try {
        const tokenResData = await fetch("https://discord.com/api/oauth2/token", {
          method: "POST",
          body: new URLSearchParams({
            client_id: process.env.DISCORD_OAUTH2_CLIENTID,
            client_secret: process.env.DISCORD_OAUTH2_CLIENTSECRET,
            grant_type: "authorization_code",
            redirect_uri: process.env.DISCORD_OAUTH2_REDIRECTURI,
            scope: "identify",
            code
          }),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });

        if(tokenResData.status === 200) {
    
          const oauthData = await getJSONRes(tokenResData.body);
          //console.log(oauthData);
          
          const userResult = await fetch(`https://discord.com/api/users/@me`, {
            headers: {
              authorization: `${oauthData.token_type} ${oauthData.access_token}`,
            },
          });
    
          await getJSONRes(userResult.body).then(body => {
            console.log(body);
  
            req.session.loggedin = true;
            req.session.username = `${body.username}#${body.discriminator}`;
            req.session.avatar = `https://cdn.discordapp.com/avatars/${body.id}/${body.avatar}.png`;
  
            console.log(`> ${req.session.username} logged in using Discord!`);
            
            return res.redirect("/");
          });
          
        } else return res.send("Please enter a valid username & password!");
      } catch(err) {
        console.error(err);
      }
    }
  }
}

module.exports = { get }