import Typography from '@mui/material/Typography';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#202020',
      padding: '80px 20px 120px'
    }}>
      <Image
        src="/icons/logo-white.svg"
        width={175}
        height={46}
        style={{
          margin: '0 auto 60px'
        }}
        alt="Footer logo"
      />
      <Typography variant="body2" color="#ffffff" align="center">
      {'©' + new Date().getFullYear()}. All rights reserved
    </Typography>
    </footer>
  );
}