const Users = require("./models/User.model");

class UsersDAO {
  constructor() {}

  async findUsers() {
    try {
      const users = await Users.find();
      return users;
    } catch (error) {
      throw error;
    }
  }

  async findUser(item) {
    try {
      const user = await Users.findOne({ email: item });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findUserById(item) {
    try {
      const user = await Users.findOne({ _id: item });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(uid) {
    try {
      return await Users.deleteOne({ _id: uid });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UsersDAO;
