export interface Problem {
  title: string
  url: string
  difficulty: 'easy' | 'medium' | 'hard'
  youtubeId?: string   // Striver's exact video
  mustSolve: boolean
  platform: 'LeetCode' | 'GFG' | 'CodingNinjas'
}

export interface SubTopic {
  id: string
  title: string
  concept: string       // what mental model to build
  problems: Problem[]
}

export interface Step {
  step: number
  title: string
  description: string
  subTopics: SubTopic[]
}

export const STRIVER_A2Z: Step[] = [
  {
    step: 1,
    title: 'Learn the Basics',
    description: 'Build your foundation. Before writing any DSA code you must be fluent in language basics, time complexity, and patterns.',
    subTopics: [
      {
        id: '1.1',
        title: 'Things to know in C++ / Java / Python',
        concept: 'Input/output, data types, loops, conditionals, functions — these must be automatic. If you think about syntax while solving, you lose.',
        problems: [
          { title: 'User Input / Output', url: 'https://takeuforward.org/data-structure/user-input-output/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Data Types', url: 'https://takeuforward.org/data-structure/data-types-in-cpp/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'If-else statements', url: 'https://takeuforward.org/data-structure/if-else-statements/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Switch statements', url: 'https://takeuforward.org/data-structure/switch-statements/', difficulty: 'easy', mustSolve: false, platform: 'GFG' },
          { title: 'Arrays basics', url: 'https://takeuforward.org/data-structure/arrays-in-dsa/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'String basics', url: 'https://takeuforward.org/data-structure/strings-in-c/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Functions', url: 'https://takeuforward.org/data-structure/functions-in-c/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Time Complexity (Very important)', url: 'https://takeuforward.org/data-structure/time-complexity/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Space Complexity', url: 'https://takeuforward.org/data-structure/space-complexity/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
        ]
      },
      {
        id: '1.2',
        title: 'Build-up Logical thinking — Pattern problems',
        concept: 'Pattern problems train your brain to think in loops and nested loops. Every single interview company asks a pattern in first rounds. Do all of them.',
        problems: [
          { title: 'Print 1 to N without loop', url: 'https://practice.geeksforgeeks.org/problems/print-1-to-n-without-using-loops/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Star Pattern 1 — Rectangle', url: 'https://takeuforward.org/pattern/pattern-1-rectangular-star-pattern/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Star Pattern 2 — Right Triangle', url: 'https://takeuforward.org/pattern/pattern-2-right-angled-triangle-pattern/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Star Pattern 3 — Right Triangle (nums)', url: 'https://takeuforward.org/pattern/pattern-3-right-angled-number-pyramid/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Star Pattern 4 — Same as col', url: 'https://takeuforward.org/pattern/pattern-4-right-angled-number-pyramid-ii/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Star Pattern 5 — Inverted Triangle', url: 'https://takeuforward.org/pattern/pattern-5-inverted-right-pyramid/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Star Pattern 11 — Binary Triangle', url: 'https://takeuforward.org/pattern/pattern-11-binary-number-triangle-pattern/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Star Pattern 18 — Alpha Triangle', url: 'https://takeuforward.org/pattern/pattern-18-alpha-triangle-pattern/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Star Pattern 22 — Symmetric Void', url: 'https://takeuforward.org/pattern/pattern-22-symmetric-void-pattern/', difficulty: 'medium', mustSolve: true, platform: 'GFG' },
        ]
      },
      {
        id: '1.3',
        title: 'Learn C++ STL / Java Collections / Python Collections',
        concept: 'Standard library is your toolbox. vector, map, set, stack, queue, pair — know them cold. You use these in every single problem.',
        problems: [
          { title: 'C++ STL', url: 'https://takeuforward.org/c/c-stl-tutorial-most-frequent-used-stl-algorithms/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Sort + Comparator', url: 'https://leetcode.com/problems/sort-array-by-parity/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'Pairs', url: 'https://takeuforward.org/data-structure/pairs-in-c-stl/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Vector operations', url: 'https://takeuforward.org/data-structure/vectors-in-c-stl/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Map + Unordered map', url: 'https://takeuforward.org/data-structure/maps-in-c-stl/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Set + Multiset', url: 'https://takeuforward.org/data-structure/sets-in-c-stl/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Stack', url: 'https://takeuforward.org/data-structure/stack-in-c-stl/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Queue', url: 'https://takeuforward.org/data-structure/queue-in-c-stl/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
        ]
      },
      {
        id: '1.4',
        title: 'Know Basic Maths for DSA',
        concept: 'These math operations appear inside almost every medium problem. Know how to extract digits, check prime, find GCD — instantly.',
        problems: [
          { title: 'Count digits in a number', url: 'https://takeuforward.org/data-structure/count-digits/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Reverse a number', url: 'https://takeuforward.org/mathematical-problems/reverse-a-number/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Check Palindrome Number', url: 'https://leetcode.com/problems/palindrome-number/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'GCD / HCF (Euclidean)', url: 'https://takeuforward.org/data-structure/find-gcd-of-two-numbers/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'All divisors of a number', url: 'https://takeuforward.org/data-structure/print-all-divisors-of-a-number/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Check Prime', url: 'https://takeuforward.org/mathematical-problems/check-if-the-number-is-prime-or-not/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Prime factors (Sieve basics)', url: 'https://takeuforward.org/data-structure/find-prime-factors/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Power (Fast Exponentiation)', url: 'https://leetcode.com/problems/powx-n/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
        ]
      },
      {
        id: '1.5',
        title: 'Learn Basic Recursion',
        concept: 'Recursion = a function calling itself with a smaller problem. The key: trust the recursion. Write base case, write the recursive call, stop overthinking. This unlocks trees, graphs, backtracking — everything.',
        problems: [
          { title: 'Print 1 to N using recursion', url: 'https://takeuforward.org/data-structure/print-1-to-n-using-recursion/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Print N to 1 using recursion', url: 'https://takeuforward.org/data-structure/print-n-to-1-using-recursion/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Sum of first N numbers', url: 'https://takeuforward.org/data-structure/sum-of-first-n-natural-numbers/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Factorial of N', url: 'https://takeuforward.org/data-structure/factorial-of-a-number/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Fibonacci number', url: 'https://leetcode.com/problems/fibonacci-number/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'Reverse an array using recursion', url: 'https://takeuforward.org/data-structure/reverse-an-array/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Check if string is palindrome (recursion)', url: 'https://takeuforward.org/data-structure/check-if-the-given-string-is-palindrome-or-not/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Multiple recursion calls — sum triangle', url: 'https://takeuforward.org/data-structure/multiple-recursion-calls/', difficulty: 'easy', mustSolve: false, platform: 'GFG' },
        ]
      },
      {
        id: '1.6',
        title: 'Learn Basic Hashing',
        concept: 'Hashing = trading memory for speed. Store counts of elements, then look them up in O(1). This pattern alone makes you 10x better at array problems.',
        problems: [
          { title: 'Hashing Theory', url: 'https://takeuforward.org/hashing/hashing-theory/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Counting Frequencies', url: 'https://takeuforward.org/hashing/count-frequency-of-each-element-in-the-array/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Find the highest/lowest frequency element', url: 'https://takeuforward.org/hashing/find-highest-lowest-frequency-element/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Two Sum', url: 'https://leetcode.com/problems/two-sum/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'Contains Duplicate', url: 'https://leetcode.com/problems/contains-duplicate/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'Union of two arrays', url: 'https://practice.geeksforgeeks.org/problems/union-of-two-arrays/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
        ]
      },
    ]
  },
  {
    step: 2,
    title: 'Sorting Techniques',
    description: 'Know sorting cold — not just how to call sort() but WHY each algorithm works. Merge sort and quick sort are asked in interviews directly.',
    subTopics: [
      {
        id: '2.1',
        title: 'Sorting-I (Selection, Bubble, Insertion)',
        concept: 'These are O(n²) sorts. You need to know how they work and be able to code them from scratch. Bubble sort is also used to detect if an array is already sorted.',
        problems: [
          { title: 'Selection Sort', url: 'https://takeuforward.org/sorting/selection-sort-algorithm/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Bubble Sort', url: 'https://takeuforward.org/sorting/bubble-sort-algorithm/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Insertion Sort', url: 'https://takeuforward.org/sorting/insertion-sort-algorithm/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
        ]
      },
      {
        id: '2.2',
        title: 'Sorting-II (Merge, Quick, Heap sort)',
        concept: 'Merge sort = divide and conquer, stable, O(n log n). Quick sort = pivot, in-place, average O(n log n). These are not just sorting algorithms — merge sort logic is used in "count inversions", quick sort logic in "kth largest element".',
        problems: [
          { title: 'Merge Sort', url: 'https://takeuforward.org/data-structure/merge-sort-algorithm/', difficulty: 'medium', mustSolve: true, platform: 'GFG' },
          { title: 'Quick Sort', url: 'https://takeuforward.org/data-structure/quick-sort-algorithm/', difficulty: 'medium', mustSolve: true, platform: 'GFG' },
          { title: 'Recursive Bubble Sort', url: 'https://takeuforward.org/sorting/recursive-bubble-sort-algorithm/', difficulty: 'easy', mustSolve: false, platform: 'GFG' },
          { title: 'Recursive Insertion Sort', url: 'https://takeuforward.org/sorting/recursive-insertion-sort-algorithm/', difficulty: 'easy', mustSolve: false, platform: 'GFG' },
          { title: 'Time Complexity of sorting algorithms', url: 'https://takeuforward.org/sorting/time-and-space-complexity-of-sorting-algorithms/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
        ]
      },
    ]
  },
  {
    step: 3,
    title: 'Arrays',
    description: 'The most important step. Most interview problems are arrays. Go easy → medium → hard in order. Do NOT skip.',
    subTopics: [
      {
        id: '3.1',
        title: 'Easy Array Problems',
        concept: 'Build your array intuition. Every problem here teaches a fundamental pattern you will reuse in harder problems.',
        problems: [
          { title: 'Largest element in array', url: 'https://takeuforward.org/data-structure/find-the-largest-element-in-an-array/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Second largest element', url: 'https://takeuforward.org/data-structure/find-second-smallest-and-second-largest-element-in-an-array/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Check if array is sorted', url: 'https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'Remove duplicates from sorted array', url: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'Left rotate array by one', url: 'https://takeuforward.org/arrays/left-rotate-the-array-by-one/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Rotate array by K places', url: 'https://leetcode.com/problems/rotate-array/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Move zeros to end', url: 'https://leetcode.com/problems/move-zeroes/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'Linear search', url: 'https://takeuforward.org/data-structure/linear-search-in-an-array/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Union of two sorted arrays', url: 'https://takeuforward.org/data-structure/union-of-two-sorted-arrays/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Intersection of two sorted arrays', url: 'https://takeuforward.org/data-structure/intersection-of-two-sorted-arrays/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Find missing number', url: 'https://leetcode.com/problems/missing-number/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'Maximum consecutive ones', url: 'https://leetcode.com/problems/max-consecutive-ones/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'Single number (XOR)', url: 'https://leetcode.com/problems/single-number/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'Longest subarray with given sum (pos)', url: 'https://takeuforward.org/data-structure/longest-subarray-with-given-sum-k-positives/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
        ]
      },
      {
        id: '3.2',
        title: 'Medium Array Problems',
        concept: 'This is where most interviews live. 2 Sum, sort colors, stock profit, prefix sum, subarray problems — these patterns repeat everywhere.',
        problems: [
          { title: '2Sum', url: 'https://leetcode.com/problems/two-sum/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'Sort Colors (Dutch National Flag)', url: 'https://leetcode.com/problems/sort-colors/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Majority element (>n/2 times)', url: 'https://leetcode.com/problems/majority-element/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'Maximum subarray (Kadane)', url: 'https://leetcode.com/problems/maximum-subarray/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Best time to buy/sell stock', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'Rearrange array elements by sign', url: 'https://leetcode.com/problems/rearrange-array-elements-by-sign/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Next permutation', url: 'https://leetcode.com/problems/next-permutation/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Leaders in an array', url: 'https://practice.geeksforgeeks.org/problems/leaders-in-an-array/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Longest consecutive sequence', url: 'https://leetcode.com/problems/longest-consecutive-sequence/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Set matrix zeros', url: 'https://leetcode.com/problems/set-matrix-zeroes/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Rotate matrix 90 degrees', url: 'https://leetcode.com/problems/rotate-image/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Spiral matrix traversal', url: 'https://leetcode.com/problems/spiral-matrix/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Count subarrays with given sum', url: 'https://leetcode.com/problems/subarray-sum-equals-k/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
        ]
      },
      {
        id: '3.3',
        title: 'Hard Array Problems',
        concept: 'Hard problems combine multiple techniques. Pascal\'s triangle needs math, 3Sum needs sorting + two pointer, trapping rainwater needs prefix/suffix arrays. These are direct FAANG interview questions.',
        problems: [
          { title: 'Pascal\'s triangle', url: 'https://leetcode.com/problems/pascals-triangle/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'Majority element (n/3 times)', url: 'https://leetcode.com/problems/majority-element-ii/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: '3Sum', url: 'https://leetcode.com/problems/3sum/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: '4Sum', url: 'https://leetcode.com/problems/4sum/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Largest subarray with 0 sum', url: 'https://practice.geeksforgeeks.org/problems/largest-subarray-with-0-sum/', difficulty: 'medium', mustSolve: true, platform: 'GFG' },
          { title: 'Count subarrays with XOR = k', url: 'https://www.interviewbit.com/problems/subarray-with-given-xor/', difficulty: 'hard', mustSolve: true, platform: 'GFG' },
          { title: 'Merge overlapping intervals', url: 'https://leetcode.com/problems/merge-intervals/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Merge two sorted arrays without space', url: 'https://leetcode.com/problems/merge-sorted-array/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'Count inversions (merge sort)', url: 'https://practice.geeksforgeeks.org/problems/inversion-of-array/', difficulty: 'medium', mustSolve: true, platform: 'GFG' },
          { title: 'Reverse pairs', url: 'https://leetcode.com/problems/reverse-pairs/', difficulty: 'hard', mustSolve: true, platform: 'LeetCode' },
          { title: 'Maximum product subarray', url: 'https://leetcode.com/problems/maximum-product-subarray/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
        ]
      },
    ]
  },
  {
    step: 4,
    title: 'Binary Search',
    description: 'Binary search is not just for finding elements. It is a thinking pattern — "on what can I binary search?" Once you see it, you use it everywhere.',
    subTopics: [
      {
        id: '4.1',
        title: 'Binary Search on 1D Arrays',
        concept: 'Fundamental BS + variations. The key invariant: answer always lies in [lo, hi]. Every step eliminates half the search space.',
        problems: [
          { title: 'Binary Search basics', url: 'https://leetcode.com/problems/binary-search/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'Implement Lower Bound', url: 'https://takeuforward.org/data-structure/implement-lower-bound-bs-2/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Implement Upper Bound', url: 'https://takeuforward.org/data-structure/implement-upper-bound/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Search insert position', url: 'https://leetcode.com/problems/search-insert-position/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'Floor and Ceil in sorted array', url: 'https://takeuforward.org/data-structure/floor-and-ceil-in-sorted-array/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'First and last occurrence', url: 'https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Count occurrences in sorted array', url: 'https://takeuforward.org/data-structure/count-occurrences-in-sorted-array/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Search in rotated sorted array', url: 'https://leetcode.com/problems/search-in-rotated-sorted-array/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Search in rotated array II (duplicates)', url: 'https://leetcode.com/problems/search-in-rotated-sorted-array-ii/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Find minimum in rotated sorted array', url: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Find peak element', url: 'https://leetcode.com/problems/find-peak-element/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
        ]
      },
      {
        id: '4.2',
        title: 'Binary Search on Answers',
        concept: 'This is the advanced pattern. Instead of searching for a value, you binary search on the RANGE OF POSSIBLE ANSWERS. "What is the minimum/maximum X such that condition holds?" — classic BS on answer.',
        problems: [
          { title: 'Find sqrt of a number (BS)', url: 'https://leetcode.com/problems/sqrtx/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'Find Nth root of M', url: 'https://takeuforward.org/data-structure/find-nth-root-of-a-number-using-binary-search/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Koko Eating Bananas', url: 'https://leetcode.com/problems/koko-eating-bananas/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Minimum days to make M bouquets', url: 'https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Find smallest divisor', url: 'https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Capacity to ship packages (D days)', url: 'https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Aggressive Cows (classic)', url: 'https://takeuforward.org/data-structure/aggressive-cows-detailed-solution/', difficulty: 'medium', mustSolve: true, platform: 'GFG' },
          { title: 'Book allocation problem', url: 'https://takeuforward.org/data-structure/allocate-minimum-number-of-pages/', difficulty: 'medium', mustSolve: true, platform: 'GFG' },
          { title: 'Split array largest sum', url: 'https://leetcode.com/problems/split-array-largest-sum/', difficulty: 'hard', mustSolve: true, platform: 'LeetCode' },
          { title: 'Median of two sorted arrays', url: 'https://leetcode.com/problems/median-of-two-sorted-arrays/', difficulty: 'hard', mustSolve: true, platform: 'LeetCode' },
          { title: 'Kth element of two sorted arrays', url: 'https://takeuforward.org/data-structure/k-th-element-of-two-sorted-arrays/', difficulty: 'hard', mustSolve: true, platform: 'GFG' },
        ]
      },
      {
        id: '4.3',
        title: 'Binary Search on 2D Arrays',
        concept: 'Treat a 2D matrix as a 1D array mentally. row = mid/cols, col = mid%cols. This lets you BS on a sorted matrix.',
        problems: [
          { title: 'Search in 2D matrix', url: 'https://leetcode.com/problems/search-a-2d-matrix/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Search in 2D matrix II', url: 'https://leetcode.com/problems/search-a-2d-matrix-ii/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Find peak in 2D matrix', url: 'https://leetcode.com/problems/find-a-peak-element-ii/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Median in row-wise sorted matrix', url: 'https://takeuforward.org/data-structure/median-of-row-wise-sorted-matrix/', difficulty: 'hard', mustSolve: true, platform: 'GFG' },
        ]
      },
    ]
  },
  {
    step: 5,
    title: 'Strings',
    description: 'Strings are arrays of characters. Most string problems use two pointers, hashing, or sliding window. The key is seeing the pattern.',
    subTopics: [
      {
        id: '5.1',
        title: 'Basic String Problems',
        concept: 'These build your string manipulation fluency. Every single easy string problem you need to do fast — in an interview, string problems should feel automatic.',
        problems: [
          { title: 'Reverse words in a string', url: 'https://leetcode.com/problems/reverse-words-in-a-string/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Largest odd number in string', url: 'https://leetcode.com/problems/largest-odd-number-in-a-string/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'Longest common prefix', url: 'https://leetcode.com/problems/longest-common-prefix/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'Isomorphic strings', url: 'https://leetcode.com/problems/isomorphic-strings/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'Check if strings are rotations', url: 'https://practice.geeksforgeeks.org/problems/check-if-strings-are-rotations-of-each-other/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Check anagram', url: 'https://leetcode.com/problems/valid-anagram/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'Sort characters by frequency', url: 'https://leetcode.com/problems/sort-characters-by-frequency/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Maximum nesting depth of parentheses', url: 'https://leetcode.com/problems/maximum-nesting-depth-of-the-parentheses/', difficulty: 'easy', mustSolve: false, platform: 'LeetCode' },
          { title: 'Roman to integer', url: 'https://leetcode.com/problems/roman-to-integer/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'Atoi (implement string to int)', url: 'https://leetcode.com/problems/string-to-integer-atoi/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
        ]
      },
      {
        id: '5.2',
        title: 'Medium / Hard String Problems',
        concept: 'Harder string problems typically use hashing for O(n) solutions, or Z-algorithm/KMP for pattern matching. These directly appear in FAANG interviews.',
        problems: [
          { title: 'Longest palindromic substring', url: 'https://leetcode.com/problems/longest-palindromic-substring/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Sum of beauty of all substrings', url: 'https://leetcode.com/problems/sum-of-beauty-of-all-substrings/', difficulty: 'medium', mustSolve: false, platform: 'LeetCode' },
          { title: 'Reverse every word in a string', url: 'https://takeuforward.org/data-structure/reverse-each-word-in-a-string/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Minimum chars to add to make palindrome', url: 'https://takeuforward.org/data-structure/minimum-characters-needed-to-be-inserted-to-make-it-a-palindrome/', difficulty: 'hard', mustSolve: true, platform: 'GFG' },
          { title: 'Count and say', url: 'https://leetcode.com/problems/count-and-say/', difficulty: 'medium', mustSolve: false, platform: 'LeetCode' },
          { title: 'Z-Algorithm (pattern matching)', url: 'https://takeuforward.org/data-structure/z-function/', difficulty: 'medium', mustSolve: true, platform: 'GFG' },
          { title: 'KMP algorithm', url: 'https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Rabin Karp algorithm', url: 'https://takeuforward.org/data-structure/rabin-karp-algorithm/', difficulty: 'medium', mustSolve: false, platform: 'GFG' },
        ]
      },
    ]
  },
  {
    step: 6,
    title: 'Learn LinkedList',
    description: 'NOW linked list makes sense — because you have arrays, recursion, hashing, and sorting already. Linked list problems combine pointer manipulation with the recursion mindset.',
    subTopics: [
      {
        id: '6.1',
        title: 'Learn 1D LinkedList',
        concept: 'Build a linked list from scratch. Understand what a node is, how pointers connect them, and why head is the only entry point.',
        problems: [
          { title: 'Introduction to LinkedList', url: 'https://takeuforward.org/data-structure/introduction-to-linked-list/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Inserting a node in LL', url: 'https://takeuforward.org/data-structure/learn-to-insert-a-node-in-a-linked-list/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Deleting a node in LL', url: 'https://takeuforward.org/data-structure/learn-to-delete-a-node-in-linked-list/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Find length of LL', url: 'https://takeuforward.org/data-structure/find-length-of-linked-list/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Search in LL', url: 'https://takeuforward.org/data-structure/search-an-element-in-a-linked-list/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
        ]
      },
      {
        id: '6.2',
        title: 'Learn Doubly LinkedList',
        concept: 'Each node has both next and prev pointers. This enables O(1) deletion when you have the node (used in LRU cache).',
        problems: [
          { title: 'Introduction to DLL', url: 'https://takeuforward.org/data-structure/introduction-to-doubly-linked-list/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Insert node in DLL', url: 'https://takeuforward.org/data-structure/insert-a-node-in-doubly-linked-list/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Delete node in DLL', url: 'https://takeuforward.org/data-structure/delete-a-node-in-doubly-linked-list/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Reverse a DLL', url: 'https://takeuforward.org/data-structure/reverse-a-doubly-linked-list/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
        ]
      },
      {
        id: '6.3',
        title: 'Medium LL Problems',
        concept: 'These are interview classics. Floyd\'s algorithm (fast/slow pointer) appears in 5+ problems. Reverse LL is asked in almost every company.',
        problems: [
          { title: 'Middle of LinkedList', url: 'https://leetcode.com/problems/middle-of-the-linked-list/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'Reverse a LinkedList', url: 'https://leetcode.com/problems/reverse-linked-list/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'Detect a cycle in LL', url: 'https://leetcode.com/problems/linked-list-cycle/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'Find length of cycle', url: 'https://takeuforward.org/data-structure/find-the-length-of-a-linked-list-cycle/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Find the starting point of the cycle', url: 'https://leetcode.com/problems/linked-list-cycle-ii/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Check if LL is palindrome', url: 'https://leetcode.com/problems/palindrome-linked-list/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'Odd even linked list', url: 'https://leetcode.com/problems/odd-even-linked-list/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Remove Nth node from end', url: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Delete the middle node', url: 'https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Sort a LL (merge sort)', url: 'https://leetcode.com/problems/sort-list/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Sort LL of 0s 1s and 2s', url: 'https://takeuforward.org/data-structure/sort-linked-list-of-0s-1s-2s/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Find intersection of two LL', url: 'https://leetcode.com/problems/intersection-of-two-linked-lists/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'Add 1 to a number represented by LL', url: 'https://takeuforward.org/data-structure/add-1-to-a-number-represented-as-linked-list/', difficulty: 'medium', mustSolve: true, platform: 'GFG' },
          { title: 'Merge two sorted LL', url: 'https://leetcode.com/problems/merge-two-sorted-lists/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
        ]
      },
      {
        id: '6.4',
        title: 'Hard LL Problems',
        concept: 'These are FAANG-level. Reverse in k groups and flatten a LL are asked regularly at Google and Meta. Copy list with random pointer uses a hashmap or O(1) space clever trick.',
        problems: [
          { title: 'Reverse LL in groups of K', url: 'https://leetcode.com/problems/reverse-nodes-in-k-group/', difficulty: 'hard', mustSolve: true, platform: 'LeetCode' },
          { title: 'Rotate a LL', url: 'https://leetcode.com/problems/rotate-list/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Flatten a LL', url: 'https://practice.geeksforgeeks.org/problems/flattening-a-linked-list/', difficulty: 'medium', mustSolve: true, platform: 'GFG' },
          { title: 'Clone LL with random pointer', url: 'https://leetcode.com/problems/copy-list-with-random-pointer/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'LRU Cache (DLL + HashMap)', url: 'https://leetcode.com/problems/lru-cache/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
        ]
      },
    ]
  },
  {
    step: 7,
    title: 'Recursion & Backtracking',
    description: 'The hardest mental shift in DSA. Once recursion clicks, everything else becomes easier. Trust the function to solve a smaller problem.',
    subTopics: [
      {
        id: '7.1',
        title: 'Get a strong hold on Recursion',
        concept: 'Three things to identify in every recursion problem: 1) What is the base case? 2) What does one recursive call do? 3) What do I do with the result? Once you answer these three, write the code.',
        problems: [
          { title: 'Recursive implementation of atoi', url: 'https://practice.geeksforgeeks.org/problems/recursive-atoi/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Pow(x, n)', url: 'https://leetcode.com/problems/powx-n/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Count good numbers', url: 'https://leetcode.com/problems/count-good-numbers/', difficulty: 'medium', mustSolve: false, platform: 'LeetCode' },
          { title: 'Sort a stack using recursion', url: 'https://practice.geeksforgeeks.org/problems/sort-a-stack/', difficulty: 'medium', mustSolve: true, platform: 'GFG' },
          { title: 'Reverse a stack using recursion', url: 'https://practice.geeksforgeeks.org/problems/reverse-a-stack/', difficulty: 'medium', mustSolve: true, platform: 'GFG' },
        ]
      },
      {
        id: '7.2',
        title: 'Subsequences Pattern',
        concept: 'Subsequences = at each element, decide to INCLUDE or EXCLUDE. This is the foundation of all subset/combination problems. Every DP problem starts as a recursion problem.',
        problems: [
          { title: 'Generate all binary strings', url: 'https://takeuforward.org/data-structure/generate-all-binary-strings/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Generate parentheses', url: 'https://leetcode.com/problems/generate-parentheses/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Print all subsequences', url: 'https://takeuforward.org/data-structure/print-all-subsequences-power-set/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Subsets', url: 'https://leetcode.com/problems/subsets/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Subsets II (with duplicates)', url: 'https://leetcode.com/problems/subsets-ii/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Combination sum I', url: 'https://leetcode.com/problems/combination-sum/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Combination sum II', url: 'https://leetcode.com/problems/combination-sum-ii/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Combination sum III', url: 'https://leetcode.com/problems/combination-sum-iii/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Palindrome partitioning', url: 'https://leetcode.com/problems/palindrome-partitioning/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
        ]
      },
      {
        id: '7.3',
        title: 'Backtracking Patterns',
        concept: 'Backtracking = recursion + undo. You explore a path, and if it doesn\'t lead to a solution, you UNDO the last choice and try another. N-Queens is the classic. Word search on grid is very commonly asked.',
        problems: [
          { title: 'N-Queens', url: 'https://leetcode.com/problems/n-queens/', difficulty: 'hard', mustSolve: true, platform: 'LeetCode' },
          { title: 'Sudoku solver', url: 'https://leetcode.com/problems/sudoku-solver/', difficulty: 'hard', mustSolve: true, platform: 'LeetCode' },
          { title: 'M-Coloring problem', url: 'https://practice.geeksforgeeks.org/problems/m-coloring-problem/', difficulty: 'medium', mustSolve: true, platform: 'GFG' },
          { title: 'Word search', url: 'https://leetcode.com/problems/word-search/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Rat in a maze', url: 'https://practice.geeksforgeeks.org/problems/rat-in-a-maze-problem/', difficulty: 'medium', mustSolve: true, platform: 'GFG' },
          { title: 'Permutations', url: 'https://leetcode.com/problems/permutations/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Permutations II (with duplicates)', url: 'https://leetcode.com/problems/permutations-ii/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
        ]
      },
    ]
  },
  {
    step: 8,
    title: 'Bit Manipulation',
    description: 'Bit tricks solve problems in O(1) that would otherwise need O(n). XOR, AND, OR, left/right shift — these are tools every senior engineer uses.',
    subTopics: [
      {
        id: '8.1',
        title: 'Bit Manipulation Concepts',
        concept: 'Key tricks: XOR of same number = 0. XOR with 0 = same number. n & (n-1) clears the lowest set bit. These three facts alone solve 10+ problems.',
        problems: [
          { title: 'Introduction to bit manipulation', url: 'https://takeuforward.org/data-structure/introduction-to-bit-manipulation/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Check if Kth bit is set', url: 'https://takeuforward.org/data-structure/check-if-kth-bit-is-set-or-not/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Odd or even (bit)', url: 'https://takeuforward.org/data-structure/check-if-a-number-is-odd-or-even/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Power of 2', url: 'https://leetcode.com/problems/power-of-two/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'Count set bits', url: 'https://leetcode.com/problems/number-of-1-bits/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'Set/Unset/Toggle Kth bit', url: 'https://takeuforward.org/data-structure/set-unset-and-toggle-the-kth-bit/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Remove last set bit', url: 'https://takeuforward.org/data-structure/remove-the-last-set-bit/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Single number (XOR)', url: 'https://leetcode.com/problems/single-number/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'XOR of numbers in a range', url: 'https://takeuforward.org/data-structure/xor-of-numbers-from-1-to-n/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Two numbers with odd occurrences', url: 'https://takeuforward.org/data-structure/find-two-numbers-where-odd-occurrences/', difficulty: 'medium', mustSolve: true, platform: 'GFG' },
          { title: 'Power set using bits', url: 'https://leetcode.com/problems/subsets/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Count set bits from 1 to N', url: 'https://leetcode.com/problems/counting-bits/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'Reverse bits of a number', url: 'https://leetcode.com/problems/reverse-bits/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'Find the single element in pairs', url: 'https://leetcode.com/problems/single-element-in-a-sorted-array/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Divide two integers without / or *', url: 'https://leetcode.com/problems/divide-two-integers/', difficulty: 'medium', mustSolve: false, platform: 'LeetCode' },
        ]
      },
    ]
  },
  {
    step: 9,
    title: 'Stack and Queues',
    description: 'Stack = LIFO, Queue = FIFO. The monotonic stack pattern alone solves 8+ interview problems. Master this.',
    subTopics: [
      {
        id: '9.1',
        title: 'Learning: Stack, Queue, Deque basics',
        concept: 'Implement stack using arrays and linked list from scratch. Understanding internals makes you better at using them.',
        problems: [
          { title: 'Implement stack using arrays', url: 'https://takeuforward.org/data-structure/implement-stack-using-array/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Implement stack using LL', url: 'https://takeuforward.org/data-structure/implement-stack-using-linked-list/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Implement queue using arrays', url: 'https://takeuforward.org/data-structure/implement-queue-using-array/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Implement queue using LL', url: 'https://takeuforward.org/data-structure/implement-queue-using-linked-list/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Implement stack using queue', url: 'https://leetcode.com/problems/implement-stack-using-queues/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'Implement queue using stack', url: 'https://leetcode.com/problems/implement-queue-using-stacks/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'Valid parentheses', url: 'https://leetcode.com/problems/valid-parentheses/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'Min stack', url: 'https://leetcode.com/problems/min-stack/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
        ]
      },
      {
        id: '9.2',
        title: 'Monotonic Stack / Queue Problems',
        concept: 'Monotonic stack = a stack that maintains increasing or decreasing order. Pattern: for each element, pop elements from stack that violate the order. This finds "next greater", "previous smaller" in O(n).',
        problems: [
          { title: 'Next greater element I', url: 'https://leetcode.com/problems/next-greater-element-i/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'Next greater element II (circular)', url: 'https://leetcode.com/problems/next-greater-element-ii/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Previous smaller element', url: 'https://takeuforward.org/data-structure/previous-smaller-element/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Number of NGEs to the right', url: 'https://takeuforward.org/data-structure/number-of-nges-to-the-right/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Trapping rainwater', url: 'https://leetcode.com/problems/trapping-rain-water/', difficulty: 'hard', mustSolve: true, platform: 'LeetCode' },
          { title: 'Sum of subarray minimums', url: 'https://leetcode.com/problems/sum-of-subarray-minimums/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Asteroid collision', url: 'https://leetcode.com/problems/asteroid-collision/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Daily temperatures', url: 'https://leetcode.com/problems/daily-temperatures/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Largest rectangle in histogram', url: 'https://leetcode.com/problems/largest-rectangle-in-histogram/', difficulty: 'hard', mustSolve: true, platform: 'LeetCode' },
          { title: 'Maximal rectangle in matrix', url: 'https://leetcode.com/problems/maximal-rectangle/', difficulty: 'hard', mustSolve: true, platform: 'LeetCode' },
          { title: 'Sliding window maximum (deque)', url: 'https://leetcode.com/problems/sliding-window-maximum/', difficulty: 'hard', mustSolve: true, platform: 'LeetCode' },
          { title: 'LRU Cache (Stack + LL)', url: 'https://leetcode.com/problems/lru-cache/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
        ]
      },
    ]
  },
  {
    step: 10,
    title: 'Sliding Window & Two Pointers',
    description: 'These patterns reduce O(n²) brute force to O(n). Every subarray/substring problem should make you think: "can sliding window solve this?"',
    subTopics: [
      {
        id: '10.1',
        title: 'Medium Problems',
        concept: 'Sliding window = expand right pointer, shrink left when condition breaks. Two pointers = one from each end, move based on condition.',
        problems: [
          { title: 'Longest substring without repeating chars', url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Max consecutive ones III', url: 'https://leetcode.com/problems/max-consecutive-ones-iii/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Fruit into baskets', url: 'https://leetcode.com/problems/fruit-into-baskets/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Count number of nice subarrays', url: 'https://leetcode.com/problems/count-number-of-nice-subarrays/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Number of substrings with all 3 chars', url: 'https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Maximum points from cards', url: 'https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Longest repeating character replacement', url: 'https://leetcode.com/problems/longest-repeating-character-replacement/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Binary subarrays with sum', url: 'https://leetcode.com/problems/binary-subarrays-with-sum/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Count subarrays with k different integers', url: 'https://leetcode.com/problems/subarrays-with-k-different-integers/', difficulty: 'hard', mustSolve: true, platform: 'LeetCode' },
          { title: 'Minimum window substring', url: 'https://leetcode.com/problems/minimum-window-substring/', difficulty: 'hard', mustSolve: true, platform: 'LeetCode' },
          { title: 'Minimum window containing subsequence', url: 'https://leetcode.com/problems/minimum-window-subsequence/', difficulty: 'hard', mustSolve: false, platform: 'LeetCode' },
        ]
      },
    ]
  },
  {
    step: 11,
    title: 'Heaps',
    description: 'Priority queue = heap. Whenever you see "Kth largest/smallest", think heap. O(log n) insert and delete.',
    subTopics: [
      {
        id: '11.1',
        title: 'Heap learning + problems',
        concept: 'Min-heap: parent always smaller than children. Max-heap: parent always larger. STL priority_queue is max-heap by default. For min-heap use priority_queue<int, vector<int>, greater<int>>.',
        problems: [
          { title: 'Introduction to heap', url: 'https://takeuforward.org/data-structure/introduction-to-heaps/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Min heap and max heap', url: 'https://takeuforward.org/data-structure/min-heap-and-max-heap/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Kth largest element', url: 'https://leetcode.com/problems/kth-largest-element-in-an-array/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Kth smallest element', url: 'https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Sort K sorted array', url: 'https://takeuforward.org/data-structure/nearly-sorted-algorithm/', difficulty: 'medium', mustSolve: true, platform: 'GFG' },
          { title: 'Merge K sorted lists', url: 'https://leetcode.com/problems/merge-k-sorted-lists/', difficulty: 'hard', mustSolve: true, platform: 'LeetCode' },
          { title: 'Replace elements by rank', url: 'https://takeuforward.org/data-structure/replace-elements-by-its-rank-in-the-array/', difficulty: 'easy', mustSolve: false, platform: 'GFG' },
          { title: 'Task scheduler', url: 'https://leetcode.com/problems/task-scheduler/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Hands of straights', url: 'https://leetcode.com/problems/hand-of-straights/', difficulty: 'medium', mustSolve: false, platform: 'LeetCode' },
          { title: 'Top K frequent elements', url: 'https://leetcode.com/problems/top-k-frequent-elements/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Find median from data stream', url: 'https://leetcode.com/problems/find-median-from-data-stream/', difficulty: 'hard', mustSolve: true, platform: 'LeetCode' },
        ]
      },
    ]
  },
  {
    step: 12,
    title: 'Greedy Algorithms',
    description: 'Greedy = make the locally optimal choice at each step. No backtracking. Works when the local optimum leads to global optimum.',
    subTopics: [
      {
        id: '12.1',
        title: 'Easy Greedy Problems',
        concept: 'Ask yourself: what is the greedy choice here? Prove it: if I make this choice, can a different choice ever give a better result? If no — greedy is correct.',
        problems: [
          { title: 'Assign cookies', url: 'https://leetcode.com/problems/assign-cookies/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'Fractional knapsack', url: 'https://practice.geeksforgeeks.org/problems/fractional-knapsack/', difficulty: 'medium', mustSolve: true, platform: 'GFG' },
          { title: 'Greedy algorithm to find minimum coins', url: 'https://takeuforward.org/data-structure/greedy-algorithm-to-find-minimum-number-of-coins/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Lemonade change', url: 'https://leetcode.com/problems/lemonade-change/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'Valid parenthesis string', url: 'https://leetcode.com/problems/valid-parenthesis-string/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'N meetings in one room', url: 'https://practice.geeksforgeeks.org/problems/n-meetings-in-one-room/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Jump game I', url: 'https://leetcode.com/problems/jump-game/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Jump game II', url: 'https://leetcode.com/problems/jump-game-ii/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
        ]
      },
      {
        id: '12.2',
        title: 'Medium / Hard Greedy',
        concept: 'Interval scheduling, job sequencing, candy distribution — these need careful greedy proofs. Don\'t just guess greedy; verify your invariant.',
        problems: [
          { title: 'Non-overlapping intervals', url: 'https://leetcode.com/problems/non-overlapping-intervals/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Insert intervals', url: 'https://leetcode.com/problems/insert-interval/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Merge intervals', url: 'https://leetcode.com/problems/merge-intervals/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Candy', url: 'https://leetcode.com/problems/candy/', difficulty: 'hard', mustSolve: true, platform: 'LeetCode' },
          { title: 'Shortest job first', url: 'https://takeuforward.org/data-structure/shortest-job-first-or-sjf-cpu-scheduling/', difficulty: 'medium', mustSolve: true, platform: 'GFG' },
          { title: 'Job sequencing problem', url: 'https://takeuforward.org/data-structure/job-sequencing-problem/', difficulty: 'medium', mustSolve: true, platform: 'GFG' },
          { title: 'Minimum platforms required', url: 'https://takeuforward.org/data-structure/minimum-number-of-platforms-required-for-a-railway/', difficulty: 'medium', mustSolve: true, platform: 'GFG' },
        ]
      },
    ]
  },
  {
    step: 13,
    title: 'Binary Trees',
    description: 'Trees are the most common interview topic after arrays. Traversals, height, diameter, LCA — know all of these cold.',
    subTopics: [
      {
        id: '13.1',
        title: 'Tree Traversals',
        concept: 'In-order (Left Root Right) → gives sorted order in BST. Pre-order (Root Left Right) → used to copy a tree. Post-order (Left Right Root) → used to delete a tree. Level-order → BFS with a queue.',
        problems: [
          { title: 'Inorder traversal', url: 'https://leetcode.com/problems/binary-tree-inorder-traversal/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'Preorder traversal', url: 'https://leetcode.com/problems/binary-tree-preorder-traversal/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'Postorder traversal', url: 'https://leetcode.com/problems/binary-tree-postorder-traversal/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'Level order traversal (BFS)', url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Iterative inorder (using stack)', url: 'https://takeuforward.org/data-structure/inorder-traversal-of-binary-tree/', difficulty: 'medium', mustSolve: true, platform: 'GFG' },
          { title: 'Morris traversal (O(1) space)', url: 'https://takeuforward.org/data-structure/morris-inorder-traversal-of-a-binary-tree/', difficulty: 'hard', mustSolve: true, platform: 'GFG' },
        ]
      },
      {
        id: '13.2',
        title: 'Medium Tree Problems',
        concept: 'Most tree problems follow a pattern: solve for left subtree, solve for right subtree, combine. Once you see this, trees become predictable.',
        problems: [
          { title: 'Height of binary tree', url: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'Check balanced binary tree', url: 'https://leetcode.com/problems/balanced-binary-tree/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'Diameter of binary tree', url: 'https://leetcode.com/problems/diameter-of-binary-tree/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'Maximum path sum', url: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/', difficulty: 'hard', mustSolve: true, platform: 'LeetCode' },
          { title: 'Check if two trees are identical', url: 'https://leetcode.com/problems/same-tree/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'Zig-zag level order traversal', url: 'https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Boundary traversal of tree', url: 'https://takeuforward.org/data-structure/boundary-traversal-of-a-binary-tree/', difficulty: 'medium', mustSolve: true, platform: 'GFG' },
          { title: 'Vertical order traversal', url: 'https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/', difficulty: 'hard', mustSolve: true, platform: 'LeetCode' },
          { title: 'Symmetric tree', url: 'https://leetcode.com/problems/symmetric-tree/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'Path from root to node', url: 'https://takeuforward.org/data-structure/print-root-to-node-path-in-a-binary-tree/', difficulty: 'medium', mustSolve: true, platform: 'GFG' },
          { title: 'LCA of two nodes', url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Width of binary tree', url: 'https://leetcode.com/problems/maximum-width-of-binary-tree/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Children sum property', url: 'https://takeuforward.org/data-structure/children-sum-property/', difficulty: 'medium', mustSolve: true, platform: 'GFG' },
          { title: 'Nodes at distance K from target', url: 'https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Minimum time to burn tree', url: 'https://takeuforward.org/data-structure/minimum-time-to-burn-a-tree/', difficulty: 'hard', mustSolve: true, platform: 'GFG' },
          { title: 'Count nodes in complete binary tree', url: 'https://leetcode.com/problems/count-complete-tree-nodes/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
        ]
      },
      {
        id: '13.3',
        title: 'Hard Tree Problems + BST',
        concept: 'BST property: all left < root < all right. Inorder of BST is always sorted — this is used in Kth smallest, validate BST, and floor/ceil problems.',
        problems: [
          { title: 'Construct BT from preorder and inorder', url: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Construct BT from postorder and inorder', url: 'https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Serialize and Deserialize BT', url: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/', difficulty: 'hard', mustSolve: true, platform: 'LeetCode' },
          { title: 'Flatten BT to linked list', url: 'https://leetcode.com/problems/flatten-binary-tree-to-linked-list/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Validate BST', url: 'https://leetcode.com/problems/validate-binary-search-tree/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'LCA of BST', url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Kth smallest in BST', url: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'BST iterator', url: 'https://leetcode.com/problems/binary-search-tree-iterator/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Two Sum in BST', url: 'https://leetcode.com/problems/two-sum-iv-input-is-a-bst/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'Recover BST (two nodes swapped)', url: 'https://leetcode.com/problems/recover-binary-search-tree/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
        ]
      },
    ]
  },
  {
    step: 14,
    title: 'Graphs',
    description: 'Trees are graphs. Everything you know about trees transfers here. Add BFS, DFS, Dijkstra, Topo sort, DSU — you can solve anything.',
    subTopics: [
      {
        id: '14.1',
        title: 'Graph learning + BFS + DFS',
        concept: 'Graph representation: adjacency list (most common). BFS uses a queue. DFS uses recursion or stack. Visited array is mandatory to avoid infinite loops.',
        problems: [
          { title: 'BFS of Graph', url: 'https://practice.geeksforgeeks.org/problems/bfs-traversal-of-graph/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'DFS of Graph', url: 'https://practice.geeksforgeeks.org/problems/depth-first-traversal-for-a-graph/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Number of provinces', url: 'https://leetcode.com/problems/number-of-provinces/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Number of islands', url: 'https://leetcode.com/problems/number-of-islands/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Flood fill', url: 'https://leetcode.com/problems/flood-fill/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'Rotten oranges', url: 'https://leetcode.com/problems/rotting-oranges/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Detect cycle in undirected graph (BFS)', url: 'https://takeuforward.org/data-structure/detect-cycle-in-an-undirected-graph-using-bfs/', difficulty: 'medium', mustSolve: true, platform: 'GFG' },
          { title: 'Detect cycle in directed graph (DFS)', url: 'https://takeuforward.org/data-structure/detect-cycle-in-a-directed-graph-using-dfs-g-19/', difficulty: 'medium', mustSolve: true, platform: 'GFG' },
          { title: 'Bipartite graph (BFS)', url: 'https://leetcode.com/problems/is-graph-bipartite/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Topological sort (DFS)', url: 'https://takeuforward.org/data-structure/topological-sort-algorithm-dfs-g-21/', difficulty: 'medium', mustSolve: true, platform: 'GFG' },
          { title: 'Topological sort (Kahn\'s BFS)', url: 'https://takeuforward.org/data-structure/kahns-algorithm-topological-sort-algorithm-bfs-g-22/', difficulty: 'medium', mustSolve: true, platform: 'GFG' },
          { title: 'Course schedule I', url: 'https://leetcode.com/problems/course-schedule/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Course schedule II', url: 'https://leetcode.com/problems/course-schedule-ii/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
        ]
      },
      {
        id: '14.2',
        title: 'Shortest Path Algorithms',
        concept: 'Dijkstra = single source shortest path, no negative weights, O((V+E) log V). Bellman-Ford handles negative weights. Floyd-Warshall is all-pairs O(V³). Know when to use which.',
        problems: [
          { title: 'Dijkstra\'s algorithm', url: 'https://takeuforward.org/data-structure/dijkstras-algorithm-using-set-g-33/', difficulty: 'medium', mustSolve: true, platform: 'GFG' },
          { title: 'Shortest path in DAG', url: 'https://takeuforward.org/data-structure/shortest-path-in-directed-acyclic-graph-topological-sort-g-27/', difficulty: 'medium', mustSolve: true, platform: 'GFG' },
          { title: 'Shortest path in undirected graph', url: 'https://takeuforward.org/data-structure/shortest-path-in-undirected-graph-with-unit-weights-g-28/', difficulty: 'medium', mustSolve: true, platform: 'GFG' },
          { title: 'Word ladder I', url: 'https://leetcode.com/problems/word-ladder/', difficulty: 'hard', mustSolve: true, platform: 'LeetCode' },
          { title: 'Bellman Ford', url: 'https://takeuforward.org/data-structure/bellman-ford-algorithm-g-41/', difficulty: 'medium', mustSolve: true, platform: 'GFG' },
          { title: 'Floyd Warshall', url: 'https://takeuforward.org/data-structure/floyd-warshall-algorithm-g-42/', difficulty: 'medium', mustSolve: true, platform: 'GFG' },
          { title: 'Find city with smallest number of neighbors', url: 'https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
        ]
      },
      {
        id: '14.3',
        title: 'Minimum Spanning Tree + DSU',
        concept: 'MST = minimum cost to connect all nodes. Prim\'s uses greedy + priority queue. Kruskal\'s uses DSU (Disjoint Set Union). DSU = union find — the most powerful graph data structure for connectivity queries.',
        problems: [
          { title: 'Minimum spanning tree (Prim\'s)', url: 'https://takeuforward.org/data-structure/prims-algorithm-minimum-spanning-tree-c-and-java-g-45/', difficulty: 'medium', mustSolve: true, platform: 'GFG' },
          { title: 'MST (Kruskal\'s)', url: 'https://takeuforward.org/data-structure/kruskals-algorithm-minimum-spanning-tree-g-47/', difficulty: 'medium', mustSolve: true, platform: 'GFG' },
          { title: 'Disjoint set union (DSU)', url: 'https://takeuforward.org/data-structure/disjoint-set-union-by-rank-union-by-size-path-compression-g-46/', difficulty: 'medium', mustSolve: true, platform: 'GFG' },
          { title: 'Number of operations to make network connected', url: 'https://leetcode.com/problems/number-of-operations-to-make-network-connected/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Accounts merge', url: 'https://leetcode.com/problems/accounts-merge/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Strongly connected components (Kosaraju)', url: 'https://takeuforward.org/graph/strongly-connected-components-kosarajus-algorithm-g-54/', difficulty: 'hard', mustSolve: true, platform: 'GFG' },
          { title: 'Bridges in a graph (Tarjan)', url: 'https://takeuforward.org/graph/bridges-in-graph-using-tarjans-algorithm-of-dfs-g-55/', difficulty: 'hard', mustSolve: true, platform: 'GFG' },
        ]
      },
    ]
  },
  {
    step: 15,
    title: 'Dynamic Programming',
    description: 'DP = recursion + memoization. Every DP problem starts as a recursive solution. Identify: overlapping subproblems + optimal substructure. Then memoize or tabulate.',
    subTopics: [
      {
        id: '15.1',
        title: '1D DP',
        concept: 'Start here. Fibonacci, climbing stairs, house robber — these build the core DP thinking. Always write recursion first, then memoize, then convert to tabulation.',
        problems: [
          { title: 'Climbing stairs', url: 'https://leetcode.com/problems/climbing-stairs/', difficulty: 'easy', mustSolve: true, platform: 'LeetCode' },
          { title: 'Frog jump (1D DP)', url: 'https://takeuforward.org/data-structure/dynamic-programming-frog-jump-dp-3/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'Frog jump with K distances', url: 'https://takeuforward.org/data-structure/dynamic-programming-frog-jump-with-k-distances-dp-4/', difficulty: 'easy', mustSolve: true, platform: 'GFG' },
          { title: 'House robber I', url: 'https://leetcode.com/problems/house-robber/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'House robber II (circular)', url: 'https://leetcode.com/problems/house-robber-ii/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
        ]
      },
      {
        id: '15.2',
        title: '2D / Grid DP',
        concept: 'dp[i][j] depends on dp[i-1][j] or dp[i][j-1]. Visualize the grid and think: what is the state? What are the transitions?',
        problems: [
          { title: 'Unique paths', url: 'https://leetcode.com/problems/unique-paths/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Unique paths II (with obstacles)', url: 'https://leetcode.com/problems/unique-paths-ii/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Minimum path sum in grid', url: 'https://leetcode.com/problems/minimum-path-sum/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Minimum falling path sum', url: 'https://leetcode.com/problems/minimum-falling-path-sum/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Triangle (min path sum)', url: 'https://leetcode.com/problems/triangle/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Cherry pickup II (3D DP)', url: 'https://leetcode.com/problems/cherry-pickup-ii/', difficulty: 'hard', mustSolve: true, platform: 'LeetCode' },
        ]
      },
      {
        id: '15.3',
        title: 'DP on Subsequences',
        concept: 'At each element: include or exclude. This pattern covers knapsack, subset sum, coin change, LCS — the most asked DP category.',
        problems: [
          { title: '0/1 Knapsack', url: 'https://takeuforward.org/data-structure/0-1-knapsack-dp-19/', difficulty: 'medium', mustSolve: true, platform: 'GFG' },
          { title: 'Subset sum equals target', url: 'https://takeuforward.org/data-structure/subset-sum-equal-to-target-dp-14/', difficulty: 'medium', mustSolve: true, platform: 'GFG' },
          { title: 'Partition equal subset sum', url: 'https://leetcode.com/problems/partition-equal-subset-sum/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Coin change (min coins)', url: 'https://leetcode.com/problems/coin-change/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Coin change II (number of ways)', url: 'https://leetcode.com/problems/coin-change-ii/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Unbounded knapsack', url: 'https://takeuforward.org/data-structure/unbounded-knapsack-dp-25/', difficulty: 'medium', mustSolve: true, platform: 'GFG' },
          { title: 'Longest common subsequence (LCS)', url: 'https://leetcode.com/problems/longest-common-subsequence/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Longest increasing subsequence (LIS)', url: 'https://leetcode.com/problems/longest-increasing-subsequence/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Edit distance', url: 'https://leetcode.com/problems/edit-distance/', difficulty: 'hard', mustSolve: true, platform: 'LeetCode' },
          { title: 'Burst balloons', url: 'https://leetcode.com/problems/burst-balloons/', difficulty: 'hard', mustSolve: true, platform: 'LeetCode' },
          { title: 'Matrix chain multiplication', url: 'https://takeuforward.org/data-structure/matrix-chain-multiplication-dp-48/', difficulty: 'hard', mustSolve: true, platform: 'GFG' },
        ]
      },
    ]
  },
  {
    step: 16,
    title: 'Trie',
    description: 'Trie = prefix tree. Used for autocomplete, word search, and IP routing. When you see "prefix" in a problem — think trie.',
    subTopics: [
      {
        id: '16.1',
        title: 'Trie problems',
        concept: 'Each node has 26 children (for lowercase English). Insert: create nodes for each character. Search: traverse and check if all chars exist.',
        problems: [
          { title: 'Implement Trie', url: 'https://leetcode.com/problems/implement-trie-prefix-tree/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Implement Trie II', url: 'https://takeuforward.org/data-structure/implement-trie-ii/', difficulty: 'medium', mustSolve: true, platform: 'GFG' },
          { title: 'Longest string with all prefixes', url: 'https://takeuforward.org/data-structure/longest-string-with-all-prefixes/', difficulty: 'medium', mustSolve: true, platform: 'GFG' },
          { title: 'Number of distinct substrings', url: 'https://takeuforward.org/data-structure/number-of-distinct-substrings-in-a-string/', difficulty: 'medium', mustSolve: true, platform: 'GFG' },
          { title: 'Maximum XOR of two numbers', url: 'https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/', difficulty: 'medium', mustSolve: true, platform: 'LeetCode' },
          { title: 'Maximum XOR with element from array', url: 'https://leetcode.com/problems/maximum-xor-with-an-element-from-array/', difficulty: 'hard', mustSolve: true, platform: 'LeetCode' },
        ]
      },
    ]
  },
]

export function getTotalProblems(sheet = STRIVER_A2Z) {
  return sheet.reduce((total, step) =>
    total + step.subTopics.reduce((st, sub) => st + sub.problems.length, 0), 0)
}

export function getMustSolveCount(sheet = STRIVER_A2Z) {
  return sheet.reduce((total, step) =>
    total + step.subTopics.reduce((st, sub) =>
      st + sub.problems.filter(p => p.mustSolve).length, 0), 0)
}
