const router = require("express").Router();

const {validatorCreateUser}= require("../validator/user")

const {getAllUsers, userById, addNewUsers, deleteUsers, editUser, userLogin } = require("./usersControllers")
// los datos deben llegar aquí

// endpoint get all users ---------------------------------------
router.get("/", getAllUsers);

// endpoint get user by id -------------------------------------
router.get("/:id", userById);

// endpoint post new user --------------------------------------
router.post("/",validatorCreateUser, addNewUsers);

// endpoint delete user by id ----------------------------------
router.delete("/:id", deleteUsers);

// endpoint delete user by id ----------------------------------
router.patch("/:id", editUser)

// Login -------------------------------------------------------
router.post("/login", userLogin)

module.exports = router;




