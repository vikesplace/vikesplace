from pgsync import plugin


class GeometryPlugin(plugin.Plugin):
    """Example plugin demonstrating GeoPoint and GeoShape."""

    name: str = "Geometry"

    def transform(self, doc: dict, **kwargs) -> dict:
        """Demonstrates how to modify a doc."""
        doc_index: str = kwargs["_index"]

        if doc_index == "listings":
            if doc and doc.get("lat_long"):
                if doc["lat_long"]["type"] == "Point":
                    lat = doc["lat_long"]["coordinates"][0]
                    long = doc["lat_long"]["coordinates"][1]
                    doc["lat_long"] = [long, lat]
        
        return doc
