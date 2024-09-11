from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import json
import uuid
import asyncio

# Load environment variables
print("Loading environment variables...")
load_dotenv(".env")

# Azure OpenAI settings
print("Loading Azure OpenAI settings...")
AZURE_OPENAI_ENDPOINT = os.getenv("AZURE_OPENAI_ENDPOINT")
AZURE_OPENAI_API_KEY = os.getenv("AZURE_OPENAI_API_KEY")

# Vector search settings
print("Loading vector search settings...")
VECTOR_SEARCH_ENDPOINT = os.getenv("VECTOR_SEARCH_ENDPOINT")
VECTOR_SEARCH_KEY = os.getenv("VECTOR_SEARCH_KEY")


from agents.master import GuideMasterAgent, ConfigMasterAgent

app = Flask(__name__)
CORS(app)



def open_task():
    # Get the directory of the current script
    current_dir = os.path.dirname(os.path.abspath(__file__))
    # Construct the absolute path to task.json
    task_json_path = os.path.join(current_dir, 'task.json')
    
    with open(task_json_path, 'r') as f:
        task = json.load(f)

    if not task:
        raise Exception("No task provided. Please include a task.json file in the multi_agents directory.")

    return task


@app.route('/user_guide', methods=['POST'])
async def user_guide():
  data = request.json
  print("data ,................................................................")
  print(data)
  connectors = data.get('connectors')
  task = open_task()
  task['connectors'] = connectors
  chief_editor = GuideMasterAgent(task)
  res = await chief_editor.run_research_task(task_id=uuid.uuid4(),user_info={"customer_id":"abcd"})

  return jsonify({"guide": f"{res['overview']}\n\n{res['descriptions']}\n\n{res['guide']}"})



@app.route('/config_schema', methods=['POST'])
async def config_schema():
    # data = request.json
    # query = data.get('query')
    # print('query', query)
    connectors = ['a0n3300000FSK2zAAH', 'a0n3300000FSCNuAAP']
    # connectors = ['a0n4000000CiXBWAA3', 'a0n3300000Iokv5AAB']
    task = open_task()
    task['connectors'] = connectors
    chief_editor = ConfigMasterAgent(task)
    res = await chief_editor.run_research_task(task_id=uuid.uuid4())
    config = {
        "layout": res['common_layout'],
        "config": res['common_config'],
        "payload": res['payload']
    }
    return jsonify(config)


if __name__ == '__main__':
    app.run(debug=True)
