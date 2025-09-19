
"""
3. Takes a confirmed destination and generates multiple optimal itinerary candidates using 
data aggregation and constraint optimization.
"""
from google.adk.agents import Agent


planning_agent = Agent(
    name="PlanningAgent",
    model="gemini-2.5-flash",
    description="Creates detailed, optimized itineraries for a given destination.",
    instruction="Generate multiple itinerary options for the user's chosen destination, balancing their preferences and constraints."
    # In a full implementation, this agent would use tools that might be other agents,
    # e.g., AgentTool(impl=DataAggregatorAgent), AgentTool(impl=OptimizationAgent)
)
