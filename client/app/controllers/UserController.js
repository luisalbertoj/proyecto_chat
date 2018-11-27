(function(){
    angular.module('users').controller('UserController', UserController);
    function UserController( userService, $http, $scope, localStorageService, $state){
        var self = this;
        $scope.friend = {};
        $scope.message = {};
        $scope.newUser = {};
        $scope.validacion = true;
        $scope.user = {};
        self.selected = null;    
        self.selectUser = function(user){
            self.selected = user;
            console.log(user);
        }
        
        $scope.usuarioActual = localStorageService.get("user");
        self.addUser = function(){
            $http.post("http://localhost:1337/register",{
                username: $scope.newUser.username,
                email: $scope.newUser.email,
                password: $scope.newUser.password
            }).then(function(response){
                if (response.data.user) {
                    localStorageService.set("user", response.data.user);
                    console.log(response.data.user);
                    $state.go('chat')   
                }
                
            },function (error){
                console.log(error);
            });  
        }
        self.logout = function(){
            $http.post("http://localhost:1337/logout").then(function(response){
                        console.log(response.data);
                        localStorageService.remove('user');
                        $state.go('login');
                },function (error){
                    console.log(error);
                });
        }
        self.isLoged = function(){
            if(localStorageService.get('user')){
                console.log("logeado");
                $state.go('chat');
            }else{
                console.log("no logueado");
                $state.go('login');
            }
        }
        self.login = function() {
            $http.post("http://localhost:1337/login",{
                username: $scope.user.username,
                password: $scope.user.password
            }).then(function(response){
                if (response.data.user) {
                    localStorageService.set("user", response.data.user);
                    console.log(response.data.user);
                    $state.go('chat');
                }
                if(!response.data) {
                    $scope.validacion= false;
                }
                
                
            },function (error){
                console.log(error);
            });  

        }
        self.getFirends = function() {
            $http.post("http://localhost:1337/login",{
                username: $scope.user.username,
                password: $scope.user.password
            }).then(function(response){
                if (response.data.user) {
                    localStorageService.set("user", response.data.user);
                    console.log(response.data.user);
                    $state.go('chat')   
                }
                console.log(response.data);
                if(!response.data) {
                    $scope.validacion= false;
                }
                
                
            },function (error){
                console.log(error);
            });  
        }
        self.addFriend = function(){
                $http.post("http://localhost:1337/usuario",{
                username: $scope.friend.username
                }).then(function(response){
                console.log(response.data);
                if (response.data.success) {
                   $scope.friend = response.data.data[0];
                   $http.post("http://localhost:1337/friend",{
                        id: localStorageService.get("user").id,
                        idFriend: $scope.friend.id
                        }).then(function(response){
                        console.log(response.data);
                        if (response.data.success) {
                            self.getAllFriends();
                            console.log(response.data.message);
                            
                        }else{
                        console.log(response.data.message)
                        }
                        
                    },function (error){
                        console.log(error);
                    });


                }else{
                   console.log(response.data.message)
                }
                
            },function (error){
                console.log(error);
            });  
        }
        self.getUser = function() {
            console.log($scope.friend.username);
                $http.post("http://localhost:1337/usuario",{
                username: $scope.friend.username
            }).then(function(response){
                console.log(response.data);
                if (response.data.success) {
                   $scope.friend = response.data.data[0];
                    console.log(response.data.data[0]); 
                }else{
                   console.log(response.data.message)
                }
                
            },function (error){
                console.log(error);
            });  
        }
        self.getAllFriends= async  function(){
            $http.post("http://localhost:1337/getfriends",{
                 id: localStorageService.get("user").id
                 }).then(function(response){
                 if (response.data.success) {
                     
                     var users = response.data.data.friends;
                     
                     $scope.users = users;
                     self.selected = $scope.users[0];
                     mySocket.get('/chatMessage', function(messages, response) {
                         console.log(messages.data);
                         $scope.messages = messages.data;
                    });
                    console.log($scope.usuarioActual);
                 }else{
                    console.log(response.data.message)
                     return [];
                 
                 }
                 
             },function (error){
                 console.log(error);
             });
        }
        $scope.users = [];
        self.sendMessage = function(){
            if($scope.message.content == ""){
                console.log("mensaje vacio");
            }else{
                mySocket.post("http://localhost:1337/newMessage",{
                    message: $scope.message.content,
                    createdBy: localStorageService.get("user").id,
                    idFriend: self.selected.id
                 }, function(resData, jwRes) {
                    if(jwRes.statusCode != 200) {
                        console.log("error" + resData.message);
                    } else {
                        console.log(resData)
                        $scope.message.content = " ";
                    }
                });
            }

            /*$http.post("http://localhost:1337/newMessage",{
                    message: $scope.message.content,
                    createdBy: localStorageService.get("user").id,
                    idFriend: self.selected.id
                 }).then(function(response){
                 if (response.data.success) {
                    console.log(response.data);
                     
                 }else{
                    console.log(response.data.message)                 
                 }
                 
             },function (error){
                 console.log(error);
             });*/
        }
        self.renderNewMessage = function(data){
            $scope.messages.push(data);
        }
        mySocket.on('mensajeSend', function (data) {
            self.renderNewMessage(data);
          });
        if($state.current.name === 'chat'){
            self.getAllFriends();
        }  
    }
})();