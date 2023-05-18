const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) token = req.cookies["authtoken"];
  return token;
};

module.exports = cookieExtractor;
