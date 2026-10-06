// MongoDB Basic Assignment

// Task 1: Database and Collection Setup

// 1. List the available databases.
show dbs

// 2. Create and select the `company` database.
use company

// 3. Create the `employees` collection.
db.createCollection("employees")

// 4. List the collections in the `company` database.
show collections

// 5. Insert the employee documents into the `employees` collection.
db.employees.insertMany([
{
  _id: "EMP001",
  name: "John",
  department: "Engineering",
  experience: 4,
  skills: ["Java", "Spring Boot"],
  active: true,
  address: {
    city: "Pune",
    country: "India"
  }
},
{
  _id: "EMP002",
  name: "Alice",
  department: "HR",
  experience: 3,
  skills: ["Recruitment", "Communication"],
  active: true,
  address: {
    city: "Mumbai",
    country: "India"
  }
},
{
  _id: "EMP003",
  name: "David",
  department: "Engineering",
  experience: 6,
  skills: ["Java", "MongoDB"],
  active: true,
  address: {
    city: "Bengaluru",
    country: "India"
  }
},
{
  _id: "EMP004",
  name: "Emma",
  department: "Finance",
  experience: 2,
  skills: ["Accounting", "Excel"],
  active: false,
  address: {
    city: "Pune",
    country: "India"
  }
},
{
  _id: "EMP005",
  name: "Robert",
  department: "Engineering",
  experience: 5,
  skills: ["Java", "Docker"],
  active: true,
  address: {
    city: "Delhi",
    country: "India"
  }
}
])

// 6. Verify that the documents were inserted correctly.
db.employees.find()

// Task 2: Read and Query Operations

// 1. Find engineering employees, showing their IDs, names, and experience, sorted by name.
db.employees.find({department:"Engineering"},{_id:1,name: 1, experience: 1}).sort({name:1})

// 2. Find employees with at least five years of experience, sorted by experience in descending order.
db.employees.find({experience: {$gte :5}},{name: 1, experience: 1,_id: 0}).sort({experience:-1})

// 3. Find employees in Pune using a nested document query.
db.employees.find({"address.city":"Pune"},{_id:0,name:1,"address.city":1}).sort({name:1})

// 4. Find employees whose skills include MongoDB or Spring Boot.
db.employees.find({skills:{ $in : ["MongoDB","Spring Boot"] }}).sort({name:1})

// 5. Return the two most experienced employees.
db.employees.find({},{_id:0,name:1,experience:1}).sort({experience:-1}).limit(2)

// Task 3: Update Operations

// 1. Use `$inc` to increase Alice's experience by one year.
db.employees.updateOne({name:"Alice"},{$inc:{experience:1}})

// Verify the update:
db.employees.find({name:"Alice"})

// 2. Use `$set` to activate Emma's account.
db.employees.updateOne({name:"Emma"},{$set:{active:true}})

// Verify the update:
db.employees.find({name:"Emma"})

// 3. Use `$addToSet` to add MongoDB to Robert's skills without creating a duplicate.
db.employees.updateOne({name:"Robert"},{$addToSet:{skills:"MongoDB"}})

// Verify the update:
db.employees.find({name:"Robert"})

// Task 4: Delete Operations

// 1. Insert a temporary document.
db.employees.insertOne({_id: "EMP999",name: "Temporary Employee",department: "Training",experience: 0})

// 2. Verify that the temporary document was inserted.
db.employees.findOne({ _id: "EMP999" })

// 3. Delete the document by its `_id`.
db.employees.deleteOne({_id:"EMP999"})

// 4. Verify that the document was deleted.
db.employees.findOne({ _id: "EMP999" })

// 5. Count the total number of documents in the `employees` collection.
db.employees.countDocuments()

// Task 5: Indexing

// 1. Check the indexes on the `employees` collection.
db.employees.getIndexes()

// 2. Create an index on the `department` field.
db.employees.createIndex({department:1})

// 3. Verify the indexes.
db.employees.getIndexes()

// Task 6: Aggregation

// 1. Count the employees in each department.
db.employees.aggregate([{$group:{_id:"$department",totalEmployees:{$sum:1}}},{$sort:{_id:1}}])

// 2. Calculate the average experience in each department.
db.employees.aggregate([{$group: {_id: "$department","Avg exp of employees": {$avg: "$experience" }}},{$sort: { _id: 1 }}])

// 3. Find the two most experienced employees in Engineering.
db.employees.aggregate([{$match:{department:"Engineering"}},{$project:{_id:0,name:1,experience:1}},{$sort:{experience:-1}},{$limit:2}])
