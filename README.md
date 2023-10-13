# Front-end Technical Test

Il s'agit d'une application web conçue pour permettre aux utilisateurs de discuter et d'également créer des conversations.

## Prérequis

Avant de commencer, assurez-vous d'avoir les prérequis suivants installés sur votre machine :

- Node.js version 18.X ou supérieure. Node.js est une plateforme logicielle qui vous permet d'exécuter du code JavaScript sur votre machine. Vous pouvez télécharger Node.js à partir de [ici](https://nodejs.org/en/download/).
- Git, un système de contrôle de version. Git est un outil essentiel pour tout développeur, permettant de suivre les modifications apportées au code et de collaborer avec d'autres développeurs. Vous pouvez le télécharger à partir de [ici](https://git-scm.com/downloads).

## Résultat test de performance 

![résultat test de performance](/public/performance.png)

## Commencer

Suivez ces étapes pour installer et exécuter le projet sur votre machine locale :

### 1. Cloner le dépôt

Ouvrez un terminal et exécutez la commande suivante pour cloner le dépôt :

```bash
git clone https://github.com/NicolasDeGouveia/frontend-technical-test
```

### 2. Accéder au répertoire du projet

Naviguez vers le répertoire du projet en utilisant la commande suivante :

```bash
cd frontend-technical-test
```

### 3. Installer les dépendances

Installez toutes les dépendances nécessaires en utilisant la commande suivante :

```bash
npm install
```

### 4. Créer le fichier .env.local

Assurez-vous que vous êtes dans le répertoire du projet (`frontend-technical-test`) et créez un fichier `.env.local` à la racine du projet.

### 5. Ajouter l'URL de l'API au fichier .env.local

Ajoutez l'URL de l'API suivantes au fichier `.env.local` :

```plaintext
NEXT_PUBLIC_API_URL='API URL'

Remplacez 'API URL' par l'URL de votre API.
Le port par défaut de l'API est 3005.
```

### 6. Exécuter le serveur

Exécutez le serveur en utilisant la commande suivante :

```bash
npm run start-server
```

### 7. Exécuter l'application

 Dans un autre terminal, exécutez l'application en utilisant la commande suivante :

```bash
npm run build
npm run start
```

### 7. Accéder à l'application

Ouvrez votre navigateur web et accédez à [http://localhost:3000](http://localhost:3000) pour voir le résultat.
