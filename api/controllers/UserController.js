/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    addFriend: function(req, res){
        console.log(req.param('id') + " otro id " + req.param('idFriend'));
        User.addToCollection((req.param('id')), 'friends', (req.param('idFriend')))
        .exec(async function (err, result) {
            if(err) return res.send(err);
                var createdChat = await Chat.create().fetch();
                console.log("añadir "+ req.param('id') + " otro id " + req.param('idFriend'));
                Chat.addToCollection(createdChat.id,'users',[req.param('id'),req.param('idFriend')])
                .exec(function (err, result) {
                    if(err) return res.send(err);
                })
                return res.send({
                    'success': true,
                    'message': 'Amigo agregado',
                    'data': result
                });
            

        });
    },
    getFriends: function(req, res){
        User.findOne(req.param('id')).populate('friends')
        .exec(function (err, result) {
            if(err) return res.send(err);
                return res.send({
                    'success': true,
                    'message': 'Amigos encontrados',
                    'data': result
                });
        });
    },
    get: function(req, res){
        User.find()
            .then(function(users){
                if(!users|| users.length == 0){
                    return res.send({
                         'success': false,
                         'message': 'No se encontraron usuarios'
                    })
                }
                return res.send({
                    'success': true,
                    'message': 'Usuarios recuperados correctamente',
                    'data': users
               })
            })
            .catch(function(err){
                sails.log.debug(err);
                return res.send({
                    'success': false,
                    'message': 'Peticion fallida',
                    'data': err
                })
            });
    },
    getUserUsername: function(req, res){
        console.log(req.param('username'));
        User.find({username: req.param('username')})
            .then(function(user){
                if(!user){
                    return res.send({
                         'success': false,
                         'message': 'No se encontraron usuarios'
                    })
                }
                return res.send({
                    'success': true,
                    'message': 'Usuarios recuperados correctamente',
                    'data': user
               })
            })
            .catch(function(err){
                sails.log.debug(err);
                return res.send({
                    'success': false,
                    'message': 'Peticion fallida',
                    'data': err
                })
            });
    }
};

