import type { TaiwanFoodPromptType, TaiwanFoodQuestion } from '../types'

export const TAIWAN_FOOD_PROMPTS: Record<TaiwanFoodPromptType, { zh: string, en: string, icon: string }> = {
  'taste-talk': { zh: '味覺真心話', en: 'Taste Talk', icon: '◇' },
  'food-dare': { zh: '美食小挑戰', en: 'Food Dare', icon: '△' },
  'travel-surprise': { zh: '旅行驚喜', en: 'Travel Surprise', icon: '?' },
}

export const TAIWAN_FOOD_QUESTIONS = [
  {
    id: 'question-food-north-beef-noodles-standard',
    promptType: 'taste-talk',
    audience: 'standard',
    text: {
      zh: '分享一道你願意專程跨城去吃的料理。',
      en: 'Share one dish you would cross a city to eat.'
    }
  },
  {
    id: 'question-food-north-beef-noodles-spicy',
    promptType: 'taste-talk',
    audience: 'optional-spicy',
    text: {
      zh: '說出一位你願意陪他排一小時美食隊的人。',
      en: 'Name someone you would happily queue an hour for food with.'
    }
  },
  {
    id: 'question-food-north-iron-eggs-standard',
    promptType: 'food-dare',
    audience: 'standard',
    text: {
      zh: '用三個動作演出「在淡水迎著海風吃點心」，讓大家猜。',
      en: 'Mime “eating a snack in Tamsui’s sea breeze” in three moves for the group to guess.'
    }
  },
  {
    id: 'question-food-north-iron-eggs-spicy',
    promptType: 'food-dare',
    audience: 'optional-spicy',
    text: {
      zh: '和自願的玩家對看五秒，先笑的人分享一次心動旅行。',
      en: 'Hold eye contact with a willing player for five seconds; the first to laugh shares a travel crush story.'
    }
  },
  {
    id: 'question-food-north-hsinchu-rice-noodles-standard',
    promptType: 'travel-surprise',
    audience: 'standard',
    text: {
      zh: '全員同時選「炒米粉」或「湯米粉」，少數派說服大家一次。',
      en: 'Everyone chooses fried or soup rice noodles; the minority gets one pitch to persuade the table.'
    }
  },
  {
    id: 'question-food-north-hsinchu-rice-noodles-spicy',
    promptType: 'travel-surprise',
    audience: 'optional-spicy',
    text: {
      zh: '選一位自願玩家，替彼此取一個只在今晚使用的旅行綽號。',
      en: 'Choose a willing player and give each other travel nicknames used only tonight.'
    }
  },
  {
    id: 'question-food-north-keelung-tempura-standard',
    promptType: 'taste-talk',
    audience: 'standard',
    text: {
      zh: '你最想和哪一種個性的人一起逛夜市，為什麼？',
      en: 'What kind of personality makes your ideal night-market companion, and why?'
    }
  },
  {
    id: 'question-food-north-keelung-tempura-spicy',
    promptType: 'taste-talk',
    audience: 'optional-spicy',
    text: {
      zh: '說出你在約會中最容易被哪個小動作打動。',
      en: 'Share the small gesture most likely to charm you on a date.'
    }
  },
  {
    id: 'question-food-north-daxi-tofu-standard',
    promptType: 'food-dare',
    audience: 'standard',
    text: {
      zh: '在十秒內替豆干設計一句不超過八字的旅行廣告詞。',
      en: 'Create a travel slogan of no more than eight words for dried tofu in ten seconds.'
    }
  },
  {
    id: 'question-food-north-daxi-tofu-spicy',
    promptType: 'food-dare',
    audience: 'optional-spicy',
    text: {
      zh: '用一句不露骨的話，稱讚自願玩家很有魅力。',
      en: 'Give a willing player one charming but non-explicit compliment.'
    }
  },
  {
    id: 'question-food-central-sun-cake-standard',
    promptType: 'travel-surprise',
    audience: 'standard',
    text: {
      zh: '全員投票：點心要完整分享，還是最後一口一定留給自己？',
      en: 'Vote together: share the whole pastry, or always save the final bite for yourself?'
    }
  },
  {
    id: 'question-food-central-sun-cake-spicy',
    promptType: 'travel-surprise',
    audience: 'optional-spicy',
    text: {
      zh: '選一位自願玩家，交換彼此心中最理想的週末行程。',
      en: 'Choose a willing player and exchange your ideal weekend plans.'
    }
  },
  {
    id: 'question-food-central-changhua-bawan-standard',
    promptType: 'taste-talk',
    audience: 'standard',
    text: {
      zh: '你對食物口感最堅持的是酥、脆、Q、嫩中的哪一種？',
      en: 'Which food texture do you defend most strongly: flaky, crisp, chewy, or tender?'
    }
  },
  {
    id: 'question-food-central-changhua-bawan-spicy',
    promptType: 'taste-talk',
    audience: 'optional-spicy',
    text: {
      zh: '分享一項你嘴上說隨便、其實非常在意的約會細節。',
      en: 'Share one date detail you pretend is unimportant but secretly care about.'
    }
  },
  {
    id: 'question-food-central-puli-shaoxing-standard',
    promptType: 'food-dare',
    audience: 'standard',
    text: {
      zh: '不喝也可以：用播音員語氣介紹一桌「紹興料理宴」。',
      en: 'No drinking required: introduce a “Shaoxing feast” in your best announcer voice.'
    }
  },
  {
    id: 'question-food-central-puli-shaoxing-spicy',
    promptType: 'food-dare',
    audience: 'optional-spicy',
    text: {
      zh: '分享一次你因氣氛太好而捨不得結束的夜晚。',
      en: 'Share a night you wished would not end because the mood was so good.'
    }
  },
  {
    id: 'question-food-central-hakka-lei-cha-standard',
    promptType: 'travel-surprise',
    audience: 'standard',
    text: {
      zh: '每人選一種代表自己的材料，合組今晚的「友情擂茶」。',
      en: 'Each person chooses one ingredient that represents them to compose tonight’s “friendship lei cha.”'
    }
  },
  {
    id: 'question-food-central-hakka-lei-cha-spicy',
    promptType: 'travel-surprise',
    audience: 'optional-spicy',
    text: {
      zh: '每人選一個代表自己戀愛風格的味道，不能重複。',
      en: 'Each person chooses a flavor for their dating style; no repeats.'
    }
  },
  {
    id: 'question-food-central-gukeng-coffee-standard',
    promptType: 'taste-talk',
    audience: 'standard',
    text: {
      zh: '你最想和誰坐下來慢慢喝一杯，不談工作？',
      en: 'Who would you most like to sit with over a slow drink and no work talk?'
    }
  },
  {
    id: 'question-food-central-gukeng-coffee-spicy',
    promptType: 'taste-talk',
    audience: 'optional-spicy',
    text: {
      zh: '說出你最喜歡別人用哪一種方式主動靠近你。',
      en: 'Share how you most enjoy someone making the first move.'
    }
  },
  {
    id: 'question-food-south-turkey-rice-standard',
    promptType: 'food-dare',
    audience: 'standard',
    text: {
      zh: '用美食評審口吻，給一碗想像中的火雞肉飯十五秒講評。',
      en: 'Give an imaginary bowl of turkey rice a fifteen-second food-judge review.'
    }
  },
  {
    id: 'question-food-south-turkey-rice-spicy',
    promptType: 'food-dare',
    audience: 'optional-spicy',
    text: {
      zh: '描述你的理想約會，只能使用三個食物形容詞。',
      en: 'Describe your ideal date using only three food adjectives.'
    }
  },
  {
    id: 'question-food-south-tainan-beef-soup-standard',
    promptType: 'travel-surprise',
    audience: 'standard',
    text: {
      zh: '全員選擇早餐派或宵夜派，少數派指定下一位抽卡者。',
      en: 'Everyone chooses breakfast or late-night food; the minority picks the next drawer.'
    }
  },
  {
    id: 'question-food-south-tainan-beef-soup-spicy',
    promptType: 'travel-surprise',
    audience: 'optional-spicy',
    text: {
      zh: '分享你最想和曖昧對象一起吃的早餐。',
      en: 'Share the breakfast you would most like to have with a crush.'
    }
  },
  {
    id: 'question-food-south-papaya-milk-standard',
    promptType: 'taste-talk',
    audience: 'standard',
    text: {
      zh: '哪一種味道最像你的夏天記憶？',
      en: 'Which flavor best resembles your memory of summer?'
    }
  },
  {
    id: 'question-food-south-papaya-milk-spicy',
    promptType: 'taste-talk',
    audience: 'optional-spicy',
    text: {
      zh: '分享一個讓你瞬間覺得某人很可愛的時刻。',
      en: 'Share a moment that instantly made someone seem adorable to you.'
    }
  },
  {
    id: 'question-food-south-wanluan-pork-standard',
    promptType: 'food-dare',
    audience: 'standard',
    text: {
      zh: '模仿一位熱情主人招呼全桌「再吃一塊」，但不能碰任何人。',
      en: 'Act like a generous host urging everyone to take another piece, without touching anyone.'
    }
  },
  {
    id: 'question-food-south-wanluan-pork-spicy',
    promptType: 'food-dare',
    audience: 'optional-spicy',
    text: {
      zh: '選一位自願玩家，說出你覺得他最有吸引力的非外貌特質。',
      en: 'Choose a willing player and name their most attractive non-physical quality.'
    }
  },
  {
    id: 'question-food-south-coffin-bread-standard',
    promptType: 'travel-surprise',
    audience: 'standard',
    text: {
      zh: '全員替這道料理想一個比較浪漫的新名字，投票選冠軍。',
      en: 'Everyone invents a more romantic name for this dish, then votes for a winner.'
    }
  },
  {
    id: 'question-food-south-coffin-bread-spicy',
    promptType: 'travel-surprise',
    audience: 'optional-spicy',
    text: {
      zh: '替今晚的一段曖昧氣氛取一個電影片名。',
      en: 'Give one flirtatious mood from tonight its own movie title.'
    }
  },
  {
    id: 'question-food-east-hualien-mochi-standard',
    promptType: 'taste-talk',
    audience: 'standard',
    text: {
      zh: '分享一份你收到後真的有被記住的旅行伴手禮。',
      en: 'Share a travel gift that genuinely made you feel remembered.'
    }
  },
  {
    id: 'question-food-east-hualien-mochi-spicy',
    promptType: 'taste-talk',
    audience: 'optional-spicy',
    text: {
      zh: '說出你最希望某人記住你的哪一個特質。',
      en: 'Share the quality you most hope someone remembers about you.'
    }
  },
  {
    id: 'question-food-east-chishang-rice-standard',
    promptType: 'food-dare',
    audience: 'standard',
    text: {
      zh: '用手勢排出你的夢幻便當四格，讓大家猜每一格。',
      en: 'Mime the four sections of your dream bento and let the group guess each one.'
    }
  },
  {
    id: 'question-food-east-chishang-rice-spicy',
    promptType: 'food-dare',
    audience: 'optional-spicy',
    text: {
      zh: '如果雙人旅行只能帶一位在場玩家，你會選擇哪種同行特質？',
      en: 'For a two-person trip, which companion quality from this group would you choose?'
    }
  },
  {
    id: 'question-food-east-yilan-duck-standard',
    promptType: 'travel-surprise',
    audience: 'standard',
    text: {
      zh: '全員選山線或海線，票數較少的一方決定下一張地區。',
      en: 'Everyone picks mountain route or coast route; the smaller group chooses the next region.'
    }
  },
  {
    id: 'question-food-east-yilan-duck-spicy',
    promptType: 'travel-surprise',
    audience: 'optional-spicy',
    text: {
      zh: '全員票選最適合約會的旅行天氣，說明原因。',
      en: 'Vote on the best dating weather and explain the choice.'
    }
  },
  {
    id: 'question-food-east-hualien-chili-standard',
    promptType: 'taste-talk',
    audience: 'standard',
    text: {
      zh: '你的個性辣度是一到五的哪一級，什麼情況會升級？',
      en: 'Rate your personality heat from one to five, and say what makes it rise.'
    }
  },
  {
    id: 'question-food-east-hualien-chili-spicy',
    promptType: 'taste-talk',
    audience: 'optional-spicy',
    text: {
      zh: '分享一句你敢想卻平常不敢主動說的約會邀請。',
      en: 'Share a date invitation you can imagine but rarely dare to say first.'
    }
  },
  {
    id: 'question-food-east-taitung-roselle-standard',
    promptType: 'food-dare',
    audience: 'standard',
    text: {
      zh: '用一句話演出先酸後甜的旅行故事。',
      en: 'Perform a one-sentence travel story that starts tart and ends sweet.'
    }
  },
  {
    id: 'question-food-east-taitung-roselle-spicy',
    promptType: 'food-dare',
    audience: 'optional-spicy',
    text: {
      zh: '分享一段起初尷尬、後來讓你微笑的相遇。',
      en: 'Share an encounter that began awkwardly and later made you smile.'
    }
  },
  {
    id: 'question-food-offshore-penghu-brown-sugar-standard',
    promptType: 'travel-surprise',
    audience: 'standard',
    text: {
      zh: '全員決定：旅行甜點要第一天吃完，還是留到最後一天？',
      en: 'Decide together: finish the travel sweets on day one, or save them for the final day?'
    }
  },
  {
    id: 'question-food-offshore-penghu-brown-sugar-spicy',
    promptType: 'travel-surprise',
    audience: 'optional-spicy',
    text: {
      zh: '全員各說一種最容易讓自己心軟的甜蜜話語類型。',
      en: 'Everyone names the kind of sweet words most likely to soften them.'
    }
  },
  {
    id: 'question-food-offshore-penghu-cactus-standard',
    promptType: 'taste-talk',
    audience: 'standard',
    text: {
      zh: '哪一種顏色最能代表你現在的旅行心情？',
      en: 'Which color best represents your travel mood right now?'
    }
  },
  {
    id: 'question-food-offshore-penghu-cactus-spicy',
    promptType: 'taste-talk',
    audience: 'optional-spicy',
    text: {
      zh: '用一種顏色形容你對在場某人的第一印象，不必說名字。',
      en: 'Use one color for your first impression of someone here, without naming them.'
    }
  },
  {
    id: 'question-food-offshore-kinmen-congee-standard',
    promptType: 'food-dare',
    audience: 'standard',
    text: {
      zh: '用最溫柔的語氣，邀請全桌明天一起吃早餐。',
      en: 'Invite the whole table to breakfast tomorrow in your gentlest voice.'
    }
  },
  {
    id: 'question-food-offshore-kinmen-congee-spicy',
    promptType: 'food-dare',
    audience: 'optional-spicy',
    text: {
      zh: '向一位自願玩家說一句只適合清晨聽的溫柔稱讚。',
      en: 'Give a willing player one gentle compliment fit for an early morning.'
    }
  },
  {
    id: 'question-food-offshore-kinmen-peanut-candy-standard',
    promptType: 'travel-surprise',
    audience: 'standard',
    text: {
      zh: '全員各選一樣最想收到的地方點心，不能和前一位重複。',
      en: 'Everyone names a local sweet they would love to receive, without repeating the previous player.'
    }
  },
  {
    id: 'question-food-offshore-kinmen-peanut-candy-spicy',
    promptType: 'travel-surprise',
    audience: 'optional-spicy',
    text: {
      zh: '如果要送點心暗示好感，你會選甜、酸、苦還是辣？',
      en: 'If a snack hinted at attraction, would you choose sweet, tart, bitter, or spicy?'
    }
  },
  {
    id: 'question-food-offshore-matsu-fish-noodles-standard',
    promptType: 'taste-talk',
    audience: 'standard',
    text: {
      zh: '分享一座你願意搭很久交通工具去看的島。',
      en: 'Share an island you would endure a long journey to see.'
    }
  },
  {
    id: 'question-food-offshore-matsu-fish-noodles-spicy',
    promptType: 'taste-talk',
    audience: 'optional-spicy',
    text: {
      zh: '說出你願意和什麼樣的人一起迷路，仍覺得浪漫。',
      en: 'Describe the kind of person you could get lost with and still find it romantic.'
    }
  }
] as const satisfies readonly TaiwanFoodQuestion[]
