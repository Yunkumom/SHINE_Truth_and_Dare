import type { ArtworkVariant, Blessing } from '../types'

type ThemedCopy = { zh: string, en: string }

export const ARTWORK_BLESSINGS: Record<string, ThemedCopy> = {
  'mazu-sea': { zh: '媽祖幫你看海也看路，迷路只會迷進好風景。', en: 'Mazu watches the sea and your route, so every wrong turn finds a good view.' },
  'mazu-lantern': { zh: '媽祖替你點燈，連人生的省電模式都亮得剛剛好。', en: 'Mazu lights the way, even when life is in power-saving mode.' },
  'guanyin-moon': { zh: '觀音把你的煩惱調成靜音，今晚只收好消息。', en: 'Guanyin mutes your worries, leaving tonight open for good news.' },
  'guanyin-lotus': { zh: '觀音送你蓮花級耐心，遇到雷隊友也能優雅通關。', en: 'Guanyin grants lotus-level patience, even for the wildest teammates.' },
  'guansheng-guardian': { zh: '關聖帝君替你守信用，放你鴿子的人先被良心已讀。', en: 'Guan Sheng guards your trust; flaky people get read by their conscience first.' },
  'guansheng-courtyard': { zh: '關聖帝君站你這邊，今天講義氣也講運氣。', en: 'Guan Sheng stands with you, bringing loyalty and luck today.' },
  'xuantian-sea': { zh: '玄天上帝替你鎮場，尷尬看到你都先轉身。', en: 'Xuantian steadies the room, and awkwardness turns around first.' },
  'xuantian-stair': { zh: '玄天上帝陪你爬坡，難關今天自己變成樓梯。', en: 'Xuantian climbs with you, turning obstacles into steps.' },
  'baosheng-herbs': { zh: '保生大帝罩你，感冒看到你都自動繞路。', en: 'Baosheng guards you so well that even a cold takes the long way around.' },
  'baosheng-apothecary': { zh: '保生大帝替你配好今日份元氣，副作用只有太有精神。', en: 'Baosheng prescribes today’s energy; the only side effect is extra sparkle.' },
  'tudigong-throne': { zh: '土地公幫你顧地盤，連沙發最舒服的位置都留給你。', en: 'Tudigong guards your ground and saves you the best seat on the sofa.' },
  'tudigong-harvest': { zh: '土地公替你收成好運，連發票都想對中你。', en: 'Tudigong harvests your luck until even receipts want to win for you.' },
  'wenchang-stars': { zh: '文昌帝君幫你開腦內導航，答案不再塞車。', en: 'Wenchang turns on brain navigation so answers stop getting stuck in traffic.' },
  'wenchang-study': { zh: '文昌帝君替你顧進度，拖延症今天請假。', en: 'Wenchang guards your progress while procrastination takes the day off.' },
  'yue-lao-moon': { zh: '月老幫你整理紅線，曖昧不再打死結。', en: 'Yue Lao untangles the red thread so mixed signals stop making knots.' },
  'yue-lao-banyan': { zh: '月老把緣分掛上榕樹，風吹來的都是好聊的人。', en: 'Yue Lao hangs fate in the banyan, and the breeze brings people worth talking to.' },
  'zhusheng-lotus': { zh: '註生娘娘守護你的新計畫，靈感出生就自帶好命。', en: 'Zhusheng protects your new plans, giving every idea a lucky beginning.' },
  'zhusheng-lamp': { zh: '註生娘娘替希望留燈，連小目標都找到回家的路。', en: 'Zhusheng keeps a lamp for hope so even tiny goals find their way home.' },
  'tw-zodiac-aries': { zh: '牡羊的衝勁已上線，猶豫今天追不上你。', en: 'Aries momentum is online, and hesitation cannot catch you today.' },
  'tw-zodiac-taurus': { zh: '金牛替你穩穩接福，錢包也開始有安全感。', en: 'Taurus catches your luck steadily until even your wallet feels secure.' },
  'tw-zodiac-gemini': { zh: '雙子送你兩倍話題，冷場只剩半條命。', en: 'Gemini doubles your conversation fuel, leaving awkward silence half a life.' },
  'tw-zodiac-cancer': { zh: '巨蟹把你放進安心殼，外面的壞心情先按門鈴。', en: 'Cancer gives you a safe shell where bad moods must ring first.' },
  'tw-zodiac-leo': { zh: '獅子替你打聚光燈，今天走路都像壓軸。', en: 'Leo aims the spotlight at you, making every entrance a finale.' },
  'tw-zodiac-virgo': { zh: '處女座幫你整理宇宙，連待辦清單都自己排隊。', en: 'Virgo organizes the universe until your to-do list lines up by itself.' },
  'tw-zodiac-libra': { zh: '天秤替你調好平衡，甜點和理智今天可以同桌。', en: 'Libra restores balance, letting dessert and reason share one table.' },
  'tw-zodiac-scorpio': { zh: '天蠍替你開啟洞察力，套路還沒靠近就先現形。', en: 'Scorpio turns on insight so every trick reveals itself early.' },
  'tw-zodiac-sagittarius': { zh: '射手把好運射出去，繞一圈還是正中你。', en: 'Sagittarius fires luck into the world, and it circles back to hit you.' },
  'tw-zodiac-capricorn': { zh: '摩羯替你踩穩每一步，目標想跑都跑不掉。', en: 'Capricorn steadies each step so your goal has nowhere to escape.' },
  'tw-zodiac-aquarius': { zh: '水瓶倒出新點子，腦洞大到煩惱掉進去找不到。', en: 'Aquarius pours out ideas so vast that worries get lost inside.' },
  'tw-zodiac-pisces': { zh: '雙魚替你加滿浪漫，現實今天也願意配合演出。', en: 'Pisces fills the day with romance, and reality agrees to play along.' },
  'tw-local-zodiac-aries': { zh: '牡羊帶你迎著合歡山晨光，賴床今天正式落敗。', en: 'Aries leads you into Hehuanshan dawn, defeating the snooze button.' },
  'tw-local-zodiac-taurus': { zh: '金牛泡好阿里山茶，忙碌看到你也先坐下來。', en: 'Taurus brews Alishan tea until busyness sits down and takes a breath.' },
  'tw-local-zodiac-gemini': { zh: '雙子在西門幫你開話題，連紅綠燈都想加入聊天。', en: 'Gemini starts the chat in Ximending until even traffic lights join in.' },
  'tw-local-zodiac-cancer': { zh: '巨蟹守著澎湖潮間，好心情退潮也會再回來。', en: 'Cancer watches Penghu tides, promising every good mood a return.' },
  'tw-local-zodiac-leo': { zh: '獅子替廟埕熱場，你一登場連路人都想鼓掌。', en: 'Leo warms the temple courtyard until passersby applaud your entrance.' },
  'tw-local-zodiac-virgo': { zh: '處女座顧好池上稻田，你的努力一粒都不浪費。', en: 'Virgo tends the Chishang fields so none of your effort goes to waste.' },
  'tw-local-zodiac-libra': { zh: '天秤替大稻埕調光，今天怎麼拍都沒有死角。', en: 'Libra lights Dadaocheng so every angle becomes your good side.' },
  'tw-local-zodiac-scorpio': { zh: '天蠍陪你走太魯閣，山很深但你的心事不用藏。', en: 'Scorpio walks Taroko with you; the gorge is deep, but your feelings need not hide.' },
  'tw-local-zodiac-sagittarius': { zh: '射手追上玉山第一道光，好機會今天逃不過你。', en: 'Sagittarius catches Yushan’s first light, and no good chance escapes you.' },
  'tw-local-zodiac-capricorn': { zh: '摩羯站穩清水斷崖，風再大也吹不走你的計畫。', en: 'Capricorn stands firm at Qingshui Cliff, keeping every plan on course.' },
  'tw-local-zodiac-aquarius': { zh: '水瓶把九份雨變靈感，鞋濕了但點子很乾爽。', en: 'Aquarius turns Jiufen rain into ideas; the shoes are wet, the thinking crisp.' },
  'tw-local-zodiac-pisces': { zh: '雙魚借東岸月浪送福，浪花每次都偷偷加碼。', en: 'Pisces sends luck on east-coast waves, with every splash adding a bonus.' },
}
const DEITY_MEANINGS: Record<string, ThemedCopy> = {
  mazu: { zh: '航海守護', en: 'Safe Journeys' },
  guanyin: { zh: '慈悲守護', en: 'Compassion' },
  'guansheng-dijun': { zh: '忠義守護', en: 'Loyalty' },
  'xuantian-shangdi': { zh: '勇氣守護', en: 'Courage' },
  'baosheng-dadi': { zh: '健康守護', en: 'Health' },
  tudigong: { zh: '平安守護', en: 'Everyday Peace' },
  'wenchang-dijun': { zh: '智慧守護', en: 'Wisdom' },
  'yue-lao': { zh: '緣分守護', en: 'Connection' },
  'zhusheng-niangniang': { zh: '成長守護', en: 'New Beginnings' },
}

export function artworkTitle(artwork: ArtworkVariant, language: 'zh' | 'en' = 'zh') {
  const meaning = artwork.subjectKind === 'zodiac' ? undefined : DEITY_MEANINGS[artwork.deityId]
  if (!meaning) return language === 'en' ? artwork.enName : artwork.zhName
  return language === 'en' ? `${artwork.enName} | ${meaning.en}` : `${artwork.zhName}｜${meaning.zh}`
}

export function themedBlessingForArtwork(artwork: ArtworkVariant): Blessing {
  const copy = ARTWORK_BLESSINGS[artwork.id] ?? { zh: '願今天的好運準時找到你。', en: 'May today’s good luck find you right on time.' }
  return { id: `artwork-${artwork.id}`, ...copy }
}
