import recommender.es_request as es_request
import recommender.mongodb_request as mongodb_request
from sentence_transformers import SentenceTransformer

THRESHOLD = 0.5

class Sent_Model:
    def __init__(self):
        # https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2
        self.model = SentenceTransformer("all-MiniLM-L6-v2")
    
    def remove_from_recommendations(self, listings_ignored, recommendations):
        ignored_titles = [item['title'] for item in listings_ignored]
        rec_titles = [item['title'] for item in recommendations]

        embeddings1 = self.model.encode(ignored_titles)
        embeddings2 = self.model.encode(rec_titles)

        similarity = self.model.similarity(embeddings1, embeddings2)

        id_to_ignore = set()
        for s in similarity:
            id_to_ignore = id_to_ignore.union(set(i for i, v in enumerate(s) if v >= THRESHOLD))

        recommendations = [i for i, v in enumerate(recommendations) if i not in id_to_ignore]

        return recommendations
