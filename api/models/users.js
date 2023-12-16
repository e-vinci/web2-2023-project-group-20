const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model('Users', userSchema);

const jwtSecret = 'ilovemypizza!';
const lifetimeJwt = 24 * 60 * 60 * 1000; // in ms : 24 * 60 * 60 * 1000 = 24h

const saltRounds = 10;

async function login(username, password) {
  await mongoose.connect('mongodb+srv://WebProjectVinci2023:WebProjectVinci2023@ShadowFortressGame.trlvgrx.mongodb.net/ShadowFortressGame?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

  const userFound = await User.findOne({ username });
  if (!userFound) return undefined;

  const passwordMatch = await bcrypt.compare(password, userFound.password);
  if (!passwordMatch) return undefined;

  mongoose.connection.close();

  const token = jwt.sign(
    { username }, // session data added to the payload (payload : part 2 of a JWT)
    jwtSecret, // secret used for the signature (signature part 3 of a JWT)
    { expiresIn: lifetimeJwt }, // lifetime of the JWT (added to the JWT payload)
  );

  const authenticatedUser = {
    username,
    token,
  };

  return authenticatedUser;
}

async function register(username, password) {
  await mongoose.connect('mongodb+srv://WebProjectVinci2023:WebProjectVinci2023@ShadowFortressGame.trlvgrx.mongodb.net/ShadowFortressGame?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

  const userFound = await User.findOne({ username });
  if (userFound) return undefined;

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  await User.create({ username, password: hashedPassword });

  const token = jwt.sign(
    { username }, // session data added to the payload (payload : part 2 of a JWT)
    jwtSecret, // secret used for the signature (signature part 3 of a JWT)
    { expiresIn: lifetimeJwt }, // lifetime of the JWT (added to the JWT payload)
  );

  const authenticatedUser = {
    username,
    token,
  };

  return authenticatedUser;
}

async function readOneUserFromUsername(username) {
  await mongoose.connect('mongodb+srv://WebProjectVinci2023:WebProjectVinci2023@ShadowFortressGame.trlvgrx.mongodb.net/ShadowFortressGame?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

  const userFound = await User.findOne({ username });
  if (userFound) return undefined;

  return userFound;
}

module.exports = {
  login,
  register,
  readOneUserFromUsername,
};
