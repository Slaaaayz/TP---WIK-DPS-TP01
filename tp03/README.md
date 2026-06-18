# TP03 — docker-compose, réplicas & reverse-proxy nginx

Reprise de l'API du TP02 (`/ping`, `/stats`) orchestrée avec Docker Compose :
4 réplicas de l'API derrière un reverse-proxy nginx qui équilibre la charge.
Seul nginx est exposé sur l'hôte (port **8080**).

## Lancer

```bash
cd tp03
docker compose up -d --build
docker compose ps          
```

## Observer l'équilibrage de charge

Terminal 1 — suivre les logs des réplicas :

```bash
docker compose logs -f api
```

Terminal 2 — envoyer plusieurs requêtes :

```bash
for i in $(seq 1 20); do curl -s http://localhost:8080/ping | head -c 60; echo; done
```

Chaque réponse contient `"hostname"` et les logs affichent des hostnames
différents (`api-1`, `api-2`, …) : la charge est bien répartie sur les 4 réplicas.

## Arrêter

```bash
docker compose down
```
