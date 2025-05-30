import { useState } from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/joy/Button';
import Snackbar from '@mui/joy/Snackbar';
import Sheet from '@mui/joy/Sheet';
import SaveIcon from '@mui/icons-material/Save';
import Typography from '@mui/joy/Typography';

const LOCAL_KEY = 'openai_config';

export default function Settings({ onSaved }) {
  const [apiKey, setApiKey] = useState(() => {
    const config = localStorage.getItem(LOCAL_KEY);
    if (config) {
      try {
        const parsed = JSON.parse(config);
        return parsed.openaiKey || '';
      } catch { }
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
    <Sheet className="step-content">
      <Typography level="h2" sx={{ mb: 2, fontSize: '2.5rem', fontFamily: 'Verdana', fontWeight: 700 }}>Settings</Typography>
      <Typography sx={{ mb: 3, fontSize: '1.5rem', fontFamily: 'Verdana' }}>
        Enter your OpenAI API key below. 
        This key is used to connect to your preferred LLM provider securely and privately; 
        your keys are <strong>never</strong> stored on any server.
        <br /><br/>
        To obtain an OpenAI API key, go to https://platform.openai.com/signup and create a free account. 
        Once logged in, navigate to the API keys section under your account settings to generate a new key.
      </Typography>
      <br/>
      <FormControl sx={{ mb: 2, width: '100%' }}>
        <FormLabel sx={{ fontWeight: 'bold', fontSize: '1.5rem', fontFamily: 'Verdana', mb: 1 }}>OpenAI Key</FormLabel>
        <Textarea
            minRows={4}
            maxRows={8}
            value={apiKey}            
            onChange={e => setApiKey(e.target.value)}
            placeholder="Enter your OpenAI API key"            
            sx={{ width: '100%', fontSize: '1.5rem', fontFamily: 'Verdana', mb: 2 }}
            autoFocus            
        />
        
      </FormControl>
      <Button
        variant="solid"
        color="primary"
        startDecorator={<SaveIcon />}
        onClick={handleSave}
        sx={{ maxWidth: 200, alignSelf: 'flex-start', mb: 2, fontSize: '1.5rem', fontFamily: 'Verdana' }}
      >
        Save
      </Button>
      <Snackbar open={open} autoHideDuration={2000} onClose={() => setOpen(false)}>
        <Sheet sx={{ p: 2, fontSize: '1.5rem', fontFamily: 'Verdana' }}>OpenAI Key saved!</Sheet>
      </Snackbar>
    </Sheet>
  );
}
