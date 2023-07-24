const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors())
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uo7e35u.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        client.connect();

        const collegeDetails = client.db('eduDB').collection('collegeDetails');
        const reviews = client.db('eduDB').collection('reviews');

        app.get('/college-details', async (req, res) => {
            const result = await collegeDetails.find().toArray();
            res.send(result);
        })

        app.get('/reviews', async (req, res) => {
            const result = await reviews.find().toArray();
            res.send(result);
        })

        // app.get('/my-toys', async (req, res) => {
        //     const sort = req.query.sort;
        //     let query = {};
        //     const options = {

        //         sort: { "price": sort === 'asc' ? 1 : -1 },

        //     };
        //     if (req.query?.sellerEmail) {
        //         query = { sellerEmail: req.query.sellerEmail }
        //     }
        //     const result = await toyCollection.find(query, options).toArray();
        //     res.send(result);
        // })

        app.get('/college-details/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await collegeDetails.findOne(query);
            res.send(result);
        })

        // app.post('/toy-collection', async (req, res) => {
        //     const toys = req.body;
        //     console.log(toys);
        //     const result = await toyCollection.insertOne(toys);
        //     res.send(result);
        // })

        // app.patch('/my-toys/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const filter = { _id: new ObjectId(id) };
        //     const updatedToy = req.params.id;
        //     console.log(updatedToy);
        //     const updateDoc = {
        //         $set: {

        //         },
        //     };
        // })

        // app.delete('/my-toys/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: new ObjectId(id) };
        //     const result = await toyCollection.deleteOne(query);
        //     res.send(result);
        // })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('eduConnect server running.........');
})

app.listen(port, () => {
    console.log(`eduConnect server listening on port ${port}`);
}) 