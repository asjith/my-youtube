import { USER_OFFLINE_ERROR_KEYWORDS } from "./constants";

export const checkOfflineError = ({ error }) => {
  return USER_OFFLINE_ERROR_KEYWORDS.some((keyword) =>
    error?.includes(keyword)
  );
};
