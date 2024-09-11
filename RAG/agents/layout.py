from models.state import ResearchState
from utils.llm import llm
import json
import os

# Define the path to the JSON file
json_file_path = os.path.join('utils', 'data.json')

# Open and read the JSON file
with open(json_file_path, 'r') as file:
  fields_data = json.load(file)

class LayoutAgent:
  def __init__(self):
    self.llm = llm

  def get_common_layout(self, state: ResearchState):
      prompt_template = """
        You are given layout schemas from multiple connectors. Your task is to merge them into a unified schema while ensuring that the layout structure and config structure remain intact for each connector. Follow these instructions:

        1. **Identify Strictly Matching Common Labels in Layout Schema**:
          - **Layout**: Identify labels that are exactly the same in both connectors. A label can be considered "common" if:
            1. It has the same structure (i.e., type, elements, and sub-elements).
            2. **The scope does not need to match.** As long as the label name and structure match, it can be treated as common.
          - Use the provided context to better understand the function of each label, ensuring that labels with the same meaning but different scopes are correctly categorized.
          - Labels with minor differences, such as "Enable exemption certificates" vs. "Enable exemption certificates (store view)," should be considered common.
          - Only include a label in the `Common` section if it meets all the above criteria. Otherwise, it should remain in its respective connector's section.

        2. **Merge Connector-Specific Labels Without Altering Structure**:
          - The rest of the layout schema should be merged, preserving the existing structure from each connector.
          - Ensure that all labels from each connector are included in the final merged schema. Do not create new sections for connector-specific labels, and keep the original structure intact for each connector.

        3. **Return Layout Schema in Its Original Format with a Common Section**:
          - The config schema should be returned in its original format.

        ### Input:
        You are given JSON data containing configuration schemas from multiple connectors, as well as additional context explaining each label.

        #### Example Input:
        Layout schema: {context}
        Label explanations: {fields_desc}
        
        ### Task:
        **Unified Layout Schema with Common Section**: Identify common elements across the layout schemas and include them in a `Common` section **only if they have the exact same label and structure**. The context provided should be used to clarify each label's meaning and ensure proper categorization. The rest of the layout schemas should be merged without altering the structure, and **all fields** should be included. No fields should be omitted, and the structure of each connector’s layout schema should remain unchanged.

        ### Expected Output:
        
        **Unified Layout Schema with Common Section**:
        {{
          "layout": {{
            "type": "VerticalLayout",
            "elements": [
              {{
                "type": "Control",
                "label": "Common",
                "options": {{
                  "layout": "Accordion"
                }},
                "elements": [
                  // List of common elements
                ]
              }},
              // Preserve the structure of each connector's layout schema here
            ]
          }}
        }}

        ### Example Output:
        
        **Unified Layout Schema**:
        {{
          "layout": {{
            "type": "VerticalLayout",
            "elements": [
              {{
                "type": "Control",
                "label": "Common",
                "options": {{
                  "layout": "Accordion"
                }},
                "elements": [
                  {{
                    "type": "Control",
                    "label": "Disable Tax Calculation",
                    "scope": "#/properties/Disable_Tax_Calculation"
                  }}
                ]
              }},
              // The rest of the layout schema from Connector 1
              {{
                "type": "Control",
                "label": "Send AvaTax tax code",
                "scope": "#/properties/send_avatax_tax_code"
              }},
              {{
                "type": "Control",
                "label": "Override AvaTax tax code",
                "scope": "#/properties/override_avatax_tax_code"
              }},
              // The rest of the layout schema from Connector 2
              {{
                "type": "Control",
                "label": "Return Address",
                "scope": "#/properties/Return_Address"
              }}
            ]
          }}
        }}
      """



      connector_layout_configs = state.get("connector_layout_configs")
      context =  ""
      for index, (connector_id, connector) in enumerate(connector_layout_configs.items(), start=1):
          context += f"- Connector {index} ({connector_id}) Schema: {json.dumps(connector['layout'], indent=2)}\n\n"
      
      prompt = prompt_template.format(context=context, fields_desc=fields_data)
      
      response_text = self.llm.predict(prompt)
      print("layout response_______________________________", response_text)
      
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
          layout_json_str = response_text.split("```json")[1].split("```")[0].strip()
          common_layout = json.loads(layout_json_str, object_hook=bool_hook)['layout']
      except (IndexError, json.JSONDecodeError) as e:
          print(f"Error parsing JSON: {e}")
          return None
      print("common layout ********************************", common_layout)
      return {"common_layout": common_layout}
