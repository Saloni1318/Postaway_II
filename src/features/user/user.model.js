export default class UserModel {
    constructor(name, email, password,gender, id) {
      this.name = name;
      this.email = email;
      this.password = password;
      this.gender = gender;
      this._id = id;
    }

    static getAll() {
        return users;
      }
  
  }
  
  let users = [
    {
      id: 1,
      name: 'Piyush',
      email: 'piyush@gmail.com',
      password: 'Password1',
    },
    {
      id: 2,
      name: 'Saloni',
      email: 'saloni@gmail.com',
      password: 'Password2',
    },
  ];