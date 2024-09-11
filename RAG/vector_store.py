import os
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.vectorstores import FAISS
from langchain_openai import AzureOpenAIEmbeddings

# Document embeddings and indexing
def create_vector_store():
    vector_store_path = "db/vectorstore.faiss"
    embeddings = AzureOpenAIEmbeddings(
        azure_deployment="text3-large", openai_api_version="2023-05-15"
    )

    # Check if local vector store already exists
    if os.path.exists(vector_store_path):
        # Load existing vector store
        vector_store = FAISS.load_local(
            vector_store_path, embeddings=embeddings, allow_dangerous_deserialization=True
        )
        print("Loaded existing vector store from", vector_store_path)

    else:
        # Load PDFs
        pdf_dir = "data"
        documents = []
        for filename in os.listdir(pdf_dir):
            if filename.endswith(".pdf"):
                loader = PyPDFLoader(os.path.join(pdf_dir, filename))
                documents.extend(loader.load())
        vector_store = FAISS.from_documents(documents, embeddings)
        vector_store.save_local(vector_store_path)

    return vector_store
