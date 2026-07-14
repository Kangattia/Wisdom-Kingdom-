const RANKS = [
  { min: 5000000, title: "🌟 Emperor of Knowledge" },
  { min: 2500000, title: "👑 High King" },
  { min: 1200000, title: "👑 Kingdom King" },
  { min: 600000, title: "🏰 Grand Duke" },
  { min: 300000, title: "👑 Royal Commander" },
  { min: 150000, title: "🦁 Kingdom General" },
  { min: 80000, title: "🏰 Royal Warden" },
  { min: 40000, title: "⚔️ Knight Commander" },
  { min: 20000, title: "🛡️ Knight of the Realm" },
  { min: 9000, title: "⚔️ Royal Swordsman" },
  { min: 4000, title: "🏹 Elite Archer" },
  { min: 1500, title: "⚔️ Veteran Warrior" },
  { min: 500, title: "🛡️ Kingdom Guard" },
  { min: 100, title: "🗡️ Royal Footman" },
  { min: 0, title: "🌱 Kingdom Recruit" },
];

export function getRoyalTitle(points) {
  const rank = RANKS.find((r) => points >= r.min);
  return rank ? rank.title : RANKS[RANKS.length - 1].title;
}
