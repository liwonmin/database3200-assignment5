# database3200-assignment5
assignment5


Query 5 explanation:
To separate the user information into a different collection, I create a new users collection containing one document per unique user, using the user’s id as the main identifier. I  scan the original tweet collection, extract each embedded user object, and insert it into the users collection only if that user does not already exist. Then I  create a new Tweets_Only collection by copying each tweet, removing the embedded user object, and replacing it with a user_id field that stores the original user’s id. This makes the database more normalized, reduces duplicated user data, and makes user updates easier because each user is stored only once.