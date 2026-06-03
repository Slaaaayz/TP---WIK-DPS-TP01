# Ping API — Bonus

Petite API HTTP en TypeScript, avec le module `http` natif de Node.js.
Cette version ajoute un compteur de requêtes et une route `/stats`, pour
préparer l'API à tourner en plusieurs instances.

## Ce que fait l'API

- `GET /ping` → renvoie les headers de la requête au format **JSON** (code `200`)
- `GET /stats` → renvoie les statistiques du serveur au format **JSON** (code `200`) :
  - `totalRequests` : nombre total de requêtes reçues depuis le démarrage (`/ping` comprise)
  - `uptimeSeconds` : temps de fonctionnement du serveur en secondes
  - `instanceId` : identifiant de l'instance (`INSTANCE_ID` sinon le hostname)
- **Tout le reste** → réponse vide avec le code `404`

Le compteur s'incrémente à **chaque** requête reçue (donc `/ping` et `/stats` comprises).

### Le compteur derrière une interface

Le stockage du compteur est isolé derrière une interface `CounterStore`
(voir `src/counterStore.ts`), ce qui permet de changer facilement d'implémentation (en mémoire, Redis, etc.)

## Configuration

Le port d'écoute est défini par la variable d'environnement `PING_LISTEN_PORT`.
On peut aussi définir `INSTANCE_ID` pour donner un nom à l'instance.

On peut les définir dans le fichier `.env` :

```
PING_LISTEN_PORT=3000
# INSTANCE_ID=instance-1
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

# Renvoie les statistiques en JSON (200)
curl http://localhost:3000/stats

# Réponse vide (404)
curl http://localhost:3000/autre
curl -i -X POST http://localhost:3000/ping
```

## Plusieurs instances

Chaque instance a son **propre compteur en mémoire**. Si on lance deux instances,
chacune a son propre `totalRequests`, et `instanceId` permet de savoir laquelle a
répondu :

```bash
INSTANCE_ID=A PING_LISTEN_PORT=3000 node dist/server.js
INSTANCE_ID=B PING_LISTEN_PORT=3001 node dist/server.js
```
