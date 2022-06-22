const { Thought, User } = require('../models');


const thoughtController = {
    getThoughts(req,res) {
        Thought.find()
        .sort({ _id: -1 })
        .then((dbThoughtData) => {
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    getOneThought(req,res) {
        Thought.findOne({ _id: req.params.id })
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
                return res.status(404).json({ message: 'Could not find a thought with this id'})
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    createThought(req,res) {
        Thought.create(req.body)
        .then((dbThoughtData) => {
            return User.findOneAndUpdate({_id:req.body.userId},{$push:{thoughts:dbThoughtData._id}},{new:true})

        })
        .then((dbUserData) => {
            res.json({message: 'Created Thought'})
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    updateThought(req,res) {
        Thought.findByIdAndUpdate(req.params.thoughtId, { $set: req.body})
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
                return res.status(404).json({ message: 'Could not find a thought with this id'})
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    deleteThought(req,res) {
        Thought.findByIdAndDelete(req.params.thoughtId)
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
                return res.status(404).json({ message: 'Could not find a thought with this id'})
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })
    },
    newReaction(req,res) {
        Thought.findByIdAndUpdate(req.params.thoughtId,{$addToSet: {reactions: req.body}})
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
                return res.status(404).json({ message: 'Could not find a thought with this id'})
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })
    },
    deleteReaction(req,res) {
        Thought.findByIdAndUpdate(req.params.thoughtId, {$pull: { reactions: { reactionId: req.params.reactionId}}})
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
                return res.status(404).json({ message: 'Could not find a thought with this id'})
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })
    }
}

module.exports = thoughtController;