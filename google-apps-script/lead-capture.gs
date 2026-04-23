function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Leads');
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Leads');
    sheet.appendRow(['Submitted At', 'Name', 'Phone', 'Language', 'Source', 'Page']);
  }

  var payload = JSON.parse(e.postData.contents || '{}');

  sheet.appendRow([
    payload.submittedAt || new Date().toISOString(),
    payload.name || '',
    payload.phone || '',
    payload.lang || '',
    payload.source || '',
    payload.page || '',
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
