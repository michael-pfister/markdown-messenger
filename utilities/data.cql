-- Create a keyspace
CREATE KEYSPACE IF NOT EXISTS markdown_messenger WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : '1' };

-- Create table for user credentials
CREATE TABLE IF NOT EXISTS markdown_messenger.credentials_by_user (
email TEXT PRIMARY KEY,
password_hash text
)
WITH comment = 'Q1. Find user credentials';

-- Create table for user settings
CREATE TABLE IF NOT EXISTS markdown_messenger.settings_by_user (
email TEXT PRIMARY KEY,
name TEXT,
avatar_url TEXT,
status BOOLEAN
-- might add inet IP_ADDRESS for socket connection
)
WITH comment = 'Q2. Find user settings';

-- Create table for user contacts
CREATE TABLE IF NOT EXISTS markdown_messenger.contacts_by_user (
email TEXT,
contact TEXT, -- email of different user
PRIMARY KEY((email), contact)
)
WITH comment = 'Q3. Find user contacts'
AND CLUSTERING ORDER BY (contact ASC);

-- Create table for user messages
CREATE TABLE IF NOT EXISTS markdown_messenger.message_by_user ( --!!!!!! Change message_by_usser to messages_by_user in API
email TEXT,
target TEXT, -- email of target user
message TEXT,
created_at TIMESTAMP,
PRIMARY KEY ((email), target, created_at)
)
WITH comment = 'Q4. Find messages for a given contact'
AND CLUSTERING ORDER BY (target ASC, created_at DESC);


-- DONT COPY THIS

-- DEBUG QUERIES
SELECT * FROM markdown_messenger.credentials_by_user;
SELECT * FROM markdown_messenger.settings_by_user;
SELECT * FROM markdown_messenger.contacts_by_user;
SELECT * FROM markdown_messenger.message_by_user;

-- Insert some data

INSERT INTO markdown_messenger.credentials_by_user
(email, password_hash)
VALUES ('melon.musk@gmail.com', '6bY_:td823bUZD7');

INSERT INTO markdown_messenger.contacts_by_user
(email, contact)
VALUES ('melon.musk@gmail.com', 'R2D2@gmail.com');

INSERT INTO markdown_messenger.message_by_user
(email, target, created_at, message)
VALUES
('homer.simpson@gmail.com', 'marge.simpson@gmail.com', toTimeStamp(now()), 'did you get the donuts?');

INSERT INTO markdown_messenger.message_by_user
(email, target, created_at, message)
VALUES
('marge.simpson@gmail.com', 'homer.simpson@gmail.com', toTimeStamp(now()), 'I did get your donuts');

/* INSERT INTO store.shopping_cart
(userid, item_count, last_update_timestamp)
VALUES ('9876', 2, toTimeStamp(now()));
INSERT INTO store.shopping_cart
(userid, item_count, last_update_timestamp)
VALUES ('1234', 5, toTimeStamp(now()));
 */
-- quickstart database https://cassandra.apache.org/_/quickstart.html
-- run cassanrda docker image and expose to port 9042 -> docker run -d --name cassandra -p 9042:9042 cassandra