import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = 'https://api.p.2chat.io/open/whatsapp';

// Rate limiting helper
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const checkNumber = async (sourceNumber, phoneNumber, attempt = 1) => {
  try {
    const cleanSource = sourceNumber.replace(/\D/g, '');
    const cleanPhone = phoneNumber.replace(/\D/g, '');

    const config = {
      method: 'GET',
      url: `${BASE_URL}/check-number/${cleanSource}/${cleanPhone}`,
      headers: { 
        'X-User-API-Key': API_KEY,
        'User-Agent': 'WhatsApp-Verifier-Web-App'
      }
    };

    // Implement rate limiting (5 seconds between requests)
    if (attempt > 1) {
      await sleep(5000);
    }

    const response = await axios(config);
    
    return {
      success: true,
      data: {
        phoneNumber: cleanPhone,
        onWhatsApp: response.data.on_whatsapp,
        numberInfo: response.data.number,
        whatsappInfo: response.data.whatsapp_info
      }
    };
  } catch (error) {
    // Retry once if it's a network error
    if (attempt < 2 && !error.response) {
      return checkNumber(sourceNumber, phoneNumber, attempt + 1);
    }

    return {
      success: false,
      error: error.response?.data?.message || error.message,
      data: { phoneNumber }
    };
  }
};

export const checkBulkNumbers = async (sourceNumber, numbers, progressCallback) => {
  const results = [];
  
  for (let i = 0; i < numbers.length; i++) {
    try {
      const result = await checkNumber(sourceNumber, numbers[i]);
      results.push(result);
      
      if (progressCallback) {
        progressCallback(((i + 1) / numbers.length) * 100);
      }
      
      // Rate limiting between requests
      if (i < numbers.length - 1) {
        await sleep(5000);
      }
    } catch (error) {
      results.push({
        success: false,
        error: error.message,
        data: { phoneNumber: numbers[i] }
      });
    }
  }
  
  return results;
};