const express = require('express')
let app = express()
var router = express.Router();

//路由级中间件

// 没有挂载路径的中间件，通过该路由的每个请求都会执行该中间件
router.use(function (req, res, next) {
    console.log('the firsr middle part');
    next();
});

router.get('/luyou', function (req, res, next) {
    console.log('the second middle part');
    // 跳到下一个路由
    if (false) next('route');
    // 负责将控制权交给栈中下一个中间件
    else next();
}, function (req, res, next) {
    console.log('the second middle part!!!');
    // 渲染常规页面
    res.send('the second middle part');
});

router.get('/luyou', function (req, res, next) {
    console.log('the third middle part');
    res.send('the third middle part');
});

// 将路由挂载至应用
app.use('/what', router);


app.listen(3000, () => {
    console.log('runnning....')
})