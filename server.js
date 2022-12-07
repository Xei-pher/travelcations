let express = require('express');
let app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const path = require('path');
const session = require('express-session');
const multer = require('multer');
//FOR SESSIONS
const currentUser = {username:"",password:"",firstname:"",lastname:"", email:"", bio:"", postCount:0,profilePic:"", dateJoin:""};
const newPost = {postID:0 ,title:"", rating:0, date:"", content:"", image:""};
const currPost = {postID:0 ,title:"", rating:0, date:"", content:"", image:""};
//FOR IMAGE UPLOADS

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({storage: storage})

//STARTUP
app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));

// CURRENT DATE
let date_ob = new Date();
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();

//INITIAL ROUTES FOR NON-LOGGED IN USERS
app.get('/', (req, res) => {
  res.render('HomePage', {foo: 'FOO'});
});
app.post("/signuppage", function (req,res){
  res.render('SignUp', {foo: 'FOO'});
})
app.post("/aboutpage2", function (req,res){
  res.render('AboutNoLog', {foo: 'FOO'});
})
app.post("/loginpage", function (req,res){
  res.render('LogIn', {foo: 'FOO'});
})
app.post("/homepage1", function (req,res){
  res.render('HomePage', {foo: 'FOO'});
})

//SESSION ROUTES
app.get('/homePageLoggedIn/:username', (req, res) => {
  const username = '"' + req.params.username + '"';
  var sql = "SELECT * FROM user WHERE username = "+ username;
  let query = connection.query(sql, (err, rows) => {
    
    var sql = "SELECT * FROM post";
    let query = connection.query(sql, (err, rowz) => {
      
      res.render('HomePageLoggedIn', {
        profile:rows[0],
        posts: rowz
      });
    });
  });
});

app.get('/aboutpage/:username', (req, res) => {
  const username = '"' + req.params.username + '"';
  var sql = "SELECT * FROM user WHERE username = "+ username;
  let query = connection.query(sql, (err, rows) => {
    
    var sql = "SELECT * FROM post";
    let query = connection.query(sql, (err, rowz) => {
      
      res.render('About', {
        cc: currentUser.username,
        profile:rows[0],
        posts: rowz
      });
    });
  });
});

app.get('/createpost/:username', (req, res) => {
  const username = '"' + req.params.username + '"';
  var sql = "SELECT * FROM user WHERE username = "+ username;
  let query = connection.query(sql, (err, rows) => {
    
    res.render('CreatePost', {
      profile:rows[0]
  });
});
});

app.get('/myprofile/:username', (req, res) => {
  const username = '"' + req.params.username + '"';
  var sql = 'SELECT * from user where username = '+ username;
  let query = connection.query(sql, (err, rows) => {
    
    if(rows[0].postCount == 0){
      res.render('MyProfileNoPost', {
        profile:rows[0],
      });
    }
    else{
      var sql = `SELECT post.title, post.postID, post.rating, post.content, post.image, post.date, user.username, user.email, user.firstname, user.lastname, user.dateJoin, user.postCount, user.profilePic, user.bio FROM post
      LEFT JOIN user ON post.author = user.username
      WHERE user.username =  
       `+ username;
      let query = connection.query(sql, (err, rows) => {
        
        res.render('MyProfile', {
          profile:rows[0],
          posts:rows
        });
      });
    }
  });
});

app.get('/user/:username', (req, res) => {
  const username = '"' + req.params.username + '"';
  var sql = `SELECT post.title, post.postID, post.rating, post.content, post.image, post.date, user.username, user.email, user.firstname, user.lastname, user.dateJoin, user.postCount, user.profilePic, user.bio FROM post
  LEFT JOIN user ON post.author = user.username
  WHERE user.username =  
   `+ username;
  let query = connection.query(sql, (err, rows) => {
    
    if(rows[0].username === currentUser.username){
      res.render('MyProfile', {
        profile:rows[0],
        posts:rows
    });
    }
    else{
      res.render('User', {
        profile:rows[0],
        posts:rows,
        cc: currentUser.username
      });
    }
});
});

app.get('/editprofile/:username', (req, res) => {
  const username = '"' + req.params.username + '"';
  var sql = "SELECT * FROM user WHERE username = "+ username;
  let query = connection.query(sql, (err, rows) => {
    
    res.render('EditProfile', {
      profile:rows[0]
  });
});
});

