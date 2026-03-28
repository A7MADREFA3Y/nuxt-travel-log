import { customAlphabet } from "nanoid";
import slugify from "slug";
import type { InsertLocationLog } from "../schema";

import db from "..";
import { locationLog } from "../schema";

const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 5);

export async function insertLocationLog(
  locationId: number,
  insertable: InsertLocationLog,
  userId: number,
) {
  const slug = `${slugify(insertable.name)}-${nanoid()}`;

  const [inserted] = await db.insert(locationLog).values({
    ...insertable,
    locationId,
    userId,
    slug,
  }).returning();

  return inserted;
}
