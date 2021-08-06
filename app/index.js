
import 'dotenv/config';
import config from 'config';
import express from 'express'
import EntityDriver from '../libs/entities/entityDriver.js';
import { default as userRouter } from '../app/user/userRouter.js'
import { default as postRouter } from '../app/post/postRouter.js'

const dbDriver = new EntityDriver([config.get("post_entity"), config.get("user_entity")]);

const app = express();
const port = config.get("port");

app.use(express.json());

app.use('/users', userRouter);
app.use('/posts', postRouter);

app.use(function (req, res) {
    res.status(404).send('NOT FOUND');
});

const init = async () => {
    await dbDriver.init();
    
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
}

init();



