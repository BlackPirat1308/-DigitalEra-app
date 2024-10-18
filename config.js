module.exports = {
  companyName: 'NextGen FinTech',
  programName: 'SaaS Dev Blackintosh',
  websiteName: 'DigitalEra',
  apiUrl: process.env.API_URL || 'http://localhost:3000',
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost/digitalera',
  postgresUri: process.env.POSTGRES_URI || 'postgresql://user:password@localhost:5432/digitalera',
  coinPaymentsKey: process.env.COINPAYMENTS_KEY,
  coinPaymentsSecret: process.env.COINPAYMENTS_SECRET,
};