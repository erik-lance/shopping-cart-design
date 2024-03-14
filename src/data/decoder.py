# This file decodes the task code provided by the start up dialog
# when opening the website regardless of config

# Steps:
# 1. Get cart.json file within same folder
# 2. Get input from user which is task code
# 3. Decode the task code
# 4. Return the decoded task code, which is the list of tasks for user to copy paste

import json

# import json file
cart_json = open('cart.json')
cart = json.load(cart_json)

# Get input from user
task_code = input("Enter the task code: ")

# Decode the task code by separating the task code by "I"
# this is becasue the task code is the item id + quantity
# "I5Q3I6Q2" -> ["Item ID: 5 Quantity: 3", "Item ID: 6 Quantity: 2"]
def decode_task_code(task_str: str) -> list:
    task_list = []
    task = ""
    
    # Separate by I in the char string (but include I)
    for char in task_str:
        if char == "I":
            task_list.append(task)
            task = ""
        task += char

    task_list.append(task)
    task_list.pop(0)
    

    return task_list

# Prepare message to return to user
# This message will be the list of tasks for user to copy paste
# The ID is referenced from the cart.json file
# QUANTITY + " " + ITEM NAME
# Make sure quantity is 2 digits
def prepare_message(task_list: list) -> str:
    # Print task_list
    print(task_list)

    message = ""
    for task in task_list:
        item_id = int(task.split("Q")[0].split("I")[1])
        quantity = int(task.split("Q")[1])
        
        # Get item name from cart.json
        item_name = cart[item_id]["name"]
        
        # Add to message
        message += str(quantity).zfill(2) + " : " + item_name + "\n"
    return message

# Print the message
print(prepare_message(decode_task_code(task_code)))