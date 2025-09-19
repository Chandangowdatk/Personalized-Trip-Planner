
from google.adk.agents import Agent
from google.adk.agents import SequentialAgent
from google.adk.tools import google_search


# from .tools.tools import destination_filter_tool
# from .tools.tools import destination_ranking_tool

# destination_suggester_agent = SequentialAgent(
#     name="DestinationSuggesterAgent",
#     model="gemini-2.5-flash",
#     description="Suggests and ranks potential travel destinations when the user has not provided one.",
#     sub_agents=[
#         Agent(
#             name="Filterer", 
#             model="gemini-2.5-flash", 
#             tools=[destination_filter_tool]),
#         Agent(
#             name="Ranker", 
#             model="gemini-2.5-flash", 
#             tools=[destination_ranking_tool])
#     ]
# )

destination_suggester_agent = SequentialAgent(
    name="InspirationAgent",
    description="Suggests and ranks potential travel destinations when the user has not provided one.",
    sub_agents=[
        Agent(
            name="Filterer",
            model="gemini-2.5-flash",
            tools=[google_search],
            instruction="You are a travel research assistant. Based on the user's constraints (like budget, interests, travel dates, and duration), use the Google Search tool to find 3 to 5 suitable travel destinations within India. Your final output must be only a Python-parseable list of strings. For example: ['Jaipur', 'Goa', 'Varanasi']",
            output_key="filtered_destinations"
        ),
        Agent(
            name="Ranker",
            model="gemini-2.5-flash",
            tools=[google_search],
            instruction="You are a travel personalization expert. You will receive a list of potential destinations in the '{filtered_destinations}' key. Based on the user's profile and stated interests, use the Google Search tool to research each destination. Then, provide a ranked list of these destinations from best to worst fit for the user. Your final output must be only a Python-parseable list of strings representing the ranked destinations. For example: ['Jaipur', 'Varanasi', 'Goa']",
            output_key="ranked_destinations"
        )
    ]
)