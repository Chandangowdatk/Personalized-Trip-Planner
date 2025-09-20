"""
Realtime Monitoring Agent: Monitors and provides real-time updates during travel.
"""

from google.adk.agents import Agent


realtime_monitoring_agent = Agent(
    name="RealtimeMonitoringAgent",
    model="gemini-2.5-flash",
    description="Monitors travel conditions and provides real-time updates and recommendations during the trip.",
    instruction="Monitor real-time travel conditions, weather updates, traffic, flight delays, and other factors that might affect the travel plan. Provide timely updates and alternative suggestions when needed."
)
