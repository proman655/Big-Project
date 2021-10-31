// connect to the database
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://tevin:tevin@largeproject.jljb5.mongodb.net/large-proj?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});v