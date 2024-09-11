from models.state import ResearchState
from utils.llm import llm
import json

class PayloadAgent:
  def __init__(self):
    self.llm = llm

  def get_common_payload(self, state: ResearchState):
      prompt_template = """
        You are given configuration and layout schemas from multiple connectors. Your task is to merge them into a unified schema while ensuring that the layout structure and config structure remain intact for each connector. Follow these instructions:

        **Generate Payload with Scope and Default Value**:
          - In the payload, return both the `scope` and the `default` value for each field.
          - Use the actual connector IDs and their respective field data in the payload.

        ### Input:
        You are given JSON data containing both configuration and layout schemas from multiple connectors.
        
        #### Example Input:
        {context}
        
        ### Task:
        **Payload Generation with Scope and Default Value**: Generate a payload for each connector. For each field, return both the `scope` and the `default` value in the payload. Use the actual connector IDs and ensure **no fields are missing**.

        ### Expected Output:
        
        **Payload with Scope and Default Value**:
        {{
          "payload": {{
            "<connector1_id>": {{
              "send_avatax_tax_code": {{
                "scope": "#/properties/send_avatax_tax_code",
                "default": true
              }},
              // The rest of the payload schema from Connector 1
            }},
            "<connector2_id>": {{
              "Disable_Tax_Calculation": {{
                "scope": "#/properties/disable_tax_calculation",
                "default": false
              }},
              // The rest of the payload schema from Connector 2
            }}
          }}
        }}

        ### Example Output:
        
        {{
          "payload": {{
            "<connector1_id>": {{
              "send_avatax_tax_code": {{
                "scope": "#/properties/send_avatax_tax_code",
                "default": true
              }},
              "override_avatax_tax_code": {{
                "scope": "#/properties/override_avatax_tax_code",
                "default": false
              }},
              // The rest of the payload schema from Connector 1
            }},
            "<connector2_id>": {{
              "Disable_Tax_Calculation": {{
                "scope": "#/properties/disable_tax_calculation",
                "default": false
              }},
              "Other_Field": {{
                "scope": "#/properties/other_field",
                "default": "No default value"
              }},
              // The rest of the payload schema from Connector 2
            }}
          }}
        }}

        Ensure the payload contains all the fields from the config schemas for both connectors and returns both `scope` and `default` values for each field.
      """

      common_config = state.get("common_config")
      common_layout = state.get("common_layout")

      context =  ""
      connector_layout_configs = state.get("connector_layout_configs")
      for index, (connector_id, connector) in enumerate(connector_layout_configs.items(), start=1):
          context += f"- Connector {index} ({connector_id}) Schema: {json.dumps(connector, indent=2)}\n\n"
      prompt = prompt_template.format(context=context)
      # prompt = prompt_template.format(common_config=common_config, common_layout=common_layout)
      
      response_text = self.llm.predict(prompt)
      print("payload response_______________________________", response_text)
      
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
      try:
        payload_json_str = response_text.split("```json")[1].split("```")[0].strip()
        payload = json.loads(payload_json_str, object_hook=bool_hook)['payload']
      except (IndexError, json.JSONDecodeError) as e:
          print(f"Error parsing JSON: {e}")
          return None
      print("common payload ********************************", payload)
      return {"payload": payload}
