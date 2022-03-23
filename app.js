const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const _ = require('lodash');
const res = require('express/lib/response');

const app = express();
app.set("view engine", 'ejs');
app.use(express.static('public'));
//Database server connction
mongoose.connect("mongodb+srv://admin-abhyoday:todo1234@cluster0.p9i0d.mongodb.net/fakeDB");
const Schema = mongoose.Schema;
//State data collection.
const stateSchema = new mongoose.Schema({
    STATNAME: String,
    DISTNAME: String,
    LiteracyRate: Number,
    SchoolEnrollmentRatio: Number,
    CollegeEnrollmentRatio: Number,
    SchoolDropoutRatio: Number,
    CollegeDropoutRatio: Number
});

const metaSchema = new mongoose.Schema({
    name:String,
    stateData: [stateSchema]
});

const meta = mongoose.model('state', metaSchema);

const AP = mongoose.model('APData', new Schema(stateSchema), 'APData');

const Assam = mongoose.model('ASData', new Schema(stateSchema), 'AssamData');

const Bihar = mongoose.model('BiharData', new Schema(stateSchema), 'BiharData');

const Goa = mongoose.model('GoaData', new Schema(stateSchema), 'GoaData');

const Chhatisgarh = mongoose.model('ChhatisgarhData', new Schema(stateSchema), 'ChhatisgarhData');

const Gujarat = mongoose.model('GujaratData', new Schema(stateSchema), 'GujaratData');

const Himachal = mongoose.model('HimachalData', new Schema(stateSchema), 'HimachalData');

// Himachal.find({}, function (err, result) {
//     const newState = new meta({
//         name:result[0].STATNAME,
//         stateData: result
//     });
//     console.log(newState);

//     newState.save();
// });


app.get('/', function (req, res) {

res.render('home');
})

app.get('/state/:state', function (req, res) {
    const state = _.upperCase(req.params.state);
    meta.findOne({name:state},function(err,result){
        if(!err){
            res.render('cityData',{'state':state,'distData':result.stateData});
        }
    })
});

app.get('/feedback/school',function(req,res){
    {
        res.render('school');
    }
})
app.get('/feedback',function(req,res){
    {
        res.render('feedback');
    }
});
app.get('/feedback/college',function(req,res){
    {
        res.render('college');
    }
});


app.post('/schoolfdb',function(req,res){
    console.log(req.body);
})


app.listen(3000, function () {
    console.log('Server started at port 3000');
})