const { User, Thought } = require('../models');

const userController = {
    getUsers(req,res) {
        User.find()
        .select('-__v')
        .then((dbUserData) => {
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },
    getOneUser(req,res) {
        User.findOne({ _id: req.params.id })
        .select('-__v')
        .populate('friends')
        .populate('thoughts')
        .then((dbUserData) => {
            if(!dbUserData){
                return re.status(404).json({ message: 'Could not find user with this id.' })
            }
            res.json(dbUserData)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },
    createUser(req,res) {
        User.create(req.body)
        .then((dbUserData) => {
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },
    updateUser(req,res) {
        User.findOneAndUpdate({_id:req.params.id},{$set:req.body},{runValidators:true,new:true})
        .then((dbUserData) => {
            if(!dbUserData){
                return re.status(404).json({ message: 'Could not find user with this id.' })
            }
            res.json(dbUserData)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },
    deleteUser(req,res) {
        User.findByIdAndDelete({ _id: req.params.userId })
        .then((dbUserData) => {
            if(!dbUserData){
                return re.status(404).json({ message: 'Could not find user with this id.' })
            }
            res.json(dbUserData)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },
    addFriend(req,res) {
        User.findByIdAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId }}, {new: true})
        .then((dbUserData) => {
            if(!dbUserData){
                return re.status(404).json({ message: 'Could not find user with this id.' })
            }
            res.json(dbUserData)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },
    deleteFriend(req,res) {
        User.findByIdAndUpdate({_id: req.params.userId}, { $pull: {friends: req.params.friendId}}, {new:true})
        .then((dbUserData) => {
            if(!dbUserData){
                return re.status(404).json({ message: 'Could not find user with this id.' })
            }
            res.json(dbUserData)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    }
}