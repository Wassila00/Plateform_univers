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
                            bat """
                                echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
                                echo === .env content ===
                                type .env
                                echo === docker-compose config ===
                                docker-compose --env-file .env config
                                echo === pulling manually for test ===
                                docker pull %FRONTEND_IMAGE%
                                docker pull %BACKEND_IMAGE%
                                docker-compose --env-file .env down || exit 0
                                docker-compose --env-file .env up -d
                            """
                        }
                    }
                }
            }


    }
}
