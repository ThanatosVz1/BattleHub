/**
 * ============================================================================
 * BATTLEHUB - MARVEL CONTEST OF CHAMPIONS (MCOC) COMMAND ENGINE
 * Authentic playcontestofchampions.com Events, Units Progression Tracker,
 * Leaderboard Ranking, Secret Elder Admin Clearance & Community Lounge
 * ============================================================================
 */

(function () {
  'use strict';

  // Storage Keys (v3 with BattleHub rebranding and Elder Admin)
  const DB_STORAGE_KEY = 'battlehub_mcoc_db_v3';
  const SESSION_STORAGE_KEY = 'battlehub_active_session_v3';

  // Canonical MCOC Progression Titles in strict order:
  // Challenger → Contender → Proven → Conqueror → Uncollected → Cavalier → Thronebreaker → Paragon → Valiant → Elder
  const PROGRESSION_TITLES = [
    'Challenger',
    'Contender',
    'Proven',
    'Conqueror',
    'Uncollected',
    'Cavalier',
    'Thronebreaker',
    'Paragon',
    'Valiant',
    'Elder'
  ];

  // 20 Official MCOC Champion Avatars with Classes, Themed Colors & Authentic Art
  const AVATAR_OPTIONS = [
    {
      id: 'doom',
      name: 'Doctor Doom',
      class: 'Mystic',
      icon: '🔮',
      color: '#9933ff',
      img: 'https://playcontestofchampions.com/wp-content/uploads/2026/11/events-nov2026-empireofdoom-480x420-1.webp'
    },
    {
      id: 'hercules',
      name: 'Hercules',
      class: 'Cosmic',
      icon: '⚡',
      color: '#00bfff',
      img: 'https://playcontestofchampions.com/wp-content/uploads/2026/11/events-nov2026-dawnofdestruction-480x420-1.webp'
    },
    {
      id: 'ghost',
      name: 'Ghost',
      class: 'Tech',
      icon: '👻',
      color: '#2563eb',
      img: 'https://playcontestofchampions.com/wp-content/uploads/2026/11/events-nov2026-quantumtangle-480x420-1.webp'
    },
    {
      id: 'fury',
      name: 'Nick Fury',
      class: 'Skill',
      icon: '🎯',
      color: '#dc2626',
      img: 'https://playcontestofchampions.com/wp-content/uploads/2026/11/events-nov2026-beastbountymission-480x420-1.webp'
    },
    {
      id: 'archangel',
      name: 'Archangel',
      class: 'Mutant',
      icon: '🪶',
      color: '#eab308',
      img: 'https://playcontestofchampions.com/wp-content/uploads/2026/10/events-oct2026-jackandhob-480x420-1.webp'
    },
    {
      id: 'kitty',
      name: 'Kitty Pryde',
      class: 'Mutant',
      icon: '🐱',
      color: '#eab308',
      img: 'https://playcontestofchampions.com/wp-content/uploads/2026/11/events-nov2026-starlordkittypryde-480x420-1.webp'
    },
    {
      id: 'torch',
      name: 'Human Torch',
      class: 'Science',
      icon: '🔥',
      color: '#16a34a',
      img: 'https://playcontestofchampions.com/wp-content/uploads/2026/09/events-sept2026-doomsday-480x420-1.webp'
    },
    {
      id: 'scorpion',
      name: 'Scorpion',
      class: 'Science',
      icon: '🦂',
      color: '#16a34a',
      img: 'https://playcontestofchampions.com/wp-content/uploads/2026/09/events-sept2026-viciousvariances-480x420-1.webp'
    },
    {
      id: 'nimrod',
      name: 'Nimrod',
      class: 'Tech',
      icon: '🤖',
      color: '#2563eb',
      img: 'https://playcontestofchampions.com/wp-content/uploads/2026/11/events-nov2026-doomeventtower-480x420-1.webp'
    },
    {
      id: 'shangchi',
      name: 'Shang‑Chi',
      class: 'Skill',
      icon: '🥋',
      color: '#dc2626',
      img: 'https://playcontestofchampions.com/wp-content/uploads/2026/11/events-nov2026-wareffort-480x420-1.webp'
    },
    {
      id: 'korg',
      name: 'Korg',
      class: 'Skill/Defense',
      icon: '🪨',
      color: '#dc2626',
      img: 'https://playcontestofchampions.com/wp-content/uploads/2026/11/events-nov2026-beast-480x420-1.webp'
    },
    {
      id: 'colossus',
      name: 'Colossus',
      class: 'Mutant',
      icon: '🛡️',
      color: '#eab308',
      img: 'https://playcontestofchampions.com/wp-content/uploads/2026/10/events-oct2026-colossus-480x420-1.webp'
    },
    {
      id: 'cgr',
      name: 'Cosmic Ghost Rider',
      class: 'Cosmic',
      icon: '💀',
      color: '#00bfff',
      img: 'https://playcontestofchampions.com/wp-content/uploads/2026/10/events-oct2026-ghostrider-480x420-1.webp'
    },
    {
      id: 'hyperion',
      name: 'Hyperion',
      class: 'Cosmic',
      icon: '☀️',
      color: '#00bfff',
      img: 'https://playcontestofchampions.com/wp-content/uploads/2026/11/events-nov2026-magikstellarforged-480x420-1.webp'
    },
    {
      id: 'omega',
      name: 'Omega Red',
      class: 'Mutant',
      icon: '🩸',
      color: '#eab308',
      img: 'https://playcontestofchampions.com/wp-content/uploads/2026/10/events-oct2026-closertotheedge-480x420-1.webp'
    },
    {
      id: 'warlock',
      name: 'Warlock',
      class: 'Tech',
      icon: '⚙️',
      color: '#2563eb',
      img: 'https://playcontestofchampions.com/wp-content/uploads/2026/11/events-nov2026-shuri-480x420-1.webp'
    },
    {
      id: 'void',
      name: 'Void',
      class: 'Science',
      icon: '🌌',
      color: '#16a34a',
      img: 'https://playcontestofchampions.com/wp-content/uploads/2026/10/events-oct2026-symbiotegenerals-480x420-1.webp'
    },
    {
      id: 'thing',
      name: 'Thing',
      class: 'Science',
      icon: '🧱',
      color: '#16a34a',
      img: 'https://playcontestofchampions.com/wp-content/uploads/2026/11/events-nov2026-sieges-480x420-1.webp'
    },
    {
      id: 'absorbing',
      name: 'Absorbing Man',
      class: 'Mystic',
      icon: '⛓️',
      color: '#9933ff',
      img: 'https://playcontestofchampions.com/wp-content/uploads/2026/11/events-nov2026-victorious4-480x420-1.webp'
    },
    {
      id: 'mojo',
      name: 'Mojo',
      class: 'Mystic',
      icon: '📺',
      color: '#9933ff',
      img: 'https://playcontestofchampions.com/wp-content/uploads/2026/10/events-oct2026-venomtheduck-480x420-1.webp'
    }
  ];

  // Milestone Definitions leading to 30,000 Banquet Goal
  const MILESTONES = [
    { id: 'm1', name: 'Milestone 1', target: 10000, desc: 'Phase 1 Savings Target' },
    { id: 'm2', name: 'Milestone 2', target: 12500, desc: 'Phase 2 Savings Target' },
    { id: 'm3', name: 'Milestone 3', target: 15000, desc: 'Halfway Vault Target' },
    { id: 'm4', name: 'Milestone 4', target: 18000, desc: 'Phase 4 Savings Target' },
    { id: 'm5', name: 'Milestone 5', target: 20000, desc: 'Phase 5 Major Vault' },
    { id: 'm6', name: 'Milestone 6', target: 22500, desc: 'Phase 6 Advanced Vault' },
    { id: 'm7', name: 'Milestone 7', target: 25000, desc: 'Phase 7 High Vault' },
    { id: 'm8', name: 'Milestone 8 (Banquet)', target: 30000, desc: '🎉 30,000 Banquet Event Vault Goal', isFinal: true }
  ];

  // Authentic Seed Database based directly on playcontestofchampions.com/events/
  const DEFAULT_DB = {
    events: [
      {
        id: 'evt-reclamation-war',
        title: 'The Reclamation War: Empire of Doom Resistance',
        category: 'Special Events',
        tag: 'Saga War',
        tagClass: 'special',
        dateRange: 'Active Saga Season',
        countdownTarget: '2026-12-15T18:00:00Z',
        summary: 'Join the worldwide resistance against Stellar-Forged Doctor Doom! Summoners unite in a collaborative war effort across the Battlerealm to reclaim corrupted territories, gather Doomscrip, unlock Shuri ascension items, and earn the 7-Star Doctor Doom.',
        details: `
          <h4>The Reclamation Campaign</h4>
          <p>The Battlerealm has fallen under the dominion of Stellar-Forged Doctor Doom. In this global community campaign, individual summoner efforts combine into realm-wide milestone liberations.</p>
          <h4>Core Objectives & Mechanics:</h4>
          <ul>
            <li><strong>Reclaim Contested Sectors:</strong> Complete daily event paths to weaken dimensional barriers.</li>
            <li><strong>Doomscrip Marketplace:</strong> Spend currency earned in warfare on 7-Star Ascension catalysts and Class Nexus selectors.</li>
            <li><strong>7-Star Doctor Doom Chase:</strong> Hit global milestone tiers with your alliance to unlock guaranteed pieces for 7-Star Doom.</li>
          </ul>
          <h4>Optimal Unit Savings Tip:</h4>
          <p>Do not burn units on revival bundles here! Use free daily quest energy and standard team rotations to farm Doomscrip while stockpiling units for the Banquet Vault.</p>
        `,
        rewards: ['7★ Doctor Doom Chase', 'Doomscrip Currency', '1,200 Units Milestone Pool', '7★ Titan Shards'],
        image: 'https://playcontestofchampions.com/wp-content/uploads/2026/11/events-nov2026-empireofdoom-480x420-1.webp',
        pinned: true
      },
      {
        id: 'evt-sieges-raids',
        title: 'Sieges: Gatekeeper Mini-Bosses & Overlord Raids',
        category: 'Game Updates',
        tag: 'Siege Raids',
        tagClass: 'quest',
        dateRange: 'Daily & Weekly Rotations',
        countdownTarget: '2026-11-25T18:00:00Z',
        summary: 'Massive cooperative community raid battles! Gatekeeper Sieges rotate every 24–72 hours requiring 4-Star attackers only (3 quest energy). Overlord Bosses feature multi-million shared global HP pools unlocked via milestones with 10 free daily deployment tokens.',
        details: `
          <h4>1. Gatekeeper Sieges (Daily Mini-Bosses)</h4>
          <p>Rotate frequently with Standard, Uncommon, and Rare rarities. Strict entry requirement: <strong>4-Star Champions Only!</strong> Costs 3 quest energy. Drops Locator Chips needed for Champion Ascension plus bonus daily unit caches.</p>
          <h4>2. Overlord Bosses (Weekly Major Community Bosses)</h4>
          <p>Immense shared global health pools. Does NOT cost quest energy; summoners receive <strong>10 free daily deployment tokens</strong>. Boss nodes shift dynamically as global health milestones are depleted by the community.</p>
        `,
        rewards: ['Locator Chips (Ascension)', 'Tier 6 Class Catalysts', 'Tier 4 Alpha Shards', 'Milestone Unit Caches'],
        image: 'https://playcontestofchampions.com/wp-content/uploads/2026/11/events-nov2026-sieges-480x420-1.webp',
        pinned: true
      },
      {
        id: 'evt-victorious-four',
        title: "The Victorious Four: Doom's Enforcers Special Event",
        category: 'Champion Spotlights',
        tag: 'Spotlight',
        tagClass: 'special',
        dateRange: 'Limited Time Event',
        countdownTarget: '2026-11-30T18:00:00Z',
        summary: "Face alternate-timeline champions hand-picked and augmented by Victor Von Doom. Special side quests feature class-specific gates, persistent power charges, and high-stagger requirements.",
        details: `
          <h4>The Victorious Four Roster & Mechanics:</h4>
          <p>Doom has trained a fearsome counter-force. Each boss requires specific tactical counters:
          <ul>
            <li><strong>Mystic Stagger:</strong> Bring Wiccan or Kushala to immediately nullify persistent fury buffs.</li>
            <li><strong>True Damage / Unstoppable:</strong> Hercules and Photon bypass heavy block reflections.</li>
            <li><strong>Absorbing Man:</strong> Provides unmatched physical resistance on bleed-burst lanes.</li>
          </ul>
          </p>
        `,
        rewards: ['Victorious Four Crystal', 'Rank 4 Rank-Up Gems', '750 Units Total Exploration'],
        image: 'https://playcontestofchampions.com/wp-content/uploads/2026/11/events-nov2026-victorious4-480x420-1.webp',
        pinned: false
      },
      {
        id: 'evt-banquet-2026',
        title: 'Annual Holiday Banquet Event: Greater Gifting Vault',
        category: 'Special Events',
        tag: 'Banquet 30K',
        tagClass: 'special',
        dateRange: 'Nov 15, 2026 - Jan 05, 2027',
        countdownTarget: '2026-12-20T18:00:00Z',
        summary: 'The cornerstone event of Marvel Contest of Champions! Open Banquet Crystals, gift your alliance, unlock ranked solo milestones, and attain guaranteed 7-Star Abyss Champions & Rank 4 Rank-Up Gems.',
        details: `
          <h4>How Banquet 2026 Works</h4>
          <p>Every December, Kabam launches the Banquet Event. Summoners spend units on Banquet Crystals (300 Units each) to earn milestone points for both Solo and Alliance realms.</p>
          <h4>Why Saving 30,000 Units Matters</h4>
          <p>Hitting the maximum tier requires approximately 30,000 Units. Doing so guarantees:
          <ul>
            <li>Top-tier 7-Star Selector Crystal (Class Nexus)</li>
            <li>Guaranteed 7-Star Titan Crystals</li>
            <li>Multiple Tier 6 Class Catalysts & Tier 4 Alpha Catalysts</li>
            <li>Exclusive Realm Rank Rewards and Badges</li>
          </ul>
          </p>
          <h4>Optimal Strategy</h4>
          <p>Save every daily super-event, complete all milestone arena runs, avoid buying daily cavalier crystals, and collect all calendar rewards before December 20th!</p>
        `,
        rewards: ['30,000 Unit Solo Cap', '7★ Titan Crystals', 'Rank 4 7★ Materials', 'Abyss Champion Selectors'],
        image: 'https://playcontestofchampions.com/wp-content/uploads/2024/08/10th-anniversary-social.jpg',
        pinned: true
      },
      {
        id: 'evt-battlegrounds-s28',
        title: 'Battlegrounds Season 28: Gladiator Circuit Node Meta',
        category: 'Tips & Tricks',
        tag: 'PvP Meta',
        tagClass: 'arena',
        dateRange: 'Nov 01 - Nov 28, 2026',
        countdownTarget: '2026-11-28T18:00:00Z',
        summary: 'Master the victory track nodes: "Polymorph Decay" and "Power Shield Reflection". Draft priority list and top banned champions revealed.',
        details: `
          <h4>Draft Meta Tier List</h4>
          <p><strong>Priority Bans:</strong> Onslaught, Serpent, Bullseye, Photon, Maestro.<br>
          <strong>Underrated Attackers:</strong> Silk, Spider-Punk, Kushala, Red Goblin.</p>
        `,
        rewards: ['Elder Marks', '600 Units Victory Track', 'Gladiator Trophy Tokens'],
        image: 'https://playcontestofchampions.com/wp-content/uploads/2026/11/events-nov2026-dawnofdestruction-480x420-1.webp',
        pinned: false
      },
      {
        id: 'evt-web-of-corruption',
        title: 'Web of Corruption: Symbiote Hive & Klyntar Outbreak',
        category: 'Special Events',
        tag: 'Klyntar Surge',
        tagClass: 'special',
        dateRange: 'Special Side Quest Season',
        countdownTarget: '2026-12-05T18:00:00Z',
        summary: 'Klyntar corruption infests the Battlerealm! Fight through mutating symbiote webs, gather Klyntar Catalysts to awaken symbiotic abilities, and conquer the Symbiote Boss Rush for massive unit caches and 7-Star rank materials.',
        details: `
          <h4>Web of Corruption Overview</h4>
          <p>Sourced directly from official game communications. The Symbiote Hive spreads through all dimensional sectors. Summoners must equip anti-bleed and bleed-immune attackers to overcome persistent bio-leach nodes.</p>
          <h4>Mechanics & Counter Strategies:</h4>
          <ul>
            <li><strong>Bio-Hazard & Poison Nodes:</strong> Bring Hulk, Red Guardian, or Nimrod to ignore toxic status effects.</li>
            <li><strong>Hive Mind Synergy:</strong> Defeating mini-bosses lowers the global corruption tier for your entire alliance.</li>
            <li><strong>Corruption Crystals:</strong> Redeem earned Klyntar samples for 500 bonus free Units and Tier 6 Class Fragments.</li>
          </ul>
        `,
        rewards: ['7★ Symbiote Supreme Shards', '500 Exploration Units', 'Klyntar Rank-Up Gem', 'Tier 4 Alpha Catalysts'],
        image: 'https://playcontestofchampions.com/wp-content/uploads/2026/06/events-july2026-webofcorruption-480x420-1.webp',
        pinned: true
      },
      {
        id: 'evt-summoners-choice-2027',
        title: "Summoner's Choice 2027: Global Community Bracket Vote",
        category: 'Community',
        tag: 'Official Vote',
        tagClass: 'arena',
        dateRange: 'Voting Phase 1 & 2',
        countdownTarget: '2026-12-10T18:00:00Z',
        summary: 'Kabam gives the power to the summoners! Cast your official vote in the 2027 Summoner\'s Choice bracket to determine which iconic Marvel hero or villain joins the Battlerealm next year with full champion spotlight development.',
        details: `
          <h4>Official Community Bracket</h4>
          <p>The annual Summoner's Choice competition pits 8 community-nominated champions in head-to-head tournament matchups on <a href="https://playcontestofchampions.com/" target="_blank" rel="noopener">playcontestofchampions.com</a>.</p>
          <h4>Participating & Earning Rewards:</h4>
          <ul>
            <li><strong>Vote In-Game & Online:</strong> Every vote grants Choice Voting Tokens redeemable in the Battlerealm store for units and energy refills.</li>
            <li><strong>Community Milestones:</strong> Total global ballots cast unlock tier rewards including 250 Units and 7-Star Hero Shards for all summoners.</li>
          </ul>
        `,
        rewards: ['Choice Champion Trophy', '250 Community Units', '7★ Hero Shards', 'Exclusive Voting Profile Badge'],
        image: 'https://playcontestofchampions.com/wp-content/uploads/2026/10/events-oct2026-summonerschoice-480x420-1.webp',
        pinned: false
      }
    ],

    users: [
      {
        id: 'usr-elder',
        email: 'elder@battlehub.realm',
        username: 'elder',
        password: 'MeliodasVz',
        ign: 'Elder Meliodas',
        title: 'Elder / Grand Administrator',
        role: 'admin',
        avatar: 'galan',
        startingUnits: 15000,
        dailyRate: 45,
        dailyQuestChecks: Array(30).fill(true),
        superEventChecks: Array(30).fill(true),
        mondayQuests: [true, true, true, true],
        arena: {
          fourStar: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
          sevenStarLong: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
          sevenStarShort: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
          fiveStar: [true, true, true, true, true, true, true, true, true, true]
        },
        monthlyRewards: {
          radiance: true,
          eq: true,
          calendar: true
        },
        extra: {
          battlechips: 3200,
          legend: 490,
          battlepass: 500,
          alliance: 450,
          promo: 200,
          special: 300
        },
        recentLogs: [
          { date: '2026-11-08', amount: 350, note: 'Elder realm supervision & arena grind' },
          { date: '2026-11-07', amount: 210, note: 'Super event & battlechips batch' }
        ]
      },
      {
        id: 'usr-hercules',
        email: 'herc@battlehub.realm',
        username: 'hercules',
        password: 'user123',
        ign: 'ValiantHercules',
        title: 'Valiant Summoner',
        role: 'user',
        avatar: 'hercules',
        startingUnits: 7920,
        dailyQuestChecks: Array(30).fill(true),
        superEventChecks: Array(30).fill(true),
        mondayQuests: [true, true, true, true],
        arena: {
          fourStar: [7, 8, 9, 9, 8, 8, 9, 7, 8, 0],
          sevenStarLong: [9, 9, 9, 9, 9, 9, 9, 9, 8, 0],
          sevenStarShort: [9, 9, 9, 9, 9, 9, 9, 9, 9, 0],
          fiveStar: [true, true, true, true, true, true, true, true, false, false]
        },
        monthlyRewards: {
          radiance: true,
          eq: true,
          calendar: true
        },
        extra: {
          battlechips: 1755,
          legend: 490,
          battlepass: 500,
          alliance: 0,
          promo: 0,
          special: 0
        },
        recentLogs: [
          { date: '2026-11-08', amount: 245, note: 'Arena streak + super event' },
          { date: '2026-11-07', amount: 160, note: 'Daily tasks cleared' },
          { date: '2026-11-05', amount: 350, note: 'Weekly battlechips opening' }
        ]
      },
      {
        id: 'usr-doom',
        email: 'doom@battlehub.realm',
        username: 'doom',
        password: 'user123',
        ign: 'LordDoomSupreme',
        title: 'Paragon Summoner',
        role: 'user',
        avatar: 'doom',
        startingUnits: 6400,
        dailyQuestChecks: Array(30).fill(true),
        superEventChecks: Array(30).fill(true),
        mondayQuests: [true, true, true, false],
        arena: {
          fourStar: [6, 6, 7, 7, 7, 7, 7, 6, 6, 0],
          sevenStarLong: [7, 7, 8, 8, 8, 8, 8, 7, 7, 0],
          sevenStarShort: [8, 8, 8, 8, 8, 8, 8, 8, 7, 0],
          fiveStar: [true, true, true, true, true, true, true, false, false, false]
        },
        monthlyRewards: {
          radiance: true,
          eq: true,
          calendar: true
        },
        extra: {
          battlechips: 1200,
          legend: 490,
          battlepass: 375,
          alliance: 150,
          promo: 50,
          special: 0
        },
        recentLogs: [
          { date: '2026-11-08', amount: 190, note: 'Daily Super Event & 7-Star arena' },
          { date: '2026-11-07', amount: 140, note: 'Daily EQ run' }
        ]
      },
      {
        id: 'usr-spidey',
        email: 'spidey@battlehub.realm',
        username: 'spidey',
        password: 'user123',
        ign: 'WebSlinger99',
        title: 'Thronebreaker',
        role: 'user',
        avatar: 'spiderman',
        startingUnits: 3800,
        dailyQuestChecks: Array(30).fill(false).map((_, i) => i % 2 === 0),
        superEventChecks: Array(30).fill(false).map((_, i) => i % 2 === 0),
        mondayQuests: [true, false, true, false],
        arena: {
          fourStar: [4, 4, 5, 5, 4, 4, 5, 4, 3, 0],
          sevenStarLong: [5, 5, 5, 6, 5, 5, 5, 5, 4, 0],
          sevenStarShort: [5, 5, 5, 6, 5, 5, 5, 5, 4, 0],
          fiveStar: [true, true, true, false, false, false, false, false, false, false]
        },
        monthlyRewards: {
          radiance: false,
          eq: true,
          calendar: true
        },
        extra: {
          battlechips: 600,
          legend: 200,
          battlepass: 250,
          alliance: 50,
          promo: 0,
          special: 0
        },
        recentLogs: [
          { date: '2026-11-08', amount: 95, note: 'Casual arena runs' }
        ]
      }
    ],

    comments: [
      {
        id: 'cmt-1',
        eventId: 'evt-reclamation-war',
        userId: 'usr-hercules',
        userName: 'ValiantHercules',
        userTitle: 'Valiant Summoner',
        userAvatar: 'hercules',
        content: 'The Reclamation War daily sector clearing gives a ton of Doomscrip. Make sure your alliance focuses on the gatekeeper mini-bosses to hit the community 7-Star Doom milestone faster!',
        timestamp: '1 hour ago',
        likes: 18,
        likedBy: []
      },
      {
        id: 'cmt-2',
        eventId: 'evt-sieges-raids',
        userId: 'usr-doom',
        userName: 'LordDoomSupreme',
        userTitle: 'Paragon Summoner',
        userAvatar: 'doom',
        content: 'For the Gatekeeper Sieges, remember they require 4-Star Champions only! Rank up your 4-Star Herc, Doom, and Nick Fury to clear them with 3 energy consistently.',
        timestamp: '3 hours ago',
        likes: 27,
        likedBy: []
      },
      {
        id: 'cmt-3',
        eventId: 'evt-banquet-2026',
        userId: 'usr-spidey',
        userName: 'WebSlinger99',
        userTitle: 'Thronebreaker',
        userAvatar: 'spiderman',
        content: 'I managed to save 9,380 units just following this BattleHub checklist! If you hit both 4-star and 7-star arenas twice a week, 30K is 100% doable by December without spending real money.',
        timestamp: '5 hours ago',
        likes: 14,
        likedBy: []
      }
    ]
  };

  // State
  let DB = null;
  let currentUser = null;
  let activeView = 'view-news';
  let activeLeaderboardFilter = 'monthly';
  let selectedEventForModal = null;
  let secretClickCount = 0;
  let secretClickTimer = null;

  // Initialize DB from LocalStorage or defaults
  function initDatabase() {
    const raw = localStorage.getItem(DB_STORAGE_KEY);
    if (raw) {
      try {
        DB = JSON.parse(raw);
      } catch (e) {
        console.warn('DB parse failed, resetting to defaults', e);
        DB = JSON.parse(JSON.stringify(DEFAULT_DB));
        saveDatabase();
      }
    } else {
      DB = JSON.parse(JSON.stringify(DEFAULT_DB));
      saveDatabase();
    }

    // Ensure all default official events are present
    if (DB && Array.isArray(DB.events)) {
      let updated = false;
      DEFAULT_DB.events.forEach(defEvt => {
        if (!DB.events.some(e => e.id === defEvt.id)) {
          DB.events.push(JSON.parse(JSON.stringify(defEvt)));
          updated = true;
        }
      });
      if (updated) saveDatabase();
    }

    // Load active session (NO DEFAULT LOGIN USER: Guest mode if not signed in)
    const activeUserId = localStorage.getItem(SESSION_STORAGE_KEY);
    if (activeUserId) {
      currentUser = DB.users.find(u => u.id === activeUserId) || null;
    } else {
      currentUser = null;
    }
  }

  function saveDatabase() {
    localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(DB));
  }

  function setSessionUser(user) {
    currentUser = user;
    if (user) {
      localStorage.setItem(SESSION_STORAGE_KEY, user.id);
      showToast(`Welcome, ${user.ign}! (${user.title || user.role})`, 'success');
    } else {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    }
    renderNav();
    refreshCurrentView();
  }

  function logout() {
    currentUser = null;
    localStorage.removeItem(SESSION_STORAGE_KEY);
    renderNav();
    switchView('view-news');
    showToast('Signed out of BattleHub successfully', 'info');
  }

  window.MCOC = window.MCOC || {};
  window.MCOC.logout = logout;

  // ==========================================================================
  // UNITS CALCULATION ENGINE (Directly replicates Units_Progression.xlsx)
  // ==========================================================================
  function calculateUserProgression(user) {
    if (!user) return { starting: 0, earned: 0, current: 0, milestonesMet: 0, banquetPct: 0 };

    const starting = user.startingUnits || 0;

    // 1. Daily Units (Super: 30u/day, DQ: 15u/day, Mon: 70u)
    const superCount = (user.superEventChecks || []).filter(Boolean).length;
    const superUnits = superCount * 30;

    const dqCount = (user.dailyQuestChecks || []).filter(Boolean).length;
    const dqUnits = dqCount * 15;

    const monCount = (user.mondayQuests || []).filter(Boolean).length;
    const monUnits = monCount * 70;

    const totalDaily = superUnits + dqUnits + monUnits;

    // 2. Weekly Arena Units
    const fourStarSum = (user.arena?.fourStar || []).reduce((a, b) => a + Number(b || 0), 0);
    const fourStarUnits = fourStarSum * 13;

    const sevenLongSum = (user.arena?.sevenStarLong || []).reduce((a, b) => a + Number(b || 0), 0);
    const sevenLongUnits = sevenLongSum * 15;

    const sevenShortSum = (user.arena?.sevenStarShort || []).reduce((a, b) => a + Number(b || 0), 0);
    const sevenShortUnits = sevenShortSum * 15;

    const fiveStarRuns = (user.arena?.fiveStar || []).filter(Boolean).length;
    const fiveStarUnits = fiveStarRuns * 30;

    const totalArena = fourStarUnits + sevenLongUnits + sevenShortUnits + fiveStarUnits;

    // 3. Monthly Rewards
    let totalMonthly = 0;
    if (user.monthlyRewards?.radiance) totalMonthly += 750;
    if (user.monthlyRewards?.eq) totalMonthly += 150;
    if (user.monthlyRewards?.calendar) totalMonthly += 100;

    // 4. Extra & Miscellaneous
    const ex = user.extra || {};
    const totalExtra = (Number(ex.battlechips) || 0) +
                       (Number(ex.legend) || 0) +
                       (Number(ex.battlepass) || 0) +
                       (Number(ex.alliance) || 0) +
                       (Number(ex.promo) || 0) +
                       (Number(ex.special) || 0);

    // 5. Total Units Earned & Current Total Balance
    const earned = totalDaily + totalArena + totalMonthly + totalExtra;
    const current = starting + earned;

    // Milestones Calculation
    let milestonesMet = 0;
    MILESTONES.forEach(m => {
      if (current >= m.target) milestonesMet++;
    });

    const banquetTarget = 30000;
    const banquetPct = Math.min(100, Math.round((current / banquetTarget) * 100 * 10) / 10);
    const remainingToBanquet = Math.max(0, banquetTarget - current);

    // Next Milestone
    const nextMilestone = MILESTONES.find(m => current < m.target) || MILESTONES[MILESTONES.length - 1];
    const remainingToNext = Math.max(0, nextMilestone.target - current);

    // Period specific estimates for leaderboards
    const dailyPace = user.recentLogs && user.recentLogs.length > 0
      ? user.recentLogs[0].amount
      : Math.round((earned / 30) || 75);

    const weeklyGain = user.recentLogs
      ? user.recentLogs.slice(0, 7).reduce((acc, l) => acc + (l.amount || 0), 0) || Math.round(dailyPace * 7)
      : Math.round(dailyPace * 7);

    const monthlyGain = earned;

    return {
      starting,
      earned,
      current,
      totalDaily,
      totalArena,
      totalMonthly,
      totalExtra,
      milestonesMet,
      totalMilestones: MILESTONES.length,
      banquetPct,
      remainingToBanquet,
      nextMilestone,
      remainingToNext,
      dailyPace,
      weeklyGain,
      monthlyGain
    };
  }

  // ==========================================================================
  // NAVIGATION & UI ROUTER
  // ==========================================================================
  function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-tab-btn');
    navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetView = btn.dataset.view;
        switchView(targetView);
      });
    });

    // Brand logo returns to news
    const brand = document.querySelector('.brand-section');
    if (brand) {
      brand.addEventListener('click', (e) => {
        e.preventDefault();
        switchView('view-news');
      });
    }

    // User badge pill opens profile/auth modal
    const userBadge = document.getElementById('nav-user-pill');
    if (userBadge) {
      userBadge.addEventListener('click', () => {
        openModal('modal-auth');
      });
    }

    // Sign out button
    const logoutBtn = document.getElementById('btn-nav-logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        logout();
      });
    }
  }

  function switchView(viewId) {
    // 1. STRICT SECURITY: If target is view-admin, only allow if currentUser && currentUser.role === 'admin'
    if (viewId === 'view-admin') {
      if (!currentUser || currentUser.role !== 'admin') {
        showToast('Access Denied: Elder Admin clearance required', 'error');
        switchView('view-news');
        return;
      }
    }

    // 2. AUTH GATING: Only News section is accessible without login!
    if (viewId !== 'view-news' && !currentUser) {
      showToast('🔒 Access Restricted: Please sign in or create an account to access this sector', 'error');
      openAuthModal('login');
    }

    activeView = viewId;

    // Update active tab button
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === viewId);
    });

    // Update visible view container
    document.querySelectorAll('.view-section').forEach(view => {
      view.classList.toggle('active', view.id === viewId);
    });

    // Render corresponding view data
    refreshCurrentView();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  window.MCOC.switchView = switchView;

  function renderLockedSector(viewId) {
    const titles = {
      'view-tracker': 'UNITS PROGRESSION COMMAND & VAULT TRACKER',
      'view-leaderboard': 'BATTLEREALM LEADERBOARDS & SUMMONER RANKINGS',
      'view-discussion': 'SUMMONER STRATEGY LOUNGE & WAR ROOM'
    };
    const title = titles[viewId] || 'RESTRICTED SECTOR';
    const container = document.getElementById(viewId);
    if (!container) return;

    container.innerHTML = `
      <div class="locked-sector-gate">
        <div class="locked-icon-pulse">🔒</div>
        <h3 class="locked-title">${title}</h3>
        <p class="locked-desc">
          Summoner Clearance Required. Only the official News section is accessible to guests. Sign in or create your personal Summoner account to track units progression, compare milestones, and join the strategy lounge.
        </p>
        <div class="locked-action-row">
          <button class="btn btn-marvel" onclick="window.MCOC.openAuthModal('login')">⚔️ Sign In as Summoner</button>
          <button class="btn btn-primary" onclick="window.MCOC.openAuthModal('signup')">✨ Create Free Account</button>
          <button class="btn btn-outline" onclick="window.MCOC.switchView('view-news')">📰 Browse Official News</button>
        </div>
      </div>
    `;
  }

  function refreshCurrentView() {
    renderNav();
    if (!currentUser && activeView !== 'view-news') {
      renderLockedSector(activeView);
      return;
    }

    switch (activeView) {
      case 'view-news':
        renderNewsHub();
        break;
      case 'view-tracker':
        renderUnitsTracker();
        break;
      case 'view-leaderboard':
        renderLeaderboards();
        break;
      case 'view-discussion':
        renderDiscussions();
        break;
      case 'view-admin':
        renderAdminPortal();
        break;
    }
  }

  function renderNav() {
    const userIgnEl = document.getElementById('nav-user-ign');
    const userRoleEl = document.getElementById('nav-user-role');
    const userAvatarEl = document.getElementById('nav-user-avatar');
    const navUnitsEl = document.getElementById('nav-units-count');
    const adminNavBtn = document.getElementById('nav-admin-btn');
    const logoutBtn = document.getElementById('btn-nav-logout');

    if (currentUser) {
      if (userIgnEl) userIgnEl.textContent = currentUser.ign;
      if (userRoleEl) userRoleEl.textContent = currentUser.title || 'Summoner';

      const avatarMeta = AVATAR_OPTIONS.find(a => a.id === currentUser.avatar) || AVATAR_OPTIONS[0];
      if (userAvatarEl) {
        userAvatarEl.style.borderColor = avatarMeta.color || 'var(--contest-gold)';
        userAvatarEl.style.boxShadow = `0 0 10px ${avatarMeta.color || 'var(--contest-gold)'}`;
        userAvatarEl.innerHTML = `<img src="${avatarMeta.img}" alt="${escapeHTML(currentUser.ign)}" onerror="this.onerror=null; this.src='https://playcontestofchampions.com/wp-content/uploads/2021/12/mcoc-default-user-icon.png';">`;
      }

      const prog = calculateUserProgression(currentUser);
      if (navUnitsEl) {
        navUnitsEl.textContent = prog.current.toLocaleString();
      }

      // CRITICAL: HIDE ADMIN CONTROL FROM ALL USERS EXCEPT ADMIN
      if (adminNavBtn) {
        adminNavBtn.style.display = (currentUser.role === 'admin') ? 'inline-flex' : 'none';
      }

      if (logoutBtn) {
        logoutBtn.style.display = 'inline-flex';
      }
    } else {
      if (userIgnEl) userIgnEl.textContent = 'Guest';
      if (userRoleEl) userRoleEl.textContent = 'Sign In / Join';
      if (userAvatarEl) {
        userAvatarEl.style.borderColor = 'var(--mcoc-card-border)';
        userAvatarEl.style.boxShadow = 'none';
        userAvatarEl.innerHTML = `<span style="font-size: 1.1rem;">👤</span>`;
      }
      if (navUnitsEl) {
        navUnitsEl.textContent = '--';
      }
      if (adminNavBtn) {
        adminNavBtn.style.display = 'none';
      }
      if (logoutBtn) {
        logoutBtn.style.display = 'none';
      }
    }
  }

  // ==========================================================================
  // VIEW 1: NEWS & EVENT EXPLANATION (Official playcontestofchampions.com info)
  // ==========================================================================
  function renderNewsHub() {
    const grid = document.getElementById('news-cards-grid');
    if (!grid) return;

    const filterVal = document.querySelector('.filter-pill.active')?.dataset.filter || 'all';
    const searchVal = (document.getElementById('news-search-input')?.value || '').toLowerCase();

    let filtered = DB.events.filter(evt => {
      const matchCategory = filterVal === 'all' || evt.category === filterVal;
      const matchSearch = evt.title.toLowerCase().includes(searchVal) ||
                          evt.summary.toLowerCase().includes(searchVal) ||
                          evt.tag.toLowerCase().includes(searchVal);
      return matchCategory && matchSearch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-dim);">
          <p style="font-size: 1.1rem; margin-bottom: 0.5rem;">No BattleHub events match your criteria</p>
          <button class="btn btn-outline btn-sm" onclick="resetNewsFilter()">Reset Filters</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(evt => {
      const commentCount = DB.comments.filter(c => c.eventId === evt.id).length;
      return `
        <div class="event-card" onclick="window.MCOC.openEventDetails('${evt.id}')">
          <div class="event-card-banner" style="background-image: url('${evt.image}')">
            <span class="event-tag-badge ${evt.tagClass || ''}">${evt.tag}</span>
            <span class="event-timer-badge">📅 ${evt.dateRange.split('-')[0].trim()}</span>
          </div>
          <div class="event-card-body">
            <span class="event-card-date">${evt.category}</span>
            <h4 class="event-card-title">${escapeHTML(evt.title)}</h4>
            <p class="event-card-desc">${escapeHTML(evt.summary)}</p>
            <div class="event-card-rewards-chips">
              ${evt.rewards.map(r => `<span class="reward-chip"><span style="color:var(--contest-gold)">★</span> ${escapeHTML(r)}</span>`).join('')}
            </div>
            <div class="event-card-footer">
              <span class="comment-count-chip">💬 ${commentCount} Discussion${commentCount === 1 ? '' : 's'}</span>
              <span style="color: var(--contest-gold); font-weight: 800; font-family: var(--font-display); font-size: 0.8rem;">Read Intel & Guide →</span>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  function setupNewsHubEvents() {
    const filterPills = document.querySelectorAll('.filter-pill');
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        renderNewsHub();
      });
    });

    const searchInput = document.getElementById('news-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        renderNewsHub();
      });
    }
  }

  window.resetNewsFilter = function () {
    const searchInput = document.getElementById('news-search-input');
    if (searchInput) searchInput.value = '';
    document.querySelectorAll('.filter-pill').forEach((p, idx) => {
      p.classList.toggle('active', idx === 0);
    });
    renderNewsHub();
  };

  function openEventDetails(eventId) {
    const evt = DB.events.find(e => e.id === eventId);
    if (!evt) return;

    selectedEventForModal = evt;
    const modal = document.getElementById('modal-event-detail');
    const container = document.getElementById('event-detail-content');
    if (!modal || !container) return;

    const eventComments = DB.comments.filter(c => c.eventId === evt.id);

    container.innerHTML = `
      <div style="position: relative; height: 260px; overflow: hidden; margin-bottom: 1.75rem; background: url('${evt.image}') center/cover; clip-path: var(--clip-chamfer-card); border: 1px solid var(--mcoc-card-border);">
        <div style="position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,11,20,0.2), rgba(0,11,20,0.95)); padding: 1.75rem; display: flex; flex-direction: column; justify-content: flex-end;">
          <span class="event-tag-badge ${evt.tagClass || ''}" style="width: fit-content; margin-bottom: 0.5rem;">${evt.tag}</span>
          <h2 style="font-family: var(--font-display); font-size: 1.6rem; color: #fff; text-transform: uppercase;">${escapeHTML(evt.title)}</h2>
          <span style="font-size: 0.85rem; color: var(--contest-gold); font-weight: 700;">Active: ${evt.dateRange}</span>
        </div>
      </div>

      <div style="margin-bottom: 2rem;">
        <div style="font-size: 0.95rem; line-height: 1.7; color: var(--text-primary); margin-bottom: 1.75rem;">
          ${evt.details || `<p>${escapeHTML(evt.summary)}</p>`}
        </div>

        <div style="background: var(--mcoc-card); padding: 1.25rem 1.5rem; border: 1px solid var(--mcoc-card-border); clip-path: var(--clip-chamfer-btn); margin-bottom: 1.75rem;">
          <h4 style="font-family: var(--font-display); font-size: 0.95rem; color: var(--contest-gold); margin-bottom: 0.75rem; text-transform: uppercase;">Milestone Rewards & Yield</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            ${evt.rewards.map(r => `<span class="reward-chip" style="font-size: 0.85rem; padding: 0.4rem 0.85rem;"><span style="color:var(--contest-gold)">★</span> ${escapeHTML(r)}</span>`).join('')}
          </div>
        </div>
      </div>

      <!-- Event Discussion Section -->
      <div style="border-top: 2px solid var(--mcoc-card-border); padding-top: 1.75rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
          <h4 style="font-family: var(--font-display); font-size: 1.15rem; color: var(--cyan-cosmic); text-transform: uppercase;">💬 Summoner Strategy & Discussions (${eventComments.length})</h4>
        </div>

        <!-- Add Comment Form for this event -->
        <div style="background: var(--mcoc-input-bg); padding: 1.25rem; border: 1px solid var(--mcoc-card-border); margin-bottom: 1.75rem; clip-path: var(--clip-chamfer-btn);">
          <textarea id="event-comment-textarea" class="comment-input-area" placeholder="Share your strategy, rank-up advice, or question about this event..." style="min-height: 75px;"></textarea>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.78rem; color: var(--text-dim);">Posting as: <strong>${currentUser.ign}</strong></span>
            <button class="btn btn-marvel btn-sm" onclick="window.MCOC.postEventComment('${evt.id}')">Post Comment</button>
          </div>
        </div>

        <!-- Comments list -->
        <div class="comments-stream" id="event-comments-stream">
          ${renderCommentCards(eventComments)}
        </div>
      </div>
    `;

    openModal('modal-event-detail');
  }

  // ==========================================================================
  // KABAM CONTENT CREATOR COMPLIANCE & FAIR-PLAY MODERATION FILTER
  // ==========================================================================
  const FORBIDDEN_CONTENT_PATTERNS = [
    { pattern: /\b(hack|hacks|hacked|hacking)\b/i, reason: 'Hacking discussion is strictly prohibited by Kabam rules.' },
    { pattern: /\b(cheat|cheats|cheating|cheater)\b/i, reason: 'Cheating instructions violate fair play and Kabam ToS.' },
    { pattern: /\b(bot|bots|botting|autoclicker|auto-clicker)\b/i, reason: 'Automated bots and scripts are forbidden.' },
    { pattern: /\b(datamine|datamined|datamining)\b/i, reason: 'Datamines and unreleased files violate creator NDA rules.' },
    { pattern: /\b(leak|leaks|leaked|leaking)\b/i, reason: 'Leaks and embargo breaches are not permitted on fan sites.' },
    { pattern: /\b(mod apk|apk mod|modded apk|cracked)\b/i, reason: 'Modified game clients violate copyright and ToS.' },
    { pattern: /\b(buy units|sell account|account selling|buy account)\b/i, reason: 'Account trading or unit sales violate ToS.' }
  ];

  function validateCommentContent(text) {
    if (!text) return { valid: false, reason: 'Empty content.' };
    for (const rule of FORBIDDEN_CONTENT_PATTERNS) {
      if (rule.pattern.test(text)) {
        return { valid: false, reason: rule.reason };
      }
    }
    return { valid: true };
  }

  window.MCOC = window.MCOC || {};
  window.MCOC.openEventDetails = openEventDetails;

  window.MCOC.postEventComment = function (eventId) {
    const textEl = document.getElementById('event-comment-textarea');
    if (!textEl || !textEl.value.trim()) {
      showToast('Please type a message before posting', 'error');
      return;
    }

    const trimmed = textEl.value.trim();
    const check = validateCommentContent(trimmed);
    if (!check.valid) {
      showToast(`🛡️ Kabam Policy: ${check.reason}`, 'error');
      return;
    }

    const newComment = {
      id: 'cmt-' + Date.now(),
      eventId: eventId,
      userId: currentUser.id,
      userName: currentUser.ign,
      userTitle: currentUser.title || 'Summoner',
      userAvatar: currentUser.avatar || 'hercules',
      content: trimmed,
      timestamp: 'Just now',
      likes: 0,
      likedBy: []
    };

    DB.comments.unshift(newComment);
    saveDatabase();
    textEl.value = '';

    const stream = document.getElementById('event-comments-stream');
    if (stream) {
      const updatedComments = DB.comments.filter(c => c.eventId === eventId);
      stream.innerHTML = renderCommentCards(updatedComments);
    }
    showToast('Your comment was posted to the event discussion!', 'success');
  };

  // ==========================================================================
  // VIEW 2: UNITS PROGRESSION TRACKER (Replicating Units_Progression.xlsx)
  // ==========================================================================
  function renderUnitsTracker() {
    if (!currentUser) return;

    const prog = calculateUserProgression(currentUser);

    // Summary Metrics
    document.getElementById('metric-initial-units').textContent = prog.starting.toLocaleString();
    document.getElementById('metric-total-earned').textContent = '+' + prog.earned.toLocaleString();
    document.getElementById('metric-current-balance').textContent = prog.current.toLocaleString();
    document.getElementById('metric-milestones-ratio').textContent = `${prog.milestonesMet} of ${prog.totalMilestones} Met`;

    // Banquet 30K Bar
    const banquetFill = document.getElementById('banquet-progress-fill');
    const banquetPctText = document.getElementById('banquet-pct-text');
    const banquetRemText = document.getElementById('banquet-remaining-text');

    if (banquetFill) banquetFill.style.width = `${prog.banquetPct}%`;
    if (banquetPctText) banquetPctText.textContent = `${prog.banquetPct}% Reached`;
    if (banquetRemText) {
      banquetRemText.textContent = prog.remainingToBanquet > 0
        ? `${prog.remainingToBanquet.toLocaleString()} Units Remaining for 30K Banquet`
        : '🎉 30,000 UNITS BANQUET GOAL ACHIEVED!';
    }

    // Milestones Row
    const milestonesRow = document.getElementById('milestones-indicator-row');
    if (milestonesRow) {
      milestonesRow.innerHTML = MILESTONES.map(m => {
        const isMet = prog.current >= m.target;
        return `
          <div class="milestone-step-chip ${isMet ? 'achieved' : ''} ${m.isFinal ? 'final' : ''}">
            <div class="m-step-target">${(m.target).toLocaleString()}</div>
            <div class="m-step-status">${isMet ? '✅ ACHIEVED' : '⏳ PENDING'}</div>
          </div>
        `;
      }).join('');
    }

    // Starting units input value
    const startInput = document.getElementById('input-starting-units');
    if (startInput) startInput.value = currentUser.startingUnits || 0;

    renderTrackerSubtabContent();
  }

  let activeTrackerSubtab = 'subtab-daily';

  function setupTrackerEvents() {
    const startInput = document.getElementById('input-starting-units');
    const saveStartBtn = document.getElementById('btn-save-starting-units');
    if (saveStartBtn && startInput) {
      saveStartBtn.addEventListener('click', () => {
        const val = parseInt(startInput.value, 10);
        if (isNaN(val) || val < 0) {
          showToast('Please enter a valid starting balance', 'error');
          return;
        }
        currentUser.startingUnits = val;
        saveDatabase();
        renderUnitsTracker();
        renderNav();
        showToast('Starting balance updated!', 'success');
      });
    }

    const subtabButtons = document.querySelectorAll('.tracker-subtab-btn');
    subtabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        subtabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeTrackerSubtab = btn.dataset.subtab;
        renderTrackerSubtabContent();
      });
    });
  }

  function renderTrackerSubtabContent() {
    const container = document.getElementById('tracker-subtab-content');
    if (!container) return;

    if (activeTrackerSubtab === 'subtab-daily') {
      renderDailyChecklist(container);
    } else if (activeTrackerSubtab === 'subtab-arena') {
      renderArenaTable(container);
    } else if (activeTrackerSubtab === 'subtab-monthly') {
      renderMonthlyRewards(container);
    } else if (activeTrackerSubtab === 'subtab-extra') {
      renderExtraTable(container);
    }
  }

  // 1. Daily Checklist (Super Event 30u + Daily Quest 15u + Monday Quest 70u)
  function renderDailyChecklist(container) {
    const superChecks = currentUser.superEventChecks || Array(30).fill(false);
    const dqChecks = currentUser.dailyQuestChecks || Array(30).fill(false);
    const monChecks = currentUser.mondayQuests || Array(4).fill(false);

    let rowsHTML = '';
    for (let day = 1; day <= 30; day++) {
      const isMonday = (day % 7 === 0);
      const superChecked = !!superChecks[day - 1];
      const dqChecked = !isMonday && !!dqChecks[day - 1];
      const dailyTotal = (superChecked ? 30 : 0) + (dqChecked ? 15 : 0) + (isMonday && monChecks[Math.floor((day-1)/7)] ? 70 : 0);

      rowsHTML += `
        <tr>
          <td style="font-weight:800; font-family:var(--font-mono);">Day ${day}</td>
          <td>${isMonday ? '<span style="color:var(--contest-gold); font-weight:800;">Mon (Special)</span>' : 'Standard'}</td>
          <td style="text-align: center;">
            <input type="checkbox" class="custom-checkbox" ${superChecked ? 'checked' : ''} onchange="window.MCOC.toggleDailyCheck('super', ${day - 1}, this.checked)">
            <span style="font-size:0.75rem; color:var(--text-dim); margin-left:4px;">30 u</span>
          </td>
          <td style="text-align: center;">
            ${isMonday ? '<span style="color:var(--text-dim); font-size:0.75rem;">No Daily Quest</span>' : `
              <input type="checkbox" class="custom-checkbox" ${dqChecked ? 'checked' : ''} onchange="window.MCOC.toggleDailyCheck('dq', ${day - 1}, this.checked)">
              <span style="font-size:0.75rem; color:var(--text-dim); margin-left:4px;">15 u</span>
            `}
          </td>
          <td style="text-align: right; font-family:var(--font-mono); font-weight:800; color:var(--contest-gold-light);">
            +${dailyTotal} Units
          </td>
        </tr>
      `;
    }

    container.innerHTML = `
      <div class="mcoc-card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; flex-wrap:wrap; gap:0.5rem;">
          <div>
            <h4 style="font-family:var(--font-display); font-size:1.15rem; color:var(--cyan-cosmic); text-transform: uppercase;">1. Daily Tasks Checklist (30 Days)</h4>
            <p style="font-size:0.85rem; color:var(--text-muted);">Super Event gives 30 units/day. Daily Quests yield 15 units/day (Tuesday through Sunday).</p>
          </div>
          <div style="display:flex; gap:0.5rem;">
            <button class="btn btn-outline btn-sm" onclick="window.MCOC.bulkToggleDaily(true)">Check All</button>
            <button class="btn btn-outline btn-sm" onclick="window.MCOC.bulkToggleDaily(false)">Clear All</button>
          </div>
        </div>

        <!-- Monday Special Quests (4 Mondays) -->
        <div style="background: rgba(255, 204, 0, 0.08); border: 1px solid var(--contest-gold); padding: 1.25rem; margin-bottom: 1.5rem; clip-path: var(--clip-chamfer-btn);">
          <h5 style="font-family:var(--font-display); font-size:0.9rem; color:var(--contest-gold); margin-bottom:0.6rem; text-transform: uppercase;">⭐ Monday Special Solo Quests (70 Units Each)</h5>
          <div style="display:flex; gap:1.75rem; flex-wrap:wrap;">
            ${[1, 2, 3, 4].map((mIdx) => {
              const checked = !!monChecks[mIdx - 1];
              return `
                <label style="display:flex; align-items:center; gap:0.55rem; font-size:0.88rem; cursor:pointer;">
                  <input type="checkbox" class="custom-checkbox" ${checked ? 'checked' : ''} onchange="window.MCOC.toggleMondayCheck(${mIdx - 1}, this.checked)">
                  <span>Monday #${mIdx} (70 Units)</span>
                </label>
              `;
            }).join('')}
          </div>
        </div>

        <div class="table-responsive-box" style="max-height: 480px; overflow-y: auto;">
          <table class="mcoc-table">
            <thead>
              <tr>
                <th>Day</th>
                <th>Type</th>
                <th style="text-align: center;">Super Event (30u)</th>
                <th style="text-align: center;">Daily Quest (15u)</th>
                <th style="text-align: right;">Day Total</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHTML}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  window.MCOC.toggleDailyCheck = function (type, index, isChecked) {
    if (!currentUser) return;
    if (type === 'super') {
      if (!currentUser.superEventChecks) currentUser.superEventChecks = Array(30).fill(false);
      currentUser.superEventChecks[index] = isChecked;
    } else if (type === 'dq') {
      if (!currentUser.dailyQuestChecks) currentUser.dailyQuestChecks = Array(30).fill(false);
      currentUser.dailyQuestChecks[index] = isChecked;
    }
    saveDatabase();
    renderUnitsTracker();
    renderNav();
  };

  window.MCOC.toggleMondayCheck = function (index, isChecked) {
    if (!currentUser) return;
    if (!currentUser.mondayQuests) currentUser.mondayQuests = Array(4).fill(false);
    currentUser.mondayQuests[index] = isChecked;
    saveDatabase();
    renderUnitsTracker();
    renderNav();
  };

  window.MCOC.bulkToggleDaily = function (status) {
    if (!currentUser) return;
    currentUser.superEventChecks = Array(30).fill(status);
    currentUser.dailyQuestChecks = Array(30).fill(status);
    currentUser.mondayQuests = Array(4).fill(status);
    saveDatabase();
    renderUnitsTracker();
    renderNav();
    showToast(status ? 'All daily tasks checked!' : 'Daily tasks cleared', 'info');
  };

  // 2. Weekly Arena Table (10 runs across 5 weeks)
  function renderArenaTable(container) {
    const arena = currentUser.arena || {
      fourStar: Array(10).fill(0),
      sevenStarLong: Array(10).fill(0),
      sevenStarShort: Array(10).fill(0),
      fiveStar: Array(10).fill(false)
    };

    const runHeaders = ['W1 R1', 'W1 R2', 'W2 R1', 'W2 R2', 'W3 R1', 'W3 R2', 'W4 R1', 'W4 R2', 'W5 R1', 'W5 R2'];

    const fourStarSum = arena.fourStar.reduce((a, b) => a + Number(b || 0), 0);
    const sevenLongSum = arena.sevenStarLong.reduce((a, b) => a + Number(b || 0), 0);
    const sevenShortSum = arena.sevenStarShort.reduce((a, b) => a + Number(b || 0), 0);
    const fiveStarRuns = arena.fiveStar.filter(Boolean).length;

    container.innerHTML = `
      <div class="mcoc-card">
        <h4 style="font-family:var(--font-display); font-size:1.15rem; color:var(--cyan-cosmic); margin-bottom:0.35rem; text-transform: uppercase;">2. Weekly Arena Milestones Table</h4>
        <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:1.5rem;">Enter the milestones completed (0-9) for each 3-day arena rotation. 4★ pays 13u/milestone; 7★ pays 15u/milestone; 5★ pays 30u flat per run.</p>

        <div class="table-responsive-box">
          <table class="mcoc-table">
            <thead>
              <tr>
                <th>Arena Event Type</th>
                <th>Rate / Rule</th>
                ${runHeaders.map(h => `<th style="text-align:center;">${h}</th>`).join('')}
                <th style="text-align:center;">Total Ms</th>
                <th style="text-align:right;">Total Units</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="font-weight:800;">4★ Star Arena</td>
                <td style="color:var(--text-dim); font-size:0.8rem;">13 units / ms</td>
                ${arena.fourStar.map((val, idx) => `
                  <td style="text-align:center;">
                    <input type="number" min="0" max="9" class="number-input-sm" value="${val}" onchange="window.MCOC.updateArenaValue('fourStar', ${idx}, this.value)">
                  </td>
                `).join('')}
                <td style="text-align:center; font-weight:800; font-family:var(--font-mono);">${fourStarSum}</td>
                <td style="text-align:right; font-weight:900; color:var(--contest-gold); font-family:var(--font-mono);">${(fourStarSum * 13).toLocaleString()}</td>
              </tr>

              <tr>
                <td style="font-weight:800;">7★ Long Arena</td>
                <td style="color:var(--text-dim); font-size:0.8rem;">15 units / ms</td>
                ${arena.sevenStarLong.map((val, idx) => `
                  <td style="text-align:center;">
                    <input type="number" min="0" max="9" class="number-input-sm" value="${val}" onchange="window.MCOC.updateArenaValue('sevenStarLong', ${idx}, this.value)">
                  </td>
                `).join('')}
                <td style="text-align:center; font-weight:800; font-family:var(--font-mono);">${sevenLongSum}</td>
                <td style="text-align:right; font-weight:900; color:var(--contest-gold); font-family:var(--font-mono);">${(sevenLongSum * 15).toLocaleString()}</td>
              </tr>

              <tr>
                <td style="font-weight:800;">7★ Short Arena</td>
                <td style="color:var(--text-dim); font-size:0.8rem;">15 units / ms</td>
                ${arena.sevenStarShort.map((val, idx) => `
                  <td style="text-align:center;">
                    <input type="number" min="0" max="9" class="number-input-sm" value="${val}" onchange="window.MCOC.updateArenaValue('sevenStarShort', ${idx}, this.value)">
                  </td>
                `).join('')}
                <td style="text-align:center; font-weight:800; font-family:var(--font-mono);">${sevenShortSum}</td>
                <td style="text-align:right; font-weight:900; color:var(--contest-gold); font-family:var(--font-mono);">${(sevenShortSum * 15).toLocaleString()}</td>
              </tr>

              <tr>
                <td style="font-weight:800;">5★ Star Arena</td>
                <td style="color:var(--text-dim); font-size:0.8rem;">30 units flat</td>
                ${arena.fiveStar.map((val, idx) => `
                  <td style="text-align:center;">
                    <input type="checkbox" class="custom-checkbox" ${val ? 'checked' : ''} onchange="window.MCOC.updateArenaFiveStar(${idx}, this.checked)">
                  </td>
                `).join('')}
                <td style="text-align:center; font-weight:800; font-family:var(--font-mono);">${fiveStarRuns}</td>
                <td style="text-align:right; font-weight:900; color:var(--contest-gold); font-family:var(--font-mono);">${(fiveStarRuns * 30).toLocaleString()}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr style="background:rgba(255,204,0,0.04); font-weight:800;">
                <td colspan="12" style="text-align:right; font-family:var(--font-display); color:var(--contest-gold);">TOTAL ARENA UNITS EARNED:</td>
                <td style="text-align:right; font-size:1.25rem; color:var(--contest-gold-light); font-family:var(--font-mono);">
                  ${((fourStarSum * 13) + (sevenLongSum * 15) + (sevenShortSum * 15) + (fiveStarRuns * 30)).toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    `;
  }

  window.MCOC.updateArenaValue = function (type, index, value) {
    if (!currentUser || !currentUser.arena) return;
    const num = Math.max(0, Math.min(9, parseInt(value, 10) || 0));
    currentUser.arena[type][index] = num;
    saveDatabase();
    renderUnitsTracker();
    renderNav();
  };

  window.MCOC.updateArenaFiveStar = function (index, isChecked) {
    if (!currentUser || !currentUser.arena) return;
    currentUser.arena.fiveStar[index] = isChecked;
    saveDatabase();
    renderUnitsTracker();
    renderNav();
  };

  // 3. Monthly Rewards
  function renderMonthlyRewards(container) {
    const monthly = currentUser.monthlyRewards || { radiance: false, eq: false, calendar: false };

    container.innerHTML = `
      <div class="mcoc-card">
        <h4 style="font-family:var(--font-display); font-size:1.15rem; color:var(--cyan-cosmic); margin-bottom:0.35rem; text-transform: uppercase;">3. Monthly Rewards Table</h4>
        <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:1.5rem;">Toggle completion of monthly non-repeatable unit objectives.</p>

        <div style="display:flex; flex-direction:column; gap:1.25rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; background:var(--mcoc-surface); padding:1.25rem 1.5rem; border:1px solid var(--mcoc-card-border); clip-path:var(--clip-chamfer-btn);">
            <div>
              <h5 style="font-family:var(--font-display); font-size:1rem; font-weight:800; color:#fff;">Radiance Event Completion</h5>
              <p style="font-size:0.82rem; color:var(--text-dim);">Monthly special objective milestone completion</p>
            </div>
            <div style="display:flex; align-items:center; gap:1.5rem;">
              <span style="font-family:var(--font-mono); font-weight:900; font-size:1.15rem; color:var(--contest-gold);">+750 Units</span>
              <input type="checkbox" class="custom-checkbox" ${monthly.radiance ? 'checked' : ''} onchange="window.MCOC.toggleMonthlyReward('radiance', this.checked)">
            </div>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; background:var(--mcoc-surface); padding:1.25rem 1.5rem; border:1px solid var(--mcoc-card-border); clip-path:var(--clip-chamfer-btn);">
            <div>
              <h5 style="font-family:var(--font-display); font-size:1rem; font-weight:800; color:#fff;">Monthly Event Quest (EQ) Exploration</h5>
              <p style="font-size:0.82rem; color:var(--text-dim);">100% exploration across Thronebreaker / Paragon</p>
            </div>
            <div style="display:flex; align-items:center; gap:1.5rem;">
              <span style="font-family:var(--font-mono); font-weight:900; font-size:1.15rem; color:var(--contest-gold);">+150 Units</span>
              <input type="checkbox" class="custom-checkbox" ${monthly.eq ? 'checked' : ''} onchange="window.MCOC.toggleMonthlyReward('eq', this.checked)">
            </div>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; background:var(--mcoc-surface); padding:1.25rem 1.5rem; border:1px solid var(--mcoc-card-border); clip-path:var(--clip-chamfer-btn);">
            <div>
              <h5 style="font-family:var(--font-display); font-size:1rem; font-weight:800; color:#fff;">Monthly 28-Day Login Calendar</h5>
              <p style="font-size:0.82rem; color:var(--text-dim);">Daily check-in calendar rewards</p>
            </div>
            <div style="display:flex; align-items:center; gap:1.5rem;">
              <span style="font-family:var(--font-mono); font-weight:900; font-size:1.15rem; color:var(--contest-gold);">+100 Units</span>
              <input type="checkbox" class="custom-checkbox" ${monthly.calendar ? 'checked' : ''} onchange="window.MCOC.toggleMonthlyReward('calendar', this.checked)">
            </div>
          </div>
        </div>
      </div>
    `;
  }

  window.MCOC.toggleMonthlyReward = function (key, isChecked) {
    if (!currentUser) return;
    if (!currentUser.monthlyRewards) currentUser.monthlyRewards = {};
    currentUser.monthlyRewards[key] = isChecked;
    saveDatabase();
    renderUnitsTracker();
    renderNav();
  };

  // 4. Extra & Miscellaneous Table
  function renderExtraTable(container) {
    const ex = currentUser.extra || { battlechips: 0, legend: 0, battlepass: 0, alliance: 0, promo: 0, special: 0 };

    container.innerHTML = `
      <div class="mcoc-card">
        <h4 style="font-family:var(--font-display); font-size:1.15rem; color:var(--cyan-cosmic); margin-bottom:0.35rem; text-transform: uppercase;">4. Extra & Miscellaneous Units Gains</h4>
        <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:1.5rem;">Enter cumulative units from crystal openings, special webstore codes, and alliance events.</p>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:1.5rem;">
          <div class="form-group">
            <label>Battlechips Crystals Units</label>
            <input type="number" class="form-control" value="${ex.battlechips || 0}" onchange="window.MCOC.updateExtraValue('battlechips', this.value)">
            <span style="font-size:0.75rem; color:var(--text-dim);">Units pulled from arena crystals</span>
          </div>

          <div class="form-group">
            <label>Legend / Saga War Events</label>
            <input type="number" class="form-control" value="${ex.legend || 0}" onchange="window.MCOC.updateExtraValue('legend', this.value)">
            <span style="font-size:0.75rem; color:var(--text-dim);">Exclusive special event objectives</span>
          </div>

          <div class="form-group">
            <label>Battlepass Milestones</label>
            <input type="number" class="form-control" value="${ex.battlepass || 0}" onchange="window.MCOC.updateExtraValue('battlepass', this.value)">
            <span style="font-size:0.75rem; color:var(--text-dim);">Monthly Battlepass unit milestones</span>
          </div>

          <div class="form-group">
            <label>Alliance War / AQ Milestones</label>
            <input type="number" class="form-control" value="${ex.alliance || 0}" onchange="window.MCOC.updateExtraValue('alliance', this.value)">
            <span style="font-size:0.75rem; color:var(--text-dim);">Alliance rank rewards & season milestones</span>
          </div>

          <div class="form-group">
            <label>Promo Codes / Livestream Mail</label>
            <input type="number" class="form-control" value="${ex.promo || 0}" onchange="window.MCOC.updateExtraValue('promo', this.value)">
            <span style="font-size:0.75rem; color:var(--text-dim);">Compensation, creator codes & webstore gifts</span>
          </div>

          <div class="form-group">
            <label>Seasonal / Special Side Quest</label>
            <input type="number" class="form-control" value="${ex.special || 0}" onchange="window.MCOC.updateExtraValue('special', this.value)">
            <span style="font-size:0.75rem; color:var(--text-dim);">Unanticipated side quest unit caches</span>
          </div>
        </div>

        <!-- Quick Log Extra Daily Gains -->
        <div style="border-top:2px solid var(--mcoc-card-border); margin-top:2rem; padding-top:1.5rem;">
          <h5 style="font-family:var(--font-display); font-size:1rem; color:var(--contest-gold); margin-bottom:0.85rem; text-transform: uppercase;">⚡ Quick Log Unit Gain Today</h5>
          <div style="display:flex; gap:0.85rem; flex-wrap:wrap;">
            <input type="number" id="quick-log-units" class="form-control" placeholder="Amount (e.g. 150)" style="max-width:180px;">
            <input type="text" id="quick-log-note" class="form-control" placeholder="Source Note (e.g. Arena crystal jackpot)" style="flex:1; min-width:220px;">
            <button class="btn btn-primary" onclick="window.MCOC.addQuickLog()">Log Units</button>
          </div>
        </div>
      </div>
    `;
  }

  window.MCOC.updateExtraValue = function (key, value) {
    if (!currentUser) return;
    if (!currentUser.extra) currentUser.extra = {};
    currentUser.extra[key] = Math.max(0, parseInt(value, 10) || 0);
    saveDatabase();
    renderUnitsTracker();
    renderNav();
  };

  window.MCOC.addQuickLog = function () {
    const amtEl = document.getElementById('quick-log-units');
    const noteEl = document.getElementById('quick-log-note');
    if (!amtEl || !amtEl.value) {
      showToast('Please enter an amount of units', 'error');
      return;
    }
    const amt = parseInt(amtEl.value, 10);
    if (isNaN(amt) || amt <= 0) {
      showToast('Amount must be greater than zero', 'error');
      return;
    }

    if (!currentUser.recentLogs) currentUser.recentLogs = [];
    currentUser.recentLogs.unshift({
      date: new Date().toISOString().split('T')[0],
      amount: amt,
      note: noteEl.value.trim() || 'Manual quick log'
    });

    if (!currentUser.extra) currentUser.extra = {};
    currentUser.extra.special = (currentUser.extra.special || 0) + amt;

    saveDatabase();
    renderUnitsTracker();
    renderNav();
    showToast(`Logged +${amt.toLocaleString()} Units to your progression!`, 'success');

    amtEl.value = '';
    noteEl.value = '';
  };

  // ==========================================================================
  // VIEW 3: LEADERBOARD & SUMMONER COMPARISON
  // ==========================================================================
  function renderLeaderboards() {
    // Only rank regular summoners or include all
    const rankedUsers = DB.users.map(u => {
      const prog = calculateUserProgression(u);
      return {
        ...u,
        prog
      };
    });

    // Sort based on active filter
    rankedUsers.sort((a, b) => {
      if (activeLeaderboardFilter === 'daily') {
        return (b.prog.dailyPace || 0) - (a.prog.dailyPace || 0);
      } else if (activeLeaderboardFilter === 'weekly') {
        return (b.prog.weeklyGain || 0) - (a.prog.weeklyGain || 0);
      } else if (activeLeaderboardFilter === 'monthly') {
        return (b.prog.monthlyGain || 0) - (a.prog.monthlyGain || 0);
      } else {
        return (b.prog.current || 0) - (a.prog.current || 0);
      }
    });

    // Render Podium for Top 3
    const podiumContainer = document.getElementById('leaderboard-podium');
    if (podiumContainer && rankedUsers.length >= 3) {
      const top1 = rankedUsers[0];
      const top2 = rankedUsers[1];
      const top3 = rankedUsers[2];

      const getMetricDisplay = (u) => {
        if (activeLeaderboardFilter === 'daily') return `+${u.prog.dailyPace.toLocaleString()} u/day`;
        if (activeLeaderboardFilter === 'weekly') return `+${u.prog.weeklyGain.toLocaleString()} u/wk`;
        if (activeLeaderboardFilter === 'monthly') return `+${u.prog.monthlyGain.toLocaleString()} u/mo`;
        return `${u.prog.current.toLocaleString()} u Total`;
      };

      const top1Avatar = AVATAR_OPTIONS.find(a => a.id === top1.avatar) || AVATAR_OPTIONS[0];
      const top2Avatar = AVATAR_OPTIONS.find(a => a.id === top2.avatar) || AVATAR_OPTIONS[1];
      const top3Avatar = AVATAR_OPTIONS.find(a => a.id === top3.avatar) || AVATAR_OPTIONS[2];

      podiumContainer.innerHTML = `
        <!-- Rank 2 -->
        <div class="podium-card rank-2">
          <span class="rank-badge-num">2</span>
          <div class="crown-badge">🥈</div>
          <div class="podium-avatar">
            <img src="${top2Avatar.img}" alt="${top2.ign}">
          </div>
          <div class="podium-ign">${escapeHTML(top2.ign)}</div>
          <div class="podium-title">${escapeHTML(top2.title || 'Summoner')}</div>
          <div class="podium-units">${getMetricDisplay(top2)}</div>
          <button class="btn btn-outline btn-sm" style="margin-top:0.85rem;" onclick="window.MCOC.openCompareModal('${top2.id}')">Compare vs You</button>
        </div>

        <!-- Rank 1 -->
        <div class="podium-card rank-1">
          <span class="rank-badge-num" style="border-color:var(--contest-gold); color:var(--contest-gold);">1</span>
          <div class="crown-badge">👑</div>
          <div class="podium-avatar" style="width:84px; height:84px;">
            <img src="${top1Avatar.img}" alt="${top1.ign}">
          </div>
          <div class="podium-ign" style="font-size:1.35rem;">${escapeHTML(top1.ign)}</div>
          <div class="podium-title" style="color:var(--contest-gold);">${escapeHTML(top1.title || 'Grandmaster')}</div>
          <div class="podium-units" style="font-size:1.75rem; color:var(--contest-gold-light);">${getMetricDisplay(top1)}</div>
          <button class="btn btn-primary btn-sm" style="margin-top:0.85rem;" onclick="window.MCOC.openCompareModal('${top1.id}')">Compare vs You</button>
        </div>

        <!-- Rank 3 -->
        <div class="podium-card rank-3">
          <span class="rank-badge-num">3</span>
          <div class="crown-badge">🥉</div>
          <div class="podium-avatar">
            <img src="${top3Avatar.img}" alt="${top3.ign}">
          </div>
          <div class="podium-ign">${escapeHTML(top3.ign)}</div>
          <div class="podium-title">${escapeHTML(top3.title || 'Summoner')}</div>
          <div class="podium-units">${getMetricDisplay(top3)}</div>
          <button class="btn btn-outline btn-sm" style="margin-top:0.85rem;" onclick="window.MCOC.openCompareModal('${top3.id}')">Compare vs You</button>
        </div>
      `;
    }

    // Render Full Ranking Table
    const tableBody = document.getElementById('leaderboard-table-body');
    if (tableBody) {
      tableBody.innerHTML = rankedUsers.map((u, index) => {
        const isCurrent = currentUser && currentUser.id === u.id;
        const avatarMeta = AVATAR_OPTIONS.find(a => a.id === u.avatar) || AVATAR_OPTIONS[0];

        let metricCol = '';
        if (activeLeaderboardFilter === 'daily') metricCol = `+${u.prog.dailyPace.toLocaleString()} u`;
        else if (activeLeaderboardFilter === 'weekly') metricCol = `+${u.prog.weeklyGain.toLocaleString()} u`;
        else if (activeLeaderboardFilter === 'monthly') metricCol = `+${u.prog.monthlyGain.toLocaleString()} u`;
        else metricCol = `${u.prog.current.toLocaleString()} u`;

        return `
          <tr style="${isCurrent ? 'background: rgba(255, 204, 0, 0.08); font-weight:700;' : ''}">
            <td style="font-family:var(--font-mono); font-size:1rem; font-weight:900; color:${index < 3 ? 'var(--contest-gold)' : 'var(--text-muted)'};">
              #${index + 1}
            </td>
            <td>
              <div style="display:flex; align-items:center; gap:0.75rem;">
                <img src="${avatarMeta.img}" alt="${u.ign}" style="width:38px; height:38px; border-radius:4px; object-fit:cover; border:1px solid var(--mcoc-card-border);">
                <div>
                  <div style="font-weight:800; color:#fff; display:flex; align-items:center; gap:0.4rem; font-family:var(--font-display);">
                    ${escapeHTML(u.ign)} ${isCurrent ? '<span style="font-size:0.65rem; background:var(--contest-gold); color:#000; padding:1px 6px; font-weight:900;">YOU</span>' : ''}
                  </div>
                  <div style="font-size:0.72rem; color:var(--contest-gold); text-transform:uppercase;">${escapeHTML(u.title || 'Summoner')}</div>
                </div>
              </div>
            </td>
            <td style="font-family:var(--font-mono); font-weight:800;">${u.prog.current.toLocaleString()} u</td>
            <td style="font-family:var(--font-mono); font-weight:900; color:var(--contest-gold-light); font-size:0.95rem;">
              ${metricCol}
            </td>
            <td>
              <div style="display:flex; align-items:center; gap:0.5rem;">
                <div style="width:90px; height:8px; background:rgba(0,0,0,0.6); overflow:hidden;">
                  <div style="width:${u.prog.banquetPct}%; height:100%; background:var(--gold-gradient);"></div>
                </div>
                <span style="font-size:0.75rem; font-family:var(--font-mono); font-weight:800;">${u.prog.banquetPct}%</span>
              </div>
            </td>
            <td style="text-align:right;">
              <button class="btn btn-outline btn-sm" onclick="window.MCOC.openCompareModal('${u.id}')">Compare</button>
            </td>
          </tr>
        `;
      }).join('');
    }
  }

  function setupLeaderboardEvents() {
    const timePills = document.querySelectorAll('.time-pill-btn');
    timePills.forEach(pill => {
      pill.addEventListener('click', () => {
        timePills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeLeaderboardFilter = pill.dataset.timeframe;
        renderLeaderboards();
      });
    });
  }

  // Summoner Side-by-Side Comparison
  window.MCOC.openCompareModal = function (targetUserId) {
    const targetUser = DB.users.find(u => u.id === targetUserId);
    if (!targetUser || !currentUser) return;

    const myProg = calculateUserProgression(currentUser);
    const targetProg = calculateUserProgression(targetUser);

    const myAvatar = AVATAR_OPTIONS.find(a => a.id === currentUser.avatar) || AVATAR_OPTIONS[0];
    const targetAvatar = AVATAR_OPTIONS.find(a => a.id === targetUser.avatar) || AVATAR_OPTIONS[1];

    const body = document.getElementById('compare-modal-body');
    if (!body) return;

    const diffCurrent = myProg.current - targetProg.current;

    body.innerHTML = `
      <div style="text-align:center; margin-bottom:1.75rem;">
        <span style="font-size:0.8rem; text-transform:uppercase; color:var(--contest-gold); font-weight:900; letter-spacing:1px; font-family:var(--font-display);">HEAD TO HEAD PROGRESSION</span>
        <h3 style="font-family:var(--font-display); font-size:1.45rem; text-transform:uppercase; color:#fff;">${escapeHTML(currentUser.ign)} vs ${escapeHTML(targetUser.ign)}</h3>
      </div>

      <div class="comparison-grid">
        <!-- My Profile -->
        <div class="compare-profile-card" style="border-color:var(--contest-gold);">
          <img src="${myAvatar.img}" alt="${currentUser.ign}" style="width:68px; height:68px; border-radius:4px; object-fit:cover; border:2px solid var(--contest-gold); margin-bottom:0.6rem;">
          <h4 style="font-family:var(--font-display); font-size:1.15rem; color:#fff;">${escapeHTML(currentUser.ign)} (You)</h4>
          <span style="font-size:0.75rem; color:var(--contest-gold); text-transform:uppercase; font-weight:700;">${escapeHTML(currentUser.title || 'Summoner')}</span>
          <div style="font-family:var(--font-mono); font-size:1.5rem; font-weight:900; color:var(--contest-gold-light); margin:0.85rem 0;">
            ${myProg.current.toLocaleString()} Units
          </div>
          <span style="font-size:0.8rem; color:var(--science-green); font-weight:800;">${myProg.banquetPct}% Banquet Goal</span>
        </div>

        <!-- Target Profile -->
        <div class="compare-profile-card" style="border-color:var(--cyan-cosmic);">
          <img src="${targetAvatar.img}" alt="${targetUser.ign}" style="width:68px; height:68px; border-radius:4px; object-fit:cover; border:2px solid var(--cyan-cosmic); margin-bottom:0.6rem;">
          <h4 style="font-family:var(--font-display); font-size:1.15rem; color:#fff;">${escapeHTML(targetUser.ign)}</h4>
          <span style="font-size:0.75rem; color:var(--cyan-cosmic); text-transform:uppercase; font-weight:700;">${escapeHTML(targetUser.title || 'Summoner')}</span>
          <div style="font-family:var(--font-mono); font-size:1.5rem; font-weight:900; color:var(--cyan-cosmic); margin:0.85rem 0;">
            ${targetProg.current.toLocaleString()} Units
          </div>
          <span style="font-size:0.8rem; color:var(--cyan-cosmic); font-weight:800;">${targetProg.banquetPct}% Banquet Goal</span>
        </div>
      </div>

      <!-- Comparison Metrics Table -->
      <div style="margin-top:1.75rem; background:var(--mcoc-surface); border:1px solid var(--mcoc-card-border); overflow:hidden;">
        <table class="mcoc-table">
          <thead>
            <tr>
              <th>Metric Area</th>
              <th style="text-align:center;">You</th>
              <th style="text-align:center;">${escapeHTML(targetUser.ign)}</th>
              <th style="text-align:right;">Advantage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Current Total Balance</strong></td>
              <td style="text-align:center; font-family:var(--font-mono); font-weight:800;">${myProg.current.toLocaleString()}</td>
              <td style="text-align:center; font-family:var(--font-mono); font-weight:800;">${targetProg.current.toLocaleString()}</td>
              <td style="text-align:right; font-weight:900; color:${diffCurrent >= 0 ? 'var(--science-green)' : 'var(--marvel-red)'}; font-family:var(--font-mono);">
                ${diffCurrent >= 0 ? `+${diffCurrent.toLocaleString()}` : diffCurrent.toLocaleString()}
              </td>
            </tr>
            <tr>
              <td><strong>Daily Earned Total</strong></td>
              <td style="text-align:center; font-family:var(--font-mono);">${myProg.totalDaily.toLocaleString()}</td>
              <td style="text-align:center; font-family:var(--font-mono);">${targetProg.totalDaily.toLocaleString()}</td>
              <td style="text-align:right; font-family:var(--font-mono);">
                ${myProg.totalDaily >= targetProg.totalDaily ? 'You lead' : `${escapeHTML(targetUser.ign)} leads`}
              </td>
            </tr>
            <tr>
              <td><strong>Weekly Arena Units</strong></td>
              <td style="text-align:center; font-family:var(--font-mono);">${myProg.totalArena.toLocaleString()}</td>
              <td style="text-align:center; font-family:var(--font-mono);">${targetProg.totalArena.toLocaleString()}</td>
              <td style="text-align:right; font-family:var(--font-mono);">
                ${myProg.totalArena >= targetProg.totalArena ? 'You lead' : `${escapeHTML(targetUser.ign)} leads`}
              </td>
            </tr>
            <tr>
              <td><strong>Monthly Objectives</strong></td>
              <td style="text-align:center; font-family:var(--font-mono);">${myProg.totalMonthly.toLocaleString()}</td>
              <td style="text-align:center; font-family:var(--font-mono);">${targetProg.totalMonthly.toLocaleString()}</td>
              <td style="text-align:right; font-family:var(--font-mono);">
                ${myProg.totalMonthly >= targetProg.totalMonthly ? 'You lead' : `${escapeHTML(targetUser.ign)} leads`}
              </td>
            </tr>
            <tr>
              <td><strong>Milestones Achieved</strong></td>
              <td style="text-align:center; font-family:var(--font-mono);">${myProg.milestonesMet} / 8</td>
              <td style="text-align:center; font-family:var(--font-mono);">${targetProg.milestonesMet} / 8</td>
              <td style="text-align:right; font-family:var(--font-mono);">
                ${myProg.milestonesMet >= targetProg.milestonesMet ? 'Equal / Leading' : 'Trailing'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `;

    openModal('modal-compare');
  };

  // ==========================================================================
  // VIEW 4: COMMUNITY DISCUSSIONS & CHAT
  // ==========================================================================
  function renderDiscussions() {
    const stream = document.getElementById('community-comments-stream');
    if (!stream) return;

    stream.innerHTML = renderCommentCards(DB.comments);

    const quickList = document.getElementById('discussion-events-quicklist');
    if (quickList) {
      quickList.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:0.55rem;">
          <button class="btn btn-outline btn-sm" style="text-align:left; justify-content:flex-start;" onclick="window.MCOC.filterDiscussionStream('all')">
            🌐 All Channels (${DB.comments.length})
          </button>
          ${DB.events.map(e => {
            const count = DB.comments.filter(c => c.eventId === e.id).length;
            return `
              <button class="btn btn-outline btn-sm" style="text-align:left; justify-content:space-between;" onclick="window.MCOC.filterDiscussionStream('${e.id}')">
                <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:210px;">${escapeHTML(e.title)}</span>
                <span style="color:var(--contest-gold);">${count}</span>
              </button>
            `;
          }).join('')}
        </div>
      `;
    }
  }

  function renderCommentCards(comments) {
    if (!comments || comments.length === 0) {
      return `<p style="color:var(--text-dim); text-align:center; padding:2.5rem;">No comments yet. Start the strategy conversation!</p>`;
    }

    return comments.map(c => {
      const avatarMeta = AVATAR_OPTIONS.find(a => a.id === c.userAvatar) || AVATAR_OPTIONS[0];
      const isLiked = c.likedBy && c.likedBy.includes(currentUser.id);
      const isOwner = currentUser && (currentUser.id === c.userId || currentUser.role === 'admin');

      return `
        <div class="comment-bubble" id="comment-card-${c.id}">
          <div class="comment-user-avatar">
            <img src="${avatarMeta.img}" alt="${escapeHTML(c.userName)}">
          </div>
          <div class="comment-content-wrap">
            <div class="comment-meta">
              <span class="comment-author-name">
                ${escapeHTML(c.userName)}
                <span style="font-size:0.68rem; color:var(--contest-gold); font-weight:800; text-transform:uppercase;">(${escapeHTML(c.userTitle)})</span>
              </span>
              <span class="comment-time">${c.timestamp}</span>
            </div>
            <div class="comment-text">${escapeHTML(c.content)}</div>
            <div class="comment-actions">
              <button class="comment-like-btn ${isLiked ? 'liked' : ''}" onclick="window.MCOC.likeComment('${c.id}')">
                ❤️ <span>${c.likes || 0}</span>
              </button>
              ${isOwner ? `
                <button class="comment-like-btn" style="color:var(--marvel-red);" onclick="window.MCOC.deleteComment('${c.id}')">
                  🗑️ Delete
                </button>
              ` : ''}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  window.MCOC.filterDiscussionStream = function (eventId) {
    const stream = document.getElementById('community-comments-stream');
    if (!stream) return;
    if (eventId === 'all') {
      stream.innerHTML = renderCommentCards(DB.comments);
    } else {
      const filtered = DB.comments.filter(c => c.eventId === eventId);
      stream.innerHTML = renderCommentCards(filtered);
    }
  };

  window.MCOC.likeComment = function (commentId) {
    const c = DB.comments.find(item => item.id === commentId);
    if (!c || !currentUser) return;

    if (!c.likedBy) c.likedBy = [];
    const idx = c.likedBy.indexOf(currentUser.id);
    if (idx > -1) {
      c.likedBy.splice(idx, 1);
      c.likes = Math.max(0, (c.likes || 1) - 1);
    } else {
      c.likedBy.push(currentUser.id);
      c.likes = (c.likes || 0) + 1;
    }
    saveDatabase();
    renderDiscussions();
  };

  window.MCOC.deleteComment = function (commentId) {
    if (!confirm('Are you sure you want to delete this comment?')) return;
    DB.comments = DB.comments.filter(c => c.id !== commentId);
    saveDatabase();
    renderDiscussions();
    showToast('Comment deleted', 'info');
  };

  function setupDiscussionEvents() {
    const postBtn = document.getElementById('btn-post-community-comment');
    const inputEl = document.getElementById('community-comment-input');
    if (postBtn && inputEl) {
      postBtn.addEventListener('click', () => {
        const val = inputEl.value.trim();
        if (!val) {
          showToast('Please type a comment before submitting', 'error');
          return;
        }

        const check = validateCommentContent(val);
        if (!check.valid) {
          showToast(`🛡️ Kabam Policy: ${check.reason}`, 'error');
          return;
        }

        const newComment = {
          id: 'cmt-' + Date.now(),
          eventId: 'general',
          userId: currentUser.id,
          userName: currentUser.ign,
          userTitle: currentUser.title || 'Summoner',
          userAvatar: currentUser.avatar || 'hercules',
          content: val,
          timestamp: 'Just now',
          likes: 0,
          likedBy: []
        };

        DB.comments.unshift(newComment);
        saveDatabase();
        inputEl.value = '';
        renderDiscussions();
        showToast('Comment posted to Community Lounge!', 'success');
      });
    }
  }

  // ==========================================================================
  // VIEW 5: ADMIN PORTAL (Elder Meliodas Command Center)
  // ==========================================================================
  function renderAdminPortal() {
    // If not admin, block rendering
    if (!currentUser || currentUser.role !== 'admin') {
      const container = document.getElementById('view-admin');
      if (container) {
        container.innerHTML = `
          <div class="mcoc-card" style="text-align:center; padding:3rem;">
            <h3 style="color:var(--marvel-red); font-family:var(--font-display); margin-bottom:0.75rem; text-transform:uppercase;">Access Restricted: Elder Admin Clearance Required</h3>
            <p style="color:var(--text-muted); margin-bottom:1.5rem;">Only authorized Elders can access the Command Center.</p>
          </div>
        `;
      }
      return;
    }

    // Admin Stats
    const totalRegistered = DB.users.length;
    const totalCommunityUnits = DB.users.reduce((acc, u) => acc + calculateUserProgression(u).current, 0);
    const totalComments = DB.comments.length;
    const totalEvents = DB.events.length;

    document.getElementById('admin-stat-users').textContent = totalRegistered;
    document.getElementById('admin-stat-units').textContent = totalCommunityUnits.toLocaleString();
    document.getElementById('admin-stat-comments').textContent = totalComments;
    document.getElementById('admin-stat-events').textContent = totalEvents;

    // Render All Users Table
    const usersTable = document.getElementById('admin-users-table-body');
    if (usersTable) {
      usersTable.innerHTML = DB.users.map(u => {
        const prog = calculateUserProgression(u);
        return `
          <tr>
            <td>
              <div style="font-weight:800; color:#fff; font-family:var(--font-display);">${escapeHTML(u.ign)}</div>
              <div style="font-size:0.75rem; color:var(--text-dim);">${escapeHTML(u.email || u.username || 'summoner')}</div>
            </td>
            <td><span class="user-role-tag" style="color:${u.role === 'admin' ? 'var(--marvel-red)' : 'var(--contest-gold)'};">${u.role.toUpperCase()}</span></td>
            <td style="font-family:var(--font-mono);">${prog.starting.toLocaleString()} u</td>
            <td style="font-family:var(--font-mono); font-weight:800; color:var(--science-green);">+${prog.earned.toLocaleString()} u</td>
            <td style="font-family:var(--font-mono); font-weight:900; color:var(--contest-gold);">${prog.current.toLocaleString()} u</td>
            <td>${prog.banquetPct}% (${prog.milestonesMet}/8)</td>
            <td style="text-align:right;">
              <button class="btn btn-cyan btn-sm" onclick="window.MCOC.inspectUserProgression('${u.id}')">Inspect Full Sheet</button>
            </td>
          </tr>
        `;
      }).join('');
    }
  }

  window.MCOC.inspectUserProgression = function (userId) {
    const user = DB.users.find(u => u.id === userId);
    if (!user) return;

    const prog = calculateUserProgression(user);
    const body = document.getElementById('admin-inspect-body');
    if (!body) return;

    body.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; flex-wrap:wrap; gap:1rem;">
        <div>
          <h3 style="font-family:var(--font-display); font-size:1.35rem; color:var(--contest-gold); text-transform:uppercase;">${escapeHTML(user.ign)} - Progression Dossier</h3>
          <p style="font-size:0.85rem; color:var(--text-muted);">${escapeHTML(user.email || user.username)} | Title: ${escapeHTML(user.title || 'Summoner')}</p>
        </div>
        <div style="font-family:var(--font-mono); font-size:1.4rem; font-weight:900; color:var(--contest-gold-light);">
          ${prog.current.toLocaleString()} Total Units
        </div>
      </div>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem; margin-bottom:1.5rem;">
        <div class="metric-card" style="padding:1rem;">
          <div class="metric-label">Daily Earned</div>
          <div style="font-family:var(--font-mono); font-size:1.25rem; font-weight:800; color:var(--science-green);">+${prog.totalDaily.toLocaleString()}</div>
        </div>
        <div class="metric-card" style="padding:1rem;">
          <div class="metric-label">Arena Earned</div>
          <div style="font-family:var(--font-mono); font-size:1.25rem; font-weight:800; color:var(--contest-gold);">+${prog.totalArena.toLocaleString()}</div>
        </div>
        <div class="metric-card" style="padding:1rem;">
          <div class="metric-label">Monthly Rewards</div>
          <div style="font-family:var(--font-mono); font-size:1.25rem; font-weight:800; color:var(--cyan-cosmic);">+${prog.totalMonthly.toLocaleString()}</div>
        </div>
        <div class="metric-card" style="padding:1rem;">
          <div class="metric-label">Extra / Battlechips</div>
          <div style="font-family:var(--font-mono); font-size:1.25rem; font-weight:800; color:var(--text-primary);">+${prog.totalExtra.toLocaleString()}</div>
        </div>
      </div>

      <div style="background:var(--mcoc-surface); padding:1.25rem; border:1px solid var(--mcoc-card-border); clip-path:var(--clip-chamfer-btn);">
        <h5 style="font-family:var(--font-display); font-size:0.95rem; color:var(--cyan-cosmic); margin-bottom:0.6rem; text-transform:uppercase;">Weekly Arena Milestones History</h5>
        <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.6;">
          <strong>4★ Arena Runs:</strong> ${(user.arena?.fourStar || []).join(', ')}<br>
          <strong>7★ Long Arena Runs:</strong> ${(user.arena?.sevenStarLong || []).join(', ')}<br>
          <strong>7★ Short Arena Runs:</strong> ${(user.arena?.sevenStarShort || []).join(', ')}<br>
          <strong>5★ Arena Flat Runs:</strong> ${(user.arena?.fiveStar || []).map(b => b ? 'YES' : 'NO').join(', ')}
        </p>
      </div>
    `;

    openModal('modal-admin-inspect');
  };

  function setupAdminEvents() {
    const addEventForm = document.getElementById('admin-add-event-form');
    if (addEventForm) {
      addEventForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('new-evt-title').value.trim();
        const category = document.getElementById('new-evt-category').value;
        const tag = document.getElementById('new-evt-tag').value.trim();
        const dateRange = document.getElementById('new-evt-dates').value.trim();
        const summary = document.getElementById('new-evt-summary').value.trim();
        const rewards = document.getElementById('new-evt-rewards').value.trim().split(',').map(r => r.trim()).filter(Boolean);
        const image = document.getElementById('new-evt-image').value.trim() || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80';

        if (!title || !summary) {
          showToast('Title and summary are required', 'error');
          return;
        }

        const newEvt = {
          id: 'evt-' + Date.now(),
          title,
          category,
          tag: tag || 'Event',
          tagClass: category === 'Special Events' ? 'special' : (category === 'Tips & Tricks' ? 'arena' : 'quest'),
          dateRange: dateRange || 'Active',
          countdownTarget: new Date(Date.now() + 86400000 * 14).toISOString(),
          summary,
          details: `<p>${escapeHTML(summary)}</p>`,
          rewards: rewards.length > 0 ? rewards : ['Units', 'Rank Up Materials'],
          image,
          pinned: false
        };

        DB.events.unshift(newEvt);
        saveDatabase();
        addEventForm.reset();
        showToast('New MCOC Event Published to BattleHub!', 'success');
        refreshCurrentView();
      });
    }

    // Reset database button
    const resetDbBtn = document.getElementById('btn-admin-reset-db');
    if (resetDbBtn) {
      resetDbBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to restore the entire BattleHub database to factory defaults?')) {
          localStorage.removeItem(DB_STORAGE_KEY);
          initDatabase();
          refreshCurrentView();
          showToast('BattleHub database reset to defaults', 'info');
        }
      });
    }
  }

  // ==========================================================================
  // SECRET ELDER ADMIN ACCESS (5 CLICKS ON FOOTER BATTLEHUB LOGO)
  // ==========================================================================
  function setupSecretAdminTrigger() {
    const footerLogo = document.getElementById('footer-battlehub-logo');
    if (!footerLogo) return;

    footerLogo.addEventListener('click', (e) => {
      e.preventDefault();
      secretClickCount++;
      clearTimeout(secretClickTimer);

      if (secretClickCount >= 5) {
        secretClickCount = 0;
        openModal('modal-secret-admin');
        showToast('🔒 Elder Administrator Clearance Terminal Activated', 'info');
      } else {
        secretClickTimer = setTimeout(() => {
          secretClickCount = 0;
        }, 3000);
      }
    });

    // Secret Admin Login Form
    const secretForm = document.getElementById('form-secret-admin');
    if (secretForm) {
      secretForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userInput = (document.getElementById('admin-sec-username')?.value || '').trim();
        const passInput = (document.getElementById('admin-sec-password')?.value || '').trim();

        const userClean = userInput.toLowerCase();
        // Accepts current elder username (elder or MeliodasVz) and password MeliodasVz
        if ((userClean === 'elder' || userClean === 'meliodasvz' || userClean === 'elder@battlehub.realm') && passInput === 'MeliodasVz') {
          let elderUser = DB.users.find(u => u.role === 'admin');
          if (!elderUser) {
            elderUser = DEFAULT_DB.users[0];
            DB.users.unshift(elderUser);
            saveDatabase();
          }

          setSessionUser(elderUser);
          closeModal('modal-secret-admin');
          secretForm.reset();
          switchView('view-admin');
          showToast('🛡️ Welcome, Elder Meliodas! Master Command Center Unlocked.', 'success');
        } else {
          showToast('Invalid Elder Administrator credentials', 'error');
        }
      });
    }
  }

  // ==========================================================================
  // REGULAR SUMMONER AUTHENTICATION (USER CREATION & SIGN IN ONLY)
  // ==========================================================================
  function setupAuthEvents() {
    const loginForm = document.getElementById('form-login');
    const signupForm = document.getElementById('form-signup');

    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const identifier = document.getElementById('login-email').value.trim().toLowerCase();
        const pass = document.getElementById('login-password').value;

        // Find regular user matching email or username or IGN
        const found = DB.users.find(u => {
          const mEmail = (u.email || '').toLowerCase() === identifier;
          const mUser = (u.username || '').toLowerCase() === identifier;
          const mIgn = (u.ign || '').toLowerCase() === identifier;
          return (mEmail || mUser || mIgn) && u.password === pass;
        });

        if (!found) {
          showToast('Invalid username or password', 'error');
          return;
        }

        setSessionUser(found);
        closeModal('modal-auth');
      });
    }

    if (signupForm) {
      signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const ign = document.getElementById('signup-ign').value.trim();
        const email = document.getElementById('signup-email').value.trim().toLowerCase();
        const pass = document.getElementById('signup-password').value;
        const title = document.getElementById('signup-title').value;
        const avatar = document.getElementById('signup-avatar').value;
        const startUnits = parseInt(document.getElementById('signup-start-units').value, 10) || 7920;

        if (!ign || !email || !pass) {
          showToast('Please fill in all required fields', 'error');
          return;
        }

        if (DB.users.some(u => (u.email || '').toLowerCase() === email || (u.ign || '').toLowerCase() === ign.toLowerCase())) {
          showToast('An account with this email or IGN already exists', 'error');
          return;
        }

        // Strictly regular summoner role
        const newUser = {
          id: 'usr-' + Date.now(),
          email,
          username: ign.toLowerCase().replace(/\s+/g, '_'),
          password: pass,
          ign,
          title,
          role: 'user',
          avatar,
          startingUnits: startUnits,
          dailyQuestChecks: Array(30).fill(false),
          superEventChecks: Array(30).fill(false),
          mondayQuests: Array(4).fill(false),
          arena: {
            fourStar: Array(10).fill(0),
            sevenStarLong: Array(10).fill(0),
            sevenStarShort: Array(10).fill(0),
            fiveStar: Array(10).fill(false)
          },
          monthlyRewards: {
            radiance: false,
            eq: false,
            calendar: false
          },
          extra: {
            battlechips: 0,
            legend: 0,
            battlepass: 0,
            alliance: 0,
            promo: 0,
            special: 0
          },
          recentLogs: []
        };

        DB.users.push(newUser);
        saveDatabase();
        setSessionUser(newUser);
        closeModal('modal-auth');
        showToast(`Welcome to BattleHub, ${ign}!`, 'success');
      });
    }
  }

  // ==========================================================================
  // MODAL UTILITIES
  // ==========================================================================
  function openAuthModal(tab = 'login') {
    openModal('modal-auth');
    const tabLogin = document.getElementById('auth-tab-login');
    const tabSignup = document.getElementById('auth-tab-signup');
    const formLogin = document.getElementById('form-login');
    const formSignup = document.getElementById('form-signup');
    if (tab === 'signup') {
      if (formLogin) formLogin.style.display = 'none';
      if (formSignup) formSignup.style.display = 'block';
      if (tabSignup) tabSignup.classList.add('active');
      if (tabLogin) tabLogin.classList.remove('active');
    } else {
      if (formLogin) formLogin.style.display = 'block';
      if (formSignup) formSignup.style.display = 'none';
      if (tabLogin) tabLogin.classList.add('active');
      if (tabSignup) tabSignup.classList.remove('active');
    }
  }

  window.MCOC.openAuthModal = openAuthModal;

  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  window.MCOC.closeModal = closeModal;

  function setupModals() {
    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    });

    document.querySelectorAll('.modal-close-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const modal = btn.closest('.modal-overlay');
        if (modal) {
          modal.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    });

    // Content Creator Policy Modal Triggers
    const creatorTriggers = ['btn-open-creator-rules', 'btn-footer-creator-rules', 'btn-conduct-modal-trigger'];
    creatorTriggers.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('click', (e) => {
          e.preventDefault();
          openModal('modal-creator-rules');
        });
      }
    });
  }

  // ==========================================================================
  // TOAST NOTIFICATIONS
  // ==========================================================================
  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // Helper: Escape HTML string
  function escapeHTML(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ==========================================================================
  // APPLICATION BOOTSTRAP
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initDatabase();
    setupNavigation();
    setupNewsHubEvents();
    setupTrackerEvents();
    setupLeaderboardEvents();
    setupDiscussionEvents();
    setupAdminEvents();
    setupAuthEvents();
    setupSecretAdminTrigger();
    setupModals();

    // Initial render
    switchView('view-news');
  });

})();
