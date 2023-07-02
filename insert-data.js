import { MongoClient } from "mongodb";
// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb+srv://vinh:vinh@cluster0.soq8j.mongodb.net/KidsPre?retryWrites=true&w=majority";
const client = new MongoClient(uri);
async function run() {
  try {
    const database = client.db("KidsPre");
    const listhomes = database.collection("listhomes");
    // create an array of documents to insert
    const docs = [
        {
            title: 'Test insert',
        }, {
         title:'Test 2',
     }
    ];
    // this option prevents additional documents from being inserted if one fails
    const options = { ordered: true };
    const result = await listhomes.insertMany(docs, options);
    // console.log(`${result.insertedCount} documents were inserted`);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);