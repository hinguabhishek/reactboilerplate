import os
import time
from langgraph.graph import StateGraph, END
import datetime
from models.state import ResearchState



# Import agent classes
from agents.schema import SchemaAgent
from agents.guide import GuideAgent 
from agents.introduction import IntroductionAgent
from agents.config import ConfigAgent
from agents.layout import LayoutAgent
from agents.payload import PayloadAgent



class ConfigMasterAgent:
    def __init__(self, task: dict):
        self.task_id = int(time.time())
        self.task = task

    def init_research_team(self):
        # Initialize agents
        schema_agent = SchemaAgent()
        config_agent = ConfigAgent()
        layout_agent = LayoutAgent()
        payload_agent = PayloadAgent()

        
        workflow = StateGraph(ResearchState)

        # Add nodes for each agent
        workflow.add_node("connectors_schema", schema_agent.get_connector_config)
        workflow.add_node("layout_schema", layout_agent.get_common_layout)
        workflow.add_node("config_schema", config_agent.get_common_config)
        workflow.add_node("payload_schema", payload_agent.get_common_payload)

        workflow.add_edge('connectors_schema', 'layout_schema')
        workflow.add_edge('layout_schema', 'config_schema')
        workflow.add_edge('config_schema', 'payload_schema')

        # set up start and end nodes
        workflow.set_entry_point("connectors_schema")
        workflow.add_edge('payload_schema', END)


        return workflow

    async def run_research_task(self, task_id=None):
        research_team = self.init_research_team()

        # compile the graph
        #memory = MemorySaver()
        chain = research_team.compile()

        config = {
            "configurable": {
                "thread_id": task_id,
                "thread_ts": datetime.datetime.utcnow()
            }
        }
 
        result = await chain.ainvoke({"task": self.task}, config=config)

        return result

class GuideMasterAgent:
    def __init__(self, task: dict):
        self.task_id = int(time.time()) # Currently time based, but can be any unique identifier
        self.task = task

    def init_research_team(self):
        # Initialize agents
        
        intro_agent = IntroductionAgent()
        guide_agent = GuideAgent()
        
        workflow = StateGraph(ResearchState)

        # Add nodes for each agent
        
        workflow.add_node("intro_agent", intro_agent.generate_introduction_with_connectors)
        workflow.add_node("common_guide", guide_agent.get_common_guide)
        

        workflow.add_edge('intro_agent', 'common_guide')


        # set up start and end nodes
        workflow.set_entry_point("intro_agent")
        workflow.add_edge('common_guide', END)


        return workflow

    async def run_research_task(self, task_id=None, user_info=None):
      
        self.task["user_info"]=user_info
        research_team = self.init_research_team()

        chain = research_team.compile()

        config = {
            "configurable": {
                "thread_id": task_id,
                "thread_ts": datetime.datetime.utcnow()
            }
        }
 
        result = await chain.ainvoke({"task": self.task}, config=config)

        return result

