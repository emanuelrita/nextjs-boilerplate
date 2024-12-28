import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'your-fallback-32-char-encryption-key';
const IV_LENGTH = 16;

function ensureKeyLength(key: string): Buffer {
  return crypto.createHash('sha256').update(String(key)).digest();
}
export function encrypt(text: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const key = ensureKeyLength(ENCRYPTION_KEY);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

export function decrypt(text: string): string {
  try {
    // URL-decode the text first
    const decodedText = decodeURIComponent(text);        
    const textParts = decodedText.split(':');        
    if (textParts.length !== 2) {    
      throw new Error('Invalid encrypted text format');
    }    
    const iv = Buffer.from(textParts[0], 'hex');        
    const encryptedText = Buffer.from(textParts[1], 'hex');        
    const key = ensureKeyLength(ENCRYPTION_KEY);      
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);    
    return decrypted.toString();
  } catch (error) {    
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    throw new Error('Failed to decrypt the text');
  }
}
