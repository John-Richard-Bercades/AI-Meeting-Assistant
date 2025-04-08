const db = require('./database');

async function testDatabaseConnection() {
  try {
    console.log('Testing database connection...');
    const connected = await db.testConnection();
    console.log('Database connection test result:', connected ? 'SUCCESS' : 'FAILED');
    
    if (connected) {
      // Test if users table exists
      console.log('Testing users table...');
      try {
        const users = await db.query('SELECT * FROM users LIMIT 1');
        console.log('Users table exists. Found', users.length, 'users');
        
        if (users.length > 0) {
          // Show the structure of a user record (without password)
          const { password, ...userWithoutPassword } = users[0];
          console.log('Sample user structure:', userWithoutPassword);
        }
      } catch (error) {
        console.error('Error querying users table:', error.message);
      }
    }
  } catch (error) {
    console.error('Test failed with error:', error);
  } finally {
    // Exit the process
    process.exit();
  }
}

testDatabaseConnection();
