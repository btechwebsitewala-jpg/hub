const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxa3VrQpiSr7SGjLKeXkQFFacEzh8TrP6a-omrCJFHEZGSkj0CPpNck8GX7VluvwTc32w/exec";

export const syncToGoogleSheets = async (type: 'booking' | 'inquiry', data: any) => {
  try {
    // We use a no-cors mode for Google Apps Script to avoid CORS issues, 
    // though this means we won't get a proper JSON response back.
    // However, the data will still be sent.
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type, // To distinguish between booking and inquiry in the script
        ...data
      }),
    });
    return true;
  } catch (error) {
    console.error("Error syncing to Google Sheets:", error);
    return false;
  }
};
