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
// Create Many Records with model.create()
//Sometimes you need to create many instances of your models, e.g. when seeding a database with initial data. Model.create() takes an array of objects like [{name: 'John', ...}, {...}, ...] as the first argument, and saves them all in the db.
//Modify the createManyPeople function to create many people using Model.create() with the argument arrayOfPeople.
let arrayOfPeople = [
  { name: "Mike", age: 37, favoriteFoods: ["fruit"] },
  { name: "Marry", age: 58, favoriteFoods: ["spaghetti"] },
  { name: "Peter", age: 21, favoriteFoods: ["chicken"] }
];

const createManyPeople = function (arrayOfPeople, done) {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};

//5:
// Use model.find() to Search Your Database
// Modify the findPeopleByName function to find all the people having a given name, using Model.find() -> [Person]
// Use the function argument personName as the search key.
const findPeopleByName = function (personName, done) {
  Person.find({ name: personName }, function (err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};



//6:
//Use model.findOne() to Return a Single Matching Document from Your Database
//Modify the findOneByFood function to find just one person which has a certain food in the person's favorites, using Model.findOne() -> Person. Use the function argument food as search key.
const findOneByFood = function (food, done) {
  Person.findOne({ favoriteFoods: food }, function (err, foundData) {
    if (err) return console.log(err);
    done(null, foundData);
  });
};

//7:
//Use model.findById() to Search Your Database By _id
//Modify the findPersonById to find the only person having a given _id, using Model.findById() -> Person. Use the function argument personId as the search key.
const findPersonById = function (personId, done) {
  Person.findById(personId, function (err, idFound) {
    if (err) return console.log(err);
    done(null, idFound);
  });
};


//8:
// Perform Classic Updates by Running Find, Edit, then Save
//Modify the findEditThenSave function to find a person by _id (use any of the above methods) with the parameter personId as search key. Add "hamburger" to the list of the person's favoriteFoods (you can use Array.push()). Then - inside the find callback - save() the updated Person.

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, personIdFound) => {
    if (err) return console.log(err);
    personIdFound.favoriteFoods.push(foodToAdd);
    personIdFound.save((err, updatedPerson) => {
      if (err) return console.log(err);
      done(null, updatedPerson);
    });
  });
};


//9:
//Perform New Updates on a Document Using model.findOneAndUpdate()
//Modify the findAndUpdate function to find a person by Name and set the person's age to 20. Use the function parameter personName as the search key.
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, (err, updatedData) => {
    if (err) return console.log(err);
    done(null, updatedData);
  });
};


//10:
//Delete One Document Using model.findByIdAndRemove
//Modify the removeById function to delete one person by the person's _id. You should use one of the methods findByIdAndRemove() or findOneAndRemove().
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedData) => {
    if (err) return console.log(err);
    done(null, removedData);
  });
};


//11:
// Delete Many Documents with model.remove()
//Modify the removeManyPeople function to delete all the people whose name is within the variable nameToRemove, using Model.remove(). Pass it to a query document with the name field set, and a callback.
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, removedData) => {
    if (err) return console.log(err);
    done(null, removedData);
  });
};


//12:

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
