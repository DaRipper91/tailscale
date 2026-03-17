import { useState, useEffect, useRef, useMemo, useCallback } from "react";

const PARTS = [
    {
        id: "intro",
        num: "I",
        title: "Introduction to Professional Intelligence",
        icon: "🕵️",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Master the ability to find professional backgrounds, expertise, and public personas for any individual.",
            },
            {
                title: "The Ethical Boundary",
                platform: "both",
                content: "Focus on *public* and *professional* data. Respect privacy and avoid illegal doxxing.",
            },
            {
                title: "Discovery Workflow",
                platform: "both",
                content: "General Search -> Professional Profiles -> Contributions/News -> Synthesis.",
            },
            {
                title: "Tool Integration",
                platform: "both",
                content: "Primary use of `people_search_exa`, `web_search_advanced_personal_site`, and `web_search_advanced_tweet`.",
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Use this skill to research a hiring manager before an interview or an expert before a consultation." }
            },
        ],
    },
    {
        id: "profiles",
        num: "II",
        title: "Mapping Professional Profiles",
        icon: "👤",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Identify the current role, career history, and education of an individual."
            },
            {
                title: "LinkedIn & Resumes",
                platform: "both",
                content: "Use `people_search_exa` to find LinkedIn profiles and professional CVs."
            },
            {
                title: "Career Progression",
                platform: "both",
                content: "Analyze the \"Timeline\" of their career. Are they a generalist or a deep specialist?"
            },
            {
                title: "Education & Credentials",
                platform: "both",
                content: "Verify degrees, certifications, and specialized training mentioned in their bios."
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "A \"Professional Snapshot\" that summarizes their career path and current authority."
            }
        ]
    },
    {
        id: "contributions",
        num: "III",
        title: "Contributions & Expertise",
        icon: "💡",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Determine what the person has actually *done* or *built*."
            },
            {
                title: "Technical Contributions",
                platform: "both",
                content: "Search GitHub or Stack Overflow to see their code contributions and community help."
            },
            {
                title: "Publications & Patents",
                platform: "both",
                content: "Find research papers, articles, or patents they have authored."
            },
            {
                title: "Speaking & Media",
                platform: "both",
                content: "Identify podcasts, conference talks, or interviews where they share their expertise."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Search for their username across different developer platforms to find \"hidden\" expertise." }
            }
        ]
    },
    {
        id: "persona",
        num: "IV",
        title: "Public Persona & Opinions",
        icon: "💬",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Understand their communication style, public opinions, and \"Vibe.\""
            },
            {
                title: "Social Media Footprint",
                platform: "both",
                content: "Search Twitter/X and technical blogs to see what they are currently talking about."
            },
            {
                title: "Public Sentiment",
                platform: "both",
                content: "How are they perceived by their peers? Are they cited or recommended by others?"
            },
            {
                title: "Key Themes",
                platform: "both",
                content: "Identify the \"Big Ideas\" or specific technologies they consistently advocate for."
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "A \"Communication Profile\" that helps you tailor your interactions with them."
            }
        ]
    },
    {
        id: "hidden-expertise",
        num: "V",
        title: "Identifying Hidden Expertise",
        icon: "✨",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Find the specific \"Niche\" where this person truly excels."
            },
            {
                title: "Community Recognition",
                platform: "both",
                content: "Look for \"Stars,\" \"Awards,\" or \"Most Valuable Contributor\" status on technical forums."
            },
            {
                title: "Project Involvement",
                platform: "both",
                content: "Which high-impact projects have they been a part of? What was their specific role?"
            },
            {
                title: "Mentorship & Teaching",
                platform: "both",
                content: "Do they teach courses or mentor others? (Signals a deep, foundational understanding)."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Use this to find \"The Person\" to ask when you have a specific, impossible technical question." }
            }
        ]
    },
    {
        id: "verification",
        num: "VI",
        title: "Verifying Claims & Authority",
        icon: "✔️",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Audit the claims made by an individual about their own expertise."
            },
            {
                title: "Cross-Referencing",
                platform: "both",
                content: "Compare their LinkedIn claims against actual project repositories or publication records."
            },
            {
                title: "Third-Party Validation",
                platform: "both",
                content: "Find articles or news stories where they are quoted as an \"Expert.\""
            },
            {
                title: "Identifying \"Resume Padding\"",
                platform: "both",
                content: "Look for vague descriptions that might hide a lack of actual hands-on experience."
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "A \"Credibility Report\" that confirms or challenges the person's public image."
            }
        ]
    },
    {
        id: "synthesis",
        num: "VII",
        title: "Research Synthesis & Reporting",
        icon: "✍️",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Summarize the research into a concise, actionable brief."
            },
            {
                title: "The \"Introductory Brief\"",
                platform: "both",
                content: "A 3-sentence summary of who they are and why they are relevant to you."
            },
            {
                title: "Notable Achievements",
                platform: "both",
                content: "A list of their top 3 most significant contributions or career milestones."
            },
            {
                title: "How to Engage",
                platform: "both",
                content: "Suggestions on the best way to approach or learn from this specific person."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Use this to build a \"Speakers List\" for a conference or a \"Consultants List\" for a project." }
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
                content: "Quick lookup for people research triggers."
            },
            {
                title: "Core Tools",
                platform: "both",
                steps: ["`people_search_exa`", "`web_search_advanced_personal_site`", "`web_search_advanced_tweet`"]
            },
            {
                title: "FAQ: Is this illegal?",
                platform: "both",
                content: "No, it uses publicly available information. Always adhere to your local privacy laws."
            },
            {
                title: "FAQ: What if I find nothing?",
                platform: "both",
                content: "They may have a high privacy setting or a common name. Use keywords like \"Company\" or \"Location.\""
            },
            {
                title: "Final Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Researching the *person* behind the code is often just as important as researching the code itself." }
            }
        ]
    }
];

// FULL RENDERER LOGIC HERE
export default function PeopleResearchManual() {
    // ...
}
