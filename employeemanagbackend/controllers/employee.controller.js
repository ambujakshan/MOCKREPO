const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'employemanage';

let employees=[
    {name:"Rahul",
      age:12,
      department:"Hr",
      place:"kollam",
      active:true,
      username:""
    },
    {name:"Ambu",
      age:26,
      department:"Hr",
      place:"Kochi",
      active:true,
      username:""
    }
  ]


  async function getnames(req, res) {
    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection('employees');
  
      // Fetch all documents from the collection
      const employees = await collection.find({}).toArray();
  
      // Send the employees as a JSON response
      res.status(200).json(employees);
    } catch (error) {
      console.error('Error occurred while fetching employee names from MongoDB:', error);
      // Send a 500 Internal Server Error response in case of any database-related errors
      res.status(500).json({ message: "Internal server error" });
    } finally {
      await client.close(); // Ensure the database connection is closed after the operation
    }
  }
  

  async function inserttnames(req, res) {
    const student = req.body;
  
    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection('employees');
      const userCollection = db.collection('user'); // Assuming user collection exists

      // Check if the student already exists in the collection
      const existingStudent = await collection.findOne({ name: student.username.trim().toLowerCase() });
  
      if (existingStudent) {
        // If student exists, send a 409 Conflict response
        res.status(409).json({ message: "Duplicate entry" });
      } else {
        // If student doesn't exist, insert the new student into the collection
        const result = await collection.insertOne(student);
        
        console.log("Inserted student:", result);
        const user = {
          username: student.username.trim(),
          password: student.username.trim().toLowerCase(), // Use the username as the password
          role: 'employee' // Fixed role
        };
  
        // Insert the new user into the user collection
        await userCollection.insertOne(user);
        console.log("Inserted user:", user);
  
        // Send a success response with the inserted student's data
        res.status(200).json({ message: "success", data: student });
      }
    } catch (error) {
      console.error('Error occurred while interacting with MongoDB:', error);
      // Send a 500 Internal Server Error response in case of any database-related errors
      res.status(500).json({ message: "Internal server error" });
    } finally {
      await client.close(); // Ensure the database connection is closed after the operation
    }
  }
  
  async function deleteitem(req, res) {
    const name = req.query.username;
  
    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection('employees');
      const userCollection = db.collection('user'); // Assuming user collection exists

      // Delete the employee from the collection by name
      const result = await collection.deleteOne({ username: name.trim().toLowerCase() });
      const result1 = await userCollection.deleteOne({ username: name.trim().toLowerCase() });

      if (result.deletedCount > 0) {
        res.status(200).json({ message: "Deleted" });
      } else {
        res.status(404).json({ message: "Item not Found" });
      }
    } catch (error) {
      console.error('Error occurred while deleting employee from MongoDB:', error);
      res.status(500).json({ message: "Internal server error" });
    } finally {
      await client.close();
    }
  }
  
  async function updateitem(req, res) {
    const name = req.query.username;
    const student = req.body;
  
    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection('employees');
  
      // Update the employee's information by name
      const result = await collection.updateOne(
        { username: name.trim().toLowerCase() }, // Filter by name
        { $set: student } // Update the employee's details
      );
  
      if (result.matchedCount > 0) {
        res.status(200).json({ message: "Updated" });
      } else {
        res.status(404).json({ message: "Item not Found" });
      }
    } catch (error) {
      console.error('Error occurred while updating employee in MongoDB:', error);
      res.status(500).json({ message: "Internal server error" });
    } finally {
      await client.close();
    }
  }
  
module.exports ={getnames,inserttnames,deleteitem,updateitem}

