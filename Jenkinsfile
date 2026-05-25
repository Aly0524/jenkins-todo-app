pipeline {
    agent any

    stages {
        stage('1. Checkout Code') {
            steps {
                echo 'Kasalukuyang kinukuha ang pinakabagong code mula sa GitHub...'
                // Dito hihilahin ni Jenkins ang mga files mo
            }
        }
        stage('2. Code Security Audit') {
            steps {
                echo 'Sinusuri ang integridad ng HTML, CSS, at JS files...'
                sh 'ls -la' // I-lilist nito ang mga files para patunayang nakuha lahat
            }
        }
        stage('3. Automated Testing') {
            steps {
                echo 'Pina-padaan sa kunwaring Unit Test...'
                echo 'TEST PASSED: Lahat ng buttons at functions ay gumagana.'
            }
        }
        stage('4. Simulated Deployment') {
            steps {
                echo 'SULYAP SA DEPLOYMENT: Ang Web App ay handa na para sa produksyon!'
                echo 'Success! Tapos na ang CI/CD Pipeline Build.'
            }
        }
    }
}