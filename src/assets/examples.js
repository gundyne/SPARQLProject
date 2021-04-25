const examples = [
  {
    id: 0,
    name: 'example0',
    query: `#Cats,
SELECT ?item ?itemLabel
WHERE
{
  ?item wdt:P31 wd:Q146 .
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en" . }
}`,
  },
  {
    id: 1,
    name: 'example1',
    query: `#Goats
SELECT ?item ?itemLabel
WHERE
{
  ?item wdt:P31 wd:Q2934 .
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en" . }
}`,
  },
  {
    id: 2,
    name: 'example2',
    query: `SELECT ?countryLabel ?peacePrize ?literaturePrize ?chemistryPrize ?physicsPrize ?physmedPrize
WHERE
{
  {
    SELECT ?countryLabel (COUNT(*) AS ?peacePrize)
    WHERE
    {
      wd:Q35637 wdt:P1346 ?winner .
      ?winner wdt:P27 ?country .
      SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
    }
    GROUP BY(?countryLabel)
  }
  OPTIONAL
  {
    SELECT ?countryLabel (COUNT(*) AS ?literaturePrize)
    WHERE
    {
      wd:Q37922 wdt:P1346 ?winner .
      ?winner wdt:P27 ?country .
      SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
    }
    GROUP BY(?countryLabel)
  }
  OPTIONAL
  {
    SELECT ?countryLabel (COUNT(*) AS ?chemistryPrize)
    WHERE
    {
      ?winner wdt:P31 wd:Q5; wdt:P166 wd:Q44585 .
      ?winner wdt:P27 ?country .
      SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
    }
    GROUP BY(?countryLabel)
  }
  OPTIONAL
  {
    SELECT ?countryLabel (COUNT(*) AS ?physicsPrize)
    WHERE
    {
      wd:Q38104 wdt:P1346 ?winner .
      ?winner wdt:P27 ?country .
      SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
    }
    GROUP BY(?countryLabel)
  }
  OPTIONAL
  {
    SELECT ?countryLabel (COUNT(*) AS ?physmedPrize)
    WHERE
    {
      ?winner wdt:P31 wd:Q5; wdt:P166 wd:Q80061 .
      ?winner wdt:P27 ?country .
      SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
    }
    GROUP BY(?countryLabel)
  }
}
ORDER BY DESC(?peacePrize) DESC(?literaturePrize) DESC(?chemistryPrize) DESC(?physicsPrize) DESC(?physmedPrize)`,
  },
];

export default examples;
