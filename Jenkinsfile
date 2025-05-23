pipeline {
    agent any

    tools {
        maven 'Maven'
        jdk 'JDK17'
    }
  environment {
        REGISTRY = 'docker.io'    
        REPOSITORY = 'ssissila' 
       
        BACKEND_IMAGE = 'image-backend'   
        FRONTEND_IMAGE = 'image-frontend' 

        DOCKER_CREDENTIALS_ID = 'dockerhub-login' 
      
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
         stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: "${DOCKER_CREDENTIALS_ID}", 
                    usernameVariable: 'DOCKER_USER', 
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    bat """
                        echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
                    """
                }
            }
        }
   stage('Build and Push Docker Images') {
            steps {
                script {
                    def backendTag = "${REGISTRY}/${REPOSITORY}/${BACKEND_IMAGE}:${env.BUILD_NUMBER}"
                    def frontendTag = "${REGISTRY}/${REPOSITORY}/${FRONTEND_IMAGE}:${env.BUILD_NUMBER}"

                    bat "docker build -t ${backendTag} -f Backend/auth/Dockerfile ./Backend/auth"
                    bat "docker build -t ${frontendTag} -f Frontend/Dockerfile ./Frontend"

                    bat "docker push ${backendTag}"
                    bat "docker push ${frontendTag}"

                    writeFile file: '.env', text: """
                    BACKEND_IMAGE=${backendTag}
                    FRONTEND_IMAGE=${frontendTag}
                    """.stripIndent()
                }
            }
        }
          stage('Deploy with Docker Compose') {
                steps {
                    dir("${env.WORKSPACE}") {
                        withCredentials([usernamePassword(
                            credentialsId: "${DOCKER_CREDENTIALS_ID}",
                            usernameVariable: 'DOCKER_USER',
                            passwordVariable: 'DOCKER_PASS'
                        )]) {
                            bat 'echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin'
                        }
            
                        echo "📄 Vérifions le contenu du .env :"
                        bat 'type .env'
                        bat 'docker-compose down || exit 0'
                        bat 'docker-compose --env-file .env up -d'
                    }
                }
            }

    }
}
