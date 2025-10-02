import express from 'express';
import cors from 'cors';
import { BasicTranslator } from './services/BasicTranslator';

const app = express();
const PORT = process.env.PORT || 3000;
const translator = new BasicTranslator();

translator.addTranslation('hello', 'es', 'hola');
translator.addTranslation('thank you', 'es', 'gracias');
translator.addTranslation('good morning', 'es', 'buenos días');
translator.addTranslation('goodbye', 'es', 'adiós');
translator.addTranslation('please', 'es', 'por favor');
translator.addTranslation('sorry', 'es', 'lo siento');

translator.addTranslation('hello', 'fr', 'bonjour');
translator.addTranslation('thank you', 'fr', 'merci');
translator.addTranslation('good morning', 'fr', 'bonjour');

translator.addTranslation('hello', 'de', 'hallo');
translator.addTranslation('thank you', 'de', 'danke');
translator.addTranslation('good morning', 'de', 'guten morgen');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Translation API is running',
    timestamp: new Date().toISOString()
  });
});

// Single translation endpoint
app.post('/translate', async (req, res) => {
  try {

    console.log('📨 Received translation request:', req.body);
    const { text, targetLang, sourceLang } = req.body;
    
    if (!text || !targetLang) {
      console.log('❌ Missing required fields');
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: text and targetLang are required'
      });
    }

    console.log('🔧 Calling translator with:', { text, targetLang, sourceLang })

    const result = await translator.translateText(text, targetLang, sourceLang);
    
    console.log('✅ Translator returned:', result);

    res.json({
      success: true,
      data: result
    });
  } catch (error: any) {
    console.error('Translation error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Translation service unavailable'
    });
  }
});

// Batch translation endpoint
app.post('/translate/batch', async (req, res) => {
  try {
    const { texts, targetLang, sourceLang } = req.body;
    
    if (!texts || !Array.isArray(texts) || !targetLang) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: texts (array) and targetLang are required'
      });
    }

    if (texts.length > 10) {
      return res.status(400).json({
        success: false,
        error: 'Too many texts in batch. Maximum 10 texts allowed.'
      });
    }

    const translations = await Promise.all(
      texts.map(text => translator.translateText(text, targetLang, sourceLang))
    );

    res.json({
      success: true,
      data: translations
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Batch translation failed'
    });
  }
});

// Language detection endpoint
app.post('/detect', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: text'
      });
    }

    // Simple language detection based on common words
    const detectedLanguage = detectLanguage(text);
    
    res.json({
      success: true,
      data: {
        text: text,
        detectedLanguage: detectedLanguage.language,
        confidence: detectedLanguage.confidence,
        isReliable: detectedLanguage.confidence > 0.7
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Language detection failed'
    });
  }
});

app.get('/languages', async (req, res) => {
  try {
    const languages = await translator.getSupportedLanguages();
    res.json({
      success: true,
      data: languages
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch supported languages'
    });
  }
});

function detectLanguage(text: string): { language: string; confidence: number } {
  const lowerText = text.toLowerCase();
  
  const languagePatterns = {
    'es': ['hola', 'gracias', 'por favor', 'adiós', 'buenos', 'días', 'noches'],
    'fr': ['bonjour', 'merci', 's\'il vous plaît', 'au revoir', 'oui', 'non'],
    'de': ['hallo', 'danke', 'bitte', 'auf wiedersehen', 'ja', 'nein'],
    'en': ['hello', 'thank you', 'please', 'goodbye', 'yes', 'no', 'the', 'and']
  };

  let bestMatch = { language: 'en', confidence: 0.1 }; // Default to English with low confidence
  
  for (const [lang, patterns] of Object.entries(languagePatterns)) {
    const matches = patterns.filter(pattern => lowerText.includes(pattern));
    const confidence = matches.length / patterns.length;
    
    if (confidence > bestMatch.confidence) {
      bestMatch = { language: lang, confidence };
    }
  }

  return bestMatch;
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Advanced Translation API running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🌐 Languages: http://localhost:${PORT}/languages`);
  console.log(`🔄 Batch translate: POST http://localhost:3000/translate/batch`);
  console.log(`🔍 Detect language: POST http://localhost:3000/detect`);
  console.log(`✨ Single translate: POST http://localhost:3000/translate`);
});