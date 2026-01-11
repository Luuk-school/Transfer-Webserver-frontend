pipeline {
    agent {
        docker { image 'node:24' }
    }

    environment {
        REPO_NAME = "frontend"
        IMAGE_NAME = "luukschool/frontend"
        IMAGE_TAG = "${BUILD_NUMBER}"
        DOCKER_VM = "192.168.1.3"
        SSH_CREDENTIALS_ID = "docker-vm-ssh"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install') {
            steps {
                // Use a local npm cache inside the workspace
                sh '''
                    export NPM_CONFIG_CACHE=$PWD/.npm-cache
                    npm ci
                '''
            }
        }

        stage('Build') {
            steps {
                sh '''
                    export NPM_CONFIG_CACHE=$PWD/.npm-cache
                    npm run build
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh """
                docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .
                docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${IMAGE_NAME}:latest
                """
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh """
                    echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                    docker push ${IMAGE_NAME}:${IMAGE_TAG}
                    docker push ${IMAGE_NAME}:latest
                    """
                }
            }
        }

        stage('Deploy to Docker VM') {
            steps {
                sshagent([SSH_CREDENTIALS_ID]) {
                    sh """
                    ssh ridderleeuw@${DOCKER_VM} '
                      cd ~/deploy && \
                      docker pull ${IMAGE_NAME}:latest && \
                      docker compose up -d ${REPO_NAME}
                    '
                    """
                }
            }
        }
    }
}
