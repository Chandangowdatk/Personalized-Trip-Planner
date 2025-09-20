"""
Personalization Agent: Personalizes recommendations based on user profile and preferences.
"""

from google.adk.agents import Agent


personalization_agent = Agent(
    name="PersonalizationAgent",
    model="gemini-2.5-flash",
    description="Personalizes travel recommendations based on user profile, preferences, and past behavior.",
    instruction="Analyze the user's profile, interests, and preferences to personalize travel recommendations, activities, and experiences that match their unique travel style and interests."
)
