const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const db = client.db("ieeevisTweets");
    const tweets = db.collection("tweet");

    const result = await tweets.aggregate([
      {
        $group: {
          _id: "$user.screen_name",
          tweetCount: { $sum: 1 }
        }
      },
      {
        $sort: { tweetCount: -1 }
      },
      {
        $limit: 1
      }
    ]).toArray();

    console.log("Query3 answer:");
    console.log(result[0]);

  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

run();