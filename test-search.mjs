// Extract title, url, snippet, domain from DDG HTML
async function testParser() {
  const query = "React 19 hooks useActionState";
  const ddgHtmlUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
  const res = await fetch(ddgHtmlUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
    }
  });
  const html = await res.text();
  
  // Results are contained in <div class="result results_links results_links_deep web-result ">
  // Or links with class="result__a"
  const regex = /<a[^>]*class="result__a"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>[\s\S]*?<a[^>]*class="result__snippet"[^>]*>([\s\S]*?)<\/a>/gi;
  const items = [];
  let m;
  while ((m = regex.exec(html)) !== null && items.length < 5) {
    let rawUrl = m[1];
    let actualUrl = rawUrl;
    if (rawUrl.includes('uddg=')) {
      try {
        actualUrl = decodeURIComponent(rawUrl.split('uddg=')[1].split('&')[0]);
      } catch (e) {}
    }
    const title = m[2].replace(/<[^>]+>/g, '').trim();
    const snippet = m[3].replace(/<[^>]+>/g, '').trim();
    let domain = '';
    try {
      domain = new URL(actualUrl).hostname;
    } catch (e) {
      domain = 'web';
    }

    items.push({
      title,
      url: actualUrl,
      snippet,
      domain
    });
  }

  console.log("Parsed results count:", items.length);
  console.log("First 2 items:", JSON.stringify(items.slice(0, 2), null, 2));
}

testParser();
