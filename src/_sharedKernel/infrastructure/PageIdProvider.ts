import { makeIdProvider } from "@/_lib/IdProvider";
import { PageId } from "../domain/PageId";

const PageIdProvider = makeIdProvider<PageId>("PageId");

export { PageIdProvider };
