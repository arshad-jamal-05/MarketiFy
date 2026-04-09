require("mongoose")
  .connect(process.env.DB_KEY)
  .then(() => {
    console.log("Database Connected Successfully ✅");
  })
  .catch((error) => {
    console.log(error);
  });
