from sentence_transformers import SentenceTransformer
import numpy as np

class Sent_Model:
    def __init__(self):
        # https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2
        self.model = SentenceTransformer("all-MiniLM-L6-v2")
        self.THRESHOLD = 0.5
    
    def remove_from_recommendations(self, listings_ignored, recommendations):
        ignored_titles = [item['title'] for item in listings_ignored]
        rec_titles = [item['title'] for item in recommendations]

        embeddings1 = self.model.encode(ignored_titles)
        embeddings2 = self.model.encode(rec_titles)

        similarity = self.model.similarity(embeddings1, embeddings2)

        id_to_ignore = set()
        for s in similarity:
            id_to_ignore = id_to_ignore.union(set(i for i, v in enumerate(s) if v >= self.THRESHOLD))

        recommendations = [i for i, v in enumerate(recommendations) if i not in id_to_ignore]

        return recommendations
    
    def remove_from_recommendations_sorted(self, listings_ignored, recommendations):
        ignored_titles = [item['title'] for item in listings_ignored]
        rec_titles = [item['title'] for item in recommendations]

        if len(ignored_titles) == 0:
            ignored_titles = ["laptop", "iphone", "shirt"]
            #return recommendations 
        
        # print("ignored_titles: ", ignored_titles, "  length: ",len(ignored_titles))
        # print("rec_titles: ", rec_titles, " length:  ",len(rec_titles))

        embeddings1 = self.model.encode(ignored_titles)
        embeddings2 = self.model.encode(rec_titles)

        similarity = self.model.similarity(embeddings1, embeddings2)

        df = similarity.numpy()

        column_sums_df = np.sum(df, axis=0)

        indexed_column_sums = list(enumerate(column_sums_df))
        indexed_column_sums.sort(key=lambda x: x[1])

        # Extract the sorted sums and their original indices
        sorted_indices = [index for index, _ in indexed_column_sums]

        recommendations_filtered = [recommendations[i] for i in sorted_indices [:min(15,len(recommendations))]]

        return recommendations_filtered

# model = Sent_Model()

