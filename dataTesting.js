const mongoose = require('mongoose');
mongoose
  .connect("mongodb://localhost:27017/du_an_2", {
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
const model = require("./app/models/model");
const Shop = model.Shop(mongoose);
const sanPham = model.SanPham(mongoose);

// sanPham.find({'id_shop':'5f5c913af808d797cc9ee82a'},function(err, results){
//   console.log(results) 
// })
// shop.findById('5f5c913af808d797cc9ee82a',function(err, results){
//   console.log(results) 
// });

// shop.
//   findOne({ id_shop: '5f5c913af808d797cc9ee82a' }).
//   populate('id_shop').
//   exec(function (err, story) {
//     if (err) return handleError(err);
//     console.log(story);
//   });
async function run() {
  //  let doc = await shop.findOneAndUpdate({ _id: '5f5cd3d7552b83b5648aa3c4' }, { email: 'user15@gmail.com' }, {
  //    new: true
  //  });
  //  console.log("email: "+doc.email)
  // shop.findOne({ email: 'user3@gmail.com' }).exec(function (err, result) {
  //   if (123456789+'' === result.password) {
  //     console.log('true')
  //   }
  //   else{
  //     console.log('false')
  //   }
  // })
  // shop.findOne({_id:'5f5f742142db5dc88049ec9d'})
  //   .populate('san_pham')
  //   .exec(function (err, result) {
  //   if (err) return handleError(err);
  //     console.log(result.san_pham);
  // });
  //  const filter = {
  //    _id: '5f602dc8efce065265c04967',
  // }
  // const update = {
  //   ten_san_pham: "iphone 5s",
  //   gia: "1000000",
   
  // }
  // let doc = await sanPham.findOneAndUpdate(filter, update, {
  //   new: true
  // });

  const shop1 = new Shop({
    // _id: req.body._id,
    ten_shop: 'Shop 1c',
    ho_va_ten: 'user c',
    email: 'user1333@gmail.com',
    sdt: '01931231312',
    password: '123456789',
    // san_pham: []

  });

  // Save Tutorial in the database
  shop1
    .save(function(err, book) {
    if (err) return console.error(err);
    console.log( " saved to bookstore collection.");
})
}
run();
