import http from "node:http";

const port = process.env.PING_LISTEN_PORT ;
const server = http.createServer((req, res) => {
  if (req.method !== "GET" || req.url !== "/ping") {
    res.statusCode = 404;
    res.end();
    return;
  }
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.headers));
});

server.listen(port, () => {
  console.log(`serveur lancé sur le port ${port}`);
});
