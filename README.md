[![Maintainability](https://api.codeclimate.com/v1/badges/155b98b38add2c148346/maintainability)](https://codeclimate.com/github/etalab/entreprise.data.gouv.fr/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/155b98b38add2c148346/test_coverage)](https://codeclimate.com/github/etalab/entreprise.data.gouv.fr/test_coverage)

# entreprise.data.gouv.fr

Ce site est disponible en ligne : [Entreprise.data.gouv.fr](https://entreprise.data.gouv.fr)

Dans le cadre du SPD, (Service Public de la Donnée), certains jeux de données
dont les fichiers SIRENE et RNA sont devenus publics.

Le site entreprise.data.gouv.fr a pour vocation de mettre à disposition des citoyens les données ouvertes "Open-data".

## Exécution en local

Entreprise.data.gouv.fr est développé avec Node `lts`.

``` bash
# Installation
npm install

# Aprés avoir lancé le front-end avec la commande
npm run dev

# Lancer le back-end : dans le dossier sirene_as_api / rna_as_api, exécuter :
rails s

# Lancer le serveur SOLR :
rake sunspot:solr:start

```

## Dev

``` bash
# Lancer les tests
npm run test

# Construire pour la production
npm run build:production

```

## Tests

``` bash
# Tous les tests
npm run test

# Tests unitaires
npm run unit

# Mise à jour des snapshots
npm run unit -- -u

# Tests end2end environnement dev
nightwatch

# Tests end2end environnement sandbox
nightwatch --env sandbox

# Tests end2end environnement production
nightwatch --env production
```
Attention, les tests end2end avec nightwatch peuvent être capricieux, par exemple selon la taille de la fenêtre disponible pour le navigateur de test.
Les tests d'une branche (develop/dev) peuvent ne pas fonctionner sur une autre (master/production).

Ces tests étant end2end, vous avez besoin des applications backend ET frontend fonctionnelles sur localhost si vous désirez tester en développement.

## Déploiement

Un script Mina (et un Rakefile) est disponible pour déployer automatiquement sur l'infra entreprise.data.gouv.fr :
``` bash
# sur un seul serveur
bundle exec mina deploy domain=url.du.serveur to=sandbox

# sur les deux serveurs
bundle exec rake deploy to=production
```

Par défaut `to` est à _sandbox_.

## Licence

Ce projet est sous [license MIT](https://fr.wikipedia.org/wiki/Licence_MIT)
