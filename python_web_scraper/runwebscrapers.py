from scraphtlifestyle import ScrapHTLifestyle
from scraphtmumbai import ScrapHTMumbai
from scraphttech import ScrapHTTech
from scrapmintcompanies import ScrapMintCompanies
from scrapmint import LiveMintScraper
from scrapmoneycontrolfinance import ScrapMoneyControlFinance

def main():
    scrapers = [
        ScrapHTLifestyle(),
        ScrapHTMumbai(),
        ScrapHTTech(),
        ScrapMoneyControlFinance()
    ]
    
    for scraper in scrapers:
        try:
            print(f"Starting {scraper.__class__.__name__}...")
            scraper.run()
            print(f"{scraper.__class__.__name__} completed successfully.")
        except Exception as e:
            print(f"Error running {scraper.__class__.__name__}: {str(e)}")
            # Optionally log error details to a file
            with open("error_log.txt", "a") as f:
                f.write(f"Error running {scraper.__class__.__name__}: {str(e)}\n")
            continue

if __name__ == "__main__":
    main()
