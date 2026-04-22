/* ============================================
   100 Days of You — Script
   
   Features:
   - Password gate → mode selection → app
   - Four modes: Blue (romantic), Red (passionate), Yellow (data), Pink (picture mind)
   - Mode persistence in localStorage
   - Per-mode discovery tracking
   - Visit tracking, time tracking, streak calculation
   - Shuffle, browse, swipe, milestones, easter eggs
   ============================================ */

(() => {
  'use strict';

  // ─── Configuration ───
  const PASSWORD = 'nootnoot';
  const TOTAL_NOTES = 100;
  const PHOTO_NOTES = [3, 7, 12, 18, 23, 29, 34, 41, 47, 53, 58, 64, 71, 78, 85];
  const VIDEO_NOTES = [10, 27, 45, 62, 90];

  const NOTE_COLORS = [
    'color-yellow', 'color-blue', 'color-purple', 'color-pink',
    'color-lavender', 'color-mint', 'color-peach'
  ];

  // ─── Blue Notes (romantic — "if you think the romance is fading") ───
  const blueNotes = [
    "You are delulu in exactly the best way 🩵",
    "It's always been you 🙂‍↕️",
    "From my setter to the love of my life, kismet is an understatement to our origin story 💕",
    "There are so many moments when we make our own language, speak to each other telepathically, and are on the same wavelength *flat earth hand*",
    "Your intelligence, morals, and everything to do with your way of thinking. I love figuring out the best way to handle certain things and we usually come to the same conclusions",
    "~the fog~ 😱🤗 seriously this is a feeling people need drugs to experience. I get it by just looking in your eyes for a bit ☺️",
    "Your drive is so attractive. We have been a bit too obsessed with each other these days, but building a life together with you and squeezing the shit out of life is a life worth living",
    "I love that you feel safe enough to be your true baby self around me. Your aegyo is the only kind I love you cutie patootie",
    "You are the perfect balance of kind and considerate to others while also being confident in yourself and staying true to what you believe in regardless of what others may think. You are a rare breed and one of a kind, sort of like a celebi !",
    "Your nerdy side is actually more of a science/pursuit of knowledge side. You inspire me to have more passion in these sort of endeavors and I not only feel safe to dig too deep into topics, but encouraged 🤓",
    "You aren't just down for everything, you are also good at the things we do together and get things so quickly! Snowboarding, lifting, video games, whatever I throw at you, you're a superstar ⭐️",
    "I know I say you don't need to worry about this, but I do like that you want to maintain this feminine side to you of not smelling your poop and doing your make up so well. No expectation of course because you're beautiful to me all the time, but it tickles my masculinity :)",
    "You are smart, decisive, and thorough when you are called to be. I trust and respect you 🤠",
    "I love that you can sing hehe. I've never been to karaoke with just one person before and our circle date was the most fun I've had singing songs 🥹",
    "You like to eat (yes even when it's snacks 😂) I love feeding you and you're so easy to eat with! Thanks for dealing with my particularity around meal timing 😬",
    "That you are sporty and also driven in the sports you play. Wer going to kill it at 2v2 💪",
    "You have such a cheery bright nature that really only gets shown to close friends and it really shines around me. I love and respect that. I'm so grateful that I get to experience your light honey ☀️",
    "You are strong from past experiences and have only grown from harder parts of your life, rather than letting it change you in a negative way",
    "I'm a lawyer and I don't deal with absolutes, but I can tell you I'll never ditch you 😌",
    "I've been through hell and back in my love life, but I'd go through it all again if it means I get to meet you 🩵💛",
    "Oxytocin, dopamine, serotonin, love you are everything to me :)",
    "You are also someone who doesn't both trust and respect just any type of partner. This was apparent in our competitive friendship, but it's led to such a fulfilling romance and relationship :)",
    "Forever feels too short when it's spent with you 😭 it's really a blessing that we have run into each other in this timeline 💛",
    "We think similarly but you always have a way of asking questions that still make us think and discuss. This leads to hours of deep convos just sitting on our couch 🤗",
    "Your chaotic side 🤪 I embrace this about you and I look forward to those moments when you (rightfully) choose violence",
    "When you do something, you do it right and well. No half-assing",
    "The way you are demure and classy while also down for almost anything :) another very unique combo 🩵",
    "I don't have to choose between looks, kindness, intelligence, drive, and humor because you are THE COMPLETE PACKAGE 🎁 NEVER SETTLE",
    "The way you look at me when you turn around and catch me checking you out",
    "The way you say 'I love you' likes its a fact rather than saying it for me to say it back 😭",
    "I love the contrast you have with your friends and when you're alone with me. I love it even more that the cute side is starting to break through the cracks in front of them LOL",
    "How you want to inspect everything about me haha, I am just as obsessed with you too bb",
    // 33-100: placeholders until Justin provides the rest
    "You make every day brighter ☀️",
    "Your laugh is my favorite sound 🎵",
    "The way you look at me makes me melt 🫠",
    "You're the first person I want to talk to every morning ☀️",
    "Your smile could light up the darkest room ✨",
    "Even your silence feels comfortable to me 🤍",
    "You make the ordinary feel extraordinary 🌟",
    "I love how passionate you are about the things you care about 💫",
    "Your hugs feel like coming home 🏠",
    "Every love song finally makes sense because of you 🎶",
    "You see the best in me, even when I can't see it myself 🪞",
    "Your kindness inspires me to be a better person 💛",
    "I love the little faces you make when you're thinking 🤔",
    "You make me laugh harder than anyone else 😂",
    "The way you hold my hand makes everything feel okay 🤝",
    "You're my safe space 🛡️",
    "I could listen to you talk about anything forever 💬",
    "Your voice is the most comforting thing I know 🎧",
    "You make mundane moments magical ✨",
    "I love how your eyes light up when you're excited 💫",
    "You're the most beautiful person I've ever met 🌸",
    "Your strength amazes me every single day 💪",
    "You make my heart skip a beat every time I see you 💓",
    "I love how you care so deeply about the people in your life 🫶",
    "You have the cutest reactions to everything 🥺",
    "Your happiness is genuinely my happiness too 💛",
    "I love how honest you always are with me 💬",
    "You make the world a better place just by being in it 🌍",
    "Your creativity and imagination blow me away 🎨",
    "I'm so grateful you chose me 🥹",
    "You make even the worst days bearable ☂️",
    "Your optimism is contagious 🌈",
    "I love how you remember the little things 🧠",
    "You give the best advice, even when you don't realize it 💡",
    "Your presence alone is enough to calm my anxiety 🧘",
    "I love the way you scrunch your nose when you laugh 🤭",
    "You make me want to be the best version of myself 🌱",
    "Your stubbornness is secretly one of my favorite things 😤",
    "I could get lost in your eyes forever 👀",
    "You make coffee dates feel like the most romantic thing 🧋",
    "I love how you get excited about small things 🎉",
    "You've taught me what real love feels like 💛",
    "Your scent is my favorite smell in the world 🌸",
    "I love how you can be silly and serious in the same minute 🎭",
    "You're my favorite distraction 😏",
    "I love how you sing along to songs even when you don't know the words 🎤",
    "Your texts make me smile like an idiot every time 📱",
    "You make me believe in happily ever afters 🏰",
    "I love how you care about the world around you 🌎",
    "Your compassion is one of your superpowers 🦸‍♀️",
    "I love the way you say my name 🗣️",
    "You make lazy Sundays feel perfect 🛋️",
    "Your determination inspires me every day 🔥",
    "I love how you notice things others miss 🔍",
    "You're the reason I believe in love at all 💕",
    "Your cooking (or trying to cook) is adorable 🍳",
    "I love how you express yourself so freely 🎨",
    "You make my heart feel full just by existing 🫀",
    "Your cuddles are my absolute favorite thing 🧸",
    "I love how you always know how to make me feel better 💊",
    "You're smarter than you give yourself credit for 🧠",
    "I love the way you get lost in thought 🌌",
    "Your kisses feel like magic 💋",
    "I love how you're not afraid to be yourself 🦋",
    "You make everything more fun 🎡",
    "I love how you care about animals so much 🐾",
    "Your laugh lines are the most beautiful thing 💛",
    "I love how you push me out of my comfort zone 🚀",
    "You're the missing piece I didn't know I needed 🧩",
    "I love how you can make any situation better 💫",
    "Your patience with me means the world 🌸",
    "I love the way you play with my hair ☁️",
    "You're my favorite adventure partner 🗺️",
    "I love how you dream so big 🌠",
    "Your voice is the last thing I want to hear before falling asleep 🌙",
    "I love how you stand up for what you believe in ✊",
    "You make me feel understood like nobody else 💭",
    "Your weird habits are adorable 🤪",
    "I love how you keep me grounded 🌳",
    "You're the most interesting person I know 📚",
    "I love how you see beauty in everything 🌺",
    "Your energy is magnetic ⚡",
    "I love how comfortable silence is with you 🤫",
    "You make me want to protect you and also know you can protect yourself 🛡️",
    "I love how you wear your heart on your sleeve 💝",
    "You're the best thing that's ever happened to me 🌟",
    "I love how you make everyone around you feel special 🎀",
    "Your love language is the most beautiful one 💌",
    "I love how you never give up on things that matter 💎",
    "You make every season feel like my favorite 🍂🌸❄️☀️",
    "I love how you still give me butterflies 🦋",
    "You're my person. Plain and simple. 💛",
    "And I'll love you for 100 more days, and then some more 💛🩵",
    "You make life worth living. Every single day. 🫶"
  ];

  // ─── Red Notes (passionate — "if you want to feel hot and desired") ───
  const redNotes = [
    "Your fatty 😍",
    "Your screams 😏",
    "Them proportions DAMN",
    "Your equal parts cute and beautiful eyes :) (and how they roll back)",
    "The way you stick out your tongue",
    "How 💦 it gets down there",
    "Your small lips…",
    "Your desire to be my sub (your dom will take care of you)",
    "The way you call me daddy",
    "You're just a little too small for me…just a little ;)",
    "How I can grab your slim waist for maximum thrust",
    "You're my sweet sweet virgin ;)",
    "You passed my lessons with flying colors",
    "How you throw your butt in front of me when you're feeling some type of way",
    "How sensitive your nipples are and how you react when I just graze them",
    "You have small face big eyes, slender waist long legs….god tier combo",
    "Collar bone hehe",
    "How you like when I kiss your ear",
    "The dirty talk is CRAZY 🤪",
    "How you come to tears sometimes but just need some reassurance that you're loved",
    "How you made me like you being on top",
    "Selfish of me to say this but I love that I'm here for your sexual awakening of sorts. Daddy will help you make the most of it 😉",
    "How you taste…",
    "When you come I can die happy",
    "How you're a good girl and try to take it even when it's overwhelming",
    "Just thinking about putting my hands all over you can get me going",
    "How your ass is already getting bigger from working out a couple weeks…HUH 😍",
    // 28-100: spicy placeholders
    "Every curve of your body is my favorite 🔥",
    "The way your skin glows after we… 🌟",
    "Your lips are my favorite addiction 😈",
    "The way you bite your bottom lip 😏",
    "How you look first thing in the morning — messy hair, no makeup, perfect 😍",
    "Your thighs… don't get me started 🫠",
    "The way your breathing changes when I'm close 🔥",
    "How you fit perfectly against me 🤤",
    "The sounds you make when you try to be quiet 😏",
    "Your voice when you're whispering in my ear 🥵",
    "The way you pull me closer without meaning to 💕",
    "How you look up at me with those eyes 👀",
    "Your neck is dangerously attractive 😈",
    "The way you react when I tease you 🔥",
    "How your body knows exactly what it wants 😏",
    "The way you trace patterns on my skin 🫠",
    "Your confidence when you're on top of me 😍",
    "How you can't keep your hands to yourself either 🤭",
    "The way you smirk when you know what you're doing 😏",
    "Your hands grabbing the sheets 🔥",
    "How you look when you're trying to catch your breath 😍",
    "The way you bite my shoulder 🔥",
    "How warm you feel pressed against me 🫠",
    "Your stamina surprises me every time 😏",
    "The way you mark me as yours 😈",
    "How you get goosebumps when I touch you just right 🤭",
    "Your sleepy satisfied face is everything 😍",
    "The way you pull me back in for more 🔥",
    "How I can't keep my hands off you even in public 😏",
    "Your body was made for mine 💕",
    "The way you stretch after… 😍",
    "How you get flustered when I stare 🔥",
    "Your legs wrapped around me is home 😏",
    "How you look taking off your clothes 😈",
    "The way you gasp when I find the right spot 🫠",
    "Your everything drives me absolutely crazy 🔥",
    "How you playfully push me away but pull me back 😏",
    "The flush on your cheeks when we're going at it 😍",
    "Your back is a masterpiece 🔥",
    "How you grip me tighter when you're close 🤤",
    "The way you say my name in that tone 😈",
    "Your body heat is intoxicating 🔥",
    "How you look in my clothes… or nothing at all 😏",
    "The way you challenge me to go harder 😍",
    "Your whispered requests that drive me wild 🔥",
    "How perfectly we fit together 😈",
    "The way you blush after we're done 🥰",
    "Your uninhibited side is my favorite side 🔥",
    "How you initiate when you want it 😏",
    "The way your eyes flutter when you're overwhelmed 😍",
    "Your confidence is the sexiest thing about you 🔥",
    "How you make me feel like I've never felt before 😈",
    "The way you look in dim lighting 🫠",
    "Your soft skin against mine is perfection 🔥",
    "How you're insatiable in the best way 😏",
    "The way you bite your lip when you're turned on 😍",
    "Your scent after we've been together 🔥",
    "How you always leave me wanting more 😈",
    "The way you claim me as yours 🔥",
    "Your whole body is a work of art I can't stop touching 🫠",
    "How we can go from zero to a hundred so fast 😏",
    "The way you look at me like I'm the only man alive 🔥",
    "Your touch sets me on fire every single time 😍",
    "How we communicate without words when we're close 🔥",
    "The way you whimper when I pull away 😈",
    "Your hunger for me matches mine exactly 🤤",
    "How you make even the mundane feel electric 🔥",
    "The way you say 'don't stop' 😏",
    "Your passion is unmatched 🔥",
    "How you turn me on without even trying 😈",
    "The way you look disheveled and satisfied 😍",
    "Your body responds to mine like magic 🔥",
    "How you always want more rounds 😏",
    "The way you kiss me when you're wanting 🔥",
    "Your hands grabbing my shirt to pull me in 😈",
    "How nothing else matters when I'm with you like this 🫠",
    "The way you mark my neck 🔥",
    "Your eyes when they go half-lidded 😍",
    "How you make losing control feel like gaining everything 🔥",
    "The way you fall asleep on my chest after 😈"
  ];

  // ─── Yellow Notes (data/facts — "if you want to see the data") ───
  const yellowNotes = [
    "Our MBTIs are literally ideal matches and it's the only personality test we give any credence to.",
    "We can talk about anything ranging from poker strategy to 'I think therefore I am' (shoutout to my guy Descartes)",
    "We had an inexplicable attraction even when we tried to deny it/avoid it.",
    "A lot of fights between couples happen when they move in together but we are so chill this won't happen.",
    "Only 9% of relationships (according to some study lol) start from joining a hobby, clubs or sports league. We are definitely better than 100% of this lucky 9%.",
    "We have had conflicts, but were able to deal with them within that day or even within the hour. Small deal, small talk works like a charm with us.",
    "I thought I felt enough to (barely) get married, with us though it makes me think 'what was I thinking?! THIS is it!'",
    "We can play co op video games without being at each other's necks",
    "We view money VERY similarly. This is a huge factor in the success of marriages.",
    "My mom likes you :)",
    "Your mom likes/will like me :)",
    "Eldest children tend to be the more reliable partners. We are also similarly 'not family oriented'",
    "Our need to bite each other, pick each other up off the ground, and exhibit aggressive behaviors is actually something called 'cute aggression'. It's a way for humans to be able to cope with intense emotional feelings so we aren't paralyzed.",
    "Couples who met through a mutual friend report the highest satisfaction with their relationships",
    "Couple who celebrate their anniversaries are more likely to stay together (and I guess we can add this 100 day celebration too ;))",
    "People in love apparently have higher levels of nerve growth factor. Tracks for us since we had some strange psychological things that just don't seem to be present with each other. (My back issues, your quasi-anxiety). To me the craziest difference was how quickly my back flare up went away when I was with you :)",
    "Only 18% of people believe they have found true love. WE ARE SO LUCKY. It just makes sense to believe in what we have",
    "Love solves the 3 Body Problem of the mind, the heart, and the body being required to act in harmony. We have a connection through all 3 (Source: Justin)",
    "We have an epic friendship, a feeling of home, and a determination to be good at marriage (and our relationship) source: Tim Urban",
    "I always look forward to our 'Forgettable Wednesdays' and 'day four of vacation #56' together.",
    "It is a huge positive sign to me that I am so comfortable with you right from the get go and acting cute/weird. This is a big data point. It literally took me a year or so to get anywhere close to this before :o",
    // 22-100: data/fact style placeholders
    "Couples who laugh together report higher relationship satisfaction. We've got that covered 😂",
    "Studies show that couples who exercise together stay together. Wer are literally living proof 💪",
    "Holding hands with your partner can reduce physical pain and stress. I never want to let go 🤝",
    "Couples who travel together have healthier, longer relationships. I can't wait for all our trips ✈️",
    "Sharing meals together strengthens bonds. You make every meal an experience 🍽️",
    "The average person falls in love 7 times before getting married. I'm done at 1 — you. 🩵",
    "Couples who have similar conflict resolution styles have longer-lasting relationships. We resolve things fast ⚡",
    "Psychology says it takes 1/5th of a second to fall in love. It took me longer because I was in denial 😂",
    "Couples who maintain physical affection report being 2x happier. Mission accepted 🫶",
    "Research shows that knowing your partner's love language is key. I'm learning yours every day 💛",
    "The 'honeymoon phase' typically lasts 6 months to 2 years. Ours isn't fading — it's evolving 📈",
    "Couples with shared goals are 30% more likely to stay together. We've got a life to build 🏗️",
    "Eye contact for 4 minutes can create deep intimacy. Try looking away from me — I bet you can't 👀",
    "Studies show vulnerability strengthens relationships. You being your true self around me is the best data point 📊",
    "Couples who text throughout the day report higher satisfaction. My phone is always buzzing because of you 📱",
    "Research says couples who cook together have better communication. Even when I'm being particular about timing 😬",
    "The average couple spends 2-3 hours per day together. We probably beat that before noon 🤭",
    "Psychology shows that recalling positive memories strengthens bonds. This whole app is one big memory bank 💛",
    "Couples who prioritize quality time over quantity of time are happier. Every moment with you is quality ✨",
    "Sleeping next to your partner improves sleep quality. Best sleep of my life right next to you 🌙",
    "Studies show that couples who say 'thank you' often are more satisfied. So… thank you for being you 🙏",
    "The divorce rate for people who share hobbies is significantly lower. Snowboarding, lifting, gaming — check ✅",
    "Research shows couples who show physical affection in public are more secure. I'm not shy about PDA 😏",
    "Couples who have inside jokes have stronger bonds. We've got enough for a whole comedy special 🎭",
    "Psychology says couples who grow together stay together. We're literally leveling up side by side 📈",
    "The average person thinks about their partner 20+ times a day. I'm well above average 🤭",
    "Studies show that sharing secrets strengthens trust. I trust you with everything 💛",
    "Couples who celebrate small wins together are happier. I celebrate every win with you 🎉",
    "Research says that couples who maintain friendship alongside romance have the strongest bonds. We've got both 💪",
    "The 'chemistry' between couples is linked to immune system compatibility. Our immune systems literally agree 👩‍🔬",
    "Couples who have similar sleep schedules are happier. Good thing we're both night owls 🦉",
    "Studies show that couples who have shared responsibilities are happier. We make a great team 🤝",
    "The average person takes 3-6 months to say 'I love you.' I think I knew before the first month 🥹",
    "Couples who maintain eye contact during conversation feel more connected. It's hard to look away from you 👀",
    "Research shows that couples who express gratitude daily have stronger bonds. I'm grateful for you every single day 🙏",
    "Couples who have similar music tastes tend to be more compatible. Our karaoke session proved that 🎤",
    "The science of 'love at first sight' involves the brain releasing dopamine instantly. Checks out 🧠",
    "Couples who are best friends before dating have longer-lasting relationships. We literally lived this 💛",
    "Studies show that couples who maintain independence alongside togetherness are happiest. We've got the balance ⚖️",
    "The average person takes ~50 dates before finding 'the one.' We skipped all that noise 😂",
    "Research shows that couples who argue productively are stronger than those who never argue. We argue well 🤠",
    "Couples who show public appreciation for each other feel more connected. I'll never stop showing you off 💛",
    "The science behind 'butterflies' involves norepinephrine. I still get them every time I see you 🦋",
    "Studies show couples who set goals together are 2x more likely to achieve them. Let's build our empire 🏗️",
    "Couples who laugh during arguments resolve issues faster. Your chaos and my calm are the perfect combo 😂",
    "The average couple says 'I love you' 3 times per day. That's way too low — I'm well above average 💛",
    "Research shows that couples who maintain their social lives are happier. We've got the best of both worlds 🌍",
    "The hormone oxytocin is released when couples hug for 20+ seconds. I'll never let go early 🫂",
    "Couples who eat breakfast together have lower stress levels. Morning time with you is my favorite 🌅",
    "Studies show that couples who dream together create stronger futures. Our future is so bright 😎",
    "Couples who can be silent together without it being awkward are truly comfortable. Our comfortable silences are golden 🤍",
    "The science of attachment styles shows secure partners create the healthiest bonds. We're both secure 💪",
    "Couples who use inside language (pet names, code words) are more connected. Our shared language is ✨",
    "Research shows couples who play together stay together. Gaming, sports, karaoke — we play hard 🎮",
    "The average couple spends 2 years before deciding to be exclusive. We skipped that too 😂",
    "Couples who maintain physical touch (even non-sexual) report 3x more relationship satisfaction 🤝",
    "Studies show couples who support each other's individual passions are happiest. I love watching you thrive 🌟",
    "The science of 'love maps' shows couples who know each other deeply stay together. I know every detail of you 🗺️",
    "Couples who apologize quickly after arguments have stronger bonds. We're both good at this 🤝",
    "Research shows couples who share their fears with each other build deeper trust. You make me brave 🦁",
    "The average relationship lasts 2-3 years before couples decide on forever. We already know 🤭",
    "Couples who surprise each other maintain the spark longer. I've got surprises planned 😏",
    "Studies show that couples who have similar conflict styles resolve issues 40% faster. We're in sync ⚡",
    "Couples who maintain traditions together have stronger bonds. This 100 days is just the first tradition 💛",
    "The science of 'couples therapy' works best when couples are proactive, not reactive. We're ahead of the game 🧠",
    "Couples who express love in their partner's language (not their own) are happiest. I'm learning yours every day 🩵",
    "Research shows couples who maintain mystery alongside intimacy stay attracted longer. You still surprise me 😏",
    "The average person remembers 80% of their first kiss. I remember every single detail of ours 💋",
    "Couples who weather storms together come out stronger on the other side. We're unstoppable 💪",
    "Studies show couples who prioritize each other's happiness over their own are the happiest. It's mutual 🤝",
    "The data is in: we're a statistical anomaly and I wouldn't have it any other way 📊💛"
  ];

  // ─── Pink Notes (picture mind — "how my picture mind sees you/us") ───
  const pinkNotes = [
    "Picture this… 🎞️",
    "A snapshot of you in my mind 📸",
    "The way you look in golden hour light ✨",
    "Picture this… the moment I knew 🖼️",
    "My mind's photo album of us 💕",
    "A polaroid of your laugh 🎞️",
    "Picture this… you, exactly as you are 📸",
    "The image I see when I close my eyes 🖼️",
    "A picture of our first real conversation 📷",
    "Picture this… forever captured in a frame ✨",
    "My favorite photo of you doesn't exist on any camera 🎞️",
    "Picture this… the way the light hits your face 📸",
    "A scrapbook page of our inside jokes 🖼️",
    "Picture this… us, in my mind's eye 💕",
    "The mental image of you walking toward me 🎞️",
    "A snapshot of the way you look at me 📸",
    "Picture this… every moment I've memorized 🖼️",
    "The photo album in my heart 📷",
    "Picture this… you, from my perspective ✨",
    "A picture of your hands in mine 🎞️",
    "Picture this… the scene that plays on loop in my head 📸",
    "My mind's gallery of your best moments 🖼️",
    "A polaroid of you being unapologetically yourself 🎞️",
    "Picture this… us, like a movie still 💕",
    "The mental picture of your smile first thing in the morning 📸",
    "Picture this… a photo wall of every time you made me smile 🖼️",
    "A snapshot of the way you tuck your hair behind your ear ✨",
    "Picture this… the scene I replay when I miss you 🎞️",
    "My mind's portrait of you at your most beautiful 📸",
    "Picture this… the image that makes my heart skip 🖼️",
    "A scrapbook of our little moments 🎞️",
    "Picture this… how I see you when nobody else is looking 💕",
    "The mental snapshot of your focused face 📸",
    "Picture this… a photo of us from the future ✨",
    "My picture mind's favorite frame 🖼️",
    "A polaroid of you laughing so hard you can't breathe 🎞️",
    "Picture this… the way my mind paints you 📸",
    "A picture of our couch conversations 🖼️",
    "Picture this… the image I carry everywhere 💕",
    "My mind's camera roll of your expressions 📸",
    "Picture this… a portrait of us, together ✨",
    "A snapshot of the way you rest your head on me 🎞️",
    "Picture this… every memory I never want to forget 🖼️",
    "The photo that lives rent-free in my mind 📸",
    "Picture this… you through my eyes 💕",
    "A scrapbook page of our adventures together ✨",
    "Picture this… the way you look when you're sleepy 🎞️",
    "My mind's most precious photograph 📸",
    "Picture this… a picture frame with no photo needed 🖼️",
    "A mental snapshot of your voice 🎞️",
    "Picture this… the scene that plays behind my eyelids 💕",
    "My picture mind's greatest hit 📸",
    "A polaroid of our silliest moments together ✨",
    "Picture this… the way the world looks when I'm with you 🖼️",
    "A snapshot of your determination 📸",
    "Picture this… a gallery exhibition called 'You' 🎞️",
    "My mind's favorite album — every track is you 💕",
    "Picture this… the way you look right before you say something smart 📸",
    "A mental photograph of our first everything ✨",
    "Picture this… the image that grounds me when things get hard 🖼️",
    "A snapshot of the way you move when you're happy 🎞️",
    "Picture this… my picture mind's love letter to you 📸",
    "My mind's most vivid memory of you 💕",
    "Picture this… a photo that captures your energy ✨",
    "A polaroid of us doing absolutely nothing together 📸",
    "Picture this… the way you fill every room 🖼️",
    "A mental snapshot of your competitive side 🎞️",
    "Picture this… the image that makes everything okay 💕",
    "My mind's camera loves you more than any real one 📸",
    "Picture this… a picture of peace, and it looks like you ✨",
    "A snapshot of the way you care for people 🖼️",
    "Picture this… the mental photo I'd save in a fire 🎞️",
    "My picture mind's director's cut of our love story 📸",
    "Picture this… a portrait of the woman I love 💕",
    "A polaroid of the way you make everyone feel welcome ✨",
    "Picture this… the way my mind sees our future 📸",
    "A snapshot of you being perfectly imperfect 🖼️",
    "Picture this… a museum dedicated to you 🎞️",
    "My mind's most beautiful composition 📸",
    "Picture this… the image I fall asleep to 💕",
    "A mental photograph of your strength ✨",
    "Picture this… a scrapbook with infinite pages 📸",
    "A snapshot of the way you love 🖼️",
    "Picture this… the picture that's worth more than a thousand words 🎞️",
    "My picture mind's greatest masterpiece — you 💕",
    "Picture this… a photo that doesn't do you justice 📸",
    "A polaroid of our forever ✨",
    "Picture this… every version of you, and I love them all 🖼️",
    "A snapshot of the way you make the world better 🎞️",
    "Picture this… the image that defines happiness for me 📸",
    "My mind's camera is always pointed at you 💕",
    "Picture this… a love letter written in photographs ✨",
    "A mental snapshot of everything I adore about you 📸",
    "Picture this… the final frame, and it's us, together, always 🖼️"
  ];

  // ─── Mode config ───
  const modeNotes = {
    blue: blueNotes,
    red: redNotes,
    yellow: yellowNotes,
    pink: pinkNotes,
  };

  // ─── State ───
  const state = {
    currentNote: 0,
    discoveredNotes: {
      blue: new Set(),
      red: new Set(),
      yellow: new Set(),
      pink: new Set(),
    },
    recentDiscoveries: [], // [{index, timestamp, mode}]
    shuffleHistory: [],
    view: 'home', // 'home', 'note', 'browse', 'data'
    currentMode: 'blue', // 'blue', 'red', 'yellow', 'pink'
    hasSelectedModeBefore: false,
    // Tracking data
    sessionStart: Date.now(),
    visitCount: 0,
    visitDates: [], // ['YYYY-MM-DD', ...]
    timeSpent: 0, // total seconds
    lastSessionStart: null,
  };

  // Helper to get current notes array
  function getCurrentNotes() {
    return modeNotes[state.currentMode] || blueNotes;
  }

  function getCurrentDiscoveries() {
    return state.discoveredNotes[state.currentMode] || state.discoveredNotes.blue;
  }

  // ─── DOM Elements ───
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const els = {
    lockScreen: $('#lock-screen'),
    modeSelect: $('#mode-select'),
    app: $('#app'),
    passwordInput: $('#password-input'),
    unlockBtn: $('#unlock-btn'),
    lockError: $('#lock-error'),
    homeView: $('#home-view'),
    noteView: $('#note-view'),
    browseView: $('#browse-view'),
    dataView: $('#data-view'),
    noteCard: $('#note-card'),
    noteNumber: $('#note-number'),
    noteText: $('#note-text'),
    noteMedia: $('#note-media'),
    navCounter: $('#nav-counter'),
    notesRead: $('#notes-read'),
    browseGrid: $('#browse-grid'),
    shuffleBtn: $('#shuffle-btn'),
    browseBtn: $('#browse-btn'),
    shuffleAgain: $('#shuffle-again'),
    noteBack: $('#note-back'),
    browseBack: $('#browse-back'),
    prevBtn: $('#prev-btn'),
    nextBtn: $('#next-btn'),
    transition: $('#transition-overlay'),
    eeLockPeanut: $('#ee-lock-peanut'),
    eeAppButter: $('#ee-app-butter'),
    // Data view elements
    dataDiscovered: $('#data-discovered'),
    dataRemaining: $('#data-remaining'),
    dataVisits: $('#data-visits'),
    dataStreak: $('#data-streak'),
    dataProgressText: $('#data-progress-text'),
    dataProgressFill: $('#data-progress-fill'),
    dataGrid: $('#data-grid'),
    dataRecentList: $('#data-recent-list'),
    dataRecentSection: $('#data-recent-section'),
    dataFunList: $('#data-fun-list'),
    dataBackBtn: $('#data-back-btn'),
    // Mode switcher
    modeDots: $$('.mode-dot'),
    modeCards: $$('.mode-card'),
  };

  // ─── localStorage helpers ───
  function loadState() {
    try {
      const saved = localStorage.getItem('100days-state');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.discoveredNotes) {
          for (const mode of ['blue', 'red', 'yellow', 'pink']) {
            state.discoveredNotes[mode] = new Set(parsed.discoveredNotes[mode] || []);
          }
        }
        if (parsed.recentDiscoveries) {
          state.recentDiscoveries = parsed.recentDiscoveries || [];
        }
        if (parsed.currentMode) {
          state.currentMode = parsed.currentMode;
        }
        if (parsed.hasSelectedModeBefore) {
          state.hasSelectedModeBefore = true;
        }
        if (parsed.visitCount) {
          state.visitCount = parsed.visitCount;
        }
        if (parsed.visitDates) {
          state.visitDates = parsed.visitDates;
        }
        if (parsed.timeSpent) {
          state.timeSpent = parsed.timeSpent;
        }
        if (parsed.lastSessionStart) {
          state.lastSessionStart = parsed.lastSessionStart;
        }
      }
    } catch (e) {
      // Ignore parse errors
    }
  }

  function saveState() {
    try {
      const discNotes = {};
      for (const mode of ['blue', 'red', 'yellow', 'pink']) {
        discNotes[mode] = [...state.discoveredNotes[mode]];
      }
      localStorage.setItem('100days-state', JSON.stringify({
        discoveredNotes: discNotes,
        recentDiscoveries: state.recentDiscoveries.slice(-20),
        currentMode: state.currentMode,
        hasSelectedModeBefore: state.hasSelectedModeBefore,
        visitCount: state.visitCount,
        visitDates: state.visitDates,
        timeSpent: state.timeSpent,
        lastSessionStart: state.sessionStart,
      }));
    } catch (e) {
      // Ignore storage errors
    }
  }

  // ─── Tracking ───
  function trackVisit() {
    const today = new Date().toISOString().split('T')[0];
    state.visitCount++;
    
    if (!state.visitDates.includes(today)) {
      state.visitDates.push(today);
    }
    
    if (state.lastSessionStart) {
      const elapsed = Math.floor((Date.now() - state.lastSessionStart) / 1000);
      if (elapsed < 4 * 60 * 60) {
        state.timeSpent += elapsed;
      }
    }
    
    state.sessionStart = Date.now();
    saveState();
  }

  function updateTimeSpent() {
    const elapsed = Math.floor((Date.now() - state.sessionStart) / 1000);
    return state.timeSpent + elapsed;
  }

  function formatTime(seconds) {
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${mins}m`;
  }

  function calculateStreak() {
    if (state.visitDates.length === 0) return 0;
    
    const sorted = [...state.visitDates].sort().reverse();
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    
    if (sorted[0] !== today && sorted[0] !== yesterday) return 0;
    
    let streak = 1;
    for (let i = 1; i < sorted.length; i++) {
      const prev = new Date(sorted[i - 1]);
      const curr = new Date(sorted[i]);
      const diff = Math.floor((prev - curr) / 86400000);
      
      if (diff === 1) {
        streak++;
      } else if (diff > 1) {
        break;
      }
    }
    
    return streak;
  }

  function getMostVisitedHour() {
    const hours = state.recentDiscoveries.map(d => new Date(d.timestamp).getHours());
    if (hours.length === 0) return null;
    
    const counts = {};
    hours.forEach(h => { counts[h] = (counts[h] || 0) + 1; });
    
    let maxHour = 0, maxCount = 0;
    for (const [hour, count] of Object.entries(counts)) {
      if (count > maxCount) {
        maxCount = count;
        maxHour = parseInt(hour);
      }
    }
    
    const ampm = maxHour >= 12 ? 'PM' : 'AM';
    const display = maxHour === 0 ? 12 : maxHour > 12 ? maxHour - 12 : maxHour;
    return `${display}${ampm}`;
  }

  // ─── Password Gate ───
  function initLock() {
    els.passwordInput.focus();

    const attemptUnlock = () => {
      const val = els.passwordInput.value.trim().toLowerCase();
      if (val === PASSWORD) {
        unlock();
      } else {
        els.lockError.classList.remove('hidden');
        els.passwordInput.value = '';
        els.passwordInput.focus();
        setTimeout(() => els.lockError.classList.add('hidden'), 3000);
      }
    };

    els.unlockBtn.addEventListener('click', attemptUnlock);
    els.passwordInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') attemptUnlock();
    });
  }

  function unlock() {
    els.transition.classList.add('active');
    setTimeout(() => {
      els.lockScreen.classList.remove('active');
      
      trackVisit();
      
      if (state.hasSelectedModeBefore && state.currentMode) {
        applyMode(state.currentMode, false);
        els.app.classList.add('active');
        updateProgress();
        setTimeout(() => els.transition.classList.remove('active'), 100);
      } else {
        els.modeSelect.classList.add('active');
        setTimeout(() => els.transition.classList.remove('active'), 100);
      }
    }, 400);
  }

  // ─── Mode Management ───
  function selectMode(mode) {
    state.currentMode = mode;
    state.hasSelectedModeBefore = true;
    saveState();

    els.transition.classList.add('active');
    setTimeout(() => {
      els.modeSelect.classList.remove('active');
      applyMode(mode, true);
      els.app.classList.add('active');
      updateProgress();
      setTimeout(() => els.transition.classList.remove('active'), 100);
    }, 400);
  }

  function applyMode(mode, showDataView) {
    document.body.classList.remove('mode-blue', 'mode-red', 'mode-yellow', 'mode-pink');
    document.body.classList.add(`mode-${mode}`);

    els.modeDots.forEach(dot => {
      dot.classList.toggle('active', dot.dataset.mode === mode);
    });

    if (mode === 'yellow' && showDataView !== false) {
      showView('data');
    } else {
      showView('home');
    }
  }

  function switchMode(mode) {
    if (mode === state.currentMode) return;

    state.currentMode = mode;
    saveState();

    document.body.classList.add('mode-transitioning');
    
    setTimeout(() => {
      document.body.classList.remove('mode-blue', 'mode-red', 'mode-yellow', 'mode-pink');
      document.body.classList.add(`mode-${mode}`);

      els.modeDots.forEach(dot => {
        dot.classList.toggle('active', dot.dataset.mode === mode);
      });

      if (mode === 'yellow') {
        showView('data');
      } else {
        if (state.view === 'data') {
          showView('home');
        }
      }

      updateProgress();

      setTimeout(() => {
        document.body.classList.remove('mode-transitioning');
      }, 50);
    }, 150);
  }

  // ─── View Management ───
  function showView(viewName) {
    const prevView = state.view;
    state.view = viewName;
    
    const views = [els.homeView, els.noteView, els.browseView];
    views.forEach(v => v.classList.remove('active'));
    els.dataView.classList.remove('active');

    switch (viewName) {
      case 'home':
        els.homeView.classList.add('active');
        break;
      case 'note':
        els.noteView.classList.add('active');
        break;
      case 'browse':
        els.browseView.classList.add('active');
        buildBrowseGrid();
        break;
      case 'data':
        els.dataView.classList.add('active');
        buildDataView();
        break;
    }
  }

  // ─── Note Display ───
  function getNoteColor(index) {
    return NOTE_COLORS[index % NOTE_COLORS.length];
  }

  function getRotation(colorClass) {
    const rotations = {
      'color-yellow': '-0.5deg',
      'color-blue': '0.8deg',
      'color-purple': '-0.3deg',
      'color-pink': '0.5deg',
      'color-lavender': '-0.7deg',
      'color-mint': '0.6deg',
      'color-peach': '-0.4deg'
    };
    return rotations[colorClass] || '-0.5deg';
  }

  function showNote(index, animate = true) {
    if (index < 0 || index >= TOTAL_NOTES) return;

    state.currentNote = index;
    const notes = getCurrentNotes();
    const discoveries = getCurrentDiscoveries();
    const noteData = notes[index];
    const colorClass = getNoteColor(index);
    const rotation = getRotation(colorClass);

    // Track discovery
    const isNewDiscovery = !discoveries.has(index);
    discoveries.add(index);
    
    if (isNewDiscovery) {
      state.recentDiscoveries.push({
        index: index,
        timestamp: Date.now(),
        mode: state.currentMode
      });
      if (state.recentDiscoveries.length > 20) {
        state.recentDiscoveries = state.recentDiscoveries.slice(-20);
      }
    }
    
    saveState();
    updateProgress();

    // Update card
    els.noteCard.className = 'note-card';
    void els.noteCard.offsetWidth;

    els.noteCard.classList.add(colorClass);
    els.noteCard.style.setProperty('--rotation', rotation);

    els.noteNumber.textContent = `#${index + 1}`;
    els.noteText.textContent = noteData;
    els.navCounter.textContent = `${index + 1} / ${TOTAL_NOTES}`;

    // Handle media
    els.noteMedia.innerHTML = '';
    if (PHOTO_NOTES.includes(index + 1)) {
      els.noteMedia.innerHTML = `<img src="assets/photos/note-${index + 1}.jpg" alt="A special memory" loading="lazy" onerror="this.parentElement.style.display='none'">`;
    } else if (VIDEO_NOTES.includes(index + 1)) {
      els.noteMedia.innerHTML = `<video controls preload="none" onerror="this.parentElement.style.display='none'"><source src="assets/videos/note-${index + 1}.mp4" type="video/mp4">Your browser does not support video.</video>`;
    }

    if (animate) {
      els.noteCard.classList.add('animating-in');
      els.noteCard.addEventListener('animationend', () => {
        els.noteCard.classList.remove('animating-in');
      }, { once: true });
    }

    els.prevBtn.style.opacity = index === 0 ? '0.3' : '1';
    els.nextBtn.style.opacity = index === TOTAL_NOTES - 1 ? '0.3' : '1';

    showView('note');

    checkMilestone(discoveries.size);
  }

  function checkMilestone(count) {
    const milestones = {
      10: '🎉 10 notes discovered!',
      25: '🥳 25 reasons and counting!',
      50: '✨ Halfway there! 50 notes!',
      75: '💫 75 notes! You\'re amazing!',
      100: '🥺💛 You found them all... every single reason 🩵'
    };

    if (milestones[count]) {
      setTimeout(() => spawnCelebration(), 300);
    }
  }

  // ─── Shuffle ───
  function shuffleNote() {
    const notes = getCurrentNotes();
    const discoveries = getCurrentDiscoveries();
    let newIndex;
    let attempts = 0;
    do {
      newIndex = Math.floor(Math.random() * TOTAL_NOTES);
      attempts++;
    } while (discoveries.has(newIndex) && attempts < 20 && discoveries.size < TOTAL_NOTES);

    if (state.view === 'note') {
      const rotation = getRotation(getNoteColor(newIndex));
      els.noteCard.style.setProperty('--rotation', rotation);
      els.noteCard.classList.add('animating-shuffle');

      spawnSparkles();

      els.noteCard.addEventListener('animationend', () => {
        els.noteCard.classList.remove('animating-shuffle');
        showNote(newIndex, false);
      }, { once: true });

      setTimeout(() => {
        if (els.noteCard.classList.contains('animating-shuffle')) {
          els.noteCard.classList.remove('animating-shuffle');
          showNote(newIndex, false);
        }
      }, 700);
    } else {
      showNote(newIndex, true);
      spawnSparkles();
    }
  }

  // ─── Sparkle Effects ───
  function spawnSparkles() {
    const emojis = ['💛', '🩵', '✨', '💫', '⭐', '🌟'];
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const sparkle = document.createElement('span');
        sparkle.className = 'sparkle';
        sparkle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        sparkle.style.left = `${Math.random() * 80 + 10}%`;
        sparkle.style.top = `${Math.random() * 60 + 20}%`;
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 800);
      }, i * 50);
    }
  }

  function spawnCelebration() {
    const emojis = ['💛', '🩵', '✨', '💖', '🎉', '🌸', '🦋', '⭐'];
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const heart = document.createElement('span');
        heart.className = 'celebration-heart';
        heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.top = '-20px';
        heart.style.animationDuration = `${1.5 + Math.random() * 1.5}s`;
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 3000);
      }, i * 80);
    }
  }

  // ─── Browse Grid ───
  function buildBrowseGrid() {
    els.browseGrid.innerHTML = '';
    const notes = getCurrentNotes();
    const discoveries = getCurrentDiscoveries();

    for (let i = 0; i < TOTAL_NOTES; i++) {
      const item = document.createElement('div');
      const colorClass = getNoteColor(i);
      item.className = `browse-item ${colorClass}`;
      item.dataset.index = i;

      if (discoveries.has(i)) {
        item.classList.add('discovered');
      } else {
        item.classList.add('undiscovered');
      }

      let mediaIndicator = '';
      if (PHOTO_NOTES.includes(i + 1)) {
        mediaIndicator = '<span class="item-media-indicator">📷</span>';
      } else if (VIDEO_NOTES.includes(i + 1)) {
        mediaIndicator = '<span class="item-media-indicator">🎬</span>';
      }

      item.innerHTML = `
        ${mediaIndicator}
        <span class="item-number">${String(i + 1).padStart(2, '0')}</span>
        <span class="item-preview">${discoveries.has(i) ? notes[i] : '???'}</span>
      `;

      item.addEventListener('click', () => {
        showNote(i, true);
      });

      els.browseGrid.appendChild(item);
    }
  }

  // ─── Data View ───
  function buildDataView() {
    const discoveries = getCurrentDiscoveries();
    const discovered = discoveries.size;
    const remaining = TOTAL_NOTES - discovered;
    const pct = Math.round((discovered / TOTAL_NOTES) * 100);
    const streak = calculateStreak();
    const totalTime = updateTimeSpent();

    els.dataDiscovered.textContent = discovered;
    els.dataRemaining.textContent = remaining;
    els.dataVisits.textContent = state.visitCount;
    els.dataStreak.textContent = streak;

    els.dataProgressText.textContent = `${pct}%`;
    setTimeout(() => {
      els.dataProgressFill.style.width = `${pct}%`;
    }, 100);

    // Build discovery grid
    const yellowNotes = modeNotes.yellow;
    els.dataGrid.innerHTML = '';
    for (let i = 0; i < TOTAL_NOTES; i++) {
      const dot = document.createElement('div');
      dot.className = `data-grid-dot ${discoveries.has(i) ? 'discovered' : 'undiscovered'}`;
      dot.title = discoveries.has(i) ? `#${i + 1}: ${yellowNotes[i]}` : `#${i + 1}: ???`;
      dot.addEventListener('click', () => {
        if (discoveries.has(i)) {
          // Switch to yellow notes mode and show this note
          state.currentMode = 'yellow';
          document.body.classList.remove('mode-blue', 'mode-red', 'mode-yellow', 'mode-pink');
          document.body.classList.add('mode-yellow');
          els.modeDots.forEach(d => d.classList.toggle('active', d.dataset.mode === 'yellow'));
          showNote(i, true);
        }
      });
      els.dataGrid.appendChild(dot);
    }

    // Recent discoveries
    const recent = state.recentDiscoveries.slice(-5).reverse();
    if (recent.length > 0) {
      els.dataRecentSection.style.display = 'block';
      els.dataRecentList.innerHTML = '';
      recent.forEach(item => {
        const notes = modeNotes[item.mode] || yellowNotes;
        const el = document.createElement('div');
        el.className = 'data-recent-item';
        el.innerHTML = `
          <span class="data-recent-num">#${item.index + 1}</span>
          <span class="data-recent-text">${notes[item.index]}</span>
        `;
        el.addEventListener('click', () => {
          const targetMode = item.mode || state.currentMode;
          state.currentMode = targetMode;
          document.body.classList.remove('mode-blue', 'mode-red', 'mode-yellow', 'mode-pink');
          document.body.classList.add(`mode-${targetMode}`);
          els.modeDots.forEach(d => d.classList.toggle('active', d.dataset.mode === targetMode));
          showNote(item.index, true);
        });
        els.dataRecentList.appendChild(el);
      });
    } else {
      els.dataRecentSection.style.display = 'none';
    }

    // Fun stats
    const funFacts = [];
    
    funFacts.push({
      emoji: '⏰',
      text: `You've spent <strong>${formatTime(totalTime)}</strong> reading love notes`
    });

    const peakHour = getMostVisitedHour();
    if (peakHour) {
      funFacts.push({
        emoji: '🌙',
        text: `You usually visit around <strong>${peakHour}</strong>`
      });
    }

    funFacts.push({
      emoji: '📅',
      text: `You've visited on <strong>${state.visitDates.length}</strong> different days`
    });

    if (state.visitDates.length > 0) {
      const first = state.visitDates[0];
      const d = new Date(first);
      const formatted = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      funFacts.push({
        emoji: '🌟',
        text: `Your first visit was on <strong>${formatted}</strong>`
      });
    }

    if (pct === 100) {
      funFacts.push({
        emoji: '🏆',
        text: `You've found every single reason — <strong>100%</strong> complete!`
      });
    } else if (pct >= 75) {
      funFacts.push({
        emoji: '🔥',
        text: `You're in the final stretch! <strong>${remaining}</strong> notes to go`
      });
    } else if (pct >= 50) {
      funFacts.push({
        emoji: '💫',
        text: `Halfway there! You're in the <strong>top 50%</strong>`
      });
    }

    const mediaNotes = PHOTO_NOTES.length + VIDEO_NOTES.length;
    const discoveredMedia = [...PHOTO_NOTES, ...VIDEO_NOTES].filter(n => discoveries.has(n - 1)).length;
    if (discoveredMedia > 0) {
      funFacts.push({
        emoji: '📷',
        text: `You've unlocked <strong>${discoveredMedia}/${mediaNotes}</strong> special media notes`
      });
    }

    els.dataFunList.innerHTML = '';
    funFacts.forEach(fact => {
      const el = document.createElement('div');
      el.className = 'data-fun-item';
      el.innerHTML = `
        <span class="data-fun-emoji">${fact.emoji}</span>
        <span class="data-fun-text">${fact.text}</span>
      `;
      els.dataFunList.appendChild(el);
    });
  }

  // ─── Progress ───
  function updateProgress() {
    const discoveries = getCurrentDiscoveries();
    els.notesRead.textContent = discoveries.size;

    // Update browse grid if visible
    const items = els.browseGrid.querySelectorAll('.browse-item');
    if (items.length > 0) {
      const notes = getCurrentNotes();
      items.forEach((item, i) => {
        if (discoveries.has(i)) {
          item.classList.add('discovered');
          item.classList.remove('undiscovered');
          const preview = item.querySelector('.item-preview');
          if (preview) preview.textContent = notes[i];
        }
      });
    }
  }

  // ─── Sequential Navigation ───
  function prevNote() {
    if (state.currentNote > 0) {
      showNote(state.currentNote - 1, true);
    }
  }

  function nextNote() {
    if (state.currentNote < TOTAL_NOTES - 1) {
      showNote(state.currentNote + 1, true);
    }
  }

  // ─── Easter Eggs ───
  function initEasterEggs() {
    let peanutClicks = 0;
    let peanutTimer = null;

    els.eeLockPeanut.addEventListener('click', () => {
      peanutClicks++;
      clearTimeout(peanutTimer);
      peanutTimer = setTimeout(() => { peanutClicks = 0; }, 1000);

      if (peanutClicks >= 5) {
        peanutClicks = 0;
        const toast = document.createElement('div');
        toast.style.cssText = `
          position: fixed;
          bottom: 80px;
          right: 20px;
          background: linear-gradient(135deg, #9B8EC4, #5B9BD5);
          color: white;
          padding: 12px 20px;
          border-radius: 16px;
          font-size: 0.85rem;
          font-family: 'Caveat', cursive;
          font-size: 1.1rem;
          box-shadow: 0 8px 30px rgba(155, 142, 196, 0.2);
          z-index: 1000;
          animation: cardIn 0.5s ease-out forwards;
          max-width: 220px;
          text-align: center;
          line-height: 1.3;
        `;
        toast.textContent = '🥜 you found me! the peanut behind it all 💛';
        document.body.appendChild(toast);
        setTimeout(() => {
          toast.style.transition = 'opacity 0.5s ease';
          toast.style.opacity = '0';
          setTimeout(() => toast.remove(), 500);
        }, 4000);
      }
    });

    let butterHoldTimer = null;

    els.eeAppButter.addEventListener('mousedown', startButterHold);
    els.eeAppButter.addEventListener('touchstart', startButterHold);
    els.eeAppButter.addEventListener('mouseup', cancelButterHold);
    els.eeAppButter.addEventListener('mouseleave', cancelButterHold);
    els.eeAppButter.addEventListener('touchend', cancelButterHold);

    function startButterHold(e) {
      e.preventDefault();
      butterHoldTimer = setTimeout(() => {
        const toast = document.createElement('div');
        toast.style.cssText = `
          position: fixed;
          bottom: 40px;
          left: 20px;
          background: linear-gradient(135deg, #ffd54f, #ffb300);
          color: #2d2150;
          padding: 12px 20px;
          border-radius: 16px;
          font-size: 0.85rem;
          font-family: 'Caveat', cursive;
          font-size: 1.1rem;
          box-shadow: 0 8px 30px rgba(255, 179, 0, 0.3);
          z-index: 1000;
          animation: cardIn 0.5s ease-out forwards;
          max-width: 240px;
          text-align: center;
          line-height: 1.3;
        `;
        toast.textContent = '🧈 smooth like butter — that\'s how love feels with you';
        document.body.appendChild(toast);
        setTimeout(() => {
          toast.style.transition = 'opacity 0.5s ease';
          toast.style.opacity = '0';
          setTimeout(() => toast.remove(), 500);
        }, 4000);
      }, 2000);
    }

    function cancelButterHold() {
      clearTimeout(butterHoldTimer);
    }

    // Konami-style Easter egg: type "peanut" or "butter"
    let konamiBuffer = '';
    document.addEventListener('keydown', (e) => {
      konamiBuffer += e.key.toLowerCase();
      if (konamiBuffer.length > 10) konamiBuffer = konamiBuffer.slice(-10);

      if (konamiBuffer.includes('peanut')) {
        konamiBuffer = '';
        for (let i = 0; i < 15; i++) {
          setTimeout(() => {
            const nut = document.createElement('span');
            nut.className = 'celebration-heart';
            nut.textContent = '🥜';
            nut.style.left = `${Math.random() * 100}%`;
            nut.style.top = '-30px';
            nut.style.fontSize = `${0.8 + Math.random() * 0.8}rem`;
            nut.style.animationDuration = `${2 + Math.random() * 2}s`;
            document.body.appendChild(nut);
            setTimeout(() => nut.remove(), 4000);
          }, i * 100);
        }
      }

      if (konamiBuffer.includes('butter')) {
        konamiBuffer = '';
        for (let i = 0; i < 12; i++) {
          setTimeout(() => {
            const b = document.createElement('span');
            b.className = 'celebration-heart';
            b.textContent = '🧈';
            b.style.left = `${Math.random() * 100}%`;
            b.style.top = '-30px';
            b.style.fontSize = `${0.8 + Math.random() * 0.8}rem`;
            b.style.animationDuration = `${2 + Math.random() * 2}s`;
            document.body.appendChild(b);
            setTimeout(() => b.remove(), 4000);
          }, i * 120);
        }
      }
    });
  }

  // ─── Swipe Support ───
  let touchStartX = 0;
  let touchStartY = 0;

  function initSwipe() {
    document.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
      if (state.view !== 'note') return;

      const deltaX = e.changedTouches[0].screenX - touchStartX;
      const deltaY = e.changedTouches[0].screenY - touchStartY;

      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 60) {
        if (deltaX > 0) prevNote();
        else nextNote();
      }
    }, { passive: true });
  }

  // ─── Event Listeners ───
  function initEvents() {
    els.modeCards.forEach(card => {
      card.addEventListener('click', () => {
        selectMode(card.dataset.mode);
      });
    });

    els.modeDots.forEach(dot => {
      dot.addEventListener('click', () => {
        switchMode(dot.dataset.mode);
      });
    });

    els.shuffleBtn.addEventListener('click', shuffleNote);
    els.browseBtn.addEventListener('click', () => showView('browse'));
    els.shuffleAgain.addEventListener('click', shuffleNote);
    els.noteBack.addEventListener('click', () => showView('home'));
    els.browseBack.addEventListener('click', () => showView('home'));
    els.prevBtn.addEventListener('click', prevNote);
    els.nextBtn.addEventListener('click', nextNote);

    els.dataBackBtn.addEventListener('click', () => {
      switchMode('blue');
    });

    document.addEventListener('keydown', (e) => {
      if (state.view !== 'note') return;
      if (e.key === 'ArrowLeft') prevNote();
      if (e.key === 'ArrowRight') nextNote();
      if (e.key === 'Escape') showView('home');
    });

    setInterval(() => {
      saveState();
    }, 30000);

    window.addEventListener('beforeunload', () => {
      saveState();
    });
  }

  // ─── Init ───
  function init() {
    loadState();
    initLock();
    initEvents();
    initEasterEggs();
    initSwipe();
    
    if (state.currentMode) {
      document.body.classList.remove('mode-blue', 'mode-red', 'mode-yellow', 'mode-pink');
      document.body.classList.add(`mode-${state.currentMode}`);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
