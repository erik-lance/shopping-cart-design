# This file decodes the task code provided by the start up dialog
# when opening the website regardless of config

# Steps:
# 1. Get cart.json file within same folder
# 2. Get input from user which is task code
# 3. Decode the task code
# 4. Return the decoded task code, which is the list of tasks for user to copy paste

import json
import random

# Load the JSON data
with open('cart.json', 'r', encoding='utf-8') as cart_json:
    cart = json.load(cart_json)

# Get input from user
task_code = input("(0 for config order) Enter the task code: ")

# If first character is 0, we are printing the order of configs else provide tasks as normal
if task_code[0] == "0":
    print("\nOrder of configs")
    # We randomize the order of configs (0 - 6)
    # however, 0,3,4 are always the first 3 configs (but randomized)
    # and 1,2,5,6 are always the last 4 configs (but randomized)
    first_three: list = [0, 3, 4]
    last_four: list = [1, 2, 5, 6]

    # Randomize the order of the first three and last four
    random.shuffle(first_three)
    random.shuffle(last_four)

    # Combine and print the order of configs
    order_of_configs = first_three + last_four
    print(order_of_configs)

    exit()

# Decode the task code by separating the task code by "I"
# this is becasue the task code is the item id + quantity
# "I5Q3I6Q2" -> ["Item ID: 5 Quantity: 3", "Item ID: 6 Quantity: 2"]
def decode_task_code(task_str: str) -> list:
    task_list = []
    task = ""
    
    # Separate by I in the char string (but include I)
    # Note, ID and quantity can be two digits
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

    items_array = []
    for task in task_list:
        # Note: Item ID and quantity can be two digits
        item_id = task.split("Q")[0][1:]
        quantity = task.split("Q")[1]

        item_id = int(item_id) - 1
        quantity = int(quantity)
        
        # Get item name from cart.json
        item_name = cart[item_id]["name"]
        
        # Add to items list array
        items_array.append(str(quantity).zfill(2) + " " + item_name)
    
    # Randomize list before converting to message string
    random.shuffle(items_array)

    # Also separate by lines --
    message = ""
    for item in items_array:
        message += item + "\n"
        message += "-------------------\n"
    
    return message

# Print the message
print(prepare_message(decode_task_code(task_code)))