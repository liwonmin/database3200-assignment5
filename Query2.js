const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const db = client.db("ieeevisTweets");
    const tweets = db.collection("tweet");

    const results = await tweets.aggregate([
      {
        $group: {
          _id: "$user.screen_name",
          followers: { $max: "$user.followers_count" }
        }
      },
      {
        $sort: { followers: -1 }
      },
      {
        $limit: 10
      }
    ]).toArray();

    console.log("Query2 answer:");
    results.forEach((user, index) => {
      console.log(`${index + 1}. ${user._id} - ${user.followers}`);
    });
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
  }
}

run();
