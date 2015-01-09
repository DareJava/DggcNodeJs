/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var mysql = require('mysql');
var http = require('http');
var moment = require('moment');
    fs = require('fs'),url = require('url'),
    util = require('util');
 var querystring = require("querystring");
 var logindetails;
 

var connection = mysql.createConnection(
    {
      host     : 'localhost',
      user     : 'root',
      password : 'admin',
      database : 'dggc_db'
    }
);

 
http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname;
  //  res.writeHead(200, {"Content-Type": "text/plain"});
     //console.log(moment("20150108 19:40:00", "YYYYMMDD hh:mm:ss").fromNow());  //2011-07-12 11:22:09
    //'x-application/json
    if(pathname =="/"){
        // without params
        console.log(pathname +"requested");
    }
    else{
         
      if(pathname === "/loginAdmin"){
          var que=url.parse(req.url).query;
          var username =querystring.parse(que)["username"];
          var password =querystring.parse(que)["password"];
          var callback = function(err, result) {
            res.writeHead(200, {
                'Content-Type' :'text/plain'
            });
            console.log('json:', result);
            res.write(result);
            res.end();
          };
           loginAdmin(callback,username,password);
            //res.write(JSON.stringify(rows));
           // res.end("rows");
      }
      else if(pathname === "/register"){
          var que=url.parse(req.url).query;
          var username =querystring.parse(que)["username"];
          var password =querystring.parse(que)["password"];
          var phone =querystring.parse(que)["phone"];
          var callback = function(err, result) {
            res.writeHead(200, {
                'Content-Type' : 'text/plain'
            });
            console.log('json:', result);
            res.write(result);
            res.end();
          }; 
         Register(callback,username,password,phone);
      }
      else if(pathname === "/endStream"){
          var que=url.parse(req.url).query;
         
          var callback = function(err, result) {
            res.writeHead(200, {
                'Content-Type' : 'text/plain'
            });
            console.log('json:', result);
            res.write(result);
            res.end();
          }; 
            endStream(callback);
      }
       else if(pathname === "/loginUser"){
          var que=url.parse(req.url).query;
          var username =querystring.parse(que)["username"];
          var password =querystring.parse(que)["password"];
          var phone =querystring.parse(que)["phone"];
          var callback = function(err, result) {
            res.writeHead(200, {
                'Content-Type' : 'text/plain'
            });
            console.log('json:', result);
            res.write(result);
            res.end();
          }; 
         loginUser(callback,username,password);
      }
      else if(pathname === "/saveSermon"){
          var que=url.parse(req.url).query;
          var title =querystring.parse(que)["title"];
          var preacher =querystring.parse(que)["preacher"];
          var date =querystring.parse(que)["date"];
          var callback = function(err, result) {
            res.writeHead(200, {
                'Content-Type' : 'text/plain'
            });
            console.log('json:', result);
            res.write(result);
            res.end();
          }; 
            saveSermon(callback,title,preacher,date);
      }
      else if(pathname === "/saveSermonText"){
          var que=url.parse(req.url).query;
          var text =querystring.parse(que)["text"];
          var type =querystring.parse(que)["type"];
          var poster =querystring.parse(que)["poster"];
          var callback = function(err, result) {
            res.writeHead(200, {
                'Content-Type' : 'text/plain'
            });
            console.log('jsonsss:', result);
            res.write(result);
            res.end();
          }; 
            saveSermonText(callback,text,type,poster);
      }
      else if(pathname === "/checkLive"){
          var que=url.parse(req.url).query;
         
          var callback = function(err, result) {
            res.writeHead(200, {
                'Content-Type' : 'text/plain'
            });
            console.log('json:', result);
            res.write(result);
            res.end();
            }; 
          checkLive(callback);
      }
      else if(pathname === "/pollserver"){
          var que=url.parse(req.url).query;
          var user =querystring.parse(que)["user"];
          
          var callback = function(err, result) {
            res.writeHead(200, {
                'Content-Type' : 'text/plain'
            });
            console.log('json:', result);
            res.write(result);
            res.end();
          }; 
            pollServerForText(callback,user);
      }
      else{
          console.log(pathname +"correct requested");
      }
        // querystring.parse(que)["foo"]
       // console.log(que +"correct requested");
    }
 

}).listen(1337, '192.168.0.100');
console.log('Server running at http://192.168.0.100:1337/');


