/**
 * MessagesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    newMessage: async function(req, res){
        var msg = await Messages.create(req.allParams()).fetch()
        .exec(async function (err, result) {
            if(err) return res.send(err);
               /* console.log("añadir "+ req.param('createdBy') + " otro id " + req.param('idFriend'));
                Chat.findOne({
                    users: {user_persona: req.param('createdBy'), user_friends: req.param('idFriend')}
                })
                .exec(function (err, result) {
                    if(err) return res.send(err);
                    console.log(result);
                })
                */
               sails.sockets.broadcast('funSockets', 'mensajeSend', result);
                return res.send({
                    'success': true,
                    'message': 'Mensaje agregado',
                    'data': result
                });
            

        });
    },
    getAllMessage: function(req, res){
        Messages.find().populate('createdBy')
        .exec(async function (err, result) {
            if(err) return res.send(err);
                return res.send({
                    'success': true,
                    'message': 'Mensaje agregado',
                    'data': result
                });
            

        });
    },
    suscribir: function(req, res){
        sails.sockets.join(req.socket, 'funSockets');
        return res.send({message: "token registrado"});
    },
};

