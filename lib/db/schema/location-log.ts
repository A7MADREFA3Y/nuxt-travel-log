import { int, real , sqliteTable, text } from "drizzle-orm/sqlite-core";

import { location } from "./location";

export const locationLog = sqliteTable("locationLog", {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    startedAt: int().notNull(),
    endedAt: int().notNull(),
    slug: text().notNull().unique(),
    description: text(),
    lat: real().notNull(),
    long: real().notNull(),
    locationId: int().notNull().references(() => location.id),
    createdAt: int().notNull().$default(() => Date.now()),
    updateAt: int().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),

})