const express = require('express');
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan');
const nunjucks = require('nunjucks')


const {sequelize} = require('./models')
const indexRouter = require('./routes')

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

module.exports = app;





