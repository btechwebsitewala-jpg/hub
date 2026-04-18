import React from 'react';

export const AgilusLogo = ({ className = "w-full h-auto max-h-20" }: { className?: string }) => (
  <svg viewBox="0 0 400 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="100" rx="4" fill="#0b417c" />
    <g transform="translate(80, 10)">
      <text x="70" y="55" fill="white" fontSize="40" fontWeight="bold" fontFamily="sans-serif">agilus</text>
      <g transform="translate(80, 65) scale(0.8)">
        <path d="M 0 0 L 15 15 L 0 30 L 10 30 L 25 15 L 10 0 Z" fill="#e52635" />
        <path d="M 20 0 L 35 15 L 20 30 L 30 30 L 45 15 L 30 0 Z" fill="#ffd100" />
        <path d="M 40 0 L 55 15 L 40 30 L 50 30 L 65 15 L 50 0 Z" fill="#75ba73" />
      </g>
    </g>
  </svg>
);

export const PathKindLogo = ({ className = "w-full h-auto max-h-20" }: { className?: string }) => (
  <svg viewBox="0 0 400 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="100" fill="#003b6e" />
    <g transform="translate(45, 0)">
      <rect x="25" y="25" width="45" height="50" rx="4" fill="#003b6e" stroke="#fcca0e" strokeWidth="4" />
      <rect x="25" y="25" width="40" height="46" rx="4" fill="#fcca0e" />
      <path d="M 32 60 L 32 45 Q 40 38 48 45 M 48 45 L 42 60" stroke="#003b6e" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="43" cy="40" r="3" fill="#003b6e" />
      <path d="M 32 68 L 52 68" stroke="#003b6e" strokeWidth="5" strokeLinecap="round" />

      <text x="85" y="55" fill="#ffffff" fontSize="42" fontWeight="900" fontFamily="Arial, sans-serif" letterSpacing="0">Path Kind</text>
      <text x="85" y="80" fill="#fcca0e" fontSize="22" fontWeight="bold" fontFamily="Arial, sans-serif">Labs</text>

      <g transform="translate(290, 28)">
        <rect x="0" y="0" width="5" height="28" fill="white" />
        <rect x="8" y="0" width="4" height="28" fill="white" />
        <rect x="15" y="0" width="2" height="28" fill="white" />
        <polygon points="20,-5 35,14 20,33" fill="white" />
      </g>
    </g>
  </svg>
);

export const LalPathLabsLogo = ({ className = "w-full h-auto max-h-20" }: { className?: string }) => (
  <svg viewBox="0 0 400 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="10" width="360" height="80" rx="4" fill="#fdc93f" />
    <g transform="translate(50, 15)">
      <path d="M 15 25 Q 25 40 15 55 M 22 25 Q 12 40 22 55 M 15 32 L 22 32 M 16 40 L 21 40 M 15 48 L 22 48" stroke="#cd2027" strokeWidth="3" fill="none" />
      <text x="40" y="48" fill="#123a88" fontSize="26" fontFamily="cursive, sans-serif" fontWeight="bold" fontStyle="italic">Dr Lal PathLabs</text>
    </g>
  </svg>
);

export const ThyrocareLogo = ({ className = "w-full h-auto max-h-20" }: { className?: string }) => (
  <svg viewBox="0 0 400 100" className={className} xmlns="http://www.w3.org/2000/svg" style={{ backgroundColor: 'white' }}>
    <g transform="translate(25, 0)">
      <path d="M 40 20 Q 75 60 40 85 Q 5 60 40 20" fill="none" stroke="#e64a45" strokeWidth="6" />
      <path d="M 30 45 L 45 70" stroke="#2b3952" strokeWidth="8" strokeLinecap="round" />
      <circle cx="28" cy="42" r="5" fill="#2b3952" />
      <path d="M 20 65 L 60 65 A 20 20 0 0 1 20 65 Z" fill="#2b3952" />

      <text x="85" y="55" fill="#2b3952" fontSize="48" fontWeight="900" fontFamily="'Arial Black', Impact, sans-serif" letterSpacing="-1">Thyro</text>
      <text x="235" y="55" fill="#e64a45" fontSize="48" fontWeight="900" fontFamily="'Arial Black', Impact, sans-serif" letterSpacing="-1">care</text>

      <text x="180" y="80" fill="#2b3952" fontSize="18" fontWeight="bold" fontFamily="Arial, sans-serif" textAnchor="middle">Tests you can trust</text>
    </g>
  </svg>
);

