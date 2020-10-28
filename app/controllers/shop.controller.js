const db = require("../models");
const Shop = db.shop;
const SanPham = db.sanPham;
const GioHang = db.gioHang;

//myShop 
exports.myShop = (req, res) => {
  if (!req.headers["id"]) {
    res.status(400).send({ message: "Not Found Page" });
    // return
  }
  let id = req.headers["id"];
  Shop.findOne({ _id: id })
    .populate('san_pham')
    .exec(function (err, result) {
      console.log(result.san_pham)
      if (err) return handleError(err);
      res.send({ san_pham: result.san_pham })
    });
}

// Create and Save a new Tutorial
exports.createShop = (req, res) => {
  // Validate request
  // if (!req.body.ten_shop) {
  //   res.status(400).send({ message: "Content can not be empty!" });
  //   return;
  // }

  // Create a Tutorial
  const shop = new Shop({
    // _id: req.body._id,
    ten_shop: req.body.ten_shop,
    ho_va_ten: req.body.ho_va_ten,
    email: req.body.email,
    sdt: req.body.sdt,
    password: req.body.password,
    // san_pham: []

  });

  // Save Tutorial in the database
  shop
    .save(shop)
    .then(data => {
      res.send(data);
      console.log(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

exports.login = async (req, res) => {
  Shop.findOne({ email: req.body.email }).exec(function (err, result) {
    if (!result) {
      return res.status(400).send("Email không tồn tại")

    }
    if (req.body.password === result.password) {
      return res.status(200).send("Đăng nhập thành công");
    }
    return res.status(401).send({
      message: "Mật khẩu không chính xác"
    });
  })
}
// update Shop
exports.updateShop = async (req, res) => {
  // filer by _id
  const filter = {
    _id: req.body.id,
  }
  const update = {
    sdt: req.body.sdt,
    email: req.body.email,
    ten_shop: req.body.ten_shop,
    ho_va_ten: req.body.ho_va_ten
  }
  let doc = await Shop.findOneAndUpdate(filter, update, {
    new: true
  });
  res.json(doc)
};
// create San Pham
exports.createSanPham = (req, res) => {
  // check validation request
  if (!req.body.id_shop) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const sanPham = new SanPham({
    id_shop: req.body.id_shop,
    ten_san_pham: req.body.ten_san_pham,
    gia: req.body.gia,
    so_luong: req.body.so_luong
  });

  // Save Tutorial in the database
  sanPham
    .save(sanPham)
    .then(async data => {
      let doc = await Shop.update({ _id: req.body.id_shop }, { $push: { san_pham: data._id } }, {
        new: true
      });
      console.log("san pham: " + doc)
      // res.send(doc.san_pham,data);
      res.send("thanh cong");
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

// update item
exports.updateSanPham = async (req, res) => {
  // filer by _id of item
  const filter = {
    _id: req.body.id_san_pham,
  }
  const update = {
    ten_san_pham: req.body.ten_san_pham,
    gia: req.body.gia,

  }
  let doc = await SanPham.findOneAndUpdate(filter, update, {
    new: true
  });
  // res.json(doc)
};

// update shop after user buy items
exports.updateSoLuongSanPhamAfterBuy = async (req, res) => {
  // filer by _id of item 
  console.log('okay')
  let filter = {
    _id: req.body._id,
  }
  SanPham.findOne(filter).exec(async function (err, result) {
    console.log('okay')

    if (result) {
      let new_so_luong = result.so_luong - req.body.so_luong;
      let update = {
        so_luong: new_so_luong
      }

      let doc = await SanPham.findOneAndUpdate(filter, update, {
        new: true
      })
      res.send(doc)
      return
    }
    if (err) {
      res.send('Error')
    }
  });
  // res.json(doc)
};
//  
exports.createShop = (req, res) => {
  // Validate request
  // if (!req.body.ten_shop) {
  //   res.status(400).send({ message: "Content can not be empty!" });
  //   return;
  // }

  // Create a Tutorial
  const shop = new Shop({
    // _id: req.body._id,
    ten_shop: req.body.ten_shop,
    ho_va_ten: req.body.ho_va_ten,
    email: req.body.email,
    sdt: req.body.sdt,
    password: req.body.password,
    // san_pham: []

  });
  // Save Tutorial in the database
  shop
    .save(shop)
    .then(data => {
      res.send(data);
      console.log(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

exports.gioHang = (req, res) => {
  const gioHang = new GioHang({
    id_san_pham: req.body.id_san_pham,
    so_luong: req.body.so_luong
  })

  let filterCart = {
    _id: req.body._id || null
  }

  GioHang.findOne(filterCart).exec(async function (err, results) {
    if (results) {
      let new_so_luong = results.so_luong + req.body.so_luong;
      console.log(new_so_luong)
      let update = {
        so_luong: new_so_luong
      };
      console.log(results.update)
      let doc = await GioHang.findOneAndUpdate(filterCart, update, {
        new: true
      });
      res.status(200).send(doc)
    } else {
      gioHang.save(gioHang).then(data => {
        res.status(200).send(data)
      }).catch(err => {
        res.status(500).send(err)
      })
    }
    if (err) {
      res.status(500).send(err)
    }
  })
}