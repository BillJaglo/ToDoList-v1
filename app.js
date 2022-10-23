const express = require("express");
const bodyParser = require("body-parser");
// since this date module is local and not used accessing npm install, the way we access is different
// we have to use the filepath of the module
const date = require(__dirname + "/date.js");

const app = express();

// when assigning a const, it's not protecting the things INSIDE that object
// so the items INSIDE the array are not being protected, those things are still able to be varied
// you just can't assign it to a new entirely object or array
const items = ["Buy food", "Cook food", "Eat food"];
const workItems = [];

// needed for ejs to work.  This comes from the ejs docs
// tells our app (which is using express) to use ejs as it's view engine.  This must be placed below the app=express line
app.set('view engine', 'ejs');

// this is just necessary to start parsing through body of request when using body-parser
app.use(bodyParser.urlencoded({extended: true}));

// this tells express to also load the files in the 'public' directory in the project
// otherwise, these files would not be loaded when express runs the server and there would be no way to target these
app.use(express.static("public"));

app.get("/", function(req, res) {

  // this runs the function from the date module (pulled in above using require)
  // since the date module has module.exports.getDate = getDate, this runs that getDate function and has whatever the return is
  // could just use let day= date.getDay(); to get just the day.  This function also comes from the date.js file
  let day = date.getDate();

  // creating a response by rendering a file called list, which HAS to exist in a folder called views and needs an extension of .ejs
  // into that list file, we are passing in a signle variable that has the name of kindOfDay
  // the value of kindOfDay that we are passing in is = to the value of the variable day (coming from this app.js file)
  res.render("list", {
    listTitle: day,
    newListItems: items,
  });
});


app.get("/work", function(req, res){
  res.render("list", {listTitle: "Work List", newListItems: workItems})
});

app.post("/", function(req, res){

  let item = req.body.newItem;

  // .list is the key of the request being sent when the post request is made, this comes from the name of the button
  // if statement checks if the post request body.list was equal to "Work", if it is then it adds that item to the workItems array
  // else it adds the item to the items array
  if (req.body.list === "Work") {
    workItems.push(item);
    // redirects to the "/work" get route
    res.redirect("/work");
  } else {
    // adds the new item to the items array (defined globally at the top of app.js)
    items.push(item);
    // when the post request is made, it redirects to the "/" get and will res.render the newListItem:item
    res.redirect("/");
  }

});

app.post("/work", function(req, res){
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.get("/about", function(req, res){
  res.render("about");
});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
