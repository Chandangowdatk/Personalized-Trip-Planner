"""
Booking tools implementation for the booking agent.
"""

from google.adk.tools import FunctionTool
import uuid
from datetime import datetime

def create_reservation_tool_impl(item_name: str, item_type: str, date: str, time: str, duration: str, cost: float) -> dict:
    """
    Create a reservation for a bookable item.
    
    Args:
        item_name: Name of the item to book
        item_type: Type of item (hotel, flight, tour, restaurant, etc.)
        date: Date of the booking
        time: Time of the booking
        duration: Duration of the activity
        cost: Cost of the item
    
    Returns:
        dict: Reservation details with confirmation
    """
    reservation_id = str(uuid.uuid4())[:8].upper()
    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    reservation_details = {
        "reservation_id": reservation_id,
        "item_name": item_name,
        "item_type": item_type,
        "date": date,
        "time": time,
        "duration": duration,
        "cost": cost,
        "status": "confirmed",
        "created_at": current_time,
        "confirmation_number": f"BK{reservation_id}"
    }
    
    return {
        "success": True,
        "message": f"Reservation created successfully for {item_name}",
        "reservation_details": reservation_details
    }

def payment_choice_tool_impl() -> dict:
    """
    Present payment options to the user.
    
    Returns:
        dict: Available payment options
    """
    payment_options = {
        "options": [
            {
                "id": "apple_pay",
                "name": "Apple Pay",
                "description": "Pay with Apple Pay",
                "available": True
            },
            {
                "id": "google_pay", 
                "name": "Google Pay",
                "description": "Pay with Google Pay",
                "available": True
            },
            {
                "id": "credit_card",
                "name": "Credit Card",
                "description": "Pay with Credit Card on file",
                "available": True
            }
        ]
    }
    
    return {
        "success": True,
        "message": "Payment options presented",
        "payment_options": payment_options
    }

def process_payment_tool_impl(payment_method: str, amount: float, reservation_id: str) -> dict:
    """
    Process payment for a reservation.
    
    Args:
        payment_method: Selected payment method (apple_pay, google_pay, credit_card)
        amount: Amount to be charged
        reservation_id: ID of the reservation
    
    Returns:
        dict: Payment processing result
    """
    transaction_id = str(uuid.uuid4())[:12].upper()
    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    # Simulate payment processing based on method
    if payment_method == "apple_pay":
        success = False
        message = "Apple Pay transaction declined"
        status = "declined"
    elif payment_method == "google_pay":
        success = True
        message = "Google Pay transaction approved"
        status = "approved"
    elif payment_method == "credit_card":
        success = True
        message = "Credit Card transaction approved"
        status = "approved"
    else:
        success = False
        message = "Invalid payment method"
        status = "error"
    
    payment_result = {
        "transaction_id": transaction_id,
        "payment_method": payment_method,
        "amount": amount,
        "reservation_id": reservation_id,
        "status": status,
        "processed_at": current_time,
        "order_id": f"ORD{transaction_id}" if success else None
    }
    
    return {
        "success": success,
        "message": message,
        "payment_result": payment_result
    }

# Create the function tools
create_reservation_tool = FunctionTool(
    impl=create_reservation_tool_impl,
    name="create_reservation_tool"
)

payment_choice_tool = FunctionTool(
    impl=payment_choice_tool_impl,
    name="payment_choice_tool"
)

process_payment_tool = FunctionTool(
    impl=process_payment_tool_impl,
    name="process_payment_tool"
)
