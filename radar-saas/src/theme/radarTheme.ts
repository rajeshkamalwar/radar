import { createTheme } from "@mui/material/styles";

export const radarTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#7367f0",
      contrastText: "#ffffff"
    },
    secondary: {
      main: "#00bad1"
    },
    success: {
      main: "#28c76f"
    },
    warning: {
      main: "#ff9f43"
    },
    error: {
      main: "#ea5455"
    },
    info: {
      main: "#00cfe8"
    },
    background: {
      default: "#f8f7fa",
      paper: "#ffffff"
    },
    text: {
      primary: "#2f2b3d",
      secondary: "#6f6b7d"
    },
    divider: "rgba(47, 43, 61, 0.12)"
  },
  typography: {
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
    h1: {
      fontWeight: 700
    },
    h2: {
      fontWeight: 700
    },
    h3: {
      fontWeight: 700
    },
    h4: {
      fontWeight: 700
    },
    h5: {
      fontWeight: 700
    },
    h6: {
      fontWeight: 700
    },
    button: {
      textTransform: "none",
      fontWeight: 700
    }
  },
  shape: {
    borderRadius: 8
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 18px rgba(47, 43, 61, 0.08)",
          border: "1px solid rgba(47, 43, 61, 0.08)"
        }
      }
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true
      },
      styleOverrides: {
        root: {
          borderRadius: 8
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 700
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: "#6f6b7d",
          fontWeight: 800,
          textTransform: "uppercase",
          fontSize: "0.75rem"
        }
      }
    }
  }
});
