interface Employer {
  name?: string;
}

interface WorkplaceAddress {
  municipality?: string;
}

interface Job {
  headline: string;
  publication_date: string;
  employer: Employer;
  workplace_address: WorkplaceAddress;
}

interface JobSearchResponse {
  hits: Job[];
  total?: number;
}

const searchJobs = async (profession: string, city: string): Promise<void> => {
  try {
    const keyword = `${profession} ${city}`.trim();

    const url = `https://jobsearch.api.jobtechdev.se/search?q=${keyword}&offset=0&limit=10`;

    console.log(`\nSearching jobs for: ${keyword}`);

    const response = await fetch(url);

    // Error handling for API failure
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data: JobSearchResponse = await response.json();

    // Improved logging
    console.dir(data, { depth: 2 });

    if (!data.hits || data.hits.length === 0) {
      console.log("No jobs found.");
      return;
    }

    console.log(`\nFound ${data.hits.length} jobs`);
    console.log("-".repeat(50));

    data.hits.forEach((job: Job, index: number) => {
      const pubDate = new Date(job.publication_date);

      console.log(`${index + 1}. ${job.headline}`);
      console.log(`Company: ${job.employer?.name ?? "Unknown"}`);
      console.log(
        `Location: ${job.workplace_address?.municipality ?? "Not provided"}`,
      );

      // Using toString()
      console.log(`Publication ISO: ${pubDate.toISOString().split("T")[0]}`);
      console.log(`Publication toString(): ${pubDate.toString()}`);

      console.log("-".repeat(50));
    });
  } catch (error) {
    console.error("\n Something went wrong while searching jobs");
    console.dir(error, { depth: null });
  }
};

const runApp = async (): Promise<void> => {
  try {
    console.log("Welcome to the Job Search App!");
    console.log(
      "This app searches jobs using JobTech API from Arbetsförmedlingen\n",
    );

    await searchJobs("Software Developer", "Malmö");
  } catch (error) {
    console.error("App failed to start");
    console.dir(error);
  }
};

runApp();