# ignored = [{'title':"laptop"}, {'title': "dish"}]
# #recomendations = [{'buyer_username': None, 'title': "National Lampoon's Griswold Family Christmas Vacation Fair isle Lounge Pants", 'listing_id': 5730, 'listed_at': '2024-07-20T00:00:00.000Z', 'category': 'APPAREL', 'type': 'listings', 'status': 'AVAILABLE', 'seller_id': 3093, 'for_charity': False, 'last_updated_at': '2024-07-20T00:00:00.000Z', 'lat_long': {'lon': -123.332687, 'lat': 48.423759}, 'price': 25.95, 'location': 'V8S1X6'}, {'buyer_username': None, 'title': 'MissBellyDance Harem Pants & Halter Top Belly Dancer Costume Set | Sadiqa II - CS12', 'listing_id': 1841, 'listed_at': '2024-07-20T00:00:00.000Z', 'category': 'APPAREL', 'type': 'listings', 'status': 'AVAILABLE', 'seller_id': 795, 'for_charity': False, 'last_updated_at': '2024-07-20T00:00:00.000Z', 'lat_long': {'lon': -123.332687, 'lat': 48.423759}, 'price': 44.99, 'location': 'V8S1X6'}, {'buyer_username': None, 'title': 'Children Shoe Labels - Self Laminating White', 'listing_id': 1470, 'listed_at': '2024-07-20T00:00:00.000Z', 'category': 'APPAREL', 'type': 'listings', 'status': 'AVAILABLE', 'seller_id': 3860, 'for_charity': False, 'last_updated_at': '2024-07-20T00:00:00.000Z', 'lat_long': {'lon': -123.332687, 'lat': 48.423759}, 'price': 7.99, 'location': 'V8S1X6'}, {'buyer_username': None, 'title': 'Smartphone', 'listing_id': 73, 'listed_at': '2024-02-15T12:00:00.000Z', 'category': 'ELECTRONICS', 'type': 'listings', 'status': 'AVAILABLE', 'seller_id': 15, 'for_charity': False, 'last_updated_at': '2024-02-15T12:00:00.000Z', 'lat_long': {'lon': -123.393378, 'lat': 48.456178}, 'price': 400.0, 'location': 'V8N5M3'}, {'buyer_username': None, 'title': 'Dishwasher Valve W10648041 with Fitting', 'listing_id': 26499, 'listed_at': '2024-07-20T00:00:00.000Z', 'category': 'GARDEN', 'type': 'listings', 'status': 'AVAILABLE', 'seller_id': 2130, 'for_charity': False, 'last_updated_at': '2024-07-20T00:00:00.000Z', 'lat_long': {'lon': -123.332687, 'lat': 48.423759}, 'price': 33.9, 'location': 'V8S1X6'}, {'buyer_username': None, 'title': 'Water Inlet Valve for LG Kenmore Sears Washer 5221ER1003A AP5986564 PS11728995', 'listing_id': 30322, 'listed_at': '2024-07-20T00:00:00.000Z', 'category': 'KITCHENSUPPLIES', 'type': 'listings', 'status': 'AVAILABLE', 'seller_id': 1720, 'for_charity': False, 'last_updated_at': '2024-07-20T00:00:00.000Z', 'lat_long': {'lon': -123.331712, 'lat': 48.468424}, 'price': 45.99, 'location': 'V8N5M3'}, {'buyer_username': None, 'title': 'Lawn Fawn Hoppy Easter Clear Stamp & Die Set - 2 Item Bundle', 'listing_id': 33993, 'listed_at': '2024-07-20T00:00:00.000Z', 'category': 'KITCHENSUPPLIES', 'type': 'listings', 'status': 'AVAILABLE', 'seller_id': 3157, 'for_charity': False, 'last_updated_at': '2024-07-20T00:00:00.000Z', 'lat_long': {'lon': -123.332687, 'lat': 48.423759}, 'price': 13.98, 'location': 'V8S1X6'}, {'buyer_username': None, 'title': 'Locs Mirrored Lens Gangster Oversized Rectangular Horned Sunglasses Matte Black', 'listing_id': 8311, 'listed_at': '2024-07-20T00:00:00.000Z', 'category': 'APPAREL', 'type': 'listings', 'status': 'AVAILABLE', 'seller_id': 1996, 'for_charity': False, 'last_updated_at': '2024-07-20T00:00:00.000Z', 'lat_long': {'lon': -123.332687, 'lat': 48.423759}, 'price': 11.75, 'location': 'V8S1X6'}, {'buyer_username': None, 'title': 'APW Wyott 2068000 Gas On/Off Valve', 'listing_id': 19479, 'listed_at': '2024-07-20T00:00:00.000Z', 'category': 'GARDEN', 'type': 'listings', 'status': 'AVAILABLE', 'seller_id': 2503, 'for_charity': False, 'last_updated_at': '2024-07-20T00:00:00.000Z', 'lat_long': {'lon': -123.331712, 'lat': 48.468424}, 'price': 44.38, 'location': 'V8N5M3'}, {'buyer_username': None, 'title': 'BAIJAC (10 Pack) Replacement for BOBBINS Metal Pfaff Hobby 301 303 307 309 4240 4250 4260 +', 'listing_id': 41896, 'listed_at': '2024-07-20T00:00:00.000Z', 'category': 'OFFICESUPPLIES', 'type': 'listings', 'status': 'AVAILABLE', 'seller_id': 2627, 'for_charity': False, 'last_updated_at': '2024-07-20T00:00:00.000Z', 'lat_long': {'lon': -123.332687, 'lat': 48.423759}, 'price': 16.99, 'location': 'V8S1X6'}]
# recomendations = [{'buyer_username': None, 'title': "National Lampoon's Griswold Family Christmas Vacation Fair isle Lounge Pants", 'listing_id': 5730, 'listed_at': '2024-07-20T00:00:00.000Z', 'category': 'APPAREL', 'type': 'listings', 'status': 'AVAILABLE', 'seller_id': 3093, 'for_charity': False, 'last_updated_at': '2024-07-20T00:00:00.000Z', 'lat_long': {'lon': -123.332687, 'lat': 48.423759}, 'price': 25.95, 'location': 'V8S1X6'}, {'buyer_username': None, 'title': 'MissBellyDance Harem Pants & Halter Top Belly Dancer Costume Set | Sadiqa II - CS12', 'listing_id': 1841, 'listed_at': '2024-07-20T00:00:00.000Z', 'category': 'APPAREL', 'type': 'listings', 'status': 'AVAILABLE', 'seller_id': 795, 'for_charity': False, 'last_updated_at': '2024-07-20T00:00:00.000Z', 'lat_long': {'lon': -123.332687, 'lat': 48.423759}, 'price': 44.99, 'location': 'V8S1X6'}, {'buyer_username': None, 'title': 'Children Shoe Labels - Self Laminating White', 'listing_id': 1470, 'listed_at': '2024-07-20T00:00:00.000Z', 'category': 'APPAREL', 'type': 'listings', 'status': 'AVAILABLE', 'seller_id': 3860, 'for_charity': False, 'last_updated_at': '2024-07-20T00:00:00.000Z', 'lat_long': {'lon': -123.332687, 'lat': 48.423759}, 'price': 7.99, 'location': 'V8S1X6'}, {'buyer_username': None, 'title': 'Smartphone', 'listing_id': 73, 'listed_at': '2024-02-15T12:00:00.000Z', 'category': 'ELECTRONICS', 'type': 'listings', 'status': 'AVAILABLE', 'seller_id': 15, 'for_charity': False, 'last_updated_at': '2024-02-15T12:00:00.000Z', 'lat_long': {'lon': -123.393378, 'lat': 48.456178}, 'price': 400.0, 'location': 'V8N5M3'}, {'buyer_username': None, 'title': 'Dishwasher Valve W10648041 with Fitting', 'listing_id': 26499, 'listed_at': '2024-07-20T00:00:00.000Z', 'category': 'GARDEN', 'type': 'listings', 'status': 'AVAILABLE', 'seller_id': 2130, 'for_charity': False, 'last_updated_at': '2024-07-20T00:00:00.000Z', 'lat_long': {'lon': -123.332687, 'lat': 48.423759}, 'price': 33.9, 'location': 'V8S1X6'}, {'buyer_username': None, 'title': 'Water Inlet Valve for LG Kenmore Sears Washer 5221ER1003A AP5986564 PS11728995', 'listing_id': 30322, 'listed_at': '2024-07-20T00:00:00.000Z', 'category': 'KITCHENSUPPLIES', 'type': 'listings', 'status': 'AVAILABLE', 'seller_id': 1720, 'for_charity': False, 'last_updated_at': '2024-07-20T00:00:00.000Z', 'lat_long': {'lon': -123.331712, 'lat': 48.468424}, 'price': 45.99, 'location': 'V8N5M3'}, {'buyer_username': None, 'title': 'Lawn Fawn Hoppy Easter Clear Stamp & Die Set - 2 Item Bundle', 'listing_id': 33993, 'listed_at': '2024-07-20T00:00:00.000Z', 'category': 'KITCHENSUPPLIES', 'type': 'listings', 'status': 'AVAILABLE', 'seller_id': 3157, 'for_charity': False, 'last_updated_at': '2024-07-20T00:00:00.000Z', 'lat_long': {'lon': -123.332687, 'lat': 48.423759}, 'price': 13.98, 'location': 'V8S1X6'}, {'buyer_username': None, 'title': 'Locs Mirrored Lens Gangster Oversized Rectangular Horned Sunglasses Matte Black', 'listing_id': 8311, 'listed_at': '2024-07-20T00:00:00.000Z', 'category': 'APPAREL', 'type': 'listings', 'status': 'AVAILABLE', 'seller_id': 1996, 'for_charity': False, 'last_updated_at': '2024-07-20T00:00:00.000Z', 'lat_long': {'lon': -123.332687, 'lat': 48.423759}, 'price': 11.75, 'location': 'V8S1X6'}, {'buyer_username': None, 'title': 'APW Wyott 2068000 Gas On/Off Valve', 'listing_id': 19479, 'listed_at': '2024-07-20T00:00:00.000Z', 'category': 'GARDEN', 'type': 'listings', 'status': 'AVAILABLE', 'seller_id': 2503, 'for_charity': False, 'last_updated_at': '2024-07-20T00:00:00.000Z', 'lat_long': {'lon': -123.331712, 'lat': 48.468424}, 'price': 44.38, 'location': 'V8N5M3'}, {'buyer_username': None, 'title': 'BAIJAC (10 Pack) Replacement for BOBBINS Metal Pfaff Hobby 301 303 307 309 4240 4250 4260 +', 'listing_id': 41896, 'listed_at': '2024-07-20T00:00:00.000Z', 'category': 'OFFICESUPPLIES', 'type': 'listings', 'status': 'AVAILABLE', 'seller_id': 2627, 'for_charity': False, 'last_updated_at': '2024-07-20T00:00:00.000Z', 'lat_long': {'lon': -123.332687, 'lat': 48.423759}, 'price': 16.99, 'location': 'V8S1X6'}]

# res_test = model.remove_from_recommendations_sorted(ignored, recomendations)

# print(res_test)