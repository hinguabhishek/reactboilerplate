from typing import TypedDict, List, Annotated
import operator


class ResearchState(TypedDict):
    task: dict
    prompt: str
    role: str
    connectors:List[str]
    connectorIds: List[str]
    connector_layout_configs: dict
    common_config: dict
    common_layout: dict
    payload: dict
    output_schema: dict
    user_info: dict
    intermediate_user_guide: str
    personalized_guide: str
    overview: str
    descriptions: str
    guide: str
