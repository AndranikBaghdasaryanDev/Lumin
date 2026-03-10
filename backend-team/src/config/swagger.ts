import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Core Backend API",
      version: "1.0.0",
      description:
        "A comprehensive REST API for user authentication, profile management, courses, and categories",
      contact: {
        name: "Backend Team",
        email: "backend-team@example.com",
      },
      license: {
        name: "ISC",
        url: "https://opensource.org/licenses/ISC",
      },
    },
    servers: [
      {
        url: process.env.API_URL || "http://localhost:4000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "JWT access token",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              description: "Unique user identifier",
            },
            email: {
              type: "string",
              format: "email",
              description: "User email address",
            },
            firstName: {
              type: "string",
              description: "User first name",
            },
            lastName: {
              type: "string",
              description: "User last name",
            },
            phone: {
              type: "string",
              description: "User phone number",
              nullable: true,
            },
            dateOfBirth: {
              type: "string",
              format: "date",
              description: "User date of birth",
              nullable: true,
            },
            profileImage: {
              type: "string",
              format: "uri",
              description: "Profile image URL",
              nullable: true,
            },
            studentProfile: {
              type: "object",
              properties: {
                age: {
                  type: "integer",
                  description: "Student age",
                },
                major: {
                  type: "string",
                  description: "Student major",
                },
              },
              nullable: true,
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Account creation timestamp",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Last update timestamp",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            error: {
              type: "string",
              description: "Error message",
            },
            message: {
              type: "string",
              description: "Detailed error description",
            },
            statusCode: {
              type: "integer",
              description: "HTTP status code",
            },
          },
        },
        Success: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              description: "Success status",
            },
            message: {
              type: "string",
              description: "Success message",
            },
            data: {
              type: "object",
              description: "Response data",
            },
          },
        },
        AuthTokens: {
          type: "object",
          properties: {
            accessToken: {
              type: "string",
              description: "JWT access token",
            },
            refreshToken: {
              type: "string",
              description: "JWT refresh token",
            },
            expiresIn: {
              type: "integer",
              description: "Token expiration time in seconds",
            },
          },
        },
      },
      responses: {
        UnauthorizedError: {
          description: "Unauthorized - Invalid or missing authentication token",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        ValidationError: {
          description: "Validation Error - Invalid request data",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        NotFoundError: {
          description: "Resource not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        InternalServerError: {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
      },
    },
    tags: [
      {
        name: "Authentication",
        description: "User authentication and authorization operations",
      },
      {
        name: "Profile",
        description: "User profile management operations",
      },
      {
        name: "Courses",
        description: "Course browsing and management operations",
      },
      {
        name: "Categories",
        description: "Course category operations",
      },
      {
        name: "Health",
        description: "API health check and monitoring",
      },
    ],
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/docs/swagger.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
export const swaggerUiOptions = {
  explorer: true,
  customCss: `
    .swagger-ui .topbar { display: none }
    .swagger-ui .info { margin: 20px 0 }
    .swagger-ui .scheme-container { margin: 20px 0 }
  `,
  customSiteTitle: "Core Backend API Documentation",
};
