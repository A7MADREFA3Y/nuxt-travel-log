import { int, real , sqliteTable, text } from "drizzle-orm/sqlite-core";

import { location } from "./location";
import { user } from "./auth";

export const locationLog = sqliteTable("locationLog", {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    startedAt: int().notNull(),
    endedAt: int().notNull(),
    slug: text().notNull().unique(),
    description: text(),
    lat: real().notNull(),
    long: real().notNull(),
    userId: int().notNull().references(() => user.id),
    locationId: int().notNull().references(() => location.id),
    createdAt: int().notNull().$default(() => Date.now()),
    updateAt: int().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),

})