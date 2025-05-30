# Dental Clinic Patient Assistant Dashboard

A comprehensive AI-powered patient management system for dental clinics built with FastAPI (Python) backend, React frontend, and OpenAI integration.

## Features

### Backend (FastAPI)
- **Patient Management**: Full CRUD operations for patient records
- **Authentication**: JWT-based authentication system
- **AI Chatbot**: OpenAI-powered dental assistant with context-aware responses
- **Database**: PostgreSQL with SQLAlchemy ORM
- **API Documentation**: Auto-generated OpenAPI/Swagger documentation

### Frontend (React + TypeScript)
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Patient Dashboard**: Comprehensive patient management interface
- **AI Chat Interface**: Real-time chat with dental AI assistant
- **Authentication Flow**: Secure login/registration system
- **Real-time Updates**: React Query for efficient data management

### AI Integration
- **OpenAI GPT Integration**: Context-aware responses for dental queries
- **Prompt Engineering**: Specialized prompts for dental clinic scenarios
- **Fallback System**: Graceful degradation when AI service is unavailable
- **Patient Context**: AI responses can consider patient-specific information

## Technology Stack

### Backend
- **FastAPI**: Modern, fast web framework for building APIs
- **SQLAlchemy**: SQL toolkit and ORM
- **PostgreSQL**: Robust relational database
- **JWT**: JSON Web Tokens for authentication
- **OpenAI API**: AI-powered responses
- **Pydantic**: Data validation using Python type annotations

### Frontend
- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **React Query**: Data fetching and caching
- **React Router**: Client-side routing
- **React Hook Form**: Efficient form handling

### DevOps
- **Docker**: Containerization for easy deployment
- **Docker Compose**: Multi-container orchestration
- **Nginx**: Reverse proxy and static file serving

## Quick Start

### Prerequisites
- Docker and Docker Compose
- OpenAI API key (optional, fallback responses available)

### Installation

1. **Clone the repository**
\`\`\`bash
git clone <repository-url>
cd dental-clinic-dashboard
\`\`\`

2. **Set up environment variables**
\`\`\`bash
cp .env.example .env
# Edit .env with your configuration
\`\`\`

3. **Start the application**
\`\`\`bash
docker-compose up --build
\`\`\`

4. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

### Default Credentials
Create an account through the registration form or use the API directly.

## API Documentation

The API is fully documented with OpenAPI/Swagger. Access the interactive documentation at:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Key Endpoints

#### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login

#### Patient Management
- `GET /patients` - List all patients
- `POST /patients` - Create new patient
- `GET /patients/{id}` - Get patient by ID
- `PUT /patients/{id}` - Update patient
- `DELETE /patients/{id}` - Delete patient

#### AI Chat
- `POST /chat` - Send message to AI assistant

## Development Setup

### Backend Development
\`\`\`bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
\`\`\`

### Frontend Development
\`\`\`bash
cd frontend
pnpm install
pnpm dev
\`\`\`

### Database Setup
\`\`\`bash
# Using Docker
docker-compose up postgres

# Or install PostgreSQL locally and create database
createdb dental_clinic
\`\`\`

## Project Structure

\`\`\`
dental-clinic-dashboard/
├── backend/
│   ├── main.py              # FastAPI application entry point
│   ├── database.py          # Database configuration
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas
│   ├── crud.py              # Database operations
│   ├── auth.py              # Authentication logic
│   ├── ai_service.py        # OpenAI integration
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # Page components
│   │   ├── contexts/        # React contexts
│   │   ├── services/        # API services
│   │   └── main.tsx         # Application entry point
│   ├── package.json         # Node.js dependencies
│   └── tailwind.config.js   # Tailwind configuration
├── docker-compose.yml       # Multi-container setup
├── Dockerfile.backend       # Backend container
├── Dockerfile.frontend      # Frontend container
└── README.md               # This file
\`\`\`

## AI Integration Details

### Prompt Engineering
The AI assistant uses specialized prompts for dental clinic scenarios:
- General oral hygiene guidance
- Dental procedure explanations
- Anxiety management
- Pre/post-treatment care instructions

### Fallback System
When OpenAI API is unavailable, the system provides:
- Keyword-based responses for common queries
- Professional guidance to consult dental professionals
- Graceful error handling

### Patient Context
The AI can consider patient-specific information when provided:
- Medical history
- Previous dental work
- Known allergies
- Current concerns

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt for secure password storage
- **CORS Configuration**: Proper cross-origin resource sharing setup
- **Input Validation**: Pydantic schemas for request validation
- **SQL Injection Protection**: SQLAlchemy ORM prevents SQL injection

## Deployment

### Production Deployment
1. **Environment Configuration**
   - Set strong SECRET_KEY
   - Configure production database
   - Set up OpenAI API key
   - Configure CORS for production domains

2. **Database Migration**
   \`\`\`bash
   # Run database migrations
   alembic upgrade head
   \`\`\`

3. **Docker Deployment**
   \`\`\`bash
   docker-compose -f docker-compose.prod.yml up -d
   \`\`\`

### Environment Variables

#### Backend
- `DATABASE_URL`: PostgreSQL connection string
- `SECRET_KEY`: JWT signing key (change in production)
- `OPENAI_API_KEY`: OpenAI API key for AI features

#### Frontend
- `VITE_API_URL`: Backend API URL

## Testing

### Backend Testing
\`\`\`bash
cd backend
pytest
\`\`\`

### Frontend Testing
\`\`\`bash
cd frontend
npm test
\`\`\`

## Performance Considerations

- **Database Indexing**: Proper indexes on frequently queried fields
- **Query Optimization**: Efficient SQLAlchemy queries
- **Caching**: React Query for frontend caching
- **Connection Pooling**: SQLAlchemy connection pooling
- **Static File Serving**: Nginx for efficient static file delivery

## Monitoring and Logging

- **Application Logs**: Structured logging with Python logging
- **Error Tracking**: Comprehensive error handling
- **Health Checks**: Docker health checks for containers
- **API Monitoring**: Built-in FastAPI metrics

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in the repository
- Check the API documentation at `/docs`
- Review the troubleshooting section below

## Troubleshooting

### Common Issues

1. **Database Connection Issues**
   - Ensure PostgreSQL is running
   - Check DATABASE_URL configuration
   - Verify database exists

2. **OpenAI API Issues**
   - Check API key configuration
   - Verify API quota and billing
   - Fallback responses will be used if API fails

3. **CORS Issues**
   - Check CORS configuration in main.py
   - Ensure frontend URL is in allowed origins

4. **Docker Issues**
   - Ensure Docker and Docker Compose are installed
   - Check port availability (3000, 8000, 5432)
   - Review Docker logs for specific errors

### Development Tips

- Use the interactive API documentation at `/docs` for testing
- Enable debug mode for detailed error messages
- Check browser console for frontend errors
- Use React Developer Tools for debugging React components

## Roadmap

Future enhancements planned:
- [ ] Appointment scheduling system
- [ ] Email notifications
- [ ] Advanced reporting and analytics
- [ ] Mobile app development
- [ ] Integration with dental equipment
- [ ] Multi-clinic support
- [ ] Advanced AI features (image analysis, treatment recommendations)
