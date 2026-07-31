<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Job Aggregator Portal</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
    body { background-color: #f4f6f8; color: #333; padding: 20px; }
    .container { max-width: 800px; margin: 0 auto; }
    header { text-align: center; margin-bottom: 30px; }
    header h1 { font-size: 28px; color: #1e293b; margin-bottom: 8px; }
    header p { color: #64748b; font-size: 15px; }
    
    .search-box { display: flex; gap: 10px; background: #fff; padding: 15px; border-radius: 10px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); margin-bottom: 25px; flex-wrap: wrap; }
    .search-box input { flex: 1; min-width: 200px; padding: 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px; outline: none; }
    .search-box button { padding: 12px 24px; background-color: #2563eb; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; transition: background 0.2s; }
    .search-box button:hover { background-color: #1d4ed8; }

    .job-card { background: white; padding: 20px; border-radius: 8px; margin-bottom: 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); display: flex; justify-content: space-between; align-items: center; border-left: 4px solid #2563eb; }
    .job-info h3 { font-size: 18px; color: #0f172a; margin-bottom: 5px; }
    .job-company { font-weight: 600; color: #475569; margin-bottom: 8px; font-size: 14px; }
    .job-badge { display: inline-block; background-color: #e0e7ff; color: #3730a3; font-size: 12px; font-weight: bold; padding: 3px 8px; border-radius: 12px; margin-left: 8px; }
    .job-desc { color: #64748b; font-size: 13px; max-width: 550px; line-height: 1.4; }

    .apply-btn { padding: 10px 18px; background-color: #10b981; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px; white-space: nowrap; transition: background 0.2s; }
    .apply-btn:hover { background-color: #059669; }

    .status-msg { text-align: center; color: #64748b; margin-top: 20px; font-size: 16px; }
  </style>
</head>
<body>

  <div class="container">
    <header>
      <h1>Job Finder Hub</h1>
      <p>Search job listings across LinkedIn, Indeed, Naukri & more in one place.</p>
    </header>

    <div class="search-box">
      <input type="text" id="jobQuery" placeholder="Job title or skill (e.g., Software Engineer)" value="Frontend Developer">
      <input type="text" id="jobLocation" placeholder="Location (e.g., India)" value="India">
      <button onclick="searchJobs()">Search Jobs</button>
    </div>

    <div id="jobResults">
      <p class="status-msg">Enter job details and click Search to find listings.</p>
    </div>
  </div>

  <script>
    const RAPID_API_KEY = '00ae96b3fcmsh1ace60b56968ab8p13700ejsn95d1c5900a99';

    async function searchJobs() {
      const query = document.getElementById('jobQuery').value;
      const location = document.getElementById('jobLocation').value;
      const resultsContainer = document.getElementById('jobResults');

      resultsContainer.innerHTML = '<p class="status-msg">Searching jobs across platforms...</p>';

      try {
        const response = await fetch(`https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(query + ' in ' + location)}&page=1&num_pages=1`, {
          method: 'GET',
          headers: {
            'x-rapidapi-key': RAPID_API_KEY,
            'x-rapidapi-host': 'jsearch.p.rapidapi.com'
          }
        });

        const data = await response.json();

        if (data.data && data.data.length > 0) {
          resultsContainer.innerHTML = data.data.map(job => `
            <div class="job-card">
              <div class="job-info">
                <h3>
                  ${job.job_title} 
                  <span class="job-badge">${job.job_publisher || 'Web'}</span>
                </h3>
                <div class="job-company">${job.employer_name} — ${job.job_city || ''} ${job.job_country || ''}</div>
                <div class="job-desc">${job.job_description ? job.job_description.substring(0, 180) + '...' : 'No description provided.'}</div>
              </div>
              <a href="${job.job_apply_link}" target="_blank" rel="noopener noreferrer" class="apply-btn">Apply Now ↗</a>
            </div>
          `).join('');
        } else {
          resultsContainer.innerHTML = '<p class="status-msg">No jobs found. Try adjusting your search query.</p>';
        }
      } catch (err) {
        console.error(err);
        resultsContainer.innerHTML = '<p class="status-msg" style="color:red;">Failed to fetch jobs. Please check your network or try again.</p>';
      }
    }
  </script>
</body>
</html>
