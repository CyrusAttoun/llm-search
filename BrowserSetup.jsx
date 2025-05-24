import React from 'react';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';

export default function BrowserSetup() {
  return (
    <Sheet sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
      <Typography level="h2" sx={{ mb: 3 }}>Browser Setup</Typography>
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
  );
}
