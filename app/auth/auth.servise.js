import db from '../../config/sequelize/index.js';
import * as  utils from '../../libs/pasport.utils.js'
import {v4 as uuidv4} from "uuid";
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';


const RefreshToken = mongoose.model('RefreshToken');


export default class AuthService {

    async login(body, resDto) {
        try {
            const user = await db.models.user.findOne(
                {
                    where:
                        {
                            name: body.username
                        }
                }
            )

            if (!user) {
                resDto.setStatus(401)
                resDto.setError("could not find user");
                return;
            }

            // Function defined at bottom of app.js
            const isValid = utils.validPassword(body.password, user.pass_hash, user.salt);

            if (isValid) {
                const tokens = await updateTokens(user.id);
                resDto.setStatus(200);
                resDto.setData(tokens);
                return;
            }

            resDto.setStatus(401)
            resDto.setError("you entered the wrong password");
        } catch (e) {
            resDto.setStatus(500)
            resDto.setError(e.message);
        }

    }

    async logout(user, resDto) {
        try {
            await RefreshToken.deleteMany({user: user.id})

            resDto.setStatus(200);
            resDto.setData(`User logout successfully`);
        } catch (e) {
            resDto.setStatus(500)
            resDto.setError(e.message);
        }
    }

    async register(entity, resDto) {
        try {
            const saltHash = utils.genPassword(entity.password);

            entity.id = uuidv4();
            entity.name = entity.username;
            entity.salt = saltHash.salt;
            entity.pass_hash = saltHash.hash;

            await db.models.user.create(entity);
            resDto.setStatus(200);
            resDto.setData(`User created`);
        } catch (e) {
            resDto.setStatus(500)
            resDto.setError(e.message);
        }
    }

    async refreshToken(body, resDto) {

        const {refreshToken} = body;
        let payLoad;
        try {
            payLoad = await utils.verifyToken(refreshToken);
            if (payLoad.type !== 'refresh-token') {
                resDto.setStatus(401);
                resDto.setError(`Invalid token type`);
                return;
            }
        } catch (e) {
            if (e.name === 'TokenExpiredError') {
                resDto.setStatus(401);
                resDto.setError(`Token expired`);
                return;
            }
            resDto.setStatus(401);
            resDto.setError(`Token problem: ${e.message}`);

            return;
        }

        try {
            const refToken = await RefreshToken.findOne({tokenId: payLoad.id})

            if (refToken === null) {
                resDto.setStatus(401);
                resDto.setError(`Invalid token`);
                return;
            }

            const newTokens = await updateTokens(refToken.userId);

            resDto.setStatus(200);
            resDto.setData(newTokens);
        } catch (e) {
            resDto.setStatus(500);
            resDto.setError(e.message);
        }
    }
}

async function updateTokens(userId) {
    const accessToken = utils.issueJWT(userId);
    const refreshToken = utils.issueRT();

    await utils.replaceDbRefreshToken(refreshToken.id, userId);

    return {
        accessToken,
        refreshToken: refreshToken.token
    };
}