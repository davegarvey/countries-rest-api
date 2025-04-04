const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4100;

// Middleware
app.use(cors());
app.use(express.json());

// Load country data
let countries = [];
try {
  const dataPath = path.join(__dirname, 'data', 'countries.json');
  const data = fs.readFileSync(dataPath, 'utf8');
  countries = JSON.parse(data);
} catch (error) {
  console.error('Error loading country data:', error);
}

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Countries API is running!' });
});

// Get all countries
app.get('/all', (req, res) => {
  res.json(countries);
});

// Get country by cca2 code
app.get('/cca2/:code', (req, res) => {
  const code = req.params.code.toUpperCase();
  const country = countries.find(c => c.cca2 === code);
  
  if (!country) {
    return res.status(404).json({ message: `Country with code ${code} not found` });
  }
  
  res.json(country);
});

// Get countries by name
app.get('/name/:name', (req, res) => {
  const name = req.params.name.toLowerCase();
  const matchedCountries = countries.filter(country => 
    country.name.common.toLowerCase().includes(name) || 
    (country.altSpellings && country.altSpellings.some(alt => alt.toLowerCase().includes(name)))
  );
  
  if (matchedCountries.length === 0) {
    return res.status(404).json({ message: `No countries found matching "${req.params.name}"` });
  }
  
  res.json(matchedCountries);
});

// Get countries by region
app.get('/region/:region', (req, res) => {
  const region = req.params.region.toLowerCase();
  const matchedCountries = countries.filter(country => 
    country.region && country.region.toLowerCase() === region
  );

  if (matchedCountries.length === 0) {
    return res.status(404).json({ message: `No countries found in region "${req.params.region}"` });
  }

  res.json(matchedCountries);
});

// Get countries by subregion
app.get('/subregion/:subregion', (req, res) => {
  const subregion = req.params.subregion.toLowerCase();
  const matchedCountries = countries.filter(country => 
    country.subregion && country.subregion.toLowerCase() === subregion
  );

  if (matchedCountries.length === 0) {
    return res.status(404).json({ message: `No countries found in subregion "${req.params.subregion}"` });
  }

  res.json(matchedCountries);
});

// Get countries by population range
app.get('/population/:min/:max', (req, res) => {
  const min = parseInt(req.params.min, 10);
  const max = parseInt(req.params.max, 10);

  if (isNaN(min) || isNaN(max)) {
    return res.status(400).json({ message: 'Invalid population range' });
  }

  const matchedCountries = countries.filter(country => 
    country.population >= min && country.population <= max
  );

  if (matchedCountries.length === 0) {
    return res.status(404).json({ message: `No countries found with population between ${min} and ${max}` });
  }

  res.json(matchedCountries);
});

// Get countries by language
app.get('/language/:language', (req, res) => {
  const language = req.params.language.toLowerCase();
  const matchedCountries = countries.filter(country => 
    country.languages && Object.values(country.languages).some(lang => lang.toLowerCase() === language)
  );

  if (matchedCountries.length === 0) {
    return res.status(404).json({ message: `No countries found with language "${req.params.language}"` });
  }

  res.json(matchedCountries);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});