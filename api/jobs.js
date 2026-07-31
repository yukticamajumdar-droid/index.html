export default async function handler(req, res) {
  const { query = 'Frontend Developer', location = 'India' } = req.query;
  const RAPID_API_KEY = '00ae96b3fcmsh1ace60b56968ab8p13700ejsn95d1c5900a99';

  try {
    const response = await fetch(`https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(query + ' in ' + location)}&page=1&num_pages=1`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': RAPID_API_KEY,
        'x-rapidapi-host': 'jsearch.p.rapidapi.com'
      }
    });

    const data = await response.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
}
