import React, { useEffect, useRef, useState } from 'react';
import IconButton from '@mui/joy/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Input from '@mui/joy/Input';
import Sheet from '@mui/joy/Sheet';
import { useNavigate, useLocation } from 'react-router-dom';

function getQueryValue() {
  const params = new URLSearchParams(window.location.search);
  return params.get('q') || '';
}

function Chat() {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);
  const [query, setQuery] = useState(getQueryValue());

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q') || '';
    setQuery(q);
    if (!q && inputRef.current) {
      inputRef.current.focus();
    }
  }, [location.search]);

  return (
    <Sheet variant="outlined" sx={{ p: 4, maxWidth: 700, mx: 'auto', mt: 8, position: 'relative' }}>
      <IconButton
        aria-label="back"
        onClick={() => navigate('/')}
        sx={{ position: 'absolute', top: 16, left: 16, zIndex: 2, color: '#fff', bgcolor: 'rgba(0,0,0,0.3)', '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' }, fontSize: 32 }}
        size="lg"
      >
        <ArrowBackIcon sx={{ fontSize: 32, color: '#fff' }} />
      </IconButton>
      <IconButton
        aria-label="settings"
        onClick={() => navigate('/settings')}
        sx={{ position: 'absolute', top: 16, right: 16, zIndex: 2, color: '#fff', bgcolor: 'rgba(0,0,0,0.3)', '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' }, fontSize: 48 }}
        size="lg"
      >
        <SettingsIcon sx={{ fontSize: 48, color: '#fff' }} />
      </IconButton>
      <Input
        fullWidth
        size="lg"
        placeholder="type yopur query here..."
        value={query}
        inputRef={inputRef}
        onChange={e => setQuery(e.target.value)}
        sx={{ mt: 8, mb: 2, fontSize: 22, width: '100%' }}
      />
      {/* Chat UI goes here */}
    </Sheet>
  );
}

export default Chat;
