const puppeteer=require('puppeteer');
const AWS=require('aws-sdk')

//AWS dynamoDB
AWS.config.update({region: 'us-west-2'})
const dynamoDB=new AWS.DynamoDB.DocumentClient();

const TABLE_NAME='ClimateTechList'

(async()=>{
    const browser=puppeteer.launch();
    const page=(await browser).newPage();

    (await page).goto('https://www.climatetechlist.com/jobs',{waitUntil: 'networkidle2'})

    const jobListings=(await page).evaluate(()=>{
        const jobs=[]
        const jobElements=document.querySelector('.job-listing')

        jobElements.forEach(job=>{
            const jobTitle=document.querySelector('.job-title').innerText;

            const name=document.querySelector('.company-name').innerText;

            const location=document.querySelector('.job-location').innerText;

            const URL=document.querySelector('.job-title a').href;

            jobs.push({jobTitle,name,location,URL})
        })
        return jobs;
    })
    await browser.close()
    console.log("Job listings");
    console.log(jobListings);

    
    const extractDetails=async(jobURL)=>{
        const jobPage=(await browser).newPage();
        (await jobPage).goto(jobURL,{waitUntil: 'networkidle2'})

        const jobDetails=(await jobPage).evaluate(()=>{
            const description=document.querySelector('.job-description').innerText

            const companyWebsite=document.querySelector('.company-website a')?.href || ' '

            const companyLogoUrl=document.querySelector('.company-logo img')?.src || ' '

            const companyDescription=document.querySelector('.company-description')?.innerText || ' '

            const companyFunding=document.querySelector('.company-funding')?.innerText || ' '

            return {
                description,
                companyWebsite,
                companyLogoUrl,
                companyDescription,
                companyFunding
            }
        })
        (await jobPage).close()
        return jobDetails;
    }

    for(const job of jobListings){
        const details =await extractDetails(job.URL)

        job.description=details.description
        job.companyWebsite=details.companyWebsite
        job.companyFunding=details.companyFunding
        job.companyLogoUrl=details.companyLogoUrl
        job.companyDescription=details.companyDescription

        const params={
            TableName: TABLE_NAME,
            Item: job
        }

        try {
            await dynamoDB.put(params).promise()
            console.log(`Successfylly stored job ${job.jobTitle}`);

        } catch (error) {
            console.error(`Error storing job ${job.jobTitle}`,error)
        }
    }
    (await browser).close()
})();

