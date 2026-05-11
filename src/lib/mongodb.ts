import { MongoClient, ServerApiVersion } from 'mongodb';

// Fix local Node.js DNS resolution issues (ECONNREFUSED querySrv) by forcing Google DNS.
// Guard against edge runtimes where the Node-only dns module is unavailable.
const isNodeRuntime = typeof process !== 'undefined' && !!process.versions?.node;
if (process.env.NODE_ENV === 'development' && isNodeRuntime) {
  void (async () => {
    try {
      const dns = await import('node:dns');
      dns.setServers(['8.8.8.8', '8.8.4.4']);
    } catch {
      // Ignore when running in environments without the dns module.
    }
  })();
}

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
