
import { useState, useEffect, useRef, useMemo, useCallback } from "react";

const PARTS = [
    {
        id: "intro",
        num: "I",
        title: "Introduction to Systematic Reviews",
        icon: "🔬",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Master the art of synthesizing academic papers, identifying research gaps, and tracing the evolution of ideas.",
            },
            {
                title: "The Documentarian Mindset",
                platform: "both",
                content: "Treat every paper as a data point. Look for consensus, contradiction, and experimental rigor.",
            },
            {
                title: "The PRISMA Standard",
                platform: "both",
                content: "Follow the Preferred Reporting Items for Systematic Reviews and Meta-Analyses.",
            },
            {
                title: "Search Strategy",
                platform: "both",
                content: "Use `web-search-advanced-research-paper` to target arXiv, PubMed, and Google Scholar.",
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Use this skill to become an \"instant expert\" on a new scientific or technical field." }
            },
        ],
    },
    {
        id: "question",
        num: "II",
        title: "Defining the Research Question",
        icon: "❓",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Formulate a clear, focused, and answerable research question using the PICO framework."
            },
            {
                title: "PICO Framework",
                platform: "both",
                content: "**P**opulation/Problem. **I**ntervention. **C**omparison. **O**utcome."
            },
            {
                title: "Scope Definition",
                platform: "both",
                content: "Set boundaries on what papers will be included (e.g., \"Only peer-reviewed,\" \"Post-2020\")."
            },
            {
                title: "Preliminary Search",
                platform: "both",
                content: "Perform a quick scan to ensure there is enough existing literature to support the review."
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "A \"Protocol\" document that guides the entire review process to prevent bias."
            }
        ]
    },
    {
        id: "searching",
        num: "III",
        title: "Advanced Literature Searching",
        icon: "🔍",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Locate every relevant paper using systematic keyword and citation mapping."
            },
            {
                title: "Keyword Expansion",
                platform: "both",
                content: "Find synonyms and technical terms used by different research groups for the same topic."
            },
            {
                title: "Citation Snowballing",
                platform: "both",
                content: "Check the \"References\" of a good paper (Backward) and who \"Cited\" it (Forward)."
            },
            {
                title: "Managing Results",
                platform: "both",
                content: "Keep a running list of \"Included\" and \"Excluded\" papers with reasons for each."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Use Exa's `text` filter to find specific results that *must* contain a certain mathematical or technical term." }
            }
        ]
    },
    {
        id: "extraction",
        num: "IV",
        title: "Data Extraction & Quality Appraisal",
        icon: "📊",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Extract relevant data from papers and evaluate their methodological quality."
            },
            {
                title: "The Extraction Table",
                platform: "both",
                content: "Capture: Author, Year, Sample Size, Methodology, Key Findings, and Limitations."
            },
            {
                title: "Risk of Bias (RoB) Assessment",
                platform: "both",
                content: "Identify potential flaws: Small sample sizes, funding conflicts, or lack of controls."
            },
            {
                title: "Comparing Results",
                platform: "both",
                content: "Look for \"Effect Sizes\" or \"Statistically Significant\" differences across studies."
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "A \"Cleaned\" dataset representing the best available evidence on the topic."
            }
        ]
    },
    {
        id: "gaps",
        num: "V",
        title: "Identifying Research Gaps",
        icon: "🧩",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Find what is *not* being talked about or what the current research has failed to solve."
            },
            {
                title: "Theoretical Gaps",
                platform: "both",
                content: "Cases where the existing models cannot explain the observed data."
            },
            {
                title: "Methodological Gaps",
                platform: "both",
                content: "Opportunities to use newer or better tools to re-examine old problems."
            },
            {
                title: "Conflicts in Literature",
                platform: "both",
                content: "Identify areas where Study A and Study B directly contradict each other."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Research gaps are \"Business Opportunities.\" If you find a gap, you've found a place to innovate." }
            }
        ]
    },
    {
        id: "synthesis",
        num: "VI",
        title: "Synthesis & Narrative",
        icon: "✍️",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Merge findings from dozens of studies into a coherent, evidence-based narrative."
            },
            {
                title: "The Thematic Approach",
                platform: "both",
                content: "Group papers by the \"Themes\" or \"Arguments\" they support rather than by author."
            },
            {
                title: "Tracing the Evolution",
                platform: "both",
                content: "Explain how the thinking on this topic has changed over time (Timeline of Ideas)."
            },
            {
                title: "Resolving Contradictions",
                platform: "both",
                content: "Explain *why* different studies might have reached different conclusions."
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "A comprehensive report that summarizes the \"Current State of Knowledge\" on the topic."
            }
        ]
    },
    {
        id: "ethics",
        num: "VII",
        title: "Ethics & Evidence Standards",
        icon: "🛡️",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Ensure your review is objective, transparent, and ethically sound."
            },
            {
                title: "Avoiding Confirmation Bias",
                platform: "both",
                content: "Actively search for \"Null Results\" and papers that challenge your own assumptions."
            },
            {
                title: "Data Privacy",
                platform: "both",
                content: "Ensure that no sensitive or private participant data from the original studies is leaked."
            },
            {
                title: "Citing Everything",
                platform: "both",
                content: "Every claim MUST be linked back to a specific paper and section number."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Use the `peer-review` skill to critique your final report before publishing it." }
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
                content: "Quick lookup for academic research tools."
            },
            {
                title: "Core Tools",
                platform: "both",
                steps: ["`web_search_advanced_research_paper`", "`research_start`", "`critical-analysis`"]
            },
            {
                title: "FAQ: Can it read paywalled papers?",
                platform: "both",
                content: "It can often find preprints (arXiv) or summaries. For full PDFs, you may need to provide them."
            },
            {
                title: "FAQ: Is this only for science?",
                platform: "both",
                content: "No. Use it for Engineering, Law, History, or any field with a body of written research."
            },
            {
                title: "Final Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "A literature review is the \"Superpower\" of a lifelong learner. Use it to stay ahead of your industry." }
            }
        ]
    }
];

// FULL RENDERER LOGIC HERE
export default function LiteratureReviewManual() {
    // ...
}
