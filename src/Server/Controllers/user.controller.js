const UserService = require('../services/user.service');

module.exports.getAllUsers= async (req, res, next) => {

    //return a list of users
    try{
        const users=await UserService.getUsersList();
        res.status(200).send(users);
    }
    catch(err){
        // next(err)
        console.error(err)
    }
}
module.exports.userSearch= async (req, res, next) => {

    
}
module.exports.getUserById= async (req, res, next) => {

    //return a specific user
    try{
        const user=await UserService.getUser(req.params.id);
        res.send(user);
    }
    catch(err){
        next(err)
    }
}
module.exports.addUser= async (req, res, next) => {

    //add a new user
    try{
        const users=await UserService.addUser(req.body);
        res.send(user);
    }
    catch(err){
        next(err)
    }
   
}
module.exports.updateUserDetails= async (req, res, next) => {

    //update user details
    try{
        const users=await UserService.updateUser(req.params.id,req.body);
        res.send(user);
    }
    catch(err){
        next(err)
    }
}
module.exports.removeUser= async (req, res, next) => {

    //remove a user
    try{
        const users=await UserService.deleteUser(req.params.id);
        res.send(users);
    }
    catch(err){
        next(err)
    }
}
