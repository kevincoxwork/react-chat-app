import {
    createMuiTheme
} from '@material-ui/core/styles';
export default createMuiTheme({
    typography: {
        useNextVariants: true
    },
    "palette": { "common": { "black": "#000", "white": "#fff" }, "background": { "paper": "#fff", "default": "#fafafa" }, "primary": { "light": "#7986cb", "main": "rgba(5, 56, 107, 1)", "dark": "#303f9f", "contrastText": "#fff" }, "secondary": { "light": "#ff4081", "main": "rgba(92, 219, 149, 1)", "dark": "#c51162", "contrastText": "#fff" }, "error": { "light": "#e57373", "main": "#f44336", "dark": "#d32f2f", "contrastText": "#fff" }, "text": { "primary": "rgba(0, 0, 0, 0.87)", "secondary": "rgba(0, 0, 0, 0.54)", "disabled": "rgba(0, 0, 0, 0.38)", "hint": "rgba(0, 0, 0, 0.38)" } }
});