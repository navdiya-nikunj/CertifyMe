const theme = {
  fonts: {
    fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
    headingFamily: "'Poppins', sans-serif",
    fontSize: "1rem",
    headingSizes: {
      h1: "2.5rem",
      h2: "2rem",
      h3: "1.5rem",
      h4: "1.25rem",
      h5: "1.125rem",
      h6: "1rem"
    }
  },
  light: {
    nav: {
      background: "#ffffff",
      text: "#2c3e50",
      shadow: "0 2px 20px rgba(0, 0, 0, 0.1)"
    },
    colors: {
      // Educational color palette
      primary: "#2c3e50",        // Dark blue-gray (trustworthy, professional)
      secondary: "#3498db",      // Bright blue (education, knowledge)
      accent: "#e74c3c",         // Red accent (important elements)
      success: "#27ae60",        // Green (success, achievement)
      warning: "#f39c12",        // Orange (notifications)
      info: "#34495e",          // Dark gray (information)

      // Background colors
      background: "#ffffff",
      backgroundLight: "#f8f9fa",
      backgroundDark: "#ecf0f1",

      // Text colors
      textPrimary: "#2c3e50",
      textSecondary: "#7f8c8d",
      textLight: "#bdc3c7",
      textWhite: "#ffffff",

      // Educational specific
      academicBlue: "#1e3a8a",   // Deep academic blue
      scholarGreen: "#059669",   // Success/achievement green
      wisdomPurple: "#7c3aed",   // Knowledge/wisdom purple
      certificationGold: "#d97706", // Achievement gold
    },
    gradients: {
      primary: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      secondary: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      hero: "linear-gradient(135deg, #2c3e50 0%, #3498db 100%)",
      card: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
      educational: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%)"
    },
    shadows: {
      small: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
      medium: "0 3px 6px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.12)",
      large: "0 10px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1)",
      card: "0 4px 6px rgba(0, 0, 0, 0.07), 0 1px 3px rgba(0, 0, 0, 0.06)"
    },
    spacing: {
      xs: "0.25rem",
      sm: "0.5rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem",
      xxl: "3rem"
    },
    borderRadius: {
      small: "4px",
      medium: "8px",
      large: "12px",
      xl: "16px"
    },

    // Legacy support (keeping for backward compatibility)
    primary: "#ffffff",
    secondary: "#3498db",
    shadow: "0 4px 6px rgba(0, 0, 0, 0.07)",
    text: "#2c3e50",
    secondaryText: "#ffffff",
    button: "#3498db"
  },
};

export default theme;
