const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Comic = require('../models/comic.model');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function seedCsv() {
  await connectDB();

  const filePath = path.join(__dirname, '../data/comic_digital.csv');
  if (!fs.existsSync(filePath)) {
    throw new Error('CSV file not found at api/data/comic_digital.csv');
  }

  const rows = [];

  await new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        rows.push({
          csvId: Number(row.id),
          serie: String(row.serie || '').trim(),
          number: String(row.number || '').trim(),
          title: String(row.title || '').trim(),
        });
      })
      .on('end', resolve)
      .on('error', reject);
  });

  await Comic.deleteMany({});
  await Comic.insertMany(rows, { ordered: false });

  console.log(`Imported ${rows.length} comics from CSV`);
  process.exit(0);
}

seedCsv().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
