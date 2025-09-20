/**
 * Test script to verify frontend-backend API communication
 * Run this in the browser console or as a Node.js script
 */

const API_BASE_URL = 'http://localhost:8000';

async function testFrontendAPI() {
  console.log('🧪 Testing Frontend-Backend API Communication');
  console.log('=' .repeat(50));

  try {
    // Test 1: Health Check
    console.log('1️⃣ Testing health check...');
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData);

    // Test 2: Create Session (with query parameter)
    console.log('\n2️⃣ Testing session creation...');
    const sessionResponse = await fetch(`${API_BASE_URL}/api/v1/chat/session?user_id=frontend_test_user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!sessionResponse.ok) {
      const errorText = await sessionResponse.text();
      console.log('❌ Session creation failed:', sessionResponse.status, errorText);
      return;
    }
    
    const sessionData = await sessionResponse.json();
    console.log('✅ Session created:', sessionData);

    // Test 3: Send Message
    console.log('\n3️⃣ Testing message sending...');
    const messageResponse = await fetch(`${API_BASE_URL}/api/v1/chat/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Hello from frontend test!',
        session_id: sessionData.session_id,
        user_id: 'frontend_test_user'
      })
    });

    if (!messageResponse.ok) {
      const errorText = await messageResponse.text();
      console.log('❌ Message sending failed:', messageResponse.status, errorText);
      return;
    }

    const messageData = await messageResponse.json();
    console.log('✅ Message sent successfully');
    console.log('📝 Agent response:', messageData.response.substring(0, 200) + '...');
    console.log('💡 Suggestions:', messageData.suggestions);

    console.log('\n🎉 All frontend API tests passed!');
    console.log('The frontend should now work correctly.');

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run the test
testFrontendAPI();
