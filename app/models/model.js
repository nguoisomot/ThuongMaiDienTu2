Shop = mongoose => {
  var Shop = new mongoose.Schema({
    ten_shop: { type: String },
    ho_va_ten: { type: String },
    sdt: { type: String },
    email: { type: String },
    password:{type:String}
    }, 
    {
    collection: 'Shop'
    });
  const ShopModel = mongoose.model('Shop', Shop);

  return ShopModel;
}
// San Pham

SanPham = mongoose => {
  var SanPham = new mongoose.Schema({
    id_shop: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
    ten_san_pham: { type: String },
    gia: { type: Number },
    so_luong:{type: Number}
    // loai_san_pham: { type: String },
    // chi_tiet: { type: String },
    // thuong_hieu: { type: String },
  }, {
    collection: 'SanPhamShop'
  });
  const SanPhamModel = mongoose.model('SanPhamShop', SanPham);
  return SanPhamModel;
}

// 
GioHang = mongoose => {
  var GioHang = new mongoose.Schema({
    id_san_pham: { type: mongoose.Schema.Types.ObjectId, ref: 'SanPhamShop' },
    so_luong: { type: Number }
  }, {
      collection: 'GioHang'
  });
  const SanPhamModel = mongoose.model('GioHang', GioHang);
  return SanPhamModel;
}
const Model = {
  Shop: Shop,
  SanPham: SanPham,
  GioHang:GioHang
}
module.exports = Model