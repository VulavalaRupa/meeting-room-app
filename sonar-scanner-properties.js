const scanner = require('sonarqube-scanner');

scanner(
    {
        serverUrl: 'http://localhost:9000',
        login: "admin",
        // password: "anshu@123",
        token: "c854cb90702c2aced70f05b5dd4369e1ce8a3ea4",
        options: {
            'sonar.projectName': 'meeting-room-app',
            'sonar.projectKey': 'meeting-room-app',
            'sonar.projectVersion': '0.0.1',
            'sonar.exclusions': '',
            'sonar.sourceEncoding': 'UTF-8',
        }
    },
    () => process.exit()
)