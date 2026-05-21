export interface Exercise {
  name: string
  sets: number
  reps: string       // e.g. "12-15" or "to failure"
  rest: string       // rest between sets
  youtubeId: string  // YouTube video ID for form guide
  cues: string[]     // form cues
  beginner?: string  // easier variation
  advanced?: string  // harder variation
  muscleGroup: string
}

export interface WorkoutDay {
  day: string
  type: string
  focus: string
  exercises: Exercise[]
  warmup: string[]
  cooldown: string[]
}

export const WORKOUT_PLAN: WorkoutDay[] = [
  {
    day: 'Monday',
    type: 'Push',
    focus: 'Chest, Shoulders, Triceps',
    warmup: ['10 arm circles each direction', '10 shoulder rolls', '15 band pull-aparts or chest openers', '5 push-up negatives (slow down)'],
    cooldown: ['Chest doorway stretch 30s each side', 'Tricep overhead stretch 20s', 'Child\'s pose 30s'],
    exercises: [
      { name: 'Push-ups', sets: 4, reps: '12-20', rest: '60s', youtubeId: 'IODxDxX7oi4', muscleGroup: 'Chest', cues: ['Keep body straight line head to heel', 'Elbows at 45° not flared out', 'Full range — chest nearly touches floor', 'Squeeze chest at top'], beginner: 'Knee push-ups', advanced: 'Diamond push-ups' },
      { name: 'Pike Push-ups (Shoulder Press)', sets: 3, reps: '10-12', rest: '60s', youtubeId: 'sposDXWEB0A', muscleGroup: 'Shoulders', cues: ['Hips high, body inverted V', 'Lower head between hands', 'Press back up explosively', 'Look back at feet'], beginner: 'Elevated pike push-up', advanced: 'Decline pike push-up' },
      { name: 'Dumbbell/Water Bottle Press', sets: 3, reps: '10-12', rest: '60s', youtubeId: 'VmB1G1K7v94', muscleGroup: 'Chest', cues: ['Flat back on floor or bench', 'Control the descent (2 seconds down)', 'Drive up explosively', 'Don\'t lock elbows at top'], beginner: 'Lighter weight, wider grip', advanced: 'Single arm variation' },
      { name: 'Lateral Raises', sets: 3, reps: '15-20', rest: '45s', youtubeId: '3VcKaXpzqRo', muscleGroup: 'Shoulders', cues: ['Slight bend in elbows', 'Lead with elbows, not wrists', 'Only go to shoulder height', 'Slow controlled descent'], beginner: 'No weight — full ROM first', advanced: 'Pause at top' },
      { name: 'Tricep Dips (Chair)', sets: 3, reps: '10-15', rest: '60s', youtubeId: 'c3ZGl4pnLZY', muscleGroup: 'Triceps', cues: ['Hands close to body', 'Elbows point back not out', 'Lower till upper arm is parallel', 'Keep core tight'], beginner: 'Feet on floor, bent knees', advanced: 'Feet elevated, weight on lap' },
      { name: 'Close-grip Push-ups', sets: 3, reps: '8-12', rest: '60s', youtubeId: 'u7J-KBGhAmc', muscleGroup: 'Triceps', cues: ['Hands shoulder width or closer', 'Elbows tucked to sides', 'Full range of motion', 'Squeeze triceps at top'], beginner: 'Wide push-up variation', advanced: 'One-arm progression' },
    ]
  },
  {
    day: 'Tuesday',
    type: 'Pull',
    focus: 'Back, Biceps',
    warmup: ['10 cat-cow stretches', 'Band pull-aparts or towel rows', '10 dead hangs if bar available', 'Hip hinges bodyweight 10 reps'],
    cooldown: ['Lat stretch against wall 30s', 'Bicep stretch arms behind 20s', 'Thread the needle 20s each side'],
    exercises: [
      { name: 'Pull-ups / Inverted Rows', sets: 4, reps: '5-10', rest: '90s', youtubeId: 'eGo4IYlbE5g', muscleGroup: 'Back', cues: ['Start from dead hang', 'Pull elbows down and back', 'Get chin above bar', 'Lower controlled (3 seconds)'], beginner: 'Inverted rows under a table', advanced: 'Archer pull-ups' },
      { name: 'Dumbbell Row (each side)', sets: 3, reps: '10-12', rest: '60s', youtubeId: '6FSoKDMgOOc', muscleGroup: 'Back', cues: ['Brace on knee or bench', 'Row to hip not shoulder', 'Squeeze shoulder blade at top', 'Keep back flat, don\'t twist'], beginner: 'Lighter weight, focus form', advanced: 'Pause at top 1 second' },
      { name: 'Face Pulls / Rear Delt Rows', sets: 3, reps: '15-20', rest: '45s', youtubeId: 'rep-qVOkqgk', muscleGroup: 'Rear Delts', cues: ['Pull to face level', 'Elbows high, above wrists', 'External rotate at the end', 'Squeeze shoulder blades'], beginner: 'Band pull-aparts', advanced: 'Single arm cable' },
      { name: 'Bicep Curls', sets: 3, reps: '12-15', rest: '60s', youtubeId: 'ykJmrZ5v0Oo', muscleGroup: 'Biceps', cues: ['Don\'t swing', 'Supinate wrist at top (turn palm up)', 'Full range — full extension down', 'Hold at top 1 second'], beginner: 'Hammer curl variation', advanced: 'Incline curl' },
      { name: 'Hammer Curls', sets: 3, reps: '10-12', rest: '60s', youtubeId: 'zC3nLlEvin4', muscleGroup: 'Biceps / Brachialis', cues: ['Neutral grip (thumbs up)', 'Controlled descent', 'Don\'t let elbows drift forward', 'Good for forearm development'], beginner: 'Light weight focus ROM', advanced: 'Cross-body variation' },
    ]
  },
  {
    day: 'Wednesday',
    type: 'Rest / Active Recovery',
    focus: 'Mobility and recovery',
    warmup: [],
    cooldown: [],
    exercises: [
      { name: '20 min walk', sets: 1, reps: '20 mins', rest: '—', youtubeId: '', muscleGroup: 'Cardio', cues: ['Brisk pace, not leisurely', 'Arms swinging naturally', 'Head up, good posture'] },
      { name: 'Full body stretching', sets: 1, reps: '10 mins', rest: '—', youtubeId: 'sTxC3J3gQEU', muscleGroup: 'Mobility', cues: ['Hold each stretch 30 seconds', 'Breathe deeply', 'No bouncing'] },
    ]
  },
  {
    day: 'Thursday',
    type: 'Legs',
    focus: 'Quads, Hamstrings, Glutes, Calves',
    warmup: ['10 bodyweight squats', '10 leg swings each leg', '10 hip circles each direction', 'Ankle rotations'],
    cooldown: ['Pigeon pose 40s each side', 'Standing quad stretch 30s', 'Seated hamstring stretch', 'Calf stretch on wall'],
    exercises: [
      { name: 'Bodyweight / Goblet Squats', sets: 4, reps: '15-20', rest: '60s', youtubeId: 'aclHkVaku9U', muscleGroup: 'Quads / Glutes', cues: ['Feet shoulder width, toes slightly out', 'Chest up throughout', 'Knees track over toes', 'Break parallel if mobility allows'], beginner: 'Box squat to chair', advanced: 'Pause squat 2s at bottom' },
      { name: 'Romanian Deadlift (RDL)', sets: 3, reps: '10-12', rest: '75s', youtubeId: 'JCXUYuzwNrM', muscleGroup: 'Hamstrings / Glutes', cues: ['Hinge at hips — NOT a squat', 'Feel stretch in hamstrings', 'Bar/weight stays close to body', 'Drive hips forward to stand'], beginner: 'Single leg RDL no weight', advanced: 'Single leg with weight' },
      { name: 'Lunges', sets: 3, reps: '12 each leg', rest: '60s', youtubeId: 'QE0phAHCwGk', muscleGroup: 'Quads / Glutes', cues: ['Big step forward', 'Back knee nearly touches floor', 'Front knee doesn\'t pass toes', 'Drive through front heel to stand'], beginner: 'Stationary lunge', advanced: 'Walking lunges with weight' },
      { name: 'Glute Bridge / Hip Thrust', sets: 3, reps: '15-20', rest: '60s', youtubeId: 'wPM8icPu6H8', muscleGroup: 'Glutes', cues: ['Drive through heels', 'Squeeze glutes at top hard', 'Don\'t hyperextend lower back', 'Hold 1 second at top'], beginner: 'Bodyweight bridge', advanced: 'Single leg or weighted' },
      { name: 'Calf Raises', sets: 4, reps: '20-25', rest: '45s', youtubeId: ''  , muscleGroup: 'Calves', cues: ['Full range — all the way up and down', 'Pause at top', 'Slow descent (2-3 seconds)', 'Can do on a step for extra ROM'], beginner: 'Two feet seated', advanced: 'Single leg standing' },
    ]
  },
  {
    day: 'Friday',
    type: 'Upper Body',
    focus: 'Chest, Back, Shoulders (balanced)',
    warmup: ['10 arm circles', '10 push-up negatives', '10 inverted rows', 'Shoulder mobility'],
    cooldown: ['Chest stretch', 'Lat stretch', 'Shoulder cross-body stretch'],
    exercises: [
      { name: 'Wide Push-ups', sets: 3, reps: '15-20', rest: '60s', youtubeId: 'IODxDxX7oi4', muscleGroup: 'Chest', cues: ['Wide than shoulder-width', 'More chest activation', 'Controlled descent', 'Full ROM'] },
      { name: 'Inverted Rows', sets: 3, reps: '10-15', rest: '60s', youtubeId: 'PGRc7K55pRY', muscleGroup: 'Back', cues: ['Body straight', 'Pull chest to bar', 'Squeeze shoulder blades', 'Lower controlled'] },
      { name: 'Arnold Press', sets: 3, reps: '10-12', rest: '60s', youtubeId: 'IaoEC2MoQgA', muscleGroup: 'Shoulders', cues: ['Rotate from front to side as you press', 'Full range of motion', 'Don\'t lock out elbows', 'Control the negative'] },
      { name: 'Dumbbell Flyes', sets: 3, reps: '12-15', rest: '60s', youtubeId: 'eozdVDA78K0', muscleGroup: 'Chest', cues: ['Slight bend in elbows', 'Open arms wide, feel the stretch', 'Bring together at top', 'Go light — it\'s a stretch exercise'], beginner: 'Reduce range of motion', advanced: 'Cable flyes' },
      { name: 'Band / Towel Pull-aparts', sets: 3, reps: '20', rest: '45s', youtubeId: 'Ws9r7p7HLwE', muscleGroup: 'Rear Delts / Upper Back', cues: ['Arms straight', 'Pull apart to full width', 'Squeeze shoulder blades together', 'Slow controlled pace'] },
    ]
  },
  {
    day: 'Saturday',
    type: 'Core + Cardio',
    focus: 'Abs, Core stability, Conditioning',
    warmup: ['5 min light jog or jumping jacks', 'Hip circles', 'Cat-cow 10 reps'],
    cooldown: ['Cobra stretch', 'Child\'s pose', 'Spinal twist'],
    exercises: [
      { name: 'Plank', sets: 3, reps: '30-60s', rest: '45s', youtubeId: 'ASdvN_XEl_c', muscleGroup: 'Core', cues: ['Body perfectly straight', 'Don\'t let hips sag or pike', 'Breathe steadily', 'Squeeze everything — glutes, abs, quads'] },
      { name: 'Crunches / Sit-ups', sets: 3, reps: '20', rest: '45s', youtubeId: '1fbU_MkV7NE', muscleGroup: 'Abs', cues: ['Don\'t pull on neck', 'Exhale as you crunch up', 'Control the descent', 'Focus on abs doing the work'] },
      { name: 'Bicycle Crunches', sets: 3, reps: '20 each side', rest: '45s', youtubeId: '9FGilxCbdz8', muscleGroup: 'Obliques', cues: ['Slow and controlled', 'Full rotation each side', 'Keep lower back pressed down', 'Opposite elbow to knee'] },
      { name: 'Mountain Climbers', sets: 3, reps: '30s', rest: '30s', youtubeId: 'nmwgirgXLYM', muscleGroup: 'Core / Cardio', cues: ['Hips level', 'Drive knees to chest', 'Keep core tight', 'Fast but controlled pace'] },
    ]
  },
  {
    day: 'Sunday',
    type: 'Rest',
    focus: 'Recovery and meal prep',
    warmup: [],
    cooldown: [],
    exercises: [
      { name: 'Full rest day', sets: 1, reps: '—', rest: '—', youtubeId: '', muscleGroup: 'Recovery', cues: ['Sleep well — this is when you grow', 'Protein still matters today', 'Light walk ok if restless', 'Meal prep for the week'] },
    ]
  }
]
