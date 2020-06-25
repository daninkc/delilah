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
    check('username', 'Debe ingresar su nombre de usuario').not().isEmpty(),
    check('password', 'Debe ingresar una contraseña').not().isEmpty(),
    check('email', 'Debe ingresar un correo válido').isEmail(),
    check('name_lastName', 'Debe ingresar su nombre y apellido').not().isEmpty(),
    check('phone_number', 'Debe ingresar un número de teléfono').not().isEmpty(),
    check('address', 'Debe ingresar una dirección').not().isEmpty()
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
            res.json({ error: 'Lo sentimos, los datos son incorrectos'})    
        }
    }  else {
        res.json({ error: 'Lo sentimos, los datos son incorrectos' })
    }
});

router.put("/:userID", middlewares.checkToken, async (req, res) => {
    await User.update(req.body, {
      where: { id: req.params.userID },
    });
    res.status(200).json({ success: "Modificado correctamente." });
  });

  router.delete("/:userID", middlewares.checkToken, async (req, res) => {
    await User.destroy({
      where: { id: req.params.userID },
    });
    res.status(200).json({ success: "Usuario borrado correctamente." });
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