function loginAdmin(callback,username,password){
var queryString = 'SELECT * FROM admin WHERE ID = "username" AND PASSWORD = "password"';
 var fullquery =queryString.replace("username",username).replace("password",password)
   connection.query(fullquery, function(err, rows, fields) {
    
        console.log(rows);
   // wrap result-set as json
       var json = JSON.stringify(rows);
        if(rows[0] == null){
          console.log('JSON-result:', "empty");
           callback(null, "empty");   
        }
        else{
         console.log('JSON-result:', json);
        callback(null, json);    
        }
         
    }
  
   
//    for (var i in rows) {
//       // console.log('Post Titles: ', rows[i].phoneNumber);
//         console.log('Post Titles: ', rows);
//    }

  );

} 
function endStream(callback){
  var queryString = 'DELETE a.*, b.* FROM sermon as a, sermontext as b';

 
   connection.query(queryString, function(err, rows, fields) {
      if(err) throw err;
      console.log("deleted")
         
    }
 

  );  
}
function loginUser(callback,username,password){
var queryString = 'SELECT * FROM user WHERE USERNAME = "username" AND PASSWORD = "password"';
 var fullquery =queryString.replace("username",username).replace("password",password)
   connection.query(fullquery, function(err, rows, fields) {
    
        console.log(rows);
   // wrap result-set as json
       var json = JSON.stringify(rows);
        if(rows[0] == null){
          console.log('JSON-result:', "empty");
           callback(null, "empty");   
        }
        else{
         console.log('JSON-result:', json);
        callback(null, json);    
        }
         
    }
 

  );

} 
function login(username,password){
   connection.connect();
 
var queryString = 'SELECT * FROM user WHERE ID='+username+'AND PASSWORD='+password;
 
connection.query(queryString, function(err, rows, fields) {
    if (err) throw err;
 
    for (var i in rows) {
       // console.log('Post Titles: ', rows[i].phoneNumber);
         console.log('Post Titles: ', rows);
    }
});
 
connection.end(); 
}

function Register(callback,username,password,phone){
        //connection.connect();

     var queryString = "INSERT INTO user (USERNAME,PASSWORD,ABOUT) VALUES('uname','pword','phone')";
          var fullquery=  queryString.replace("uname",username).replace("pword",password).replace("phone",phone);
        connection.query(fullquery, function(err, rows, fields) {
         if (err){
            callback(null, "duplicate");
         }
         else{
          
            console.log('JSON-result:', "persisted");
            callback(null, "persisted"); 
            }
         
           
     //    for (var i in rows) {
     //       // console.log('Post Titles: ', rows[i].phoneNumber);
     //         console.log('Post Titles: ', rows);
     //    }
});
 
}

function saveSermon(callback,title,preacher,date){
        //connection.connect();

     var queryString = "INSERT INTO sermon (TOPIC,POSTEDDATE,PREACHER,ID) VALUES('xx','yy','zz','dd')";
          var fullquery=  queryString.replace("xx",title).replace("yy",date).replace("zz",preacher).replace("dd",makeid());
        connection.query(fullquery, function(err, rows, fields) {
         if (err){
            callback(null, "duplicate");
         }
         else{
          
            console.log('JSON-result:', "persisted");
            callback(null, "persisted"); 
            }
});
 
}
function checkLive(callback){
        //connection.connect();

     var queryString = "SELECT * FROM sermon";
        connection.query(queryString, function(err, rows, fields) {
         if (err){
            callback(null, "network");
         }
         else{
             if(empty(rows)){
                 console.log('JSON-result:', "empty");
                 callback(null, "none"); 
             }
             else{
                 var json = JSON.stringify(rows)
               console.log('JSON-result:', json);
                 callback(null, json);   
             }
            
         }
});
 
}
function saveSermonText(callback,text,type,poster){
        //connection.connect();

     var queryString = "INSERT INTO sermontext (ID,TEXT,TIMEOFPOST,TYPE,POSTER) VALUES('ww','xx','yy','zz','kk')";
          var fullquery=  queryString.replace("ww",makeid()).replace("xx",text).replace("yy",new Date().toMysqlFormat()).replace("zz",type).replace("kk",poster);
        connection.query(fullquery, function(err, rows, fields) {
         if (err){
             throw  err;
            //callback(null, "duplicate");
         }
         else{
          
            console.log('JSON-result:', "persisted");
            callback(null, "persisted"); 
            }
});
 
}
Date.prototype.toMysqlFormat = function () {
    function pad(n) { return n < 10 ? '0' + n : n }
    return this.getFullYear() + "-" + pad(1 + this.getMonth()) + "-" + pad(this.getDate()) + " " + pad(this.getHours()) + ":" + pad(this.getMinutes()) + ":" + pad(this.getSeconds());
};

function pollServerForText(callback,user){
        //connection.connect();
      
     var queryString = "SELECT * FROM sermontext ORDER BY TIMEOFPOST ASC";
   
        connection.query(queryString, function(err, rows, fields) {
         if (err){
            callback(null, "none");
         }
         else{
            var json = JSON.stringify(rows);
            console.log('JSON-result:', json);
            callback(null, json); 
            }
});
 
}

function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
function empty(data)
{
  if(typeof(data) == 'number' || typeof(data) == 'boolean')
  {
    return false;
  }
  if(typeof(data) == 'undefined' || data === null)
  {
    return true;
  }
  if(typeof(data.length) != 'undefined')
  {
    return data.length == 0;
  }
  var count = 0;
  for(var i in data)
  {
    if(data.hasOwnProperty(i))
    {
      count ++;
    }
  }
  return count == 0;
}