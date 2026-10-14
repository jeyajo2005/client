import mongoose from 'mongoose';

export async function connectDB() {
  // Disable buffering so disconnected queries fail fast or use fallback instead of freezing 10s
  mongoose.set('bufferCommands', false);

  const uris = [
    process.env.MONGO_URI,
    'mongodb://127.0.0.1:27017/thirupathi_portfolio'
  ].filter(Boolean);

  // Remove duplicate URIs
  const uniqueUris = [...new Set(uris)];

  for (const uri of uniqueUris) {
    try {
      const isLocal = uri.includes('127.0.0.1') || uri.includes('localhost');
      const conn = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: isLocal ? 2000 : 3000,
        tlsAllowInvalidCertificates: true
      });
      console.log(`[MongoDB] Connected successfully (${isLocal ? 'Local DB' : 'Atlas DB'}): ${conn.connection.host}/${conn.connection.name}`);
      return conn;
    } catch (error) {
      const isLocal = uri.includes('127.0.0.1') || uri.includes('localhost');
      console.warn(`[MongoDB] ${isLocal ? 'Local DB' : 'Atlas DB'} attempt failed: ${error.message}`);
    }
  }

  console.warn('[MongoDB] Continuing with high-resilience in-memory & file storage fallback.');
}

