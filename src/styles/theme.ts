import { createTheme } from '@mui/material/styles';


const theme = createTheme({
    typography: {
        fontFamily: [
            'Amazon Ember', 
            'Arial', 
            'sans-serif'
        ].join(','),
    }
});

export default theme;