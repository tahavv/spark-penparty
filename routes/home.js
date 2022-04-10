const router = require('express').Router();
const pool = require('../db')
const authorize = require('../middleware/authorization')
var uuid = require('uuid');

router.get('/', authorize, async(req, res) => {
    try {
        //res.json(req.user)

        //returning user infos from token
        const user = await pool.query('SELECT firstname,user_email,team_id FROM user_spark WHERE user_id = $1', [req.user])
        console.log(user.rows[0].team_id)

        //returning members of the team
        const teamMembre = await pool.query('select firstname,lastname from user_spark as us , team as t where us.team_id = t.team_id and us.team_id=$1', [user.rows[0].team_id])
        res.json(teamMembre.rows)

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error Try Later !');
    }
});

router.post('/create-team', authorize, async(req, res) => {
    try {
        const { name } = req.body;
        if (!req.user.team_id) {
            const newTeam = await pool.query("INSERT INTO team (team_id,team_name) VALUES ($1,$2) RETURNING *", [uuid.v4(), name])
            res.json(newTeam.rows[0])
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error Try Later !');
    }
})


module.exports = router;