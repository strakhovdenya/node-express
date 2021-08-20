import {} from 'dotenv/config'
import {Strategy as JwtStrategy} from 'passport-jwt';
import {ExtractJwt} from 'passport-jwt';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import db from '../config/sequelize/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: [process.env.REFRESH_ALGORITHM],
    // passReqToCallback: true,
};

const strategy = new JwtStrategy(options, async (payload, done) => {
    const user = await db.models.user.findByPk(payload.sub);
    try {
        if (user) {
            return done(null, user.dataValues);
        } else {
            return done(null, false);
        }
    } catch (err) {
        done(err, null)
    }
});

export default (passport) => {
    passport.use(strategy);
}