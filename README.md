# 🌍 AI-Powered Personalized Trip Planner

An intelligent, full-stack travel planning application that leverages **Google's Vertex AI Agent Engine** and **Firebase** to deliver hyper-personalized trip recommendations, real-time itinerary optimization, and seamless booking experiences.

[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)](https://reactjs.org/)
[![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Google Cloud](https://img.shields.io/badge/Google_Cloud-4285F4?style=flat&logo=google-cloud&logoColor=white)](https://cloud.google.com/)

---

## 🚀 Key Features

### 🔐 Authentication & User Management
- **Google OAuth** - One-click sign-in with Google accounts
- **Email/Password** - Traditional authentication with email verification
- **User Profiles** - Comprehensive profile management with travel preferences
- **Auto Profile Photos** - Automatic Google profile picture integration
- **Secure Sessions** - Firebase Authentication with ID tokens

### 🤖 AI-Powered Trip Planning
- **Multi-Agent System** - Specialized AI agents for different travel aspects:
  - 🗺️ **Destination Suggester** - Personalized destination recommendations
  - 📅 **Trip Planning Agent** - Intelligent itinerary generation
  - 🎨 **Personalization Agent** - Customized experiences based on preferences
  - 📊 **Data Aggregator** - Real-time travel data integration
  - 🎯 **Optimization Agent** - Route and budget optimization
  - 📱 **Real-time Monitoring** - Live updates and disruption management
  - 💳 **Booking Agent** - Streamlined reservation handling

### 💬 Interactive Chat Interface
- Real-time conversational trip planning
- Destination suggestion cards with rich details
- Message history and context awareness
- WebSocket support for live updates

### 👤 User Experience
- Beautiful, modern UI with Framer Motion animations
- Responsive design (mobile, tablet, desktop)
- Profile dropdown with quick actions
- Travel preferences management (style, budget, interests)
- Trip history and statistics

---

## 🏗️ Architecture

### Hybrid Backend Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React)                     │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │  Landing    │  │  Chat        │  │  Profile         │  │
│  │  Page       │  │  Interface   │  │  Management      │  │
│  └─────────────┘  └──────────────┘  └──────────────────┘  │
└────────────┬────────────────┬────────────────┬─────────────┘
             │                │                │
             ▼                ▼                ▼
┌────────────────────────────────────────────────────────────┐
│                    Firebase Services                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐ │
│  │ Auth         │  │ Firestore    │  │ Cloud           │  │
│  │ (Google/     │  │ (User Data,  │  │ Functions       │  │
│  │ Email)       │  │ Sessions)    │  │ (Triggers)      │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘ │
└────────────────────────────┬───────────────────────────────┘
                             │
                             ▼
┌────────────────────────────────────────────────────────────┐
│                   FastAPI Backend (Python)                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │             Vertex AI Agent Engine                   │  │
│  │  ┌────────────┐  ┌─────────────┐  ┌──────────────┐ │  │
│  │  │ Planning   │  │ Booking     │  │ Real-time    │ │  │
│  │  │ Agents     │  │ Agents      │  │ Monitoring   │ │  │
│  │  └────────────┘  └─────────────┘  └──────────────┘ │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           Google Places API Client                   │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
```

**Why Hybrid?**
- **Firebase**: User authentication, data persistence, hosting, and real-time capabilities
- **FastAPI Backend**: AI agent orchestration, complex business logic, Google Cloud integrations
- **Best of Both Worlds**: Serverless scalability + AI power + cost efficiency

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons
- **React Hot Toast** - Notifications
- **React Query** - Data fetching and caching
- **React Hook Form** - Form validation

### Backend
- **FastAPI** - High-performance Python web framework
- **Google Vertex AI** - Agent Engine for AI orchestration
- **Google ADK (Agent Development Kit)** - Multi-agent system
- **Google Places API** - Travel data and recommendations
- **Python 3.12+** - Modern Python runtime

### Firebase Services
- **Firebase Authentication** - User auth (OAuth, Email/Password)
- **Cloud Firestore** - NoSQL database for users, chats, trips
- **Firebase Hosting** - Static site hosting for React app
- **Cloud Functions** - Serverless backend functions
- **Cloud Storage** - User-uploaded content

### Deployment
- **Firebase Hosting** - Frontend deployment
- **Google Cloud Run** - Backend containerized deployment
- **GitHub Actions** - CI/CD pipelines (future)

---

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- Python 3.12+
- Firebase CLI (`npm install -g firebase-tools`)
- Google Cloud SDK (for backend deployment)
- Firebase project with Authentication and Firestore enabled

### 1. Clone the Repository

```bash
git clone https://github.com/Chandangowdatk/Personalized-Trip-Planner.git
cd Personalized-Trip-Planner
```

### 2. Firebase Setup

#### Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project: `ai-personalized-trip-planner`
3. Enable **Authentication** (Google, Email/Password)
4. Enable **Cloud Firestore**
5. Create a web app to get configuration

#### Configure Firestore Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /sessions/{sessionId} {
      allow read, write: if request.auth != null;
    }
    match /itineraries/{itineraryId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local file
cat > .env.local << EOF
# Firebase Configuration (from Firebase Console)
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Backend API URL
REACT_APP_API_URL=http://localhost:8000
EOF

# Start development server
npm start
```

Frontend will be available at `http://localhost:3000`

### 4. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cat > .env << EOF
# Google Cloud Configuration
GOOGLE_CLOUD_PROJECT=your_project_id
VERTEX_AI_LOCATION=us-central1

# Google Places API
GOOGLE_PLACES_API_KEY=your_places_api_key

# Firebase Admin SDK
FIREBASE_SERVICE_ACCOUNT_KEY=path/to/service-account-key.json
EOF

# Run backend server
uvicorn main:app --reload
```

Backend will be available at `http://localhost:8000`

### 5. Agent System Setup

```bash
cd agent/personalizedTripPlanner

# Install with uv (recommended)
uv pip install -e .

# Or with pip
pip install -e .

# Test deployment (optional)
cd deployment
python test_deployment.py
```

---

## 🎯 Usage

### 1. Sign Up / Sign In
- Visit `http://localhost:3000`
- Click "Get Started"
- Choose Google Sign-in or Email/Password

### 2. Plan a Trip
- Navigate to Chat Interface
- Describe your travel preferences
- AI agents will provide personalized recommendations
- Review destination suggestions with details

### 3. Manage Profile
- Click on profile picture in header
- Navigate to "My Profile"
- Update travel preferences (style, budget, interests)
- View trip statistics

### 4. Explore Features
- View trip history
- Save favorite destinations
- Get real-time updates
- Book accommodations (coming soon)

---

## 📂 Project Structure

```
Personalized-Trip-Planner/
├── frontend/                      # React Frontend
│   ├── src/
│   │   ├── components/           # UI Components
│   │   │   ├── LandingPage.js   # Landing page
│   │   │   ├── HomePage.js      # Dashboard
│   │   │   ├── ChatInterface.js # Chat UI
│   │   │   ├── AuthModal.js     # Authentication modal
│   │   │   └── ProfilePage.js   # User profile
│   │   ├── contexts/            # React Contexts
│   │   │   ├── AuthContext.js   # Auth state
│   │   │   └── ChatContext.js   # Chat state
│   │   ├── services/            # API Services
│   │   │   ├── firebase.js      # Firebase init
│   │   │   ├── authService.js   # Auth methods
│   │   │   ├── userService.js   # User CRUD
│   │   │   └── api.js           # Backend API
│   │   └── App.js               # Main app
│   ├── public/
│   ├── package.json
│   └── .env.local               # Firebase config
│
├── backend/                      # FastAPI Backend
│   ├── main.py                  # API endpoints
│   ├── requirements.txt
│   └── .env                     # Backend config
│
├── agent/                       # AI Agent System
│   └── personalizedTripPlanner/
│       ├── personalized_trip_planner/
│       │   ├── agent.py         # Root agent
│       │   ├── prompt.py        # Agent prompts
│       │   └── subagents/       # Specialized agents
│       │       ├── destinationSuggester/
│       │       ├── Planning/
│       │       ├── Booking/
│       │       ├── Personalization/
│       │       ├── DataAggregator/
│       │       ├── Optimization/
│       │       └── RealtimeMonitoring/
│       └── deployment/          # Deployment scripts
│
├── requirements.txt             # Python dependencies
├── .gitignore
└── README.md                    # This file
```

---

## 🔧 Development

### Running Tests

```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
pytest

# Agent tests
cd agent/personalizedTripPlanner/deployment
python test_deployment.py
```

### Code Quality

```bash
# Frontend linting
cd frontend
npm run lint

# Backend linting
cd backend
flake8 .
black .
```

### Building for Production

```bash
# Frontend build
cd frontend
npm run build

# Backend Docker image
cd backend
docker build -t trip-planner-backend .
```

---

## 🚀 Deployment

### Frontend (Firebase Hosting)

```bash
cd frontend

# Build production bundle
npm run build

# Deploy to Firebase
firebase deploy --only hosting
```

### Backend (Google Cloud Run)

```bash
cd backend

# Build and deploy
gcloud run deploy trip-planner-backend \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars GOOGLE_CLOUD_PROJECT=your_project_id
```

### Agent System (Vertex AI)

```bash
cd agent/personalizedTripPlanner/deployment

# Deploy agent
python deploy.py
```

---

## 🌟 Features Roadmap

### ✅ Phase 1: Authentication & User Management (COMPLETED)
- [x] Firebase Authentication integration
- [x] Google OAuth sign-in
- [x] Email/Password authentication
- [x] User profile management
- [x] Travel preferences system
- [x] Profile photo integration

### 🔄 Phase 2: Chat History & Persistence (IN PROGRESS)
- [ ] Firestore chat session storage
- [ ] Message history persistence
- [ ] Session recovery
- [ ] Multi-device sync

### 📅 Phase 3: Itinerary Management
- [ ] Save itineraries to Firestore
- [ ] Edit and customize itineraries
- [ ] Share itineraries
- [ ] Export to PDF/Calendar

### 💳 Phase 4: Booking Integration
- [ ] Hotel booking API integration
- [ ] Flight search and booking
- [ ] Activity reservations
- [ ] Payment processing

### 📊 Phase 5: Advanced Features
- [ ] Collaborative trip planning
- [ ] Budget tracking and optimization
- [ ] Travel recommendations engine
- [ ] Mobile app (React Native)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Google Cloud Platform** - Vertex AI, Cloud Run, Firebase
- **Google Places API** - Travel data and recommendations
- **React Community** - Frontend framework and ecosystem
- **FastAPI Community** - Backend framework

---

## 📞 Contact

**Chandan Gowda TK**
- GitHub: [@Chandangowdatk](https://github.com/Chandangowdatk)
- Project: [Personalized Trip Planner](https://github.com/Chandangowdatk/Personalized-Trip-Planner)

---

## 🔗 Useful Links

- [Firebase Documentation](https://firebase.google.com/docs)
- [Vertex AI Agent Engine](https://cloud.google.com/vertex-ai/docs/generative-ai/multimodal/overview)
- [Google Places API](https://developers.google.com/maps/documentation/places/web-service)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)

---

<div align="center">
  <strong>Built with ❤️ using AI and Modern Web Technologies</strong>
  <br />
  <sub>Transforming travel planning with intelligent automation</sub>
</div>