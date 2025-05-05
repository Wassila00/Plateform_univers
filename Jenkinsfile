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
                    sh 'mvn clean install -DskipTests=false'
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

        stage('Archive Test Results') {
            steps {
                dir('Backend/auth') {
                    junit '**/target/surefire-reports/*.xml'
                }
            }
        }

        stage('Build Frontend (Next.js)') {
            steps {
                dir('Frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Déploiement à Docker/Kubernetes ici plus tard'
            }
        }
    }

    post {
        always {
            echo 'Pipeline terminé.'
        }
        success {
            echo 'Tout est OK ✅'
        }
        failure {
            echo 'Échec du pipeline ❌'
        }
    }
}
