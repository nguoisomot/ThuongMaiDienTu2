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
async function run() {
const commentSchema = new Schema({
  body: { type: String, required: true },
  one: {
    type: Schema.Types.ObjectId,
    required: true,
    // Instead of a hardcoded model name in `ref`, `refPath` means Mongoose
    // will look at the `onModel` property to find the right model.
    refPath: 'onModel'
  },
  onModel: {
    type: String,
    required: true,
    enum: ['BlogPost', 'Product']
  }
});

const Product = mongoose.model('Product', new Schema({ name: String }));
const BlogPost = mongoose.model('BlogPost', new Schema({ title: String }));
const Comment = mongoose.model('Comment', commentSchema);

const book = await Product.create({ name: 'The Count of Monte Cristo' });
const post = await BlogPost.create({ title: 'Top 10 French Novels' });

const commentOnBook = await Comment.create({
  body: 'Great read',
  one: book._id,
  onModel: 'Product'
});
const commentOnPost = await Comment.create({
  body: 'Very informative',
  one: post._id,
  onModel: 'BlogPost'
});
  commentOnBook
  commentOnPost
// The below `populate()` works even though one comment references the
// 'Product' collection and the other references the 'BlogPost' collection.
const comments = await Comment.find().populate('one').sort({ body: 1 });
comments[0].one.name; // "The Count of Monte Cristo"
comments[1].one.title; // "Top 10 French Novels"
  console.log("commenet:"+comments[0].one.name)
  console.log("commenet:" + comments[1].one.title)
}
run() 