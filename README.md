# Ping API

Petite API HTTP en TypeScript, avec le module `http` natif de Node.js.

## Ce que fait l'API

- `GET /ping` → renvoie les headers de la requête au format **JSON** (code `200`)
- **Tout le reste** → réponse vide avec le code `404`

## Configuration

Le port d'écoute est défini par la variable d'environnement `PING_LISTEN_PORT`.

On peut la définir dans le fichier `.env` :

```
PING_LISTEN_PORT=3000
```

## Installation

```bash
npm install
```

## Lancer le serveur

```bash
npm run dev      # compile puis démarre
# ou en deux étapes :
npm run build    # compile le TypeScript dans dist/
npm start        # lance dist/server.js
```

## Tester

```bash
# Renvoie les headers en JSON (200)
curl http://localhost:3000/ping

# Réponse vide (404)
curl http://localhost:3000/autre
curl -i -X POST http://localhost:3000/ping
```

