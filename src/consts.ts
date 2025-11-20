// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.
export const NOW = new Date();
export const SITE_COPY = 'sina bakhtiari';
export const SITE_TITLE = 'seen';
export const SITE_DESCRIPTION = 'work and thoughts of sina bakhtiari';
export const SITE_URL = 'https://thxsina.com';
export const ASTRO_ASSET_PATH = '../assets';


export const HEADER_LINKS = [
  {'label': 'thoughts', 'url': '/thoughts'},
  {'label': 'work', 'url': '/work'}
];

export const LINKS = {
  'billiard-info': '/sample-billiards'
};

export const openInNewTab = (url: string) => {
  const newTab = window.open(url, '_blank', 'noopener,noreferrer');
  if (newTab) {
    newTab.opener = null;
  }
};

export const closeTab = (tab: Window) => {
  tab.close();
};

export const playAudio = (src: string, startTime = '0', stopTime = '0') => {
  const audio = new Audio();
  audio.src = src;
  audio.currentTime = Number(startTime);

  audio.addEventListener('timeupdate', () => {
    if (audio.currentTime >= Number(stopTime)) {
      audio.pause();
    }
  });

  audio.play();
};

export const randomListItem = (items: Array<any>) => {
  const itemLength = items.length;

  return items[Math.floor(Math.random() * itemLength)];
};

export const randomFilterClass = () => {
  const filters = [
    'emoji-filter-bw',
    'emoji-filter-red',
    'emoji-filter-green',
    'emoji-filter-blue',
    'emoji-filter-yellow',
    'emoji-filter-orange'
  ];

  return randomListItem(filters);
};

export const randomEmoji = () => {
  const emojis = [
    '✨',
    '📌',
    '🎯',
    '🍃',
    '☀️',
    '🐱',
    '🌊',
    '🏍️',
    '🚩',
    '🍰',
    '🧜🏻‍♀️',
    '🍍'
  ];

  return randomListItem(emojis);
};