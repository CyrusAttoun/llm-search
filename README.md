# LLM Search

> 🚀 A deployed instance is available at: https://llm-search-ero.pages.dev

LLM Search is a client-side-only web application that allows you to interact with large language models (LLMs) using your own OpenAI API key. The app is designed for privacy and ease of use, utilizing browser local storage, so no keys or queries ever sent to a third-party server. It features a step-by-step onboarding flow, browser integration instructions, and a modern, user-friendly interface.

## Features
- Secure, local storage of your OpenAI API key
- Step-by-step onboarding and settings
- Chat interface for interacting with LLMs
- Browser integration instructions for quick access
- Built with React, Vite, and Material UI Joy

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/)

### Installation
1. Clone this repository:
   ```sh
   git clone <your-repo-url>
   cd llm-search
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Browser Setup Instructions (to use as a search engine)

### Firefox
- Go to `about:config`
- Add a new key for `browser.urlbar.update2.engineAliasRefresh` with the value `true`
- You should now be able to enter your URL details

### Chrome
1. Open **Settings > Search engine > Manage search engines and site search**.
2. Under 'Site search', click "Add" and enter:
   - **Search engine name:** LLM Search
   - **Shortcut:** llm
   - **URL:** https://llm-search-ero.pages.dev?q=%s (or your deployed instance)
3. Save. Now you can search by typing `llm` in the address bar, then a space, then your query.
4. To set as default: Under 'Default search engines', click the three dots next to LLM Search and choose "Make default" (if available in your Chrome version).

### Edge
1. Open Edge's settings.
2. Select **Privacy, search, and services** from the left menu.
3. Scroll down to **Search and services** and choose **Address bar and search**.
4. Click **Manage search engines**.
5. Click **Add** and fill in:
   - **Search engine name:** LLM Search
   - **Shortcut:** llm
   - **URL:** https://llm-search-ero.pages.dev?q=%s (or your deployed instance)
6. Close settings. You can now search by typing `llm` in the address bar, then a space, then your query.

### Safari
- I don't have an apple or iphone, but it's my understanding that Safari does not support custom search engines natively. You can still use this app manually.

## Usage
1. On first launch, follow the onboarding steps:
   - Getting Started
   - Enter your OpenAI API key in Settings
   - (Optional) Set up browser integration
   - Start chatting!
2. Your API key is stored securely in your browser's local storage and never leaves your device.

## Limitations
- Only supports OpenAI-compatible API keys at this time
- No support for other LLM providers
- Safari does not support custom search engines
- No server-side storage or user accounts

## Potential Areas for Improvement
- Note: After developing this project, I discovered [llmchat.co], which is a more feature-rich tool. However, a cursory glance seems to indicate that it does not appear to offer browser search engine integration like LLM Search does.
- Support for additional LLM providers (Anthropic, Google, etc.)
- Enhanced chat features (history, context, etc.)
- Improved browser extension or native integration
- Mobile and accessibility improvements

## License
MIT

---

For more information, see the [Vite documentation](https://vitejs.dev/guide/) and [Material UI Joy](https://mui.com/joy-ui/getting-started/overview/).
