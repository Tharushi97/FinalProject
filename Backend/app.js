require('./config/config');
require('./models/db');
require('./config/passportConfig');
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
const postsRoutes = require("./positions");
const ctrlUser = require('./controllers/user.controller');
const passport = require('passport');
const jwtHelper = require('./helpers/jwthelper');
const cors = require('cors');
const employeeRoutes = require('./controllers/employeev2.controller');
const employee = require("./routes/employee.route");
const app = express();
const multer = require('multer')
const Position = require('./models/position');

mongoose
    .connect(
        "mongodb+srv://GeveoAust:geveo1234@freecluster-toxk5.mongodb.net/test?"
    )
    .then(() => {
        console.log("Connected to database!");
    })
    .catch(() => {
        console.log("Connection failed!");
    });

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});
const applicantRoutes = require('./routes/applicant');
var path = require("path")

attachFile = '';

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './attachments');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

var upload = multer({
    storage: storage,
    limits: { fileSize: '20M' }
})

app.post('/attachment', upload.single('attachment'), (req, res) => {  //upload single pdf file
    console.log('called')
    if (!req.file) {  // if null
        res.status(500);
        return next(err);
    } else {
        this.attachFile = req.file.filename
        res.send(req.file)
    }

}
)

app.get('/positions', (req, res) => {
    //res.send("Hello");

    console.log('Get requset for all vaccancies');
    Position.find(
        {
            openings: { $gt: 0 }
        },
        (err, val) => {
            console.log(val)
            if (err) {
                console.log(err)
                return res.status(500)
            } else {
                return res.status(200).json(val)
            }
        }
    )
});



// app.get('/positions', (req, res) => {

//   //res.send("Hello");

//   console.log('Get position');
//   Position.find(
//     {
//       Position: { $gt: positionId }
//     },
//     (err, val) => {
//       console.log(val)
//       if (err) {
//         console.log(err)
//         return res.status(500)
//       } else {
//         return res.status(200).json(val)
//       }
//     }
//   )
// });

//registering applicant data
const User = require('./models/User copy');
app.get('/api/user/privilages/:id', (req, res) => {
    User.findById(req.params.id, (err, doc) => {
        console.log(doc)
        res.json(doc)
    })
})

app.post('/register', (req, res) => {
    console.log("register",req.body);

    var positionId = req.body.positionId;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var mobile = req.body.mobile;
    var nic = req.body.nic;
    var linkedin = req.body.linkedin;
    var cv = this.attachFile;

    var cvDoc = req.body.cvDoc;

    // var evaluated = false




    var applicant = new Applicant();
    applicant.firstname = firstname;
    applicant.lastname = lastname;
    applicant.email = email;
    applicant.mobile = mobile;
    applicant.nic = nic;

    applicant.linkedin = linkedin;
    applicant.positionId = positionId;
    applicant.cv = cv;
    applicant.cvDoc = cvDoc;
    applicant.evaluated = false;


    //  fs.readFile(req.body.myFile, function (err, data) {

    //   applicant.image.data = data;

    //    applicant.image.contentType = req.body.myFile.split('.').pop();

    //  });   

    applicant.save((err, result) => {

        if (err) {

            // console.log("There is error in adding user details into the databse");
            res.send({ success: "Failed to add details", status: 500 });
        }

        return res.send({ success: "Successfully added new record", status: 200 });


    })



})

app.use(express.static(path.join(__dirname, 'uploads')))
app.use(express.static(path.join(__dirname, 'attachments')))
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/employee", employee);
app.use('/employeev2', employeeRoutes);
app.use('/applicant', applicantRoutes);
let port=3000;


const UserController = require('./controllers/User')
app.use('/api/userModel', UserController);

app.use("/api/position", postsRoutes);
// app.use("/api/authenticate", ctrlUser.authenticate);
// app.use("/api/userProfile", jwtHelper.verifyJwtToken, ctrlUser.userProfile);
// app.use("/api/test", ctrlUser.test);
const rtsIndex = require('./routes/index.router');
app.use('/api', rtsIndex);

app.listen(process.env.PORT, () => console.log(`Server started at port : ${process.env.PORT}`));
//app.use("/api/image", userImageRoutes); //me image ekata adala code eka  me url eka enne front end eken.e url ekata adalawa userImageRoute (images.js) ekata ynwa meken
module.exports = app;