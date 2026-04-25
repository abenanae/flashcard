function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('cards');
  if (!sheet) {
    return output_({ error: 'Sheet named cards was not found.' }, e);
  }

  const values = sheet.getDataRange().getValues();
  if (values.length === 0) {
    return output_({ cards: [] }, e);
  }

  const headers = values.shift().map(String);
  const cards = values
    .filter(row => row.some(cell => String(cell).trim() !== ''))
    .map(row => {
      const obj = {};
      headers.forEach((key, i) => obj[key] = row[i] || '');
      return obj;
    });

  return output_({ cards: cards }, e);
}

function output_(payload, e) {
  const json = JSON.stringify(payload);
  const callback = e && e.parameter && e.parameter.callback;

  if (callback) {
    return ContentService
      .createTextOutput(callback + '(' + json + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return ContentService
    .createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}