export const MetropolisLogo = ({ className = "w-full h-auto max-h-20" }: { className?: string }) => (
  <svg viewBox="0 0 400 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="100" rx="4" fill="#008639" />
    <g transform="translate(60, 5) scale(1.15)">
      <text x="15" y="45" fill="white" fontSize="28" fontWeight="bold" fontFamily="sans-serif" letterSpacing="1">METR</text>
      <text x="130" y="45" fill="white" fontSize="28" fontWeight="bold" fontFamily="sans-serif" letterSpacing="1">POLIS</text>
      <circle cx="112" cy="35" r="14" fill="white" />
      <circle cx="112" cy="35" r="11" fill="#d08f25" />
      <circle cx="109" cy="32" r="3" fill="#fbc343" />
      <text x="35" y="62" fill="#fbf09d" fontSize="12" fontFamily="sans-serif" letterSpacing="0.5">The Pathology Specialist</text>
    </g>
  </svg>
);

export const RedcliffeLogo = ({ className = "w-full h-auto max-h-20" }: { className?: string }) => (
  <svg viewBox="0 0 400 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="100" rx="4" fill="#ffffff" />

    <g transform="translate(60, 0)">
      {/* DNA Helix */}
      <g transform="translate(15, 10) scale(0.65)">
        <path d="M 40 10 Q 75 35 40 65 T 40 120" fill="none" stroke="#114264" strokeWidth="3" />
        <path d="M 70 10 Q 35 35 70 65 T 70 120" fill="none" stroke="#db1c46" strokeWidth="3" />

        {/* Connectors & Nodes */}
        <line x1="40" y1="10" x2="70" y2="10" stroke="#114264" strokeWidth="2" />
        <circle cx="38" cy="10" r="5" fill="#db1c46" />
        <circle cx="72" cy="10" r="5" fill="#114264" />

        <line x1="45" y1="20" x2="65" y2="20" stroke="#114264" strokeWidth="2" />
        <circle cx="45" cy="20" r="4" fill="#db1c46" />
        <circle cx="65" cy="20" r="4" fill="#114264" />

        <line x1="52" y1="30" x2="58" y2="30" stroke="#114264" strokeWidth="2" />
        <circle cx="50" cy="30" r="3" fill="#db1c46" />
        <circle cx="60" cy="30" r="3" fill="#114264" />

        <line x1="45" y1="50" x2="65" y2="50" stroke="#114264" strokeWidth="2" />
        <circle cx="45" cy="48" r="4" fill="#114264" />
        <circle cx="65" cy="48" r="4" fill="#db1c46" />

        <line x1="38" y1="65" x2="72" y2="65" stroke="#114264" strokeWidth="2" />
        <circle cx="38" cy="65" r="5" fill="#114264" />
        <circle cx="72" cy="65" r="5" fill="#db1c46" />

        <line x1="45" y1="78" x2="65" y2="78" stroke="#114264" strokeWidth="2" />
        <circle cx="45" cy="78" r="4" fill="#114264" />
        <circle cx="65" cy="78" r="4" fill="#db1c46" />

        <line x1="50" y1="90" x2="60" y2="90" stroke="#114264" strokeWidth="2" />
        <circle cx="50" cy="90" r="3" fill="#114264" />
        <circle cx="60" cy="90" r="3" fill="#db1c46" />

        <line x1="45" y1="105" x2="65" y2="105" stroke="#114264" strokeWidth="2" />
        <circle cx="45" cy="105" r="4" fill="#db1c46" />
        <circle cx="65" cy="105" r="4" fill="#114264" />

        <circle cx="38" cy="120" r="5" fill="#db1c46" />
        <circle cx="72" cy="120" r="5" fill="#114264" />
      </g>

      <text x="75" y="46" fill="#114264" fontSize="42" fontWeight="700" fontFamily="'Segoe UI', Roboto, Helvetica, Arial, sans-serif" letterSpacing="-0.5">Redcliffe</text>
      <text x="75" y="85" fill="#db1c46" fontSize="42" fontWeight="700" fontFamily="'Segoe UI', Roboto, Helvetica, Arial, sans-serif" letterSpacing="-0.5">labs</text>
    </g>
  </svg>
);

