import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const video = sqliteTable("video", {
  id: integer().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  kind: text({ enum: ["medley", "collab", "single", "other"] })
    .notNull()
    .default("medley"),
  videoId: text("video_id"),
  url: text().notNull(),
  uploader: text(),
  publishedAt: text("published_at"),
  note: text(),
  comment: text(),
});

export { video };
