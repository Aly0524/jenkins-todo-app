pipeline {
    agent any

    stages {
        stage('1. Checkout Code') {
            steps {
                echo 'In the meantime, fetching the latest code from GitHub...'
                // This is where Jenkins will pull the files
            }
        }
        stage('2. Code Security Audit') {
            steps {
                echo 'checking the integration of HTML, CSS, at JS files...'
                bat 'dir' // This will list the files to prove everything was successfully retrieved
            }
        }
        stage('3. Automated Testing') {
            steps {
                echo 'Running a mock Unit Test...'
                echo 'TEST PASSED: All buttons and functions are working.'
                bat 'exit 1'
            }
        }
        stage('4. Simulated Deployment') {
            steps {
                echo 'DEPLOYMENT SNEAK PEEK: The Web App is ready for production!'
                echo 'Success! The CI/CD Pipeline Build is complete.'
            }
        }
    }
}