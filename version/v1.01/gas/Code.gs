/**
 * iPAS AIAP Learning OS x CM
 * Google Apps Script sample.
 *
 * Suggested Sheet tabs:
 * - modules
 * - questions
 * - news
 * - reviewLog
 */

const SHEET_NAMES = {
  modules: 'modules',
  questions: 'questions',
  news: 'news',
  reviewLog: 'reviewLog',
};

function doGet() {
  const payload = {
    schemaVersion: '1.0',
    updatedAt: new Date().toISOString(),
    modules: readSheetAsObjects_(SHEET_NAMES.modules),
    questions: readSheetAsObjects_(SHEET_NAMES.questions),
    news: readSheetAsObjects_(SHEET_NAMES.news),
    reviewLog: readSheetAsObjects_(SHEET_NAMES.reviewLog),
  };

  return json_(payload);
}

function doPost(e) {
  const body = JSON.parse(e.postData.contents || '{}');

  if (!body.schemaVersion) {
    return json_({
      ok: false,
      message: 'Missing schemaVersion.',
    });
  }

  writeObjectsToSheet_(SHEET_NAMES.modules, body.modules || []);
  writeObjectsToSheet_(SHEET_NAMES.questions, body.questions || []);
  writeObjectsToSheet_(SHEET_NAMES.news, body.news || []);
  writeObjectsToSheet_(SHEET_NAMES.reviewLog, body.reviewLog || []);

  return json_({
    ok: true,
    updatedAt: new Date().toISOString(),
    counts: {
      modules: (body.modules || []).length,
      questions: (body.questions || []).length,
      news: (body.news || []).length,
      reviewLog: (body.reviewLog || []).length,
    },
  });
}

function readSheetAsObjects_(sheetName) {
  const sheet = getOrCreateSheet_(sheetName);
  const values = sheet.getDataRange().getValues();

  if (values.length < 2) {
    return [];
  }

  const headers = values[0];
  return values.slice(1).filter(row => row.some(Boolean)).map(row => {
    return headers.reduce((record, header, index) => {
      record[header] = parseCell_(row[index]);
      return record;
    }, {});
  });
}

function writeObjectsToSheet_(sheetName, records) {
  const sheet = getOrCreateSheet_(sheetName);
  sheet.clearContents();

  if (!records.length) {
    return;
  }

  const headers = Array.from(records.reduce((set, record) => {
    Object.keys(record).forEach(key => set.add(key));
    return set;
  }, new Set()));

  const values = [
    headers,
    ...records.map(record => headers.map(header => serializeCell_(record[header]))),
  ];

  sheet.getRange(1, 1, values.length, headers.length).setValues(values);
}

function getOrCreateSheet_(sheetName) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  return spreadsheet.getSheetByName(sheetName) || spreadsheet.insertSheet(sheetName);
}

function parseCell_(value) {
  if (typeof value !== 'string') {
    return value;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return '';
  }

  if ((trimmed.startsWith('[') && trimmed.endsWith(']')) ||
      (trimmed.startsWith('{') && trimmed.endsWith('}'))) {
    try {
      return JSON.parse(trimmed);
    } catch (error) {
      return value;
    }
  }

  return value;
}

function serializeCell_(value) {
  if (Array.isArray(value) || (value && typeof value === 'object')) {
    return JSON.stringify(value);
  }

  return value === undefined ? '' : value;
}

function json_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
