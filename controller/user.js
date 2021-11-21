//const {User} = require('./../models');
let User = require("../models/user.model");
const { otpProvider, jwt } = require('./../providers');

/**
 * @author Ousmane NDIAYE.
 * @module User management
 */

module.exports = {
    /** Creating user by genrating first an otp and jwt token
     * @param  {} req
     * @param  {} res
     */

    /**
     * @api {post} /user Add user and get a token
     * @apiName CreateUser
     * @apiGroup User
     *
     * @apiHeader {String} issuer application issuer
     *
     * @apiParam {String} phone Phone number
     *
     * @apiSuccess (Success 201) {Boolean} success If it works ot not
     * @apiSuccess (Success 201) {String} message Response message
     * @apiSuccess (Success 201) {UUID} idUser the user's ID
     * @apiSuccess (Success 201) {Object} token
     * @apiSuccess (Success 201) {String} token.token the token
     * @apiSuccess (Success 201) {Number} token.expiresIn number of second before expiration
     * @apiSuccess (Success 201) {Date} token.createdAt date of creation of the token
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 201 Created
     *     {
     *       "success": true,
     *       "message": "Successfully created.",
     *       "idUser": "6cfb320a-bc39-48a6-b49f-3277646ad1d5",
     *       "token": {
     *         "token": "xxx",
     *         "expiresIn": 86400,
     *         "createdAt": "2020-04-28T17:57:22.114Z"
     *       }
     *     }
     */
    async create(req, res) {
        try {
            if (req.headers.issuer !== process.env.OAUTH_SECRET) {
                res.status(401).send({
                    message: 'invalid issuer.',
                });
                return;
            }


            console.log(req.body);
            const otp = await otpProvider.generateOTP(req.body.phone);
            //sphone = cryptoUtil.getSID(req.body.phone, process.env.JWT_SECRET);
            const token = jwt.sign({ phone: req.body.phone });
            const exist = await User.find({ phone: req.body.phone });
            if (exist && !exist.length) {
                const newUser = new User({ active: 'pending', phone: req.body.phone });
                newUser.save().then((user) => {
                    res.status(201).send({
                        success: true,
                        message: 'Successfully created.',
                        idUser: user._id,
                        token:token,
                    });
                }).catch((error) => res.status(400).send(error));
                return;
            } else {

                const filter = { phone: req.body.phone };
                const update = { active: 'pending' };
                let doc = await User.findOneAndUpdate(filter, update);

            }
            res.status(201).send({
                success: true,
                message: 'Successfully created.',
                idUser: exist[0]._id,
                token,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send(error);

        }
    },

    /**
     * @api {get} /user/verify_code Verify the user's OTP
     * @apiName verifyCode
     * @apiGroup User
     *
     * @apiHeader authorization Bearer token
     *
     * @apiParam {String} code code to verify
     *
     * @apiSuccess (Success 200) {Boolean} success If it works ot not
     * @apiSuccess (Success 200) {String} message Response message
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 Success
     *     {
     *       "success": true,
     *       "message": "Successfully verified."
     *     }
     */
    async verifyCode(req, res) {
        try {
            
            const verification = await otpProvider.verifyOtp({
                code: req.body.code,
                phone: req.phone,
            });
            if (verification) {
                res.send({ success: true, message: 'Successfully verified.' });
            }
            else res.status(401).send({ success: false, message: 'verification error' });
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },

    /**
     * @api {get} /user/refresh_token Refresh the user token
     * @apiName refreshToken
     * @apiGroup User
     *
     * @apiHeader Authorization Bearer token
     *
     * @apiSuccess (Success 201) {Boolean} success If it works ot not
     * @apiSuccess (Success 201) {String} message Response message
     * @apiSuccess (Success 201) {Object} token
     * @apiSuccess (Success 201) {String} token.token the token
     * @apiSuccess (Success 201) {Number} token.expiresIn number of second before expiration
     * @apiSuccess (Success 201) {Date} token.createdAt date of creation of the token
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 201 Created
     *     {
     *       "success": true,
     *       "message": "Successfully created.",
     *       "token": {
     *         "token": "xxx",
     *         "expiresIn": 86400,
     *         "createdAt": "2020-04-28T17:57:22.114Z"
     *       }
     *     }
     */
    async refreshToken(req, res) {
        //sphone = cryptoUtil.getSID(req.phone, process.env.JWT_SECRET);
        const token = jwt.sign({ phone: req.phone });
        res.status(201).send({
            success: true,
            message: 'Successfully created.',
            token,
        });
    },

    get(req, res) {
        res.status(200).send({
            message: 'New Hope :( :)',
        });
    },


    /**
     * @api {get} /users get all users
     * @apiName getAllUsers
     * @apiGroup User
     *
     *
     * @apiSuccess (Success 200) {Object} result users list
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "success": true,
     *       "id":1,
     *       "message":
     *
     *
     *     }
     */
    getAllUsers(req, res) {
        //res.send({message: 'hi :)'});
        User.find().then(data => {
            res.send(data);
        }).catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving users."
                });
            });
    },

    seedUsers(req, res) {
        // create some events
        const users = [
            {
                name: {
                    first: "ousmane",
                    last: "Ndiaye",
                    midle: ""
                },
                phone: "+221776359893",
                active: "active",

            },
            {
                name: {
                    first: "adama",
                    last: "Ndiaye",
                    midle: ""
                },
                phone: "+22176",
                active: "active",

            },

        ];

        // use the Event model to insert/save
        User.remove({}, () => {
            for (e of events) {
                var newEvent = new User(e);
                newEvent.save();
            }
        });

        // seeded!
        res.send('Database seeded!');
    },

};