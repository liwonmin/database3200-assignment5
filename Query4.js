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
          tweetCount: { $sum: 1 },
          avgRetweets: { $avg: "$retweet_count" }
        }
      },
      {
        $match: {
          tweetCount: { $gt: 3 }
        }
      },
      {
        $sort: { avgRetweets: -1 }
      },
      {
        $limit: 10
      }
    ]).toArray();

    console.log("Query4 answer:");
    results.forEach((user, i) => {
      console.log(
        `${i + 1}. ${user._id} | tweets: ${user.tweetCount} | avg retweets: ${user.avgRetweets}`
      );
    });

  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

run();