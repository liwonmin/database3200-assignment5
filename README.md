# database3200-assignment5
assignment5


## Query5 – Separate the Users Collection

To separate the user information into a different collection, I create a new `users` collection containing one document per unique user, using the user’s `id` as the primary identifier. I scan the original `tweet` collection, extract each embedded `user` object, and insert it into the `users` collection only if that user id is not already present.

Then I create a new `Tweets_Only` collection by copying each tweet but removing the embedded `user` object and replacing it with a `user_id` field that stores the original user’s id. This allows each tweet to reference its author without duplicating the entire user object.

This approach normalizes the database structure, reduces duplicated user data across tweets, and makes updates to user information easier because each user is stored only once.