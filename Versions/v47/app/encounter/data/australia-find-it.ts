export type AustraliaFindItMode = 'mixed' | 'hidden-map' | 'spot-difference'
export type AustraliaFindItKind = Exclude<AustraliaFindItMode, 'mixed'>

export interface FindItCopy { en: string, zh: string }

export interface AustraliaFindItCard {
  id: string
  number: number
  kind: AustraliaFindItKind
  title: FindItCopy
  instruction: FindItCopy
  answer: FindItCopy
  differences: readonly FindItCopy[]
  masterPath: string
  src: string
}

const hiddenInstruction: FindItCopy = {
  en: 'Find the exact Australia mainland and Tasmania silhouette hidden in the scene.',
  zh: '找出藏在畫面裡的澳洲本島與塔斯馬尼亞精確輪廓。',
}

const differenceInstruction: FindItCopy = {
  en: 'Compare the upper and lower scenes and find all five differences.',
  zh: '比較上下兩幅畫面，找出全部五個不同之處。',
}

const runtime = (file: string) => `australia-find-it-v1/${file}.webp`

function hidden(number: number, slug: string, en: string, zh: string, answerEn: string, answerZh: string): AustraliaFindItCard {
  const file = `${String(number).padStart(2, '0')}-${slug}`
  return {
    id: `au-find-${String(number).padStart(2, '0')}`,
    number,
    kind: 'hidden-map',
    title: { en, zh },
    instruction: hiddenInstruction,
    answer: { en: answerEn, zh: answerZh },
    differences: [],
    masterPath: `Library/Images/Species/Australia/field-journal-embedded-map-v2/${file}.png`,
    src: runtime(file),
  }
}

function difference(number: number, slug: string, en: string, zh: string, differences: readonly FindItCopy[]): AustraliaFindItCard {
  const file = `${String(number).padStart(2, '0')}-${slug}`
  return {
    id: `au-find-${String(number).padStart(2, '0')}`,
    number,
    kind: 'spot-difference',
    title: { en, zh },
    instruction: differenceInstruction,
    answer: {
      en: differences.map((item, index) => `${index + 1}. ${item.en}`).join(' '),
      zh: differences.map((item, index) => `${index + 1}. ${item.zh}`).join(' '),
    },
    differences,
    masterPath: `Library/Images/Games/Australia/find-it-v1/difference/${file}.png`,
    src: runtime(file),
  }
}

