////////////////////////////////////////////////////
var express = require('express');
var router = express.Router();
var Item = require('../models/itemModel');

////////////////////////////////////////////////////
/* GET home page. */
router.get('/', async (req, res) => {
    const pageSize = 4
    let shopItems = await Item.paginate({}, {
        page: parseInt(req.params.id),
        limit: pageSize
    })

    var activeNumber = parseInt(req.params.id)
    var toItem = activeNumber * pageSize
    var fromItem = toItem + 1 - pageSize

    if (toItem > shopItems.total) {
        toItem = shopItems.total
    }

    let storItems = await Item.find()
    let storItemsStr = JSON.stringify(storItems)

    res.render('index', {
        jsonItemsStr: storItemsStr,
        adminStorItems: storItems,
        shopItems: shopItems.docs,
        shopPages: shopItems.pages,
        total: shopItems.total,
        active: activeNumber,
        from: fromItem,
        to: toItem
    })
})

////////////////////////////////////////////////////
module.exports = router