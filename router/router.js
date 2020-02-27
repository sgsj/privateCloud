'use strict'
const Koa = require('koa');
const router = require('koq-router')();
const app = new Koa();

app.use(async (ctx,next)=>{
    console.log('Process ${ctx.request.method} ${ctx.request.url}...');
    await next();
});

router.get('/user/:name', async (ctx,next)=>{
    let name = ctx.params.name;
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, ${name}!</h1>'
});

router.get('/',async (ctx,next)=>{
    ctx.response.type = 'text/html';
    ctx.response.body = "<h1>Hello world</h1>"
});