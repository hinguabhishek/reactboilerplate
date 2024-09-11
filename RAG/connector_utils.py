from api_client import api_client


def get_version_id(connector_id):
    endpoint = f'applications/{connector_id}/versions'
    response = api_client.get_data(endpoint)
    return response[0]['id']

def get_layout_schema(connector_id, version_id):
    endpoint = f'applications/{connector_id}/versions/{version_id}/schemas/avatax/layouts/avaportal?layout=true'
    return api_client.get_data(endpoint)

def get_config_schema(connector_id, version_id):
    endpoint = f'applications/{connector_id}/versions/{version_id}/schemas/avatax?schema=true'
    return api_client.get_data(endpoint)

def get_connector_schemas(connector_id):
    version_id = get_version_id(connector_id)
    print('version_id', version_id)
    layout_schema = get_layout_schema(connector_id, version_id)
    print('layout_schema', layout_schema)
    config_schema = get_config_schema(connector_id, version_id)
    print('config_schema', config_schema)

    return {'config': config_schema, 'layout': layout_schema}
  
