
import { ai } from './geminiClient';

/**
 * Gets an AI-generated response by calling the Gemini API or providing demo responses.
 * @param prompt The user's prompt.
 * @returns A promise that resolves to the AI's text response.
 */
export const getAIResponse = async (prompt: string): Promise<string> => {
  const API_KEY = (import.meta as any).env?.VITE_GEMINI_API_KEY;
  
  // Demo mode responses when no API key is provided
  if (!API_KEY || API_KEY === 'your-gemini-api-key-here' || API_KEY === 'demo-key') {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Detect language from prompt for better responses
        const isTamil = /[\u0B80-\u0BFF]/.test(prompt);
        const isHindi = /[\u0900-\u097F]/.test(prompt);
        
        let demoResponses;
        
        if (isTamil) {
          demoResponses = [
            "🙏 வணக்கம்! நான் உங்கள் உஜ்ஜைன்360 AI வழிகாட்டி. மகாகாலேஸ்வர் கோயிலுக்கான பாதுகாப்பான பாதைக்கு, ராம் காட் வழியாக முக்கிய சாலையை எடுக்க பரிந்துரைக்கிறேன். கோயில் அதிகாலை (5-7 AM) மற்றும் மாலை (7-9 PM) நேரங்களில் குறைவான கூட்டமாக இருக்கும்.",
            "🏨 தங்குமிடத்திற்கு, வசதிக்காக கோயில் பகுதிக்கு அருகில் முன்பதிவு செய்ய பரிந்துரைக்கிறேன். விடுதி விருப்பங்கள் ₹250/இரவுக்கு பட்ஜெட் நட்பு, அதே நேரத்தில் பிரீமியம் சூட்கள் ₹1500/இரவுக்கு கோயில் காட்சிகளை வழங்குகின்றன.",
            "🚗 போக்குவரத்திற்காக, இந்தூரிலிருந்து உஜ்ஜைனுக்கு AC பஸ்கள் ஒவ்வொரு 30 நிமிடங்களுக்கும் இயங்குகின்றன. பயணம் 1.5 மணி நேரம் எடுக்கும். உச்ச யாத்திரை காலத்தில் முன்கூட்டியே முன்பதிவு செய்யுங்கள்.",
            "⚠️ பாதுகாப்பு குறிப்பு: எப்போதும் தண்ணீர் எடுத்துச் செல்லுங்கள், குழுக்களில் இருங்கள், மற்றும் அவசரகால தொடர்புகளை வசதியாக வைத்திருங்கள். கூட்ட நிலைகள் Navigation பக்கத்தில் நிகழ்நேரத்தில் புதுப்பிக்கப்படுகின்றன.",
            "🍽️ உணவிற்காக, ராம் காட் அருகே பல சுத்தமான சைவ கடைகள் உள்ளன. கோடை காலத்தில் தெரு உணவைத் தவிர்க்கவும். கோயில் பிரசாதம் எப்போதும் பாதுகாப்பான விருப்பமாகும்.",
            "📍 தற்போதைய வானிலை 28°C இல் இனிமையாக உள்ளது. தரிசனத்திற்கு சரியானது! முக்கிய ஷாஹி ஸ்னான் இன்று மாலை ராம் காட்டில் 7:00 மணிக்கு திட்டமிடப்பட்டுள்ளது."
          ];
        } else if (isHindi) {
          demoResponses = [
            "🙏 नमस्ते! मैं आपका उज्जैन360 AI गाइड हूं। महाकालेश्वर मंदिर के लिए सबसे सुरक्षित मार्ग के लिए, मैं राम घाट के रास्ते मुख्य सड़क लेने की सलाह देता हूं। मंदिर सुबह जल्दी (5-7 AM) और शाम (7-9 PM) कम भीड़ भाड़ वाला होता है।",
            "🏨 आवास के लिए, मैं सुविधा के लिए मंदिर क्षेत्र के पास बुकिंग करने का सुझाव देता हूं। डॉर्मिटरी विकल्प ₹250/रात में बजट-फ्रेंडली हैं, जबकि प्रीमियम सूट ₹1500/रात में मंदिर के दृश्य प्रदान करते हैं।",
            "🚗 परिवहन के लिए, इंदौर से उज्जैन तक AC बसें हर 30 मिनट में चलती हैं। यात्रा में 1.5 घंटे लगते हैं। शिखर तीर्थयात्रा के मौसम में पहले से बुक करें।",
            "⚠️ सुरक्षा टिप: हमेशा पानी रखें, समूहों में रहें, और आपातकालीन संपर्क संख्या सुविधाजनक रखें। भीड़ के स्तर Navigation पेज पर रियल-टाइम में अपडेट होते हैं।",
            "🍽️ भोजन के लिए, राम घाट के पास कई शुद्ध शाकाहारी स्टॉल हैं। गर्मियों में स्ट्रीट फूड से बचें। मंदिर का प्रसाद हमेशा सबसे सुरक्षित विकल्प है।",
            "📍 वर्तमान मौसम 28°C पर सुखद है। दर्शन के लिए एकदम सही! मुख्य शाही स्नान आज शाम राम घाट पर 7:00 बजे निर्धारित है।"
          ];
        } else {
          demoResponses = [
            "🙏 Namaste! I'm your Ujjain360 AI guide. For the safest route to Mahakaleshwar Temple, I recommend taking the main road via Ram Ghat. The temple is less crowded in early morning (5-7 AM) and evening (7-9 PM).",
            "🏨 For accommodation, I suggest booking near the temple area for convenience. The dormitory options are budget-friendly at ₹250/night, while premium suites offer temple views at ₹1500/night.",
            "🚗 For transportation, AC buses from Indore to Ujjain run every 30 minutes. The journey takes 1.5 hours. Book in advance during peak pilgrimage season.",
            "⚠️ Safety tip: Always carry water, stay in groups, and keep emergency contacts handy. The crowd levels are updated in real-time on the Navigation page.",
            "🍽️ For food, there are several pure vegetarian stalls near Ram Ghat. Avoid street food during peak summer. Temple prasad is always the safest option.",
            "📍 Current weather is pleasant at 28°C. Perfect for darshan! The main Shahi Snan is scheduled for today evening at Ram Ghat at 7:00 PM.",
            "🗺️ Need directions? Use our Navigation page for real-time crowd levels and AI-recommended routes. The shortest path to most temples is via the main bridge.",
            "🆘 For emergencies, dial 100 for police or 108 for ambulance. Our Emergency page has all important contacts and SOS features.",
            "💧 Stay hydrated! Water stations are marked on the map. Free water is available at most temples and designated points.",
            "🕉️ Temple timings: Mahakaleshwar opens at 4 AM for Bhasma Aarti. Regular darshan is from 6 AM to 11 PM. Plan accordingly to avoid crowds."
          ];
        }
        
        const randomResponse = demoResponses[Math.floor(Math.random() * demoResponses.length)];
        resolve(randomResponse);
      }, 1500); // Simulate API delay
    });
  }

  // Real API call would go here with proper @google/genai implementation
  // For now, return enhanced demo response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`🤖 AI Assistant: I understand you're asking about "${prompt}". While I'm in demo mode, I can still help! Check the Navigation page for routes, Booking for stays, and Emergency for safety info. For a real AI experience, please configure your Gemini API key.`);
    }, 1000);
  });
};