const express = require('express')
const app = express()
app.use(express.json())
const port = 3000
var cors = require('cors')
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.post('/user', async(req, res) => {
   
    const data = req.body
    const result = await userCollection.insertOne(data)
    res.send(result)
})


// Define a route for serving the products.json file
// app.get('/products', async (req, res) => {
//     try {
//       const result = await userCollection.find().toArray();
//       res.json(result);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });
  
  // Serve the main HTML file
//   app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
//   });

app.get('/user/:id', async(req, res) => {
    const id = req.params.id
    const quary = {_id: new ObjectId(id)}
    console.log(quary);
    const result = await userCollection.find()
    res.send(result)
})



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb://127.0.0.1:27017";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const userCollection = client.db('test').collection('User');

app.post('/user',(req,res)=>{
    const data = req.body
    const result = userCollection.insertOne(data)
    res.send(result)
})
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
