import * as cheerio from 'cheerio';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return Response.json({ success: false, error: 'Slug is required' }, { status: 400 });
  }

  try {
    // Construct the full target URL
    // Ensure we don't have double slashes if slug already starts with one
    const cleanSlug = slug.startsWith('/') ? slug.slice(1) : slug;
    const targetUrl = `https://sarkariresult.com.cm/${cleanSlug}`;
    
    console.log(`[API get-html] Scraping Source: ${targetUrl}`);

    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9'
      },
      next: { revalidate: 0 }
    });

    if (!response.ok) {
      return Response.json({ 
        success: false, 
        error: `Source site returned ${response.status}: ${response.statusText}`,
        url: targetUrl
      }, { status: response.status });
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Remove scripts and unnecessary elements to clean up the HTML for the viewer
    $('script').remove();
    $('style').not('[scoped]').remove();
    $('.header, .footer, .sidebar, .nav, #sidebar, #header, #footer').remove();

    // Standard containers for job/result posts on these sites are usually one of these:
    const content = $('.entry-content').html() || 
                    $('.wp-block-group__inner-container').html() ||
                    $('article').html() || 
                    $('main').html() || 
                    $('table').first().parent().html() ||
                    $('body').html();

    if (!content) {
      return Response.json({ 
        success: false, 
        error: 'Successfully fetched page but could not find specific content container.',
        url: targetUrl
      });
    }

    const title = $('h1').first().text().trim() || 
                  $('.entry-title').first().text().trim() || 
                  $('title').text().trim();

    return Response.json({ 
      success: true, 
      html: content.trim(),
      title: title,
      sourceUrl: targetUrl
    });
  } catch (error) {
    console.error("[API get-html] Critical Error:", error.message);
    return Response.json({ 
      success: false, 
      error: `Internal Server Error: ${error.message}` 
    }, { status: 500 });
  }
}
