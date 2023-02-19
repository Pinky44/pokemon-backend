const UsersService = require("../services/users-services");
const TokensService = require("../services/tokens-services");
const ApiError = require("../exceptions/api-error");

const optionCookieRefresh = {
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 Дней
  httpOnly: true,
};

const optionCookieAccess = {
  maxAge: 30 * 60 * 1000, // 30 минут
  httpOnly: true,
};

class UserController {
  async registration(req, res, next) {
    try {
      const { login, password } = req.body;

      const userData = await UsersService.registration(login, password);

      res.cookie("refreshToken", userData.refreshToken, optionCookieRefresh);
      res.cookie("accessToken", userData.accessToken, optionCookieAccess);

      res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { login, password } = req.body;

      const userData = await UsersService.login(login, password);

      res.cookie("refreshToken", userData.refreshToken, optionCookieRefresh);
      res.cookie("accessToken", userData.accessToken, optionCookieAccess);

      res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  }

  async checkLogin(req, res, next) {
    try {
      const tokenA = req.headers.authorization.split(" ")[1];

      if (tokenA === undefined) {
        throw ApiError.BadRequest(`User не авторизован ${tokenA} не найден`);
      }

      const validatedToken = await TokensService.validateAccessToken(tokenA);

      if (!validatedToken) {
        throw ApiError.UnauthorizedError();
      }
      const result = await UsersService.loginCheck(validatedToken.login);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
