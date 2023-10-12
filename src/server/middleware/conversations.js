const fs = require('fs');
const path = require('path');

module.exports = (req, res, next) => {
  const dbPath = path.join(__dirname, '../db.json');

  if (/conversations/.test(req.url) && req.method === 'GET') {
    const userId = req.query?.senderId;


    const data = fs.readFileSync(dbPath, 'utf8');
    const db = JSON.parse(data);

    const result = db?.conversations?.filter(
      conv => conv.senderId == userId || conv.recipientId == userId
    );


    res.status(200).json(result);

    return;
  }

  next();
};