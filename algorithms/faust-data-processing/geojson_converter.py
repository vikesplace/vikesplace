import faust

app = faust.App('geojson-converter', broker='kafka://kafka:9092')

class Listing(faust.Record):
    listing_id: int
    location: str

class ListingTransformed(faust.Record):
    listing_id: int
    location_geojson: str

@app.agent('postgres-listings-Listings')
async def process(stream):
    async for event in stream:
        location_geojson = convert_to_geojson(event.location)
        transformed_event = ListingTransformed(listing_id=event.listing_id, location_geojson=location_geojson)
        await app.send('transformed-listings', value=transformed_event)

def convert_to_geojson(location):
    # Extract longitude and latitude from the POINT format
    coords = location.strip('POINT()').split()
    longitude = float(coords[0])
    latitude = float(coords[1])
    return f'{{"type": "Point", "coordinates": [{longitude}, {latitude}]}}'

if __name__ == '__main__':
    app.main()
