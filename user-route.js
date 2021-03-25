const express = require("express");
const connection = require("./connection");

const router = express.Router();

router.get('/', (req, res) => {
    connection.query('SELECT * FROM users', (err, rows) => {
        if (!err) {
            res.json(rows);
        }
        else {
            res.sendStatus(500);
            res.json(err);
        }

    });
});
router.get('/:id', (req, res) => {
    connection.query('SELECT * FROM users WHERE uid = ?', [req.params.id], (err, rows) => {
        if (!err)
            if (rows.length === 0) {
                res.status(404).json({ message: `User with id ${req.params.id} not found` });
            } else {
                res.json(rows);
            }
        else {
            res.sendStatus(500);
            res.json(err);
        }
    });
});

router.post('/', (req, res) => {
    connection.query('Insert into users(Name,age) values (?,?)', [req.body.name, req.body.age], (err, rows) => {
        if (!err) {
            // connection.query('select uid from users where Name=? and age=?',[req.body.name, req.body.age],(e,rows)=>{
            //     if(!err){
            //         res.json({message:"successfully added",data:rows});
            //     }
            // });
            res.json({ message: "successfully added", dataAdded: rows.affectedRows });
        } else {
            res.sendStatus(500);
            res.json(err);
        }
    });
});
router.put('/', (req, res) => {
    connection.query('Update users set age=? where uid=?', [req.body.age, req.body.id], (err, rows) => {
        if (!err) {
            res.json({ message: "successfully updated", dataAdded: rows.affectedRows });
        } else {
            res.sendStatus(500);
            res.json(err);
        }
    });
});
router.delete('/', (req, res) => {
    connection.query('delete from users where uid=?', [req.query.id], (err, rows) => {
        if (!err) {
            res.json({ message: "deleted successfully", data: rows });
        } else {
            res.sendStatus(500);
            res.json(err);
        }
    });
});
module.exports = router;