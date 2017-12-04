!function(e){function t(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=4)}([function(e,t){e.exports=require("dotenv")},function(e,t){e.exports=require("mongoose")},function(e,t){e.exports=require("babel-polyfill")},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.deletePin=t.savePin=t.unpinAll=t.updateAllPins=t.allPins=t.toggleLikePin=void 0;var r=n(0),o=i(r),u=n(16),s=i(u);process.cwd();o.default.load();t.toggleLikePin=function(e,t){var n=JSON.parse(decodeURIComponent(e.params.data)),i=n.title,r=n.img,o=n.owner,u=n.loggedUser;s.default.findOne({title:i,img:r,owner:o},function(e,n){e&&console.error(e),n&&(n.likes.indexOf(u)>=0?n.likes.splice(n.likes.indexOf(u),1):null!==u&&n.likes.push(u),n.save(function(e,n){t.json("Saved"+n)}))})},t.allPins=function(e,t){s.default.find({}).sort({created:"descending"}).exec(function(e,n){e&&console.error(e),n&&t.json(n)})},t.updateAllPins=function(e,t){s.default.find({}).sort({created:"descending"}).exec(function(n,i){n&&console.error(n),i&&e.emit(t,i)})},t.unpinAll=function(e,t){s.default.remove({},function(e,n){t.json("All pins deleted.")})},t.savePin=function(e,t){var n=JSON.parse(decodeURIComponent(e.params.data)),i=n.title,r=n.img,o=n.owner;s.default.findOne({title:i,img:r,owner:o},function(e,n){if(e&&console.error(e),n)t.json("You already pinned this!");else{new s.default({title:i,img:r,owner:o}).save(function(e,n){e&&console.error(e),t.json("Your pin has been saved!")})}})},t.deletePin=function(e,t){var n=JSON.parse(decodeURIComponent(e.params.data)),i=n.title,r=n.img,o=n.owner;s.default.remove({title:i,img:r,owner:o},function(e,n){e&&console.error(e),n&&t.json("Your pin has been deleted.")})}},function(e,t,n){n(2),e.exports=n(5)},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}n(2);var r=n(6),o=i(r);n(7);var u=n(8),s=i(u),a=n(0),l=i(a),c=n(9),d=i(c),f=n(1),p=i(f),g=n(10),v=i(g),m=n(11),h=i(m),w=n(12),x=i(w),P=n(13),_=i(P),b=n(14),y=i(b),S=n(15),R=n(17),O=n(21),k=i(O),q=n(22),U=i(q),j=n(23),M=i(j);o.default.polyfill();var A=(0,s.default)(),C=process.cwd();l.default.load();A.use((0,d.default)("tiny")),A.use("/js",s.default.static(C+"/dist/js")),A.use("/styles",s.default.static(C+"/dist/styles")),A.use("/img",s.default.static(C+"/dist/img")),A.use("/fonts",s.default.static(C+"/dist/fonts"));var E=p.default.connection;p.default.Promise=o.default,p.default.connect(process.env.MONGO_URI,{useMongoClient:!0},function(e,t){e?console.error("Failed to connect to database!"):console.log("Connected to database.")});var T=(0,x.default)(v.default);A.use(_.default.urlencoded({extended:!1})),A.use((0,y.default)());var N={secret:process.env.SECRET,resave:!1,saveUninitialized:!1,cookie:{path:"/",httpOnly:!1,maxAge:18e5},store:new T({mongooseConnection:E},function(e){console.error(e)}),name:"id"};A.set("trust proxy",1),N.cookie.secure=!0,N.cookie.httpOnly=!0,A.use((0,v.default)(N)),A.use(h.default.initialize()),A.use(h.default.session()),(0,R.authConfig)(h.default),(0,S.routes)(A,h.default);var I=k.default.createServer(A),L=(0,U.default)(I);(0,M.default)(L);var D=process.env.PORT;I.listen(D,function(){console.log("Server is listening on port "+D+".")})},function(e,t){e.exports=require("es6-promise")},function(e,t){e.exports=require("isomorphic-fetch")},function(e,t){e.exports=require("express")},function(e,t){e.exports=require("morgan")},function(e,t){e.exports=require("express-session")},function(e,t){e.exports=require("passport")},function(e,t){e.exports=require("connect-mongo")},function(e,t){e.exports=require("body-parser")},function(e,t){e.exports=require("cookie-parser")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.routes=void 0;var i=n(0),r=function(e){return e&&e.__esModule?e:{default:e}}(i),o=n(3),u=process.cwd();r.default.load();t.routes=function(e,t){var n=void 0,i=function(e,t,i){if(e.isAuthenticated())return e.user.github.username?n=e.user.github.username:e.user.twitter.username&&(n=e.user.twitter.username),console.log("USER:",n),i();t.redirect("/login")};e.route("/").get(i,function(e,t){"https"!==e.headers["x-forwarded-proto"]?t.redirect(process.env.APP_URL):t.sendFile(u+"/dist/index.html")}),e.route("/login").get(function(e,t){"https"!==e.headers["x-forwarded-proto"]?t.redirect(process.env.APP_URL+"/login"):t.sendFile(u+"/dist/login.html")}),e.route("/auth/github").get(t.authenticate("github")),e.route("/auth/github/callback").get(t.authenticate("github",{successRedirect:"/",failureRedirect:"/login"})),e.route("/auth/twitter").get(t.authenticate("twitter")),e.route("/auth/twitter/callback").get(t.authenticate("twitter",{successRedirect:"/",failureRedirect:"/login"})),e.route("/api/users/logged").get(function(e,t){n?t.json(n):(console.log("name_view ERROR"),t.json("Stranger"))}),e.route("/logout").get(function(e,t){e.logout(),t.redirect("/login")}),e.route("/api/savePin/:data").post(o.savePin),e.route("/api/deletePin/:data").delete(o.deletePin),e.route("/api/allPins").get(o.allPins),e.route("/api/toggleLikePin/:data").post(o.toggleLikePin),e.use("/api/unpinAll",o.unpinAll)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(1),r=function(e){return e&&e.__esModule?e:{default:e}}(i),o=r.default.Schema,u=new o({created:{type:Date,required:!0,default:new Date,expires:"365d"},img:{type:String,default:"../../client/img/image.png"},likes:[String],shares:[String],title:{type:String,required:!0},owner:{type:String,required:!0}});t.default=r.default.model("Pin",u)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.authConfig=void 0;var i=n(18),r=function(e){return e&&e.__esModule?e:{default:e}}(i),o=n(19).Strategy,u=n(20).Strategy;t.authConfig=function(e){e.serializeUser(function(e,t){t(null,e.id)}),e.deserializeUser(function(e,t){r.default.findById(e,function(e,n){t(e,n)})}),e.use(new u({consumerKey:process.env.TWITTER_CONSUMER_KEY,consumerSecret:process.env.TWITTER_CONSUMER_SECRET,callbackURL:process.env.APP_URL+"/auth/twitter/callback/"},function(e,t,n,i){process.nextTick(function(){r.default.findOne({"twitter.id":n.id},function(e,t){if(e)return i(e);if(t)return i(null,t);var o=new r.default;o.twitter.id=n.id,o.twitter.username=n.username,o.twitter.displayName=n.displayName,o.save(function(e){if(e)throw e;return i(null,o)})})})})),e.use(new o({clientID:process.env.GITHUB_KEY,clientSecret:process.env.GITHUB_SECRET,callbackURL:process.env.APP_URL+"/auth/github/callback/"},function(e,t,n,i){process.nextTick(function(){r.default.findOne({"github.id":n.id},function(e,t){if(e)return i(e);if(t)return i(null,t);var o=new r.default;o.github.id=n.id,o.github.username=n.username,o.github.displayName=n.displayName,o.save(function(e){if(e)throw e;return i(null,o)})})})}))}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(1),r=i.Schema,o=new r({github:{id:String,displayName:String,username:String,created:{type:Date,required:!0,default:new Date,expires:"365d"}},twitter:{id:String,displayName:String,username:String,created:{type:Date,required:!0,default:new Date,expires:"365d"}}});t.default=i.model("User",o)},function(e,t){e.exports=require("passport-github2")},function(e,t){e.exports=require("passport-twitter")},function(e,t){e.exports=require("http")},function(e,t){e.exports=require("socket.io")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(0),r=function(e){return e&&e.__esModule?e:{default:e}}(i),o=n(3);process.cwd();r.default.load();var u=function(e){e.on("connection",function(t){t.emit("start","Regular communications received..."),t.on("start",function(e){setInterval(function(){(0,o.updateAllPins)(t,"updateAllPins")},e)}),e.on("disconnect",function(){console.log("Web Sockets disconnected.")})})};t.default=u}]);