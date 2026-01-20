'use strict';

var chunk7NADHFD2_cjs = require('./chunk-7NADHFD2.cjs');

// src/server/handlers/error.ts
function handleError(error, defaultMessage) {
  const apiError = error;
  const apiErrorStatus = apiError.status || apiError.details?.status || 500;
  throw new chunk7NADHFD2_cjs.HTTPException(apiErrorStatus, {
    message: apiError.message || defaultMessage,
    stack: apiError.stack,
    cause: apiError.cause
  });
}

exports.handleError = handleError;
//# sourceMappingURL=chunk-RE4RPXT2.cjs.map
//# sourceMappingURL=chunk-RE4RPXT2.cjs.map