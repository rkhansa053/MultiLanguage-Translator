import NodeCache from 'node-cache';

export class CacheService {
  private cache: NodeCache;

  constructor() {
    this.cache = new NodeCache({ 
      stdTTL: 3600, 
      checkperiod: 600 
    });
  }

  get(key: string): any {
    return this.cache.get(key);
  }

  set(key: string, value: any, ttl: number = 3600): void {
    this.cache.set(key, value, ttl);
  }

  generateKey(text: string, targetLang: string, sourceLang?: string): string {
    return `trans:${sourceLang || 'auto'}:${targetLang}:${Buffer.from(text).toString('base64')}`;
  }
}