import { useContext } from 'react';

import { Switch } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTheme } from '@mui/material/styles';

import { ThemeContext } from '@/context/themeContext';

interface HeaderProps {
  quote: string;
}

export default function Header(props: HeaderProps) {
  const theme = useTheme();
  const colorMode = useContext(ThemeContext);
  
  const { quote } = props;

  return (
    <header>
      {quote}
      <Switch sx={{
        width: 70,
        height: 39,
        '& .MuiSwitch-switchBase': {
          top: '13px',
          left: '14px',
          width: '25px',
          height: '25px',
          padding: '0',
          backgroundColor: '#fff',
          color: `${theme.palette.text.primary}`,
          '&:hover': {
            backgroundColor: `#f0f0f0`,
          },
          '&.Mui-checked': {
            transform: 'translateX(17px)',
            '&:hover': {
              backgroundColor: `#f0f0f0`,
              boxShadow: `${theme.shadows[1]}`
            },
          },
          
        },
        '& .MuiSvgIcon-root': {
          width: '16px',
          height: '16px'
        },
        '& .MuiSwitch-track': {
          height: '27px',
          borderRadius: '20px',
          opacity: '0.15',
        },
        '& .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track': {
          opacity: '1'
        }
      }} icon={<LightModeIcon />} checkedIcon={<LightModeIcon />}  onChange={colorMode.toggleColorMode} defaultChecked />
    </header>
  );
}