export const AUSTRALIA_FIND_IT_CARDS: readonly AustraliaFindItCard[] = [
  hidden(1, 'red-kangaroo', 'Red Kangaroo Tracks', '紅大袋鼠足跡', 'The mainland is the compressed red earth beneath the kangaroo; Tasmania is the separate pebble below.', '澳洲本島是袋鼠腳下壓實的紅土，塔斯馬尼亞是下方分開的小石塊。'),
  hidden(2, 'koala', 'Koala Leaf Puzzle', '無尾熊葉片謎題', 'The eucalyptus leaves beside the koala’s mouth form the mainland, with a small detached leaf for Tasmania.', '無尾熊嘴邊的桉樹葉組成澳洲本島，旁邊分開的小葉片就是塔斯馬尼亞。'),
  hidden(3, 'platypus', 'Platypus Riverbed', '鴨嘴獸河床', 'Pale stones and plants beneath the platypus form the mainland; the small separate stone is Tasmania.', '鴨嘴獸下方的淺色石塊與水草組成澳洲本島，分開的小石塊是塔斯馬尼亞。'),
  hidden(4, 'short-beaked-echidna', 'Echidna Anthill', '短吻針鼴蟻丘', 'Disturbed soil at the echidna’s snout forms the mainland, with a separate soil clod for Tasmania.', '針鼴鼻前被翻動的土形成澳洲本島，分開的小土塊是塔斯馬尼亞。'),
  hidden(5, 'bare-nosed-wombat', 'Wombat Burrow', '裸鼻袋熊洞穴', 'The burrow mouth and excavated soil form the mainland; the small clod below is Tasmania.', '洞口與挖出的土形成澳洲本島，下方的小土塊是塔斯馬尼亞。'),
  hidden(6, 'tasmanian-devil', 'Devil Chest Mark', '袋獾胸前花紋', 'The white chest marking forms the mainland, with a separate white spot for Tasmania.', '胸前白色毛紋形成澳洲本島，分開的小白點是塔斯馬尼亞。'),
  hidden(7, 'quokka', 'Quokka Snack', '短尾矮袋鼠點心', 'The leaves held beneath the quokka’s mouth form the mainland; a tiny detached leaf is Tasmania.', '短尾矮袋鼠嘴下的葉片形成澳洲本島，分開的小葉片是塔斯馬尼亞。'),
  hidden(8, 'numbat', 'Numbat Log', '袋食蟻獸倒木', 'Pale termite galleries under the numbat’s snout form the mainland; a bark chip is Tasmania.', '袋食蟻獸鼻下的淺色白蟻通道形成澳洲本島，旁邊的樹皮碎片是塔斯馬尼亞。'),
  hidden(9, 'southern-cassowary', 'Cassowary Fruit', '南方鶴鴕果實', 'The fallen fruit at the cassowary’s feet forms the mainland; one separate fruit is Tasmania.', '鶴鴕腳邊的落果形成澳洲本島，分開的一顆果實是塔斯馬尼亞。'),
  hidden(10, 'emu', 'Emu Dust Trail', '鴯鶓沙塵足跡', 'Pressed grass and dust beneath the emu form the mainland, with a small patch for Tasmania.', '鴯鶓腳下的壓草與沙塵形成澳洲本島，旁邊的小土痕是塔斯馬尼亞。'),
  hidden(11, 'laughing-kookaburra', 'Kookaburra Bark', '笑翠鳥樹皮', 'The pale bark scar directly beneath the kookaburra forms the mainland; the small flake is Tasmania.', '笑翠鳥下方的淺色樹皮疤形成澳洲本島，小樹皮片是塔斯馬尼亞。'),
  hidden(12, 'sulphur-crested-cockatoo', 'Cockatoo Leaves', '葵花鳳頭鸚鵡葉片', 'The chewed leaves beside the cockatoo form the mainland and Tasmania.', '葵花鳳頭鸚鵡嘴邊被啃食的葉片形成澳洲本島與塔斯馬尼亞。'),
  hidden(13, 'green-sea-turtle', 'Turtle Seagrass', '綠蠵龜海草地', 'The pale clearing beneath the turtle forms the mainland; the separate clearing is Tasmania.', '綠蠵龜下方的淺色海草空地形成澳洲本島，分開的小空地是塔斯馬尼亞。'),
  hidden(14, 'thorny-devil', 'Thorny Devil Water', '魔蜥水痕', 'The damp sand beneath the thorny devil forms the mainland; the small damp spot is Tasmania.', '魔蜥腳下的濕沙形成澳洲本島，分開的小濕點是塔斯馬尼亞。'),
  hidden(15, 'southern-corroboree-frog', 'Frog Moss Pool', '南方科羅澳蛙苔池', 'The moss-edged pool behind the frog forms the mainland; the small moss island is Tasmania.', '青蛙後方由苔蘚圍出的水池形成澳洲本島，小苔島是塔斯馬尼亞。'),
  hidden(16, 'golden-wattle', 'Golden Wattle Crown', '澳洲金合歡花冠', 'Connected golden flower clusters form the mainland; the detached blossom cluster is Tasmania.', '相連的金黃色花簇形成澳洲本島，分開的小花簇是塔斯馬尼亞。'),
  hidden(17, 'new-south-wales-waratah', 'Waratah Shadow', '新南威爾斯州花影子', 'Fallen petals and the cast shadow beneath the flower form the mainland and Tasmania.', '花朵下方的落瓣與影子形成澳洲本島及塔斯馬尼亞。'),
  hidden(18, 'red-and-green-kangaroo-paw', 'Kangaroo Paw Canopy', '紅綠袋鼠爪花冠', 'The connected flowering stems trace the mainland; the low detached blossoms are Tasmania.', '相連的開花枝條勾出澳洲本島，較低且分開的花簇是塔斯馬尼亞。'),
  hidden(19, 'grass-tree', 'Grass Tree Shadow', '澳洲草樹影子', 'The leaf shadow on the ground forms the mainland; the separate shadow patch is Tasmania.', '地面的葉影形成澳洲本島，分開的小影子是塔斯馬尼亞。'),
  hidden(20, 'sturts-desert-pea', 'Desert Pea Clearing', '史特爾特沙漠豆空地', 'The vines frame an Australia-shaped sand clearing; a separate blossom marks Tasmania.', '藤蔓圍出澳洲形狀的沙地，分開的小花是塔斯馬尼亞。'),
  hidden(21, 'ulysses-butterfly', 'Butterfly Leaf Window', '尤利西斯鳳蝶葉窗', 'Feeding wear in the leaf forms the mainland; the tiny detached hole is Tasmania.', '葉片上的取食缺口形成澳洲本島，分開的小洞是塔斯馬尼亞。'),
  hidden(22, 'giant-burrowing-cockroach', 'Cockroach Burrow', '巨型穴居蟑螂洞穴', 'The burrow and fresh soil form the mainland; the separate soil pellet is Tasmania.', '洞穴與新鮮挖土形成澳洲本島，分開的小土粒是塔斯馬尼亞。'),
  hidden(23, 'peacock-spider', 'Peacock Spider Web', '孔雀跳蛛蛛網', 'Silk and dew behind the spider form the mainland, with a small web patch for Tasmania.', '蜘蛛後方的絲線與露珠形成澳洲本島，小片蛛網是塔斯馬尼亞。'),
  hidden(24, 'christmas-beetle', 'Christmas Beetle Leaf', '聖誕金龜葉片', 'The feeding hole in the eucalyptus leaf forms the mainland, with a small hole for Tasmania.', '桉樹葉上的取食缺口形成澳洲本島，小缺口是塔斯馬尼亞。'),
  hidden(25, 'australian-emperor-dragonfly', 'Dragonfly Wetland', '澳洲皇蜻蜓濕地', 'Open water between reeds forms the mainland; the separate small pool is Tasmania.', '蘆葦間的開放水面形成澳洲本島，分開的小水池是塔斯馬尼亞。'),

  difference(26, 'sydney-harbour-morning', 'Sydney Harbour Morning', '雪梨港晨光', [{ en: 'Opera House sail highlights: three vs four.', zh: '歌劇院帆頂亮面：三個與四個。' }, { en: 'Ferry life rings: one vs two.', zh: '渡輪救生圈：一個與兩個。' }, { en: 'Flying gulls: one vs two.', zh: '飛翔海鷗：一隻與兩隻。' }, { en: 'Foreground leaf: green vs golden.', zh: '前景葉片：綠色與金黃色。' }, { en: 'Buoy: left vs right of the ferry.', zh: '浮標：位於渡輪左側與右側。' }]),
  difference(27, 'melbourne-tram-rain', 'Melbourne Tram After Rain', '墨爾本雨後電車', [{ en: 'Tram headlights: one vs two.', zh: '電車頭燈：一盞與兩盞。' }, { en: 'Café umbrella: rust red vs yellow.', zh: '咖啡傘：鏽紅色與黃色。' }, { en: 'Bicycle basket: present vs absent.', zh: '腳踏車籃：有與沒有。' }, { en: 'Pigeons: two vs three.', zh: '鴿子：兩隻與三隻。' }, { en: 'Window flower pot: present vs absent.', zh: '窗台花盆：有與沒有。' }]),
  difference(28, 'great-ocean-road', 'Great Ocean Road', '大洋路海岸', [{ en: 'Parked car: present vs absent.', zh: '停放汽車：有與沒有。' }, { en: 'Gulls: one vs two.', zh: '海鷗：一隻與兩隻。' }, { en: 'Wave crests: three vs four.', zh: '浪花尖峰：三個與四個。' }, { en: 'Yellow wildflowers: present vs absent.', zh: '黃色野花：有與沒有。' }, { en: 'Cloud: left vs right of the tallest stack.', zh: '雲朵：位於最高岩柱左側與右側。' }]),
  difference(29, 'bondi-beach-morning', 'Bondi Beach Morning', '邦代海灘早晨', [{ en: 'Nearest umbrella: coral vs yellow.', zh: '最近的陽傘：珊瑚色與黃色。' }, { en: 'Surfboard stripe: one vs two.', zh: '衝浪板條紋：一條與兩條。' }, { en: 'Gulls: two vs three.', zh: '海鷗：兩隻與三隻。' }, { en: 'Beach ball: present vs absent.', zh: '沙灘球：有與沒有。' }, { en: 'Nearest wave foam peaks: two vs three.', zh: '最近浪花尖峰：兩個與三個。' }]),
  difference(30, 'brisbane-river-walk', 'Brisbane River Walk', '布里斯本河岸步道', [{ en: 'Bench: green vs ochre.', zh: '長椅：綠色與赭黃色。' }, { en: 'Ibises: one vs two.', zh: '䴉鳥：一隻與兩隻。' }, { en: 'Bicycle basket: present vs absent.', zh: '腳踏車籃：有與沒有。' }, { en: 'Ferry canopy: cream vs green.', zh: '渡輪頂篷：奶油色與綠色。' }, { en: 'Jacaranda branch: blossoms vs leaves.', zh: '藍花楹枝條：紫花與綠葉。' }]),
  difference(31, 'perth-park-lookout', 'Perth Park Lookout', '伯斯公園眺望台', [{ en: 'Black swans: one vs two.', zh: '黑天鵝：一隻與兩隻。' }, { en: 'Picnic blanket: rust vs green.', zh: '野餐毯：鏽紅色與綠色。' }, { en: 'Telescope: points right vs left.', zh: '望遠鏡：朝右與朝左。' }, { en: 'Foreground flowers: yellow vs pink.', zh: '前景花朵：黃色與粉紅色。' }, { en: 'Sailboats: one vs two.', zh: '帆船：一艘與兩艘。' }]),
  difference(32, 'adelaide-parklands-picnic', 'Adelaide Parklands Picnic', '阿德雷德公園野餐', [{ en: 'Basket: open vs closed.', zh: '野餐籃：打開與關閉。' }, { en: 'Magpies: two vs three.', zh: '喜鵲：兩隻與三隻。' }, { en: 'Blanket: coral vs blue.', zh: '野餐毯：珊瑚色與藍色。' }, { en: 'Bicycle helmet: present vs absent.', zh: '腳踏車安全帽：有與沒有。' }, { en: 'Oranges: three vs four.', zh: '柳橙：三顆與四顆。' }]),
  difference(33, 'hobart-waterfront', 'Hobart Waterfront', '霍巴特海濱', [{ en: 'Dinghy: red vs blue.', zh: '小艇：紅色與藍色。' }, { en: 'Gulls: one vs two.', zh: '海鷗：一隻與兩隻。' }, { en: 'Rope loops: two vs three.', zh: '繩圈：兩圈與三圈。' }, { en: 'Mountain snow patches: one vs two.', zh: '山上雪斑：一處與兩處。' }, { en: 'Wooden crate: present vs absent.', zh: '木箱：有與沒有。' }]),
  difference(34, 'darwin-sunset-picnic', 'Darwin Sunset Picnic', '達爾文夕陽野餐', [{ en: 'Coconut umbrella: present vs absent.', zh: '椰子飲料小傘：有與沒有。' }, { en: 'Cockatoos: one vs two.', zh: '鳳頭鸚鵡：一隻與兩隻。' }, { en: 'Sandals: crossed vs parallel.', zh: '涼鞋：交叉與平行。' }, { en: 'Frangipani: white vs pink.', zh: '雞蛋花：白色與粉紅色。' }, { en: 'Sailboat: present vs absent.', zh: '帆船：有與沒有。' }]),
  difference(35, 'canberra-lakeside', 'Canberra Lakeside', '坎培拉湖畔', [{ en: 'Tall fountain jets: one vs two.', zh: '高噴泉水柱：一道與兩道。' }, { en: 'Black swans: one vs two.', zh: '黑天鵝：一隻與兩隻。' }, { en: 'Bicycle: blue vs rust.', zh: '腳踏車：藍色與鏽紅色。' }, { en: 'Balloon: present vs absent.', zh: '熱氣球：有與沒有。' }, { en: 'Blossoms: pink vs white.', zh: '花朵：粉紅色與白色。' }]),
  difference(36, 'blue-mountains-lookout', 'Blue Mountains Lookout', '藍山眺望台', [{ en: 'Binocular: green vs brass.', zh: '望遠鏡：綠色與黃銅色。' }, { en: 'Cockatoos: one vs two.', zh: '鳳頭鸚鵡：一隻與兩隻。' }, { en: 'Backpack pocket: closed vs open.', zh: '背包前袋：關閉與打開。' }, { en: 'Hanging leaf cluster: present vs absent.', zh: '垂掛葉簇：有與沒有。' }, { en: 'Cloud: left vs right of the rocks.', zh: '雲朵：位於岩柱左側與右側。' }]),
  difference(37, 'daintree-rainforest-boardwalk', 'Daintree Rainforest Boardwalk', '丹翠雨林步道', [{ en: 'Blue butterflies: one vs three.', zh: '藍色蝴蝶：一隻與三隻。' }, { en: 'Daypack: ochre vs green.', zh: '背包：赭黃色與綠色。' }, { en: 'Frog: left leaf vs right leaf.', zh: '青蛙：左側葉片與右側葉片。' }, { en: 'Fan palm: yellow-green vs deep green.', zh: '扇葉棕櫚：黃綠色與深綠色。' }, { en: 'Creek ripples: two vs three.', zh: '溪流漣漪：兩圈與三圈。' }]),
  difference(38, 'great-barrier-reef', 'Great Barrier Reef', '大堡礁', [{ en: 'Branching coral: red vs purple.', zh: '枝狀珊瑚：紅色與紫色。' }, { en: 'Orange fish: three vs four.', zh: '橘色魚：三隻與四隻。' }, { en: 'Turtle: faces left vs right.', zh: '海龜：朝左與朝右。' }, { en: 'Clam: open vs closed.', zh: '貝殼：打開與關閉。' }, { en: 'Spotted ray: present vs absent.', zh: '斑點魟魚：有與沒有。' }]),
  difference(39, 'ningaloo-whale-shark', 'Ningaloo Whale Shark', '寧格魯鯨鯊', [{ en: 'Grey remoras: one vs three.', zh: '灰色鮣魚：一隻與三隻。' }, { en: 'Sea fan: orange vs purple.', zh: '海扇：橘色與紫色。' }, { en: 'Yellow fish: three vs five.', zh: '黃色魚：三隻與五隻。' }, { en: 'Coral arch: present vs absent.', zh: '珊瑚拱門：有與沒有。' }, { en: 'Bubble cluster: left vs right.', zh: '氣泡群：左側與右側。' }]),
  difference(40, 'gold-coast-surf-morning', 'Gold Coast Surf Morning', '黃金海岸衝浪晨光', [{ en: 'Surfboard: coral vs yellow.', zh: '衝浪板：珊瑚色與黃色。' }, { en: 'Gulls: one vs two.', zh: '海鷗：一隻與兩隻。' }, { en: 'Kite: present vs absent.', zh: '風箏：有與沒有。' }, { en: 'Towel stripes: blue vs green.', zh: '毛巾條紋：藍色與綠色。' }, { en: 'Umbrella panels: six vs eight.', zh: '陽傘分片：六片與八片。' }]),
  difference(41, 'outback-road-train-stop', 'Outback Road Train Stop', '內陸公路列車休息站', [{ en: 'Truck cab: rust vs cream.', zh: '卡車車頭：鏽紅色與奶油色。' }, { en: 'Trailers: two vs three.', zh: '拖車：兩節與三節。' }, { en: 'Windmill blades: fewer vs more.', zh: '風車葉片：較少與較多。' }, { en: 'Emus: one vs two.', zh: '鴯鶓：一隻與兩隻。' }, { en: 'Blue water drum: present vs absent.', zh: '藍色水桶：有與沒有。' }]),
  difference(42, 'country-cricket-ground', 'Country Cricket Ground', '鄉間板球場', [{ en: 'Ball: left vs right of the wicket.', zh: '板球：位於三柱門左側與右側。' }, { en: 'Stumps: three vs two.', zh: '柱門木柱：三根與兩根。' }, { en: 'Magpies: one vs two.', zh: '喜鵲：一隻與兩隻。' }, { en: 'Kit bag: green vs ochre.', zh: '球具袋：綠色與赭黃色。' }, { en: 'Thermos: present vs absent.', zh: '保溫瓶：有與沒有。' }]),
  difference(43, 'backyard-barbecue', 'Backyard Barbecue', '後院烤肉', [{ en: 'Grill lid: open vs closed.', zh: '烤爐蓋：打開與關閉。' }, { en: 'Sausages: three vs five.', zh: '香腸：三條與五條。' }, { en: 'Kookaburras: one vs two.', zh: '笑翠鳥：一隻與兩隻。' }, { en: 'Lemons: three vs four.', zh: '檸檬：三顆與四顆。' }, { en: 'Tongs: left vs right side.', zh: '夾子：桌面左側與右側。' }]),
  difference(44, 'flat-white-cafe', 'Flat White Café', '馥芮白咖啡館', [{ en: 'Latte art: heart vs fern leaf.', zh: '拉花：愛心與蕨葉。' }, { en: 'Cup: blue-banded vs cream.', zh: '杯子：藍色環帶與奶油色。' }, { en: 'Pastries: two vs three.', zh: '糕點：兩個與三個。' }, { en: 'Chair: present vs absent.', zh: '椅子：有與沒有。' }, { en: 'Fern pot: terracotta vs green.', zh: '蕨類花盆：陶土色與綠色。' }]),
  difference(45, 'meat-pie-coastal-picnic', 'Meat Pie Coastal Picnic', '海岸肉派野餐', [{ en: 'Meat pies: three vs five.', zh: '肉派：三個與五個。' }, { en: 'Picnic cloth: coral vs blue.', zh: '野餐布：珊瑚色與藍色。' }, { en: 'Thermos: present vs absent.', zh: '保溫瓶：有與沒有。' }, { en: 'Gulls: one vs two.', zh: '海鷗：一隻與兩隻。' }, { en: 'Sauce dish: left vs right.', zh: '醬料碟：左側與右側。' }]),
  difference(46, 'melbourne-rain-laneway', 'Melbourne Rain Laneway', '墨爾本雨後巷弄', [{ en: 'Bicycle: green vs blue.', zh: '腳踏車：綠色與藍色。' }, { en: 'Bicycle basket: present vs absent.', zh: '腳踏車籃：有與沒有。' }, { en: 'Black cat: left vs right.', zh: '黑貓：左側與右側。' }, { en: 'Closed umbrella: rust vs yellow.', zh: '收起的陽傘：鏽紅色與黃色。' }, { en: 'Window flower pot: present vs absent.', zh: '窗台花盆：有與沒有。' }]),
  difference(47, 'sydney-ferry-deck', 'Sydney Ferry Deck', '雪梨渡輪甲板', [{ en: 'Life rings: one vs two.', zh: '救生圈：一個與兩個。' }, { en: 'Binocular: green vs brass.', zh: '望遠鏡：綠色與黃銅色。' }, { en: 'Takeaway cup: present vs absent.', zh: '外帶杯：有與沒有。' }, { en: 'Gulls: one vs two.', zh: '海鷗：一隻與兩隻。' }, { en: 'Deck chair: faces left vs right.', zh: '甲板椅：朝左與朝右。' }]),
  difference(48, 'vineyard-sunset-picnic', 'Vineyard Sunset Picnic', '葡萄園夕陽野餐', [{ en: 'Grapes: purple vs green.', zh: '葡萄：紫色與綠色。' }, { en: 'Basket: open vs closed.', zh: '野餐籃：打開與關閉。' }, { en: 'Rosellas: one vs two.', zh: '玫瑰鸚鵡：一隻與兩隻。' }, { en: 'Bottle: present vs absent.', zh: '玻璃瓶：有與沒有。' }, { en: 'Straw hat: left vs right.', zh: '草帽：左側與右側。' }]),
  difference(49, 'sugarcane-field-railway', 'Sugarcane Field Railway', '甘蔗田鐵路', [{ en: 'Locomotive: green vs rust red.', zh: '火車頭：綠色與鏽紅色。' }, { en: 'Cane wagons: two vs three.', zh: '甘蔗車廂：兩節與三節。' }, { en: 'Cockatoos: one vs two.', zh: '鳳頭鸚鵡：一隻與兩隻。' }, { en: 'Loose cane bundle: present vs absent.', zh: '散放甘蔗束：有與沒有。' }, { en: 'Cloud: left vs right.', zh: '雲朵：左側與右側。' }]),
  difference(50, 'farm-windmill-sunset', 'Farm Windmill Sunset', '農場風車夕陽', [{ en: 'Upper rotor: grey vs rust red.', zh: '上方轉輪：灰色與鏽紅色。' }, { en: 'Sheep: two vs three.', zh: '綿羊：兩隻與三隻。' }, { en: 'Gate: open vs closed.', zh: '木門：打開與關閉。' }, { en: 'Blue trough: present vs absent.', zh: '藍色水槽：有與沒有。' }, { en: 'Saddle: left vs right fence post.', zh: '馬鞍：左側與右側圍欄柱。' }]),
]
