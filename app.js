const express = require('express');
const mongoose = require('mongoose');
const Dog = require('./models/dogs'); // Make sure this path is correct

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// -------- API Endpoints --------

// GET all dogs
app.get('/dogs', async (req, res) => {
  try {
    const dogs = await Dog.find();
    res.json(dogs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch dogs' });
  }
});

// GET a single dog by ID
app.get('/dogs/:id', async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id);
    if (!dog) return res.status(404).json({ error: 'Dog not found' });
    res.json(dog);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch dog' });
  }
});

// POST - Create a new dog
app.post('/dogs', async (req, res) => {
  try {
    const newDog = new Dog(req.body);
    const savedDog = await newDog.save();
    res.status(201).json(savedDog);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create dog', details: err.message });
  }
});

// PUT - Update a dog
app.put('/dogs/:id', async (req, res) => {
  try {
    const updatedDog = await Dog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedDog) return res.status(404).json({ error: 'Dog not found' });
    res.json(updatedDog);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update dog', details: err.message });
  }
});

// DELETE - Remove a dog
app.delete('/dogs/:id', async (req, res) => {
  try {
    const deletedDog = await Dog.findByIdAndDelete(req.params.id);
    if (!deletedDog) return res.status(404).json({ error: 'Dog not found' });
    res.json({ message: 'Dog deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete dog' });
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});