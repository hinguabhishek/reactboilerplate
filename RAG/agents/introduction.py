from models.state import ResearchState
from utils.llm import llm

class IntroductionAgent:
    def __init__(self):
      self.llm = llm

    def generate_overview(self):
        prompt = """
            Generate a brief overview of the AvaTax platform and its benefits.
            The guide should use a list format with clear headings and concise step descriptions. Ensure that the guide is easy to follow and understand.
            Please provide the guide in the following format:

            Introduction
                Overview of AvaTax platform and its benefits
        """
        return self.llm.predict(prompt)

    def generate_connector_descriptions(self, connectors):
        prompt = f"""
            List the prerequisites or requirements for setting up the AvaTax connectors.
            please include the following information:
                A description of each of the {connectors} connectors and their features
                Any prerequisites or requirements for setting up the connectors
            The guide should use a list format with clear headings and concise step descriptions. Ensure that the guide is easy to follow and understand.
            
            Please provide the guide in the following format:
               - Connector Name with Description of each of the {connectors} connectors and their features
               - Key Features
               - Use Cases
               - Prerequisites or requirements for setting up the connectors
            """
        return self.llm.predict(prompt)

    def generate_introduction_with_connectors(self, state: ResearchState):
        connectors = state.get("task")["connectors"]
        # overview = self.generate_overview()
        descriptions = self.generate_connector_descriptions(connectors)
        
        return {
          # "overview": overview,
          "descriptions": descriptions
        }
