"""
Personalized Trip Planner Backend
FastAPI application that integrates with Vertex AI Agent Engine
"""

import os
import json
import asyncio
from datetime import datetime
from typing import Dict, List, Optional, Any
from uuid import uuid4

import vertexai
from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from dotenv import load_dotenv
from vertexai import agent_engines

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="Personalized Trip Planner API",
    description="AI-powered trip planning with Vertex AI integration",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure properly for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables
agent = None
active_sessions: Dict[str, Dict] = {}
websocket_connections: Dict[str, WebSocket] = {}

# Pydantic models
class ChatMessage(BaseModel):
    message: str
    session_id: Optional[str] = None
    user_id: str

class ChatResponse(BaseModel):
    response: str
    session_id: str
    message_id: str
    timestamp: datetime
    suggestions: Optional[List[str]] = None

class ItineraryRequest(BaseModel):
    session_id: str
    user_id: str
    preferences: Dict[str, Any]

class BookingRequest(BaseModel):
    session_id: str
    user_id: str
    itinerary_id: str
    payment_info: Dict[str, Any]

class TripUpdate(BaseModel):
    session_id: str
    user_id: str
    location: Optional[Dict[str, float]] = None
    status: str
    message: str

def initialize_vertex_ai():
    """Initialize Vertex AI with proper configuration"""
    try:
        project_id = os.getenv("GOOGLE_CLOUD_PROJECT")
        location = os.getenv("GOOGLE_CLOUD_LOCATION")
        bucket = os.getenv("GOOGLE_CLOUD_STORAGE_BUCKET")
        
        if not project_id:
            raise ValueError("GOOGLE_CLOUD_PROJECT environment variable is required")
        if not location:
            raise ValueError("GOOGLE_CLOUD_LOCATION environment variable is required")
        if not bucket:
            raise ValueError("GOOGLE_CLOUD_STORAGE_BUCKET environment variable is required")
        
        vertexai.init(
            project=project_id,
            location=location,
            staging_bucket=f"gs://{bucket}",
        )
        
        print(f"✅ Vertex AI initialized with project: {project_id}, location: {location}")
        return True
        
    except Exception as e:
        print(f"❌ Failed to initialize Vertex AI: {e}")
        return False

def initialize_agent():
    """Initialize the Vertex AI Agent Engine"""
    global agent
    try:
        resource_id = os.getenv("VERTEX_AI_AGENT_RESOURCE_ID")
        if not resource_id:
            raise ValueError("VERTEX_AI_AGENT_RESOURCE_ID environment variable is required")
        
        agent = agent_engines.get(resource_id)
        print(f"✅ Agent initialized with resource ID: {resource_id}")
        return True
        
    except Exception as e:
        print(f"❌ Failed to initialize agent: {e}")
        return False

# Initialize Vertex AI and Agent on startup
@app.on_event("startup")
async def startup_event():
    """Initialize Vertex AI and Agent on application startup"""
    print("🚀 Starting Personalized Trip Planner Backend...")
    
    # Initialize Vertex AI
    if not initialize_vertex_ai():
        raise RuntimeError("Failed to initialize Vertex AI")
    
    # Initialize Agent
    if not initialize_agent():
        raise RuntimeError("Failed to initialize Vertex AI Agent")
    
    print("✅ Backend startup completed successfully!")

# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "agent_available": agent is not None,
        "active_sessions": len(active_sessions)
    }

# Start new chat session
@app.post("/api/v1/chat/session")
async def start_chat_session(user_id: str):
    """Start a new chat session with the AI agent"""
    try:
        if not agent:
            raise HTTPException(status_code=500, detail="Agent not initialized")
        
        # Create session using the agent
        agent_session = agent.create_session(user_id=user_id)
        print(f"Created agent session for user: {user_id}, session_id: {agent_session['id']}")
        
        # Generate our internal session ID
        internal_session_id = str(uuid4())
        
        # Store session info
        active_sessions[internal_session_id] = {
            "user_id": user_id,
            "agent_session": agent_session,
            "created_at": datetime.now(),
            "messages": []
        }
        
        return {
            "session_id": internal_session_id,
            "agent_session_id": agent_session["id"],
            "user_id": user_id,
            "status": "created",
            "timestamp": datetime.now().isoformat()
        }
        
    except Exception as e:
        print(f"❌ Failed to create session: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to create session: {str(e)}")

