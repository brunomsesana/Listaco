const express = require('express')
const bcrypt = require('bcrypt')
const db = require('../db.js')
const router = express.Router()

router.get('/', (req, res) =>{
    if (req.session.login != null){
        db.query("SELECT list, text FROM listaco WHERE owner=$1", [req.session.login], (error, results) => {
            if (results.rowCount > 0){
                var list = []
                var item = []
                for(var i = 0; i<results.rowCount; i++){
                    if (!list.includes(results.rows[i].list)){
                        list[list.length] = results.rows[i].list
                    }
                    item[item.length] = results.rows[i].list
                    item[item.length] = results.rows[i].text
                }
                res.render('index.hbs', {list: list, item: item})
            } else {
                res.render('index.hbs')
            }
        })
    } else {
        res.redirect('/login')
    }
})
router.get('/login', (req, res) =>{
    req.session.login = null
    res.render('login.hbs')
})
router.get('/register', (req, res) =>{
    res.render('register.hbs')
})
router.post('/save', (req, res) =>{
    var ndel;
    for (var i = 1; i<req.body.list.length; i++){
        if (req.body.list[i].length > 1){
            ndel = true
        }
    }
    if (ndel == true){
        for(i=1; i<req.body.list.length; i++){
            for(j=1; j<req.body.list[i].length; j++){
                db.query('DELETE FROM listaco WHERE owner=$1', [req.session.login])
                db.query("INSERT INTO listaco(owner, list, text) VALUES($1, $2, $3)", [req.session.login, i, req.body.list[i][j]])
            }
        }
    }  else {
        db.query('DELETE FROM listaco WHERE owner=$1', [req.session.login])
    }
    })
router.post('/auth/login', (req, res)=>{
    db.query('SELECT password, id FROM login WHERE email=$1', [req.body.email], (error, results) =>{
        if (results.rowCount == 0){
            res.render('login.hbs', {message: 'Este email não está registrado'})
        } else {
            if (bcrypt.compareSync(req.body.password, results.rows[0].password)){
                req.session.login = results.rows[0].id
                res.redirect('/')
            } else {
                res.render('login.hbs', {message: 'Senha incorreta'})
            }
        }
    })

})
router.post('/auth/register', (req, res)=>{
    db.query('SELECT email FROM login WHERE email=$1', [req.body.email], (error, results) =>{
        if (results.rowCount > 0){
            res.render('register.hbs', {message: 'Este email ja está registrado'})
        } else if (req.body.password == req.body.passwordc){
            let hashedpass = bcrypt.hashSync(req.body.password, 8)
            db.query('SELECT id FROM login', (error, results) =>{
                db.query('INSERT INTO login(id, name, email, password) VALUES($1, $2, $3, $4)', [results.rowCount, req.body.name, req.body.email, hashedpass], ()=>{
                    req.session.login = results.rowCount
                    res.redirect('/')
                })
            })
        } else {
            res.render('register.hbs', {message: 'As senhas não batem'})
        }
    })
})

module.exports = router;