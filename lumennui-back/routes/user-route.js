const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')

router.use(bodyParser.urlencoded({'extended': 'true'}));
router.use(bodyParser.json());
router.use(bodyParser.json({type: 'application/vnd.api+json'}));
router.use(cookieParser());
router.use(cors())
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "htttp://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
require('../model/mongoConnect')
let User = require('../model/User')


router.post('/register', function(req, res, next) {
    User.findOne({
        pseudo: req.body.pseudo.trim()
    })
        .then(user => {
            if(user !== null) {
                res.json(user)
            } else {
                let user = new User({
                    pseudo: req.body.pseudo
                })
                user
                    .save()
                    .then(user => {
                        res.json(user)
                    })
                    .catch(error => {
                        res.json({
                            status: 'error',
                            message: 'Veuillez saisir un autre pseudo'
                        })
                    })
            }
        })
        .catch(error => {
            res.json({
                status: 'error',
                message: 'Erreur produite, veuille réessayer plus tard'
            })
        })
});

module.exports = router;
