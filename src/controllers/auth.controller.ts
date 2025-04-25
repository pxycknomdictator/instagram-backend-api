import * as argon2 from "argon2";
import jwt from "jsonwebtoken";

import { User } from "../models/user.model.js";
import { ApiRes } from "../utils/response.js";
import { asyncGuard } from "../utils/asyncGuard.js";
import { hashPassword } from "../helpers/password.helper.js";
import { LoginSchema, RegisterSchema } from "../validators/user.validator.js";
import { configs } from "../constant.js";

const register = asyncGuard(async (req, res) => {
  // Don't worry bro you used middleware for body testing
  const { name, email, password, username }: RegisterSchema = req.body;

  const isExists = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (isExists) {
    return res
      .status(409)
      .json(new ApiRes(409, "username or email is already exists"));
  }

  const hash = await hashPassword(password);
  const newUser = await User.create({ username, name, email, password: hash });

  const {
    password: pwd,
    posts,
    avatar,
    followers,
    following,
    ...response
  } = newUser.toObject();

  return res.status(201).json(new ApiRes(201, "User registered", response));
});

const login = asyncGuard(async (req, res) => {
  // Don't worry bro you used middleware for body testing
  const { email, password }: LoginSchema = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) return res.status(404).json(new ApiRes(404, "Credentials Error"));

  const isPasswordCorrect = await argon2.verify(user.password, password);
  if (!isPasswordCorrect) {
    return res.status(404).json(new ApiRes(404, "Credentials Error"));
  }

  const accessToken = jwt.sign(
    { _id: user._id, username: user.username, email: user.email },
    configs.JWT_ACCESS_TOKEN_SECRET_KEY!,
  );

  const refreshToken = jwt.sign(
    { _id: user._id },
    configs.JWT_ACCESS_TOKEN_SECRET_KEY!,
  );

  await User.findByIdAndUpdate(user._id, { refreshToken }, { new: true });

  res.cookie("access_token", accessToken).cookie("refresh_token", refreshToken);

  return res.status(200).json(new ApiRes(200, "Login"));
});

export { register, login };
