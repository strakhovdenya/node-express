import 'dotenv/config';
import config from 'config';
import express from 'express'
import {default as userRouter} from './user/user.router.js'
import {default as postRouter} from './post/post.router.js'
import {default as authRouter} from './auth/auth.router.js'
import {sequelizeInit} from '../config/sequelize/index.js';
import {runMongo} from '../config/mongoDb.js'

const app = express();
const port = config.get("port");


app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/', authRouter);
app.use('/posts', postRouter);
app.use('/users', userRouter);

app.use(function (req, res) {
    res.status(404).send('NOT FOUND');
});

const init = async () => {
    await sequelizeInit();
    await runMongo();

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
}

init();



