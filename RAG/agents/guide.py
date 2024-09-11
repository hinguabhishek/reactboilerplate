from models.state import ResearchState
from vector_store import create_vector_store
from utils.llm import llm

vector_store = create_vector_store()
retriever = vector_store.as_retriever(search_type="similarity", search_kwargs={"k": 10})


class GuideAgent:
  def __init__(self):
    self.llm = llm
  
  def retrieve(self, connector):
      print("Retrieving relevant information from the vector store for the connector ", connector)
      docs = retriever.get_relevant_documents(connector)
      context = "\n\n".join([doc.page_content for doc in docs])
      prompt = f"Provide the unique setup steps required for the {connector} connector based on the context {context}. Ensure that all relevant information is included and no important details are missed. The guide should cover all the necessary steps to set up connector correctly."
      return self.llm.predict(prompt)

  def get_common_guide(self,state: ResearchState): 
      connectors=state.get('task')["connectors"]
      # Generate setup steps for each connector separately
      connector_specific_steps = {}
      for connector in connectors:
          connector_specific_steps[connector] = self.retrieve(connector)
      # Combine the setup steps for all connectors into a single string
      context = "\n\n".join([f"**{connector} Setup Steps:**\n{steps}" for connector, steps in connector_specific_steps.items()])     
      
      prompt = f"""Create a common guide that combines the setup steps for {', '.join(connectors)} connectors based on the given context, ensuring that all relevant information is included and no important details are missed. The guide should cover all the necessary steps to set up each connector correctly, assuming that the user has already signed up for an AvaTax account and has basic knowledge of accounting and e-commerce concepts.

          The guide should use a numbered list format with clear headings and concise step descriptions. Ensure that the guide is easy to follow and understand, and provides clear instructions for troubleshooting common issues.

          Please provide the guide in the following format:

          Setup Steps
          **Common Setup Steps**: List the common setup steps that apply to all connectors, such as creating an AvaTax account, setting up tax codes, and configuring jurisdictions, add all the common steps in detail from the given context.
          **Connector-Specific Setup Steps**: Provide separate sections for each connector, outlining the unique setup steps required for each one.
          Troubleshooting
          Common issues and solutions
          Additional resources for support

      Context: {context}
      Answer:"""
      guide= self.llm.predict(prompt)
      return {
        "guide": guide
      }