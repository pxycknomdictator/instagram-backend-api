import { ApiRes } from "../utils/response.js";
import { User } from "../models/user.model.js";
import { cookiesOptions } from "../constant.js";
import { asyncGuard } from "../utils/asyncGuard.js";
import { decodePassword, hashPassword } from "../helpers/password.helper.js";
import { tokensGenerator } from "../helpers/token.helper.js";
import { LoginSchema, RegisterSchema } from "../validators/user.validator.js";

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

  const isPasswordCorrect = await decodePassword(user.password, password);
  if (!isPasswordCorrect) {
    return res.status(404).json(new ApiRes(404, "Credentials Error"));
  }

  const [accessToken, refreshToken] = tokensGenerator({
    _id: user._id,
    username: user.username,
    email: user.email,
  });

  const client = await User.findByIdAndUpdate(
    user._id,
    { refreshToken },
    { new: true },
  );

  return res
    .cookie("access_token", accessToken, {
      ...cookiesOptions,
      maxAge: 1000 * 60 * 60 * 24,
    })
    .cookie("refresh_token", refreshToken, {
      ...cookiesOptions,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    })
    .status(200)
    .json(new ApiRes(200, "Login", `${client?.username} is Logged In`));
});

export { register, login };
