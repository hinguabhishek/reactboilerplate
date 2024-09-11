from models.state import ResearchState
from utils.llm import llm
import json

class ConfigAgent:
  def __init__(self):
    self.llm = llm

  def get_common_config(self, state: ResearchState):
      prompt_template = """
        You are given configuration schemas from multiple connectors. Your task is to merge them into a unified schema while ensuring that the layout structure remain intact for each connector. Follow these instructions:

        1. **Create a Common Section for Config schema**:
          - **Config**: These are the common fields across multiple connectors {common_labels}. These common fields should be grouped together under `$defs` in a section labeled `common`.

        2. **Merge Connector-Specific Fields Without Altering Structure**:
          - The rest of the config schema should be merged, preserving the existing structure from each connector.
          - Ensure that all fields from each connector are included in the final merged schema. Do not create new sections for connector-specific fields, and keep the original structure intact for each connector.

        3. **Return Config Schema in Its Original Format with a Common Section**:
          - The config schema should be returned in its original format, but with the common fields grouped under `$defs` > `common`, and the remaining connector-specific fields merged into the respective sections.

        ### Input:
        You are given JSON data containing configuration schemas from multiple connectors.

        #### Example Input:
        {context}
        
        ### Task:
        **Unified Config Schema with Common Section**: Merge the configuration schemas from all connectors into one unified schema, with common fields grouped under `$defs` > `common`. The rest of the config fields should be merged and maintained in their original structure for each connector.
       
        ### Expected Output:
        
        **Unified Config Schema with Common Section**:
        {{
          "$schema": "http://json-schema.org/draft-07/schema#",
          "$id": "http://example.com/schema",
          "type": "object",
          "$defs": {{
            "common": {{
              "type": "object",
              "properties": {{
                "item_settings": {{
                  "type": "object",
                  "properties": {{
                    "send_avatax_tax_code": {{
                      "type": "boolean",
                      "default": true
                    }},
                    "override_avatax_tax_code": {{
                      "type": "boolean",
                      "default": false
                    }},
                    // Include all common fields here
                  }}
                }}
              }}
            }},
            // Additional $defs here for each connector
          }},
          "properties": {{
            "general": {{
              "$ref": "#/$defs/general"
            }},
            // Other properties here for each connector
          }}
        }}

        ### Example Output:

        **Unified Config Schema with Common Section**:
        {{
          "$schema": "http://json-schema.org/draft-07/schema#",
          "$id": "http://example.com/schema",
          "type": "object",
          "$defs": {{
            "common": {{
              "type": "object",
              "properties": {{
                "send_avatax_tax_code": {{
                  "type": "boolean",
                  "default": true
                }},
                "override_avatax_tax_code": {{
                  "type": "boolean",
                  "default": false
                }}
                // Other common properties here
              }}
            }},
            "general": {{
              // Other connector-specific properties here
            }}
          }},
          "properties": {{
            "common": {{
              "$ref": "#/$defs/common"
            }},
            "general": {{
              "$ref": "#/$defs/general"
            }},
            // Other properties here for each connector
          }}
        }}
      """

      connector_layout_configs = state.get('connector_layout_configs')
      common_layout = state.get("common_layout")
      # Function to extract all labels under the "Common" section
      def extract_labels_from_common(json_data):
          labels = []
          elements = json_data.get("elements", [])
          
          for element in elements:
              if element.get("label") == "Common":
                  common_elements = element.get("elements", [])
                  for common_element in common_elements:
                      labels.append(common_element.get("label"))
          return labels

      # Extract the labels
      common_labels = extract_labels_from_common(common_layout)
      print('common_labels', common_labels)
      context =  ""
      for index, (connector_id, connector) in enumerate(connector_layout_configs.items(), start=1):
          context += f"- Connector {index} ({connector_id}) Schema: {json.dumps(connector['config'], indent=2)}\n\n"
      prompt = prompt_template.format(context=context, common_labels=common_labels)
      
      response_text = self.llm.predict(prompt)
      print("config response_______________________________", response_text)
      
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
          config_json_str = response_text.split("```json")[1].split("```")[0].strip()
          common_config = json.loads(config_json_str, object_hook=bool_hook)
      except (IndexError, json.JSONDecodeError) as e:
          print(f"Error parsing JSON: {e}")
          return None
      print("common config ********************************", common_config)
      return {"common_config": common_config}
