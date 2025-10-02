const { translate } = require('google-translate-api-x');

export class GoogleTranslationService {
  async translateText(text: string, targetLang: string, sourceLang?: string) {
    try {
      console.log(`Translating: "${text}" from ${sourceLang || 'auto'} to ${targetLang}`);
      
      const result = await translate(text, {
        to: targetLang,
        from: sourceLang || 'auto'
      });
      
      return {
        originalText: text,
        translatedText: result.text,
        sourceLanguage: result.from.language.iso,
        targetLanguage: targetLang,
        confidence: 0.9,
        provider: 'google'
      };
    } catch (error: any) {
      console.error('Google Translate error:', error);
      throw new Error(`Translation failed: ${error.message}`);
    }
  }

  async getSupportedLanguages(): Promise<string[]> {
    return [
      'en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'ja', 'ko', 'zh', 'zh-CN', 'zh-TW',
      'ar', 'hi', 'bn', 'pa', 'te', 'mr', 'ta', 'ur', 'gu', 'kn', 'ml', 'or',
      'nl', 'pl', 'tr', 'vi', 'th', 'sv', 'da', 'fi', 'no', 'cs', 'hu', 'el'
    ];
  }
}