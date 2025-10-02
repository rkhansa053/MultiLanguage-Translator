export class BasicTranslator {
  private supportedLanguages = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'ja', 'ko', 'zh'];
  private mockTranslations: { [key: string]: { [key: string]: string } } = {};

  constructor() {
    console.log('🔄 BasicTranslator initialized');
    this.initializeTranslations();
  }

  private initializeTranslations(): void {
    // Common phrases to translate for all languages
    const commonPhrases = [
      'hello', 'thank you', 'good morning', 'goodbye', 'please', 'sorry',
      'yes', 'no', 'how are you', 'what is your name', 'i love you',
      'where is the bathroom', 'help', 'water', 'food', 'money'
    ];

    // Translations for each language
    const translations: { [key: string]: { [key: string]: string } } = {
      'es': { // Spanish
        'hello': 'hola',
        'thank you': 'gracias', 
        'good morning': 'buenos días',
        'goodbye': 'adiós',
        'please': 'por favor',
        'sorry': 'lo siento',
        'yes': 'sí',
        'no': 'no',
        'how are you': 'cómo estás',
        'what is your name': 'cómo te llamas',
        'i love you': 'te quiero',
        'where is the bathroom': 'dónde está el baño',
        'help': 'ayuda',
        'water': 'agua',
        'food': 'comida',
        'money': 'dinero'
      },
      'fr': { // French
        'hello': 'bonjour',
        'thank you': 'merci',
        'good morning': 'bonjour',
        'goodbye': 'au revoir',
        'please': 's\'il vous plaît',
        'sorry': 'désolé',
        'yes': 'oui',
        'no': 'non',
        'how are you': 'comment allez-vous',
        'what is your name': 'comment vous appelez-vous',
        'i love you': 'je t\'aime',
        'where is the bathroom': 'où sont les toilettes',
        'help': 'aide',
        'water': 'eau',
        'food': 'nourriture',
        'money': 'argent'
      },
      'de': { // German
        'hello': 'hallo',
        'thank you': 'danke',
        'good morning': 'guten morgen',
        'goodbye': 'auf wiedersehen',
        'please': 'bitte',
        'sorry': 'entschuldigung',
        'yes': 'ja',
        'no': 'nein',
        'how are you': 'wie geht es dir',
        'what is your name': 'wie heißt du',
        'i love you': 'ich liebe dich',
        'where is the bathroom': 'wo ist die toilette',
        'help': 'hilfe',
        'water': 'wasser',
        'food': 'essen',
        'money': 'geld'
      },
      'it': { // Italian
        'hello': 'ciao',
        'thank you': 'grazie',
        'good morning': 'buongiorno',
        'goodbye': 'arrivederci',
        'please': 'per favore',
        'sorry': 'scusa',
        'yes': 'sì',
        'no': 'no',
        'how are you': 'come stai',
        'what is your name': 'come ti chiami',
        'i love you': 'ti amo',
        'where is the bathroom': 'dov\'è il bagno',
        'help': 'aiuto',
        'water': 'acqua',
        'food': 'cibo',
        'money': 'soldi'
      },
      'pt': { // Portuguese
        'hello': 'olá',
        'thank you': 'obrigado',
        'good morning': 'bom dia',
        'goodbye': 'adeus',
        'please': 'por favor',
        'sorry': 'desculpe',
        'yes': 'sim',
        'no': 'não',
        'how are you': 'como você está',
        'what is your name': 'qual é o seu nome',
        'i love you': 'eu te amo',
        'where is the bathroom': 'onde fica o banheiro',
        'help': 'ajuda',
        'water': 'água',
        'food': 'comida',
        'money': 'dinheiro'
      },
      'ru': { // Russian
        'hello': 'здравствуйте',
        'thank you': 'спасибо',
        'good morning': 'доброе утро',
        'goodbye': 'до свидания',
        'please': 'пожалуйста',
        'sorry': 'извините',
        'yes': 'да',
        'no': 'нет',
        'how are you': 'как дела',
        'what is your name': 'как вас зовут',
        'i love you': 'я тебя люблю',
        'where is the bathroom': 'где туалет',
        'help': 'помощь',
        'water': 'вода',
        'food': 'еда',
        'money': 'деньги'
      },
      'ja': { // Japanese
        'hello': 'こんにちは',
        'thank you': 'ありがとう',
        'good morning': 'おはよう',
        'goodbye': 'さようなら',
        'please': 'お願いします',
        'sorry': 'ごめんなさい',
        'yes': 'はい',
        'no': 'いいえ',
        'how are you': 'お元気ですか',
        'what is your name': 'お名前は何ですか',
        'i love you': '愛しています',
        'where is the bathroom': 'トイレはどこですか',
        'help': '助けて',
        'water': '水',
        'food': '食べ物',
        'money': 'お金'
      },
      'ko': { // Korean
        'hello': '안녕하세요',
        'thank you': '감사합니다',
        'good morning': '좋은 아침',
        'goodbye': '안녕히 가세요',
        'please': '제발',
        'sorry': '미안합니다',
        'yes': '네',
        'no': '아니요',
        'how are you': '어떻게 지내세요',
        'what is your name': '이름이 뭐예요',
        'i love you': '사랑해요',
        'where is the bathroom': '화장실이 어디예요',
        'help': '도와주세요',
        'water': '물',
        'food': '음식',
        'money': '돈'
      },
      'zh': { // Chinese
        'hello': '你好',
        'thank you': '谢谢',
        'good morning': '早上好',
        'goodbye': '再见',
        'please': '请',
        'sorry': '对不起',
        'yes': '是',
        'no': '不',
        'how are you': '你好吗',
        'what is your name': '你叫什么名字',
        'i love you': '我爱你',
        'where is the bathroom': '洗手间在哪里',
        'help': '帮助',
        'water': '水',
        'food': '食物',
        'money': '钱'
      }
    };

    // Add all translations to the mockTranslations
    for (const phrase of commonPhrases) {
      for (const [lang, langTranslations] of Object.entries(translations)) {
        if (langTranslations[phrase]) {
          this.addTranslation(phrase, lang, langTranslations[phrase]);
        }
      }
    }

    console.log(`✅ Loaded translations for ${commonPhrases.length} phrases across ${Object.keys(translations).length} languages`);
  }

  async translateText(text: string, targetLang: string, sourceLang?: string) {
    try {
      // Clean the text: remove extra whitespace and newlines
      const cleanedText = text.trim().replace(/\s+/g, ' ');
      console.log(`🔍 Translating: "${cleanedText}" to ${targetLang}`);
      
      // Validate target language
      if (!this.supportedLanguages.includes(targetLang)) {
        throw new Error(`Unsupported target language: ${targetLang}`);
      }

      // Check if we have a mock translation (use cleaned text)
      const lowerText = cleanedText.toLowerCase();
      let translatedText: string;
      let confidence: number;

      if (this.mockTranslations[lowerText] && this.mockTranslations[lowerText][targetLang]) {
        translatedText = this.mockTranslations[lowerText][targetLang];
        confidence = 0.9;
        console.log(`🎯 Found exact translation: ${translatedText}`);
      } else {
        // Try to find partial matches for common phrases
        const partialMatch = this.findPartialMatch(cleanedText, targetLang);
        if (partialMatch) {
          translatedText = partialMatch;
          confidence = 0.8;
          console.log(`🔍 Found partial match: ${translatedText}`);
        } else {
          translatedText = `[${targetLang}] ${cleanedText}`;
          confidence = 0.7;
          console.log(`🔤 Using fallback translation: ${translatedText}`);
        }
      }

      // Return the complete translation result
      const translationResult = {
        originalText: cleanedText,
        translatedText: translatedText,
        sourceLanguage: sourceLang || 'auto',
        targetLanguage: targetLang,
        confidence: confidence,
        provider: 'basic-translator'
      };

      console.log('📤 Returning translation result:', translationResult);
      return translationResult;

    } catch (error: any) {
      console.error('❌ Translation error in BasicTranslator:', error);
      throw new Error(`Translation failed: ${error.message}`);
    }
  }

  // Helper method to find partial matches
  private findPartialMatch(text: string, targetLang: string): string | null {
    const lowerText = text.toLowerCase();
    
    // Check if any of our known phrases are contained in the input text
    for (const [sourceText, translations] of Object.entries(this.mockTranslations)) {
      if (lowerText.includes(sourceText) && translations[targetLang]) {
        return translations[targetLang];
      }
    }
    
    return null;
  }

  addTranslation(sourceText: string, targetLang: string, translatedText: string) {
    const lowerText = sourceText.toLowerCase();
    if (!this.mockTranslations[lowerText]) {
      this.mockTranslations[lowerText] = {};
    }
    this.mockTranslations[lowerText][targetLang] = translatedText;
  }

  async getSupportedLanguages(): Promise<string[]> {
    return this.supportedLanguages;
  }
}