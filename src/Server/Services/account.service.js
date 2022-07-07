// const { post } = require("../Controllers/user.controller");
// const UserModel = require("../models/user.model");
const fs = require("fs");
// const { json } = require("body-parser");
// const dataFromFile = fs.readFileSync("../file.json");
// myData = JSON.parse(dataFromFile);

const getData = async () =>
  fs.readFile("src/file.json").then((data) => JSON.parse(data));
const updateData = async (data) =>
  fs.writeFile("src/file.json", JSON.stringify(data));

const login = async (email, password) => {
  const data = await getData();
  const users=data.users;
  const _user = await users.find(
    (user) => user.email === email && user.password === parseInt(password)
  );
  if(!_user){
    throw new Error(`user with these details not found`);
  }
  return _user;
  //   return await myData.find((u) => u.email === email && u.password === password);
};

module.exports = {
  login,
};
