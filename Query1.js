const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const db = client.db("ieeevisTweets");
    const tweets = db.collection("tweet");

    const count = await tweets.countDocuments({
      retweeted_status: { $exists: false },
      in_reply_to_status_id: null
    });

    console.log("Query1 answer:", count);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
  }
}

run();
