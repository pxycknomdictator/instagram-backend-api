import { User } from "../models/user.model.js";
import { ApiRes } from "../utils/response.js";
import { asyncGuard } from "../utils/asyncGuard.js";
import { hashPassword } from "../helpers/password.helper.js";
import { validateRegisterBody } from "../helpers/auth.helper.js";

const register = asyncGuard(async (req, res) => {
  const [success, user] = validateRegisterBody(req.body);

  if (!success) {
    return res.status(400).json(new ApiRes(400, "Fields required", user));
  }

  const isExists = await User.findOne({
    $or: [{ username: user.username }, { email: user.email }],
  });

  if (isExists) {
    return res
      .status(409)
      .json(new ApiRes(409, "username or email is already exists"));
  }

  const hash = await hashPassword(user.password);

  const { name, email, username } = user;

  const newUser = await User.create({ username, name, email, password: hash });

  const { password, posts, avatar, followers, following, ...response } =
    newUser.toObject();

  return res.status(201).json(new ApiRes(201, "User registered", response));
});

export { register };
