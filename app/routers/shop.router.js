const shop = require("../controllers/shop.controller");

module.exports = app => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  

  // Create a new Tutorial
  app.post("/login", shop.login);
  app.post("/register", shop.createShop);
  app.post("/update", shop.updateShop);
  app.post("/createSanPham", shop.createSanPham);
  app.post("/updateSanPham", shop.updateSanPham); 
  app.post("/updateSoLuongSanPhamAfterBuy", shop.updateSoLuongSanPhamAfterBuy); 
  app.post("/gioHang", shop.gioHang); 
  app.get("/myShop", shop.myShop)
}