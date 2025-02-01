import jwt from "jwt-simple";
import moment from "moment";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWT_SECRET;

const createToken = (user) => {
  const userId = user._id?.toString() || user.id;

  const payload = {
    id: userId,
    name: user.name,
    email: user.email,
    iat: moment().unix(),
    exp: moment().add(14, "days").unix(),
  };

  return jwt.encode(payload, secret);
};

export { secret, createToken };
