const {Router} = require('express');
const router = Router();
const moment = require('moment')
const {Category,Url} = require('../models');
const {URL} = require('url');


Url.prototype.dateFormat = (date)=>{
  moment(date).format('YYYY-MM-DD')
}
// url 목록
router.get('/',async(req,res,next)=>{
    try{
      const urls =await Url.findAll({
        include:[{
          model:Category,
          attributes:['title']
        }]
      })
      console.log(urls);
      res.json(urls)
    }catch(err){
      console.error(err)
      next(err);
    }
  })
  
  // url 생성
router.post('/',async(req,res,next)=>{
    try{
      const urlValidator = new RegExp(/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i);
      if(!urlValidator.test(req.body.url)||!req.body.title){
        const warning = "Invalid URL or Title"
        console.log(warning)
        res.json({warning})
      }
      const addr = new URL(req.body.url)
      const data = {
        title:req.body.title,
        url : req.body.url,
        hostname: addr.hostname
      }
      if(req.body.desc){
        data['description']=req.body.desc
      }
      if(req.body.category){
        data['CategoryId']=req.body.category
      }
      const url = await Url.create(data)
      res.json(url)
    }catch(err){
      console.error(err)
      next(err)
    }
  })

router.delete('/:urlID',async(req,res,next)=>{
    try{
        const result = await Url.destroy({where:{id:req.params.urlID}})
        res.json(result)
    }catch(err){
        console.error(err)
        next(err)
    }
})


router.patch('/:urlID',async(req,res,next)=>{
    try{
        const changed = req.body
        const result = await Url.update(changed,{
            where : {id:req.params.urlID}
        })
        res.json(result)
    }catch(err){
        console.error(err)
        next(err)
    }
})



router.get('/:urlID',async(req,res,next)=>{
  try{
    const urls =await Url.findOne({
      where:{id:req.params.urlID},
      include:[{
        model:Category,
        attributes:['title']
      }]
    })
    console.log(urls);
    res.json(urls)
  }catch(err){
    console.error(err)
    next(err);
  }
})
module.exports = router