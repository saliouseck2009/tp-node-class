const {cryptoUtil} = require('../utils');

describe("Crypto Tools", () => {
    it("Should verify SYM ENC", () => {
        //S
        key=cryptoUtil.getSymmetricKey("mot de passe");
        console.log(key);
        msg= "YEP DaanCovid";
        ciphertext=cryptoUtil.Encrypt(msg,key);
        console.log(ciphertext);
        cleartext=cryptoUtil.Decrypt(ciphertext,key);
        expect(cleartext===msg).toBe(true);
    });
    it("Should Verify SID", () => {
        
        id="dc76809c-23b2-4e0d-91ce-14aa46aeb5b4";
        SID=cryptoUtil.getSID(id,"mot de passe");
        newId=cryptoUtil.getIdFromSID(SID,"mot de passe");
        console.log(newId);
        //console.log(typeof id);
        //console.log(typeof newId);
        expect(id===newId).toBe(true);

    });
    it("Should verify ASYM ENC", () => {
        //S
        const { publicKey, privateKey }=cryptoUtil.generateKeyPair("PASS");
        //console.log(publicKey);
        //console.log(privateKey);
        msg= "dnI8F6T+vq7xuRtFboKRxw==";
        ciphertext=cryptoUtil.RSAencrypt(msg,publicKey);
        console.log(ciphertext);
        cleartext=cryptoUtil.RSAdecrypt(ciphertext,privateKey,"PASS");
        expect(cleartext===msg).toBe(true);
       
    });
    it("Should verify Stroring and retrieving Keys", () => {
        const { publicKey, privateKey }=cryptoUtil.generateKeyPair("PASS");
        cryptoUtil.saveKeyPaire({ publicKey, privateKey }, ".");
        pub=cryptoUtil.recupKey("./public_key");
        priv=cryptoUtil.recupKey("./private_key");
        expect(publicKey===pub).toBe(true);
        expect(privateKey===priv).toBe(true);
       
    });
});