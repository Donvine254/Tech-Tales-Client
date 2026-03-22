"use client";

import { CheckCircle, Heart, MessageSquare, Shield } from "lucide-react";

const guidelines = [
  {
    icon: Heart,
    title: "Be Respectful",
    description:
      "Treat all members with kindness and welcome diverse perspectives.",
    accentColor: "#534AB7",
    bgColor: "#EEEDFE",
    details: [
      "Use inclusive language that welcomes everyone",
      "Avoid personal attacks or harassment",
      "Respect different opinions and viewpoints",
      "Be patient with newcomers and beginners",
    ],
  },
  {
    icon: MessageSquare,
    title: "Stay On Topic",
    description:
      "Keep discussions relevant to tech, development, and our blog topics.",
    accentColor: "#0F6E56",
    bgColor: "#E1F5EE",
    details: [
      "Post content related to tech or programming",
      "Use appropriate categories and tags",
      "Avoid spam or promotional content",
      "Share valuable insights and experiences",
    ],
  },
  {
    icon: Shield,
    title: "No Harmful Content",
    description:
      "Zero tolerance for content that could harm individuals or the community.",
    accentColor: "#993C1D",
    bgColor: "#FAECE7",
    details: [
      "No hate speech or discrimination",
      "No sharing of malicious code or exploits",
      "No doxxing or sharing personal info",
      "No content promoting illegal activities",
    ],
  },
  {
    icon: CheckCircle,
    title: "Quality Content",
    description:
      "Contribute meaningful content that adds real value to discussions.",
    accentColor: "#3B6D11",
    bgColor: "#EAF3DE",
    details: [
      "Write clear, well-structured posts",
      "Fact-check before sharing information",
      "Credit sources and provide references",
      "Avoid duplicate or low-effort posts",
    ],
  },
];

export default function GuidelinesCards() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8 ">
      <div className="text-center mb-8">
        <h2 className="text-xl md:text-3xl font-bold mb-2">Our Core Values</h2>
        <p className="md:text-lg text-muted-foreground max-w-2xl mx-auto">
          These principles guide everything we do in our community
        </p>
      </div>

      {/* Hint */}
      <p className="text-center text-xs text-muted-foreground mb-6 md:hidden">
        Tap a card to see details
      </p>
      <p className="hidden md:block text-center text-xs text-muted-foreground mb-6">
        Hover a card to see details
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {guidelines.map((g, index) => (
          <div
            key={g.title}
            className="group cursor-pointer"
            style={{ perspective: "1000px", height: "280px" }}>
            {/* Flip inner */}
            <div
              className="relative w-full h-full transition-transform duration-500 ease-in-out"
              style={{
                transformStyle: "preserve-3d",
                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              }}>
              {/* CSS trick: use a peer-hover approach via group */}
              <style>{`
                .group:hover .flip-inner-${index} {
                  transform: rotateY(180deg);
                }
              `}</style>

              <div
                className={`flip-inner-${index} relative w-full h-full`}
                style={{
                  transformStyle: "preserve-3d",
                  transition: "transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
                }}>
                {/* Front */}
                <div
                  className="absolute inset-0 rounded-xl border border-border hover:border-blue-500 bg-accent/50 shadow-sm dark:bg-blue-950/50 flex flex-col items-center justify-center gap-3 p-6"
                  style={{ backfaceVisibility: "hidden" }}>
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: g.bgColor }}>
                    <g.icon
                      className="w-6 h-6"
                      style={{ color: g.accentColor }}
                    />
                  </div>
                  <p className="font-semibold text-center leading-tight">
                    {g.title}
                  </p>
                  <p className="text-muted-foreground text-center leading-relaxed">
                    {g.description}
                  </p>
                </div>

                {/* Back */}
                <div
                  className="absolute inset-0 rounded-xl border border-border text-white bg-blue-500 flex flex-col p-5"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}>
                  <p className="font-semibold mb-3">{g.title}</p>
                  <ul className="space-y-2 flex-1">
                    {g.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2">
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                          style={{ background: g.accentColor }}
                        />
                        <span className="leading-snug">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
