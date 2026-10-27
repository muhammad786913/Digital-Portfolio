import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || '';
const options = {};

let client;
let clientPromise;

// In-memory fallback store when MONGODB_URI is not configured yet
// This guarantees zero-downtime and lets the portfolio function smoothly out of the box!
export const localStore = {
  contacts: [
    {
      _id: "seed_1",
      name: "Ahmed Khan",
      email: "ahmed.k@digitalimpact.io",
      phone: "+92 300 1234567",
      projectType: "Full Stack Web App",
      budget: "$1,500 - $3,000",
      message: "Hi Muhammad, loved your work on the Digital Impact clone. We need an MVP built with Next.js & MongoDB.",
      createdAt: new Date().toISOString()
    }
  ],
  pageViews: 1420
};

if (uri) {
  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
} else {
  clientPromise = null;
}

export default clientPromise;
