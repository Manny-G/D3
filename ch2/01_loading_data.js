d3.csv("d3_in_action_2/data/cities.csv", (error, data) => {console.log(error, data)}); // explicit
d3.csv("d3_in_action_2/data/cities.csv", (x) => {console.log(x)}); // implicit

d3.csv("d3_in_action_2/data/cities.csv", data => console.log(data));
d3.json("d3_in_action_2/data/tweets.json", data => console.log(data));

d3.csv("d3_in_action_2/data/cities.csv", function(data) => {doSomethingWithData(data)}); // old-school, wait for data

// Transforming data
parseInt("77"); // string -> int
parseFloat("3.14"); // string -> float
Date.parse("Sun, 22 Dec 2013 08:00:00 GMT"); // string -> Data datatype
text = "a,b,c".split(","); // split string via comma

// == comparison typecasts implicitly
// === compasion no typecasting

// simple scale
d3.scale().linear() // for linear scaling, duh
// complex scale 1
var ramp = d3.scaleLinear().domain([500000, 13000000]).range([0, 500]);
var a = ramp(1000000); // get 20 back
var b = ramp(9000000); // get 340 back
var c = ramp.invert(313); // get 830,000 back (feeding it backwards
// complex scale 2
var ramp = d3.scaleLinear().domain([500000, 13000000]).range(["blue", "red"]);
var a = ramp(1000000); // get “#ad0052” back
var b = ramp(9000000); // get “#0a00f5” back
var c = ramp.invert("#ad0052"); // get NaN, only works on numbers

// other scales: d3.scaleLog() , d3.scalePow() , d3.scaleOrdinal(), d3.scaleTime()
// d3.scaleQuantile() a fancy catagorical scale

// reorganizing base on ID's with d3.nest()
d3.json("d3_in_action_2/data/tweets.json", data => {
  var tweetData = data.tweets;
  var nestedTweets = d3.nest()
    .key(d => d.user)
    .entries(tweetData);
} // object organized by user

// measuring data
var testArray = [88,10000,1,75,12,35];
d3.min(testArray, el => el);
d3.max(testArray, el => el);
d3.mean(testArray, el => el);
d3.extent(data, el => el.population);
