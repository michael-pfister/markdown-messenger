const { Client } = require("cassandra-driver");
require('dotenv').config({ path: '../.env' });

async function run() {
    const client = new Client({
      cloud: {
        secureConnectBundle: "secure-connect-markdown-messenger.zip",
      },
      credentials: {
        username: process.env.DATASTAXCLIENTID,
        password: process.env.DATASTAXCLIENTSECRET,
      }
    });
  
    await client.connect();
  
    // Execute a query
    const rs = await client.execute("SELECT * FROM system.local");
    console.log(rs);
  
    await client.shutdown();
  }
  
// Run the async function
run();