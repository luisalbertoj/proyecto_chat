angular.module('users').service('userService', UserService);
function UserService() {
    var users = [
        {name:'luis', 
        msg: [
            {emisor: 'viviana',content: 'Hola luis', hora: '10:58 pm'},
            {emisor: 'luis',content: 'Hola viviana', hora: '11:00 pm'},
            {emisor: 'viviana',content: 'como estas', hora: '11:02 pm'},
            {emisor: 'luis',content: 'bien y tu', hora: '10:58pm'}
        ]},
        {name:'viviana', 
        msg: [
            {emisor: 'viviana',content: 'Hola luis', hora: '10:58 pm'},
            {emisor: 'luis',content: 'Hola viviana', hora: '11:00 pm'},
            {emisor: 'viviana',content: 'como estas', hora: '11:02 pm'},
            {emisor: 'luis',content: 'bien y tu', hora: '10:58pm'},
            {emisor: 'luis',content: 'Hola viviana', hora: '11:00 pm'},
            {emisor: 'viviana',content: 'Hola luis', hora: '10:58 pm'}
        ]}
    ]
    this.getAll = function() {
        return (users);
    };
}