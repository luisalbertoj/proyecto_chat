var app = angular.module('chat',[
    'ngMaterial',
     'users',
     'message',
     'ui.router',
     'LocalStorageModule'
]);

app.config(config);
app.run(run);

function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
    
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'components/login.html'
        })
        .state('registro', {
            url: '/registro',
            templateUrl: 'components/registro.html'
        })
        .state('chat', {
            url: '/chat',
            templateUrl: 'components/chat.html'
        })
        // nested list with just some random string data
        .state('home.paragraph', {
            url: '/paragraph',
            template: 'I could sure use a drink right now.'
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url: '/about',
            views: {
                '': { templateUrl: 'partial-about.html' },
                'columnOne@about': { template: 'Look I am a column!' },
                'columnTwo@about': {
                    templateUrl: 'table-data.html',
                    controller: 'scotchController'
                }
            }

        });

}

function run() {
    console.log('App corriendo');
    
}