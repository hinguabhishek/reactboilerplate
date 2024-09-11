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


def bool_hook(obj):
        result = {}
        for key, value in obj.items():
            if isinstance(value, dict):
                result[key] = bool_hook(value)
            elif isinstance(value, bool):
                result[key] = str(value).lower()
            else:
                result[key] = value
        return result

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

  return jsonify({"guide": f"{res['descriptions']}\n\n{res['guide']}"})



@app.route('/config_schema', methods=['POST'])
async def config_schema():
    data = request.json
    # query = data.get('query')
    # print('query', query)
    # connectors = ['a0n3300000FSK2zAAH', 'a0n3300000FSCNuAAP']
    connectors = data.get('connectors')
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

# @app.route('/config_schema_mock', methods=['POST'])
# async def config_schema_mock():
#     data = request.json
#     # query = data.get('query')
#     # print('query', query)
#     # connectors = ['a0n3300000FSK2zAAH', 'a0n3300000FSCNuAAP']
#     connectors = data.get('connectors')
#     # connectors = ['a0n4000000CiXBWAA3', 'a0n3300000Iokv5AAB']
#     task = open_task()
#     task['connectors'] = connectors
#     configSchema = json.load(json.dumps({"$id":"http://example.com/schema","$schema":"http://json-schema.org/draft-07/schema#","$defs":{"address_validation_obj":{"type":"object","additionalProperties":False,"properties":{"address_validation_enabled":{"type":"boolean","default":True}}},"common":{"type":"object","additionalProperties":False,"properties":{"collect_business_vat_id":{"type":"boolean","default":False},"company_name":{"type":"string"},"enable_tax_calculation":{"type":"boolean","default":False},"enable_exemption_certificates":{"type":"boolean","default":True},"shipping_tax_code":{"type":"string"},"validate_address":{"type":"boolean","default":True}}},"exemption_certificate_management_obj":{"type":"object","additionalProperties":False,"properties":{"enabled":{"type":"boolean","default":True}}},"integration_settings":{"type":"object","additionalProperties":False,"properties":{"avatax_timeout":{"type":"string","default":"60"},"error_action":{"default":"2","oneOf":[{"const":"1","title":"Disable checkout & show error message"},{"const":"2","title":"Allow checkout & fall back to native Adobe Commerce tax calculation (no error message)"}],"type":"string"},"logging_db_detail":{"default":"1","oneOf":[{"const":"1","title":"Minimal"},{"const":"2","title":"Normal"},{"const":"3","title":"Extra"}],"type":"string"},"logging_db_level":{"default":"300","oneOf":[{"const":"100","title":"Debug"},{"const":"200","title":"Info"},{"const":"250","title":"Notice"},{"const":"300","title":"Warning"},{"const":"400","title":"Error"},{"const":"500","title":"Critical"}],"type":"string"},"one_way_items_sync":{"type":"boolean","default":False}}}},"type":"object","properties":{"address_validation_obj":{"$ref":"#/$defs/address_validation_obj"},"common":{"$ref":"#/$defs/common"},"exemption_certificate_management_obj":{"$ref":"#/$defs/exemption_certificate_management_obj"},"integration_settings":{"$ref":"#/$defs/integration_settings"}}}),object_hook=bool_hook)
#     # layoutSchema = json.load(json.dumps({"elements":[{"type":"Control","label":"Tax Settings","options":{"layout":"Accordion","elementLabelProp":"channel"},"elements":[{"type":"VerticalLayout","elements":[{"label":"Enable exemption certificates","scope":"#/properties/common/properties/enable_tax_calculation","type":"Control","options":{"toggle":True,"TrueStatusLabel":"Yes","FalseStatusLabel":"No"}},{"label":"Company name","scope":"#/properties/common/properties/company_name","type":"Control","options":{"optionList":True,"eventListener":"onCompanyInit"}},{"label":"Enable exemption certificates","scope":"#/properties/common/properties/enable_exemption_certificates","type":"Control","options":{"toggle":True,"TrueStatusLabel":"Yes","FalseStatusLabel":"No"}},{"label":"Shipping tax code","scope":"#/properties/common/properties/shipping_tax_code","type":"Control"},{"label":"Validate address","scope":"#/properties/common/properties/validate_address","type":"Control","options":{"toggle":True,"TrueStatusLabel":"Yes","FalseStatusLabel":"No"}},{"label":"Collect Business VAT ID","scope":"#/properties/common/properties/collect_business_vat_id","type":"Control","options":{"toggle":True,"TrueStatusLabel":"Yes","FalseStatusLabel":"No"}}]}]},{"elements":[{"type":"VerticalLayout","elements":[{"type":"Control","label":"Error action (store view)","scope":"#/properties/integration_settings/properties/error_action","description":"If there is an error when Avalara estimates tax, the extension uses Adobe Commerce tax rules. If Disable checkout and show error message is selected, the extension prevents users and admins from placing orders."},{"type":"Control","label":"Database log detail (global)","scope":"#/properties/integration_settings/properties/logging_db_detail","description":"'Minimal' is recommended if you're connected to an Avalara production account."},{"type":"Control","label":"Database log level (global)","scope":"#/properties/integration_settings/properties/logging_db_level","description":"'Warning' is recommended if you're connected to an Avalara production account."},{"type":"Control","label":"Avalara API timeout (store view)","scope":"#/properties/integration_settings/properties/avatax_timeout","description":"This is how long Adobe Commerce should wait to hear from Avalara's servers before assuming they aren't responding."},{"label":"Sync products with Avalara (store view)","scope":"#/properties/integration_settings/properties/one_way_items_sync","type":"Control","options":{"toggle":True,"FalseStatusLabel":"No","TrueStatusLabel":"Yes"}}]}],"label":"Integration Settings","options":{"elementLabelProp":"channel","layout":"Accordion"},"type":"Control"},{"type":"Control","scope":"#/properties/address_validation_obj","options":{"layout":"Accordion","elementLabelProp":"channel"},"label":"Address validation","elements":[{"type":"VerticalLayout","elements":[{"type":"Control","label":"Validate addresses (store view)","scope":"#/properties/address_validation_obj/properties/address_validation_enabled","options":{"toggle":True,"TrueStatusLabel":"Yes","FalseStatusLabel":"No"},"description":"Turn this on to enable the Validate addresses option. Customers can use it to validate and correct addresses in the US and Canada."}]}]},{"type":"Control","scope":"#/properties/exemption_certificate_management_obj","options":{"layout":"Accordion","elementLabelProp":"channel"},"label":"Exemption certificate management","elements":[{"type":"VerticalLayout","elements":[{"type":"Control","label":"Enable exemption certificates (store view)","scope":"#/properties/exemption_certificate_management_obj/properties/enabled","description":"Turn this on to add a link during checkout for customers to create or upload exemption certificates. You must have a subscription to Avalara Exemption Certificate Management (ECM) to use this feature.","options":{"toggle":True,"TrueStatusLabel":"Yes","FalseStatusLabel":"No"}}]}]}],"type":"VerticalLayout"}),object_hook=bool_hook)
#     # payload = json.load(json.dumps({"address_validation_obj":{"address_validation_enabled":True},"common":{"collect_business_vat_id":False,"company_name":"","enable_tax_calculation":False,"enable_exemption_certificates":True,"shipping_tax_code":"","validate_address":True},"exemption_certificate_management_obj":{"enabled":True},"integration_settings":{"avatax_timeout":"60","error_action":"2","logging_db_detail":"1","logging_db_level":"300","one_way_items_sync":False}}),object_hook=bool_hook)
#     config = {
#         "layout": layoutSchema,
#         # "config": configSchema,
#         # "payload": payload
#     }
#     return jsonify(config)

if __name__ == '__main__':
    app.run(debug=True)
