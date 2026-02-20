import { removeLocationBySlug } from "~/lib/db/queries/location";
import defineAuthenticatedEventHandler from "~/utils/define-authenticated-event-handler";

export default defineAuthenticatedEventHandler(async (event) => {
  try {
    const slug = getRouterParam(event, "slug") as string;
    console.log("[DELETE LOCATION] Starting delete for slug:", slug);

    const deleted = await removeLocationBySlug(slug, event.context.user.id);

    if (!deleted) {
      console.log("[DELETE LOCATION] Location not found");
      return sendError(event, createError({
        statusCode: 404,
        statusMessage: "Location not found.",
      }));
    }

    console.log("[DELETE LOCATION] Successfully deleted location:", deleted);
    setResponseStatus(event, 204);
  }
  catch (error) {
    console.error("[DELETE LOCATION] Error:", error);
    return sendError(event, createError({
      statusCode: 500,
      statusMessage: error instanceof Error ? error.message : "Internal server error",
    }));
  }
});