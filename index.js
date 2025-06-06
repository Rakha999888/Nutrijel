// index.js
const Hapi = require("@hapi/hapi");
const dotenv = require("dotenv");
const foodRoutes = require("./routes/foodRoutes");

dotenv.config();

const init = async () => {
  // Menentukan host secara dinamis berdasarkan lingkungan
  const host = process.env.NODE_ENV === "production" ? "0.0.0.0" : "localhost";

  const server = Hapi.server({
    port: process.env.PORT || 9000,
    host: host, // Menggunakan host yang dinamis
    routes: {
      cors: {
        // PERHATIAN: Ganti dengan URL frontend Anda!
        origin: ["*"],
        headers: ["Accept", "Authorization", "Content-Type", "If-None-Match"],
        exposedHeaders: ["WWW-Authenticate", "Server-Authorization"],
        additionalExposedHeaders: ["Accept"],
        maxAge: 60,
        credentials: true,
      },
    },
  });

  server.route(foodRoutes);

  // Error handling
  server.ext("onPreResponse", (request, h) => {
    const response = request.response;

    if (response.isBoom) {
      console.error("Server Error:", response.output.payload);
      return h
        .response({
          status: "error",
          message: response.message || "Internal Server Error",
        })
        .code(response.output.statusCode || 500);
    }

    return h.continue;
  });

  await server.start();
  console.log("🚀 Server running on %s", server.info.uri);
  console.log("🔧 Environment:", process.env.NODE_ENV || "development");
  console.log(`🌍 Host is set to: ${host}`); // Log untuk memastikan host sudah benar
};

// Handle uncaught exceptions
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});

init();
