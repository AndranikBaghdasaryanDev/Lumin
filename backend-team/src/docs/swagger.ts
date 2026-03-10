/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - firstName
 *         - lastName
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User email address
 *           example: user@example.com
 *         password:
 *           type: string
 *           minLength: 8
 *           description: User password (min 8 characters, must contain uppercase, lowercase, and number)
 *           example: Password123
 *         firstName:
 *           type: string
 *           minLength: 2
 *           description: User first name
 *           example: John
 *         lastName:
 *           type: string
 *           minLength: 2
 *           description: User last name
 *           example: Doe
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User email address
 *           example: user@example.com
 *         password:
 *           type: string
 *           minLength: 8
 *           description: User password (min 8 characters, must contain uppercase, lowercase, and number)
 *           example: Password123
 *     RefreshTokenRequest:
 *       type: object
 *       required:
 *         - refreshToken
 *       properties:
 *         refreshToken:
 *           type: string
 *           description: JWT refresh token
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     UpdateProfileRequest:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           minLength: 2
 *           description: User first name
 *           example: John
 *         lastName:
 *           type: string
 *           minLength: 2
 *           description: User last name
 *           example: Doe
 *         phone:
 *           type: string
 *           pattern: '^\\+?[0-9]{7,15}$'
 *           description: Phone number with optional country code
 *           example: +1234567890
 *         dateOfBirth:
 *           type: string
 *           format: date
 *           description: Date of birth in YYYY-MM-DD format
 *           example: 1990-01-01
 *         profileImage:
 *           type: string
 *           format: uri
 *           description: Profile image URL
 *           example: https://example.com/avatar.jpg
 *         studentProfile:
 *           type: object
 *           properties:
 *             age:
 *               type: integer
 *               minimum: 0
 *               maximum: 120
 *               description: Student age
 *               example: 25
 *             major:
 *               type: string
 *               minLength: 2
 *               description: Student major
 *               example: Computer Science
 *     HealthResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: Service health status
 *           example: healthy
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: Health check timestamp
 *           example: 2024-01-01T00:00:00.000Z
 *         uptime:
 *           type: number
 *           description: Server uptime in seconds
 *           example: 3600
 *         version:
 *           type: string
 *           description: API version
 *           example: 1.0.0
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Category ID
 *           example: 1
 *         name:
 *           type: string
 *           description: Category name
 *           example: Web Development
 *         slug:
 *           type: string
 *           description: Category slug
 *           example: web-development
 *         icon:
 *           type: string
 *           description: Category icon URL
 *           example: https://example.com/icon.png
 *         coursesCount:
 *           type: integer
 *           description: Number of courses in this category
 *           example: 25
 *         subCategories:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Category'
 *           description: Sub-categories
 *     Course:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Course ID
 *           example: 1
 *         title:
 *           type: string
 *           description: Course title
 *           example: Complete Web Development Course
 *         slug:
 *           type: string
 *           description: Course slug
 *           example: complete-web-development
 *         description:
 *           type: string
 *           description: Course description
 *           example: Learn web development from scratch
 *         shortDescription:
 *           type: string
 *           description: Short course description
 *           example: A comprehensive web development course
 *         thumbnail:
 *           type: string
 *           description: Course thumbnail URL
 *           example: https://example.com/thumbnail.jpg
 *         level:
 *           type: string
 *           enum: [BEGINNER, INTERMEDIATE, ADVANCED]
 *           description: Course difficulty level
 *           example: BEGINNER
 *         language:
 *           type: string
 *           description: Course language
 *           example: English
 *         duration:
 *           type: integer
 *           description: Course duration in minutes
 *           example: 1200
 *         lectureCount:
 *           type: integer
 *           description: Number of lectures
 *           example: 45
 *         price:
 *           type: number
 *           description: Course price
 *           example: 99.99
 *         discountPrice:
 *           type: number
 *           description: Discounted price
 *           example: 49.99
 *         isFree:
 *           type: boolean
 *           description: Whether course is free
 *           example: false
 *         status:
 *           type: string
 *           description: Course status
 *           example: published
 *         categories:
 *           type: array
 *           items:
 *             type: string
 *           description: Course categories
 *           example: ["Web Development", "JavaScript"]
 *         previewVideo:
 *           type: string
 *           description: Preview video URL
 *           example: https://example.com/preview.mp4
 *         requirements:
 *           type: array
 *           items:
 *             type: string
 *           description: Course requirements
 *           example: ["Basic computer skills", "Internet connection"]
 *         whatYouLearn:
 *           type: array
 *           items:
 *             type: string
 *           description: Learning objectives
 *           example: ["HTML5", "CSS3", "JavaScript"]
 *         targetAudience:
 *           type: string
 *           description: Target audience
 *           example: Beginners in web development
 *         isActive:
 *           type: boolean
 *           description: Whether course is active
 *           example: true
 *         instructor:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: Instructor ID
 *               example: 1
 *             name:
 *               type: string
 *               description: Instructor name
 *               example: John Doe
 *             image:
 *               type: string
 *               description: Instructor image URL
 *               example: https://example.com/instructor.jpg
 *         sections:
 *           type: array
 *           items:
 *             type: object
 *             description: Course sections
 *         publishedAt:
 *           type: string
 *           format: date-time
 *           description: Publication date
 *           example: 2024-01-01T00:00:00.000Z
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation date
 *           example: 2024-01-01T00:00:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update date
 *           example: 2024-01-01T00:00:00.000Z
 *         rating:
 *           type: number
 *           description: Course rating
 *           example: 4.5
 *         ratingCount:
 *           type: integer
 *           description: Number of ratings
 *           example: 150
 *         enrollmentCount:
 *           type: integer
 *           description: Number of enrollments
 *           example: 1000
 *         isEnrolled:
 *           type: boolean
 *           description: Whether current user is enrolled
 *           example: true
 *         enrollmentProgress:
 *           type: object
 *           description: Enrollment progress
 *           example: {"completed": 5, "total": 45}
 *     Lesson:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Lesson ID
 *           example: 1
 *         title:
 *           type: string
 *           description: Lesson title
 *           example: Introduction to HTML
 *         content:
 *           type: string
 *           description: Lesson content
 *           example: Lesson content here...
 *         videoUrl:
 *           type: string
 *           description: Lesson video URL
 *           example: https://example.com/lesson1.mp4
 *         duration:
 *           type: integer
 *           description: Lesson duration in minutes
 *           example: 30
 *         order:
 *           type: integer
 *           description: Lesson order in course
 *           example: 1
 *         isFree:
 *           type: boolean
 *           description: Whether lesson is free to preview
 *           example: true
 *     CoursesQuery:
 *       type: object
 *       properties:
 *         page:
 *           type: integer
 *           description: Page number for pagination
 *           example: 1
 *         limit:
 *           type: integer
 *           description: Number of items per page
 *           example: 12
 *         categoryId:
 *           type: integer
 *           description: Filter by category ID
 *           example: 1
 *         level:
 *           type: string
 *           enum: [BEGINNER, INTERMEDIATE, ADVANCED]
 *           description: Filter by difficulty level
 *           example: BEGINNER
 *         search:
 *           type: string
 *           description: Search term
 *           example: javascript
 *         sort:
 *           type: string
 *           enum: [newest, price_low, price_high]
 *           description: Sort order
 *           example: newest
 *         isFree:
 *           type: string
 *           enum: [true, false]
 *           description: Filter by free/paid courses
 *           example: false
 *
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Success'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/User'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       409:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Success'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/AuthTokens'
 *       400:
 *         description: Missing credentials or request body
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *
 * /api/auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *
 * /api/auth/me:
 *   get:
 *     summary: Get current user information
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Success'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *
 * /api/auth/refresh:
 *   post:
 *     summary: Refresh access token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefreshTokenRequest'
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Success'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/AuthTokens'
 *       400:
 *         description: Refresh token missing
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Success'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Category'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *
 * /api/courses:
 *   get:
 *     summary: Get all courses with filtering and pagination
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 12
 *         description: Number of items per page
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: integer
 *         description: Filter by category ID
 *       - in: query
 *         name: level
 *         schema:
 *           type: string
 *           enum: [BEGINNER, INTERMEDIATE, ADVANCED]
 *         description: Filter by difficulty level
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [newest, price_low, price_high]
 *         description: Sort order
 *       - in: query
 *         name: isFree
 *         schema:
 *           type: string
 *           enum: [true, false]
 *         description: Filter by free/paid courses
 *     responses:
 *       200:
 *         description: Courses retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Success'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         courses:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/Course'
 *                         pagination:
 *                           type: object
 *                           properties:
 *                             page:
 *                               type: integer
 *                             limit:
 *                               type: integer
 *                             total:
 *                               type: integer
 *                             totalPages:
 *                               type: integer
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *
 * /api/courses/{id}:
 *   get:
 *     summary: Get course by ID
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Course ID
 *     responses:
 *       200:
 *         description: Course retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Success'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Course'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *
 * /api/courses/{courseId}/lessons/{lessonId}:
 *   get:
 *     summary: Get lesson by ID
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Course ID
 *       - in: path
 *         name: lessonId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Lesson ID
 *     responses:
 *       200:
 *         description: Lesson retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Success'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Lesson'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         description: Enrollment required to access this lesson
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *
 * /api/courses/{id}/related:
 *   get:
 *     summary: Get related courses
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Course ID
 *     responses:
 *       200:
 *         description: Related courses retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Success'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Course'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *
 * /api/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Success'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *   patch:
 *     summary: Update user profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProfileRequest'
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Success'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/User'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *
 * /api/health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is healthy
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthResponse'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

export {};
