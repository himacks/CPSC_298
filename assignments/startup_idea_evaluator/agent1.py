from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

class BusinessStrategist:
    def __init__(self):
        # Remove hardcoded API key
        api_key = os.getenv('OPENAI_API_KEY')
        if not api_key:
            raise ValueError("No OpenAI API key found. Please set OPENAI_API_KEY environment variable.")
            
        self.client = OpenAI(api_key=api_key)
        self.role = "Business Strategist"

    def analyze(self, startup_idea, market_feedback=None):
        prompt = f"""As a Business Strategist, analyze this startup idea: {startup_idea}
        
        {'Consider this Market Analyst feedback: ' + market_feedback if market_feedback else ''}
        
        Focus on:
        1. Business model viability
        2. Target market potential
        3. Revenue streams
        4. Initial challenges
        
        Provide a concise analysis."""

        response = self.client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}]
        )
        
        return response.choices[0].message.content
