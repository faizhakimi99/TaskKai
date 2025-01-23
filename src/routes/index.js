import express from 'express'
var router = express.Router()

router.get('/', function (req, res, next) {

    res.redirect("/taskKai")
});

router.get('/taskKai', function (req, res, next) {
    res.render('index', { title: req.app.locals.tabTitle }, function (err, html) {
        res.send(html)
    });
})

export default router;