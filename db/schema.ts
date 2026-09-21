import {sqliteTable,text,index} from 'drizzle-orm/sqlite-core';
export const visits=sqliteTable('visits',{
  sessionId:text('session_id').primaryKey(),
  visitorHash:text('visitor_hash').notNull(),
  day:text('day').notNull(),
  createdAt:text('created_at').notNull(),
},t=>[index('idx_visits_day').on(t.day),index('idx_visits_visitor').on(t.visitorHash)]);
