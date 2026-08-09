export const user = {
  name: "Arjun",
  level: 12,
  title: "Iron Warrior",
  xp: 3240,
  xpToNext: 4000,
  coins: 1875,
  plan: "Premium",
  avatar: "🦾",
  streak: 27,
  goals: { calories: 2650, protein: 165, carbs: 300, fat: 78, water: 8 },
  today: { calories: 1840, protein: 118, carbs: 205, fat: 52, water: 6 },
  stats: { workouts: 214, volume: "1.42M kg", streakRecord: 41 },
};

export const rings = [
  { label: "Calories", value: 1840, goal: 2650, color: "var(--primary)", unit: "kcal" },
  { label: "Protein", value: 118, goal: 165, color: "var(--secondary)", unit: "g" },
  { label: "Water", value: 6, goal: 8, color: "#38bdf8", unit: "glass" },
  { label: "Workout", value: 1, goal: 1, color: "var(--accent)", unit: "session" },
];

export const weightTrend = [
  { day: "Mon", kg: 78.4 },
  { day: "Tue", kg: 78.1 },
  { day: "Wed", kg: 78.2 },
  { day: "Thu", kg: 77.8 },
  { day: "Fri", kg: 77.6 },
  { day: "Sat", kg: 77.7 },
  { day: "Sun", kg: 77.3 },
];

export const weightLong = [
  { d: "Wk1", kg: 82.1, kcal: 2900 },
  { d: "Wk2", kg: 81.4, kcal: 2810 },
  { d: "Wk3", kg: 80.6, kcal: 2750 },
  { d: "Wk4", kg: 80.1, kcal: 2700 },
  { d: "Wk5", kg: 79.4, kcal: 2680 },
  { d: "Wk6", kg: 78.6, kcal: 2650 },
  { d: "Wk7", kg: 78.0, kcal: 2640 },
  { d: "Wk8", kg: 77.3, kcal: 2620 },
];

export const proteinMuscle = [
  { d: "Wk1", protein: 128, lean: 62.1 },
  { d: "Wk2", protein: 141, lean: 62.4 },
  { d: "Wk3", protein: 150, lean: 62.9 },
  { d: "Wk4", protein: 147, lean: 63.2 },
  { d: "Wk5", protein: 158, lean: 63.8 },
  { d: "Wk6", protein: 162, lean: 64.3 },
  { d: "Wk7", protein: 166, lean: 64.7 },
  { d: "Wk8", protein: 171, lean: 65.4 },
];

export const todayWorkout = {
  name: "Push Day — Chest & Triceps",
  split: "Push / Pull / Legs",
  muscles: ["Chest", "Shoulders", "Triceps"],
  minutes: 62,
  exercises: 6,
  volume: "8,420 kg",
};

export const exercises = [
  { id: "bench", name: "Barbell Bench Press", muscle: "Chest", equip: "Barbell", pr: "102.5 kg", sets: "4 × 8" },
  { id: "incline", name: "Incline DB Press", muscle: "Chest", equip: "Dumbbell", pr: "38 kg", sets: "3 × 10" },
  { id: "ohp", name: "Overhead Press", muscle: "Shoulders", equip: "Barbell", pr: "62.5 kg", sets: "4 × 6" },
  { id: "latraise", name: "Cable Lateral Raise", muscle: "Shoulders", equip: "Cable", pr: "15 kg", sets: "3 × 15" },
  { id: "dips", name: "Weighted Dips", muscle: "Triceps", equip: "Bodyweight", pr: "+35 kg", sets: "3 × 8" },
  { id: "pushdown", name: "Rope Pushdown", muscle: "Triceps", equip: "Cable", pr: "42.5 kg", sets: "3 × 12" },
  { id: "squat", name: "Back Squat", muscle: "Legs", equip: "Barbell", pr: "142.5 kg", sets: "5 × 5" },
  { id: "rdl", name: "Romanian Deadlift", muscle: "Legs", equip: "Barbell", pr: "120 kg", sets: "4 × 8" },
  { id: "row", name: "Barbell Row", muscle: "Back", equip: "Barbell", pr: "95 kg", sets: "4 × 8" },
  { id: "pullup", name: "Weighted Pull-up", muscle: "Back", equip: "Bodyweight", pr: "+30 kg", sets: "4 × 6" },
  { id: "curl", name: "EZ Bar Curl", muscle: "Biceps", equip: "Barbell", pr: "45 kg", sets: "3 × 10" },
  { id: "plank", name: "Weighted Plank", muscle: "Core", equip: "Bodyweight", pr: "3:20", sets: "3 × 60s" },
];