app.get('/editprofile/:username', (req, res) => {
  const username = '"' + req.params.username + '"';
  var sql = "SELECT * FROM user WHERE username = "+ username;
  let query = connection.query(sql, (err, rows) => {
    
    res.render('EditProfile', {
      profile:rows[0]
  });
});
});

app.get('/editprofilepic/:username', (req, res) => {
  const username = '"' + req.params.username + '"';
  var sql = "SELECT * FROM user WHERE username = "+ username;
  let query = connection.query(sql, (err, rows) => {
    
    res.render('EditProfilePicture', {
      profile:rows[0]
  });
});
});

app.get('/viewownpost/:postID', (req, res) => {
  const postID = '"' + req.params.postID + '"';
  var sql = "SELECT * FROM post WHERE postID = "+ postID;
  let query = connection.query(sql ,(err, rows) => {
    
    res.render('OwnPost', {
      post:rows[0],
  });
});
});

app.get('/viewpost/:postID', (req, res) => {
  const postID = '"' + req.params.postID + '"';
  var sql = "SELECT * FROM post WHERE postID = "+ postID;
  let query = connection.query(sql ,(err, rows) => {
    
    if(rows[0].author === currentUser.username){
      res.render('OwnPost', {
        post:rows[0],
    });
    }
    else{
      res.render('Post', {
        post:rows[0],
        cc:currentUser.username
    });
    }
});
});
app.listen(process.env.PORT || 3000, () => console.log('Listening on port 3000'));

/*SIGNUP*/
app.post("/signupuser", (req, res)=>{
  var fname = req.body.fname;
  var lname = req.body.lname;
  var eaddress = req.body.eaddress;
  var bio = req.body.bio;
  var dateJoin = year + "-" + month + "-" + date;
  var username = req.body.username;
  var password = req.body.password;
  var image = 'UserPic.JPG';
  const saltRounds = 10;
  var crypt = bcrypt.hashSync(password, saltRounds);

  let data = {username: username, password: crypt, firstname: fname, lastname: lname, email: eaddress, bio: bio, postCount: 0, profilePic: image, dateJoin: dateJoin};
  let sql = "INSERT INTO user SET ?";
  let query = connection.query(sql, data, (err, results) =>{
      
      res.redirect('/');
  });
});

