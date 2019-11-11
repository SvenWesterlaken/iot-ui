const db = require('../config/database');
const sql = require('mssql')


module.exports = {
    getData(req, res) {
        var data = [];
        var getInformationFromDB = function (callback) {
            const request = new sql.Request(db)
            request.query('SELECT * FROM SensorData', function (err, result) {
                if (err) return callback(err);
                if (result.recordset.length) {
                    for (var i = 0; i < result.recordset.length; i++) {
                        data.push(result.recordset[i]);
                        console.log(i);
                    }
                }
                callback(null, data);
            });
        };

        console.log("Call Function");
        getInformationFromDB(function (err, result) {
            if (err){
                res.status(400).send({ error : err.message });
            } 
            else{res.json(data)};
        });
    },
    addData(req, res) {

        const ps = new sql.PreparedStatement(db);
        ps.input('time', sql.DateTime);
        ps.input('sensor1', sql.Float);
        ps.input('sensor2', sql.Float);
        ps.prepare('INSERT INTO SensorData VALUES(@time, @sensor1, @sensor2)', err => {
            if (err){
                res.status(400).send({ error : err.message });
            } 
            else{
                ps.execute({ time: new Date(req.body.time), sensor1: req.body.sensor1, sensor2: req.body.sensor2 }, (err, result) => {
                    if (err){
                        res.status(409).send({ error : err.message });
                    } 
                    else{
                        ps.unprepare(err => {
                            if (err){
                                res.status(400).send({ error : err.message });
                            } 
                            else this.getData(req, res);
                        })
                    }
                });
            }
        });
    }
}