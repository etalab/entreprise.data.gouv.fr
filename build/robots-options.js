const productionOptions = {
  sitemap: 'http://entreprise.data.gouv.fr/api/sirene/sitemap.xml.gz'
}

const sandboxOptions = {
  userAgents: [{
    name: '*',
    disallow: ['/']
  }]
}

module.exports = process.argv[2] == 'production' ? productionOptions : sandboxOptions
