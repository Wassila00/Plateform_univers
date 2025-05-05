pipeline {
    agent any

    tools {
        maven 'Maven'
        jdk 'JDK17'
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/Wassila00/Plateform_univers.git'
            }
        }

        stage('Build Backend (Spring Boot)') {
            steps {
                dir('Backend/auth') {
                    bat 'mvn clean install'
                }
            }
        }

        stage('Test Backend') {
            steps {
                dir('Backend/auth') {
                    bat 'mvn test'
                }
            }
        }

        stage('Build Frontend (Next.js)') {
            steps {
                dir('Frontend') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

       stage('Deploy with Docker Compose') {
            steps {
                bat 'docker-compose down || exit 0'
                bat 'docker-compose up --build -d'
            }
        }
    }
}
