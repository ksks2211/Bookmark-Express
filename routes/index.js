const {Router} = require('express');
const router = Router();


/* GET home page. */
router.get('/', async(req, res, next) =>{
  res.render('main',{title:"Bookmark"})
});

router.get('/category',async(req,res,next)=>{
  res.render('category',{title:"Category"})
})

router.get('/url',async(req,res,next)=>{
  res.render('url',{title:"URL"})
})





module.exports = router;
