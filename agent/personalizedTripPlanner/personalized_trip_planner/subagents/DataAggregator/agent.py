"""
Data Aggregator Agent: Gathers and processes travel data from various sources.
"""

from google.adk.agents import Agent


data_aggregator_agent = Agent(
    name="DataAggregatorAgent",
    model="gemini-2.5-flash",
    description="Gathers and processes travel data from various sources including weather, events, and local information.",
    instruction="Collect relevant travel data for the specified destination including weather forecasts, local events, transportation options, and current conditions to inform itinerary planning."
)
