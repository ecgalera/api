const notNumber = (id, next) =>{
    if (isNaN(+id)) {
        let error = new Error("No es un Número");
        error.status = 400;
        next(error);
        return true
      }else{
        return false
      }
};


module.exports = notNumber