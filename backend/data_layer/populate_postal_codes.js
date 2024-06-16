import 'dotenv/config'
import fs from 'fs';
import sequelize from './config/database.js';
import PostalCodes from "./models/postal_code_models.js";

const csvFilePath = './data/postal_codes.csv';

async function populatePostalCodes() {
  const results = [];

  try {
    await sequelize.authenticate(); 
    console.log('Connection to database has been established successfully.');

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  try {
    // read the CSV file
    const contents = await fs.promises.readFile(csvFilePath, 'utf8');
    const lines = contents.split('\n');

    for (const line of lines) {
      //skip the first line
      if (line.startsWith('POSTAL_CODE')) {
        continue;
      }

      const [postalCode, city, province, timezone, latitude, longitude] = line.split(',');
      if (postalCode && latitude && longitude) {
        results.push({ postalCode, latitude, longitude });
      }
    }

    await PostalCodes.bulkCreate(results, {returning: true});
    console.log('Data inserted successfully');

  } catch (error) {
    console.error('Unable to insert the table data:', error);
  }
}
    
// execute the function if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  populatePostalCodes();
}

export default populatePostalCodes;