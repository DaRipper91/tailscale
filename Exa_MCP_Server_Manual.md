# Gemini Extension Manual: Exa MCP Server
## Format: 8-5-4 Standard

### Chapter 1: Introduction to Advanced Search
**1.1 Objective**
Harness the power of Exa's "neural search" to find clean, LLM-ready content from the web.

**1.2 Pre-requisites**
*   Exa API Key (`set -Ux EXA_API_KEY your_key` in fish).
*   Exa MCP Server enabled in `settings.json`.

**1.3 The `web_search_exa` Tool**
Perform a standard web search that returns clean text, stripped of ads and tracking.
```bash
# In chat:
Use exa to find the latest specs for the RK3528 Android Box.
```

**1.4 Search Types**
*   `auto`: Balanced search.
*   `fast`: Quick results.

**1.5 Pro-Tip**
Use Exa when you need *current* information that your model's training data might lack.

---

### Chapter 2: Coding & Documentation Search
**2.1 Objective**
Find real-world code examples, API documentation, and solutions from technical sources.

**2.2 The `get_code_context_exa` Tool**
Search GitHub, Stack Overflow, and official docs for programming answers.
```bash
# In chat:
Find a Python example of using Playwright with MCP.
```

**2.3 Token Management**
Use the `tokensNum` parameter to control how much context is returned (1000-50000).

**2.4 Sources Covered**
Primarily targets GitHub repositories, Stack Overflow threads, and high-quality technical blogs.

**2.5 Pro-Tip**
If you get "hallucinated" code from the AI, run a `get_code_context_exa` search to ground it in reality.

---

### Chapter 3: Specialized Domain Search
**3.1 Objective**
Target specific types of content like personal blogs, research papers, or tweets.

**3.2 Research Paper Search**
Find academic content and preprints (e.g., from arXiv).
```bash
Use the research-paper-search skill to find studies on RK3528 Linux kernels.
```

**3.3 Personal Site Search**
Find individual perspectives, portfolios, and niche blog posts.
```bash
Use the personal-site-search skill to find hobbyist blogs about Armbian.
```

**3.4 Social Media Sentiment**
Search Twitter/X for real-time discussions and community opinions.

**3.5 Expected Outcome**
High-signal results that are often buried by SEO spam on standard search engines.

---

### Chapter 4: Business & Company Research
**4.1 Objective**
Extract business data, news, and industry positions for any company.

**4.2 The `company_research_exa` Tool**
Get a comprehensive overview of a company's products and recent activity.
```bash
# In chat:
Research the company 'Rockchip' and their latest SOC releases.
```

**4.3 Competitor Analysis**
Compare multiple companies by running parallel research tasks.

**4.4 Financial Reports**
Search for 10-K filings, earnings calls, and quarterly reports.

**4.5 Pro-Tip**
Use this for market research before starting a new project or investing in a technology stack.

---

### Chapter 5: Advanced Filtering & Crawling
**5.1 Objective**
Fine-tune search results using dates, domains, and direct URL crawling.

**5.2 Filtering by Domain**
Include or exclude specific websites from your search results.

**5.3 Date Range Filtering**
Find only the most recent information (e.g., from the last 24 hours or past year).

**5.4 Direct Page Crawling**
Extract the full text content from a specific, known URL without searching.

**5.5 Pro-Tip**
Combine domain filters with `get_code_context_exa` to search *only* official documentation sites.

---

### Chapter 6: People & Expertise Research
**6.1 Objective**
Identify experts, find professional backgrounds, and locate public bios.

**6.2 The `people_search_exa` Tool**
Find LinkedIn profiles and professional mentions across the web.
```bash
# In chat:
Find experts on RK35xx kernel development on LinkedIn.
```

**6.3 Finding Team Members**
Map out the key contributors to an open-source project or company.

**6.4 Verifying Expertise**
Cross-reference a name against research papers and technical contributions.

**6.5 Pro-Tip**
Use this to find potential collaborators or to vet the advice given in technical forums.

---

### Chapter 7: Deep Research Orchestration
**7.1 Objective**
Run long-running AI research agents that search, read, and write reports.

**7.2 Starting Deep Research**
Initiate a task that explores a topic exhaustively.
```bash
# In chat:
Start a deep research task on the history of single-board computers.
```

**7.3 Checking Status**
Monitor progress and retrieve the final report once completed.

**7.4 Report Formats**
Specify if you want an "Executive Brief" or a "Technical Deep Dive".

**7.5 Expected Outcome**
A professional, multi-page Markdown report grounded in dozens of web sources.

---

### Chapter 8: API Reference & FAQ
**8.1 Objective**
Quick lookup for Exa tool signatures and common questions.

**8.2 Key Tools**
*   `web_search_exa`, `get_code_context_exa`, `company_research_exa`, `people_search_exa`.

**8.3 Error: "Invalid API Key"**
Ensure your Exa key is correctly set in your environment or `settings.json`.

**8.4 FAQ: Is it free?**
Exa has a free tier, but heavy usage requires a paid plan. Check your dashboard for limits.

**8.5 Final Pro-Tip**
Use Exa as the "eyes" of your agent to ensure it always has access to the latest global knowledge.
