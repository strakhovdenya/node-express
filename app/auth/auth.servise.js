import db from '../../config/sequelize/index.js';
import * as  utils from '../../libs/pasport.utils.js'
import {v4 as uuidv4} from "uuid";

export default class AuthService {

    async login(body, resDto) {
        try {
            const user = await db.models.user.findOne({username: body.username})

            if (!user) {
                resDto.setStatus(401)
                resDto.setError("could not find user");
                return;
            }

            // Function defined at bottom of app.js
            const isValid = utils.validPassword(body.password, user.hash, user.salt);

            if (isValid) {
                const tokens = await updateTokens(user._id);
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
}

const updateTokens = (userId) => {
    const accessToken = utils.issueJWT(userId);
    const refreshToken = utils.issueRT();

    return utils.replaceDbRefreshToken(refreshToken.id, userId).then(() => ({
        accessToken,
        refreshToken: refreshToken.token
    }));
}