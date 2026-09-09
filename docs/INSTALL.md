# Initialisation de la base de données

## Configuration du `.env.example`

```
DB_HOST="localhost"
DB_PORT=5434
DB_USER="your_db_user"
DB_PASSWORD="your_password"
DB_NAME="your_db_name"
```

## Commande à exécuter à la racine du projet

### Création du .env
```shell
cp .env.example .env
```
### Création du container de la base de données
```shell
docker compose up -d
```

## Commandes à exécuter dans `app/backend`

### Installation des dépendances
```shell
npm install
```

### Exécution des migrations
```shell
npm run migration:run
```

### Ajout du mot du jour
```shell
npm run seed
```