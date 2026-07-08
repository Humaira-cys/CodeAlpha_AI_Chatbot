import json
import random
with open("intents.json", "r") as file:
    data = json.load(file)

def get_response(user_message):
    user_message = user_message.lower()

    for intent in data["intents"]:
        for pattern in intent["patterns"]:
            if pattern.lower() in user_message:
                return random.choice(intent["responses"])

    return "Sorry, I don't understand your question. Please try asking something else."