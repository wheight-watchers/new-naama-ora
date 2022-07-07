// const { post } = require("../Controllers/user.controller");
// const UserModel = require("../models/user.model");
const fs = require("fs/promises");
// const { json } = require("body-parser");
// const dataFromFile=fs.readFileSync('../file.json');
// myData=JSON.parse(dataFromFile);
// let users_count = 4;
const uuid = require('uuid');
const uuIdv4 = uuid.v4;

const getData = async () =>
  fs.readFile("src/file.json").then((data) => JSON.parse(data));
const updateData = async (data) =>
  fs.writeFile("src/file.json", JSON.stringify(data));

const addUser = async (user) => {
  if (!user.firstName || !user.lastName || !user.password || !user.email) {
    throw new Error("user must include username ,email and password");
  }
  const id = uuIdv4();
  user.id = id;

  // user.id = users_count + 1;
  // users_count += 1;
  const users = (await getData()) || [];
  const exists = users.find(
    (_user) => _user.email === user.email || _user.password === user.password
  );
  if (exists) {
    throw new Error("details already exist");
  }
  users.push(user);
  await updateData(users);
  return user;
  // const user=new UserModel(name, email, password);
  // myData=[...myData,user]
  // return myData;
};
const getUsersList = async () => {
  const data = await getData();
  return data.users;
  // return await myData.users;
};
const getUser = async (id) => {
  const users = await getData();
  const _user = await users.find((user) => user.id === id);
  return _user;
  // return await myData.users.find((user)=>user.id===id);
};
const deleteUser = async (id) => {
  const users = await getData();
  const index = await users.findIndex((user) => user.id === id);
  if(index===-1){
    throw new Error(`user with id ${id} not found`);
  }
  users.splice(index, 1);
  await updateData(users);
  // return myData.users.filter((user)=>user.id!==id);
};
const updateUser = async (id, newUser) => {
  const users = await getData();
  const _user = await users.find((user) => user.id === id);
  Object.assign(_user, newUser);
  await updateData(users);
  return _user;
  // const mappedData = myData.map((user)=>{
  //    return user.id===id?newUser:user
  // })
  // return mappedData;
};

module.exports = {
  addUser,
  getUsersList,
  getUser,
  deleteUser,
  updateUser,
};
