let express = require("express");
let parser = require("ua-parser-js");

const app = (module.exports = express());

app.get("/api/whoami", (req, res) => {
  let software = parser(req.get("user-agent"));

  let data = {
    IP:
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress,
    Language: req.acceptsLanguages()[0],
    OS: software.os.name + " " + software.os.version
  };
  res.send(data);
});

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

const portnumber = process.env.PORT || 8000;

app.listen(portnumber, () => {
  console.log(`listening on port ${portnumber}`);
});
