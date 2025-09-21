
"""
3. Takes a confirmed destination and generates multiple optimal itinerary candidates using 
data aggregation and constraint optimization.
"""
from google.adk.agents import Agent
from google.adk.tools.agent_tool import AgentTool
from personalized_trip_planner.subagents.DataAggregator import data_aggregator_agent
from personalized_trip_planner.subagents.Optimization import optimization_agent


planning_agent = Agent(
    name="PlanningAgent",
    model="gemini-2.5-flash",
    description="Creates detailed, optimized itineraries for a given destination.",
    instruction="""
    You are a travel planning expert. Generate detailed, day-by-day itineraries for the user's chosen destination.
    
    Your response should include:
    1. Multiple itinerary options (2-3) with different focuses (heritage, food, adventure, etc.)
    2. Each itinerary should be structured with:
       - Day-by-day breakdown
       - Specific activities with time slots
       - Estimated costs for each activity
       - Booking requirements (mark activities that need advance booking)
       - Transportation details
       - Accommodation suggestions
       - Restaurant recommendations
    
    3. For each activity that requires booking, mark it with 'booking_required: true' and provide:
       - Activity name
       - Date and time
       - Duration
       - Estimated cost
       - Booking type (hotel, flight, tour, restaurant reservation, etc.)
    
    4. Present the itineraries in a clear, numbered format for easy selection.
    5. Include a total budget estimate for each itinerary option.
    
    Make sure the itineraries are realistic, well-paced, and align with the user's stated preferences, budget, and travel dates.
    
    Use the data_aggregator_agent to gather relevant information about the destination, and the optimization_agent to refine the itineraries.
    """,
    tools=[
        AgentTool(agent=data_aggregator_agent),
        AgentTool(agent=optimization_agent),
    ]
)
