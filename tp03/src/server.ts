import http from "node:http";
import os from "node:os";
import { MemoireCounterStore } from "./counterStore.js";

const port = process.env.PING_LISTEN_PORT || 3000;
const instanceId = process.env.INSTANCE_ID || os.hostname();
let datadriver = process.env.DATA_DRIVER || "in-memory";
let instance = null

if (datadriver === "in-memory") {
  instance = new MemoireCounterStore();
} else {
  console.error(`Data driver ${datadriver} not supported`);
  process.exit(1);
}

const server = http.createServer((req, res) => {
  instance!.increment();
  if (req.method === "GET" && req.url === "/ping") {
    // Affiche le hostname du conteneur a chaque requete -> visualise le load balancing
    console.log(`[${new Date().toISOString()}] /ping servi par ${os.hostname()}`);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ hostname: os.hostname(), headers: req.headers }));
    return;
  }
  if (req.method === "GET" && req.url === "/stats") {
    const stats = {
      totalRequests: instance!.get(),
      uptimeSeconds: Math.floor(process.uptime()),
      instanceId: instanceId,
    };
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(stats));
    return;
  }
  res.statusCode = 404;
  res.end();
});

server.listen(port, () => {
  console.log(`serveur lancé sur le port ${port}`);
});
