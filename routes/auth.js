const router = require('express').Router()
const pool = require('../db')
const bcrypt = require('bcrypt')
const jwtGenrator = require('../utils/jwtGenerator')
const validInfo = require('../middleware/validate')
const authorize = require('../middleware/authorization')

//register
router.post('/register/:teamId?', async(req, res) => {
    try {
        const { cin, firstName, lastName, birthday, email, password } = req.body;
        console.log('1')
        const user = await pool.query("SELECT * FROM user_spark WHERE user_email = $1 ", [email]).catch((e) => console.error(error.message));
        //res.json(user.rows);
        console.log('2')
        if (user.rows.length !== 0) {
            return res.status(401).send("User already exist")
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        if (req.params.teamId) {
            const newUser = await pool.query("INSERT INTO user_spark (user_id,firstname,lastname,bithday,user_email,user_password,team_id) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *", [cin, firstName, lastName, birthday, email, hashedPass, req.params.teamId])
            const token = jwtGenrator(newUser.rows[0].user_id);
            res.json({ token })
        } else {
            const newUser = await pool.query("INSERT INTO user_spark (user_id,firstname,lastname,bithday,user_email,user_password) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *", [cin, firstName, lastName, birthday, email, hashedPass])
                //res.json(newUser.rows[0]);
                //console.log(newUser.rows[0]) 
            const token = jwtGenrator(newUser.rows[0].user_id);
            res.json({ token })
                //console.log(token)
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error Try Later !');
    }

});

//login route
router.post('/login', validInfo, async(req, res) => {
    try {

        const { email, password } = req.body;
        const user = await pool.query('SELECT * FROM user_spark WHERE user_email=$1', [email]);

        if (user.rows.length === 0) {
            return res.status(401).send('Email or Password is incorrect!');
        }
        //validate pass
        const validpass = await bcrypt.compare(password, user.rows[0].user_password);

        if (!validpass) {
            return res.status(401).send('Email or Password is incorrect!');
        }

        const token = jwtGenrator(user.rows[0].user_id);
        res.json({ token });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error Try Later !');
    }
});


router.get('/verify', authorize, (req, res) => {
    try {
        res.json(true)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error Try Later !');
    }
});

module.exports = router;