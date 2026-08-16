import type { Card, Level, QuestionDepth } from '../types'

export const SHINE_QUESTION_PACK_ID = 'shine-question-book'

export const SHINE_DEPTHS: Record<QuestionDepth, { symbol: string, zh: string, en: string, level: Level }> = {
  ice: { symbol: '☆', zh: '暖身破冰', en: 'Break the Ice', level: 1 },
  one: { symbol: '★', zh: '一星連結', en: 'One-Star Connection', level: 2 },
  two: { symbol: '★★', zh: '二星連結', en: 'Two-Star Connection', level: 3 },
  three: { symbol: '★★★', zh: '三星連結', en: 'Three-Star Connection', level: 4 },
}

type ShineQuestion = Omit<Card, 'id' | 'level' | 'packId'> & { number: number, depth: QuestionDepth }

const questions: ShineQuestion[] = [
  { number: 1, depth: 'ice', mode: 'truth', kind: 'question', enTitle: 'GRATITUDE CHECK', zhTitle: '感恩時刻', en: 'Share two things you’re grateful for today.', zh: '分享兩件你今天感恩的事情。' },
  { number: 2, depth: 'ice', mode: 'truth', kind: 'question', enTitle: 'HOW DO YOU SHOW LOVE?', zhTitle: '你如何表達愛？', en: 'How do you usually express love in your daily life?', zh: '你平常如何在生活中表達「愛」？' },
  { number: 3, depth: 'ice', mode: 'dare', kind: 'activity', enTitle: 'GROUP SELFIE TIME!', zhTitle: '團體自拍時間', en: 'Take a group photo together and post it.', zh: '所有玩家一起合照一張，並上傳打卡。' },
  { number: 4, depth: 'ice', mode: 'dare', kind: 'activity', enTitle: 'SING IT OUT!', zhTitle: '唱出來！', en: 'Each player has 10 seconds to sing their favorite song.', zh: '每位玩家用 10 秒唱一首自己最喜歡的歌。' },
  { number: 5, depth: 'ice', mode: 'dare', kind: 'activity', enTitle: 'FUNNY FACE CHALLENGE', zhTitle: '鬼臉挑戰', en: 'Pick two players to make their funniest faces and take a picture together.', zh: '指定兩位玩家一起扮鬼臉，並拍一張合照。' },
  { number: 6, depth: 'ice', mode: 'dare', kind: 'activity', enTitle: 'PHOTO STORY', zhTitle: '照片故事', en: 'Open your phone, choose a recent photo, and tell the story behind it.', zh: '打開手機，挑一張最近拍的照片，分享它背後的故事。' },
  { number: 7, depth: 'ice', mode: 'truth', kind: 'question', enTitle: 'WHO ARE YOU, REALLY?', zhTitle: '真實的你', en: 'How do you think people see you? Have you ever done something completely opposite to that image?', zh: '你覺得別人眼中的你是什麼樣子？你有沒有做過完全不符合這個形象的事情？' },
  { number: 8, depth: 'ice', mode: 'truth', kind: 'question', enTitle: 'LABEL YOURSELF', zhTitle: '三個代表你的標籤', en: 'Think of three words that represent you and explain why you chose them.', zh: '想出三個最能代表自己的詞，並分享為什麼選擇它們。' },
  { number: 9, depth: 'ice', mode: 'dare', kind: 'activity', enTitle: 'THROWBACK TIME!', zhTitle: '童年回顧', en: 'Show everyone a childhood photo of yourself.', zh: '分享一張自己小時候的照片給大家看。' },

  { number: 10, depth: 'one', mode: 'truth', kind: 'question', enTitle: 'MEMORABLE BOOK OR MOVIE', zhTitle: '難忘的書或電影', en: 'Is there a book or movie that left a deep impression on you? Why?', zh: '有沒有一本書或一部電影讓你印象非常深刻？為什麼？' },
  { number: 11, depth: 'one', mode: 'truth', kind: 'question', enTitle: 'INTROVERT OR EXTROVERT?', zhTitle: '內向還是外向？', en: 'Do you see yourself as more introverted or extroverted? Share an example.', zh: '你覺得自己比較偏內向還是外向？分享一個具體例子。' },
  { number: 12, depth: 'one', mode: 'truth', kind: 'question', enTitle: 'YOUR SOCIAL SUPERPOWER', zhTitle: '你的社交超能力', en: 'What’s your biggest strength in social situations?', zh: '你覺得自己在社交場合中最大的優勢是什麼？' },
  { number: 13, depth: 'one', mode: 'truth', kind: 'question', enTitle: 'REWIND TIME', zhTitle: '回到某個年紀', en: 'If you could go back to a certain age, which age would you choose? Why?', zh: '如果可以回到某個年齡，你最想回到幾歲？為什麼？' },
  { number: 14, depth: 'one', mode: 'truth', kind: 'question', enTitle: 'YOUR RELAXATION RITUAL', zhTitle: '你的放鬆儀式', en: 'What helps you relax or feel at peace the most?', zh: '什麼事情最能讓你放鬆或感到平靜？' },
  { number: 15, depth: 'one', mode: 'dare', kind: 'activity', enTitle: 'FIRST IMPRESSIONS', zhTitle: '第一印象', en: 'Everyone shares their first impression of the person who drew the card.', zh: '每位玩家分享自己對抽卡者的第一印象。' },
  { number: 16, depth: 'one', mode: 'dare', kind: 'activity', enTitle: 'SAY SOMETHING NICE!', zhTitle: '說句好話', en: 'Everyone shares something with the card-drawer: a thank-you, a compliment, or a blessing.', zh: '每個人對抽卡者說一句話，可以是感謝、稱讚或祝福。' },
  { number: 17, depth: 'one', mode: 'truth', kind: 'question', enTitle: 'FAVORITE CHILDHOOD CARTOON / ANIME', zhTitle: '童年最愛卡通／動畫', en: 'What was your favorite cartoon or anime as a kid?', zh: '你小時候最喜歡哪一部卡通或動畫？' },
  { number: 18, depth: 'one', mode: 'truth', kind: 'question', enTitle: 'INSTANT TALENT', zhTitle: '瞬間掌握一項才能', en: 'If you could instantly master one skill, what would it be?', zh: '如果你可以瞬間精通一項技能，你會選什麼？' },
  { number: 19, depth: 'one', mode: 'truth', kind: 'question', enTitle: 'A MEANINGFUL QUOTE', zhTitle: '影響你的一句話', en: 'Share a quote you love. How has it influenced you?', zh: '分享一句你很喜歡的話。它如何影響了你？' },
  { number: 20, depth: 'one', mode: 'truth', kind: 'question', enTitle: 'A FUNNY OR HAPPY MOMENT', zhTitle: '最近的快樂時刻', en: 'Share something that made you laugh or feel happy recently.', zh: '分享一個最近讓你覺得好笑或開心的時刻。' },
  { number: 21, depth: 'one', mode: 'truth', kind: 'question', enTitle: 'GO-TO HOBBY', zhTitle: '你的休閒首選', en: 'What’s your favorite leisure activity outside of work or study?', zh: '工作或學習之外，你最喜歡的休閒活動是什麼？' },
  { number: 22, depth: 'one', mode: 'truth', kind: 'question', enTitle: 'NEW HABIT TO ADOPT', zhTitle: '想培養的新習慣', en: 'What new habit would you like to integrate into your life?', zh: '你想要在生活中培養什麼新的習慣？' },
  { number: 23, depth: 'one', mode: 'truth', kind: 'question', enTitle: 'FIRST JOB EXPERIENCE', zhTitle: '第一份工作', en: 'What was your first job like? Any special memories?', zh: '你的第一份工作是什麼樣子？有什麼特別的回憶嗎？' },
  { number: 24, depth: 'one', mode: 'truth', kind: 'question', enTitle: 'KEY TO LASTING FRIENDSHIPS', zhTitle: '長久友誼的關鍵', en: 'What do you think is the most important factor in maintaining a friendship?', zh: '你覺得維持一段長久友誼最重要的元素是什麼？' },
  { number: 25, depth: 'one', mode: 'truth', kind: 'question', enTitle: 'UNFORGETTABLE CHILDHOOD MEMORY', zhTitle: '難忘的童年回憶', en: 'What’s a childhood memory that has stayed with you?', zh: '關於童年，你最難忘的一段記憶是什麼？' },
  { number: 26, depth: 'one', mode: 'truth', kind: 'question', enTitle: 'A LUCKY MOMENT', zhTitle: '幸運時刻', en: 'Talk about something that made you feel lucky recently.', zh: '分享一件最近讓你覺得自己很幸運的事情。' },
  { number: 27, depth: 'one', mode: 'truth', kind: 'question', enTitle: 'RECENT LIFE LESSON', zhTitle: '最近的人生體悟', en: 'Share something valuable you’ve realized recently.', zh: '分享一個你最近從生活中得到的重要體悟。' },
  { number: 28, depth: 'one', mode: 'truth', kind: 'question', enTitle: 'BEST TYPE OF GIFT', zhTitle: '最喜歡收到的禮物', en: 'What kind of gift do you love receiving the most?', zh: '你最喜歡收到什麼類型的禮物？' },
  { number: 29, depth: 'one', mode: 'truth', kind: 'question', enTitle: 'DINNER WITH A CELEBRITY', zhTitle: '和名人共進晚餐', en: 'If you could have dinner with any celebrity, who would it be? Why?', zh: '如果可以跟任何一位名人一起吃飯，你會選誰？為什麼？' },

  { number: 30, depth: 'two', mode: 'truth', kind: 'question', enTitle: 'SOMETHING YOU PROCRASTINATE', zhTitle: '你一直拖延的改變', en: 'What’s something you know you should change but keep telling yourself there’s still time?', zh: '有什麼事情是你知道應該改變，卻一直告訴自己「還有時間」？' },
  { number: 31, depth: 'two', mode: 'truth', kind: 'question', enTitle: 'OVERCOMING FEAR', zhTitle: '克服恐懼', en: 'Share a time when you faced and overcame a fear. What happened?', zh: '分享一次你面對並克服恐懼的經歷。當時發生了什麼？' },
  { number: 32, depth: 'two', mode: 'truth', kind: 'question', enTitle: 'WHAT MAKES YOU ANGRY?', zhTitle: '什麼最容易讓你生氣？', en: 'What behaviors upset you the most? How do you usually express anger?', zh: '什麼樣的行為最讓你生氣？你通常如何表達憤怒？' },
  { number: 33, depth: 'two', mode: 'truth', kind: 'question', enTitle: 'LAST LIE TO YOUR PARENTS', zhTitle: '最近一次對父母說謊', en: 'What was the last lie you told your parents, and why?', zh: '你最近一次對父母撒謊是什麼？為什麼？' },
  { number: 34, depth: 'two', mode: 'truth', kind: 'question', enTitle: 'SHOWING YOU CARE', zhTitle: '你如何表達在乎', en: 'How do you express care and affection? Do the people around you recognize it?', zh: '你會如何表達關心或在乎？身邊的人能感受到嗎？' },
  { number: 35, depth: 'two', mode: 'dare', kind: 'activity', enTitle: 'ACKNOWLEDGE SOMEONE HERE', zhTitle: '欣賞現場的一個人', en: 'Choose someone here and acknowledge one of their qualities, actions, or a shared memory. How have they impacted you?', zh: '選擇現場一個人，分享你欣賞他的特質、行為或共同回憶。他對你產生了什麼影響？' },
  { number: 36, depth: 'two', mode: 'dare', kind: 'activity', enTitle: 'HOW WOULD OTHERS INTRODUCE YOU?', zhTitle: '別人會怎麼介紹你？', en: 'How would the people here describe you to a stranger? Everyone answers for the card-drawer.', zh: '如果要把抽卡者介紹給陌生人，在場的人會怎麼形容他？由所有玩家回答。' },
  { number: 37, depth: 'two', mode: 'truth', kind: 'question', enTitle: 'FAVORITE PART OF LIFE RIGHT NOW', zhTitle: '現在生活中最喜歡的部分', en: 'What do you love most about your life right now? What need does it fulfill for you?', zh: '你現在生活中最喜歡的是哪個部分？它滿足了你內心什麼樣的需求？' },
  { number: 38, depth: 'two', mode: 'truth', kind: 'question', enTitle: 'FEELING UNHEARD', zhTitle: '不被聽見的時刻', en: 'Share a time when someone important to you ignored your feelings or needs. How did you react?', zh: '分享一次重要的人忽略了你的感受或需求的經歷。當時你怎麼反應？' },
  { number: 39, depth: 'two', mode: 'truth', kind: 'question', enTitle: 'LAST TIME YOU GOT EMOTIONAL', zhTitle: '最近一次紅了眼眶', en: 'When was the last time you teared up? What happened?', zh: '最近一次讓你紅了眼眶或想哭是什麼時候？發生了什麼？' },
  { number: 40, depth: 'two', mode: 'truth', kind: 'question', enTitle: 'FEELING UNDERSTOOD', zhTitle: '被真正理解', en: 'Has someone recently said or done something that made you feel truly understood?', zh: '最近有沒有人說了一句話或做了一件事，讓你感覺「他真的懂我」？' },
  { number: 41, depth: 'two', mode: 'truth', kind: 'question', enTitle: 'YOUR ROLE IN THE FAMILY', zhTitle: '你在家庭中的角色', en: 'How would you describe your role in your family? Do your family members see you the same way?', zh: '你會如何形容自己在家庭中扮演的角色？家人也是這樣看待你的嗎？' },
  { number: 42, depth: 'two', mode: 'truth', kind: 'question', enTitle: 'PERSONAL GROWTH', zhTitle: '你的成長', en: 'In what area have you grown the most? Was that growth inspired by a particular event or person?', zh: '你認為自己在哪個方面成長最多？這份成長是否來自某個重要事件或人物？' },
  { number: 43, depth: 'two', mode: 'truth', kind: 'question', enTitle: 'FROM HEARTBREAK TO SMILE', zhTitle: '從心碎到微笑', en: 'Is there something that once broke your heart but now makes you smile when you think about it?', zh: '有沒有一件事曾經讓你心碎，但現在回想起來已經可以微笑面對？' },
  { number: 44, depth: 'two', mode: 'truth', kind: 'question', enTitle: 'NO-JUDGMENT DREAM', zhTitle: '沒有評價的夢想', en: 'If nobody judged or opposed you, what would you most want to do or accomplish?', zh: '如果沒有人嘲笑、批評或反對你，你最想做成什麼事情？' },
  { number: 45, depth: 'two', mode: 'truth', kind: 'question', enTitle: 'A MOMENT YOU FELT SEEN', zhTitle: '被真正看見的時刻', en: 'Describe a time when someone truly recognized your strengths or qualities. What did they see in you?', zh: '描述一次你真正感覺「被看見」的時刻。對方看見了你哪些特質或優點？' },
  { number: 46, depth: 'two', mode: 'truth', kind: 'question', enTitle: 'IDEAL RELATIONSHIP QUALITIES', zhTitle: '理想關係的特質', en: 'What qualities do you think are essential for a great relationship? Why?', zh: '你認為一段理想的關係需要具備哪些特質？為什麼？' },
  { number: 47, depth: 'two', mode: 'dare', kind: 'activity', enTitle: 'SHOW GRATITUDE', zhTitle: '向一個人表達感謝', en: 'Choose one player and tell them something you’re grateful for. Give them a hug if both of you are comfortable with it.', zh: '選一位玩家，告訴對方一件你感謝他的事情。如果雙方都願意，也可以給對方一個擁抱。' },
  { number: 48, depth: 'two', mode: 'truth', kind: 'question', enTitle: 'YOUR PROUDEST TRAIT', zhTitle: '你最驕傲的特質', en: 'What personal trait are you most proud of? Why?', zh: '你最為自己哪一項個人特質感到驕傲？為什麼？' },

  { number: 49, depth: 'three', mode: 'truth', kind: 'question', enTitle: 'A CORE MEMORY WITH YOUR PARENTS', zhTitle: '與父母的核心回憶', en: 'Share one of your most memorable moments with your parents. Why has it stayed with you?', zh: '分享一個你與父母之間印象最深刻的回憶。為什麼這段記憶一直留在你心中？' },
  { number: 50, depth: 'three', mode: 'truth', kind: 'question', enTitle: 'YOUR CURRENT LIFE CHALLENGE', zhTitle: '目前的人生課題', en: 'What life challenge are you facing right now? What’s holding you back, and how do you plan to overcome it?', zh: '你目前正在面對什麼人生課題？是什麼阻礙著你？你打算如何突破？' },
  { number: 51, depth: 'three', mode: 'truth', kind: 'question', enTitle: 'A MEMORY YOU’D ERASE', zhTitle: '想刪除的一段記憶', en: 'If you could erase one memory, what would it be? If you could go back, would you do anything differently?', zh: '如果可以刪除一段記憶，你會選擇哪一段？如果能重新來過，你會做出不同的選擇嗎？' },
  { number: 52, depth: 'three', mode: 'truth', kind: 'question', enTitle: 'EXPERIENCES THAT REDEFINE YOU', zhTitle: '重新定義你的經歷', en: 'What kinds of experiences can make someone rediscover who they are? Share a turning point in your own life.', zh: '你覺得什麼樣的經歷會讓人重新認識自己？分享一個你人生中的重要轉折點。' },
  { number: 53, depth: 'three', mode: 'truth', kind: 'question', enTitle: 'A LIFE-CHANGING DECISION', zhTitle: '改變人生的決定', en: 'At the end of your life, what decision do you think you’ll be most grateful you made?', zh: '在人生最後回頭看時，你覺得自己會最感謝曾經做過哪個決定？' },
  { number: 54, depth: 'three', mode: 'truth', kind: 'question', enTitle: 'WHAT YOU VALUE IN RELATIONSHIPS', zhTitle: '你在人際關係中珍惜什麼', en: 'What do you most want others to appreciate about you in a relationship? Do you value those same qualities in others?', zh: '在人際關係中，你最希望別人珍惜你的什麼特質？你也同樣珍惜別人身上的這些特質嗎？' },
  { number: 55, depth: 'three', mode: 'truth', kind: 'question', enTitle: 'A RECENT GUILTY MOMENT', zhTitle: '最近感到內疚的事情', en: 'What’s something you did recently that made you feel guilty?', zh: '最近有什麼事情讓你感到內疚？' },
  { number: 56, depth: 'three', mode: 'truth', kind: 'question', enTitle: 'A DREAM LEFT UNFINISHED', zhTitle: '尚未完成的夢想', en: 'What’s something you’ve always wanted to do but haven’t yet? What’s stopping you?', zh: '有什麼事情是你一直很想完成，卻至今還沒有做到？是什麼阻礙著你？' },
  { number: 57, depth: 'three', mode: 'truth', kind: 'question', enTitle: 'FAMILY DYNAMICS', zhTitle: '家庭關係', en: 'What would you most like to change about your family relationships? What’s the biggest challenge to overcome?', zh: '在家庭關係中，你最希望改變的是什麼？最大的障礙或挑戰是什麼？' },
  { number: 58, depth: 'three', mode: 'truth', kind: 'question', enTitle: 'YOUR PERFECT HEALING DAY', zhTitle: '完美療癒日', en: 'What would your ideal self-care or healing day look like? What elements would make it truly restorative for you?', zh: '想像一個完美的療癒日，你會怎麼安排？哪些元素最能真正讓你恢復能量？' },
  { number: 59, depth: 'three', mode: 'truth', kind: 'question', enTitle: 'REBUILDING A RELATIONSHIP', zhTitle: '重新塑造一段關係', en: 'If you could reshape your relationship with someone, what would you change, and why?', zh: '如果可以重新塑造你與某個人的關係，你最希望改變哪個部分？為什麼？' },
  { number: 60, depth: 'three', mode: 'truth', kind: 'question', enTitle: 'YOUR BEST RELATIONSHIP TRAIT', zhTitle: '你在人際關係中的最佳特質', en: 'What quality are you most proud of in your relationships with others? How did you discover this strength?', zh: '在人際關係中，你最為自己哪項特質感到驕傲？你是怎麼發現這項優點的？' },
  { number: 61, depth: 'three', mode: 'truth', kind: 'question', enTitle: 'YOUR BRAVEST DECISION', zhTitle: '你最勇敢的決定', en: 'What’s the bravest decision you’ve ever made? How did you feel at that moment?', zh: '你曾經做過最勇敢的決定是什麼？當時的心情如何？' },
  { number: 62, depth: 'three', mode: 'truth', kind: 'question', enTitle: 'FINDING STRENGTH UNDER PRESSURE', zhTitle: '壓力下找到力量', en: 'How do you motivate yourself and find strength when facing pressure or difficult times?', zh: '面對壓力與挑戰時，你會如何給自己力量與信心？' },
]

export const shineQuestionCards: Card[] = questions.map(question => ({
  ...question,
  id: `shine-${String(question.number).padStart(2, '0')}`,
  level: SHINE_DEPTHS[question.depth].level,
  packId: SHINE_QUESTION_PACK_ID,
}))
