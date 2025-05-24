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
import './App.css';

const LOCAL_KEY = 'openai_config';

const steps = [
  { label: 'Start', icon: <InfoIcon />, route: '/getting-started' },
  { label: 'Settings', icon: <SettingsIcon />, route: '/settings' },
  { label: 'Browser', icon: <BrowserUpdatedIcon />, route: '/browser-setup' },
  { label: 'Chat', icon: <ChatBubbleIcon />, route: '/chat' },
];

function getInitialStep() {
  const config = localStorage.getItem(LOCAL_KEY);
  try {
    if (config && JSON.parse(config).openaiKey) return 3; // Chat
  } catch { }
  return 0; // GettingStarted
}

function useStepRouting() {
  const navigate = useNavigate();
  const location = useLocation();
  const stepIdx = steps.findIndex(s => location.pathname.startsWith(s.route));
  const [step, setStep] = useState(stepIdx >= 0 ? stepIdx : getInitialStep());

  useEffect(() => {
    if (stepIdx !== step) setStep(stepIdx >= 0 ? stepIdx : 0);
    // eslint-disable-next-line
  }, [location.pathname]);

  const goStep = idx => {
    setStep(idx);
    navigate(steps[idx].route);
  };

  return { step, goStep };
}

function Navigation({ step, goStep, steps }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', pt: 4, pb: 4 }}>

      <Stepper orientation="horizontal" sx={{ flex: 0.5, gap: 6 }}>

        {steps.map((s, idx) => (
          <Step orientation="horizontal" key={s.label} active={step === idx} completed={step > idx} onClick={() => goStep(idx)}>
            <StepIndicator
              variant="plain"
              sx={{
                color: step === idx ? '#1976d2' : '#888',
                mb: 1,
                cursor: 'pointer',
                fontSize: '2rem',
                fontWeight: 400,
                height: 1,
                display: 'flex',

                alignItems: 'center',
                "& .icon": {
                  backgroundColor: 'white',
                  height: '100%',
                  width: '100%',
                  px: 1,
                },
                "& .label": {
                  backgroundColor: 'white',
                  height: '100%',
                  pr: 1
                }
              }}
            >
              <Box className="icon">{s.icon}</Box>
              <Box className="label">{s.label}</Box>
            </StepIndicator>

          </Step>
        ))}

      </Stepper>


    </Box>
  );
}

function AppStepper() {
  const { step, goStep } = useStepRouting();

  return (
    <Box sx={{ width: '100vw', minHeight: '100vh', bgcolor: 'background.body', fontFamily: 'Verdana, Geneva, Tahoma, sans-serif' }}>
      <Navigation step={step} goStep={goStep} steps={steps} />
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', width: '100%' }}>
        {step === 0 && <GettingStarted />}
        {step === 1 && <SettingsPanel onSaved={() => goStep(2)} />}
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
        <Route path="*" element={<Navigate to={steps[getInitialStep()].route} replace />} />
      </Routes>
    </Router>
  );
}

