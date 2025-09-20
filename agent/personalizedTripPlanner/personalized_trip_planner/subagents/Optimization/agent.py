"""
Optimization Agent: Optimizes itineraries based on constraints and preferences.
"""

from google.adk.agents import Agent


optimization_agent = Agent(
    name="OptimizationAgent",
    model="gemini-2.5-flash",
    description="Optimizes travel itineraries based on user constraints, preferences, and real-time data.",
    instruction="Analyze the proposed itinerary and optimize it considering factors like travel time, cost efficiency, user preferences, and logistical constraints to create the best possible travel plan."
)
