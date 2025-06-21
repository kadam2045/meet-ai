import { DEFAULT_PAGE } from "@/constants";
import { parseAsString, parseAsInteger, useQueryStates } from "nuqs";

export const useAgentFilter = () => {
  return useQueryStates({
    search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }), //clearOnDefault use for remove search in query string
    page: parseAsInteger
      .withDefault(DEFAULT_PAGE)
      .withOptions({ clearOnDefault: true }),
  });
};
