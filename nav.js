var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var path = require('path')
var fs = require('fs');
var fileUpload = require('express-fileupload');
var session = require('express-session')
module.exports = router;
var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'shopping-online'
});


con.connect((err) => {
  if (err) {
    console.log("Can not connect to DB");
    console.log(err);

    return;
  }
  console.log('Connected');
});
router.use(express.json());
router.use(express.urlencoded({
  extended: true
}));
router.use(fileUpload());
// router.get('/getUserDetails', (req, res) => {

// })

router.use(session({
  secret: 'gates',
  resave: true,
  saveUninitialized: true,
  cookie: {
    expires: new Date(Date.now() + 2000000),
    maxAge: 2000000
  }
}));

router.get("/getDetails", (req, res, next) => {

  if (req.session.name) {
    console.log("true")
    details = {
      "name": req.session.name,
      "email":req.session.email
    }
    console.log(JSON.stringify(details));
    res.send(JSON.stringify(details))
  } else {
    //console.log("false")
    res.send({
      "loggedin": false
    })
  }

  next()

})


router.post('/signin', (req, res) => {
  console.log(req.body)
  con.query(`SELECT * FROM customer WHERE firstname='${req.body.firstname}' AND password='${req.body.password}' AND cusid=${req.body.cusid}`, (err, rows) => {
    if (err) {
    
    } else if (rows.length > 0) {
      req.session.role = rows[0].role;
      req.session.email = rows[0].email;
      
      if( rows[0].role=="customer"){
      req.session.cusid = rows[0].cusid;
      req.session.name = req.body.firstname;
      
      res.send(rows[0]);
      
    } else if(rows[0].role=="manager"){
      req.session.cusid = rows[0].cusid;
      req.session.name = req.body.firstname;
      console.log("customer exists")
      res.send(rows[0]);
    }}else {
      res.send({
        "customer": "has to register"
      });
    }
  })
});
router.get('/checkifadmin', (req, res) => {
  console.log(req.session.role)
  if(req.session.role=="manager"){
   res.send(JSON.stringify({"auth":true}))

  }else{
    res.send(JSON.stringify({"auth":false}))
  }
})
router.post('/register', (req, res) => {

  con.query(`SELECT * FROM customer WHERE cusid=${req.body.cusid}`, (err, rows) => {

    if (rows.length < 1) {

      if (err) {
        console.log("err");
      } else {
        res.send({
          "customer": "customer can register"
        });

      }

    } else {
      res.send({

        "customer": "id exists in the system"
      });
    }
  })
})
router.post('/compregister', (req, res) => {
  con.query(`INSERT INTO customer(firstname, lastname,cusid, email,password, cityId, street, role) VALUES ('${req.body.firstName}','${req.body.lastName}',${req.body.cusid},'${req.body.email}','${req.body.password}',${req.body.city},'${req.body.street}','customer')`, (err, rows) => {

    if (err) {
      console.log(err);
    } else {

      req.session.name = req.body.firstName;
      req.session.cusid = req.body.cusid;
      req.session.cartid = null;
      req.session.email = req.body.email;
      //req.session.name = req.body.firstName;
      //req.session.email = req.body.email;


      res.send('OK');


    }
  })
})
router.get('/lastcart', (req, res) => {
  
    con.query(`SELECT max(createDate) as createdate FROM shopingcart WHERE customerid=${req.session.cusid} AND isopen=1`, (err, rows) => {
      if (err) {
        //console.log("err");
      } else if (rows.length > 0) {
        console.log(rows)
        res.send(JSON.stringify(rows))
      }
    })
  })
router.get('/checkforopencart', (req, res) => {
  
  if (req.session.cusid) {
    
    con.query(`SELECT * FROM shopingcart WHERE customerid=${req.session.cusid} AND isopen=0`, (err, rows) => {
      if (err) {
        //console.log("err");
      } else if (rows.length > 0) {
        
        req.session.cartid = rows[0].cartid
        req.session.createdate = rows[0].createDate
        console.log( req.session.cartid);
        console.log( "req.session.cusid");
        res.send({
          "cartopen": true,
          "createDate":rows[0].createDate
        })
      } else if (rows.length < 1) {
        console.log("no cartopen");
        req.session.createdate=new Date();
        res.send({
          "cartopen": false
        })
      }

    })
  } else if (!req.session.cusid) {
    console.log("no cartsession");
    res.send({
      "cartopen": "yes"
    })
  }

})

