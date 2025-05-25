import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import Stepper from '@mui/joy/Stepper';
import Step from '@mui/joy/Step';
import StepIndicator from '@mui/joy/StepIndicator';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Box from '@mui/joy/Box';
import Chat from './Chat';
import GettingStarted from './GettingStarted';
import SettingsPanel from './Settings';
import BrowserSetup from './BrowserSetup';
import Navigation from './Navigation';
import './App.css';

const LOCAL_KEY = 'openai_config';

const STEPS = [
    { label: 'Start', icon: <InfoIcon />, route: '/getting-started' },
    { label: 'Settings', icon: <SettingsIcon />, route: '/settings' },
    { label: 'Browser', icon: <BrowserUpdatedIcon />, route: '/browser-setup' },
    { label: 'Chat', icon: <ChatBubbleIcon />, route: '/chat' },
];

function getInitialStep() {
    const config = localStorage.getItem(LOCAL_KEY);
    try {
        console.log('config', config)
        if (config && JSON.parse(config).openaiKey) {            
            return 3; // Chat
        }
    } catch { 
        console.log('error');
    }
    return 0; // GettingStarted
}

function AppStepper() {

    const navigate = useNavigate();
    const location = useLocation();
    const stepIdx = STEPS.findIndex(s => location.pathname.startsWith(s.route));
    const [step, setStep] = useState(stepIdx >= 0 ? stepIdx : getInitialStep());

    useEffect(() => {
        if (stepIdx !== step) setStep(stepIdx >= 0 ? stepIdx : 0);
        // eslint-disable-next-line
    }, [location.pathname]);

    useEffect(() => {
        // On mount, if the current path does not match the expected step route, navigate to it
        const expectedRoute = STEPS[step].route;
        if (!location.pathname.startsWith(expectedRoute)) {
            navigate(expectedRoute + location.search, { replace: true });
        }
    }, []); // Only run on mount

    function goStep(idx) {
        setStep(idx);
        navigate(STEPS[idx].route);
    };

    function handleSaved() {
        goStep(2)
    }

    return (
        <Box sx={{ mx: 'auto', minHeight: '100vh', bgcolor: 'background.body', fontFamily: 'Verdana, Geneva, Tahoma, sans-serif' }}>
            <Navigation step={step} goStep={goStep} steps={STEPS} />
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', width: '100%' }}>
                {step === 0 && <GettingStarted />}
                {step === 1 && <SettingsPanel onSaved={handleSaved} />}
                {step === 2 && <BrowserSetup />}
                {step === 3 && <Chat />}
            </Box>
        </Box>
    );
}

export default function App() {
    
    return (
        <Router>
            <Routes>
                <Route path="/*" element={<AppStepper />} />
                <Route path="*" element={<Navigate to={STEPS[getInitialStep()].route} replace />} />
            </Routes>
        </Router>
    );
}