export const muscleFilters = ["All", "Chest", "Back", "Shoulders", "Legs", "Biceps", "Triceps", "Core"];

export const workoutHistory = [
  { date: "Yesterday", name: "Pull Day — Back & Biceps", volume: "9,180 kg", score: 92, prs: 1 },
  { date: "2 days ago", name: "Leg Day — Quads Focus", volume: "12,460 kg", score: 88, prs: 0 },
  { date: "4 days ago", name: "Push Day — Shoulders", volume: "7,920 kg", score: 95, prs: 2 },
  { date: "5 days ago", name: "Conditioning + Core", volume: "3,120 kg", score: 79, prs: 0 },
];

export const templates = [
  { name: "PPL — 6 Day Split", tag: "Hypertrophy", weeks: 12, exercises: 32 },
  { name: "Upper / Lower Power", tag: "Strength", weeks: 8, exercises: 24 },
  { name: "Home Dumbbell Only", tag: "Anywhere", weeks: 6, exercises: 18 },
  { name: "Fat Loss Circuit", tag: "Conditioning", weeks: 4, exercises: 14 },
];

export const meals = [
  {
    name: "Breakfast",
    time: "8:10 AM",
    kcal: 520,
    p: 38,
    c: 54,
    f: 16,
    items: ["Masala Oats Bowl", "4 Egg White Omelette", "Black Coffee"],
  },
  {
    name: "Lunch",
    time: "1:25 PM",
    kcal: 760,
    p: 48,
    c: 88,
    f: 22,
    items: ["Chicken Curry (200g)", "2 Roti", "Cucumber Raita"],
  },
  {
    name: "Snacks",
    time: "5:00 PM",
    kcal: 310,
    p: 26,
    c: 28,
    f: 8,
    items: ["Whey Shake", "Roasted Chana"],
  },
  { name: "Dinner", time: "—", kcal: 0, p: 0, c: 0, f: 0, items: [] },
];

export const indianFoods = [
  { name: "Paneer Butter Masala", kcal: 320, p: 14, serving: "1 cup" },
  { name: "Dal Tadka", kcal: 180, p: 9, serving: "1 katori" },
  { name: "Chicken Biryani", kcal: 480, p: 26, serving: "1 plate" },
  { name: "Rajma Chawal", kcal: 410, p: 15, serving: "1 plate" },
  { name: "Idli (2 pcs)", kcal: 116, p: 4, serving: "2 pcs" },
  { name: "Palak Paneer", kcal: 270, p: 13, serving: "1 cup" },
];

export const recentFoods = [
  { name: "Greek Yogurt 200g", kcal: 130, p: 20 },
  { name: "Whey Isolate 1 scoop", kcal: 120, p: 27 },
  { name: "Banana (medium)", kcal: 105, p: 1 },
  { name: "Almonds 20g", kcal: 116, p: 4 },
];

export const weeklyNutrition = [
  { d: "Mon", kcal: 2610, p: 168 },
  { d: "Tue", kcal: 2480, p: 155 },
  { d: "Wed", kcal: 2720, p: 174 },
  { d: "Thu", kcal: 2540, p: 161 },
  { d: "Fri", kcal: 2890, p: 158 },
  { d: "Sat", kcal: 2350, p: 142 },
  { d: "Sun", kcal: 1840, p: 118 },
];

export const measurements = [
  { part: "Chest", value: 104.5, delta: +1.2 },
  { part: "Waist", value: 81.0, delta: -2.4 },
  { part: "Hips", value: 96.2, delta: -0.8 },
  { part: "Arms", value: 38.4, delta: +0.9 },
  { part: "Thighs", value: 60.1, delta: +1.1 },
];

export const strengthProgress = [
  { d: "Wk1", bench: 85, squat: 120, dead: 140 },
  { d: "Wk2", bench: 87.5, squat: 125, dead: 145 },
  { d: "Wk3", bench: 90, squat: 127.5, dead: 150 },
  { d: "Wk4", bench: 92.5, squat: 132.5, dead: 155 },
  { d: "Wk5", bench: 95, squat: 135, dead: 162.5 },
  { d: "Wk6", bench: 97.5, squat: 137.5, dead: 165 },
  { d: "Wk7", bench: 100, squat: 140, dead: 172.5 },
  { d: "Wk8", bench: 102.5, squat: 142.5, dead: 180 },
];

