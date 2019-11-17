const express = require('express');
const router = express.Router();
const Messages = require('../model/Messages')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')

router.use(bodyParser.urlencoded({'extended': 'true'}));
router.use(bodyParser.json());
router.use(bodyParser.json({type: 'application/vnd.api+json'}));
router.use(cookieParser());
router.use(cors())
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.post('/chat-save', function(req, res) {
	  const message = new Messages({
			userId: req.body.userId,
			userName: req.body.userName,
			text: req.body.text,
			date: new Date()
	  })

  message
    .save()
      	.then(chat => {
			res.json({
			status: 'success',
			message: 'message bien sauvegardé'
			})
      	})
		.catch(error => {
			res.json({
			status: 'error',
			message: 'Problème de sauvegarde du message'
			})
		})
});

router.get('/chat-get', (req, res) => {
	Messages.find({})
		.then(messages => {
			res.json(messages)
		})
		.catch(error => {
			res.json({
				status: 'error',
				message: 'Problème de récupération des messages'
			})
		})
})

module.exports = router;
