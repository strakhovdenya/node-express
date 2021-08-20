import {} from 'dotenv/config';
import crypto from 'crypto';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const RefreshToken = mongoose.model('RefreshToken');
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const pathToPrivKey = path.join(__dirname, '..', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToPrivKey, 'utf8');

const pathToPubKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToPubKey, 'utf8');


/**
 * -------------- HELPER FUNCTIONS ----------------
 */

/**
 *
 * @param {*} password - The plain text password
 * @param {*} hash - The hash stored in the database
 * @param {*} salt - The salt stored in the database
 *
 * This function uses the crypto library to decrypt the hash using the salt and then compares
 * the decrypted hash/salt with the password that the user provided at login
 */
export function validPassword(password, hash, salt) {
    let hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}

/**
 *
 * @param {*} password - The password string that the user inputs to the password field in the register form
 *
 * This function takes a plain text password and creates a salt and hash out of it.  Instead of storing the plaintext
 * password in the database, the salt and hash are stored for security
 *
 * ALTERNATIVE: It would also be acceptable to just use a hashing algorithm to make a hash of the plain text password.
 * You would then store the hashed password in the database and then re-hash it to verify later (similar to what we do here)
 */
export function genPassword(password) {
    var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

    return {
        salt: salt,
        hash: genHash
    };
}


/**
 * @param userId
 */
export function issueJWT(userId) {
    const payload = {
        sub: userId,
        iat: Date.now(),
        exp: getExpirationStamp(Number(process.env.EXPIRATION_ACCESS_TOKEN)),
    };
    const signedToken = jwt.sign(payload, PRIV_KEY, {algorithm: process.env.REFRESH_ALGORITHM});

    return {
        token: "Bearer " + signedToken,
        expires: payload.exp
    }
}

export function issueRT() {
    const payload = {
        id: crypto.randomBytes(16).toString('hex'),
        type: 'refresh-token',
        exp: getExpirationStamp(Number(process.env.EXPIRATION_REFRESH_TOKEN)),
    };

    const signedToken = jwt.sign(payload, PRIV_KEY, {algorithm: process.env.REFRESH_ALGORITHM});

    return {
        id: payload.id,
        token: signedToken,
    }
}

export async function replaceDbRefreshToken(tokenId, userId) {
    await RefreshToken.findOneAndRemove({userId})
    await RefreshToken.create({tokenId, userId});
}

export async function verifyToken(token) {
    return await jwt.verify(token, PUB_KEY);
}

function getExpirationStamp(seconds) {
    return Math.floor(Date.now() / 1000) + (seconds)
}