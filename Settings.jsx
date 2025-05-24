import React, { useState, useEffect } from 'react';
import Sheet from '@mui/joy/Sheet';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import FormHelperText from '@mui/joy/FormHelperText';
import Button from '@mui/joy/Button';
import SaveIcon from '@mui/icons-material/Save';
import Snackbar from '@mui/joy/Snackbar';



const LOCAL_KEY = 'openai_config';



export default function SettingsInternal() {
    const [apiKey, setApiKey] = useState('');
    const [open, setOpen] = useState(false);
    useEffect(() => {
        const config = localStorage.getItem(LOCAL_KEY);
        if (config) {
            try {
                const parsed = JSON.parse(config);
                if (parsed.openaiKey) setApiKey(parsed.openaiKey);
            } catch { }
        }
    }, []);

    const handleSave = () => {
        localStorage.setItem(LOCAL_KEY, JSON.stringify({ openaiKey: apiKey }));
        setOpen(true);
        setTimeout(() => {
            setOpen(false);
            navigate('/');
        }, 2000);
    };

    return (
        <Sheet
            sx={{
                flex: 1,
                p: { xs: 2, md: 4 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'left',
                width: '100%'
            }}
        >

            <Typography level="h4" sx={{ mb: 2 }}>Settings</Typography>
            <FormControl sx={{ mb: 2, width: '100%', maxWidth: 320 }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                    <FormLabel sx={{ fontWeight: 'bold', fontSize: 20, mr: 2, minWidth: 120, textAlign: 'left', flexShrink: 0 }}>
                        OpenAI Key
                    </FormLabel>
                    <Input
                        value={apiKey}
                        onChange={e => setApiKey(e.target.value)}
                        placeholder="Enter your OpenAI API key"
                        sx={{ flex: 1, width: '20em' }}
                    />
                </div>
                <FormHelperText>Paste your OpenAI API key here to enable chat features.</FormHelperText>
            </FormControl>

            <Button
                variant="solid"
                color="primary"
                startDecorator={<SaveIcon />}
                onClick={handleSave}
                fullWidth
                sx={{ maxWidth: 200, alignSelf: 'flex-start' }}
            >
                Save
            </Button>
            <Snackbar open={open} autoHideDuration={2000} onClose={() => setOpen(false)}>
                <Sheet sx={{ p: 2 }}>OpenAI Key saved!</Sheet>
            </Snackbar>
        </Sheet>
    )
}


function Instructions() {
    return (
        <Sheet
            sx={{
                flex: 1,
                p: { xs: 2, md: 4 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: { xs: 'flex-start', md: 'center' },
                minWidth: 0,
                borderLeft: { md: '1px solid #eee' },
                borderTop: { xs: '1px solid #eee', md: 'none' },
            }}
        >
            <Typography level="h2" sx={{ mb: 3, textAlign: { xs: 'left', md: 'center' } }}>Welcome!</Typography>
            <Typography level="body-lg" sx={{ mb: 4, textAlign: { xs: 'left', md: 'center' } }}>
                Add this search engine to your browser for instant LLM-powered search.
            </Typography>
            <Sheet variant="soft" sx={{ p: 2, mb: 2, borderRadius: 6, width: '100%' }}>
                <Typography level="h4">Firefox</Typography>
                <Typography level="body-md">Go to <b>Settings &gt; Search &gt; Add search engine</b> and paste the OpenSearch URL from this site. Or, click the search bar dropdown and select "Add “LLM Search”" if prompted.</Typography>
            </Sheet>
            <Sheet variant="soft" sx={{ p: 2, mb: 2, borderRadius: 6, width: '100%' }}>
                <Typography level="h4">Chrome</Typography>
                <Typography level="body-md">Open <b>Settings &gt; Search engine &gt; Manage search engines</b>. Click "Add" and enter the details for LLM Search using the OpenSearch URL provided here.</Typography>
            </Sheet>
            <Sheet variant="soft" sx={{ p: 2, mb: 2, borderRadius: 6, width: '100%' }}>
                <Typography level="h4">Edge</Typography>
                <Typography level="body-md">Go to <b>Settings &gt; Privacy, search, and services &gt; Address bar and search</b>. Click "Manage search engines" and add a new one with the OpenSearch URL from this site.</Typography>
            </Sheet>
            <Sheet variant="soft" sx={{ p: 2, borderRadius: 6, width: '100%' }}>
                <Typography level="h4">Safari</Typography>
                <Typography level="body-md">Safari does not support custom search engines natively. Now is an excellent time to consider a better browser!</Typography>
            </Sheet>
        </Sheet>
    )
}