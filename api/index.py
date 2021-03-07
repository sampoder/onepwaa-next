from faker import Faker
from geopy.geocoders import Nominatim
geolocator = Nominatim(user_agent="my-applicfdxbhation")
import numpy as np
from http.server import BaseHTTPRequestHandler
from urllib import parse

def geolocate(city=None, country=None):
    '''
    Inputs city and country, or just country. Returns the lat/long coordinates of 
    either the city if possible, if not, then returns lat/long of the center of the country.
    '''
    
    # If the city exists,
    if city != None:
        # Try
        try:
            # To geolocate the city and country
            loc = geolocator.geocode(str(city + ',' + country))
            # And return latitude and longitude
            return (loc.latitude, loc.longitude)
        # Otherwise
        except:
            # Return missing value
            return np.nan
    # If the city doesn't exist
    else:
        # Try
        try:
            # Geolocate the center of the country
            loc = geolocator.geocode(country)
            # And return latitude and longitude 
            return (loc.latitude, loc.longitude)
        # Otherwise
        except:
            # Return missing value
            return np.nan

fake = Faker()
Faker.seed(0)

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        s = self.path
        dic = dict(parse.parse_qsl(parse.urlsplit(s).query))
        self.send_response(200)
        self.send_header('Content-type','text/plain')
        self.end_headers()
        locations = []
        for _ in range(5):
          if fake.local_latlng('SG') is None:
            locations.append(list(geolocate(country='SG')))
          else:
            locations.append(list(fake.local_latlng('SG')))
        self.wfile.write(locations.encode())
        return
