import requests
import os
from dotenv import load_dotenv

class APIClient:
    def __init__(self):
        load_dotenv()
        self.base_url = os.getenv('API_BASE_URL')
        self.token = os.getenv('API_BEARER_TOKEN')

    def _get_headers(self):
        return {
            'Authorization': f'Bearer {self.token}',
            'Content-Type': 'application/json'
        }

    def get_data(self, endpoint: str):
        url = f"{self.base_url}/{endpoint}"
        response = requests.get(url, headers=self._get_headers())
        response.raise_for_status()
        return response.json()


# Create an instance of APIClient
api_client = APIClient()
