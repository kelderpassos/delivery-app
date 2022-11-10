const jwt = require('../../auth/JWT');

const adminToken = jwt.create({ id: 1, email: 'admin@email.com', role: 'administrator' });
const normalToken = jwt.create({ id: 1, email: 'customer@email.com', role: 'customer' });
const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJlbWFpbCI6ImN1c3RvbWVyQGVtYWlsLmNvbSIsInJvbGUiOiJjdXN0b21lciJ9LCJpYXQiOjE2NjgwMjYxMjEsImV4cCI6MTY2ODExMjUyMX0.FH6LcE-KOgKxArxAsnQg28PZDH_yWe-XlBrc6izLipj'

module.exports = { adminToken, normalToken, invalidToken };