//LOGIN
app.post("/loginuser", (req, res)=>{
    let username = req.body.username;
    let password = req.body.password;
    currentUser.username = username;
    currentUser.password = req.body.password;
    connection.query('SELECT * FROM user WHERE username = ?', [username], function(err, rows) {
    var user="";
        if (err) throw err;
        if (rows.length) {
            console.log(bcrypt.compareSync(password, rows[0].password));
            if(bcrypt.compareSync(password, rows[0].password)){
              user = rows[0].username;
              currentUser.postCount = rows[0].postCount;
              var sql = "SELECT * FROM post";
              let query = connection.query(sql, (err, rowz) => {
                
                res.render('HomePageLoggedIn', {
                  profile:rows[0],
                  posts: rowz
                });
              });
            } else {
              res.redirect('/');
            }
            

        } else {
          res.redirect('/');
        }
        			
    });
});
// CREATE POST
app.post("/createpost", upload.single('image'), (req, res)=>{
  var title = req.body.title;
  var rating = req.body.rating;
  var author = currentUser.username;
  var date = req.body.date;
  var content = req.body.content;
  var image = req.file.filename;
  currentUser.postCount +=1;
  newPost.postID = 0;
  var sql = "SELECT * FROM post";
  let query = connection.query(sql, (err, rows) => {
    
    if (rows.length) {
    var lastindex = rows.length-1;
    var latestPostID = rows[lastindex].postID;
    newPost.postID = latestPostID + 1;
    let data = {postID: newPost.postID, title: title, rating: rating, author: author, date: date, content: content, image: image};
    let sql = "INSERT INTO post SET ?";
    let query = connection.query(sql, data, (err, results) =>{
      
      //ADD ALERT/LINK TO POST
      let data = [currentUser.postCount, currentUser.username];
      let sql = "UPDATE user SET postCount = ? WHERE username = ?";
      let query = connection.query(sql, data, (err, results) =>{
        
        var sql = "SELECT * FROM user WHERE username = "+ "'"+ currentUser.username +"'";
        let query = connection.query(sql, (err, rows) => {
        
        var sql = "SELECT * FROM post";
        let query = connection.query(sql, (err, rowz) => {
          
          res.render('HomePageLoggedIn', {
            profile:rows[0],
            posts: rowz
          });
        });
  });
  });
  });
    }
  });
});
//DELETE POST
app.post("/deletepost/:postid", (req, res)=>{
  currentUser.postCount -=1;
    let data = [req.params.postid];
    let sql = "DELETE FROM post WHERE (postID=?)";
    let query = connection.query(sql, data, (err, results) =>{
      
      //ADD ALERT/LINK TO POST
      let data = [currentUser.postCount, currentUser.username];
      let sql = "UPDATE user SET postCount = ? WHERE username = ?";
      let query = connection.query(sql, data, (err, results) =>{
        
        var sql = "SELECT * FROM user WHERE username = "+ "'"+ currentUser.username +"'";
        let query = connection.query(sql, (err, rows) => {
        
        var sql = "SELECT * FROM post";
        let query = connection.query(sql, (err, rowz) => {
          
          res.render('HomePageLoggedIn', {
            profile:rows[0],
            posts: rowz
          });
        });
});
  });
  });
});
//EDIT PROFILE
app.post("/editprofileb", (req, res)=>{
  let username = currentUser.username;
  let password = req.body.password;
  var fname = req.body.fname;
  var lname = req.body.lname;
  var eaddress = req.body.eaddress;
  var bio = req.body.bio;
  connection.query('SELECT * FROM user WHERE username = ?', [username], function(err, rows) {
      if (err) throw err;
      if (rows.length) {
          console.log(bcrypt.compareSync(password, rows[0].password));
          if(bcrypt.compareSync(password, rows[0].password)){
            let data = [fname, lname, eaddress, bio, username];
            let sql = "UPDATE user SET firstname = ?, lastname = ?, email = ?, bio = ? WHERE username = ?";
            let query = connection.query(sql, data, (err, results) =>{
            
            var sql = "SELECT * FROM post";
              let query = connection.query(sql, (err, rowz) => {
                
                res.render('HomePageLoggedIn', {
                  profile:rows[0],
                  posts: rowz
                });
              });
            });
          } else {
            res.redirect('/');
          }
      } else {
        res.redirect('/');
      }       
  });
});
//EDIT PROFILE PICTURE
app.post("/editprofilepic", upload.single('pp'), (req, res)=>{
  var image = req.file.filename;
  let password = req.body.password;
  connection.query('SELECT * FROM user WHERE username = ?', [currentUser.username], function(err, rows) {
      if (err) throw err;
      if (rows.length) {
          console.log(bcrypt.compareSync(password, rows[0].password));
          if(bcrypt.compareSync(password, rows[0].password)){
            let data = [image, currentUser.username];
            let sql = "UPDATE user SET profilePic = ? WHERE username = ?";
            let query = connection.query(sql, data, (err, results) =>{
              
              var sql = "SELECT * FROM post";
              let query = connection.query(sql, (err, rowz) => {
                
                res.render('HomePageLoggedIn', {
                  profile:rows[0],
                  posts: rowz
                });
              });
            });
          } else {
            res.redirect('/');
          }
      } else {
        res.redirect('/');
      }       
  });
});
//SEARCH
app.post("/searchpost", (req, res)=>{
  var search = req.body.search;
    connection.query("SELECT * FROM post WHERE title LIKE '%"+search+"%' OR content LIKE '%"+search+"%'", function(err, rows) {
    if (err) res.redirect('/');
    if (rows.length) {
      res.render('SearchResults', {
        cc: currentUser.username,
        posts:rows
      });
    }
    else{
      res.render('SearchResultsZero', {
        cc: currentUser.username,
      });
    }       
    });
  });
// CONNECT
var connection = mysql.createConnection('mysql://root:qit97mz2dKimpH0v2xuY@containers-us-west-151.railway.app:5538/railway');

connection.connect(function(err) {
if (err) {
  console.error('error connecting: ' + err.stack);
  return;
}

console.log('connected as id ' + connection.threadId);
});
