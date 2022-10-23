// this js file is related to finding the date fields needed in the app
// by using the module.exports, we can use functions in this file in other files
// to load this file in other files, use const <varname> = require (__dirname + "/filename")


// this is written in a different way then I normally write functions
// this lets you declare a variable being = to a functions
// so now you could just say getDate and it would run the function
// this line lets you use the getDate function in another file (such as the app.js)
module.exports.getDate = function () {
  const today = new Date();

  // create 'options' object, going to be used to render the day
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  }

  // gets todays date in DateString using the "en-us" locale and passing in the 'options' JS object from above
  // the options used come from the docs, weekday: "long" means the weekday is written in long form
  return today.toLocaleDateString("en-US", options);
};


// this line lets you use the getDate function in another file (such as the app.js)
// there is a shortcut where you can just write exports.xxxx instead of module.exports.xxxx, it does the same thing
exports.getDay = getDay;

function getDay() {
  const today = new Date();


  // create 'options' object, going to be used to render the day
  const options = {
    weekday: "long",
  }

  // gets todays date in DateString using the "en-us" locale and passing in the 'options' JS object from above
  // the options used come from the docs, weekday: "long" means the weekday is written in long form
  return today.toLocaleDateString("en-US", options);
};
