// const user = require("../db/data"); ya no trabajo más con el [] inicial
const notNumber = require("../util/notNumber");
const {
  allUsers,
  usuarioById,
  newUser,
  userDelete,
  ediUserById,
  loginUser,
} = require("./usersModels");

const { hashPassword, checkPassword } = require("../util/handlerPassword");

// endpoint get all users ---------------------------------------
const getAllUsers = async (req, res, next) => {
  const dbResponse = await allUsers();
  if (dbResponse instanceof Error) next(dbResponse);
  // por si no hay datos ingresados a la base de datos
  dbResponse.length ? res.status(200).json(dbResponse) : next();
  // dbResponse.hasOwnProperty("Error")
  //   ? res.status(500).json(dbResponse)
  //   : res.status(200).json(dbResponse);
  // la base de datos siempre devuelve un [] no undefined
  //  res.status(404).json({message:"no encontrado"})
};

// endpoint get user by id -------------------------------------
const userById = async (req, res, next) => {
  if (notNumber(req.params.id, next)) return;

  const dbResponse = await usuarioById(+req.params.id);

  if (dbResponse instanceof Error) next(dbResponse);
  //   const userFind = findById(+req.params.id, user);
  // la base de datos siempre devuelve un [] no undefined
  // dbResponse.length ? res.json(user) : next();
  dbResponse.length ? res.status(200).json(dbResponse) : next();
};

// endpoint post new user --------------------------------------
const addNewUsers = async (req, res, next) => {
  const password = await hashPassword(req.body.password);
  // const { id, name, username, email } = req.body;
  // if (
  //   !name ||
  //   !username ||
  //   (!email && (name === "" || username === "" || email === ""))
  // ) {
  //   res.status(400).json({ message: "Campos sin datos solicitados" });
  // } else {
  const dbResponse = await newUser({ ...req.body, password: password });

  dbResponse instanceof Error
    ? res.status(200).json({ message: `User create ${req.body.name} !!!` })
    : next(dbResponse);
};
// };

// Login -------------------------------------------------------
const userLogin = async (req, res, next) => {
  const dbResponse = await loginUser(req.body.email);
  console.log(dbResponse)
  if (!dbResponse.length) return next();
  
  const passwordMatch = await checkPassword(
    req.body.password,
    dbResponse[0].password
  );
  
  if (passwordMatch) {
    res.status(200).json({ message: "Authorized" });
  } else {
    let error = new Error();
    error.message = "Unauthorized";
    error.status = 401;
    next();
  }
};

// endpoint delete user by id ----------------------------------
const deleteUsers = async (req, res, next) => {
  if (notNumber(req.params.id, next)) return;
  const dbResponse = await userDelete(+req.params.id);

  if (dbResponse instanceof Error) next(dbResponse);
  dbResponse.affectedRows ? res.status(204).end() : next();
};

// const userIndex = user.indexOf(findById(userId, user));
// user.splice(userIndex, 1);
// console.log(user);
// const exitUser =user.find(user => user.id === userId)
// console.log(exitUser , "este")
// if(exitUser){console.log("el user existe")}else{console.log("el user no existe")}
// const deleteUser = user.filter(user => user.id !== userId )
// // console.log(deleteUser)
// user=deleteUser
// console.log(user)
// res.status(200).json({ message: "recurso eliminado" });

// Edit user by id ----------------------------------------------

const editUser = async (req, res, next) => {
  if (notNumber(req.params.id, next)) return;
  const dbResponse = await ediUserById(+req.params.id, req.body);

  if (dbResponse instanceof Error) next(dbResponse);
  dbResponse.affectedRows ? res.status(200).json(req.body) : next();
};

module.exports = {
  getAllUsers,
  userById,
  addNewUsers,
  deleteUsers,
  editUser,
  userLogin,
};
