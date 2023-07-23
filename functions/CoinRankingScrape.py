import requests
from bs4 import BeautifulSoup

# Initialize a list to store all pairs
all_pairs = []

# Loop through all pages
for i in range(1, 27):  # As there are 26 pages

    # Make a GET request to each page
    url = f'https://coinranking.com/exchange/-zdvbieRdZ+binance/markets?page={i}'
    r = requests.get(url)

    # Check status code for response received
    if r.status_code != 200:
        print(f"Request failed with status code {r.status_code}")
    else:
        # Parsing the HTML
        soup = BeautifulSoup(r.content, 'html.parser')
        s = soup.find('tbody', class_='table__body')
        content = s.find_all('span', class_='profile__name')

        # Extract the text inside the a tag, remove '/' and any extra spaces
        pairs = [a.text.replace('/', '').strip() for span in content for a in span.find_all('a')]
        
        # Append pairs to the all_pairs list
        all_pairs.extend(pairs)

# Print all pairs
print(all_pairs)
print(len(all_pairs))

