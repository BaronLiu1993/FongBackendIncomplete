module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "", //My Actual Credentials, Remember to Change After
    DB: "fongDemo",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000 
    }
  };

  //Config file for the database