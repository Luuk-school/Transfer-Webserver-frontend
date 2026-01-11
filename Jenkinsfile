pipeline {
  agent any

  environment {
    REGISTRY = "docker.io/luukschool"
    IMAGE = "transfer-frontend"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build Docker image') {
      steps {
        sh 'docker build -t $REGISTRY/$IMAGE:latest .'
      }
    }

    stage('Push Docker image') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'dockerhub',
          usernameVariable: 'DOCKER_USER',
          passwordVariable: 'DOCKER_PASS'
        )]) {
          sh '''
          echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
          docker push $REGISTRY/$IMAGE:latest
          '''
        }
      }
    }
  }
}
