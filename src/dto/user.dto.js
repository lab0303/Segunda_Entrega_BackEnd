class UserDTO {
  constructor(userInfo) {
    this.firstName = userInfo.firstName;
    this.lastName = userInfo.lastName;
    this.email = userInfo.email;
    this.role = userInfo.role;
  }
}

module.exports = UserDTO;
