const csv = require('csv-parser');
const fs = require('fs');
const results = [];

const csvWriter = createCsvWriter({
  path: 'new_data.csv',
  header: [
      {id: 'category', title: 'Category'},
      {id: 'sales', title: 'Sales'}
  ]
});

fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    const filtered_results = results.filter(result => result.Sales > 500);
    const mapped_results = results.map(result => result.Sales);


  });


// const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// const filtered_results = results.filter(result => result.Sales > 500);

const csvWriter = createCsvWriter({
    path: 'new_data.csv',
    header: [
        {id: 'category', title: 'Category'},
        {id: 'sales', title: 'Sales'}
    ]
});

// const records = [];
// records.push(filtered_results);
// console.log(results);

// csvWriter.writeRecords(records)
//     .then(() => {
//         console.log('...Done');
//     });

