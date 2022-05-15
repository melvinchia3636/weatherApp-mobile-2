import os

items = os.listdir("./svg")

for item in items:
    if item.endswith(".svg"):
        print(item)