# Send message to agent
@app.post("/api/v1/chat/message", response_model=ChatResponse)
async def send_message(request: ChatMessage):
    """Send a message to the AI agent and get response"""
    try:
        if not agent:
            raise HTTPException(status_code=500, detail="Agent not initialized")
        
        # Get or create session
        if not request.session_id or request.session_id not in active_sessions:
            # Create new session if none exists
            agent_session = agent.create_session(user_id=request.user_id)
            internal_session_id = str(uuid4())
            
            active_sessions[internal_session_id] = {
                "user_id": request.user_id,
                "agent_session": agent_session,
                "created_at": datetime.now(),
                "messages": []
            }
            session_id = internal_session_id
        else:
            session_id = request.session_id
        
        session_data = active_sessions[session_id]
        agent_session = session_data["agent_session"]
        
        print(f"Processing message for user: {request.user_id}, session: {agent_session['id']}")
        
        # Send message to agent using the exact pattern from test_deployment.py
        response_parts = []
        try:
            for event in agent.stream_query(
                user_id=request.user_id,
                session_id=agent_session["id"],
                message=request.message
            ):
                if "content" in event:
                    if "parts" in event["content"]:
                        parts = event["content"]["parts"]
                        for part in parts:
                            if "text" in part:
                                text_part = part["text"]
                                response_parts.append(text_part)
                                print(f"Received response part: {text_part[:100]}...")
        except Exception as e:
            print(f"❌ Error during agent stream_query: {e}")
            raise HTTPException(status_code=500, detail=f"Agent communication error: {str(e)}")
        
        response_text = " ".join(response_parts)
        message_id = str(uuid4())
        
        # Store messages
        session_data["messages"].append({
            "id": message_id,
            "user_message": request.message,
            "agent_response": response_text,
            "timestamp": datetime.now()
        })
        
        # Generate suggestions based on response
        suggestions = generate_suggestions(response_text)
        
        print(f"✅ Successfully processed message, response length: {len(response_text)}")
        
        return ChatResponse(
            response=response_text,
            session_id=session_id,
            message_id=message_id,
            timestamp=datetime.now(),
            suggestions=suggestions
        )
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"❌ Failed to process message: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to process message: {str(e)}")

# Get chat history
@app.get("/api/v1/chat/history/{session_id}")
async def get_chat_history(session_id: str):
    """Get chat history for a session"""
    if session_id not in active_sessions:
        raise HTTPException(status_code=404, detail="Session not found")
    
    return {
        "session_id": session_id,
        "messages": active_sessions[session_id]["messages"],
        "created_at": active_sessions[session_id]["created_at"]
    }

# Generate itinerary
@app.post("/api/v1/itinerary/generate")
async def generate_itinerary(request: ItineraryRequest):
    """Generate a personalized itinerary based on user preferences"""
    try:
        if not agent:
            raise HTTPException(status_code=500, detail="Agent not initialized")
        
        if request.session_id not in active_sessions:
            raise HTTPException(status_code=404, detail="Session not found")
        
        session_data = active_sessions[request.session_id]
        agent_session = session_data["agent_session"]
        
        # Create itinerary generation prompt
        itinerary_prompt = f"""
        Based on the user's preferences: {json.dumps(request.preferences, indent=2)}
        Please generate a detailed, day-by-day itinerary with:
        1. Specific destinations and activities
        2. Time schedules for each activity
        3. Transportation options between locations
        4. Accommodation recommendations
        5. Cost estimates for each component
        6. Booking links where applicable
        
        Format the response as a structured JSON object.
        """
        
        # Send to agent using the same pattern
        response_parts = []
        for event in agent.stream_query(
            user_id=request.user_id,
            session_id=agent_session["id"],
            message=itinerary_prompt
        ):
            if "content" in event and "parts" in event["content"]:
                for part in event["content"]["parts"]:
                    if "text" in part:
                        response_parts.append(part["text"])
        
        itinerary_text = " ".join(response_parts)
        
        # Store itinerary
        itinerary_id = str(uuid4())
        session_data["itinerary"] = {
            "id": itinerary_id,
            "content": itinerary_text,
            "preferences": request.preferences,
            "created_at": datetime.now()
        }
        
        return {
            "itinerary_id": itinerary_id,
            "content": itinerary_text,
            "status": "generated",
            "timestamp": datetime.now().isoformat()
        }
        
    except Exception as e:
        print(f"❌ Failed to generate itinerary: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to generate itinerary: {str(e)}")

