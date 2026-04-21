# Mode 2: Sound to Letter

## Overview

Reverses the learning process - children hear sounds and must identify the correct letters. Letters are hidden initially, revealed through sound cues and correct placement.

## Learning Objectives

- Strengthen sound-to-letter mapping
- Improve phoneme discrimination
- Build spelling awareness
- Develop auditory processing skills

## User Flow

1. **Word Setup**: Word displayed with blank letter spaces
2. **Sound Cue**: Tap blank space → hear sound for that position
3. **Letter Selection**: Drag letter from pool below to blank
4. **Feedback**: Correct placement = letter appears, incorrect = return to pool
5. **Completion**: All letters placed = word audio + celebration

## Technical Implementation

- **Component Structure**:
  - `BlankWord`: Container with blank letter slots
  - `LetterPool`: Draggable letter tiles at bottom
  - `DropZone`: Individual blank spaces accepting drops

- **Drag & Drop**:
  - `react-native-gesture-handler` for drag gestures
  - Position tracking for drop validation
  - Visual feedback during drag (ghost image, highlight zones)

- **Audio Logic**:
  - Position-specific sounds (first letter, middle, last)
  - Word completion audio
  - Error sounds for incorrect placements

## UI/UX Considerations

- **Blank Design**: Clear visual placeholders for letters
- **Letter Pool**: Organized grid, visual distinction from blanks
- **Feedback System**: Green checkmark for correct, red X for incorrect
- **Progressive Disclosure**: Reveal letters gradually or all at once
- **Hints**: Optional sound replay or letter highlighting

## Difficulty Levels

- **Easy**: 3 letters, pool contains only correct letters
- **Medium**: 4 letters, pool has 2-3 extra distractors
- **Hard**: 5+ letters, pool has many similar-sounding letters

## Success Criteria

- Child can identify letters from sounds alone
- Reduced need for hints over time
- Smooth transition from Mode 1 to Mode 2
