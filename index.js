const csv = require('csv-parser');
const fs = require('fs');
const results = [];
var total = 0;

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: 'new_data.csv',
  header: [
      {id: 'Category', title: 'Category'},
      {id: 'Sales', title: 'Sales'},
      {id: 'Share', title: 'Share'}
  ]
});

const csvWriter2 = createCsvWriter({
  path: 'new_data_filtered.csv',
  header: [
      {id: 'Category', title: 'Category'},
      {id: 'Sales', title: 'Sales'},
      {id: 'Share', title: 'Share'}
  ]
});

fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    const totalSales = results.reduce((total, value) => total + parseInt(value.Sales),0);
    const salesShare = results.map(result => ((parseInt(result.Sales)/totalSales)*100));
    for(let i = 0; i < results.length; i++) {
      results[i]['Share'] = salesShare[i].toFixed(2)+"%";
    }
    console.log(results);

    csvWriter.writeRecords(results)
    .then(() => {
        console.log('...Done');
    });

    csvWriter2.writeRecords(results)
    .then(() => {
        console.log('...Done');
    });

  });