# One-click booking
@app.post("/api/v1/booking/checkout")
async def process_booking(request: BookingRequest):
    """Process one-click booking for the entire itinerary"""
    try:
        if request.session_id not in active_sessions:
            raise HTTPException(status_code=404, detail="Session not found")
        
        session_data = active_sessions[request.session_id]
        
        if "itinerary" not in session_data:
            raise HTTPException(status_code=400, detail="No itinerary found for booking")
        
        # Simulate booking process (replace with actual EMT integration)
        booking_id = str(uuid4())
        
        # Store booking
        session_data["booking"] = {
            "id": booking_id,
            "itinerary_id": request.itinerary_id,
            "payment_info": request.payment_info,
            "status": "confirmed",
            "created_at": datetime.now()
        }
        
        return {
            "booking_id": booking_id,
            "status": "confirmed",
            "message": "Your trip has been successfully booked!",
            "timestamp": datetime.now().isoformat()
        }
        
    except Exception as e:
        print(f"❌ Failed to process booking: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to process booking: {str(e)}")

# Live trip updates
@app.get("/api/v1/trip/live/{session_id}")
async def get_live_updates(session_id: str):
    """Get real-time updates for an active trip"""
    if session_id not in active_sessions:
        raise HTTPException(status_code=404, detail="Session not found")
    
    session_data = active_sessions[session_id]
    
    return {
        "session_id": session_id,
        "status": "active",
        "last_update": datetime.now().isoformat(),
        "itinerary": session_data.get("itinerary"),
        "booking": session_data.get("booking")
    }

# WebSocket for real-time communication
@app.websocket("/ws/{session_id}")
async def websocket_endpoint(websocket: WebSocket, session_id: str):
    """WebSocket endpoint for real-time communication"""
    await websocket.accept()
    websocket_connections[session_id] = websocket
    
    try:
        while True:
            data = await websocket.receive_text()
            message_data = json.loads(data)
            
            # Process message through agent
            if session_id in active_sessions:
                session_data = active_sessions[session_id]
                agent_session = session_data["agent_session"]
                
                response_parts = []
                for event in agent.stream_query(
                    user_id=session_data["user_id"],
                    session_id=agent_session["id"],
                    message=message_data["message"]
                ):
                    if "content" in event and "parts" in event["content"]:
                        for part in event["content"]["parts"]:
                            if "text" in part:
                                response_parts.append(part["text"])
                
                response_text = " ".join(response_parts)
                
                # Send response back through WebSocket
                await websocket.send_text(json.dumps({
                    "response": response_text,
                    "timestamp": datetime.now().isoformat()
                }))
    
    except WebSocketDisconnect:
        if session_id in websocket_connections:
            del websocket_connections[session_id]

# Helper function to generate suggestions
def generate_suggestions(response_text: str) -> List[str]:
    """Generate contextual suggestions based on agent response"""
    suggestions = []
    
    if "destination" in response_text.lower() or "place" in response_text.lower():
        suggestions.extend([
            "Show me more destinations",
            "What's the best time to visit?",
            "Tell me about the local culture"
        ])
    
    if "budget" in response_text.lower() or "cost" in response_text.lower():
        suggestions.extend([
            "Can you make it cheaper?",
            "What's included in this price?",
            "Show me luxury options"
        ])
    
    if "itinerary" in response_text.lower() or "plan" in response_text.lower():
        suggestions.extend([
            "Generate full itinerary",
            "Book this trip",
            "Modify the schedule"
        ])
    
    return suggestions[:3]  # Return max 3 suggestions

# Cleanup inactive sessions
@app.on_event("shutdown")
async def cleanup_sessions():
    """Clean up inactive sessions on shutdown"""
    print("🧹 Cleaning up sessions...")
    for session_id, session_data in active_sessions.items():
        try:
            if agent:
                agent.delete_session(
                    user_id=session_data["user_id"],
                    session_id=session_data["agent_session"]["id"]
                )
                print(f"✅ Cleaned up session {session_id}")
        except Exception as e:
            print(f"❌ Failed to cleanup session {session_id}: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)