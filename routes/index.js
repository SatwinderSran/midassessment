var express = require('express');
var router = express.Router();
const Pool = require('pg').Pool;
var j = 1;
const pool = new Pool({
  user: 'jimmysran',
  host: 'localhost',
  database: 'kato1',
  password: 'University1',
  port: 5432,
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/s', function(req, res, next) {
  res.sendFile(__dirname + '/index1.html');
});

router.get('/lists', function(req, res, next) {
    var fname = req.query.fname;
    var done = req.query.done;
    rawSQL = "INSERT INTO list(id, task) VALUES(" + j++ + ", '" + fname + "')";
    rawSQL1 = "DELETE FROM list WHERE task = '" + done + "'";
    rawSQL2 = "INSERT INTO done(id, task) VALUES(" + j++ + ", '" + fname + "')";
    if (fname != "") {
    pool.query(rawSQL, (error, results) => {
        if (error) {
            throw error
        }
        res.json(results.rows);
    })
}
    if (done != "") {
        pool.query(rawSQL1, (error, results) => {
            if (error) {
                throw error
            }
            if (fname == "") {
                res.json(results.rows);
            }
        })
        pool.query(rawSQL2, (error, results) => {
            if (error) {
                throw error
            }
            if (fname == "") {
            }
        })
    }
    if(fname == "" & done == ""){
        res.json("Error");
    }
});

router.get('/list', function(req, res, next) {
  pool.query("SELECT * FROM list", (error, results) => {
    if (error) {
      throw error
    }
    res.json(results.rows);
  })
});

router.get('/done', function(req, res, next) {
    pool.query("SELECT * FROM done", (error, results) => {
        if (error) {
            throw error
        }
        res.json(results.rows);
    })
});

module.exports = router;
