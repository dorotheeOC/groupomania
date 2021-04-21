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
* Renommer le fichier `.dist.env` >>> `.env` et le compléter avec les informations fournies.
* Ajouter votre mot de passe dans la section `DB_PASS` dans le fichier `.env` et sauvegarder

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

