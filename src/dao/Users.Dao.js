const Users = require("./models/User.model");

class UsersDAO {
  constructor() {}

  async findUsers() {
    try {
      const users = await Users.find();
      return users;
    } catch (error) {
      console.log(error);
    }
  }

  async findUser(item) {
    try {
      const user = await Users.findOne({ email: item });
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async findUserById(item) {
    try {
      const user = await Users.findOne({ _id: item });
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UsersDAO;
