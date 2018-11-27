/**
 * DashboardController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    returnUser: function(req, res){
        return res.send({user: req.user});
    }

};

