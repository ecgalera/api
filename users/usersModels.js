const connection = require("../db/config");

// endpoint get all users ---------------------------------------
const allUsers = async () => {
  const query = "SELECT * FROM users";
  try {
    const rows = await connection.query(query);
    return rows;
  } catch (error) {
    // error.status = 500;
    error.message = error.code;
    return error;
  }
};

// endpoint get user by id -------------------------------------
const usuarioById = async (id) => {
  const query = `SELECT * FROM users WHERE id = ${id}`;
  try {
    return await connection.query(query);
  } catch (error) {
    // error.status = 500;
    error.message = error.code;
    return error;
  }
};

// endpoint post new user --------------------------------------
const newUser = async (user) => {
  const query = "INSERT INTO users SET ?";
  try {
    return await connection.query(query, user);
  } catch (error) {
    // error.status = 500;
    error.message = error.code;
    return error;
  }
};

// login user --------------------------------------------------
const loginUser = async(email) =>{
  const query = `SELECT * FROM users WHERE email = "${email}"`;
  try {
    return await connection.query(query);
  } catch (error) {
    // error.status = 500;
    error.message = error.code;
    return error;
  }
}


// endpoint delete user by id ----------------------------------
const userDelete = async (id) => {
  const query = `DELETE FROM users WHERE id = ${id}`;
  try {
    return await connection.query(query);
  } catch (error) {
    // error.status = 500;
    error.message = error.code;
    return error;
  }
};

// Edit user by id ----------------------------------------------
const ediUserById = async (id, user) => {
  const query = `UPDATE users SET ? WHERE id=${id}`;
  try {
    return await connection.query(query, user);
  } catch (error) {
    // error.status = 500;
    error.message = error.code;
    return error;
  }
};
module.exports = { allUsers, usuarioById, newUser, userDelete, ediUserById, loginUser };

