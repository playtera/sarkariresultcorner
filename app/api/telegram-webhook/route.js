import { sendNotification } from '@/lib/scraper-utils';

export async function POST(request) {
  try {
    const body = await request.json();
    
    if (!body.message || !body.message.text) {
      return Response.json({ success: true });
    }

    const { text, chat } = body.message;
    const chatId = chat.id;
    const command = text.split(' ')[0].toLowerCase();

    // Only respond to authorized user
    if (chatId.toString() !== process.env.TELEGRAM_CHAT_ID && chatId.toString() !== process.env.TELEGRAM_CHANNEL_ID) {
      return Response.json({ success: true });
    }

    if (command === '/start') {
      await sendNotification(
        `👋 <b>Welcome!</b>\n\n` +
        `Commands:\n` +
        `📊 /status - Trigger daily summary sync`,
        chatId
      );
    } 
    else if (command === '/status' || command === '/sync') {
      const protocol = request.headers.get('x-forwarded-proto') || 'http';
      const host = request.headers.get('host');
      const baseUrl = `${protocol}://${host}`;
      
      await sendNotification(`⏳ <i>Processing sync...</i>`, chatId);
      const res = await fetch(`${baseUrl}/api/cron/daily-summary`, { cache: 'no-store' });
      const data = await res.json();
      
      if (data.success) {
        await sendNotification(`✅ Sync complete. Found ${data.updates} new items.`, chatId);
      } else {
        await sendNotification(`❌ Sync failed: ${data.error}`, chatId);
      }
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("[Telegram Webhook] Error:", error.message);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
