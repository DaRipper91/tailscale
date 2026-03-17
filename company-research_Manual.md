# Gemini Skill Manual: company-research
## Format: 8-5-4 Standard

### Chapter 1: Introduction to Corporate Auditing
**1.1 Objective**
Conduct deep, evidence-based research on companies, products, and market positions.

**1.2 The Analyst Mindset**
Look beyond marketing copy. Find financial truths, employee sentiment, and technical debt.

**1.3 Discovery Workflow**
General Profile -> News/Activity -> Financials/SEC -> Competitor Mapping -> SWOT.

**1.4 Tool Integration**
Primary use of `company_research_exa`, `web_search_advanced_financial_report`, and `people_research`.

**1.5 Pro-Tip**
Use this skill to vet a potential employer or to find the "weak spots" of a competitor's product.

---

### Chapter 2: Mapping the Corporate Profile
**2.1 Objective**
Understand the core business model, leadership, and mission of a company.

**2.2 Basic Research**
Use `company_research_exa` to get the industry, size, and primary product line.

**2.3 Leadership & Culture**
Identify the C-suite and use `people_research` to find their backgrounds and philosophies.

**2.4 Mission vs. Reality**
Compare the official "Mission Statement" against recent news and product releases.

**2.5 Expected Outcome**
A "Snapshot" of who the company is and what they are trying to achieve.

---

### Chapter 3: News & Current Activity
**3.1 Objective**
Track recent developments, lawsuits, acquisitions, and PR crises.

**3.2 Real-Time Monitoring**
Search for news from the last 24 hours to 30 days using Exa date filters.

**3.3 Product Launches**
Analyze the reception of their latest releases on tech forums and social media.

**3.4 Legal & Regulatory**
Identify any ongoing lawsuits or regulatory investigations that might impact the company.

**3.5 Pro-Tip**
Search Twitter/X via `web-search-advanced-tweet` to find "leaks" or unannounced feature discussions.

---

### Chapter 4: Financial & Technical Analysis
**4.1 Objective**
Verify the stability and technical capabilities of the organization.

**4.2 Financial Reports**
Search for 10-K and 10-Q filings using the specialized financial search tool.

**4.3 Technical Debt & Stack**
Find job postings to see which technologies they are hiring for (reveals their actual tech stack).

**4.4 Patent Filings**
Search for recent patents to see what technology they are trying to "lock down" for the future.

**4.5 Expected Outcome**
A "hard data" report on the company's financial health and technical direction.

---

### Chapter 5: Competitor Mapping
**5.1 Objective**
Identify who else is in the space and how they compare.

**5.2 Finding Direct Competitors**
Ask the agent to find companies with similar product offerings or target audiences.

**5.3 Feature Comparison**
Map out the features of Company A vs. Company B in a structured table.

**5.4 Market Share Analysis**
Estimate who is leading the market and who is "disrupting" the incumbents.

**5.5 Pro-Tip**
Use "Red Teaming": "If I were the CEO of their competitor, how would I put them out of business?"

---

### Chapter 6: Employee & Expert Sentiment
**6.1 Objective**
Understand the "Internal Truth" of the company via employee feedback and expert opinions.

**6.2 Glassdoor/Reddit Mining**
Search for honest employee reviews about management, pay, and technical culture.

**6.3 Expert Interviews**
Find podcasts or articles where industry experts discuss the company's future.

**6.4 Turnover Analysis**
Are key engineers leaving? Mass departures often signal a deeper problem.

**6.5 Expected Outcome**
A "Culture Report" that reveals the internal stability and morale of the company.

---

### Chapter 7: SWOT & Synthesis
**7.1 Objective**
Synthesize all research into a final, actionable analysis.

**7.2 Strengths (S)**
What do they do better than anyone else? (e.g., Brand, Technology, Supply Chain).

**7.3 Weaknesses (W)**
Where are they vulnerable? (e.g., Bad PR, High Debt, Old Tech Stack).

**7.4 Opportunities & Threats (O/T)**
External factors that could help or hurt the company in the next 12-24 months.

**7.5 Pro-Tip**
Use the `critical-analysis` skill to audit your own research for bias before finalizing.

---

### Chapter 8: Command Reference & FAQ
**8.1 Objective**
Quick lookup for company research tools.

**8.2 Core Tools**
*   `company_research_exa`, `people_search_exa`, `web_search_advanced_financial_report`.

**8.3 FAQ: Can I see private company data?**
No, you only have access to public data. For private companies, focus on news, job posts, and employee reviews.

**8.4 FAQ: How do I handle conflicting info?**
Use `multi-source-investigation` to cross-reference data and find the most reliable source.

**8.5 Final Pro-Tip**
The best research is done by looking for what a company is *not* saying. Look for the "gaps" in their PR.
