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
