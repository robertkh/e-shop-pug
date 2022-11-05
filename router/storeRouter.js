/////////////////////////////////////////////////
var express = require('express');
var router = express.Router();

var Item = require('../models/itemModel');

/////////////////////////////////////////////////
const checkAuth = require('../middleware/jwtToken');

router.get('/', checkAuth, async(req, res) => {
    
    let storItems = await Item.find()

    console.log('storeRouter invouked')
    res.render('store', {
        adminStorItems: storItems
    })
})

/////////////////////////////////////////////////
const {
    addAndUpdate,
    delItem
} = require('../controllers/adminStore');

const {
    storeValidator,
    storeValidationResult
} = require('../middleware/storeValidator');

/////////////////////////////////////////////////
router.post('/add', (req, res, next) => {
    console.log(req.body);
    next()
}, storeValidator, storeValidationResult, addAndUpdate);

/////////////////////////////////////////////////
router.post('/del', delItem);

/////////////////////////////////////////////////
module.exports = router