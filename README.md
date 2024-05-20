  # Climate Tech List Scraper

This project is a web scraper built with Puppeteer and AWS SDK to extract job listings from the Climate Tech List website, fetch detailed job information, and store the data in DynamoDB. It aims to provide an efficient and structured solution for scraping job listings and company details.

## Setup

Follow these steps to set up and run the file locally:

### Prerequisites

- Node.js (version 12 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/BrijeshPatra/Job-listing-Scraper

2. Navigate to the project directory:
   ```sh   
   cd JOB LISTING SCRAPER

3. Install dependencies:
   ```sh
   npm install

4. Enviornment Setup
Before running the index.js, ensure you have the following environment setup:

AWS Credentials: Configure your AWS credentials either by using AWS CLI or by setting environment variables (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION).

5. Running the index file

   node index.js

6. Additional Notes
   
   The scraper is designed to be lightweight and suitable for deployment on AWS Lambda.
Ensure proper AWS IAM permissions are set up for accessing DynamoDB.

Customize the DynamoDB table name and primary key as per your requirements.

