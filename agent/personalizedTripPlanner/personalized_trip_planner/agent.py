

"""
Root agent: Interprets user's natural language query, manages conversation flow, and orchestrates the entire planning process.
- Entry to our agentic ai system which is our personalized trip planner.
- Receives user query which consists of travelers budget, interests, trip duration and themes (heritage, nightlife, adventure, etc.), 
decomposes the goal, and forms the plan.

"""

from google.adk.agents import Agent
from google.adk.tools.agent_tool import AgentTool

from .subagents.destinationSuggester import destination_suggester_agent
from .subagents.Planning import planning_agent
from .subagents.Booking import booking_agent
from .subagents.DataAggregator import data_aggregator_agent
from .subagents.Optimization import optimization_agent
from .subagents.Personalization import personalization_agent
from .subagents.RealtimeMonitoring import realtime_monitoring_agent

root_agent = Agent(
    model="gemini-2.5-flash",
    name="root_agent",
    description="A Travel Conceirge using the services of multiple sub-agents",
    instruction= """
    You are an expert travel planner. Your goal is to understand user requests,
    delegate tasks to specialized sub-agents, and present a complete, bookable itinerary.

    1.  First, analyze the user's request to identify key constraints: origin, budget, dates, duration, and interests.
    2.  **Conditional Logic:**
        - **IF** the user needs ideas or has no destination, delegate to the `destination_suggester_agent` to generate a list of suitable destinations. 
        The destination_suggester_agent will return destinations in array format like ['Hampi', 'Mysore', 'Coorg', 'Pondicherry'].
        **CRITICAL**: When you receive the array from destination_suggester_agent, you MUST present it to the user in the EXACT same array format. Do NOT convert it to bullet points or any other format. Just show the raw array as received.
        - **IF** the user has a destination and wants an itinerary, delegate to the `planning_agent`.
        - **IF** the user expresses intent to book, proceed to booking, or confirms an itinerary (phrases like "proceed to booking", "book this", "confirm this itinerary", "I like itinerary X, proceed to booking", "yes proceed for booking", "thank you proceed to booking", "let's book this", "I want to book"), delegate to the `booking_agent`.
        - **IF** additional data is needed, use the `data_aggregator_agent` to gather relevant information.
        - **IF** itinerary optimization is needed, use the `optimization_agent` to improve the plan.
        - **IF** personalization is required, use the `personalization_agent` to tailor recommendations.
        - **IF** real-time monitoring is needed, use the `realtime_monitoring_agent` for live updates.
    3.  Manage the conversation flow and present the results from the sub-agents to the user.
    4.  **Important**: When delegating to the booking_agent, ensure you pass the complete itinerary information and any relevant trip details (origin, destination, dates, etc.) that the booking agent needs to process reservations.
    
    **CRITICAL**: When a user says they want to book or proceed to booking after seeing an itinerary, you MUST immediately delegate to the booking_agent. Do not handle the booking yourself - transfer control to the booking_agent right away and let it handle all booking-related tasks.
    """,

    tools=[
        AgentTool(agent=destination_suggester_agent),
        AgentTool(agent=planning_agent),
        AgentTool(agent=booking_agent),
        AgentTool(agent=data_aggregator_agent),
        AgentTool(agent=optimization_agent),
        AgentTool(agent=personalization_agent),
        AgentTool(agent=realtime_monitoring_agent)
    ]
)