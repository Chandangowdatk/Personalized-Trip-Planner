"""
Test script to verify Vertex AI Agent Engine integration
"""

import os
import requests
import json
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configuration
API_BASE_URL = "http://localhost:8000"
TEST_USER_ID = "test_user_123"

def test_health_check():
    """Test the health check endpoint"""
    print("🔍 Testing health check...")
    try:
        response = requests.get(f"{API_BASE_URL}/health")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Health check passed: {data}")
            return True
        else:
            print(f"❌ Health check failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Health check error: {e}")
        return False

def test_create_session():
    """Test creating a new chat session"""
    print("🔍 Testing session creation...")
    try:
        response = requests.post(f"{API_BASE_URL}/api/v1/chat/session", 
                               params={"user_id": TEST_USER_ID})
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Session created: {data}")
            return data["session_id"]
        else:
            print(f"❌ Session creation failed: {response.status_code} - {response.text}")
            return None
    except Exception as e:
        print(f"❌ Session creation error: {e}")
        return None

def test_send_message(session_id):
    """Test sending a message to the agent"""
    print("🔍 Testing message sending...")
    try:
        message_data = {
            "message": "I want a 5-day adventure trip in the mountains with a budget of ₹50,000",
            "session_id": session_id,
            "user_id": TEST_USER_ID
        }
        
        response = requests.post(f"{API_BASE_URL}/api/v1/chat/message", 
                               json=message_data)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Message sent successfully")
            print(f"📝 Agent response: {data['response'][:200]}...")
            print(f"💡 Suggestions: {data.get('suggestions', [])}")
            return True
        else:
            print(f"❌ Message sending failed: {response.status_code} - {response.text}")
            return False
    except Exception as e:
        print(f"❌ Message sending error: {e}")
        return False

def test_chat_history(session_id):
    """Test retrieving chat history"""
    print("🔍 Testing chat history...")
    try:
        response = requests.get(f"{API_BASE_URL}/api/v1/chat/history/{session_id}")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Chat history retrieved: {len(data['messages'])} messages")
            return True
        else:
            print(f"❌ Chat history failed: {response.status_code} - {response.text}")
            return False
    except Exception as e:
        print(f"❌ Chat history error: {e}")
        return False

def test_itinerary_generation(session_id):
    """Test generating an itinerary"""
    print("🔍 Testing itinerary generation...")
    try:
        itinerary_data = {
            "session_id": session_id,
            "user_id": TEST_USER_ID,
            "preferences": {
                "theme": "adventure",
                "duration": "5 days",
                "budget": "₹50,000",
                "destination": "mountains",
                "travelers": 2
            }
        }
        
        response = requests.post(f"{API_BASE_URL}/api/v1/itinerary/generate", 
                               json=itinerary_data)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Itinerary generated successfully")
            print(f"📋 Itinerary preview: {data['content'][:200]}...")
            return True
        else:
            print(f"❌ Itinerary generation failed: {response.status_code} - {response.text}")
            return False
    except Exception as e:
        print(f"❌ Itinerary generation error: {e}")
        return False

def main():
    """Run all integration tests"""
    print("🚀 Starting Vertex AI Agent Engine Integration Tests")
    print("=" * 60)
    
    # Check environment variables
    required_vars = [
        "GOOGLE_CLOUD_PROJECT",
        "GOOGLE_CLOUD_LOCATION", 
        "GOOGLE_CLOUD_STORAGE_BUCKET",
        "VERTEX_AI_AGENT_RESOURCE_ID"
    ]
    
    missing_vars = [var for var in required_vars if not os.getenv(var)]
    if missing_vars:
        print(f"❌ Missing required environment variables: {missing_vars}")
        print("Please set these in your .env file")
        return
    
    print("✅ All required environment variables are set")
    print()
    
    # Run tests
    tests_passed = 0
    total_tests = 5
    
    # Test 1: Health check
    if test_health_check():
        tests_passed += 1
    print()
    
    # Test 2: Create session
    session_id = test_create_session()
    if session_id:
        tests_passed += 1
    print()
    
    if session_id:
        # Test 3: Send message
        if test_send_message(session_id):
            tests_passed += 1
        print()
        
        # Test 4: Chat history
        if test_chat_history(session_id):
            tests_passed += 1
        print()
        
        # Test 5: Itinerary generation
        if test_itinerary_generation(session_id):
            tests_passed += 1
        print()
    
    # Summary
    print("=" * 60)
    print(f"📊 Test Results: {tests_passed}/{total_tests} tests passed")
    
    if tests_passed == total_tests:
        print("🎉 All tests passed! Integration is working correctly.")
    else:
        print("⚠️  Some tests failed. Check the logs above for details.")
        print("\nTroubleshooting tips:")
        print("1. Make sure the backend is running: python main.py")
        print("2. Check your .env file has all required variables")
        print("3. Verify your Vertex AI Agent is deployed and accessible")
        print("4. Check the backend logs for detailed error messages")

if __name__ == "__main__":
    main()
