
import { useState, useEffect, useRef, useMemo, useCallback } from "react";

const PARTS = [
    {
        id: "intro",
        num: "I",
        title: "Introduction to Advanced Search",
        icon: "🔍",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Harness the power of Exa's \"neural search\" to find clean, LLM-ready content from the web.",
            },
            {
                title: "Pre-requisites",
                platform: "both",
                steps: [
                    "Exa API Key (`set -Ux EXA_API_KEY your_key` in fish).",
                    "Exa MCP Server enabled in `settings.json`."
                ],
            },
            {
                title: "The `web_search_exa` Tool",
                platform: "both",
                content: "Perform a standard web search that returns clean text, stripped of ads and tracking.",
                code: { title: "Chat", body: "Use exa to find the latest specs for the RK3528 Android Box." }
            },
            {
                title: "Search Types",
                platform: "both",
                content: "`auto`: Balanced search.\n`fast`: Quick results."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Use Exa when you need *current* information that your model's training data might lack." }
            },
        ],
    },
    {
        id: "coding",
        num: "II",
        title: "Coding & Documentation Search",
        icon: "💻",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Find real-world code examples, API documentation, and solutions from technical sources."
            },
            {
                title: "The `get_code_context_exa` Tool",
                platform: "both",
                content: "Search GitHub, Stack Overflow, and official docs for programming answers.",
                code: { title: "Chat", body: "Find a Python example of using Playwright with MCP." }
            },
            {
                title: "Token Management",
                platform: "both",
                content: "Use the `tokensNum` parameter to control how much context is returned (1000-50000)."
            },
            {
                title: "Sources Covered",
                platform: "both",
                content: "Primarily targets GitHub repositories, Stack Overflow threads, and high-quality technical blogs."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "If you get \"hallucinated\" code from the AI, run a `get_code_context_exa` search to ground it in reality." }
            }
        ]
    },
    {
        id: "specialized",
        num: "III",
        title: "Specialized Domain Search",
        icon: "🎯",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Target specific types of content like personal blogs, research papers, or tweets."
            },
            {
                title: "Research Paper Search",
                platform: "both",
                content: "Find academic content and preprints (e.g., from arXiv).",
                code: { title: "Chat", body: "Use the research-paper-search skill to find studies on RK3528 Linux kernels." }
            },
            {
                title: "Personal Site Search",
                platform: "both",
                content: "Find individual perspectives, portfolios, and niche blog posts.",
                code: { title: "Chat", body: "Use the personal-site-search skill to find hobbyist blogs about Armbian." }
            },
            {
                title: "Social Media Sentiment",
                platform: "both",
                content: "Search Twitter/X for real-time discussions and community opinions."
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "High-signal results that are often buried by SEO spam on standard search engines."
            }
        ]
    },
    {
        id: "business",
        num: "IV",
        title: "Business & Company Research",
        icon: "📈",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Extract business data, news, and industry positions for any company."
            },
            {
                title: "The `company_research_exa` Tool",
                platform: "both",
                content: "Get a comprehensive overview of a company's products and recent activity.",
                code: { title: "Chat", body: "Research the company 'Rockchip' and their latest SOC releases." }
            },
            {
                title: "Competitor Analysis",
                platform: "both",
                content: "Compare multiple companies by running parallel research tasks."
            },
            {
                title: "Financial Reports",
                platform: "both",
                content: "Search for 10-K filings, earnings calls, and quarterly reports."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Use this for market research before starting a new project or investing in a technology stack." }
            }
        ]
    },
    {
        id: "filtering",
        num: "V",
        title: "Advanced Filtering & Crawling",
        icon: "⚙️",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Fine-tune search results using dates, domains, and direct URL crawling."
            },
            {
                title: "Filtering by Domain",
                platform: "both",
                content: "Include or exclude specific websites from your search results."
            },
            {
                title: "Date Range Filtering",
                platform: "both",
                content: "Find only the most recent information (e.g., from the last 24 hours or past year)."
            },
            {
                title: "Direct Page Crawling",
                platform: "both",
                content: "Extract the full text content from a specific, known URL without searching."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Combine domain filters with `get_code_context_exa` to search *only* official documentation sites." }
            }
        ]
    },
    {
        id: "people",
        num: "VI",
        title: "People & Expertise Research",
        icon: "👥",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Identify experts, find professional backgrounds, and locate public bios."
            },
            {
                title: "The `people_search_exa` Tool",
                platform: "both",
                content: "Find LinkedIn profiles and professional mentions across the web.",
                code: { title: "Chat", body: "Find experts on RK35xx kernel development on LinkedIn." }
            },
            {
                title: "Finding Team Members",
                platform: "both",
                content: "Map out the key contributors to an open-source project or company."
            },
            {
                title: "Verifying Expertise",
                platform: "both",
                content: "Cross-reference a name against research papers and technical contributions."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Use this to find potential collaborators or to vet the advice given in technical forums." }
            }
        ]
    },
    {
        id: "orchestration",
        num: "VII",
        title: "Deep Research Orchestration",
        icon: "🤖",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Run long-running AI research agents that search, read, and write reports."
            },
            {
                title: "Starting Deep Research",
                platform: "both",
                content: "Initiate a task that explores a topic exhaustively.",
                code: { title: "Chat", body: "Start a deep research task on the history of single-board computers." }
            },
            {
                title: "Checking Status",
                platform: "both",
                content: "Monitor progress and retrieve the final report once completed."
            },
            {
                title: "Report Formats",
                platform: "both",
                content: "Specify if you want an \"Executive Brief\" or a \"Technical Deep Dive\"."
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "A professional, multi-page Markdown report grounded in dozens of web sources."
            }
        ]
    },
    {
        id: "reference",
        num: "VIII",
        title: "API Reference & FAQ",
        icon: "📚",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Quick lookup for Exa tool signatures and common questions."
            },
            {
                title: "Key Tools",
                platform: "both",
                steps: ["`web_search_exa`", "`get_code_context_exa`", "`company_research_exa`", "`people_search_exa`"]
            },
            {
                title: "Error: \"Invalid API Key\"",
                platform: "both",
                content: "Ensure your Exa key is correctly set in your environment or `settings.json`."
            },
            {
                title: "FAQ: Is it free?",
                platform: "both",
                content: "Exa has a free tier, but heavy usage requires a paid plan. Check your dashboard for limits."
            },
            {
                title: "Final Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Use Exa as the \"eyes\" of your agent to ensure it always has access to the latest global knowledge." }
            }
        ]
    }
];
// FULL RENDERER LOGIC HERE
export default function ExaMCPServerManual() {
    // ...
}
