// ============================================================================
// Google Apps Script - doPost Form Handler
// ============================================================================
// 1. Go to Google Sheets, create a new spreadsheet.
// 2. Ensure you have a tab named "FormResponses".
// 3. Make sure your columns exactly match this order:
//    timestamp, formType, fullName, phone, location, farmingType, needs, offers, 
//    experienceLevel, availability, budgetRange, timeline, priceTerms, notes, additionalInfo
// 4. Go to Extensions > Apps Script
// 5. Paste this entire code into the Code.gs file.
// 6. Click "Deploy" > "New deployment"
// 7. Choose "Web app", run as "Me", and access "Anyone"
// 8. Click "Deploy" and copy the "Web app URL" (it ends in /exec)
// 9. Paste that URL into src/app/utils/googleSheets.ts

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('FormResponses');
    if (!sheet) {
      throw new Error("Sheet 'FormResponses' not found");
    }

    // Helper function to handle arrays, missing values, and normalize inputs securely
    function safeValue(val) {
      if (val === undefined || val === null) return '';
      if (Array.isArray(val)) return val.join(', ');
      return String(val).trim();
    }

    var row = [
      new Date().toISOString(),                 // timestamp
      safeValue(e.parameter.formType),          // formType
      safeValue(e.parameter.fullName),          // fullName
      safeValue(e.parameter.phone),             // phone
      safeValue(e.parameter.location),          // location
      safeValue(e.parameter.farmingType),       // farmingType
      safeValue(e.parameter.needs),             // needs
      safeValue(e.parameter.offers),            // offers
      safeValue(e.parameter.experienceLevel),   // experienceLevel
      safeValue(e.parameter.availability),      // availability
      safeValue(e.parameter.budgetRange),       // budgetRange
      safeValue(e.parameter.timeline),          // timeline
      safeValue(e.parameter.priceTerms),        // priceTerms
      safeValue(e.parameter.notes),             // notes
      safeValue(e.parameter.additionalInfo)     // additionalInfo
    ];

    // Always append a new row automatically
    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
