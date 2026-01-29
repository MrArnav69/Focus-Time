/**
 * Focus Time - Quotes Module
 * A curated collection of productivity, focus, and motivation quotes
 */

const quotes = [
  // Focus & Concentration
  {
    text: "Concentrate all your thoughts upon the work in hand. The sun's rays do not burn until brought to a focus.",
    author: "Alexander Graham Bell",
  },
  {
    text: "The successful warrior is the average man with laser-like focus.",
    author: "Bruce Lee",
  },
  {
    text: "The ability to concentrate and to use time well is everything.",
    author: "Lee Iacocca",
  },
  {
    text: "Focus is the new IQ.",
    author: "Cal Newport",
  },
  {
    text: "The more focused you are, the more successful you will be.",
    author: "Tony Robbins",
  },
  {
    text: "Deep work is the ability to focus without distraction on a cognitively demanding task.",
    author: "Cal Newport",
  },
  {
    text: "What you choose to focus on and what you choose to ignore plays in defining the quality of your life.",
    author: "Cal Newport",
  },
  {
    text: "Clarity about what matters provides clarity about what does not.",
    author: "Cal Newport",
  },
  {
    text: "Who you are, what you think, feel, and do, what you love—is the sum of what you focus on.",
    author: "Cal Newport",
  },
  {
    text: "If you don't pay appropriate attention to what has your attention, it will take more of your attention than it deserves.",
    author: "David Allen",
  },
  {
    text: "The key to success is to focus on goals, not obstacles.",
    author: "Unknown",
  },
  {
    text: "Focused, hard work is the real key to success.",
    author: "John Carmack",
  },
  {
    text: "Concentration is the secret of strength in politics, in war, in trade, in short, in all management of human affairs.",
    author: "Ralph Waldo Emerson",
  },
  {
    text: "The difference between try and triumph is just a little umph!",
    author: "Marvin Phillips",
  },

  // Productivity & Hard Work
  {
    text: "Do the hard jobs first. The easy jobs will take care of themselves.",
    author: "Dale Carnegie",
  },
  {
    text: "Focus on being productive instead of busy.",
    author: "Tim Ferriss",
  },
  {
    text: "What you do today can improve all your tomorrows.",
    author: "Ralph Marston",
  },
  {
    text: "Success always demands a greater effort.",
    author: "Winston Churchill",
  },
  {
    text: "Opportunity is missed by most people because it is dressed in overalls and looks like work.",
    author: "Thomas Edison",
  },
  {
    text: "Productivity is never an accident. It is always the result of a commitment to excellence, intelligent planning, and focused effort.",
    author: "Paul J. Meyer",
  },
  {
    text: "Amateurs sit and wait for inspiration, the rest of us just get up and go to work.",
    author: "Stephen King",
  },
  {
    text: "Start by doing what's necessary, then what's possible, and suddenly you are doing the impossible.",
    author: "Francis of Assisi",
  },
  {
    text: "High-Quality Work Produced = (Time Spent) × (Intensity of Focus).",
    author: "Cal Newport",
  },
  {
    text: "If you don't produce, you won't thrive—no matter how skilled or talented you are.",
    author: "Cal Newport",
  },
  {
    text: "Happiness is the real sense of fulfillment that comes from hard work.",
    author: "Joseph Barbara",
  },
  {
    text: "Genius is 10% inspiration, 90% perspiration.",
    author: "Thomas Edison",
  },
  {
    text: "Effective performance is preceded by painstaking preparation.",
    author: "Brian Tracy",
  },
  {
    text: "We are what we repeatedly do. Excellence then is not an act, but a habit.",
    author: "Aristotle",
  },

  // Persistence & Determination
  {
    text: "Nothing in this world can take the place of persistence. Persistence and determination alone are omnipotent.",
    author: "Calvin Coolidge",
  },
  {
    text: "Patience, persistence and perspiration make an unbeatable combination for success.",
    author: "Napoleon Hill",
  },
  {
    text: "It's not that I'm so smart, it's just that I stay with problems longer.",
    author: "Albert Einstein",
  },
  {
    text: "Energy and persistence conquer all things.",
    author: "Benjamin Franklin",
  },
  {
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
  },
  {
    text: "Many of life's failures are people who did not realize how close they were to success when they gave up.",
    author: "Thomas Edison",
  },
  {
    text: "Our greatest weakness lies in giving up. The most certain way to succeed is to always try just one more time.",
    author: "Thomas Edison",
  },
  {
    text: "Perseverance is the hard work you do after you get tired of doing the hard work you already did.",
    author: "Newt Gingrich",
  },
  {
    text: "A river cuts through rock not because of its power, but because of its persistence.",
    author: "James Watkins",
  },
  {
    text: "You may encounter many defeats, but you must not be defeated.",
    author: "Maya Angelou",
  },

  // Success & Goals
  {
    text: "Success is the sum of small efforts, repeated day in and day out.",
    author: "Robert Collier",
  },
  {
    text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  {
    text: "Success is the result of perfection, hard work, learning from failure, loyalty, and persistence.",
    author: "Colin Powell",
  },
  {
    text: "The path to success is to take massive, determined action.",
    author: "Tony Robbins",
  },
  {
    text: "Success is stumbling from failure to failure with no loss of enthusiasm.",
    author: "Winston Churchill",
  },
  {
    text: "Success is focusing the full power of all you are on what you have a burning desire to achieve.",
    author: "Wilfred Peterson",
  },
  {
    text: "The best way to predict your future is to create it.",
    author: "Abraham Lincoln",
  },

  // Motivation & Getting Started
  {
    text: "You don't have to see the whole staircase, just take the first step.",
    author: "Martin Luther King Jr.",
  },
  {
    text: "Tomorrow becomes never. No matter how small the task, take the first step now!",
    author: "Tim Ferriss",
  },
  {
    text: "Don't let what you cannot do interfere with what you can do.",
    author: "John Wooden",
  },
  {
    text: "Never let the fear of striking out stop you from playing the game.",
    author: "Babe Ruth",
  },
  {
    text: "Motivation is what gets you started. Habit is what keeps you going.",
    author: "Jim Ryun",
  },
  {
    text: "You are braver than you believe, stronger than you seem and smarter than you think.",
    author: "A.A. Milne",
  },
  {
    text: "If you want to make your dreams come true, the first thing you have to do is wake up.",
    author: "J.M. Power",
  },
  {
    text: "The greatest weapon against stress is our ability to choose one thought over another.",
    author: "William James",
  },
  {
    text: "Procrastination makes easy things hard and hard things harder.",
    author: "Mason Cooley",
  },
  {
    text: "You don't have to be great to start, but you have to start to be great.",
    author: "Zig Ziglar",
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
  },
  {
    text: "If we wait until we're ready, we'll be waiting for the rest of our lives.",
    author: "Lemony Snicket",
  },
  {
    text: "Nobody can go back and start a new beginning, but anyone can start today and make a new ending.",
    author: "Maria Robinson",
  },

  // Learning & Growth
  {
    text: "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.",
    author: "Malcolm X",
  },
  {
    text: "The beautiful thing about learning is that no one can take it away from you.",
    author: "B.B. King",
  },
  {
    text: "The expert in anything was once a beginner.",
    author: "Helen Hayes",
  },
  {
    text: "An investment in knowledge pays the best interest.",
    author: "Benjamin Franklin",
  },
  {
    text: "Learn from yesterday. Live for today. Hope for tomorrow.",
    author: "Albert Einstein",
  },
  {
    text: "I am always doing that which I cannot do, in order that I may learn how to do it.",
    author: "Pablo Picasso",
  },
  {
    text: "Learning never exhausts the mind.",
    author: "Leonardo da Vinci",
  },
  {
    text: "To know, is to know that you know nothing. That is the meaning of true knowledge.",
    author: "Socrates",
  },

  // Mindfulness & Present Moment
  {
    text: "The present moment is filled with joy and happiness. If you are attentive, you will see it.",
    author: "Thich Nhat Hanh",
  },
  {
    text: "Do every act of your life as though it were the very last act of your life.",
    author: "Marcus Aurelius",
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    text: "Your work is going to fill a large part of your life. The only way to be truly satisfied is to do what you believe is great work.",
    author: "Steve Jobs",
  },
  {
    text: "Don't count the days, make the days count.",
    author: "Muhammad Ali",
  },
  {
    text: "Time is what we want most, but what we use worst.",
    author: "William Penn",
  },
  {
    text: "Lost time is never found again.",
    author: "Benjamin Franklin",
  },
];

class QuotesManager {
  constructor() {
    this.quotes = [...quotes];
    this.currentIndex = -1;
    this.shuffledQuotes = [];
    this.shuffleQuotes();
  }

  /**
   * Shuffle the quotes array using Fisher-Yates algorithm
   */
  shuffleQuotes() {
    this.shuffledQuotes = [...this.quotes];
    for (let i = this.shuffledQuotes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.shuffledQuotes[i], this.shuffledQuotes[j]] = [
        this.shuffledQuotes[j],
        this.shuffledQuotes[i],
      ];
    }
    this.currentIndex = -1;
  }

  /**
   * Get the next quote in the shuffled sequence
   * @returns {Object} Quote object with text and author
   */
  getNextQuote() {
    this.currentIndex++;

    // Reshuffle if we've gone through all quotes
    if (this.currentIndex >= this.shuffledQuotes.length) {
      this.shuffleQuotes();
      this.currentIndex = 0;
    }

    return this.shuffledQuotes[this.currentIndex];
  }

  /**
   * Get a random quote (for initial display)
   * @returns {Object} Quote object with text and author
   */
  getRandomQuote() {
    const index = Math.floor(Math.random() * this.quotes.length);
    return this.quotes[index];
  }

  /**
   * Get total number of quotes
   * @returns {number}
   */
  getCount() {
    return this.quotes.length;
  }
}

// Export for use in other modules
window.QuotesManager = QuotesManager;
