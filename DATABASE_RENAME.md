# Database Rename: Meetings to Minutes

This document outlines the changes made to rename the "meetings" table to "minutes" in the database and update all related code.

## Database Changes

1. **Table Rename**: The "meetings" table has been renamed to "minutes"
2. **Foreign Key Update**: The "meeting_id" column in the "transcripts" table has been renamed to "minute_id"
3. **Foreign Key Constraint**: The foreign key constraint has been updated to reference the new table name

## SQL Script

A SQL script has been provided to perform these changes:

```sql
-- Rename the meetings table to minutes
RENAME TABLE meetings TO minutes;

-- Update the foreign key constraint in the transcripts table
ALTER TABLE transcripts 
DROP FOREIGN KEY transcripts_ibfk_1;

ALTER TABLE transcripts
CHANGE COLUMN meeting_id minute_id INT NOT NULL;

ALTER TABLE transcripts
ADD CONSTRAINT transcripts_ibfk_1 
FOREIGN KEY (minute_id) REFERENCES minutes(id);
```

## Code Changes

The following files have been updated:

1. **Models**:
   - `meetingModel.js` → `minuteModel.js`
   - All references to "meeting" have been changed to "minute"

2. **API Endpoints**:
   - `/api/meetings/*` → `/api/minutes/*`
   - Request and response objects updated to use "minute" instead of "meeting"

3. **Frontend Components**:
   - `MeetingMinutesList.jsx` → `MinutesList.jsx`
   - Routes updated from `/meeting-minutes/*` to `/minutes/*`
   - Variable names and UI text updated

4. **Database Schema**:
   - `database_schema.sql` updated to use the new table names

## How to Apply These Changes

1. **Update the Database**:
   - Run the SQL script in phpMyAdmin or MySQL command line
   - Verify the tables have been renamed correctly

2. **Update the Code**:
   - Pull the latest code changes
   - Install any new dependencies if needed
   - Restart the application

3. **Test the Application**:
   - Verify that the minutes list loads correctly
   - Test creating new minutes
   - Test viewing existing minutes

## Potential Issues

1. **Data Loss**: The rename operation preserves all data, but it's recommended to backup the database before running the script
2. **Cached Routes**: You may need to clear your browser cache if you experience routing issues
3. **API Compatibility**: Any external services using the old API endpoints will need to be updated

## Rollback Plan

If issues are encountered, you can revert the changes by running the following SQL:

```sql
-- Rename the minutes table back to meetings
RENAME TABLE minutes TO meetings;

-- Update the foreign key constraint in the transcripts table
ALTER TABLE transcripts 
DROP FOREIGN KEY transcripts_ibfk_1;

ALTER TABLE transcripts
CHANGE COLUMN minute_id meeting_id INT NOT NULL;

ALTER TABLE transcripts
ADD CONSTRAINT transcripts_ibfk_1 
FOREIGN KEY (meeting_id) REFERENCES meetings(id);
```
