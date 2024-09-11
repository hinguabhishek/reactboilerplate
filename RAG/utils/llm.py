from langchain_openai import AzureChatOpenAI

llm = AzureChatOpenAI(
    openai_api_version="2023-03-15-preview",
    azure_deployment="avagpt4omini",
    temperature=0,
)
