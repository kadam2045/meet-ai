import { DEFAULT_PAGE } from "@/constants";
import { parseAsString, parseAsInteger, createLoader } from "nuqs/server";

export const FilterSearchParams = {
  search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }), //clearOnDefault use for remove search in query string
  page: parseAsInteger
    .withDefault(DEFAULT_PAGE)
    .withOptions({ clearOnDefault: true }),
};

export const LoadSearchParams = createLoader(FilterSearchParams);
