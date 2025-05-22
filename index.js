//index.js
const Hapi = require("@hapi/hapi");
// const mongoose = require("mongoose");
const dotenv = require("dotenv");
const foodRoutes = require("./routes/foodRoutes");

dotenv.config();

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 9000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  //   try {
  //     await mongoose.connect(process.env.MONGODB_URI, {
  //       useNewUrlParser: true,
  //       useUnifiedTopology: true,
  //     });
  //     console.log("Connected to MongoDB Atlas");
  //   } catch (error) {
  //     console.error(" MongoDB connection failed:", error);
  //     process.exit(1);
  //   }

  server.route(foodRoutes);

  await server.start();
  console.log("🚀 Server running on %s", server.info.uri);
};

init();
