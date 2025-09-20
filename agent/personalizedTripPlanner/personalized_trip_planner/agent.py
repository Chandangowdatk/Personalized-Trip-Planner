

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
        Present these suggestions to the user and wait for their selection.
        - **IF** the user has a destination and wants an itinerary, delegate to the `planning_agent`.
        - **IF** the user wants to book a confirmed plan, delegate to the `booking_agent`.
        - **IF** additional data is needed, use the `data_aggregator_agent` to gather relevant information.
        - **IF** itinerary optimization is needed, use the `optimization_agent` to improve the plan.
        - **IF** personalization is required, use the `personalization_agent` to tailor recommendations.
        - **IF** real-time monitoring is needed, use the `realtime_monitoring_agent` for live updates.
    3.  Manage the conversation flow and present the results from the sub-agents to the user.
    """,

    sub_agents=[
        destination_suggester_agent,
        planning_agent,
        booking_agent,
        data_aggregator_agent,
        optimization_agent,
        personalization_agent,
        realtime_monitoring_agent
    ]
)