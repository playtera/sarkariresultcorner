import * as cheerio from 'cheerio';

export function getSimplifiedHtml(fullHtml) {
  if (!fullHtml) return '';
  const $ = cheerio.load(fullHtml);
  const containerSelectors = ['tr', 'li', 'p'];
  const fragments = [];
  const processedContainers = new Set();
  
  $('a').each((i, a) => {
    const $a = $(a);
    const href = ($a.attr('href') || '').toLowerCase();
    const text = $a.text().toLowerCase();
    const className = ($a.attr('class') || '').toLowerCase();

    const isSpam = 
      href.includes('whatsapp') || href.includes('telegram') || href.includes('t.me') ||
      href.includes('play.google') || href.includes('sarkariresult.com.cm') || 
      href === '#' || href === '' || text.includes('contact') || text.includes('disclaimer') ||
      text.includes('privacy policy') || text.includes('skip to content') ||
      className.includes('screen-reader-text') || className.includes('social-button');

    if (isSpam) return;

    let bestContainer = null;
    for (const selector of containerSelectors) {
      const found = $a.closest(selector);
      if (found.length > 0) {
        bestContainer = found;
        if (selector === 'tr' || selector === 'li') break;
      }
    }
    const elementToCapture = bestContainer || $a;
    const htmlSnippet = $.html(elementToCapture);
    if (!processedContainers.has(htmlSnippet)) {
      fragments.push(htmlSnippet);
      processedContainers.add(htmlSnippet);
    }
  });
  return fragments.join('\n\n');
}

export async function sendNotification(message, customChatId = null) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = customChatId || process.env.TELEGRAM_CHAT_ID;
  
  if (token && chatId) {
    try {
      const url = `https://api.telegram.org/bot${token}/sendMessage`;
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          chat_id: chatId, 
          text: message, 
          parse_mode: 'HTML', 
          disable_web_page_preview: false 
        })
      });
    } catch (err) {
      console.error(`[Telegram Error] Notification failed:`, err.message);
    }
  }
}
