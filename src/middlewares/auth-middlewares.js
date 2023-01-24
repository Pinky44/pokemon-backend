const ApiError = require("../exceptions/api-error");
const TokensService = require("../services/tokens-services");

module.exports = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return next(ApiError.UnathorizedError());
    }
    
    const accessToken = authorizationHeader.split(" ")[1];

    if (!accessToken) {
      return next(ApiError.UnathorizedError());
    }
    
    const userData = TokensService.validateAccessToken(accessToken);

    if (!userData) {
      return next(ApiError.UnathorizedError());
    }

    req.user = userData;
    next();
  } catch (error) {
    return next(ApiError.UnathorizedError());
  }
};
