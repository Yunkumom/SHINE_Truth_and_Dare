import type { TaiwanFoodRegion, TaiwanFoodSubject } from '../types'

export const TAIWAN_FOOD_REGIONS: Record<TaiwanFoodRegion, { zh: string, en: string, stamp: string }> = {
  north: { zh: '北部', en: 'North', stamp: 'N' },
  central: { zh: '中部', en: 'Central', stamp: 'C' },
  south: { zh: '南部', en: 'South', stamp: 'S' },
  east: { zh: '東部', en: 'East', stamp: 'E' },
  offshore: { zh: '離島', en: 'Offshore', stamp: 'O' },
}

export const TAIWAN_FOOD_SUBJECTS = [
  {
    id: 'food-north-beef-noodles',
    number: 1,
    classic: true,
    region: 'north',
    place: {
      zh: '臺北市',
      en: 'Taipei'
    },
    name: {
      zh: '紅燒牛肉麵',
      en: 'Braised Beef Noodles'
    },
    flavors: {
      zh: [
        '醇厚',
        '鹹香',
        '微辣'
      ],
      en: [
        'rich',
        'savory',
        'warm spice'
      ]
    },
    allergens: [
      'gluten',
      'soy'
    ]
  },
  {
    id: 'food-north-iron-eggs',
    number: 2,
    classic: true,
    region: 'north',
    place: {
      zh: '新北市淡水',
      en: 'Tamsui, New Taipei'
    },
    name: {
      zh: '淡水鐵蛋',
      en: 'Tamsui Iron Eggs'
    },
    flavors: {
      zh: [
        '滷香',
        '彈韌',
        '回甘'
      ],
      en: [
        'soy-braised',
        'chewy',
        'gently sweet'
      ]
    },
    allergens: [
      'egg',
      'soy'
    ]
  },
  {
    id: 'food-north-hsinchu-rice-noodles',
    number: 3,
    classic: true,
    region: 'north',
    place: {
      zh: '新竹市',
      en: 'Hsinchu'
    },
    name: {
      zh: '新竹米粉',
      en: 'Hsinchu Rice Noodles'
    },
    flavors: {
      zh: [
        '米香',
        '清爽',
        '鮮味'
      ],
      en: [
        'rice aroma',
        'light',
        'umami'
      ]
    },
    allergens: [
      'possible-shellfish',
      'soy'
    ]
  },
  {
    id: 'food-north-keelung-tempura',
    number: 4,
    classic: false,
    region: 'north',
    place: {
      zh: '基隆市',
      en: 'Keelung'
    },
    name: {
      zh: '基隆甜不辣',
      en: 'Keelung Tempura'
    },
    flavors: {
      zh: [
        '魚鮮',
        '甜鹹',
        '彈牙'
      ],
      en: [
        'fish savor',
        'sweet-savory',
        'springy'
      ]
    },
    allergens: [
      'fish',
      'gluten'
    ]
  },
  {
    id: 'food-north-daxi-tofu',
    number: 5,
    classic: false,
    region: 'north',
    place: {
      zh: '桃園市大溪',
      en: 'Daxi, Taoyuan'
    },
    name: {
      zh: '大溪豆干',
      en: 'Daxi Dried Tofu'
    },
    flavors: {
      zh: [
        '豆香',
        '滷味',
        '紮實'
      ],
      en: [
        'soybean',
        'braised',
        'firm'
      ]
    },
    allergens: [
      'soy'
    ]
  },
  {
    id: 'food-central-sun-cake',
    number: 6,
    classic: true,
    region: 'central',
    place: {
      zh: '臺中市',
      en: 'Taichung'
    },
    name: {
      zh: '太陽餅',
      en: 'Sun Cake'
    },
    flavors: {
      zh: [
        '酥香',
        '麥芽甜',
        '奶香'
      ],
      en: [
        'flaky',
        'malt-sweet',
        'buttery'
      ]
    },
    allergens: [
      'gluten',
      'milk'
    ]
  },
  {
    id: 'food-central-changhua-bawan',
    number: 7,
    classic: true,
    region: 'central',
    place: {
      zh: '彰化縣',
      en: 'Changhua'
    },
    name: {
      zh: '彰化肉圓',
      en: 'Changhua Ba-wan'
    },
    flavors: {
      zh: [
        '彈Q',
        '肉香',
        '甜鹹'
      ],
      en: [
        'bouncy',
        'meaty',
        'sweet-savory'
      ]
    },
    allergens: [
      'pork',
      'soy'
    ]
  },
  {
    id: 'food-central-puli-shaoxing',
    number: 8,
    classic: true,
    region: 'central',
    place: {
      zh: '南投縣埔里',
      en: 'Puli, Nantou'
    },
    name: {
      zh: '埔里紹興料理',
      en: 'Puli Shaoxing Cuisine'
    },
    flavors: {
      zh: [
        '酒香',
        '甘醇',
        '發酵'
      ],
      en: [
        'wine aroma',
        'mellow',
        'fermented'
      ]
    },
    allergens: [
      'alcohol',
      'varies'
    ]
  },
  {
    id: 'food-central-hakka-lei-cha',
    number: 9,
    classic: false,
    region: 'central',
    place: {
      zh: '苗栗縣',
      en: 'Miaoli'
    },
    name: {
      zh: '客家擂茶',
      en: 'Hakka Lei Cha'
    },
    flavors: {
      zh: [
        '茶香',
        '堅果',
        '穀物'
      ],
      en: [
        'tea',
        'nutty',
        'grain'
      ]
    },
    allergens: [
      'peanut',
      'sesame'
    ]
  },
  {
    id: 'food-central-gukeng-coffee',
    number: 10,
    classic: false,
    region: 'central',
    place: {
      zh: '雲林縣古坑',
      en: 'Gukeng, Yunlin'
    },
    name: {
      zh: '古坑咖啡',
      en: 'Gukeng Coffee'
    },
    flavors: {
      zh: [
        '烘焙',
        '果香',
        '堅果'
      ],
      en: [
        'roasted',
        'fruity',
        'nutty'
      ]
    },
    allergens: [
      'caffeine'
    ]
  },
  {
    id: 'food-south-turkey-rice',
    number: 11,
    classic: true,
    region: 'south',
    place: {
      zh: '嘉義市',
      en: 'Chiayi'
    },
    name: {
      zh: '火雞肉飯',
      en: 'Turkey Rice'
    },
    flavors: {
      zh: [
        '肉香',
        '油蔥',
        '鹹鮮'
      ],
      en: [
        'turkey',
        'shallot',
        'savory'
      ]
    },
    allergens: [
      'soy'
    ]
  },
  {
    id: 'food-south-tainan-beef-soup',
    number: 12,
    classic: true,
    region: 'south',
    place: {
      zh: '臺南市',
      en: 'Tainan'
    },
    name: {
      zh: '臺南牛肉湯',
      en: 'Tainan Beef Soup'
    },
    flavors: {
      zh: [
        '清甜',
        '鮮嫩',
        '薑香'
      ],
      en: [
        'clean-sweet',
        'tender',
        'ginger'
      ]
    },
    allergens: [
      'beef'
    ]
  },
  {
    id: 'food-south-papaya-milk',
    number: 13,
    classic: true,
    region: 'south',
    place: {
      zh: '高雄市',
      en: 'Kaohsiung'
    },
    name: {
      zh: '木瓜牛奶',
      en: 'Papaya Milk'
    },
    flavors: {
      zh: [
        '果甜',
        '乳香',
        '冰涼'
      ],
      en: [
        'fruity',
        'milky',
        'chilled'
      ]
    },
    allergens: [
      'milk'
    ]
  },
  {
    id: 'food-south-wanluan-pork',
    number: 14,
    classic: false,
    region: 'south',
    place: {
      zh: '屏東縣萬巒',
      en: 'Wanluan, Pingtung'
    },
    name: {
      zh: '萬巒豬腳',
      en: 'Wanluan Pork Knuckle'
    },
    flavors: {
      zh: [
        '滷香',
        '膠質',
        '蒜味'
      ],
      en: [
        'braised',
        'gelatinous',
        'garlicky'
      ]
    },
    allergens: [
      'pork',
      'soy'
    ]
  },
  {
    id: 'food-south-coffin-bread',
    number: 15,
    classic: false,
    region: 'south',
    place: {
      zh: '臺南市',
      en: 'Tainan'
    },
    name: {
      zh: '棺材板',
      en: 'Coffin Bread'
    },
    flavors: {
      zh: [
        '酥脆',
        '奶香',
        '鹹甜'
      ],
      en: [
        'crisp',
        'creamy',
        'savory-sweet'
      ]
    },
    allergens: [
      'gluten',
      'milk',
      'possible-shellfish'
    ]
  },
  {
    id: 'food-east-hualien-mochi',
    number: 16,
    classic: true,
    region: 'east',
    place: {
      zh: '花蓮縣',
      en: 'Hualien'
    },
    name: {
      zh: '花蓮麻糬',
      en: 'Hualien Mochi'
    },
    flavors: {
      zh: [
        '糯米',
        '柔Q',
        '甜餡'
      ],
      en: [
        'glutinous rice',
        'soft-chewy',
        'sweet filling'
      ]
    },
    allergens: [
      'peanut',
      'sesame'
    ]
  },
  {
    id: 'food-east-chishang-rice',
    number: 17,
    classic: true,
    region: 'east',
    place: {
      zh: '臺東縣池上',
      en: 'Chishang, Taitung'
    },
    name: {
      zh: '池上米便當',
      en: 'Chishang Rice Bento'
    },
    flavors: {
      zh: [
        '米香',
        '家常',
        '鹹香'
      ],
      en: [
        'rice aroma',
        'homestyle',
        'savory'
      ]
    },
    allergens: [
      'egg',
      'soy'
    ]
  },
  {
    id: 'food-east-yilan-duck',
    number: 18,
    classic: true,
    region: 'east',
    place: {
      zh: '宜蘭縣',
      en: 'Yilan'
    },
    name: {
      zh: '甘蔗燻鴨',
      en: 'Sugarcane-Smoked Duck'
    },
    flavors: {
      zh: [
        '煙燻',
        '甘甜',
        '肉香'
      ],
      en: [
        'smoky',
        'gently sweet',
        'savory'
      ]
    },
    allergens: [
      'duck'
    ]
  },
  {
    id: 'food-east-hualien-chili',
    number: 19,
    classic: false,
    region: 'east',
    place: {
      zh: '花蓮縣',
      en: 'Hualien'
    },
    name: {
      zh: '剝皮辣椒',
      en: 'Peeled Chili Peppers'
    },
    flavors: {
      zh: [
        '微辣',
        '脆口',
        '鹹甜'
      ],
      en: [
        'mild heat',
        'crisp',
        'sweet-savory'
      ]
    },
    allergens: [
      'soy'
    ]
  },
  {
    id: 'food-east-taitung-roselle',
    number: 20,
    classic: false,
    region: 'east',
    place: {
      zh: '臺東縣',
      en: 'Taitung'
    },
    name: {
      zh: '洛神花蜜餞',
      en: 'Candied Roselle'
    },
    flavors: {
      zh: [
        '酸甜',
        '花果香',
        '清脆'
      ],
      en: [
        'tart-sweet',
        'floral-fruity',
        'crisp'
      ]
    },
    allergens: []
  },
  {
    id: 'food-offshore-penghu-brown-sugar',
    number: 21,
    classic: true,
    region: 'offshore',
    place: {
      zh: '澎湖縣',
      en: 'Penghu'
    },
    name: {
      zh: '黑糖糕',
      en: 'Brown Sugar Cake'
    },
    flavors: {
      zh: [
        '黑糖',
        '蓬鬆',
        '焦香'
      ],
      en: [
        'brown sugar',
        'springy',
        'caramel'
      ]
    },
    allergens: [
      'gluten'
    ]
  },
  {
    id: 'food-offshore-penghu-cactus',
    number: 22,
    classic: true,
    region: 'offshore',
    place: {
      zh: '澎湖縣',
      en: 'Penghu'
    },
    name: {
      zh: '仙人掌冰',
      en: 'Cactus Fruit Ice'
    },
    flavors: {
      zh: [
        '酸甜',
        '冰涼',
        '果香'
      ],
      en: [
        'tart-sweet',
        'icy',
        'fruity'
      ]
    },
    allergens: []
  },
  {
    id: 'food-offshore-kinmen-congee',
    number: 23,
    classic: true,
    region: 'offshore',
    place: {
      zh: '金門縣',
      en: 'Kinmen'
    },
    name: {
      zh: '廣東粥',
      en: 'Kinmen Cantonese Congee'
    },
    flavors: {
      zh: [
        '綿滑',
        '鮮味',
        '暖胃'
      ],
      en: [
        'silky',
        'umami',
        'comforting'
      ]
    },
    allergens: [
      'egg',
      'possible-shellfish'
    ]
  },
  {
    id: 'food-offshore-kinmen-peanut-candy',
    number: 24,
    classic: false,
    region: 'offshore',
    place: {
      zh: '金門縣',
      en: 'Kinmen'
    },
    name: {
      zh: '貢糖',
      en: 'Kinmen Peanut Candy'
    },
    flavors: {
      zh: [
        '花生',
        '酥鬆',
        '甜香'
      ],
      en: [
        'peanut',
        'crumbly',
        'sweet'
      ]
    },
    allergens: [
      'peanut'
    ]
  },
  {
    id: 'food-offshore-matsu-fish-noodles',
    number: 25,
    classic: false,
    region: 'offshore',
    place: {
      zh: '連江縣馬祖',
      en: 'Matsu Islands'
    },
    name: {
      zh: '馬祖魚麵',
      en: 'Matsu Fish Noodles'
    },
    flavors: {
      zh: [
        '海味',
        '彈牙',
        '鮮香'
      ],
      en: [
        'ocean savor',
        'springy',
        'umami'
      ]
    },
    allergens: [
      'fish',
      'gluten'
    ]
  }
] as const satisfies readonly TaiwanFoodSubject[]
