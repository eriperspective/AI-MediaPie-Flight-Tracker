# Flight Tracker with AI-Powered Gesture Control

Real-time touchless flight booking interface using Google MediaPipe hand tracking. Browser-based computer vision AI running at 30-60 FPS enables gesture-controlled navigation of live flight data. Demonstrates spatial intelligence with hands-free accessibility for inclusive interaction design.

## Features

### AI-Powered Hand Tracking
- Real-time hand landmark detection using MediaPipe Hands
- Processes 21 hand landmarks per frame at 30-60 FPS
- Custom gesture recognition system (peace sign, pointing, fist)
- Visual skeleton overlay showing AI detection in real-time

### Live Flight Data
- Real-time flight information from aviation APIs
- Flight details including airline, departure times, and pricing (USD)
- Interactive map with animated flight routes
- Dynamic flight card display with sorting options

### Accessibility-First Design
- Touchless navigation for users with motor impairments
- No specialized hardware required - works with any webcam
- Hands-free control ideal for users with mobility aids
- Universal design benefits all users

### Winter-Themed UI
- Glassmorphism design with teal color palette
- Animated snowfall effects
- Glowing icons and smooth transitions
- Responsive layout for all screen sizes

## Tech Stack

- **MediaPipe Hands** - Google's computer vision ML model for hand tracking
- **JavaScript (ES6+)** - Core application logic and gesture detection
- **Leaflet.js** - Interactive mapping and route visualization
- **Flight Data API** - Real-time aviation data integration
- **CSS3** - Animations, glassmorphism effects, and responsive design

## How It Works

1. **Camera Access**: Application requests webcam access for hand tracking
2. **AI Processing**: MediaPipe analyzes video frames to detect hand landmarks
3. **Gesture Recognition**: Custom algorithms interpret hand positions as gestures
4. **Action Execution**: Gestures trigger navigation and interaction events
5. **Visual Feedback**: Real-time display of detected gestures and actions

## Gesture Controls

- **Peace Sign** - Scroll down through flight listings
- **Pointing Up** - Scroll up through flight listings
- **Fist** - Pause scrolling

## Installation

1. Clone the repository:
```bash
git clone https://github.com/eriperspective/AI-MediaPie-Flight-Tracker.git
cd AI-MediaPie-Flight-Tracker
```

2. Open `index-final.html` in a modern web browser

3. Allow camera permissions when prompted

4. Start using hand gestures to control the interface

## Browser Requirements

- Modern browser with WebGL support (Chrome, Edge, Firefox, Safari)
- Webcam access
- Hardware acceleration enabled (recommended for optimal performance)

## Use Cases

- **Accessibility**: Hands-free navigation for users with limited mobility
- **Public Kiosks**: Touchless interaction in high-traffic areas
- **Medical Settings**: Control interfaces without physical contact
- **Cold Weather**: Navigate with gloves on when touchscreens don't work
- **Multi-tasking**: Control interface while hands are occupied

## AI/ML Implementation

This project demonstrates practical AI engineering by:
- Integrating pre-trained TensorFlow.js models via MediaPipe
- Combining computer vision with real-world data APIs
- Implementing custom gesture recognition algorithms
- Creating accessible, magical user experiences with AI

## Performance

- Hand tracking runs at 30-60 FPS on modern hardware
- Gesture detection debounced to 300ms for optimal responsiveness
- Lightweight model (complexity: 0) for broader device compatibility
- Efficient frame processing with throttling to prevent overload

## Future Enhancements

- Multi-hand gesture support
- Custom gesture training mode
- Voice feedback integration
- Additional airport support
- Mobile app version
- AR elements overlay

## Acknowledgments

- Google MediaPipe team for the hand tracking model
- Aviation data providers for real-time flight information
- Advent of AI challenge for the inspiration

## Contact

Built by Eri Perspective

Powered by goose by Block and Claude Sonnet 4.5 by Anthropic


**Experience the magic of AI-powered gesture control in your browser!**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
