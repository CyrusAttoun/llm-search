import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

export default function GettingStarted() {
  return (
    <Sheet className="step-content">
      <Typography level="h2" sx={{ mb: 2, fontSize: '2.5rem', fontFamily: 'Verdana', fontWeight: 700 }}>Welcome to LLM Search!</Typography>
      <Typography level="body-lg" sx={{ mb: 2, fontSize: '1.5rem', fontFamily: 'Verdana' }}>
        LLM Search is a privacy-focused, lightweight search engine powered by large language models (LLMs). You can configure it as a custom search engine in your browser for instant, AI-powered answers—without compromising your privacy.
      </Typography>
      <Typography level="body-md" sx={{ mb: 2, fontSize: '1.5rem', fontFamily: 'Verdana' }}>
        <b>Setup process:</b> To get started, you’ll need to set up one or more LLM models and supply API keys for them. This enables the app to connect to your preferred LLM provider securely and privately.
      </Typography>
      <Typography level="body-md" sx={{ fontSize: '1.5rem', fontFamily: 'Verdana' }}>
        Use the steps above to proceed through setup and start searching!
      </Typography>
    </Sheet>
  );
}
