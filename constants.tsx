
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
    title: "Health Program",
    description: "Addressing the severe impact of conflict and poverty on the health of women and girls.",
    fullContent: `In many of African countries, ongoing conflict, poverty, and lack of access to basic services have severely impacted the health and well-being of women and girls. Malnutrition remains a silent emergency in Africa, especially among children under five and pregnant or lactating women. The trauma of endless wars, displacement, and gender-based violence has left deep psychological wounds across the population in many countries especially in Central African Republic (CAR) and Democratic Republic of Congo (DRC).`,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
    details: ["Awareness Campaigns", "Mobile Screening", "Group Therapy", "Trauma-Informed Care"]
  },
  {
    id: "srhr",
    title: "Sexual and Reproductive Health (SRHR)",
    description: "Improving access to accurate information and health services for reproductive rights.",
    fullContent: `Many women and adolescent girls in both urban and rural areas face immense barriers to accessing comprehensive sexual and reproductive health services, including contraception, menstrual hygiene management, maternal care, and safe abortion. APDFE’s SRHR initiative aims to improve access to accurate information, essential health services, and community awareness on reproductive rights. We conduct awareness campaigns, train peer educators, collaborate with local health facilities, and create safe, inclusive spaces for dialogue and counseling.`,
    image: "https://images.unsplash.com/photo-1531123414780-f74242c2b052?q=80&w=2070&auto=format&fit=crop",
    details: ["Contraception Access", "Menstrual Hygiene", "Peer Education", "Dialogue Spaces"]
  },
  {
    id: "malnutrition",
    title: "Malnutrition Support",
    description: "Focused on maternal and child health to break cycles of poor health outcomes.",
    fullContent: `Years of instability, displacement, and weak health systems have led to food insecurity, poor infant feeding practices, and limited access to prenatal care. Acute malnutrition is one of the leading causes of child mortality. APDFE responds through targeted nutrition support programs that promote maternal and child health. We run mobile nutrition screening campaigns, support community-based therapeutic feeding, and provide nutrition education for mothers.`,
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop",
    details: ["Mobile Screening", "Therapeutic Feeding", "Nutrition Education", "Vitamin Supplementation"]
  },
  {
    id: "mhpss",
    title: "Mental Health (MHPSS)",
    description: "Integrating psychological support to promote healing and resilience.",
    fullContent: `Yet mental health services remain scarce almost to none, stigmatized, and often inaccessible, particularly for women, youth, and survivors of violence. APDFE integrates Mental Health and Psycho-social Support (MHPSS) across its programming to promote healing and resilience. We offer group therapy, one-on-one counseling, peer-led support groups, and recreational activities that help individuals rebuild confidence and community ties.`,
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2069&auto=format&fit=crop",
    details: ["Group Therapy", "Individual Counseling", "Peer-led Support", "Trauma-Informed Care"]
  },
  {
    id: "economic",
    title: "Youth and Women Economic Empowerment",
    description: "Breaking cycles of dependency through vocational skills and market strength.",
    fullContent: `In the four countries where APDFE operates, over 70% of the population lives in poverty and formal job opportunities are limited. Empowering women and youth with economic skills is essential for breaking cycles of dependency and marginalization. APDFE’s economic empowerment program equips women and youth with vocational training, entrepreneurship skills, and access to financial literacy. We offer hands-on training in tailoring, agriculture, small-scale trade, and handcrafts.`,
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=2070&auto=format&fit=crop",
    details: ["Vocational Training", "Entrepreneurship Skills", "Financial Literacy", "Cooperative Groups"]
  },
  {
    id: "protection",
    title: "Child Protection & Rights Governance",
    description: "Protecting child rights through community mechanisms and safe spaces.",
    fullContent: `Children in many African countries continue to face violations of their rights, including early marriage, child labor, and abuse. APDFE works to protect children and uphold their rights through community-based child protection mechanisms, awareness-raising on Child Rights, and advocacy. We establish child-friendly spaces where children can learn, play, and express themselves safely. We also advocate for stronger legal protections and involve children in governance processes.`,
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop",
    details: ["Community Mechanisms", "Awareness-Raising", "Child-Friendly Spaces", "Legal Advocacy"]
  },
  {
    id: "environment",
    title: "Environmental Protection",
    description: "Promoting community-led conservation and climate resilience.",
    fullContent: `Environmental degradation, deforestation, and poor waste management are rising threats. Climate change is further exacerbating food insecurity and water scarcity. APDFE’s environmental program raises awareness about climate change, promotes community-led conservation, and integrates green practices. We support women- and youth-led eco-initiatives, such as tree planting, sustainable farming, and recycling projects.`,
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?q=80&w=2070&auto=format&fit=crop",
    details: ["Climate Awareness", "Community Conservation", "Eco-Initiatives", "Green Jobs"]
  },
  {
    id: "education",
    title: "Education Program",
    description: "Bridging the gap for out-of-school girls and marginalized women.",
    fullContent: `Education remains a significant challenge in Central African Republic, DRC, Congo-Brazzaville, and Cameroon. Conflict has led to the destruction of schools and displacement of teachers. APDFE’s Education Program seeks to bridge this gap by offering literacy and numeracy programs designed for marginalized women and girls. We provide foundational skills in reading, writing, and leadership training to help learners gain agency.`,
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop",
    details: ["Literacy and Numeracy", "Life Skills Training", "Scholastic Materials", "Advocacy Campaigns"]
  },
  {
    id: "peace",
    title: "Peace-Building and Governance",
    description: "Fostering inclusive dialogue and local leadership for reconciliation.",
    fullContent: `Decades of armed conflict have undermined trust and social cohesion. Women and youth are often excluded from peace processes, yet they play critical roles in reconciliation. APDFE’s peace-building program promotes inclusive dialogue, local leadership, and civic engagement. We train women and youth in conflict resolution, non-violent communication, and leadership skills, while supporting local peace committees.`,
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop",
    details: ["Inclusive Dialogue", "Leadership Training", "Peace Committees", "Advocacy Campaigns"]
  }
];
