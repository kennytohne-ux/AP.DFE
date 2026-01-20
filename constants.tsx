import { Program, TeamMember, TimelineEvent } from './types';

export const TEAM_MEMBERS: TeamMember[] = [
  { name: "Amina N.", role: "Programs Director", country: "Rwanda" },
  { name: "John K.", role: "Field Coordinator", country: "Kenya" },
  { name: "Grace M.", role: "MHPSS Lead", country: "Uganda" },
  { name: "Pierre L.", role: "Logistics Manager", country: "DRC" },
  { name: "Marie T.", role: "Safe Spaces Coord.", country: "Central African Rep." },
  { name: "Emmanuel B.", role: "Finance Officer", country: "Republic of Congo" },
  { name: "Chantal R.", role: "Health Program Lead", country: "Cameroon" },
  { name: "Samuel O.", role: "Monitoring Officer", country: "Tanzania" },
  { name: "Fatou S.", role: "Communications", country: "Senegal" },
  { name: "Kwame A.", role: "M&E Specialist", country: "Ghana" },
  { name: "Aisha N.", role: "Education Coord.", country: "Nigeria" },
  { name: "Hassan D.", role: "Agriculture Specialist", country: "Mali" },
  { name: "Selam G.", role: "Advocacy Lead", country: "Ethiopia" },
  { name: "Abdi M.", role: "Programs Officer", country: "Somalia" },
  { name: "Ruth K.", role: "Protection Lead", country: "South Sudan" },
  { name: "Omar H.", role: "Operations Manager", country: "Sudan" },
  { name: "Lillian Z.", role: "HR & Training", country: "Zambia" },
  { name: "Temba S.", role: "Legal Advisor", country: "Zimbabwe" },
  { name: "Marta P.", role: "Communities Lead", country: "Mozambique" }
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: "2019",
    title: "Foundation",
    description: "APDFE was founded by two human rights defenders to transform personal experiences of loss into collective healing."
  },
  {
    year: "2020",
    title: "Regional Expansion",
    description: "Operations expanded to DRC and CAR, focusing on trauma-informed interventions."
  },
  {
    year: "2022",
    title: "Global Recognition",
    description: "Received international awards for survivor-led humanitarian leadership."
  },
  {
    year: "2024",
    title: "Scaling Impact",
    description: "Reaching over 50,000 beneficiaries with integrated health and education programs."
  }
];

export const IMPACT_DATA = [
  { year: '2019', beneficiaries: 5000, communities: 12 },
  { year: '2020', beneficiaries: 12000, communities: 28 },
  { year: '2021', beneficiaries: 25000, communities: 45 },
  { year: '2022', beneficiaries: 40000, communities: 82 },
  { year: '2023', beneficiaries: 55000, communities: 115 },
  { year: '2024', beneficiaries: 68000, communities: 142 },
];

export const PROGRAMS_DATA: Program[] = [
  {
    id: "health",
    title: "Health Programs",
    description: "Addressing the severe impact of conflict and poverty on the health of women and girls.",
    fullContent: `In many African countries, ongoing conflict, poverty, and lack of access to basic services have severely impacted the health and well-being of women and girls.`,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
    details: ["Awareness Campaigns", "Mobile Screening", "Group Therapy", "Trauma-Informed Care"]
  },
  {
    id: "economic",
    title: "Youth and Women Economic Empowerment",
    description: "Breaking cycles of dependency through vocational skills and market strength.",
    fullContent: `APDFE’s economic empowerment program equips women and youth with vocational training, entrepreneurship skills, and access to financial literacy.`,
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=2070&auto=format&fit=crop",
    details: ["Vocational Training", "Entrepreneurship Skills", "Financial Literacy", "Cooperative Groups"]
  },
  {
    id: "protection",
    title: "Child Protection and Child Rights Governance",
    description: "Protecting child rights through community mechanisms and safe spaces.",
    fullContent: `APDFE works to protect children and uphold their rights through community-based child protection mechanisms, awareness-raising on Child Rights, and advocacy.`,
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop",
    details: ["Community Mechanisms", "Awareness-Raising", "Child-Friendly Spaces", "Legal Advocacy"]
  },
  {
    id: "environment",
    title: "Environmental Protection",
    description: "Promoting community-led conservation and climate resilience.",
    fullContent: `APDFE’s environmental program raises awareness about climate change, promotes community-led conservation, and integrates green practices.`,
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?q=80&w=2070&auto=format&fit=crop",
    details: ["Climate Awareness", "Community Conservation", "Eco-Initiatives", "Green Jobs"]
  },
  {
    id: "education",
    title: "Education Programs",
    description: "Bridging the gap for out-of-school girls and marginalized women.",
    fullContent: `APDFE’s Education Program seeks to bridge gaps by offering literacy and numeracy programs designed for marginalized women and girls.`,
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop",
    details: ["Literacy and Numeracy", "Life Skills Training", "Scholastic Materials", "Advocacy Campaigns"]
  },
  {
    id: "peace",
    title: "Peace Building and Governance",
    description: "Fostering inclusive dialogue and local leadership for reconciliation.",
    fullContent: `APDFE’s peace-building program promotes inclusive dialogue, local leadership, and civic engagement.`,
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop",
    details: ["Inclusive Dialogue", "Leadership Training", "Peace Committees", "Advocacy Campaigns"]
  }
];
