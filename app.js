const path = require('path')
const express = require('express')
const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function (req, res) {
    res.send('hello world');
})

//也可以使用回调函数数组处理路由，下面直接将回调函数写在了里面,也可以混合使用
app.get('/manyFunction', function (req, res, next) {
    console.log('the first function!!!');
    next();
}, function (req, res, next) {
    console.log('the second function!!!');
    next()
}, function (req, res) {
    console.log('the third function!!!');
    res.send('Funciton!!');
});

//链式路由句柄
app.route('/book')
    .get(function (req, res) {
        res.send('Get way!')
    })
    .post(function (req, res) {
        res.send('post way!')
    })
    .put(function (req, res) {
        res.send('put way!')
    })

//创建模块化，可挂载的路由句柄//---------------------------------????????????????????????-----------------------
let router = express.Router();
router.use(function timeLog(req, res, next) {
    console.log('Time:', Date.now())
    next()
})
router.get('/Bird', function (req, res) {
    res.send('Bird')
})
app.use('/bird', router)

//应用级中间件
app.use(function (req, res, next) {
    console.log('应用级中间件第一个!')
    next();
})
app.use(function (req, res, next) {
    console.log('应用级中间件第二个!')
    next();
})
app.get('/middle', function (res, res) {
    res.send('应用级中间件')
})


//在一个挂载点装在一组中间件---------------???????????????????????????????-----------------------------
app.use('/user/:id', function (req, res, next) {
    console.log('中间件1！')
    next();
}, function (req, res) {
    console.log('中间件2!')
    next();
})

//路由级中间件
let myRouter = express.Router();

myRouter.use(function(req,res,next){
    console.log('路由级中间件第一个')
    next()
})

myRouter.use('/luyou',function(req,res,next){
    if(true) 
        next('route')
    else
        next()
},function(req,res,next){
    res.send('路由级中间件第二个')
})

myRouter.get('/luyou',function(req,res,next){
    res.send('路由级中间件第三个')
})

app.use('/',myRouter);


//监听3000端口
app.listen(3000, () => {
    console.log('running...')
})

