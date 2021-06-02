const {Router} = require('express');
const router = Router();
const {Category,Url} = require('../models');
const {URL} = require('url');


// 카테고리 가져오기
router.get('/',async(req,res,next)=>{
    try{
      const categories = await Category.findAll({})
      res.json(categories)
    }catch(err){
      console.error(err)
      next(err);
    }
  })
  
// 카테고리 생성, post로
  router.post('/',async(req,res,next)=>{
    try{
      const result = await Category.findOrCreate({where : {title:req.body.title}})
      if (result[1]){
        res.json(result[0])
      }else{
        const warning = "Existing Category"
        res.json({warning});
      }
    }catch(err){
      console.error(err)
      next(err)
    }
  })

// 카테고리 제거, delete
router.delete('/:categoryID',async(req,res,next)=>{
    try{
        const result = await Category.destroy({where:{id:req.params.categoryID}})
        res.json(result)
    }catch(err){
        console.error(err)
        next(err)
    }
})

router.patch("/:categoryId",async(req,res,next)=>{
    try{
        const result = await Category.update({
            title:req.body.title
        },{
            where : {id:req.params.categoryId}
        })
        res.json(result)
    }catch(err){
        console.error(err)
        next(err)
    }
})
module.exports = router;