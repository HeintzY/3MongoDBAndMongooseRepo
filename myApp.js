require('dotenv').config();
let mongoose = require('mongoose'); //*1

// 1:
// Install and Set Up Mongoose
// mongoose@^5.11.15 has been added to your project’s package.json file. First, require mongoose as mongoose in myApp.js. Next, create a .env file and add a MONGO_URI variable to it. Its value should be your MongoDB Atlas database URI. Be sure to surround the URI with single or double quotes, and remember that you can't use spaces around the = in environment variables. For example, MONGO_URI='VALUE'.
// When you are done, connect to the database by calling the connect method within your myApp.js file by using the following syntax: 
// mongoose.connect(<Your URI>, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

//2:
// Create a Model
// Create a person schema called personSchema with the following shape:
// A required name field of type String
// An age field of type Number
// A favoriteFoods field of type [String]
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});
// Now, create a model from the personSchema and assign it to the existing variable Person.
let Person = mongoose.model("Person", personSchema);


//3:
// Create and Save a Record of a Model
// Within the createAndSavePerson function, create a document instance using the Person model constructor you built before. Pass to the constructor an object having the fields name, age, and favoriteFoods. Their types must conform to the ones in the personSchema. Then, call the method document.save() on the returned document instance. Pass to it a callback using the Node convention. This is a common pattern; all the following CRUD methods take a callback function like this as the last argument.

const createAndSavePerson = (done) => {
  let paulPeters = new Person({ name: "Paul Peters", age: 39, favoriteFoods: ["pizza"] });
  paulPeters.save(function (err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

//4:


const createManyPeople = (arrayOfPeople, done) => {
  done(null /*, data*/);
};

const findPeopleByName = (personName, done) => {
  done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