export const BharatLabLogo = ({ className = "w-full h-auto max-h-20" }: { className?: string }) => (
  <svg viewBox="0 0 500 120" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="500" height="120" rx="8" fill="white" />
    <g transform="translate(10, 10)">
      {/* Molecule/DNA Icon */}
      <g transform="translate(5, 5)">
        {/* Connecting Lines */}
        <line x1="20" y1="15" x2="45" y2="15" stroke="#f47920" strokeWidth="2" opacity="0.6" />
        <line x1="20" y1="15" x2="10" y2="35" stroke="#a8b8c0" strokeWidth="2" opacity="0.6" />
        <line x1="45" y1="15" x2="30" y2="35" stroke="#f47920" strokeWidth="2" opacity="0.6" />
        <line x1="10" y1="35" x2="30" y2="35" stroke="#f47920" strokeWidth="2" opacity="0.6" />
        <line x1="30" y1="35" x2="55" y2="35" stroke="#4d3284" strokeWidth="2" opacity="0.6" />
        <line x1="30" y1="35" x2="20" y2="55" stroke="#f47920" strokeWidth="2" opacity="0.6" />
        <line x1="55" y1="35" x2="40" y2="55" stroke="#4d3284" strokeWidth="2" opacity="0.6" />
        <line x1="20" y1="55" x2="40" y2="55" stroke="#4d3284" strokeWidth="2" opacity="0.6" />
        <line x1="40" y1="55" x2="65" y2="55" stroke="#008a45" strokeWidth="2" opacity="0.6" />
        <line x1="20" y1="55" x2="15" y2="75" stroke="#f47920" strokeWidth="2" opacity="0.6" />
        <line x1="40" y1="55" x2="35" y2="75" stroke="#008a45" strokeWidth="2" opacity="0.6" />
        <line x1="15" y1="75" x2="35" y2="75" stroke="#008a45" strokeWidth="2" opacity="0.6" />
        <line x1="35" y1="75" x2="25" y2="95" stroke="#008a45" strokeWidth="2" opacity="0.6" />

        <circle cx="20" cy="15" r="5" fill="#a8b8c0" />
        <circle cx="45" cy="15" r="5" fill="#f47920" />

        <circle cx="10" cy="35" r="5" fill="#a8b8c0" />
        <circle cx="30" cy="35" r="6" fill="#f47920" />
        <circle cx="55" cy="35" r="6" fill="#4d3284" />

        <circle cx="20" cy="55" r="6" fill="#f47920" />
        <circle cx="40" cy="55" r="7" fill="#4d3284" />
        <circle cx="65" cy="55" r="5" fill="#008a45" />

        <circle cx="15" cy="75" r="7" fill="#f47920" />
        <circle cx="35" cy="75" r="6" fill="#008a45" />

        <circle cx="25" cy="95" r="7" fill="#008a45" />
      </g>

      {/* Text Part */}
      <g transform="translate(85, 25)">
        <text x="0" y="32" fill="#f47920" fontSize="50" fontWeight="900" fontFamily="sans-serif">BHARAT</text>
        <text x="235" y="32" fill="#008a45" fontSize="50" fontWeight="900" fontFamily="sans-serif">LAB</text>
        <text x="235" y="52" fill="#4b6271" fontSize="16" fontWeight="bold" fontFamily="sans-serif" letterSpacing="1">NETWORK</text>
        <text x="135" y="85" fill="#003b8e" fontSize="24" fontStyle="italic" fontWeight="bold" fontFamily="serif" textAnchor="middle">Bharat hai toh Bharosa hai!</text>
      </g>
    </g>
  </svg>
);

