const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // Your MongoDB URI
const client = new MongoClient(uri);

const dbName = 'employemanage';  // Replace with your actual database name
const collectionName = 'reviews';  // Replace with your collection name

exports.assignrevewer = async (req, res) => {
  try {
    const { username, reviewerName } = req.body;
    
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Check if the assignment already exists
    const existingAssignment = await collection.findOne({ username, reviewerName });

    if (existingAssignment) {
      return res.status(400).json({ message: 'Reviewer already assigned to this employee' });
    }

    // Create a new review assignment
    const newAssignment = {
      username,
      reviewerName,
      status: 'pending',
      review: ''
    };

    // Insert the new assignment
    await collection.insertOne(newAssignment);

    return res.status(200).json({ message: 'Reviewer assigned successfully' });
  } catch (error) {
    console.error('Error in assigning reviewer', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await client.close();
  }
};

// Function to submit a review
exports.submitReview = async (req, res) => {
    const reviewId = req.params.id;
    const { review, status } = req.body;
  
    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection('reviews');
  
      // Update the review in the database
      await collection.updateOne(
        { _id: new ObjectId(reviewId) },
        { $set: { review: review, status: status || 'Completed' } }
      );
  
      res.status(200).json({ message: 'Review submitted successfully' });
    } catch (error) {
      console.error('Error submitting review:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    } finally {
      await client.close();
    }
  };
  

// Optional: Function to get all reviews for a particular employee
exports.getEmployeeReviews = async (req, res) => {
  try {
    const { username } = req.params;

    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Fetch all review assignments for a specific employee
    const reviews = await collection.find({ username }).toArray();

    if (reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found for this employee' });
    }

    return res.status(200).json(reviews);
  } catch (error) {
    console.error('Error in fetching reviews', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await client.close();
  }
};
