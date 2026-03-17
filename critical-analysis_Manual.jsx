import { useState, useEffect, useRef, useMemo, useCallback } from "react";

const PARTS = [
    {
        id: "intro",
        num: "I",
        title: "Introduction to Logical Auditing",
        icon: "🧠",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Master the ability to evaluate claims, detect fallacies, and assess the strength of evidence.",
            },
            {
                title: "The Skeptic Mindset",
                platform: "both",
                content: "Believe nothing without evidence. Question the source, the motive, and the data.",
            },
            {
                title: "The Core Audit",
                platform: "both",
                content: "Identify Claim -> Identify Evidence -> Evaluate Logic -> Assess Conclusion.",
            },
            {
                title: "Tools for Analysis",
                platform: "both",
                content: "Combines `lateral-thinking`, `literature-review`, and deep logical reasoning.",
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Use this skill to audit \"AI Hallucinations\" or biased news articles before acting on them." }
            },
        ],
    },
    {
        id: "fallacies",
        num: "II",
        title: "Identifying Logical Fallacies",
        icon: "🚫",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Detect common errors in reasoning that invalidate an argument."
            },
            {
                title: "Ad Hominem & Straw Man",
                platform: "both",
                content: "Attacking the person instead of the argument, or misrepresenting an opponent's view."
            },
            {
                title: "Slippery Slope & False Dilemma",
                platform: "both",
                content: "Claiming a small step will lead to disaster, or pretending there are only two options."
            },
            {
                title: "Confirmation Bias",
                platform: "both",
                content: "Searching only for data that confirms what you already believe."
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "An \"Error Report\" identifying exactly where an argument's logic breaks down."
            }
        ]
    },
    {
        id: "evidence",
        num: "III",
        title: "Evaluating Evidence Strength",
        icon: "💪",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Distinguish between anecdotes, correlation, and proven causation."
            },
            {
                title: "The Hierarchy of Evidence",
                platform: "both",
                content: "(Weak) Anecdote -> Case Study -> Cohort Study -> Randomized Control Trial -> Systematic Review (Strong)."
            },
            {
                title: "Sample Size & Margin of Error",
                platform: "both",
                content: "Is the data set large enough to be statistically significant?"
            },
            {
                title: "Funding & Bias",
                platform: "both",
                content: "Who paid for the study? Does the author have a financial interest in the outcome?"
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Ask the agent: \"What is the *weakest* piece of evidence in this entire document?\"" }
            }
        ]
    },
    {
        id: "source",
        num: "IV",
        title: "Assessing Source Credibility",
        icon: "📜",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Determine if a source is reliable, expert, and objective."
            },
            {
                title: "Expertise Audit",
                platform: "both",
                content: "Does the author have relevant training or a track record in this specific field?"
            },
            {
                title: "Publication Venue",
                platform: "both",
                content: "Was it published in a peer-reviewed journal or a personal blog?"
            },
            {
                title: "Track Record",
                platform: "both",
                content: "Has this source been consistently accurate or consistently biased in the past?"
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "A \"Trust Score\" for the information based on the quality of its origin."
            }
        ]
    },
    {
        id: "deconstruction",
        num: "V",
        title: "Deconstructing Complex Claims",
        icon: "🧩",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Break down \"Big Ideas\" into smaller, testable sub-claims."
            },
            {
                title: "Identifying Implicit Assumptions",
                platform: "both",
                content: "What is being assumed as \"True\" without being stated?"
            },
            {
                title: "The \"Necessary vs. Sufficient\" Test",
                platform: "both",
                content: "Is a factor required for the outcome, or is it the *only* thing needed?"
            },
            {
                title: "Causal Mapping",
                platform: "both",
                content: "Draw a logical path from the premise to the conclusion. Does it ever skip a step?"
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Use this on your own `plan.md` files to find hidden architectural risks." }
            }
        ]
    },
    {
        id: "stats",
        num: "VI",
        title: "Analyzing Statistical Data",
        icon: "📊",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Detect \"Lying with Statistics\" and misinterpretations of data."
            },
            {
                title: "P-Hacking & Selective Reporting",
                platform: "both",
                content: "Selecting only the data that shows a significant result while hiding the rest."
            },
            {
                title: "Correlation vs. Causation",
                platform: "both",
                content: "Just because A and B happened together doesn't mean A caused B."
            },
            {
                title: "Absolute vs. Relative Risk",
                platform: "both",
                content: "Understand how numbers are presented to sound more or less extreme."
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "A \"Hard Data\" audit that exposes the mathematical reality behind the marketing speak."
            }
        ]
    },
    {
        id: "synthesis",
        num: "VII",
        title: "Synthesizing the Critique",
        icon: "✍️",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Write a balanced, objective evaluation that highlights both strengths and flaws."
            },
            {
                title: "The \"Steel Man\" Argument",
                platform: "both",
                content: "Argue the opponent's case *better* than they did before you tear it down."
            },
            {
                title: "Weighting the Evidence",
                platform: "both",
                content: "Which arguments are central to the conclusion, and which are just \"noise\"?"
            },
            {
                title: "Final Verdict",
                platform: "both",
                content: "State clearly if the conclusion is \"Proven,\" \"Plausible,\" or \"Unfounded.\""
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Use this to review a competitor's product claims and find the \"Truth\" behind the hype." }
            }
        ]
    },
    {
        id: "reference",
        num: "VIII",
        title: "Reference & Checklist",
        icon: "📚",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Quick lookup for critical analysis triggers."
            },
            {
                title: "The \"Red Flag\" List",
                platform: "both",
                content: "Vague language, appeal to emotion, missing data, and circular reasoning."
            },
            {
                title: "FAQ: Is this for politics?",
                platform: "both",
                content: "No. It is for Science, Engineering, Business, and any field where truth matters."
            },
            {
                title: "FAQ: Can I use it on myself?",
                platform: "both",
                content: "Yes. In fact, you *should*. Use it to audit your own beliefs and technical decisions."
            },
            {
                title: "Final Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Critical analysis isn't about being \"negative.\" It's about being \"right.\"" }
            }
        ]
    }
];

// FULL RENDERER LOGIC HERE
export default function CriticalAnalysisManual() {
    // ...
}
