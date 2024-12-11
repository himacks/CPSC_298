from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

class MarketAnalyst:
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
        self.role = "Market Analyst"

    def analyze(self, startup_idea, strategist_feedback=None):
        prompt = f"""As a Market Analyst, evaluate this startup idea: {startup_idea}
        
        {'Consider this Business Strategist feedback: ' + strategist_feedback if strategist_feedback else ''}
        
        Focus on:
        1. Market size and growth potential
        2. Competition analysis
        3. Market trends
        4. Customer segments
        
        Provide a concise analysis."""

        response = self.client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}]
        )
        
        return response.choices[0].message.content
