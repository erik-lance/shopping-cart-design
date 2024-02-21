import { createTheme } from '@mui/material/styles';


const theme = createTheme({
    typography: {
        fontFamily: [
            'Amazon Ember', 
            'Arial', 
            'sans-serif'
        ].join(','),
        // For "Shopping Cart" set to 'h4' variant
        h4: {
            fontSize: '28px',
            lineHeight: '36px',
        }
    }
});

export default theme;