const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();

app.use(express.static('public')); //to access the files in public folder

//Link connect font-end
var corsOptions = {
  origin: "http://localhost:3000"
}

app.use(cors(corsOptions))
app.use(bodyParser.json())

// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
// connect database
const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
const SanPham = db.sanPham;

// let filter = {
//   _id:'5f90e1c7b7c1324e4467c58f'
// }
setInterval(() => {
  SanPham.find({}).exec(async function(err,results){
    if(results){
       results.forEach(async element => {
        let new_so_luong = element.so_luong - 5;
        let update = {
          so_luong: new_so_luong
        };
        let filter ={
          _id:element._id
        }
        let doc = await SanPham.findOneAndUpdate(filter, update, {
          new: true
        })
        console.log(doc.so_luong)
      });     
    }else{
      console.log(err)
    }
  })
 
}, 3000);

require('./app/routers/shop.router')(app);

app.listen(3001, () => {
  console.log("Server is running on port 3001")
})