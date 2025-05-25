import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';

export default function BrowserSetup() {
    return (
        <Sheet className="step-content">
            <Typography level="h2" sx={{ mb: 3, fontSize: '2.5rem', fontFamily: 'Verdana', fontWeight: 700 }}>Browser Setup</Typography>
            <Sheet variant="soft" sx={{ p: 2, mb: 2, borderRadius: 6, width: '100%' }}>
                <Typography level="h4" sx={{ fontSize: '1.5rem', fontFamily: 'Verdana', fontWeight: 700 }}>Firefox</Typography>
                <Typography level="body-md" sx={{ fontSize: '1.5rem', fontFamily: 'Verdana' }}>
                    <del>Go to <b>Settings &gt; Search &gt; Add search engine</b> and paste the OpenSearch URL from this site. Or, click the search bar dropdown and select "Add “LLM Search”" if prompted.</del>
                    <br/><br/>
                    <ol>
                        <li>go to about:config</li>
                        <li>add a new key for  browser.urlbar.update2.engineAliasRefresh with the value true</li>
                        <li>now go into settings/search shortcuts and add a new shortcut for LLM Search:</li>
                            <ul>
                                <li>search engine name: llm-search</li>
                                <li>engine url: https://llm-search-ero.pages.dev?q=%s</li>
                                <li>suggestions: leave blank</li>
                                <li>keyword: llm</li>
                            </ul>
                        <li>once it's in the search engine list, you can drag it to the top of the list to make it the default search engine</li>
                    </ol>
                </Typography>
            </Sheet>
            <Sheet variant="soft" sx={{ p: 2, mb: 2, borderRadius: 6, width: '100%' }}>
                <Typography level="h4" sx={{ fontSize: '1.5rem', fontFamily: 'Verdana', fontWeight: 700 }}>Chrome</Typography>
                <Typography level="body-md" sx={{ fontSize: '1.5rem', fontFamily: 'Verdana' }}>
                    <ol>
                        <li>Open <b>Settings &gt; Search engine &gt; Manage search engines</b>. </li>
                        <li>Click "Add" under 'site search' and enter the details for LLM Search similar to firefox above.</li>
                        <li>you can then search by typing "llm" in the address bar followed by a space and your search term.</li>
                        <li>I don't know how to set it as the default search engine</li>
                    </ol>
                </Typography>
            </Sheet>
            <Sheet variant="soft" sx={{ p: 2, mb: 2, borderRadius: 6, width: '100%' }}>
                <Typography level="h4" sx={{ fontSize: '1.5rem', fontFamily: 'Verdana', fontWeight: 700 }}>Edge</Typography>
                <Typography level="body-md" sx={{ fontSize: '1.5rem', fontFamily: 'Verdana' }}>
                    <ol>
                        <li>Open Edge's settings.</li>
                        <li>Select <b>Privacy, search, and services</b> from the left menu.</li>
                        <li>Scroll down to <b>Search and services</b> and choose <b>Address bar and search</b>.</li>
                        <li>Click <b>Manage search engines</b>.</li>
                        <li>Click <b>Add</b> and fill in:
                            <ul>
                                <li><b>Search engine name:</b> LLM Search</li>
                                <li><b>Shortcut:</b> llm</li>
                                <li><b>URL:</b> https://llm-search-ero.pages.dev?q=%s (or your deployed instance)</li>
                            </ul>
                        </li>
                        <li>Save. You can now search by typing <b>llm</b> in the address bar, then a space, then your query.</li>
                    </ol>
                </Typography>
            </Sheet>
            <Sheet variant="soft" sx={{ p: 2, borderRadius: 6, width: '100%' }}>
                <Typography level="h4" sx={{ fontSize: '1.5rem', fontFamily: 'Verdana', fontWeight: 700 }}>Safari</Typography>
                <Typography level="body-md" sx={{ fontSize: '1.5rem', fontFamily: 'Verdana' }}>Safari does not support custom search engines natively. But you can still use this manually by going to the deployed address</Typography>
            </Sheet>
        </Sheet>
    );
}
