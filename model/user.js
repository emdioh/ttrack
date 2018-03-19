class User {
  constructor(name, email, password) {
    this._id = ++User.counter;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

User.counter = 0;
module.exports = {
  User
}
