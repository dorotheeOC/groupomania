# Groupomania

P7 du parcours developpeur web chez OpenClassrooms:
Créer un réseau social d'entreprise

## Base de données

### Connexion

* Importer le fichier `mysql -u root -p  <  Chemin de votre ordinateur/groupomania.sql` sur votre serveur mySql
* Exécuter la commande suivante:
```bash
mysql -u root -p groupomania;
```
* Ajouter votre mot de passe dans la section `PASSWORD` dans le fichier `..backend/config/db.config.js` et sauvegarder

## Backend

développé avec nodeJS express & Sequelize (mySql)

### Installation & Utilisation

```bash
$ npm install
$ nodemon server
```

## Frontend

développé avec VueJS & Bootstrap

### Installation & Utilisation

```bash
$ npm install
$ npm run serve
```
Utiliser les identifiants fournis dans l'archive

