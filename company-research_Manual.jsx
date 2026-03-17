import { useState, useEffect, useRef, useMemo, useCallback } from "react";

const PARTS = [
    {
        id: "intro",
        num: "I",
        title: "Introduction to Corporate Auditing",
        icon: "🏢",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Conduct deep, evidence-based research on companies, products, and market positions.",
            },
            {
                title: "The Analyst Mindset",
                platform: "both",
                content: "Look beyond marketing copy. Find financial truths, employee sentiment, and technical debt.",
            },
            {
                title: "Discovery Workflow",
                platform: "both",
                content: "General Profile -> News/Activity -> Financials/SEC -> Competitor Mapping -> SWOT.",
            },
            {
                title: "Tool Integration",
                platform: "both",
                content: "Primary use of `company_research_exa`, `web_search_advanced_financial_report`, and `people_research`.",
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Use this skill to vet a potential employer or to find the \"weak spots\" of a competitor's product." }
            },
        ],
    },
    {
        id: "profile",
        num: "II",
        title: "Mapping the Corporate Profile",
        icon: "👤",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Understand the core business model, leadership, and mission of a company."
            },
            {
                title: "Basic Research",
                platform: "both",
                content: "Use `company_research_exa` to get the industry, size, and primary product line."
            },
            {
                title: "Leadership & Culture",
                platform: "both",
                content: "Identify the C-suite and use `people_research` to find their backgrounds and philosophies."
            },
            {
                title: "Mission vs. Reality",
                platform: "both",
                content: "Compare the official \"Mission Statement\" against recent news and product releases."
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "A \"Snapshot\" of who the company is and what they are trying to achieve."
            }
        ]
    },
    {
        id: "news",
        num: "III",
        title: "News & Current Activity",
        icon: "📰",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Track recent developments, lawsuits, acquisitions, and PR crises."
            },
            {
                title: "Real-Time Monitoring",
                platform: "both",
                content: "Search for news from the last 24 hours to 30 days using Exa date filters."
            },
            {
                title: "Product Launches",
                platform: "both",
                content: "Analyze the reception of their latest releases on tech forums and social media."
            },
            {
                title: "Legal & Regulatory",
                platform: "both",
                content: "Identify any ongoing lawsuits or regulatory investigations that might impact the company."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Search Twitter/X via `web-search-advanced-tweet` to find \"leaks\" or unannounced feature discussions." }
            }
        ]
    },
    {
        id: "financials",
        num: "IV",
        title: "Financial & Technical Analysis",
        icon: "💹",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Verify the stability and technical capabilities of the organization."
            },
            {
                title: "Financial Reports",
                platform: "both",
                content: "Search for 10-K and 10-Q filings using the specialized financial search tool."
            },
            {
                title: "Technical Debt & Stack",
                platform: "both",
                content: "Find job postings to see which technologies they are hiring for (reveals their actual tech stack)."
            },
            {
                title: "Patent Filings",
                platform: "both",
                content: "Search for recent patents to see what technology they are trying to \"lock down\" for the future."
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "A \"hard data\" report on the company's financial health and technical direction."
            }
        ]
    },
    {
        id: "competitors",
        num: "V",
        title: "Competitor Mapping",
        icon: "⚔️",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Identify who else is in the space and how they compare."
            },
            {
                title: "Finding Direct Competitors",
                platform: "both",
                content: "Ask the agent to find companies with similar product offerings or target audiences."
            },
            {
                title: "Feature Comparison",
                platform: "both",
                content: "Map out the features of Company A vs. Company B in a structured table."
            },
            {
                title: "Market Share Analysis",
                platform: "both",
                content: "Estimate who is leading the market and who is \"disrupting\" the incumbents."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Use \"Red Teaming\": \"If I were the CEO of their competitor, how would I put them out of business?\"" }
            }
        ]
    },
    {
        id: "sentiment",
        num: "VI",
        title: "Employee & Expert Sentiment",
        icon: "👥",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Understand the \"Internal Truth\" of the company via employee feedback and expert opinions."
            },
            {
                title: "Glassdoor/Reddit Mining",
                platform: "both",
                content: "Search for honest employee reviews about management, pay, and technical culture."
            },
            {
                title: "Expert Interviews",
                platform: "both",
                content: "Find podcasts or articles where industry experts discuss the company's future."
            },
            {
                title: "Turnover Analysis",
                platform: "both",
                content: "Are key engineers leaving? Mass departures often signal a deeper problem."
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "A \"Culture Report\" that reveals the internal stability and morale of the company."
            }
        ]
    },
    {
        id: "swot",
        num: "VII",
        title: "SWOT & Synthesis",
        icon: "🎯",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Synthesize all research into a final, actionable analysis."
            },
            {
                title: "Strengths (S)",
                platform: "both",
                content: "What do they do better than anyone else? (e.g., Brand, Technology, Supply Chain)."
            },
            {
                title: "Weaknesses (W)",
                platform: "both",
                content: "Where are they vulnerable? (e.g., Bad PR, High Debt, Old Tech Stack)."
            },
            {
                title: "Opportunities & Threats (O/T)",
                platform: "both",
                content: "External factors that could help or hurt the company in the next 12-24 months."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Use the `critical-analysis` skill to audit your own research for bias before finalizing." }
            }
        ]
    },
    {
        id: "reference",
        num: "VIII",
        title: "Command Reference & FAQ",
        icon: "📚",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Quick lookup for company research tools."
            },
            {
                title: "Core Tools",
                platform: "both",
                steps: ["`company_research_exa`", "`people_search_exa`", "`web_search_advanced_financial_report`"]
            },
            {
                title: "FAQ: Can I see private company data?",
                platform: "both",
                content: "No, you only have access to public data. For private companies, focus on news, job posts, and employee reviews."
            },
            {
                title: "FAQ: How do I handle conflicting info?",
                platform: "both",
                content: "Use `multi-source-investigation` to cross-reference data and find the most reliable source."
            },
            {
                title: "Final Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "The best research is done by looking for what a company is *not* saying. Look for the \"gaps\" in their PR." }
            }
        ]
    }
];
// FULL RENDERER LOGIC HERE
export default function CompanyResearchManual() {
    // ...
}
