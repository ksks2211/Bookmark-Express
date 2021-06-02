const {Router} = require('express');
const router = Router();

const categoryRouter = require('./category')
const urlRouter = require('./url');

router.use('/category',categoryRouter);
router.use('/url',urlRouter);


module.exports = router