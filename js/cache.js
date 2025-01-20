async function getCache(key) {
  let currentCache;

  if (localStorage.cache) {
    cache = JSON.parse(localStorage.cache);
    currentCache = cache[key];
  }

  if (isCacheExpired(currentCache)) {
    currentCache = {};
    const config = await getConfig(key);

    currentCache.text = getRandomElement(config.texts);
    currentCache.image = getRandomElement(config.images);
    currentCache.url = getRandomElement(config.urls)
    currentCache.expire = +(new Date()) + (1000 * 60 * 60 * 24 * 7);

    setCache(key, currentCache);
  }

  return currentCache;
}

async function getConfig(key) {
  const response = await fetch("/inbox/server/configProvider.php?key=" + key);
  return await response.json();
}

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function isCacheExpired(cache) {
  return !cache || +(new Date()) >= +cache.expire;
}

function setCache(key, data) {
  let rawCache = localStorage.cache;

  if (!rawCache) {
    rawCache = "{}";
  }

  const cache = JSON.parse(rawCache);
  cache[key] = data;
  localStorage.cache = JSON.stringify(cache);
}
