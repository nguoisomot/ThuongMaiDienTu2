Shop = mongoose => {

  var ShopSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    ten_shop: { type: String },
    sdt: { type: String },
    email: { type: String },
    ho_va_ten: { type: String }
  }
  )
}