export const LabwalaLogo = ({ className = "w-full h-auto max-h-20" }: { className?: string }) => (
  <svg viewBox="0 0 400 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="100" rx="4" fill="#080808" />
    <g transform="translate(45, 0)">
      <text x="110" y="86" fill="#f78c30" fontSize="72" fontFamily="Impact, 'Arial Black', sans-serif" letterSpacing="1" textAnchor="end">LAB</text>
      <path d="M 112 40 L 120 40 L 120 78 A 16 16 0 0 0 152 78 L 152 20 L 165 20" stroke="#cc3e1b" strokeWidth="5.5" fill="none" strokeLinecap="square" strokeLinejoin="miter" />
      <path d="M 122.5 48 C 126 43, 132 45, 136 48 S 145 42, 149.5 48 L 149.5 78 A 13.5 13.5 0 0 1 122.5 78 Z" fill="#f78c30" />
      <circle cx="132" cy="54" r="3.5" fill="#ffffff" />
      <circle cx="142" cy="48" r="4.5" fill="#ffffff" />
      <circle cx="143" cy="64" r="5.5" fill="#ffffff" />
      <circle cx="133" cy="74" r="2.5" fill="#ffffff" />
      <text x="162" y="86" fill="#f78c30" fontSize="72" fontFamily="Impact, 'Arial Black', sans-serif" letterSpacing="1" textAnchor="start">WALA</text>
    </g>
  </svg>
);

export const DefaultLogo = ({ className = "w-full h-auto" }: { className?: string }) => (
  <svg viewBox="0 0 240 80" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="240" height="80" rx="8" fill="#e5e7eb" />
    <text x="120" y="48" fill="#6b7280" fontSize="20" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">Generic Lab</text>
  </svg>
);

export const MateshwariLogo = ({ className = "w-full h-auto max-h-20" }: { className?: string }) => (
  <svg viewBox="0 0 500 120" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="500" height="120" rx="8" fill="white" />
    <g transform="translate(20, 10)">
      <circle cx="45" cy="50" r="40" fill="#cc1f26" />
      <g transform="translate(25, 30) scale(1.2)">
        <path d="M 15 5 L 15 35 M 5 15 L 25 15 M 5 25 L 25 25" stroke="white" strokeWidth="4" />
        <circle cx="15" cy="20" r="10" stroke="white" strokeWidth="3" fill="none" />
      </g>
      <g transform="translate(100, 20)">
        <text x="0" y="35" fill="#cc1f26" fontSize="42" fontWeight="bold" fontFamily="sans-serif">Mateshwari</text>
        <text x="0" y="75" fill="#1e3a8a" fontSize="32" fontWeight="bold" fontFamily="sans-serif">Pathology</text>
      </g>
    </g>
  </svg>
);

export const LabLogos = {
  "Labwala Health Diagnostics": LabwalaLogo,
  "Dr. Lal PathLabs": LalPathLabsLogo,
  "Metropolis Healthcare": MetropolisLogo,
  "Thyrocare": ThyrocareLogo,
  "Pathkind Labs": PathKindLogo,
  "Redcliffe Labs": RedcliffeLogo,
  "Agilus Diagnostics": AgilusLogo,
  "Bharat Lab": BharatLabLogo,
  "Mateshwari Pathology": MateshwariLogo,
  "Other Labs": DefaultLogo,
};

export const LabNameAliases: Record<string, string> = {
  "Dr. Lal Path Lab": "Dr. Lal PathLabs",
  "Metropolis Lab": "Metropolis Healthcare",
  "Thyrocare Lab": "Thyrocare",
  "Pathkind Lab": "Pathkind Labs",
  "Redcliffe Lab": "Redcliffe Labs",
  "Agilus Lab": "Agilus Diagnostics",
};
