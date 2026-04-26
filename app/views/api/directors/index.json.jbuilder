json.array! @directors do |director|
  json.id director.id
  json.name director.name
  json.slug director.slug
  json.country director.country
  json.birthYear director.birth_year
  json.deathYear director.death_year
  json.portraitUrl director.portrait_url
  json.filmCount @film_counts[director.name] || 0
end
