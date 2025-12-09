# Sunshine Group Home Website

A senior-friendly website designed specifically for group home residents with large text, simple navigation, and accessibility features.

## Features

### 🌟 Accessibility-First Design
- **Large Text**: Default 20px font size with options for larger text
- **High Contrast Mode**: Toggle for better visibility
- **Keyboard Navigation**: Full keyboard support with visible focus indicators
- **Screen Reader Support**: Proper ARIA labels and announcements
- **Simple Layout**: Clean, uncluttered design with plenty of white space

### 📱 Pages Included

1. **Home (index.html)**
   - Welcome message and dashboard
   - Quick action buttons (time, weather, activities)
   - Next meal and activity information
   - Important notices

2. **Activities (activities.html)**
   - Today's activity schedule
   - Weekly activity overview
   - Activity categories (brain games, physical, creative, social)
   - Participation options

3. **Meals (meals.html)**
   - Daily meal schedule with detailed menus
   - Weekly meal planning
   - Dietary accommodations information
   - Special request options

4. **News (news.html)**
   - Recent announcements and updates
   - Upcoming events timeline
   - Weather forecast
   - Health reminders

5. **Contact (contact.html)**
   - Staff directory with photos and contact information
   - Department listings
   - Facility information and hours
   - Quick contact options

6. **Emergency (emergency.html)**
   - Emergency contact numbers
   - Types of emergencies and appropriate responses
   - Emergency procedures
   - Call button information

### 🎯 Senior-Specific Features

- **Large Buttons**: Easy-to-click buttons with clear labels
- **Simple Navigation**: Consistent navigation across all pages
- **Important Information First**: Emergency and medical information prominently displayed
- **Familiar Icons**: Use of recognizable emojis and symbols
- **Voice Commands**: Basic voice recognition for time and weather (modern browsers)
- **Reduced Motion**: Respects user's motion preferences
- **Print Friendly**: Optimized for printing important information

### 🔧 Technical Features

- **Responsive Design**: Works on tablets, computers, and touch screens
- **Progressive Enhancement**: Works without JavaScript, enhanced with it
- **Local Storage**: Remembers text size and contrast preferences
- **Modal Dialogs**: Large, easy-to-read popup information
- **Time Updates**: Automatic time and date updates
- **Emergency Alerts**: Prominent emergency contact system

## File Structure

```
seniors/
├── index.html          # Home page
├── activities.html     # Activities and events
├── meals.html          # Meal schedules and menus
├── news.html           # News and announcements
├── contact.html        # Staff and contact information
├── emergency.html      # Emergency procedures and contacts
├── styles.css          # Main stylesheet
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Setup Instructions

1. **Local Setup**:
   - Download all files to a folder
   - Open `index.html` in a web browser
   - No server required for basic functionality

2. **Web Server Setup**:
   - Upload all files to your web server
   - Ensure all files are in the same directory
   - Test all links and functionality

## Customization

### Colors and Branding
- Edit the CSS color variables in `styles.css`
- Replace the logo text in each HTML file
- Modify the color scheme to match your facility

### Content Updates
- Update staff information in `contact.html`
- Modify meal schedules in `meals.html`
- Change activity information in `activities.html`
- Update emergency contacts in `emergency.html`

### Accessibility Settings
The website includes several accessibility controls:
- Text size buttons (A, A+, A++)
- High contrast toggle
- Voice command support (compatible browsers)
- Keyboard navigation support

## Browser Compatibility

- **Recommended**: Chrome, Firefox, Safari, Edge (recent versions)
- **Minimum**: Internet Explorer 11 (limited functionality)
- **Touch Devices**: Optimized for tablets and touch screens
- **Screen Readers**: Compatible with JAWS, NVDA, VoiceOver

## Emergency Features

- Large, prominent emergency buttons
- Clear emergency procedures
- Multiple contact methods
- Color-coded emergency types
- 24/7 contact information

## Weather Integration

The weather feature currently shows mock data. To integrate real weather:
1. Sign up for a weather API service
2. Replace the `showWeather()` function in `script.js`
3. Add your API key and location settings

## Meal System Integration

The meal information is currently static. To connect to a meal management system:
1. Create an API endpoint for meal data
2. Modify the `updateNextMeal()` function
3. Add real-time meal updates

## Support and Maintenance

- **Regular Updates**: Review and update content monthly
- **Staff Training**: Ensure staff know how to help residents use the site
- **Feedback Collection**: Regularly ask residents for feedback
- **Testing**: Test with actual users regularly

## License

This project is designed for use in senior care facilities. Feel free to modify and adapt for your specific needs.

## Contact

For questions about implementing or customizing this website for your facility, please consult with your IT support team or web developer.