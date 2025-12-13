/**
 * Google Apps Script Backend for Lucky Draw App
 * File: Code.gs
 */

// Spreadsheet ID - Thay đổi ID này thành ID của Google Sheet của bạn
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
const EMPLOYEES_SHEET = 'Employees'; // Tên sheet chứa danh sách nhân viên
const WINNERS_SHEET = 'Winners';     // Tên sheet chứa danh sách trúng thưởng

/**
 * Serve HTML file
 */
function doGet() {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/**
 * Include HTML files
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Get employee list from Google Sheet
 */
function getEmployeeList() {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(EMPLOYEES_SHEET);
    
    if (!sheet) {
      return {
        success: false,
        error: `Sheet "${EMPLOYEES_SHEET}" không tồn tại!`
      };
    }
    
    const data = sheet.getDataRange().getValues();
    
    if (data.length <= 1) {
      return {
        success: false,
        error: 'Không có dữ liệu nhân viên!'
      };
    }
    
    // Skip header row
    const employees = [];
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      if (row[0] && row[1]) { // STT và Tên không được trống
        employees.push({
          stt: row[0] || i,
          msnv: row[1] || '',
          name: row[2] || '',
          department: row[3] || ''
        });
      }
    }
    
    return {
      success: true,
      data: employees,
      count: employees.length
    };
    
  } catch (error) {
    return {
      success: false,
      error: 'Lỗi khi đọc dữ liệu: ' + error.message
    };
  }
}

/**
 * Upload employees data from Excel to Google Sheet
 */
function uploadEmployees(employeesData) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(EMPLOYEES_SHEET);
    
    // Create sheet if not exists
    if (!sheet) {
      sheet = spreadsheet.insertSheet(EMPLOYEES_SHEET);
    }
    
    // Clear existing data
    sheet.clear();
    
    // Add header
    const headers = ['STT', 'MSNV', 'Họ và Tên', 'Phòng ban'];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Format header
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground('#4CAF50');
    headerRange.setFontColor('white');
    headerRange.setFontWeight('bold');
    headerRange.setHorizontalAlignment('center');
    
    // Add data
    if (employeesData && employeesData.length > 0) {
      const dataArray = employeesData.map(emp => [
        emp.stt,
        emp.msnv,
        emp.name,
        emp.department
      ]);
      
      sheet.getRange(2, 1, dataArray.length, headers.length).setValues(dataArray);
    }
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, headers.length);
    
    return {
      success: true,
      added: employeesData.length,
      deleted: 0,
      total: employeesData.length
    };
    
  } catch (error) {
    return {
      success: false,
      error: 'Lỗi khi upload: ' + error.message
    };
  }
}

/**
 * Get winners list
 */
function getWinners() {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(WINNERS_SHEET);
    
    if (!sheet) {
      return {
        success: true,
        data: []
      };
    }
    
    const data = sheet.getDataRange().getValues();
    
    if (data.length <= 1) {
      return {
        success: true,
        data: []
      };
    }
    
    const winners = [];
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      if (row[0]) {
        winners.push({
          stt: row[0],
          msnv: row[1] || '',
          name: row[2] || '',
          department: row[3] || '',
          timestamp: row[4] || new Date()
        });
      }
    }
    
    return {
      success: true,
      data: winners
    };
    
  } catch (error) {
    return {
      success: false,
      error: 'Lỗi khi đọc danh sách trúng thưởng: ' + error.message
    };
  }
}

/**
 * Save winners list
 */
function saveWinners(winners) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(WINNERS_SHEET);
    
    // Create sheet if not exists
    if (!sheet) {
      sheet = spreadsheet.insertSheet(WINNERS_SHEET);
    }
    
    // Clear existing data
    sheet.clear();
    
    // Add header
    const headers = ['STT', 'MSNV', 'Họ và Tên', 'Phòng ban', 'Thời gian trúng'];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Format header
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground('#FF6B6B');
    headerRange.setFontColor('white');
    headerRange.setFontWeight('bold');
    headerRange.setHorizontalAlignment('center');
    
    // Add winners data
    if (winners && winners.length > 0) {
      const dataArray = winners.map(winner => [
        winner.stt,
        winner.msnv,
        winner.name,
        winner.department,
        new Date()
      ]);
      
      sheet.getRange(2, 1, dataArray.length, headers.length).setValues(dataArray);
    }
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, headers.length);
    
    return {
      success: true,
      count: winners.length
    };
    
  } catch (error) {
    return {
      success: false,
      error: 'Lỗi khi lưu danh sách trúng thưởng: ' + error.message
    };
  }
}

/**
 * Reset winners list
 */
function resetWinners() {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(WINNERS_SHEET);
    
    if (sheet) {
      // Clear all data
      sheet.clear();
      
      // Add header back
      const headers = ['STT', 'MSNV', 'Họ và Tên', 'Phòng ban', 'Thời gian trúng'];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Format header
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#FF6B6B');
      headerRange.setFontColor('white');
      headerRange.setFontWeight('bold');
      headerRange.setHorizontalAlignment('center');
    }
    
    return {
      success: true
    };
    
  } catch (error) {
    return {
      success: false,
      error: 'Lỗi khi reset: ' + error.message
    };
  }
}

/**
 * Test function
 */
function test() {
  console.log('Apps Script backend is working!');
  return { success: true, message: 'Backend OK!' };
}