# Google Sheets Integration Setup Guide

This guide will help you set up the Google Sheets integration for the Board Bazaar contact form. When completed, all form submissions will be automatically saved to a Google Sheet and an email notification will be sent to faisal.khan868@gmail.com.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet.
2. Rename the first sheet to "Form Submissions".
3. Add the following headers in the first row (A1 to G1):
   - A1: Timestamp
   - B1: Name
   - C1: Email
   - D1: Phone
   - E1: Company
   - F1: Service
   - G1: Message
4. Make the headers bold for better readability.
5. Copy the URL of your Google Sheet (you'll need it in the next step).

## Step 2: Set up Google Apps Script

1. In your Google Sheet, go to **Extensions** > **Apps Script**.
2. Delete any existing code in the script editor.
3. Copy the entire content from the `Google-Apps-Script.js` file in your project.
4. Paste the code into the script editor.
5. In the script, replace `YOUR_GOOGLE_SHEET_URL` with the URL you copied in Step 1.
6. Save the script by clicking the floppy disk icon or pressing Ctrl+S.

## Step 3: Deploy the Google Apps Script as a Web App

1. In the Apps Script editor, click on **Deploy** > **New deployment**.
2. Click on the gear icon next to "Select type" and choose **Web app**.
3. Configure the web app with these settings:
   - Description: "Contact Form Handler for Board Bazaar"
   - Execute as: "Me" (your Google account)
   - Who has access: "Anyone"
4. Click **Deploy**.
5. You may need to authorize the script. Click **Authorize access** and follow the prompts.
6. After deployment, copy the Web app URL. It should look something like:
   `https://script.google.com/macros/s/ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789/exec`

## Step 4: Update the Contact Form Handler

1. Open the `js/contact-form-handler.js` file in your project.
2. Replace the current `GOOGLE_SCRIPT_URL` with the Web app URL you copied in Step 3.
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';
   ```
3. Save the file.

## Step 5: Test the Integration

1. Open `contact.html` in your browser.
2. Fill out the contact form with test data.
3. Click the "Send Message" button.
4. If everything is set up correctly:
   - You should see a success message on the website.
   - A new row should appear in your Google Sheet with the form data.
   - An email notification should be sent to faisal.khan868@gmail.com.

## Troubleshooting

### Form submission fails

1. Check that the Web app URL in `contact-form-handler.js` is correct.
2. Make sure the Google Apps Script has been deployed as a Web app.
3. Verify that the Google Sheet URL in the Apps Script is correct.
4. Check browser console for any error messages.

### Email not received

1. Check that the `EMAIL_RECEIVER` in the Apps Script is set to `faisal.khan868@gmail.com`.
2. Check the spam folder in your email.
3. Make sure the script has permission to send emails (this happens during authorization).

### Data not appearing in Google Sheet

1. Verify the sheet name in the Apps Script matches your sheet name ("Form Submissions").
2. Make sure the headers in the sheet match what's expected in the script.
3. Check the Apps Script logs for any errors (go to Apps Script editor > Executions).

## Security Considerations

1. The current setup allows anyone to submit data to your Google Sheet. If you need to restrict access, consider:
   - Adding a CAPTCHA to the form.
   - Implementing server-side validation.
   - Using authentication for the Web app.

2. Don't share your Web app URL publicly beyond your website.

## Additional Features You Can Add

1. **Auto-reply emails**: Modify the Apps Script to send an automatic reply to the person who submitted the form.
2. **Data validation**: Add validation rules to ensure data quality in your Google Sheet.
3. **Dashboard**: Create a dashboard in Google Sheets to visualize the form submission data.
4. **Backup**: Set up automatic backups of your Google Sheet data.

If you encounter any issues during the setup process, please check the browser console and the Apps Script logs for detailed error messages.