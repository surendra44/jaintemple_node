import crypto from "crypto";
const algorithm = 'aes-256-cbc';
const secretKey = '&TQ939$GQ@23bUq#IB!nyX^h5ad8P9YA';
export const encrypt = (text) => {
    
    const key = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(algorithm, secretKey, key);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return `${encrypted.toString('hex')}_${key.toString('hex')}`;
};

export const decrypt = (hash) => {
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.key, 'hex'));
    const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);
    return decrpyted.toString();
};

export const compare = (hash, plainText) => {
    let hashObj = {
        content:hash.split("_")[0],
        key:hash.split("_")[1],
    }
    return decrypt(hashObj) === plainText.toString() ? true : false;
}
