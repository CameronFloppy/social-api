const router = require('express').Router();
const { getThoughts,getOneThought,createThought,updateThought,deleteThought,newReaction,deleteReaction} = require('../../controllers/thought-controller');


router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getOneThought).put(updateThought).delete(deleteThought)

router.route('/:thoguhtId/reactions').post(newReaction)

router.route('/:thogutId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;