router.use('/getCategories', (req, res) => {
  con.query(`SELECT * FROM category`, (err, rows) => {

    if (err) {
      console.log(err);
    } else {
      //console.log("cat")




      res.send(JSON.stringify(rows));


    }
  })
})

router.use('/getProductsInCategory/:id', (req, res) => {
  con.query(`SELECT * FROM product WHERE categoryId=${req.params.id}`, (err, rows) => {

    if (err) {
      console.log(err);
    } else {

      res.send(JSON.stringify(rows));
    }
  })
})
router.get('/getproducts', (req, res) => {
  con.query(`SELECT * FROM product`, (err, rows) => {

    if (err) {
      console.log(err);
    } else {

      res.send(JSON.stringify(rows));
    }
  })
})

router.post('/startshopping', (req, res, next) => {
  
  con.query(`INSERT INTO shopingcart( customerId, createDate,isopen) VALUES (${req.session.cusid},NOW(),0)`, (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      console.log("startshopping")
      con.query(`SELECT cartid FROM shopingcart WHERE customerId=${req.session.cusid} AND isopen=0`, (err, rows) => {
        if (err) {
          console.log(err);

        } else if (rows.length > 0) {

          req.session.cartid = rows[0].cartid
          next();
        } else {
          next()
        }
      })
    }
  })

})


router.post('/addproduct', (req, res) => {
  console.log("in" + req.session.cartid);
  con.query(`SELECT quantity FROM cartproducts WHERE cartId=${req.session.cartid} AND productId=${req.body.id}`, (err, rows) => {

    if (err) {
      console.log(err);
    } else if (rows.length < 1) {
      con.query(`INSERT INTO cartproducts (productId, quantity, price, cartId,productname,measure) VALUES (${req.body.id},${req.body.quantity},${req.body.price},${req.session.cartid},'${req.body.productname}','${req.body.measure}')`, (err, rows) => {
        if (err) {
          console.log(err);
        } else {
          res.send("ok")
        }
      })
    } else {
      con.query(`UPDATE cartproducts SET quantity=${req.body.quantity} WHERE cartId=${req.session.cartid} AND productId=${req.body.id}`, (err, rows) => {
        if (err) {
          console.log(err);
        } else {
          res.send("ok")
        }
      })
    }
  })
})
router.get('/getcart', (req, res) => {

  con.query(`SELECT * FROM cartproducts WHERE cartId=${req.session.cartid}`, (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.send(JSON.stringify(rows))
    }
  })
})
router.get('/getproductquantity/:productId', (req, res) => {

  con.query(`SELECT quantity FROM cartproducts WHERE cartId=${req.session.cartid} AND productId=${req.params.productId}`, (err, rows) => {

    if (err) {
      console.log(err);
    } else if (rows.length > 0) {

      res.send(JSON.stringify(rows[0]))
    } else {

      res.send({
        "quantity": null
      })
    }
  })
})
router.delete('/deleteproduct/:id', (req, res) => {
  console.log(req.session.cartid);
  con.query(`DELETE FROM cartproducts WHERE cartId=${req.session.cartid} AND productId=${req.params.id}`, (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.send("deleted")
    }
  })

})
router.delete('/emptycart', (req, res) => {
  console.log(req.session.cartid);
  con.query(`DELETE FROM cartproducts WHERE cartId=${req.session.cartid}`, (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.send("deleted")
    }
  })

})
router.get('/getcustomerdetails', (req, res) => {
  con.query(`SELECT id ,orders.creditCard,customer.cityId,customer.street FROM Orders INNER JOIN Customer ON Orders.customerId=Customer.Cusid WHERE Customer.Cusid='${req.session.cusid}'`, (err, rows) => {
    if (err) {
      console.log(err);
    } else if (rows.length > 0) {
      res.send(JSON.stringify(rows))
      
    } else {


      con.query(`SELECT * FROM customer WHERE cusid=${req.session.cusid}`, (err, rows) => {
        if (err) {
          console.log(err);
        } else {
          res.send(JSON.stringify(rows))
        }


      })
    }
  })
})

