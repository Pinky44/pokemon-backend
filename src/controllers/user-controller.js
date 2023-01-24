const UsersService = require("../services/users-services");

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

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;

      const token = await UsersService.logout(refreshToken);

      res.clearCookie("refreshToken");
      res.clearCookie("accessToken");

      res.status(200).json(token);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;

      const userData = await UsersService.refresh(refreshToken);

      res.cookie("refreshToken", userData.refreshToken, optionCookieRefresh);
      res.cookie("accessToken", userData.accessToken, optionCookieAccess);

      res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
