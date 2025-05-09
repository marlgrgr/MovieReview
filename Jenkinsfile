pipeline {
    agent any
    
    parameters {
        choice(name: 'ENVIRONMENT', choices: ['local', 'production'], description: 'Select the deployment environment')
    }
	
	tools {
        nodejs 'Node-24'
    }
    
    environment {
        CONFIG_FILE_ID = "movie-review-properties-${ENVIRONMENT}"
        DOCKER_IMAGE = "movie-review"
        APP_NAME = "movie-review"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }
		
        stage('Build project') {
            steps {
                sh 'npm run build'
            }
        }
        
        stage('Prepare Config') {
            steps {
                configFileProvider([configFile(fileId: "${CONFIG_FILE_ID}", targetLocation: '.env.production')]) {
                    echo "Environmental file loaded from Config File Manager"
                }
            }
        }
        
        stage('Docker Build') {
            steps {
                script {
                    sh "docker build -t ${DOCKER_IMAGE}:latest ."
                }
            }
        }
        
        stage('Deploy') {
            steps {
                script {
					sh """
						docker stop ${APP_NAME} || true
						docker rm ${APP_NAME} || true
						
						docker run -d --name ${APP_NAME} \
							-p 3000:80 \
							${DOCKER_IMAGE}:latest
					"""
                }
            }
        }
        
        stage('Verify Deployment') {
            steps {
                sh "docker logs ${APP_NAME}"
                sh "docker ps | grep ${APP_NAME}"
            }
        }
        
        stage('Cleanup Dangling Images') {
            steps {
                script {
                    sh """
                        echo "Cleanup Dangling Images"
                        docker image prune -f
                    """
                }
            }
        }
    }
    post {
        success {
            echo 'The pipeline has been completed successfully'
        }
        failure {
            echo 'The pipeline has failed'
        }
    }
}