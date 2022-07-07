const fs = require("fs/promises");
// const dataFromFile=fs.readFileSync('../file.json');
// myData=JSON.parse(dataFromFile);
// let users_count = 4;
const uuid = require("uuid");
const uuIdv4 = uuid.v4;

const getData = async () =>
  fs.readFile("src/file.json").then((data) => JSON.parse(data));

const updateData = async (data) =>
  fs.writeFile("src/file.json", JSON.stringify(data));

const addUser = async (user) => {
  if (!user.firstName || !user.lastName || !user.id || !user.email) {
    throw new Error("user must include username ,email and password");
  }
  const id = uuIdv4();
  user.id = id;
  const data = (await getData()) || [];
  const exists = await data.users.find(
    (_user) => _user.email === user.email || _user.id === parseInt(user.id)
  );
  if (exists) {
    throw new Error("details already exist");
  }
  // data=[...data,user]
  data.users.push(user);
  await updateData(data);
  return data;
};
const getUsersList = async () => {
  const data = await getData();
  return data.users;
  // return await myData.users;
};
const getUser = async (id) => {
  const data = await getData();
  const users = data.users;
  const _user = await users.find((user) => user.id === id);
  return _user;
  // return await myData.users.find((user)=>user.id===id);
};
const deleteUser = async (id) => {
  let data = await getData();
  let users = data.users;
  const index = await users.findIndex((user) => user.id === parseInt(id));
  if (index === -1) {
    throw new Error(`user with id ${id} not found`);
  }
  users.splice(index, 1);
  Object.assign(data.users, users);
  await updateData(data);
  return data;
  // return myData.users.filter((user)=>user.id!==id);
};
const updateUser = async (id, newUser) => {
  const data = await getData();
  let users = data.users;
  const _user = await users.find((user) => user.id === parseInt(id));
  Object.assign(_user, newUser);
  await updateData(data);
  return data;
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
