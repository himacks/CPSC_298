import asyncio
from src.chat import DevelopmentChat

async def test_development_chat():
    chat = DevelopmentChat()
    
    # Test a single task
    result = await chat.process_single_task(
        "Create a simple function to calculate fibonacci numbers"
    )


print("Task Results:", result)

async def test_development_chat():
    # Test a more complex programming task
    result_complex = await chat.process_single_task(
        "Create a function that implements quicksort algorithm"
    )
    print("Complex Task Results:", result_complex)


if __name__ == "__main__":
    asyncio.run(test_development_chat()) 