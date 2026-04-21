# Mode 1: Sound & Blend

## Overview

The foundation mode where children learn letter-sound correspondence and word blending. Letters are visible, and children can tap individual letters to hear sounds or swipe across the word to blend it.

## Learning Objectives

- Associate letters with their sounds (phonemes)
- Understand blending sounds to form words
- Develop left-to-right reading direction
- Build confidence with simple CVC words

## User Flow

1. **Word Display**: Word appears with large, colorful letters
2. **Tap Interaction**: Touch any letter → hear isolated sound (e.g., "c" = "kuh")
3. **Swipe Interaction**: Drag finger across letters → continuous blending audio
4. **Repeat/Next**: Button to replay word or advance to next word

## Technical Implementation

- **Component Structure**:
  - `WordDisplay`: Container for letter components
  - `LetterTile`: Individual letter with touch handlers
  - `AudioManager`: Handles sound playback and blending

- **Gesture Handling**:
  - `PanGestureHandler` for swipe detection
  - Track finger position across letters
  - Trigger sounds based on letter sequence

- **Audio Logic**:
  - Individual phoneme files (e.g., a.mp3, b.mp3)
  - Blend by playing sounds in rapid succession
  - Word audio for full pronunciation

## UI/UX Considerations

- **Letter Design**: Large (2-3 inches), sans-serif font, high contrast
- **Visual Feedback**: Letters glow/highlight during tap/swipe
- **Animation**: Smooth transitions, finger-following highlight
- **Accessibility**: VoiceOver support, adjustable sound levels

## Word Selection

- Start with 3-letter CVC words: cat, dog, pig, bug
- Progress to 4-letter: clap, stop, frog
- Include common digraphs: ship, chat, thin

## Success Criteria

- Child can reliably tap letters for correct sounds
- Swipe produces recognizable word blending
- Natural progression to more complex words
