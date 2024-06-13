const fs = import('fs');
import csvParser from 'csv-parser';
import sequelize from './config/database.js';
import PostalCodes from "./models/postal_code_models.js"

// Path to the CSV file
const csvFilePath = 'backend/data_layer/data/victoria_postal_codes.csv';

async function populatePostalCodes() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Read the CSV file and insert data into the PostalCodes table
    const results = [];

    fs.createReadStream(csvFilePath)
      .pipe(csvParser())
      .on('data', (row) => {
        results.push(row);
      })
      .on('end', async () => {
        try {
          // Bulk insert the data into the PostalCodes table
          await PostalCodes.bulkCreate(results, { validate: true });
          console.log('Data has been successfully inserted.');
        } catch (err) {
          console.error('Error inserting data:', err);
        } finally {
          await sequelize.close();
        }
      });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Execute the function if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  populatePostalCodes();
}

// Export the function for testing purposes
export default populatePostalCodes;