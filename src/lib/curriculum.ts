export interface DSATopic {
  id: string
  name: string
  week: number
  youtubePlaylist: string
  youtubeChannel: string
  problems: DSAProblem[]
}

export interface DSAProblem {
  id: string
  title: string
  platform: 'LeetCode' | 'GFG' | 'Codeforces'
  difficulty: 'easy' | 'medium' | 'hard'
  url: string
  concept: string
  mustSolve: boolean
}

export const DSA_CURRICULUM: DSATopic[] = [
  {
    id: 'arrays',
    name: 'Arrays & Hashing',
    week: 1,
    youtubeChannel: "Striver's A2Z",
    youtubePlaylist: 'https://www.youtube.com/playlist?list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz',
    problems: [
      { id: 'a1', title: 'Two Sum', platform: 'LeetCode', difficulty: 'easy', url: 'https://leetcode.com/problems/two-sum/', concept: 'HashMap', mustSolve: true },
      { id: 'a2', title: 'Best Time to Buy and Sell Stock', platform: 'LeetCode', difficulty: 'easy', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', concept: 'Sliding window', mustSolve: true },
      { id: 'a3', title: 'Contains Duplicate', platform: 'LeetCode', difficulty: 'easy', url: 'https://leetcode.com/problems/contains-duplicate/', concept: 'HashSet', mustSolve: true },
      { id: 'a4', title: 'Product of Array Except Self', platform: 'LeetCode', difficulty: 'medium', url: 'https://leetcode.com/problems/product-of-array-except-self/', concept: 'Prefix sum', mustSolve: true },
      { id: 'a5', title: 'Maximum Subarray', platform: 'LeetCode', difficulty: 'medium', url: 'https://leetcode.com/problems/maximum-subarray/', concept: "Kadane's", mustSolve: true },
      { id: 'a6', title: 'Majority Element', platform: 'LeetCode', difficulty: 'easy', url: 'https://leetcode.com/problems/majority-element/', concept: "Boyer-Moore", mustSolve: false },
      { id: 'a7', title: 'Sort Colors', platform: 'LeetCode', difficulty: 'medium', url: 'https://leetcode.com/problems/sort-colors/', concept: 'Dutch National Flag', mustSolve: true },
      { id: 'a8', title: 'Next Permutation', platform: 'LeetCode', difficulty: 'medium', url: 'https://leetcode.com/problems/next-permutation/', concept: 'Array manipulation', mustSolve: true },
    ]
  },
  {
    id: 'binary-search',
    name: 'Binary Search',
    week: 2,
    youtubeChannel: "Striver's A2Z",
    youtubePlaylist: 'https://www.youtube.com/playlist?list=PLgUwDviBIf0pMFMWuuvDNF8G7Wl5dEH5Z',
    problems: [
      { id: 'bs1', title: 'Binary Search', platform: 'LeetCode', difficulty: 'easy', url: 'https://leetcode.com/problems/binary-search/', concept: 'Basic BS', mustSolve: true },
      { id: 'bs2', title: 'Search in Rotated Sorted Array', platform: 'LeetCode', difficulty: 'medium', url: 'https://leetcode.com/problems/search-in-rotated-sorted-array/', concept: 'Modified BS', mustSolve: true },
      { id: 'bs3', title: 'Find Minimum in Rotated Sorted Array', platform: 'LeetCode', difficulty: 'medium', url: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/', concept: 'Modified BS', mustSolve: true },
      { id: 'bs4', title: 'Median of Two Sorted Arrays', platform: 'LeetCode', difficulty: 'hard', url: 'https://leetcode.com/problems/median-of-two-sorted-arrays/', concept: 'BS on answer', mustSolve: true },
      { id: 'bs5', title: 'Aggressive Cows', platform: 'GFG', difficulty: 'medium', url: 'https://www.geeksforgeeks.org/aggressive-cows/', concept: 'BS on answer', mustSolve: true },
      { id: 'bs6', title: 'Koko Eating Bananas', platform: 'LeetCode', difficulty: 'medium', url: 'https://leetcode.com/problems/koko-eating-bananas/', concept: 'BS on answer', mustSolve: true },
    ]
  },
  {
    id: 'linked-lists',
    name: 'Linked Lists',
    week: 3,
    youtubeChannel: "Striver's A2Z",
    youtubePlaylist: 'https://www.youtube.com/playlist?list=PLgUwDviBIf0r47RKH7sMl2HfuHSsJ2sEA',
    problems: [
      { id: 'll1', title: 'Reverse Linked List', platform: 'LeetCode', difficulty: 'easy', url: 'https://leetcode.com/problems/reverse-linked-list/', concept: 'Pointer manipulation', mustSolve: true },
      { id: 'll2', title: 'Linked List Cycle', platform: 'LeetCode', difficulty: 'easy', url: 'https://leetcode.com/problems/linked-list-cycle/', concept: "Floyd's algorithm", mustSolve: true },
      { id: 'll3', title: 'Merge Two Sorted Lists', platform: 'LeetCode', difficulty: 'easy', url: 'https://leetcode.com/problems/merge-two-sorted-lists/', concept: 'Merge', mustSolve: true },
      { id: 'll4', title: 'Remove Nth Node From End', platform: 'LeetCode', difficulty: 'medium', url: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/', concept: 'Two pointers', mustSolve: true },
      { id: 'll5', title: 'LRU Cache', platform: 'LeetCode', difficulty: 'medium', url: 'https://leetcode.com/problems/lru-cache/', concept: 'Doubly LL + HashMap', mustSolve: true },
      { id: 'll6', title: 'Flatten a Linked List', platform: 'GFG', difficulty: 'medium', url: 'https://www.geeksforgeeks.org/flattening-a-linked-list/', concept: 'Recursion', mustSolve: true },
    ]
  },
  {
    id: 'stacks-queues',
    name: 'Stacks & Queues',
    week: 4,
    youtubeChannel: "Striver's A2Z",
    youtubePlaylist: 'https://www.youtube.com/playlist?list=PLgUwDviBIf0pOd5zvVVSzgpo6BaCpHT9c',
    problems: [
      { id: 'sq1', title: 'Valid Parentheses', platform: 'LeetCode', difficulty: 'easy', url: 'https://leetcode.com/problems/valid-parentheses/', concept: 'Stack', mustSolve: true },
      { id: 'sq2', title: 'Min Stack', platform: 'LeetCode', difficulty: 'medium', url: 'https://leetcode.com/problems/min-stack/', concept: 'Stack design', mustSolve: true },
      { id: 'sq3', title: 'Daily Temperatures', platform: 'LeetCode', difficulty: 'medium', url: 'https://leetcode.com/problems/daily-temperatures/', concept: 'Monotonic Stack', mustSolve: true },
      { id: 'sq4', title: 'Largest Rectangle in Histogram', platform: 'LeetCode', difficulty: 'hard', url: 'https://leetcode.com/problems/largest-rectangle-in-histogram/', concept: 'Monotonic Stack', mustSolve: true },
      { id: 'sq5', title: 'Sliding Window Maximum', platform: 'LeetCode', difficulty: 'hard', url: 'https://leetcode.com/problems/sliding-window-maximum/', concept: 'Deque', mustSolve: true },
    ]
  },
  {
    id: 'trees',
    name: 'Binary Trees & BST',
    week: 5,
    youtubeChannel: "Striver's A2Z",
    youtubePlaylist: 'https://www.youtube.com/playlist?list=PLgUwDviBIf0q8Hkd7bK2Bpryj2xVJk8Vk',
    problems: [
      { id: 't1', title: 'Invert Binary Tree', platform: 'LeetCode', difficulty: 'easy', url: 'https://leetcode.com/problems/invert-binary-tree/', concept: 'Recursion', mustSolve: true },
      { id: 't2', title: 'Maximum Depth of Binary Tree', platform: 'LeetCode', difficulty: 'easy', url: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/', concept: 'DFS', mustSolve: true },
      { id: 't3', title: 'Binary Tree Level Order Traversal', platform: 'LeetCode', difficulty: 'medium', url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/', concept: 'BFS', mustSolve: true },
      { id: 't4', title: 'Lowest Common Ancestor', platform: 'LeetCode', difficulty: 'medium', url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/', concept: 'Recursion', mustSolve: true },
      { id: 't5', title: 'Binary Tree Maximum Path Sum', platform: 'LeetCode', difficulty: 'hard', url: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/', concept: 'DFS', mustSolve: true },
      { id: 't6', title: 'Validate BST', platform: 'LeetCode', difficulty: 'medium', url: 'https://leetcode.com/problems/validate-binary-search-tree/', concept: 'BST', mustSolve: true },
      { id: 't7', title: 'Kth Smallest in BST', platform: 'LeetCode', difficulty: 'medium', url: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/', concept: 'BST Inorder', mustSolve: true },
    ]
  },
  {
    id: 'graphs',
    name: 'Graphs',
    week: 6,
    youtubeChannel: "Striver's Graph Series",
    youtubePlaylist: 'https://www.youtube.com/playlist?list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn',
    problems: [
      { id: 'g1', title: 'Number of Islands', platform: 'LeetCode', difficulty: 'medium', url: 'https://leetcode.com/problems/number-of-islands/', concept: 'BFS/DFS Grid', mustSolve: true },
      { id: 'g2', title: 'Clone Graph', platform: 'LeetCode', difficulty: 'medium', url: 'https://leetcode.com/problems/clone-graph/', concept: 'BFS + HashMap', mustSolve: true },
      { id: 'g3', title: 'Course Schedule', platform: 'LeetCode', difficulty: 'medium', url: 'https://leetcode.com/problems/course-schedule/', concept: 'Topological Sort', mustSolve: true },
      { id: 'g4', title: 'Dijkstra Shortest Path', platform: 'GFG', difficulty: 'medium', url: 'https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/', concept: 'Dijkstra', mustSolve: true },
      { id: 'g5', title: 'Rotting Oranges', platform: 'LeetCode', difficulty: 'medium', url: 'https://leetcode.com/problems/rotting-oranges/', concept: 'Multi-source BFS', mustSolve: true },
      { id: 'g6', title: 'Word Ladder', platform: 'LeetCode', difficulty: 'hard', url: 'https://leetcode.com/problems/word-ladder/', concept: 'BFS', mustSolve: false },
    ]
  },
  {
    id: 'dynamic-programming',
    name: 'Dynamic Programming',
    week: 7,
    youtubeChannel: "Striver's DP Series",
    youtubePlaylist: 'https://www.youtube.com/playlist?list=PLgUwDviBIf0qUlt5H_kiKYaNSqJ81PMMY',
    problems: [
      { id: 'dp1', title: 'Climbing Stairs', platform: 'LeetCode', difficulty: 'easy', url: 'https://leetcode.com/problems/climbing-stairs/', concept: '1D DP', mustSolve: true },
      { id: 'dp2', title: 'House Robber', platform: 'LeetCode', difficulty: 'medium', url: 'https://leetcode.com/problems/house-robber/', concept: '1D DP', mustSolve: true },
      { id: 'dp3', title: 'Longest Common Subsequence', platform: 'LeetCode', difficulty: 'medium', url: 'https://leetcode.com/problems/longest-common-subsequence/', concept: '2D DP', mustSolve: true },
      { id: 'dp4', title: '0/1 Knapsack', platform: 'GFG', difficulty: 'medium', url: 'https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/', concept: 'Knapsack', mustSolve: true },
      { id: 'dp5', title: 'Coin Change', platform: 'LeetCode', difficulty: 'medium', url: 'https://leetcode.com/problems/coin-change/', concept: 'Unbounded Knapsack', mustSolve: true },
      { id: 'dp6', title: 'Longest Increasing Subsequence', platform: 'LeetCode', difficulty: 'medium', url: 'https://leetcode.com/problems/longest-increasing-subsequence/', concept: 'DP + BS', mustSolve: true },
      { id: 'dp7', title: 'Edit Distance', platform: 'LeetCode', difficulty: 'hard', url: 'https://leetcode.com/problems/edit-distance/', concept: '2D DP', mustSolve: true },
    ]
  },
  {
    id: 'recursion-backtracking',
    name: 'Recursion & Backtracking',
    week: 8,
    youtubeChannel: "Striver's A2Z",
    youtubePlaylist: 'https://www.youtube.com/playlist?list=PLgUwDviBIf0rGlzIn_7rsaR2FQ5e6ZOL9',
    problems: [
      { id: 'rb1', title: 'Subsets', platform: 'LeetCode', difficulty: 'medium', url: 'https://leetcode.com/problems/subsets/', concept: 'Backtracking', mustSolve: true },
      { id: 'rb2', title: 'Combination Sum', platform: 'LeetCode', difficulty: 'medium', url: 'https://leetcode.com/problems/combination-sum/', concept: 'Backtracking', mustSolve: true },
      { id: 'rb3', title: 'Permutations', platform: 'LeetCode', difficulty: 'medium', url: 'https://leetcode.com/problems/permutations/', concept: 'Backtracking', mustSolve: true },
      { id: 'rb4', title: 'N-Queens', platform: 'LeetCode', difficulty: 'hard', url: 'https://leetcode.com/problems/n-queens/', concept: 'Backtracking', mustSolve: true },
      { id: 'rb5', title: 'Word Search', platform: 'LeetCode', difficulty: 'medium', url: 'https://leetcode.com/problems/word-search/', concept: 'DFS + Backtrack', mustSolve: true },
    ]
  },
]

export const YOUTUBE_CHANNELS = [
  { name: "Striver (TakeUForward)", url: "https://www.youtube.com/@takeUforward", focus: "DSA A2Z, SDE Sheet, DP Series" },
  { name: "NeetCode", url: "https://www.youtube.com/@NeetCode", focus: "Clean LeetCode solutions, patterns" },
  { name: "Abdul Bari", url: "https://www.youtube.com/@abdul_bari", focus: "Algorithms deep dive, theory" },
  { name: "CodeWithHarry", url: "https://www.youtube.com/@CodeWithHarry", focus: "Full Stack, Web Dev Hindi" },
  { name: "Fireship", url: "https://www.youtube.com/@Fireship", focus: "Next.js, Firebase, modern stack" },
  { name: "Clément Mihailescu", url: "https://www.youtube.com/@clem", focus: "Interview prep, system design" },
]

export const SDE_ROADMAP = [
  {
    phase: 1, title: 'CS Fundamentals', weeks: '1–4',
    topics: ['OS concepts: processes, threads, memory management', 'DBMS: normalization, joins, indexing, transactions', 'Computer Networks: HTTP, TCP/UDP, DNS, REST', 'OOP: SOLID principles, design patterns (Factory, Singleton, Observer)']
  },
  {
    phase: 2, title: 'DSA Mastery', weeks: '5–12',
    topics: ['Arrays, Strings, Hashing', 'Binary Search, Two Pointers, Sliding Window', 'Recursion, Backtracking', 'Linked Lists, Stacks, Queues', 'Trees, BST, Heaps', 'Graphs: BFS, DFS, Dijkstra, Topo Sort', 'Dynamic Programming: 1D, 2D, Knapsack']
  },
  {
    phase: 3, title: 'System Design', weeks: '13–16',
    topics: ['HLD: scalability, load balancing, caching', 'LLD: class diagrams, design Parking Lot / BookMyShow', 'Microservices vs Monolith', 'Databases: SQL vs NoSQL, sharding, replication', 'Message queues: Kafka, RabbitMQ']
  },
  {
    phase: 4, title: 'Full Stack Skills', weeks: '17–20',
    topics: ['Next.js: SSR, SSG, API routes, middleware', 'Node.js + Express REST API', 'Firebase / PostgreSQL', 'Authentication: JWT, OAuth, Firebase Auth', 'Deployment: Vercel, Docker basics, CI/CD']
  },
  {
    phase: 5, title: 'Interview Ready', weeks: '21–24',
    topics: ['Mock interviews on Pramp / Interviewing.io', 'Resume: STAR format, quantified achievements', 'Behavioral: tell me about yourself, conflict resolution', 'Company-specific LeetCode lists (Google, Amazon, Flipkart)', 'HR rounds and negotiation']
  },
]
