import db from '../../config/sequelize/index.js';
import * as  utils from '../../libs/pasport.utils.js'

export default class UsersService {

    async login(resDto) {
        try {
            const user = await db.models.user.findOne({username: req.body.username})

            if (!user) {
                resDto.setStatus(401)
                resDto.setError("could not find user");
                return;
            }

            // Function defined at bottom of app.js
            const isValid = utils.validPassword(req.body.password, user.hash, user.salt);

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

    async register(resDto) {
        try {

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