router.get('/getunavailabledates', (req, res) => {
  con.query(`SELECT orderDate FROM orders`, (err, rows) => {
    if (err) {
      console.log(err);
    } else if (rows.length > 0) {
      arr=JSON.stringify(rows)
        
        
        res.send(arr)
    }
    } )})
router.post('/setorder', (req, res) => {
  con.query(`SELECT id FROM orders WHERE cartId=${req.session.cartid}`, (err, rows) => {
   
    if (err) {
      console.log(err);
    } else if (rows.length < 1) {
      con.query(`SELECT id FROM orders WHERE orderDate='${req.body.orderDate}'`, (err, rows) => {
        console.log(rows.length);
        if (err) {
          console.log(err);
        } else if (rows.length < 3) {
          
          console.log(req.session.createdate)
          console.log("strdate is"+req.body.orderDate)
        //  req.body.orderDate.setHours(+24)
        //  req.body.orderDate.setMinutes(0)
        //  req.body.orderDate.setSeconds(0);
          
            
          con.query(`INSERT INTO orders( customerId, cartId, price, cityId, street, date, orderDate, creditCard) VALUES (${req.session.cusid},${req.session.cartid},${req.body.price},${req.body.cityId},'${req.body.street}','${req.session.createdate}',str_to_date('${req.body.orderDate}',"%d/%c/%Y"),${req.body.creditCard})`, (err, rows) => {
            if (err) {
              console.log(err);
            } else {

              con.query(`UPDATE shopingcart SET isopen=1 WHERE cartid=${req.session.cartid} AND customerId=${req.session.cusid}`, (err, rows) => {
                if (err) {
                  console.log(err);
                } else {

                  res.send({
                    "datefull": false
                  })
                }
              })
            }
          })
        } else {
          res.send({
            "datefull": true
          })
        }
      })
    } else {
      res.send({
        "datefull": "interaction completed"
      });
    }
  })

})
router.post('/addnewproduct', (req, res) => {

  con.query(`INSERT INTO product(id, productname, categoryId, price, imageUrl, measure) VALUES (${req.body.id},'${req.body.productname}',${req.body.categoryId},${req.body.price},'${req.body.imageUrl}','${req.body.measure}')`, (err, rows) => {

    if (err) {
      console.log(err);
    } else {



      res.send('OK');


    }
  })

})

router.post('/upload', (req, res) => {
  console.log("upload")
  if (!req.files) {
    return res.status(400).send('No files were uploaded.');
  }

  con.query(`SELECT id FROM product ORDER BY id DESC LIMIT 0, 1`, (err, rows) => {

    if (err) {
      console.log(err);
    } else {
      let sampleFile = req.files.fileKey;
      console.log(rows[0].id)
      // Use the mv() method to place the file somewhere on your server
      sampleFile.mv('./uploads/image'+rows[0].id+'.jpg', function (err) {
        if (err) {
          return res.status(500).send(err);
        } else {
          con.query(`UPDATE product SET imageUrl='image${rows[0].id}.jpg' WHERE id=${rows[0].id}`
          , (err, rows) => {

            if (err) {
              console.log(err);
            } else {
          res.send({
            'File': 'ok'
          });
        }
      })
        }
      });
    }
  })
})
router.put('/updateproduct/:id', (req, res) => {

  con.query(`UPDATE product SET productname='${req.body.productname}',categoryId=${req.body.categoryId},price=${req.body.price},imageUrl='${req.body.imageUrl}',measure='${req.body.measure}' WHERE id=${req.params.id}`, (err, rows) => {

    if (err) {
      console.log(err);
    } else {


      
      res.send('OK');


    }
  })

})

router.put('/updateupload/:id', function (req, res) {
  if (!req.files){
      return res.status(400).send('No files were uploaded.');}
else{imageid=Math.random()
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.fileKey;
console.log("updating")
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('./uploads/image'+imageid+'.jpg', function (err) {
      if (err){
          return res.status(500).send(err);}
          else{
            con.query(`UPDATE product SET imageUrl='image${imageid}.jpg' WHERE id=${req.params.id}`
            , (err, rows) => {
  
              if (err) {
                console.log(err);
              } else {
            res.send({
              'File': 'ok'
            });
          }
        })
          }
  });}
});
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.end();
})


router.use('*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/Shopping-Online/index.html'));

});
