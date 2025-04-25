import { User } from "../models/user.model.js";
import { ApiRes } from "../utils/response.js";
import { asyncGuard } from "../utils/asyncGuard.js";
import { hashPassword } from "../helpers/password.helper.js";
import { RegisterSchema } from "../validators/user.validator.js";

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
  res.status(200).json(new ApiRes(200, "Login", { name: "Noman" }));
});

export { register, login };
