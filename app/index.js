
import 'dotenv/config';
import config from 'config';
import express from 'express'
import { default as userRouter } from './user/user.router.js'
import { default as postRouter } from './post/post.router.js'
import { sequelizeInit } from './sequelize/index.js';


const app = express();
const port = config.get("port");


app.use(express.json());

app.use('/users', userRouter);
app.use('/posts', postRouter);

app.use(function (req, res) {
    res.status(404).send('NOT FOUND');
});

const init = async () => {

    await sequelizeInit();

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
}

init();



