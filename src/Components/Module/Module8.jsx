import React, { useState } from 'react';
import BearMascot from '../BearMascot';

const Module8 = ({ onBackToPath, onModuleComplete }) => {
  const [openAnswers, setOpenAnswers] = useState({}); // Track which answers are open

  // MongoDB Interview Questions with detailed answers
  const interviewQuestions = [
    {
      id: 1,
      category: "Fundamentals",
      question: "What is MongoDB and how does it differ from traditional SQL databases?",
      answer: `MongoDB is a NoSQL document-oriented database that stores data in flexible, JSON-like documents called BSON (Binary JSON). Key differences from SQL databases:

**Document Model vs Relational Model:**
• MongoDB stores data as documents in collections (similar to rows in tables)
• Documents can have nested structures and arrays
• No need for complex JOINs - related data can be embedded

**Schema Flexibility:**
• Dynamic schema - documents in the same collection can have different fields
• Easy to evolve data models without migrations
• SQL databases require predefined schemas

**Scalability:**
• Built for horizontal scaling (sharding)
• Automatic load balancing across shards
• SQL databases typically scale vertically

**Query Language:**
• Uses MongoDB Query Language (MQL) instead of SQL
• Rich query capabilities with aggregation pipeline
• Supports complex nested queries

**ACID Properties:**
• MongoDB 4.0+ supports multi-document ACID transactions
• Traditional focus on eventual consistency
• SQL databases have strong ACID guarantees`
    },
    {
      id: 2,
      category: "Data Modeling",
      question: "Explain the concept of embedding vs referencing in MongoDB. When would you use each approach?",
      answer: `**Embedding (Denormalization):**
Storing related data within the same document.

Example:
\`\`\`json
{
  "_id": ObjectId("..."),
  "title": "MongoDB Tutorial",
  "author": "John Doe",
  "comments": [
    {
      "user": "Alice",
      "text": "Great article!",
      "date": ISODate("2023-01-01")
    }
  ]
}
\`\`\`

**When to use Embedding:**
• One-to-many relationships where "many" is limited
• Data that's frequently accessed together
• When you need atomic updates
• Read-heavy workloads

**Referencing (Normalization):**
Storing references to documents in other collections.

Example:
\`\`\`json
// Posts collection
{
  "_id": ObjectId("..."),
  "title": "MongoDB Tutorial",
  "author_id": ObjectId("...")
}

// Authors collection
{
  "_id": ObjectId("..."),
  "name": "John Doe",
  "email": "john@example.com"
}
\`\`\`

**When to use Referencing:**
• Many-to-many relationships
• Large documents that exceed 16MB limit
• Data that changes frequently
• When you need to query referenced data independently
• One-to-many where "many" is unbounded`
    },
    {
      id: 3,
      category: "Indexing",
      question: "What are indexes in MongoDB? Explain different types of indexes and their use cases.",
      answer: `**Indexes** are data structures that improve query performance by creating shortcuts to documents.

**Types of Indexes:**

**1. Single Field Index:**
\`\`\`javascript
db.users.createIndex({ "email": 1 })
\`\`\`
• Most basic type
• Sorts field in ascending (1) or descending (-1) order

**2. Compound Index:**
\`\`\`javascript
db.users.createIndex({ "age": 1, "name": 1 })
\`\`\`
• Multiple fields in a single index
• Order matters - use ESR (Equality, Sort, Range) rule

**3. Multikey Index:**
• Automatically created when indexing array fields
• Allows efficient queries on array elements

**4. Text Index:**
\`\`\`javascript
db.articles.createIndex({ "title": "text", "content": "text" })
\`\`\`
• Enables full-text search capabilities
• Supports stemming and language-specific stop words

**5. Geospatial Indexes:**
\`\`\`javascript
db.places.createIndex({ "location": "2dsphere" })
\`\`\`
• 2d: flat surface coordinates
• 2dsphere: spherical surface (Earth-like)

**6. Hashed Index:**
\`\`\`javascript
db.users.createIndex({ "_id": "hashed" })
\`\`\`
• Used for sharding
• Ensures even distribution of data

**7. Partial Index:**
\`\`\`javascript
db.users.createIndex(
  { "email": 1 },
  { partialFilterExpression: { "email": { $exists: true } } }
)
\`\`\`
• Indexes only documents that meet specified condition
• Reduces index size and maintenance overhead

**8. Sparse Index:**
\`\`\`javascript
db.users.createIndex({ "phone": 1 }, { sparse: true })
\`\`\`
• Only indexes documents that contain the indexed field
• Excludes documents missing the field

**Best Practices:**
• Create indexes based on query patterns
• Monitor index usage with db.collection.getIndexes()
• Remove unused indexes to improve write performance
• Use explain() to analyze query performance`
    },
    {
      id: 4,
      category: "Aggregation",
      question: "Explain the MongoDB Aggregation Pipeline. What are its main stages and how do you optimize aggregation queries?",
      answer: `**Aggregation Pipeline** is a framework for data processing that transforms documents through multiple stages.

**Main Pipeline Stages:**

**1. $match - Filtering:**
\`\`\`javascript
{ $match: { status: "active", age: { $gte: 18 } } }
\`\`\`
• Filters documents (like WHERE in SQL)
• Should be placed early for performance

**2. $group - Grouping and Aggregation:**
\`\`\`javascript
{
  $group: {
    _id: "$category",
    totalSales: { $sum: "$amount" },
    avgPrice: { $avg: "$price" },
    count: { $sum: 1 }
  }
}
\`\`\`
• Groups documents by specified fields
• Performs calculations using accumulator operators

**3. $project - Field Selection:**
\`\`\`javascript
{
  $project: {
    name: 1,
    email: 1,
    fullName: { $concat: ["$firstName", " ", "$lastName"] },
    _id: 0
  }
}
\`\`\`
• Includes/excludes fields
• Creates computed fields

**4. $sort - Sorting:**
\`\`\`javascript
{ $sort: { totalSales: -1, name: 1 } }
\`\`\`
• Sorts documents
• 1 for ascending, -1 for descending

**5. $limit and $skip - Pagination:**
\`\`\`javascript
{ $skip: 20 }
{ $limit: 10 }
\`\`\`

**6. $lookup - Joins:**
\`\`\`javascript
{
  $lookup: {
    from: "orders",
    localField: "_id",
    foreignField: "customerId",
    as: "customerOrders"
  }
}
\`\`\`
• Performs left outer joins

**7. $unwind - Array Deconstruction:**
\`\`\`javascript
{ $unwind: "$tags" }
\`\`\`
• Creates separate documents for each array element

**Optimization Strategies:**

**1. Index Usage:**
• Place $match and $sort early to use indexes
• Create appropriate indexes for aggregation queries

**2. Pipeline Order:**
• $match first to reduce document count
• $project early to reduce document size
• $sort before $skip and $limit

**3. Memory Management:**
• Use allowDiskUse: true for large datasets
• Monitor memory usage with explain()

**4. Projection:**
• Only include necessary fields
• Use $project to reduce data transfer

**5. Early Filtering:**
\`\`\`javascript
db.sales.aggregate([
  { $match: { date: { $gte: new Date("2023-01-01") } } }, // Filter early
  { $group: { _id: "$product", total: { $sum: "$amount" } } },
  { $sort: { total: -1 } },
  { $limit: 10 }
])
\`\`\`

**Performance Monitoring:**
• Use explain() to analyze query execution
• Monitor index usage and execution statistics
• Use profiler to identify slow operations`
    },
    {
      id: 5,
      category: "Sharding",
      question: "What is sharding in MongoDB? Explain the sharding architecture and key considerations.",
      answer: `**Sharding** is MongoDB's method for distributing data across multiple machines to support horizontal scaling.

**Sharding Architecture Components:**

**1. Mongos (Query Router):**
• Routes client requests to appropriate shards
• Merges results from multiple shards
• Caches metadata about cluster configuration

**2. Config Servers:**
• Store cluster metadata and configuration
• Maintain mapping of chunks to shards
• Deployed as replica sets for high availability

**3. Shards:**
• Individual MongoDB instances or replica sets
• Store actual data chunks
• Each shard contains a subset of the data

**Sharding Process:**

**1. Choose a Shard Key:**
\`\`\`javascript
sh.shardCollection("mydb.users", { "user_id": "hashed" })
\`\`\`

**2. Data Distribution:**
• Documents are divided into chunks based on shard key
• Chunks are distributed across shards
• MongoDB balancer automatically migrates chunks

**Shard Key Selection Criteria:**

**1. High Cardinality:**
• Many different values
• Ensures even distribution

**2. Low Frequency:**
• Avoid hot spotting
• Values shouldn't repeat too often

**3. Non-Monotonic:**
• Avoid always increasing values (like timestamps)
• Prevents all writes going to one shard

**Good Shard Key Examples:**
\`\`\`javascript
// Hashed shard key
{ "_id": "hashed" }

// Compound shard key
{ "location": 1, "user_id": 1 }

// Application-specific
{ "tenant_id": 1, "timestamp": 1 }
\`\`\`

**Bad Shard Key Examples:**
\`\`\`javascript
// Monotonically increasing
{ "timestamp": 1 }

// Low cardinality
{ "status": 1 } // Only few possible values

// Hot spotting
{ "popular_category": 1 }
\`\`\`

**Query Patterns:**

**1. Targeted Queries:**
• Include shard key in query
• Route to specific shard
\`\`\`javascript
db.users.find({ "user_id": 12345 })
\`\`\`

**2. Broadcast Queries:**
• Don't include shard key
• Sent to all shards
\`\`\`javascript
db.users.find({ "email": "user@example.com" })
\`\`\`

**Sharding Limitations:**
• Can't change shard key after sharding
• Some operations require all data on single shard
• Increased complexity in deployment and maintenance
• Cross-shard transactions have performance overhead

**Best Practices:**
• Plan shard key carefully before implementation
• Monitor chunk distribution and balancer activity
• Use appropriate read/write concerns
• Consider query patterns when designing shard key
• Implement proper indexing strategy across shards`
    },
    {
      id: 6,
      category: "Replication",
      question: "Explain MongoDB replica sets. How do they work and what are the different member types?",
      answer: `**Replica Sets** provide redundancy and high availability by maintaining multiple copies of data across different MongoDB instances.

**How Replica Sets Work:**

**1. Primary-Secondary Architecture:**
• One PRIMARY node receives all write operations
• Multiple SECONDARY nodes replicate data from primary
• Automatic failover if primary becomes unavailable

**2. Oplog (Operations Log):**
• Capped collection storing all write operations
• Secondaries replay oplog entries to stay synchronized
• Provides point-in-time recovery capabilities

**Member Types:**

**1. Primary:**
• Accepts all write operations
• Only one primary per replica set
• Elected through consensus algorithm

**2. Secondary:**
• Maintains copy of primary's data
• Can serve read operations (with read preference)
• Eligible for election as primary

**3. Arbiter:**
\`\`\`javascript
rs.addArb("mongodb4.example.net:27017")
\`\`\`
• Participates in elections but holds no data
• Used to break ties in odd-numbered sets
• Minimal resource requirements

**4. Hidden:**
\`\`\`javascript
cfg = rs.conf()
cfg.members[3].hidden = true
cfg.members[3].priority = 0
rs.reconfig(cfg)
\`\`\`
• Not visible to client applications
• Used for backups or analytics
• Cannot become primary

**5. Delayed:**
\`\`\`javascript
cfg = rs.conf()
cfg.members[3].slaveDelay = 3600  // 1 hour delay
cfg.members[3].priority = 0
rs.reconfig(cfg)
\`\`\`
• Maintains delayed copy of data
• Protection against human errors
• Cannot become primary

**Election Process:**

**1. Triggers:**
• Primary becomes unavailable
• Network partition occurs
• Manual step-down

**2. Election Factors:**
• Priority settings
• Data freshness (oplog position)
• Network connectivity
• Member eligibility

**Read Preferences:**

**1. primary (default):**
• All reads from primary
• Strongest consistency

**2. primaryPreferred:**
• Primary if available, otherwise secondary

**3. secondary:**
• Only from secondary members
• May read stale data

**4. secondaryPreferred:**
• Secondary if available, otherwise primary

**5. nearest:**
• Lowest network latency
• Good for geographically distributed deployments

**Write Concerns:**

**1. w: 1 (default):**
• Acknowledged by primary only

**2. w: "majority":**
• Acknowledged by majority of voting members
• Ensures durability

**3. w: <number>:**
• Acknowledged by specific number of members

**Configuration Example:**
\`\`\`javascript
rs.initiate({
  _id: "myReplicaSet",
  members: [
    { _id: 0, host: "mongodb1.example.net:27017", priority: 2 },
    { _id: 1, host: "mongodb2.example.net:27017", priority: 1 },
    { _id: 2, host: "mongodb3.example.net:27017", priority: 1 },
    { _id: 3, host: "mongodb4.example.net:27017", arbiterOnly: true }
  ]
})
\`\`\`

**Best Practices:**
• Use odd number of voting members
• Deploy across different data centers
• Monitor replication lag
• Set appropriate write concerns for your use case
• Regular backup of hidden members
• Monitor oplog size and retention`
    },
    {
      id: 7,
      category: "Performance",
      question: "How do you monitor and optimize MongoDB performance? What tools and techniques do you use?",
      answer: `**Performance Monitoring Tools:**

**1. MongoDB Built-in Tools:**

**mongostat:**
• Real-time statistics about MongoDB instance
• Shows insert, query, update, delete rates
• Memory usage and connection counts

**mongotop:**
• Tracks time spent reading/writing to collections
• Identifies most active collections

**db.currentOp():**
• Shows currently running operations
• Helps identify long-running queries

**2. Database Profiler:**
\`\`\`javascript
// Enable profiling for slow operations (>100ms)
db.setProfilingLevel(1, { slowms: 100 })

// View profiler data
db.system.profile.find().sort({ ts: -1 }).limit(5)
\`\`\`

**3. explain() Method:**
\`\`\`javascript
db.users.find({ email: "user@example.com" }).explain("executionStats")
\`\`\`
• Analyzes query execution
• Shows index usage and performance metrics

**Key Performance Metrics:**

**1. Query Performance:**
• Execution time
• Documents examined vs returned
• Index usage (IXSCAN vs COLLSCAN)

**2. Index Metrics:**
• Index hit ratio
• Index size vs collection size
• Unused indexes

**3. Resource Utilization:**
• CPU usage
• Memory (working set)
• Disk I/O
• Network bandwidth

**4. Replication Metrics:**
• Replication lag
• Oplog utilization
• Election frequency

**Optimization Techniques:**

**1. Query Optimization:**

**Use Proper Indexes:**
\`\`\`javascript
// Before: Full collection scan
db.users.find({ email: "user@example.com", status: "active" })

// After: Create compound index
db.users.createIndex({ email: 1, status: 1 })
\`\`\`

**Limit Result Sets:**
\`\`\`javascript
db.users.find({ status: "active" })
  .sort({ created_at: -1 })
  .limit(20)
\`\`\`

**Use Projection:**
\`\`\`javascript
db.users.find(
  { status: "active" },
  { name: 1, email: 1, _id: 0 }
)
\`\`\`

**2. Index Optimization:**

**ESR Rule for Compound Indexes:**
• Equality first
• Sort second
• Range last

\`\`\`javascript
// Query: equality on status, sort by date, range on age
db.users.find({ 
  status: "active",      // Equality
  age: { $gte: 18 }      // Range
}).sort({ created_at: -1 })  // Sort

// Optimal index:
db.users.createIndex({ 
  status: 1,      // Equality
  created_at: -1, // Sort
  age: 1          // Range
})
\`\`\`

**Remove Unused Indexes:**
\`\`\`javascript
db.users.aggregate([{ $indexStats: {} }])
\`\`\`

**3. Schema Optimization:**

**Avoid Large Documents:**
• Keep documents under 16MB
• Use references for large embedded data

**Optimize Array Fields:**
• Limit array sizes
• Use appropriate indexing strategies

**4. Connection Optimization:**

**Connection Pooling:**
\`\`\`javascript
// Node.js example
const client = new MongoClient(uri, {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
\`\`\`

**5. Aggregation Optimization:**

**Pipeline Order:**
\`\`\`javascript
db.sales.aggregate([
  { $match: { date: { $gte: new Date("2023-01-01") } } }, // Filter first
  { $project: { product: 1, amount: 1 } },                // Reduce size
  { $group: { _id: "$product", total: { $sum: "$amount" } } },
  { $sort: { total: -1 } },
  { $limit: 10 }
])
\`\`\`

**Common Performance Issues:**

**1. Missing Indexes:**
• Full collection scans
• High execution times

**2. Inefficient Queries:**
• Large result sets without limits
• Complex regex patterns
• Inefficient aggregation pipelines

**3. Poor Schema Design:**
• Excessive embedding
• Improper normalization
• Large document sizes

**4. Hardware Limitations:**
• Insufficient RAM
• Slow disk I/O
• Network bottlenecks

**Monitoring Best Practices:**
• Set up alerts for key metrics
• Regular performance reviews
• Capacity planning
• Benchmark testing
• Monitor application-level metrics
• Use MongoDB Atlas monitoring (if using Atlas)`
    },
    {
      id: 8,
      category: "Security",
      question: "What are the key security features in MongoDB? How do you implement authentication and authorization?",
      answer: `**MongoDB Security Features:**

**1. Authentication:**

**SCRAM (Default):**
\`\`\`javascript
// Create user with SCRAM authentication
db.createUser({
  user: "appUser",
  pwd: "securePassword",
  roles: [{ role: "readWrite", db: "myapp" }]
})
\`\`\`

**x.509 Certificate Authentication:**
\`\`\`javascript
db.createUser({
  user: "CN=client,OU=IT,O=Company",
  roles: [{ role: "readWrite", db: "myapp" }]
})
\`\`\`

**LDAP Authentication:**
• Enterprise feature
• Integrates with existing LDAP infrastructure

**Kerberos Authentication:**
• Enterprise feature
• Single sign-on capability

**2. Authorization (Role-Based Access Control):**

**Built-in Roles:**

**Database-level:**
• read: Read data from all collections
• readWrite: Read and write data
• dbAdmin: Database administration
• dbOwner: Full database access

**Cluster-level:**
• clusterAdmin: Full cluster administration
• clusterManager: Monitoring and management
• hostManager: Monitor and manage servers

**Custom Roles:**
\`\`\`javascript
db.createRole({
  role: "analyticsReader",
  privileges: [
    {
      resource: { db: "analytics", collection: "" },
      actions: ["find", "listCollections"]
    }
  ],
  roles: []
})
\`\`\`

**3. Network Security:**

**TLS/SSL Encryption:**
\`\`\`bash
mongod --tlsMode requireTLS --tlsCertificateKeyFile /path/to/server.pem
\`\`\`

**IP Binding:**
\`\`\`bash
mongod --bind_ip 127.0.0.1,192.168.1.100
\`\`\`

**Firewall Configuration:**
• Limit access to MongoDB ports (27017-27019)
• Use VPN for remote access

**4. Data Encryption:**

**Encryption at Rest (Enterprise):**
\`\`\`bash
mongod --enableEncryption --encryptionKeyFile /path/to/keyfile
\`\`\`

**Field-Level Encryption:**
\`\`\`javascript
// Client-side field level encryption
const clientEncryption = new ClientEncryption(client, {
  keyVaultNamespace: 'encryption.__keyVault',
  kmsProviders: {
    local: {
      key: localMasterKey
    }
  }
})
\`\`\`

**5. Auditing (Enterprise):**

**Enable Auditing:**
\`\`\`bash
mongod --auditDestination file --auditPath /var/log/mongodb/audit.json
\`\`\`

**Audit Filters:**
\`\`\`javascript
{
  auditFilter: {
    atype: "authenticate",
    "param.user": "sensitiveUser"
  }
}
\`\`\`

**Security Best Practices:**

**1. Authentication Setup:**
\`\`\`javascript
// Enable authentication
use admin
db.createUser({
  user: "admin",
  pwd: "strongPassword",
  roles: ["userAdminAnyDatabase", "dbAdminAnyDatabase"]
})

// Start mongod with auth
mongod --auth --config /path/to/mongod.conf
\`\`\`

**2. Principle of Least Privilege:**
\`\`\`javascript
// Application user with minimal permissions
db.createUser({
  user: "appUser",
  pwd: "appPassword",
  roles: [
    { role: "readWrite", db: "application" }
  ]
})

// Read-only analytics user
db.createUser({
  user: "analyticsUser",
  pwd: "analyticsPassword",
  roles: [
    { role: "read", db: "application" }
  ]
})
\`\`\`

**3. Connection String Security:**
\`\`\`javascript
// Use SRV records and TLS
mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority&tls=true
\`\`\`

**4. Configuration Security:**

**mongod.conf example:**
\`\`\`yaml
security:
  authorization: enabled
  clusterAuthMode: keyFile
  keyFile: /path/to/keyfile

net:
  tls:
    mode: requireTLS
    certificateKeyFile: /path/to/server.pem
  bindIp: 127.0.0.1,10.0.0.1

systemLog:
  destination: file
  path: /var/log/mongodb/mongod.log
  logAppend: true

processManagement:
  fork: true
  pidFilePath: /var/run/mongodb/mongod.pid
\`\`\`

**5. Application-Level Security:**
• Validate input data
• Use parameterized queries
• Implement rate limiting
• Log security events
• Regular security audits

**6. Replica Set Security:**
\`\`\`bash
# Generate keyfile for internal authentication
openssl rand -base64 756 > mongodb-keyfile
chmod 400 mongodb-keyfile

# Start replica set members with keyfile
mongod --replSet rs0 --keyFile mongodb-keyfile
\`\`\`

**7. Sharded Cluster Security:**
• Secure all components (mongos, config servers, shards)
• Use internal authentication between cluster members
• Implement proper network segmentation

**Security Monitoring:**
• Monitor failed authentication attempts
• Track privilege escalation
• Log administrative operations
• Regular security assessments
• Keep MongoDB version updated
• Monitor for unusual query patterns`
    },
    {
      id: 9,
      category: "Transactions",
      question: "Explain ACID transactions in MongoDB. When and how should you use them?",
      answer: `**ACID Transactions in MongoDB:**

MongoDB supports multi-document ACID transactions starting from version 4.0 (replica sets) and 4.2 (sharded clusters).

**ACID Properties:**

**1. Atomicity:**
• All operations within a transaction succeed or fail together
• No partial updates

**2. Consistency:**
• Database remains in valid state before and after transaction
• Maintains data integrity

**3. Isolation:**
• Concurrent transactions don't interfere with each other
• Snapshot isolation level

**4. Durability:**
• Committed changes persist even after system failure
• Write concern ensures durability

**Transaction Syntax:**

**1. Core API (JavaScript):**
\`\`\`javascript
const session = db.getMongo().startSession()
session.startTransaction()

try {
  const ordersCol = session.getDatabase("ecommerce").orders
  const inventoryCol = session.getDatabase("ecommerce").inventory
  
  // Insert order
  ordersCol.insertOne({
    _id: ObjectId(),
    customerId: 123,
    items: [{ productId: 456, quantity: 2 }],
    total: 99.98
  }, { session })
  
  // Update inventory
  inventoryCol.updateOne(
    { productId: 456 },
    { $inc: { quantity: -2 } },
    { session }
  )
  
  session.commitTransaction()
} catch (error) {
  session.abortTransaction()
  throw error
} finally {
  session.endSession()
}
\`\`\`

**2. Convenient API:**
\`\`\`javascript
session.withTransaction(async () => {
  const ordersCol = session.getDatabase("ecommerce").orders
  const inventoryCol = session.getDatabase("ecommerce").inventory
  
  await ordersCol.insertOne({
    customerId: 123,
    items: [{ productId: 456, quantity: 2 }],
    total: 99.98
  }, { session })
  
  await inventoryCol.updateOne(
    { productId: 456 },
    { $inc: { quantity: -2 } },
    { session }
  )
})
\`\`\`

**Driver Examples:**

**Node.js:**
\`\`\`javascript
const { MongoClient } = require('mongodb')

async function transferMoney(fromAccount, toAccount, amount) {
  const session = client.startSession()
  
  try {
    await session.withTransaction(async () => {
      const accounts = client.db('bank').collection('accounts')
      
      // Debit from source account
      await accounts.updateOne(
        { _id: fromAccount, balance: { $gte: amount } },
        { $inc: { balance: -amount } },
        { session }
      )
      
      // Credit to destination account
      await accounts.updateOne(
        { _id: toAccount },
        { $inc: { balance: amount } },
        { session }
      )
    })
  } finally {
    await session.endSession()
  }
}
\`\`\`

**Python:**
\`\`\`python
def transfer_money(from_account, to_account, amount):
    with client.start_session() as session:
        with session.start_transaction():
            accounts = client.bank.accounts
            
            # Debit from source
            accounts.update_one(
                {"_id": from_account, "balance": {"$gte": amount}},
                {"$inc": {"balance": -amount}},
                session=session
            )
            
            # Credit to destination
            accounts.update_one(
                {"_id": to_account},
                {"$inc": {"balance": amount}},
                session=session
            )
\`\`\`

**When to Use Transactions:**

**Good Use Cases:**
• Financial operations (transfers, payments)
• Multi-document updates that must be atomic
• Complex business operations spanning collections
• Data consistency requirements

**Example Scenarios:**
1. **E-commerce Order Processing:**
   • Create order
   • Update inventory
   • Process payment
   • Update customer points

2. **User Registration:**
   • Create user account
   • Initialize user preferences
   • Send welcome email record
   • Update statistics

3. **Content Management:**
   • Publish article
   • Update category counts
   • Create notifications
   • Update search index

**When NOT to Use Transactions:**

**Avoid for:**
• Single document operations (already atomic)
• Simple read operations
• Long-running operations
• High-frequency operations where performance is critical

**Performance Considerations:**

**1. Transaction Limits:**
• 60-second time limit (configurable)
• 16MB oplog entry size limit
• Lock contention can occur

**2. Optimization Tips:**
\`\`\`javascript
// Keep transactions short
session.withTransaction(async () => {
  // Prepare data before transaction
  const orderData = prepareOrderData()
  
  // Quick atomic operations only
  await orders.insertOne(orderData, { session })
  await inventory.updateMany(
    { _id: { $in: orderData.productIds } },
    { $inc: { quantity: -1 } },
    { session }
  )
})
\`\`\`

**3. Write Concerns:**
\`\`\`javascript
// Use majority write concern for durability
session.withTransaction(
  async () => { /* operations */ },
  {
    writeConcern: { w: 'majority' },
    readConcern: { level: 'majority' }
  }
)
\`\`\`

**Error Handling:**

**Retryable Errors:**
• Temporary failures (network issues)
• WriteConflict errors
• Automatically retried by drivers

**Non-retryable Errors:**
• Schema validation failures
• Duplicate key errors
• Authorization errors

\`\`\`javascript
const maxRetries = 3
let retryCount = 0

while (retryCount < maxRetries) {
  try {
    await session.withTransaction(async () => {
      // Transaction operations
    })
    break // Success
  } catch (error) {
    if (error.hasErrorLabel('TransientTransactionError') && retryCount < maxRetries) {
      retryCount++
      continue
    }
    throw error
  }
}
\`\`\`

**Best Practices:**
• Keep transactions short and focused
• Prepare data outside transactions
• Use appropriate read/write concerns
• Handle retryable errors
• Monitor transaction performance
• Consider document design to minimize transaction needs
• Test under concurrent load conditions`
    },
    {
      id: 10,
      category: "Schema Design",
      question: "How do you design an efficient MongoDB schema for a social media application? Consider posts, users, comments, and relationships.",
      answer: `**Social Media Schema Design Strategy:**

**1. User Collection:**
\`\`\`javascript
// users collection
{
  "_id": ObjectId("..."),
  "username": "john_doe",
  "email": "john@example.com",
  "profile": {
    "firstName": "John",
    "lastName": "Doe",
    "avatar": "https://example.com/avatars/john.jpg",
    "bio": "Software developer passionate about technology",
    "location": "San Francisco, CA",
    "website": "https://johndoe.dev"
  },
  "stats": {
    "followersCount": 1250,
    "followingCount": 890,
    "postsCount": 156
  },
  "settings": {
    "privacy": "public",
    "notifications": {
      "email": true,
      "push": true,
      "likes": true,
      "comments": true,
      "follows": true
    }
  },
  "createdAt": ISODate("2023-01-15T08:30:00Z"),
  "lastActive": ISODate("2023-12-01T15:45:00Z")
}
\`\`\`

**2. Posts Collection:**
\`\`\`javascript
// posts collection
{
  "_id": ObjectId("..."),
  "authorId": ObjectId("..."),
  "content": {
    "text": "Just finished building an amazing MongoDB application! 🚀",
    "media": [
      {
        "type": "image",
        "url": "https://example.com/media/post1.jpg",
        "thumbnail": "https://example.com/media/thumbs/post1.jpg"
      }
    ],
    "hashtags": ["mongodb", "database", "development"],
    "mentions": [
      {
        "userId": ObjectId("..."),
        "username": "jane_smith"
      }
    ]
  },
  "stats": {
    "likesCount": 42,
    "commentsCount": 8,
    "sharesCount": 3,
    "viewsCount": 156
  },
  "visibility": "public", // public, private, friends
  "location": {
    "name": "San Francisco, CA",
    "coordinates": [-122.4194, 37.7749]
  },
  "createdAt": ISODate("2023-12-01T10:30:00Z"),
  "updatedAt": ISODate("2023-12-01T10:30:00Z")
}
\`\`\`

**3. Comments Collection (Hybrid Approach):**
\`\`\`javascript
// For root comments - separate collection
{
  "_id": ObjectId("..."),
  "postId": ObjectId("..."),
  "authorId": ObjectId("..."),
  "content": "Great post! MongoDB is indeed powerful.",
  "stats": {
    "likesCount": 5,
    "repliesCount": 2
  },
  "replies": [
    // Embed only first few replies for performance
    {
      "_id": ObjectId("..."),
      "authorId": ObjectId("..."),
      "content": "Totally agree!",
      "likesCount": 1,
      "createdAt": ISODate("2023-12-01T11:15:00Z")
    }
  ],
  "hasMoreReplies": true,
  "createdAt": ISODate("2023-12-01T11:00:00Z")
}
\`\`\`

**4. Relationships Collection:**
\`\`\`javascript
// follows collection
{
  "_id": ObjectId("..."),
  "followerId": ObjectId("..."),
  "followingId": ObjectId("..."),
  "status": "active", // active, pending, blocked
  "createdAt": ISODate("2023-06-15T09:20:00Z")
}
\`\`\`

**5. Likes Collection (Activity Tracking):**
\`\`\`javascript
// likes collection
{
  "_id": ObjectId("..."),
  "userId": ObjectId("..."),
  "targetType": "post", // post, comment
  "targetId": ObjectId("..."),
  "createdAt": ISODate("2023-12-01T12:00:00Z")
}
\`\`\`

**6. Notifications Collection:**
\`\`\`javascript
// notifications collection
{
  "_id": ObjectId("..."),
  "userId": ObjectId("..."), // recipient
  "type": "like", // like, comment, follow, mention
  "actorId": ObjectId("..."), // who performed the action
  "targetType": "post",
  "targetId": ObjectId("..."),
  "message": "john_doe liked your post",
  "read": false,
  "createdAt": ISODate("2023-12-01T12:05:00Z")
}
\`\`\`

**Key Design Decisions:**

**1. User Stats Embedding:**
• Embed follower/following counts for quick access
• Update via aggregation pipeline or scheduled jobs
• Consider eventual consistency for high-volume scenarios

**2. Comments Strategy:**
• Hybrid approach: root comments in separate collection
• Embed first few replies in comment document
• Separate collection for deep reply threads
• Prevents unlimited document growth

**3. Post Content Design:**
• Embed media metadata (URLs, thumbnails)
• Store actual media files in GridFS or external storage
• Hashtag array for easy searching and trending

**Essential Indexes:**

\`\`\`javascript
// Users
db.users.createIndex({ "username": 1 }, { unique: true })
db.users.createIndex({ "email": 1 }, { unique: true })
db.users.createIndex({ "profile.firstName": "text", "profile.lastName": "text", "username": "text" })

// Posts
db.posts.createIndex({ "authorId": 1, "createdAt": -1 })
db.posts.createIndex({ "content.hashtags": 1 })
db.posts.createIndex({ "createdAt": -1 }) // Timeline queries
db.posts.createIndex({ "location.coordinates": "2dsphere" }) // Geospatial

// Comments
db.comments.createIndex({ "postId": 1, "createdAt": 1 })
db.comments.createIndex({ "authorId": 1, "createdAt": -1 })

// Follows
db.follows.createIndex({ "followerId": 1, "status": 1 })
db.follows.createIndex({ "followingId": 1, "status": 1 })
db.follows.createIndex({ "followerId": 1, "followingId": 1 }, { unique: true })

// Likes
db.likes.createIndex({ "userId": 1, "targetType": 1, "targetId": 1 }, { unique: true })
db.likes.createIndex({ "targetType": 1, "targetId": 1, "createdAt": -1 })

// Notifications
db.notifications.createIndex({ "userId": 1, "read": 1, "createdAt": -1 })
\`\`\`

**Common Query Patterns:**

**1. User Timeline (Following):**
\`\`\`javascript
// Get posts from users I follow
db.posts.aggregate([
  {
    $lookup: {
      from: "follows",
      let: { authorId: "$authorId" },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ["$followingId", "$$authorId"] },
                { $eq: ["$followerId", ObjectId("currentUserId")] },
                { $eq: ["$status", "active"] }
              ]
            }
          }
        }
      ],
      as: "following"
    }
  },
  { $match: { following: { $ne: [] } } },
  { $sort: { createdAt: -1 } },
  { $limit: 20 }
])
\`\`\`

**2. Post with Comments:**
\`\`\`javascript
// Get post with embedded comment preview
db.posts.aggregate([
  { $match: { _id: ObjectId("postId") } },
  {
    $lookup: {
      from: "comments",
      pipeline: [
        { $match: { postId: ObjectId("postId") } },
        { $sort: { createdAt: -1 } },
        { $limit: 3 },
        {
          $lookup: {
            from: "users",
            localField: "authorId",
            foreignField: "_id",
            as: "author",
            pipeline: [{ $project: { username: 1, "profile.avatar": 1 } }]
          }
        }
      ],
      as: "recentComments"
    }
  }
])
\`\`\`

**3. User Search:**
\`\`\`javascript
db.users.find(
  { $text: { $search: "john developer" } },
  { username: 1, "profile.firstName": 1, "profile.lastName": 1, "profile.avatar": 1 }
).limit(10)
\`\`\`

**Scalability Considerations:**

**1. Sharding Strategy:**
• Shard posts by authorId for write distribution
• Shard users by _id (hashed) for even distribution
• Consider time-based sharding for posts if needed

**2. Read Replicas:**
• Route analytics queries to secondary replicas
• Use read preferences for timeline queries

**3. Caching Strategy:**
• Cache user profiles and stats
• Cache recent posts and timelines
• Use Redis for real-time notifications

**4. Data Archiving:**
• Archive old posts and comments
• Implement data retention policies
• Use cold storage for inactive user data

**Performance Optimizations:**
• Pre-aggregate timeline data for active users
• Use background jobs for counter updates
• Implement pagination with cursor-based approach
• Consider fan-out strategies for high-follower users
• Use change streams for real-time features`
    }
  ];

  const toggleAnswer = (questionId) => {
    setOpenAnswers(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={onBackToPath}
              className="flex items-center px-4 py-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
            >
              ← Back to Learning Path
            </button>
            
            <div className="flex items-center space-x-4">
              <BearMascot className="w-10 h-10" />
              <div>
                <h1 className="text-3xl font-bold text-green-800">MongoDB Interview Questions</h1>
                <p className="text-green-600">Expert-level questions to ace your MongoDB interviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories Overview */}
        

        {/* Questions */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">💼 Interview Questions</h2>
            <div className="text-sm text-gray-600">
              {interviewQuestions.length} expert-level questions
            </div>
          </div>

          {interviewQuestions.map((question, index) => (
            <div key={question.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-green-100">
              {/* Question Header */}
              <div className="px-6 py-4 bg-gradient-to-r from-green-50 to-teal-50 border-b border-green-100">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {question.category}
                      </span>
                      <span className="text-sm text-gray-500">Question {index + 1}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 leading-relaxed">
                      {question.question}
                    </h3>
                  </div>
                  <button
                    onClick={() => toggleAnswer(question.id)}
                    className={`ml-4 px-4 py-2 rounded-lg transition-all duration-200 ${
                      openAnswers[question.id]
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-white text-green-600 border border-green-300 hover:bg-green-50'
                    }`}
                  >
                    {openAnswers[question.id] ? (
                      <span className="flex items-center space-x-2">
                        <span>Hide Answer</span>
                        <span>▲</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-2">
                        <span>Show Answer</span>
                        <span>▼</span>
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* Answer Dropdown */}
              {openAnswers[question.id] && (
                <div className="px-6 py-6 bg-white">
                  <div className="prose prose-sm max-w-none">
                    <div 
                      className="text-gray-700 leading-relaxed whitespace-pre-line"
                      dangerouslySetInnerHTML={{
                        __html: question.answer
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>')
                          .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto my-4"><code>$2</code></pre>')
                          .replace(/• /g, '<span class="text-green-600">•</span> ')
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-6">
              <BearMascot size="80px" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">🎯 Ready for Your Interview!</h3>
            <p className="text-gray-600 mb-6">
              You've reviewed {interviewQuestions.length} expert-level MongoDB questions. 
              Practice these concepts and you'll be well-prepared for any MongoDB interview!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onModuleComplete(10, 10, 10)}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                ✅ Complete Interview Prep
              </button>
              <button
                onClick={onBackToPath}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                🏠 Back to Learning Path
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Module8;
