const express = require('express');
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan');
const nunjucks = require('nunjucks')


const {sequelize} = require('./models')
const indexRouter = require('./routes')
const v1 = require('./routes/v1')
const app = express();

app.set('port',process.env.PORT || 3000);
app.set('view engine','html');
nunjucks.configure('views',{
    express:app,
    watch:true,
    //autoescape:true
})

//db connect
sequelize.sync({force:false})
    .then(()=>{
        console.log("DB Connected")
    })
    .catch(err=>{
        console.error(err);
    });




//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')))


// middleware - router
app.use('/',indexRouter)
app.use('/v1',v1);

app.use((req,res,next)=>{
    const error = new Error(`${req.method} ${req.url} router is not found.`);
    error.status(404);
    next(err);
})


// 메인페이지로 리다이렉트하고 에러메지시를 쿼리로 보내주기
app.use((err,req,res,next)=>{
    res.locals.message = err.message
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
})

module.exports = app;





