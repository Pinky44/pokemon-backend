const Router = require('express').Router;
const userRouter = require('./users');

const router = new Router();

router.use('/', userRouter);

module.exports = router;
