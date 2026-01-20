
export interface TeamMember {
  name: string;
  role: string;
  country: string;
  profile?: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  quote?: string;
}

export interface Program {
  id: string;
  title: string;
  description: string;
  fullContent: string;
  details: string[];
  image: string;
}

export interface ProjectGoal {
  id: string;
  text: string;
  isCompleted: boolean;
}

export interface Project {
  id: string;
  title: string;
  status: 'In Progress' | 'Completed';
  region: string;
  timeline: string;
  duration: string;
  beneficiaries: string;
  description: string;
  purpose: string;
  field: string;
  progress: number;
  goals: ProjectGoal[];
  targetFunding: number;
  currentFunding: number;
  completedItems: string[];
  missingItems: string[];
  lastUpdated?: string;
  image?: string;
}

export interface NewsUpdate {
  id: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  fullContent?: string;
  image: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  img: string;
}

export interface AppEvent {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  type: 'Mission' | 'Webinar' | 'Fundraiser' | 'Community';
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'helper';
  isValidated: boolean;
  name: string;
  profilePicture?: string;
}

export interface Volunteer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  interests: string[];
}

export interface Donation {
  id: string;
  name: string;
  amount: number;
  date: string;
  projectId?: string;
  source: string;
  status: 'Cleared' | 'Pending' | 'Flagged';
}

export interface Expense {
  id: string;
  category: string;
  amount: number;
  date: string;
  description: string;
  recipient: string;
  status: 'Cleared' | 'Pending';
}
