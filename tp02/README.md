# TP02 — Dockerisation de l'API (WIK-DPS-TP01 bonus)

L'API utilisée est celle du bonus du TP01 : serveur HTTP natif Node.js / TypeScript avec les routes `/ping` et `/stats`.

---

## Image single-stage (`Dockerfile`)

### Build & run

```bash
docker build -t tp02-api:single .
docker run -p 3000:3000 tp02-api:single
```

## Image multi-stage (`Dockerfile.multistage`)

### Build & run

```bash
docker build -t tp02-api:multi -f Dockerfile.multistage .
docker run -p 3000:3000 tp02-api:multi
```

### Stages

**Stage `build`** (`node:20-alpine`)
- Installe toutes les dépendances (y compris `typescript`, `@types/node`)
- Compile les sources TypeScript → `dist/`

**Stage `runtime`** (`node:20-alpine`)
- Ne reçoit du stage `build` que le dossier `dist/` compilé
- Pas de sources `.ts`, pas de compilateur TypeScript, pas de `node_modules`
- Résultat : image finale **31 MB plus légère** que la version single-stage

```dockerfile
COPY --from=build /app/dist ./dist
COPY package*.json ./
```

## Scan de vulnérabilités — Trivy

Commandes utilisées :

```bash
docker run --rm \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v trivy-cache:/root/.cache/ \
  aquasec/trivy:latest image tp02-api:single

docker run --rm \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v trivy-cache:/root/.cache/ \
  aquasec/trivy:latest image tp02-api:multi
```
## Test des endpoints

```bash
curl http://localhost:3000/ping
curl http://localhost:3000/stats
```
