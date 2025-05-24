import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import IconButton from '@mui/joy/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Box from '@mui/joy/Box';
import Chat from './Chat';
import GettingStarted from './GettingStarted';
import SettingsPanel from './SettingsPanel';
import BrowserSetup from './BrowserSetup';

const LOCAL_KEY = 'openai_config';

const tabRoutes = ['/getting-started', '/settings', '/browser-setup', '/chat'];

function getInitialTab() {
  const config = localStorage.getItem(LOCAL_KEY);
  try {
    if (config && JSON.parse(config).openaiKey) return 3; // Chat
  } catch {}
  return 0; // GettingStarted
}

function useTabRouting() {
  const navigate = useNavigate();
  const location = useLocation();
  const tabIdx = tabRoutes.findIndex(r => location.pathname.startsWith(r));
  const [tab, setTab] = useState(tabIdx >= 0 ? tabIdx : getInitialTab());

  useEffect(() => {
    if (tabIdx !== tab) setTab(tabIdx >= 0 ? tabIdx : 0);
    // eslint-disable-next-line
  }, [location.pathname]);

  const goTab = idx => {
    setTab(idx);
    navigate(tabRoutes[idx]);
  };

  return { tab, goTab };
}

function AppTabs() {
  const { tab, goTab } = useTabRouting();
  const navigate = useNavigate();

  return (
    <Box sx={{ width: '100vw', minHeight: '100vh', bgcolor: 'background.body' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, pt: 2 }}>
        <IconButton onClick={() => goTab(tab - 1)} disabled={tab === 0} sx={{ alignSelf: 'flex-start' }}>
          <ArrowBackIcon />
        </IconButton>
        <IconButton onClick={() => goTab(tab + 1)} disabled={tab === 3} sx={{ alignSelf: 'flex-end' }}>
          <ArrowForwardIcon />
        </IconButton>
      </Box>
      <Tabs orientation="vertical" value={tab} onChange={(_, v) => goTab(v)} sx={{ display: 'flex', flexDirection: 'row', height: '80vh', mt: 2 }}>
        <TabList sx={{ minWidth: 200, borderRight: '1px solid #eee', bgcolor: 'background.level1' }}>
          <Tab>Getting Started</Tab>
          <Tab>Settings</Tab>
          <Tab>Browser Setup</Tab>
          <Tab>Chat</Tab>
        </TabList>
        <TabPanel value={0} sx={{ flex: 1 }}><GettingStarted /></TabPanel>
        <TabPanel value={1} sx={{ flex: 1 }}><SettingsPanel onSaved={() => goTab(2)} /></TabPanel>
        <TabPanel value={2} sx={{ flex: 1 }}><BrowserSetup /></TabPanel>
        <TabPanel value={3} sx={{ flex: 1 }}><Chat /></TabPanel>
      </Tabs>
    </Box>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<AppTabs />} />
        <Route path="*" element={<Navigate to={tabRoutes[getInitialTab()]} replace />} />
      </Routes>
    </Router>
  );
}
