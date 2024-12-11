from agent1 import BusinessStrategist
from agent2 import MarketAnalyst

def evaluate_startup_idea():
    print("\nWelcome to the Startup Idea Evaluator!")
    print("======================================")
    
    # Get user input
    print("\nPlease describe your startup idea and any relevant details:")
    startup_idea = input("> ")
    
    # Initialize agents
    strategist = BusinessStrategist()
    analyst = MarketAnalyst()
    
    # First round of analysis
    print("\nAnalyzing your idea...")
    strategist_feedback = strategist.analyze(startup_idea)
    print("\nBusiness Strategist's Analysis:")
    print(strategist_feedback)
    
    # Second round with market analyst
    analyst_feedback = analyst.analyze(startup_idea, strategist_feedback)
    print("\nMarket Analyst's Analysis:")
    print(analyst_feedback)
    
    # Final round with strategist
    final_feedback = strategist.analyze(startup_idea, analyst_feedback)
    print("\nFinal Business Strategy Insights:")
    print(final_feedback)

if __name__ == "__main__":
    evaluate_startup_idea()
