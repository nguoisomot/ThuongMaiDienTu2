const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose
  .connect("mongodb://localhost:27017/mongoose", {
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
const personSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  age: Number,
  stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

const storySchema = Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Person' },
  title: String,
  fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
});
const thongKeSchema = Schema({
  name: { type: String },
  unitsSold: { type: Number },
  date1: { type: Date, default: Date.now }
});
const gioHangSchema = Schema({
  idNguoiMua: { type:  String },
  idSanPham: { type: Schema.Types.ObjectId },
  soLuong:{type: Number},
  date: { type: Date, default: Date.now }, 
},{
  collection: 'gio_hang'
});

const Person = mongoose.model('Person', personSchema);
const Story = mongoose.model('Story', storySchema);
const ThongKe = mongoose.model('thong_ke_2', thongKeSchema);
const GioHang = mongoose.model('gio_hang', gioHangSchema);

const gioHang = new GioHang({
  idNguoiMua:"01",
  idSanPham:"5f90e1c7b7c1324e4467c58f",
  soLuong: 2,
  date:{type:Date, default: Date.now}
});
gioHang.save(function(err,results){
  
})


//Thống kê theo ngày tháng
// const thongKe = new ThongKe({
//   name: "Iphone 5",
//    unitsSold: 10, 
// })
// thongKe.save(function(err){

// })
// ThongKe.aggregate(
//   [
//     {
//       $group: {
//         _id: { $dateToString: { format: "%Y-%m-%d", date: "$date1" } },
//         totalUnitsSold: {
//           $sum: "$unitsSold"
//         }
//       }
//     }
//   ],

//   function (err, result) {
//     if (err) {
//       console.log(err)
//     } else {
//       console.log(result)
//     }
//   }
// );


// const author = new Person({
//   _id: new mongoose.Types.ObjectId(),
//   name: 'Ian Fleming',
//   age: 50
// });

// author.save(function (err) {
//   if (err) return handleError(err);

//   const story1 = new Story({
//     title: 'Okay boy',
//     author: author._id    // gián giá trị _id cho person
//   });

//   story1.save(function (err,result) {
//     if (err) return handleError(err);
//     console.log("result "+result)
//   });
// });

// Story.
//   findOne({ title: 'Casino Royale' }).
//   populate('author').
//   exec(function (err, story) {
//     if (err) return handleError(err);
//     console.log(story);
//   });
// Story.findById('5f5b4f188e3ee68f3c28179e',function(err, results){
//   console.log(results.title) 
// })
//  async function  run (){
//   //  let doc = await Person.update({ _id: '5f5f0ad369aa552701fcfc3e' }, { $push: { stories: '5f5f0ad369aa552701fcfc3f' }}, {
//   //   new: true
//   // });
//   //  const doc = await Person.push({ _id: '5f5f0ad369aa552701fcfc3e' }, { stories: ['5f5f0ad369aa552701fcfc3f'] });
//   //  doc.stories.push('5f5f0ad369aa552701fcfc3f')
//    Person.
//      findOne({ _id: '5f5f0ad369aa552701fcfc3e' }).
//      populate('stories').
//   exec(function (err, story) {
//     if (err) return handleError(err);
//     console.log(story);
//   });
// }
// run()
