(function() {
  const API_BASE = window.location.port === '5173' || window.location.port === '5174'
    ? 'http://localhost:3001/api'
    : (window.location.port === '3001' ? '/api' : 'http://localhost:3001/api');

  // Helper to inject Facebook Pixel
  function initFBPixel(pixelId) {
    if (!pixelId) return;
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', pixelId);
    fbq('track', 'PageView');
    console.log('✅ Facebook Pixel Initialized:', pixelId);
  }

  // Helper to inject TikTok Pixel
  function initTikTokPixel(pixelId) {
    if (!pixelId) return;
    !function (w, d, t) {
      w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
      ttq.load(pixelId);
      ttq.page();
      console.log('✅ TikTok Pixel Initialized:', pixelId);
    }(window, document, 'ttq');
  }

  // Fetch settings from server
  fetch(`${API_BASE}/settings`)
    .then(res => res.json())
    .then(settings => {
      // Initialize Facebook Pixel
      if (settings.fb_pixel) {
        initFBPixel(settings.fb_pixel);
        window.fb_pixel_id = settings.fb_pixel;
      }
      // Initialize TikTok Pixel
      if (settings.tiktok_pixel) {
        initTikTokPixel(settings.tiktok_pixel);
        window.tiktok_pixel_id = settings.tiktok_pixel;
      }
      // Set GSheet URL globally
      if (settings.gsheet_webhook_url) {
        window.gsheet_webhook_url = settings.gsheet_webhook_url;
      }
    })
    .catch(err => console.error('Error fetching pixel settings:', err));

  // Utility to fire custom events safely
  window.firePixelEvent = function(eventName, data = {}) {
    if (window.fbq && window.fb_pixel_id) {
      fbq('track', eventName, data);
    }
    if (window.ttq && window.tiktok_pixel_id) {
      // Map common events to TikTok events if necessary, or just track directly
      let ttEvent = eventName;
      if (eventName === 'Purchase') ttEvent = 'CompletePayment';
      if (eventName === 'AddToCart') ttEvent = 'AddToCart';
      ttq.track(ttEvent, data);
    }
  };

})();
