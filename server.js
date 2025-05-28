import Hapi from '@hapi/hapi';
import Jwt from '@hapi/jwt';
import Joi from 'joi';
import Boom from '@hapi/boom';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import User from './models/User.js';

dotenv.config();

const init = async () => {
  // Connect to MongoDB
  try {
    await connectDB();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }

  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
        credentials: true
      }
    }
  });

  // Register JWT plugin
  await server.register(Jwt);

  // Define JWT strategy
  server.auth.strategy('jwt', 'jwt', {
    keys: process.env.JWT_SECRET || 'your-secret-key',
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: 24 * 60 * 60 // 24 hours
    },
    validate: async (artifacts, request, h) => {
      try {
        const user = await User.findById(artifacts.decoded.payload.userId);
        if (!user) {
          return { credentials: null, isValid: false };
        }
        return { credentials: user, isValid: true };
      } catch (error) {
        return { credentials: null, isValid: false };
      }
    }
  });

  server.auth.default('jwt');

  // Register route
  server.route({
    method: 'POST',
    path: '/api/auth/register',
    options: {
      auth: false,
      validate: {
        payload: Joi.object({
          username: Joi.string().min(3).max(30).required(),
          email: Joi.string().email().required(),
          password: Joi.string().min(6).required(),
          birthDate: Joi.date().required(),
          weight: Joi.number().min(20).max(300).required()
        })
      }
    },
    handler: async (request, h) => {
      try {
        const { username, email, password, birthDate, weight } = request.payload;

        // Check if user already exists
        const existingUser = await User.findOne({ 
          $or: [{ email }, { username }] 
        });
        
        if (existingUser) {
          throw Boom.conflict('Username or email already exists');
        }

        // Create new user
        const user = new User({
          username,
          email,
          password,
          birthDate,
          weight
        });

        await user.save();

        // Generate JWT token
        const token = Jwt.token.generate(
          {
            aud: 'urn:audience:nutricheck',
            iss: 'urn:issuer:nutricheck',
            userId: user._id,
            username: user.username
          },
          {
            key: process.env.JWT_SECRET || 'your-secret-key',
            algorithm: 'HS256'
          },
          {
            ttlSec: 24 * 60 * 60 // 24 hours
          }
        );

        return h.response({
          user: user.getPublicProfile(),
          token
        }).code(201);
      } catch (error) {
        if (error.isBoom) throw error;
        throw Boom.badImplementation('Error creating user');
      }
    }
  });

  // Login route
  server.route({
    method: 'POST',
    path: '/api/auth/login',
    options: {
      auth: false,
      validate: {
        payload: Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string().required()
        })
      }
    },
    handler: async (request, h) => {
      try {
        const { email, password } = request.payload;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
          throw Boom.unauthorized('Invalid email or password');
        }

        // Verify password
        const isValid = await user.comparePassword(password);
        if (!isValid) {
          throw Boom.unauthorized('Invalid email or password');
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        // Generate JWT token
        const token = Jwt.token.generate(
          {
            aud: 'urn:audience:nutricheck',
            iss: 'urn:issuer:nutricheck',
            userId: user._id,
            username: user.username
          },
          {
            key: process.env.JWT_SECRET || 'your-secret-key',
            algorithm: 'HS256'
          },
          {
            ttlSec: 24 * 60 * 60 // 24 hours
          }
        );

        return h.response({
          user: user.getPublicProfile(),
          token
        });
      } catch (error) {
        if (error.isBoom) throw error;
        throw Boom.badImplementation('Error during login');
      }
    }
  });

  // Get user profile route
  server.route({
    method: 'GET',
    path: '/api/auth/profile',
    handler: async (request, h) => {
      try {
        const user = request.auth.credentials;
        return h.response(user.getPublicProfile());
      } catch (error) {
        throw Boom.badImplementation('Error fetching profile');
      }
    }
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init(); 