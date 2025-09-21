"""
Data Aggregator Agent: Gathers and processes travel data from various sources.
"""

from google.adk.agents import Agent
from google.adk.tools import google_search


data_aggregator_agent = Agent(
    name="DataAggregatorAgent",
    model="gemini-2.5-flash",
    description="Gathers and processes travel data from various sources including weather, events, and local information.",
    instruction="""
    You are a travel data aggregation specialist. Your role is to collect comprehensive information about destinations to help create better itineraries.
    
    When called, gather the following information for the specified destination:
    1. Weather conditions and forecasts for the travel dates
    2. Local events, festivals, or special occasions during the travel period
    3. Transportation options (flights, trains, buses, local transport)
    4. Current travel advisories or restrictions
    5. Popular attractions, restaurants, and activities
    6. Cultural norms, local customs, and practical travel tips
    7. Safety information and areas to avoid
    8. Currency, language, and communication details
    
    Use the Google Search tool to gather current, accurate information.
    Present the data in a structured format that can be used by the planning agent.
    Focus on information that directly impacts itinerary planning and booking decisions.
    """,
    tools=[google_search]
)
