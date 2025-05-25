# 🌌 Plateform Univers – Application Web Interactive

Une application web immersive pour visualiser le système solaire, consulter les données scientifiques sur les planètes et gérer les utilisateurs selon leur rôle (admin ou utilisateur).

---

## 🔭 Fonctionnalités principales

### 🌍 Accès public (sans login)
- Page d'accueil avec design spatial
- Actualités et nouveautés dans le domaine spatial

### 👤 Utilisateur
- Accès après authentification
- Carte interactive du système solaire
- Informations détaillées sur chaque objet céleste :
  - Données physiques
  - Structure interne (images)
  - Missions spatiales
  - Calculs (ex. poids sur la planète sélectionnée)

### 🛠️ Administrateur
- Gestion des utilisateurs : ajout, suppression, mise à jour
- Statistiques d'utilisation et connexions

---

## ⚙️ Technologies utilisées

| Domaine        | Technologie                   | Version recommandée     |
|----------------|-------------------------------|--------------------------|
| Backend        | Spring Boot                   | 3.2.x                    |
| Authentification | Spring Security             | intégré                  |
| Frontend       | Next.js + React               | Next.js 15.x, React 19.x |
| Visualisation  | Three.js, React Three Fiber   | Three.js 0.176           |
| Base de données|  MySQL           | configurable             |




## 📁 Structure du projet

```
Plateform_Univers/
├── Backend/               → Projet Spring Boot
│   └── auth/              → Système de login, gestion des rôles
├── Frontend/              → Projet Next.js + visualisation 3D
└── README.md              → Ce fichier
```

---

## 🧪 Instructions d'installation

### ✅ Prérequis
- Java JDK 17 ou supérieur
- Maven 3.9+
- Node.js 20+
- Git

### 🔹 Cloner le projet

```bash
git clone https://github.com/Wassila00/Plateform_Univers.git
cd Plateform_Univers
```

---

## ▶️ Lancement du projet

### 🟦 Lancer le backend Spring Boot

```bash
cd Backend/auth
mvn spring-boot:run
```

Serveur disponible sur : [http://localhost:8080](http://localhost:8080)

---

### 🟧 Lancer le frontend Next.js

```bash
cd Frontend
npm install
npm run dev
```

Interface disponible sur : [http://localhost:3000](http://localhost:3000)

---

### 🔁 Lancer les deux en même temps (optionnel)

1. Installer `concurrently` :

```bash
cd Frontend
npm install concurrently --save-dev
```

2. Ajouter dans `package.json` :

```json
"scripts": {
  "dev": "next dev",
  "backend": "cd ../Backend/auth && mvn spring-boot:run",
  "start-all": "concurrently \"npm run backend\" \"npm run dev\""
}
```

3. Lancer :

```bash
npm run start-all
```

---

## 👩‍🚀 Membres de l’équipe

- Wassila
- Rida
- Wafae
- Ali

---

## 📄 Licence

Projet open-source – Licence MIT

---

## 📬 Contact

En cas de questions, ouvrez un ticket GitHub ou contactez les membres de l'équipe.

## Conception

![Use case diagram](https://github.com/Wassila00/Plateform_univers/blob/wafae/Conception/use_case.png?raw=true)

![Diagramme_Sequence](https://github.com/Wassila00/Plateform_univers/blob/wafae/Conception/sequence.png?raw=true)

![Diagramme_Classes](https://github.com/Wassila00/Plateform_univers/blob/wafae/Conception/diagramme_classes?raw=true)



