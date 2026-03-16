const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const db = client.db("ieeevisTweets");
    const tweets = db.collection("tweet");
    const users = db.collection("users");
    const tweetsOnly = db.collection("Tweets_Only");

    // clear old collections if needed
    await users.deleteMany({});
    await tweetsOnly.deleteMany({});

    const allTweets = await tweets.find({}).toArray();

    for (const tweet of allTweets) {
      // 1. store unique user
      if (tweet.user && tweet.user.id) {
        await users.updateOne(
          { _id: tweet.user.id },
          { $set: { ...tweet.user, _id: tweet.user.id } },
          { upsert: true }
        );
      }

      // 2. create tweet without embedded user object
      const newTweet = { ...tweet };
      delete newTweet.user;

      newTweet.user_id = tweet.user ? tweet.user.id : null;

      await tweetsOnly.insertOne(newTweet);
    }

    console.log("Query5 complete:");
    console.log("Created users collection with unique users");
    console.log("Created Tweets_Only collection with user_id references");

  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

run();

