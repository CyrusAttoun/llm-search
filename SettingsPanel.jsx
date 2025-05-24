import React, { useState } from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Snackbar from '@mui/joy/Snackbar';
import Sheet from '@mui/joy/Sheet';
import SaveIcon from '@mui/icons-material/Save';

const LOCAL_KEY = 'openai_config';

export default function Settings({ onSaved }) {
  const [apiKey, setApiKey] = useState(() => {
    const config = localStorage.getItem(LOCAL_KEY);
    if (config) {
      try {
        const parsed = JSON.parse(config);
        return parsed.openaiKey || '';
      } catch {}
    }
    return '';
  });
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify({ openaiKey: apiKey }));
    setOpen(true);
    if (onSaved) onSaved();
  };

  return (
    <Sheet sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
      <FormControl sx={{ mb: 2, width: '100%', maxWidth: 320 }}>
        <FormLabel sx={{ fontWeight: 'bold', fontSize: 20, mb: 1 }}>OpenAI Key</FormLabel>
        <Input
          value={apiKey}
          onChange={e => setApiKey(e.target.value)}
          placeholder="Enter your OpenAI API key"
          sx={{ width: '20em' }}
        />
      </FormControl>
      <Button
        variant="solid"
        color="primary"
        startDecorator={<SaveIcon />}
        onClick={handleSave}
        sx={{ maxWidth: 200, alignSelf: 'flex-start', mb: 2 }}
      >
        Save
      </Button>
      <Snackbar open={open} autoHideDuration={2000} onClose={() => setOpen(false)}>
        <Sheet sx={{ p: 2 }}>OpenAI Key saved!</Sheet>
      </Snackbar>
    </Sheet>
  );
}
