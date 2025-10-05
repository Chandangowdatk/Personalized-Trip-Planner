# Personalized Trip Planner

A comprehensive trip planning application that uses the Google Places API client library for travel planning features.

## 📁 **Project Structure**

This project uses the **Google Places API Client Library** as a separate dependency:

- **Google Places API Client Library** - Separate project at `../google-places-client/`
- **Personalized Trip Planner Application** - This project (main trip planning application)

For detailed project structure, see [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md).

## 🚀 **Quick Start**

### **Using the Google Places API Client**

```python
from google_places_client import GooglePlacesAPI

# Initialize the API
api = GooglePlacesAPI("YOUR_API_KEY")

# Text Search - Find places
search_results = api.text_search(
    text_query="Italian restaurants in San Francisco",
    field_mask="places.id,places.displayName,places.rating"
)

# Place Details - Get detailed information
place_details = api.get_place_details(
    place_id="ChIJk35bizx-j4AREil6UPp7Jn4",
    field_mask="id,displayName,formattedAddress,rating,internationalPhoneNumber"
)
```

### **Using the Trip Planner**

```python
from google_places_client import TravelPlanner

# Initialize the trip planner
planner = TravelPlanner("YOUR_API_KEY")

# Plan a trip
trip_plan = planner.plan_trip(
    destination="San Francisco",
    duration_days=3,
    budget_level="moderate"
)
```

## 📚 **Documentation**

- **Google Places API Client**: [google_places_client/README.md](google_places_client/README.md)
- **Text Search vs Place Details**: [google_places_client/TEXT_SEARCH_VS_PLACE_DETAILS.md](google_places_client/TEXT_SEARCH_VS_PLACE_DETAILS.md)
- **Project Structure**: [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)

## 🛠️ **Development**

### **Testing the API Client**

```bash
cd google_places_client/
python test_all_core_offerings.py
```

### **Running the Application**

```bash
python -m trip_planner.main
```

## 📦 **Installation**

### **Development Setup**

```bash
# Install the Google Places API client library (local development)
pip install -e ../google-places-client/

# Install other trip planner dependencies
pip install -r requirements.txt
```

### **Production Setup**

```bash
# Install the Google Places API client library from PyPI
pip install google-places-client>=1.0.0

# Install other trip planner dependencies
pip install -r requirements.txt
```

## 🎯 **Features**

### **Google Places API Client**
- ✅ Text Search - Find places using text queries
- ✅ Nearby Search - Find places near a location  
- ✅ Place Details - Get detailed information about specific places
- ✅ Integrated field mask management
- ✅ Travel planning extensions
- ✅ Multi-language support

### **Trip Planner Application**
- ✅ Destination-based trip planning
- ✅ Accommodation recommendations
- ✅ Restaurant suggestions
- ✅ Points of interest discovery
- ✅ Itinerary generation

## 📝 **Notes**

This project structure allows for efficient development while maintaining clear boundaries between the API client library and the main application. The Google Places API client is fully functional and can be used independently or as part of the trip planner.

---

For detailed information about the Google Places API client, see the [google_places_client/README.md](google_places_client/README.md) file.