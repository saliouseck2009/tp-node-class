
const crypto = require('crypto');
var fs = require('fs');
module.exports = {
    KEY_SIZE: 256,
    SALT: "e5f79c5915c02171eec6b212d5520d44480993d7d622a7c4c2da32f6efda0ffa",
    ALGO_SYM: "aes-256-cbc",
    IV: "qKrtJS287EKQfACW",
    CLEAR_ENCODE: "utf8",
    ENCRYPT_ENCODE: "binary",
    MOD_LENGTH: 2048,
    KEY_FORMAT: "pem",
    PRINT_FORMAT: 'base64',
    ALGO_ASYM: 'rsa',

    getSymmetricKey(password) {
        const key = crypto.scryptSync(password, module.exports.SALT, module.exports.KEY_SIZE / 8);

        return key.toString(module.exports.PRINT_FORMAT);
    },

    Encrypt(clearText, skey) {
        try {
            key = new Buffer(skey, module.exports.PRINT_FORMAT);
            const cipher = crypto.createCipheriv(module.exports.ALGO_SYM, key, module.exports.IV);
            return Buffer.concat([
                cipher.update(new Buffer(clearText)),
                cipher.final()
            ]).toString(module.exports.PRINT_FORMAT);
        } catch (error) {
            console.error(error);
        };
    },

    Decrypt(encryptdata, skey) {
        try {
            key = new Buffer(skey, module.exports.PRINT_FORMAT);
            const decipher = crypto.createDecipheriv(module.exports.ALGO_SYM, key, module.exports.IV);
            return Buffer.concat([
                decipher.update(new Buffer(encryptdata, module.exports.PRINT_FORMAT)),
                decipher.final()
            ]).toString(module.exports.CLEAR_ENCODE);
        } catch (error) {
            throw(error);
        };
    },

    getSID(id, password) {
        key = module.exports.getSymmetricKey(password);
        SID = module.exports.Encrypt(id, key)
        return SID;
    },

    getIdFromSID(SID, password) {
        try {
            key = module.exports.getSymmetricKey(password);
            id = module.exports.Decrypt(SID, key)
            return id;
        } catch (error) {
            return "";
        }
    },
    generateKeyPair(password) {
        const keyPair = crypto.generateKeyPairSync(module.exports.ALGO_ASYM, {
            modulusLength: module.exports.MOD_LENGTH,
            publicKeyEncoding: {
                type: 'spki',
                format: module.exports.KEY_FORMAT
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: module.exports.KEY_FORMAT,
                cipher: module.exports.ALGO_SYM,
                passphrase: password
            }
        });
        return keyPair;
    },
    RSAencrypt(plaintext, publicKey) {
        //const publicKey = fs.readFileSync(publicKeyFile, "utf8");
        const encrypted = crypto.publicEncrypt(
            publicKey, Buffer.from(plaintext));
        return encrypted.toString(module.exports.PRINT_FORMAT);
    },
    RSAdecrypt(ciphertext, privateKey, passphrase) {
        //const privateKey = fs.readFileSync(privateKeyFile, "utf8");
        const decrypted = crypto.privateDecrypt(
            { key: privateKey, passphrase: passphrase }
            , Buffer.from(ciphertext, module.exports.PRINT_FORMAT));
        return decrypted.toString(module.exports.CLEAR_ENCODE);
    },
    saveKeyPaire(keyPair, folder) {
        fs.writeFileSync(folder + "/public_key", keyPair.publicKey);
        fs.writeFileSync(folder + "/private_key", keyPair.privateKey);
    },
    recupKey(path) {
        const Key = fs.readFileSync(path, "utf8");
        return Key;
    },
    //const publicKeyPem = forge.pki.publicKeyToPem(cert.publicKey);
}