
import { useState, useEffect, useRef, useMemo, useCallback } from "react";

const PARTS = [
    {
        id: "intro",
        num: "I",
        title: "Introduction to Lateral Reasoning",
        icon: "💡",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Break out of traditional, linear thought patterns to find innovative and non-obvious solutions.",
            },
            {
                title: "What is Lateral Thinking?",
                platform: "both",
                content: "A method for problem-solving by approaching problems from new and unexpected angles.",
            },
            {
                title: "The \"Brain\" of the Skill",
                platform: "both",
                content: "Think like a mix of an inventor, a philosopher, and a high-level systems architect.",
            },
            {
                title: "First-Principles Thinking",
                platform: "both",
                content: "Strip a problem down to its fundamental truths and rebuild from the ground up.",
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Use this skill when you've hit a \"wall\" or when standard solutions are too expensive, slow, or complex." }
            },
        ],
    },
    {
        id: "provocation",
        num: "II",
        title: "The Provocation Technique",
        icon: "💥",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Use \"Impossible\" or \"Absurd\" statements to trigger new ideas."
            },
            {
                title: "Creating a \"Po\" (Provocation)",
                platform: "both",
                content: "Make a deliberately false or extreme statement about the problem.",
                code: { title: "Example", body: `"The car has no wheels." -> Leads to ideas about hovercraft or rails.` }
            },
            {
                title: "Stepping Stones",
                platform: "both",
                content: "Use the provocation as a bridge to a practical, realistic solution."
            },
            {
                title: "Movement over Judgment",
                platform: "both",
                content: "Suspend criticism during the early phase to allow \"crazy\" ideas to flourish."
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "A list of radical alternatives that challenge the status quo of your project."
            }
        ]
    },
    {
        id: "analogies",
        num: "III",
        title: "Cross-Domain Analogies",
        icon: "🌐",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Apply solutions from unrelated fields (e.g., biology, music, architecture) to your problem."
            },
            {
                title: "Finding the Analogy",
                platform: "both",
                content: "Identify the core \"verb\" of your problem (e.g., \"connecting,\" \"filtering,\" \"shielding\")."
            },
            {
                title: "Mapping Solutions",
                platform: "both",
                content: "How does a beehive handle \"filtering\"? How does a symphony handle \"coordination\"?"
            },
            {
                title: "Translation to Project",
                platform: "both",
                content: "Adapt the abstract analogy into a concrete technical implementation."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Ask the agent: \"How would a [Botanist/Pilot/Painter] solve this software bug?\"" }
            }
        ]
    },
    {
        id: "assumptions",
        num: "IV",
        title: "Challenging Assumptions",
        icon: "❓",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Identify and break the \"hidden rules\" that are limiting your options."
            },
            {
                title: "Listing Assumptions",
                platform: "both",
                content: "Write down everything you believe is \"required\" or \"true\" about the task."
            },
            {
                title: "The \"Why?\" Audit",
                platform: "both",
                content: "For every assumption, ask \"Why?\" and \"What if this wasn't true?\""
            },
            {
                title: "Breaking the Constraint",
                platform: "both",
                content: "Imagine a world where that constraint doesn't exist. How would the solution change?"
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "A \"simplified\" version of the problem that is often much easier to solve."
            }
        ]
    },
    {
        id: "random",
        num: "V",
        title: "Random Entry & Stimulation",
        icon: "🎲",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Use random inputs (words, images, concepts) to jump-start the creative process."
            },
            {
                title: "The Random Word Generator",
                platform: "both",
                content: "Pick a word that has nothing to do with your task."
            },
            {
                title: "Forced Connection",
                platform: "both",
                content: "Force a logical link between that random word and your current problem."
            },
            {
                title: "Idea Synthesis",
                platform: "both",
                content: "The resulting \"weird\" connection often reveals a hidden opportunity or new feature."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "If you're stuck on a UI design, pick a random object from your desk and use its shape for inspiration." }
            }
        ]
    },
    {
        id: "reframe",
        num: "VI",
        title: "Reframing the Problem",
        icon: "🔄",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Change how the problem is stated to open up new solution spaces."
            },
            {
                title: "The \"Inverse\" Problem",
                platform: "both",
                content: "Instead of \"How do I get more users?\", ask \"How could I make users hate my product?\""
            },
            {
                title: "Perspective Shifting",
                platform: "both",
                content: "How does a 5-year-old see this? How does a CEO see this? How does the server see this?"
            },
            {
                title: "Expanding the Boundary",
                platform: "both",
                content: "Is the problem actually with the code, or is it a problem with the user's expectations?"
            },
            {
                title: "Expected Outcome",
                platform: "both",
                content: "A new problem statement that points directly toward a more effective solution."
            }
        ]
    },
    {
        id: "systems",
        num: "VII",
        title: "Systems & Synergy",
        icon: "⚙️",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Understand how individual lateral ideas interact within the larger system."
            },
            {
                title: "Identifying Feedback Loops",
                platform: "both",
                content: "Does a lateral solution create a positive or negative loop elsewhere?"
            },
            {
                title: "Emergent Properties",
                platform: "both",
                content: "Can multiple \"small\" lateral changes combine into a massive systemic improvement?"
            },
            {
                title: "Risk Mitigation",
                platform: "both",
                content: "Audit \"crazy\" ideas for unintended consequences before implementation."
            },
            {
                title: "Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Use lateral thinking during the `conductor/tech-stack.md` phase to avoid industry-standard \"traps\"." }
            }
        ]
    },
    {
        id: "reference",
        num: "VIII",
        title: "Workflow Reference & FAQ",
        icon: "📚",
        sections: [
            {
                title: "Objective",
                platform: "both",
                content: "Quick lookup for lateral thinking triggers."
            },
            {
                title: "Core Methods",
                platform: "both",
                steps: ["Provocation", "Analogy", "Assumption Breaking", "Random Entry", "Reframing"]
            },
            {
                title: "FAQ: Is this for coding?",
                platform: "both",
                content: "Yes. It is best for architectural decisions, debugging \"impossible\" bugs, and UI/UX innovation."
            },
            {
                title: "FAQ: When should I NOT use it?",
                platform: "both",
                content: "When you need a quick, standard fix for a known problem. Don't reinvent the wheel if it's already rolling."
            },
            {
                title: "Final Pro-Tip",
                platform: "both",
                callout: { type: "tip", text: "Lateral thinking is a muscle. The more you use it, the easier it becomes to see the \"shortcuts\" others miss." }
            }
        ]
    }
];

// FULL RENDERER LOGIC HERE
export default function LateralThinkingManual() {
    // ...
}
