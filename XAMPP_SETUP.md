# XAMPP Database Setup Guide

This guide will help you set up the MySQL database for the Meeting Assistant application using XAMPP.

## Prerequisites

- XAMPP installed on your computer
- Meeting Assistant project downloaded

## Step 1: Start XAMPP Services

1. Open XAMPP Control Panel
2. Start the Apache and MySQL services by clicking the "Start" buttons
3. Verify both services show green status indicators

## Step 2: Create the Database

### Option 1: Using phpMyAdmin

1. Open your web browser and navigate to: http://localhost/phpmyadmin/
2. Log in (default username is "root" with no password)
3. Click "New" in the left sidebar
4. Enter "meeting_assistant" as the database name
5. Select "utf8mb4_unicode_ci" as the collation
6. Click "Create"

### Option 2: Using the SQL Script

1. Open your web browser and navigate to: http://localhost/phpmyadmin/
2. Log in (default username is "root" with no password)
3. Click on the "SQL" tab
4. Copy the contents of the `database_schema.sql` file from the project
5. Paste the SQL into the query window
6. Click "Go" to execute the script

## Step 3: Configure the Application

1. Make sure the `.env` file in your project root has the correct database settings:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=meeting_assistant
```

2. If you set a password for your MySQL root user, update the `DB_PASSWORD` value accordingly

## Step 4: Test the Connection

1. Start the application server:
   ```
   npm run server
   ```

2. Check the console output for:
   ```
   Database connection successful
   Server running at http://localhost:3001
   ```

## Default User Account

After setting up the database using the provided SQL script, you can log in with:

- Username: admin
- Password: admin123

## Troubleshooting

### Connection Issues

If you see "Database connection failed" in the console:

1. Verify XAMPP MySQL service is running
2. Check that the database name is correct
3. Ensure your MySQL username and password match the `.env` file
4. Try restarting the MySQL service in XAMPP

### Port Conflicts

If MySQL cannot start due to port conflicts:

1. In XAMPP Control Panel, click "Config" next to MySQL
2. Select "my.ini"
3. Change the port numbers (default is 3306)
4. Update your `.env` file with the new port

### Database Structure Issues

If you encounter SQL errors related to missing tables:

1. Go to phpMyAdmin
2. Select the "meeting_assistant" database
3. Go to the "SQL" tab
4. Re-run the SQL script from `database_schema.sql`

## Additional Resources

- [XAMPP Documentation](https://www.apachefriends.org/docs/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [phpMyAdmin Documentation](https://www.phpmyadmin.net/docs/)
