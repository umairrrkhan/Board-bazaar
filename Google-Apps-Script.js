// Google Apps Script for handling contact form submissions
// This script should be deployed as a web app in Google Sheets
// Project ID: 1rNg4LwHClFXTStcmO02tAEjFEMyPAXGssW-Whx5zJOYFirDAcF0tj6_H

// Set up the spreadsheet
const SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/12tq_TOtAgPH0wm5KHSDsMP1e1bcwVwfyboR8faa0hsA/edit?'; // Google Sheet ID: 12tq_TOtAgPH0wm5KHSDsMP1e1bcwVwfyboR8faa0hsA
const SHEET_NAME = 'Form Submissions'; // Name of the sheet where data will be stored
const EMAIL_RECEIVER = 'faisal.khan868@gmail.com'; // Email address to receive notifications

// Function to handle GET requests
function doGet(e) {
  return HtmlService.createHtmlOutput('Contact Form API is running');
}

// Function to handle POST requests
function doPost(e) {
  try {
    // Parse the form data
    const params = JSON.parse(e.postData.contents);
    
    // Get the spreadsheet and sheet
    const sheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL).getSheetByName(SHEET_NAME);
    
    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Phone', 'Company', 'Service', 'Message']);
      sheet.getRange('A1:G1').setFontWeight('bold');
    }
    
    // Add the form data to the sheet
    const timestamp = new Date();
    sheet.appendRow([
      timestamp,
      params.name,
      params.email,
      params.phone,
      params.company,
      params.service,
      params.message
    ]);
    
    // Send email notification
    sendEmailNotification(params, timestamp);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Form submitted successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Log the error
    Logger.log(error);
    
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: 'An error occurred while submitting the form'
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Function to send email notification
function sendEmailNotification(formData, timestamp) {
  const subject = 'New Contact Form Submission from Board Bazaar';
  const body = `
    You have received a new contact form submission from Board Bazaar website.
    
    Submission Details:
    - Name: ${formData.name}
    - Email: ${formData.email}
    - Phone: ${formData.phone || 'Not provided'}
    - Company: ${formData.company || 'Not provided'}
    - Service: ${formData.service}
    - Message: ${formData.message}
    - Submitted on: ${timestamp.toLocaleString()}
    
    Please respond to the customer as soon as possible.
  `;
  
  MailApp.sendEmail({
    to: EMAIL_RECEIVER,
    subject: subject,
    body: body
  });
}

// Function to set up the spreadsheet
function setup() {
  // Create a sheet if it doesn't exist
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }
  
  // Add headers if sheet is empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'Name', 'Email', 'Phone', 'Company', 'Service', 'Message']);
    sheet.getRange('A1:G1').setFontWeight('bold');
  }
  
  // Set the sheet URL
  const sheetUrl = spreadsheet.getUrl();
  Logger.log('Sheet URL: ' + sheetUrl);
  
  return sheetUrl;
}