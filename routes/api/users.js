const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { User } = require('../../db_queries');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const middlewares = require('../middlewares');

router.get('/', 
middlewares.checkToken,
middlewares.checkAdminStatus,
async (req, res) => {
    const users = await User.findAll();
    if (users.length === 0) {
        res.status(404).json('No users in the database')
    }
    res.status(200).json(users);
});

router.post('/register', [
    check('username', 'Oops! We need an username').not().isEmpty(),
    check('password', 'Oops! We need you to enter a password').not().isEmpty(),
    check('email', 'Oops! Maybe your email is not valid').isEmail(),
    check('name_lastName', 'Oops! We need your name and last name').not().isEmpty(),
    check('phone_number', 'Oops! We need a phone number, just in case (we promise not to use it unless it is an emergency)').not().isEmpty(),
    check('address', 'Oops! We need an address where we can take your order!').not().isEmpty()
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errores: errors.array() })
    }

    req.body.password = await bcrypt.hashSync(req.body.password, 10);
    const user = await User.create(req.body);
    res.json(user);

});

router.post('/login', async (req, res) => {
    const user = await User.findOne({ where: {email: req.body.email}});
    if (user) {
        const iguales = bcrypt.compareSync(req.body.password, user.password);
        if(iguales) {
            res.json({ success: createToken(user) });
        } else {
            res.json({ error: 'Sorry, this data appears to be incorrect'})    
        }
    }  else {
        res.json({ error: 'Sorry, this data appears to be incorrect' })
    }
});

router.put("/:userID", middlewares.checkToken, middlewares.checkAdminStatus, async (req, res) => {
    await User.update(req.body, {
      where: { id: req.params.userID },
    });
    res.status(200).json({ success: "The user was modified correctly." });
  });

  router.delete("/:userID", middlewares.checkToken, async (req, res) => {
    await User.destroy({
      where: { id: req.params.userID },
    });
    res.status(200).json({ success: "The user was deleted correctly." });
  });


const createToken = (user) => {
    const payload = {
        userID: user.id,
        username: user.username,
        name_lastName: user.name_lastName,
        email: user.email,
        phone_number: user.phone_number,
        address: user.address,
        adminStatus: user.adminStatus
    }

    return jwt.sign(payload, 'jasonandtheargonauts');

}

module.exports = router;
