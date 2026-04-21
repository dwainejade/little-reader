# Reading App Plan

## Feature Tracker

### Mode 1: Sound & Blend

- [x] Display word as letter tiles
- [x] Tap letter → play phoneme sound
- [x] Press and hold letter → play phoneme sound
- [x] Swipe across letters → play sounds in sequence
- [x] Touch zones — equal-width zones per letter, no gaps, seamless finger drag
- [x] Zone outlines (debug visualization)
- [x] Active letter highlight + scale animation
- [x] Preload sounds per word (no audio bleed on word change)
- [x] Prev / Next word navigation
- [ ] Read Word button → plays full blended word audio
- [ ] Swipe animation that visually "flows" across letters
- [ ] Progress indicator (words completed in session)
- [ ] Word themes / categories
- [ ] Transition animation between words

### Mode 2: Sound to Letter

- [ ] Not started

### Mode 3: Word Builder

- [ ] Not started

### General

- [ ] App icon + splash screen
- [ ] Sound volume control
- [ ] Parent/teacher settings screen
- [ ] Offline-first asset bundling audit
- [ ] iPad layout optimization (larger tiles for bigger screen)

---

## Overview

A React Native iPad app designed to help children learn to read through interactive phonics activities. The app focuses on letter sounds, blending, and word building with multiple learning modes.

## Target Audience

- Children ages 4-8 learning to read
- Parents and educators looking for phonics-focused tools
- iPad users (primary platform, with potential Android/web expansion)

## Core Features

- **Phoneme-based learning**: Uses letter sounds (not names) for authentic reading experience
- **Multi-touch interactions**: Tap for individual sounds, swipe for blending
- **Progressive difficulty**: Multiple modes building on each other
- **Audio feedback**: Clear, consistent letter sounds
- **Visual feedback**: Animations and highlights during interactions

## Learning Modes

### Mode 1: Sound & Blend (Foundation)

**Goal**: Master letter-sound correspondence and blending

- Display word with visible letters
- Tap any letter → hear individual sound
- Swipe finger across letters → blend sounds into word
- Visual feedback: letters highlight as finger passes

### Mode 2: Sound to Letter (Recognition)

**Goal**: Reverse mapping from sound to letter

- Word displayed with invisible/blank letters
- Tap blank space → hear the sound for that position
- Drag correct letter from pool below to fill blank
- Feedback: correct/incorrect with audio/visual cues

### Mode 3: Word Builder (Creation)

**Goal**: Phonemic awareness and spelling practice

- Pool of letter tiles at bottom
- Drag letters to arrange in word formation area
- Optional: picture clue for target word
- Auto-check or hint system for validation

## Technical Stack

- **Framework**: React Native (Expo for easier development)
- **Audio**: expo-av for sound playback
- **Gestures**: react-native-gesture-handler for touch interactions
- **State**: React hooks + Context API
- **Styling**: Styled Components or NativeWind

## Content Strategy

- **Word Sets**: CVC words (cat, dog, pig) progressing to CVCC/CCVC
- **Themes**: Animals, food, family, colors
- **Customization**: Parent/teacher can add custom words
- **Progress Tracking**: Stars/badges for completed words/modes

## User Experience

- **Intuitive**: Large touch targets, clear audio feedback
- **Engaging**: Smooth animations, positive reinforcement
- **Accessible**: High contrast, adjustable volume
- **Safe**: No ads, no in-app purchases, offline-first

## Development Phases

1. **MVP**: Mode 1 with basic CVC words
2. **Expansion**: Add Mode 2, more word sets
3. **Polish**: Mode 3, progress tracking, custom content
4. **Launch**: App Store submission, user testing

## Success Metrics

- User engagement (session length, return visits)
- Learning outcomes (words mastered per session)
- Parent feedback on ease of use
- App Store ratings/reviews

## Risks & Mitigations

- **Audio quality**: Source high-quality phoneme recordings
- **Gesture accuracy**: Extensive iPad testing for touch precision
- **Learning effectiveness**: Partner with educators for validation
- **Competition**: Differentiate through simplicity and focus
