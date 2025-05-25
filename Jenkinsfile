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
                    bat 'set NEXT_FORCE_SWCPP=1 && npm run build'
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
        stage('Check Minikube') {
            steps {
                bat '''
                    minikube status || minikube start --driver=docker --apiserver-name=localhost
                '''
            }
        }
        stage('Kubernetes Deployment') {
            steps {
                script {
                    def backendTag = "${REGISTRY}/${REPOSITORY}/${BACKEND_IMAGE}:${env.BUILD_NUMBER}"
                    def frontendTag = "${REGISTRY}/${REPOSITORY}/${FRONTEND_IMAGE}:${env.BUILD_NUMBER}"

                    writeFile file: 'k8s/k8s-deploy.yaml', text: """
            --- 
            apiVersion: apps/v1
            kind: Deployment
            metadata:
              name: backend-deployment
            spec:
              replicas: 1
              selector:
                matchLabels:
                  app: backend
              template:
                metadata:
                  labels:
                    app: backend
                spec:
                  containers:
                    - name: backend
                      image: ${backendTag}
                      ports:
                        - containerPort: 8080

            ---
            apiVersion: v1
            kind: Service
            metadata:
              name: backend-service
            spec:
              selector:
                app: backend
              ports:
                - port: 8080
                  targetPort: 8080
              type: ClusterIP

            ---
            apiVersion: apps/v1
            kind: Deployment
            metadata:
              name: frontend-deployment
            spec:
              replicas: 1
              selector:
                matchLabels:
                  app: frontend
              template:
                metadata:
                  labels:
                    app: frontend
                spec:
                  containers:
                    - name: frontend
                      image: ${frontendTag}
                      ports:
                        - containerPort: 3000

            ---
            apiVersion: v1
            kind: Service
            metadata:
              name: frontend-service
            spec:
              selector:
                app: frontend
              ports:
                - port: 3000
                  targetPort: 3000
                  nodePort: 32000
              type: NodePort
                    """.stripIndent()
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                dir("${env.WORKSPACE}") {
                    echo '🚀 Déploiement dans le cluster Kubernetes...'
                    bat 'kubectl apply -f k8s/k8s-deploy.yaml'
                }
            }
        }
    }

    post {
        always {
            echo ' Nettoyage du workspace Jenkins...'
            cleanWs()

            echo ' Nettoyage Docker...'
             bat 'docker system prune -af' 
        }
    }
}
