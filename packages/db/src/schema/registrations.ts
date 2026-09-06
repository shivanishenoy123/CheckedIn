import { pgTable, serial, text, timestamp, boolean } from "drizzle-orm/pg-core";

export const registrations = pgTable("registrations", {
  id: serial("id").primaryKey(),
  teamName: text("team_name").notNull(),
  teamLeaderName: text("team_leader_name").notNull(),
  usn: text("usn").notNull().unique(),
  teamLeaderEmail: text("team_leader_email").notNull(),
  member2Name: text("member2_name"),
  member2Usn: text("member2_usn"),
  member3Name: text("member3_name"),
  member3Usn: text("member3_usn"),
  member4Name: text("member4_name"),
  member4Usn: text("member4_usn"),
  member5Name: text("member5_name"),
  member5Usn: text("member5_usn"),
  present: boolean("present").default(false),
  checkedInAt: timestamp("checked_in_at"),
  createdAt: timestamp("created_at").defaultNow(),
});