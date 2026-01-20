import { HTTPException } from './chunk-MMROOK5J.js';

// src/server/handlers/error.ts
function handleError(error, defaultMessage) {
  const apiError = error;
  const apiErrorStatus = apiError.status || apiError.details?.status || 500;
  throw new HTTPException(apiErrorStatus, {
    message: apiError.message || defaultMessage,
    stack: apiError.stack,
    cause: apiError.cause
  });
}

export { handleError };
//# sourceMappingURL=chunk-CY4TP3FK.js.map
//# sourceMappingURL=chunk-CY4TP3FK.js.map