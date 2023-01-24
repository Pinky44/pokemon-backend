const bcrypt = require("bcrypt");
const UserModel = require("../models/user");
const TokensService = require("./tokens-services");
const UserDto = require("../dto/user-dto");
const ApiError = require("../exceptions/api-error");

class UsersService {
  async registration(login, password) {
    const candidate = await UserModel.findOne({ login });

    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с данным ${login} уже существует`
      );
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const user = await UserModel.create({ login, password: hashPassword });
    const userDto = new UserDto(user);
    const tokens = TokensService.generateTokens({ ...userDto });
    await TokensService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async login(login, password) {
    const user = await UserModel.findOne({ login });

    if (!user) {
      throw ApiError.BadRequest(`Пользователь с таким ${login} не найден`);
    }

    const isPassEquals = await bcrypt.compare(password, user.password);

    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверный пароль");
    }

    const userDto = new UserDto(user);
    const tokens = TokensService.generateTokens({ ...userDto });
    await TokensService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const token = await TokensService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnathorizedError();
    }

    const userData = TokensService.validateRefreshToken(refreshToken);
    const tokenFromDb = await TokensService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.UnathorizedError();
    }

    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = TokensService.generateTokens({ ...userDto });
    await TokensService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }
}

module.exports = new UsersService();