export const badges = [
  { icon: "🔥", name: "30 Day Streak", earned: true },
  { icon: "🏋️", name: "100 Workouts", earned: true },
  { icon: "🥩", name: "Protein Beast", earned: true },
  { icon: "💧", name: "Hydration Hero", earned: true },
  { icon: "🌅", name: "Early Riser", earned: true },
  { icon: "⚡", name: "PR Machine", earned: true },
  { icon: "🧊", name: "Cold Plunge", earned: false },
  { icon: "🏔️", name: "Everest Volume", earned: false },
  { icon: "🥇", name: "Leaderboard #1", earned: false },
  { icon: "🌙", name: "Sleep Master", earned: false },
  { icon: "🎯", name: "Perfect Month", earned: false },
  { icon: "💎", name: "Diamond Tier", earned: false },
];

export const missions = {
  daily: [
    { text: "Complete today's workout", xp: 50, done: false },
    { text: "Hit your protein goal", xp: 30, done: false },
    { text: "Log all meals", xp: 20, done: true },
  ],
  weekly: [
    { text: "Train 5 days this week", xp: 250, done: false, progress: 4, total: 5 },
    { text: "Average 7h sleep", xp: 180, done: false, progress: 5, total: 7 },
    { text: "Break 1 personal record", xp: 300, done: true, progress: 1, total: 1 },
  ],
  monthly: { text: "Log 90,000 kg total volume", xp: 1200, progress: 64200, total: 90000, badge: "🏔️ Everest Volume" },
};

export const leaderboard = [
  { rank: 1, name: "Meera K.", xp: 5820, avatar: "🐯" },
  { rank: 2, name: "Rohit S.", xp: 4410, avatar: "🦅" },
  { rank: 3, name: "You", xp: 3240, avatar: "🦾", me: true },
  { rank: 4, name: "Dev P.", xp: 3110, avatar: "🐺" },
  { rank: 5, name: "Ananya R.", xp: 2760, avatar: "🦊" },
];

export const feed = [
  {
    user: "Meera K.",
    avatar: "🐯",
    time: "12m",
    type: "PR",
    text: "New PR on Deadlift — 145 kg × 3 🔥",
    likes: 34,
    comments: 7,
  },
  {
    user: "Rohit S.",
    avatar: "🦅",
    time: "1h",
    type: "Workout",
    text: "Finished Leg Day — Quads Focus · 12,460 kg volume · Score 88",
    likes: 21,
    comments: 3,
  },
  {
    user: "Ananya R.",
    avatar: "🦊",
    time: "3h",
    type: "Badge",
    text: "Unlocked the 💧 Hydration Hero badge — 21 days straight!",
    likes: 48,
    comments: 11,
  },
  {
    user: "Dev P.",
    avatar: "🐺",
    time: "6h",
    type: "Photo",
    text: "8 week progress. Down 5 kg, up 4 kg on bench. Consistency wins.",
    likes: 96,
    comments: 24,
  },
];

export const coachQuickActions = [
  "Analyze my workout",
  "Review my diet today",
  "Suggest meal swap",
  "Give me motivation",
  "Home workout alternative",
  "Weekly review",
];

export const coachSeed = [
  {
    role: "ai" as const,
    text: "Morning Arjun 👋 You're 47g of protein short with dinner still to log. Want me to build a 620 kcal high-protein dinner around what you usually eat?",
  },
  { role: "user" as const, text: "Yes, but keep it vegetarian tonight." },
  {
    role: "ai" as const,
    text: "Done. **Paneer Tikka Bowl** — 180g paneer, 1 cup quinoa, sautéed peppers, mint yogurt.\n\n· 618 kcal · 46g protein · 52g carbs · 24g fat\n\nThat lands you at 164g protein, 1g under goal. Your recovery score is 78, so tomorrow's Pull Day is a green light.",
  },
];

export const soreness = ["Chest", "Quads"];

export const sleepStages = [
  { stage: "Deep", h: 1.6, color: "var(--primary)" },
  { stage: "REM", h: 1.9, color: "var(--secondary)" },
  { stage: "Light", h: 3.4, color: "#38bdf8" },
  { stage: "Awake", h: 0.3, color: "var(--accent)" },
];
