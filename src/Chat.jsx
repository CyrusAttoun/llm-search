import { useEffect, useRef, useState } from 'react';
import Sheet from '@mui/joy/Sheet';
import { useLocation } from 'react-router-dom';
import Typography from '@mui/joy/Typography';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import ClearIcon from '@mui/icons-material/Clear';
import SendIcon from '@mui/icons-material/Send';
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

function getQueryValue() {
    const params = new URLSearchParams(window.location.search);
    return params.get('q') || '';
}

function Chat() {
    const location = useLocation();    
    const textareaRef = useRef(null);
    const [query, setQuery] = useState(getQueryValue());
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const q = params.get('q') || '';
        setQuery(q);                
    }, [location.search]);

    useEffect(() => {
        const fetchCompletion = async () => {
            if (!query.trim()) {
                setResult("");                
                return;
            }
            const config = localStorage.getItem("openai_config");
            let openaiKey = "";
            if (config) {
                try {
                    openaiKey = JSON.parse(config).openaiKey || "";
                } catch { }
            }
            if (!openaiKey) {
                setResult("No OpenAI API key found. Please set it in Settings.");                
                return;
            }
            setLoading(true);            
            try {
                const chat = new ChatOpenAI({
                    openAIApiKey: openaiKey,
                    modelName: "gpt-4.1",
                });
                const response = await chat.invoke([
                    new HumanMessage(query)
                ]);
                setResult(response.content);
            } catch (err) {
                setResult("Error: " + (err?.message || err?.toString() || "Unknown error"));
            } finally {
                setLoading(false);
            }
        };
        if (query?.trim()) {
            console.log(query);
            fetchCompletion();
        }
        // eslint-disable-next-line
    }, [query]);

    const handleClear = () => {
        setQuery("");        
        setResult("");
        if (textareaRef.current) textareaRef.current.focus();
    };

    const handleChat = () => {
        console.log("handleChat", textareaRef.current);
        setQuery(textareaRef.current.value)        
    };

    const handleKeyDown = e => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleChat();
        }
    };

    return (
        <Sheet className="step-content">
            <Typography level="h2" sx={{ mb: 2, fontSize: '2.5rem', fontFamily: 'Verdana', fontWeight: 700 }}>Chat</Typography>
            <Textarea
                id="query"
                minRows={4}
                maxRows={8}
                onKeyDown={handleKeyDown}
                placeholder="Type your query here..."
                sx={{ width: '100%', fontSize: '1.5rem', fontFamily: 'Verdana', mb: 2 }}
                autoFocus                
                slotProps={{ textarea: { ref: textareaRef } }}
            />
            <Box sx={{ display: 'flex', gap: 2, mb: 2, ml: 'auto' }}>
                <Button variant="outlined" color="neutral" startDecorator={<ClearIcon />} onClick={handleClear} sx={{ fontSize: '1.5rem', fontFamily: 'Verdana' }}>
                    Clear
                </Button>
                <Button variant="solid" color="primary" endDecorator={<SendIcon />} onClick={handleChat} sx={{ fontSize: '1.5rem', fontFamily: 'Verdana' }}>
                    Chat
                </Button>
            </Box>
            {result && (
                <Sheet variant="soft" sx={{ width: '80%', flex: 1, overflowY: 'auto', fontSize: '1.5rem', fontFamily: 'Verdana', display: 'flex', alignItems: 'flex-start', mt: 2 }}>
                    <Typography sx={{ fontSize: '1.5rem', fontFamily: 'Verdana' }}>
                        {loading ? "Loading..." : result || "(No result)"}
                    </Typography>
                </Sheet>
            )}
        </Sheet>
    );
}

export default Chat;
