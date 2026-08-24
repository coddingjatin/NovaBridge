export type SkillCategory = 'Languages' | 'Frontend' | 'Backend' | 'Database' | 'AI/ML' | 'Tools';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: 'Expert' | 'Advanced' | 'Intermediate' | 'Proficient';
  proofType: 'project' | 'coding' | 'achievement' | 'certification';
  proofTitle: string;
  proofLink?: string;
  verified: boolean;
}

export interface CaseStudy {
  overview: string;
  problemStatement: string;
  architecture: string;
  keyChallenges: string[];
  solution: string;
  codeSnippet?: string;
  metrics: { label: string; value: string }[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  role: string;
  outcomes: string[];
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl: string;
  featured: boolean;
  caseStudy?: CaseStudy;
}

export interface Education {
  id: string;
  degree: string;
  fieldOfStudy: string;
  institution: string;
  location: string;
  startYear: string;
  endYear: string;
  grade: string;
  highlights: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  type: 'Full-time' | 'Internship' | 'Open Source' | 'Freelance';
  description: string[];
  skillsUsed: string[];
}

export interface Course {
  id: string;
  title: string;
  platform: string;
  instructor: string;
  completionDate: string;
  certificateUrl?: string;
  skillsLearned: string[];
  progressPercentage: number;
  gradeOrScore?: string;
  badgeImageUrl?: string;
}

export interface ProfileBadge {
  id: string;
  name: string;
  platform: 'LeetCode' | 'Codeforces' | 'GitHub' | 'HackerRank' | 'CodeChef' | 'NovaBridge';
  rarity: 'Legendary' | 'Gold' | 'Silver' | 'Bronze';
  earnedDate: string;
  description: string;
  iconUrl?: string;
  verified: boolean;
}

export interface LanguageStat {
  name: string;
  percentage: number;
  color: string;
}

export interface GitHubStats {
  username: string;
  publicRepos: number;
  stars: number;
  followers: number;
  following: number;
  topLanguages: LanguageStat[];
  totalContributions: number;
  submissionsCount: number;
  maxStreak: number;
  currentStreak: number;
  activeDays: number;
  lastSynced?: string;
}

export interface LeetCodeStats {
  username: string;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
  acceptanceRate: number;
  totalQuestions: number;
  contestsAttended: number;
  lastSynced?: string;
}

export interface CodeforcesStats {
  handle: string;
  rating: number;
  maxRating: number;
  rank: string;
  maxRank: string;
  totalContests: number;
  solvedCount?: number;
  lastSynced?: string;
}

export interface CodeChefStats {
  handle: string;
  rating: number;
  stars: string;
  globalRank: number;
  contestsAttended: number;
  solvedCount?: number;
  verified: boolean;
}

export interface HackerRankStats {
  handle: string;
  badgesCount: number;
  stars: number;
  solvedCount: number;
  verified: boolean;
}

export interface CodeStudioStats {
  handle: string;
  solvedCount: number;
  rank: string;
  verified: boolean;
}

export interface LinkedInStats {
  url: string;
  followersCount: number;
  connectionsCount: number;
  topSkillEndorsements: string[];
  verified: boolean;
}

export interface CodingHandles {
  github: string;
  leetcode: string;
  codeforces: string;
  codechef: string;
  hackerrank: string;
  codestudio: string;
  devfolio: string;
  linkedin: string;
  portfolio: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  credentialUrl: string;
}

export interface ResearchPublication {
  id: string;
  title: string;
  publisher: string;
  publicationDate: string;
  doi?: string;
  url?: string;
  abstract: string;
}

export interface Achievement {
  id: string;
  title: string;
  organization: string;
  date: string;
  category: 'Hackathon' | 'Competitive Programming' | 'Academic' | 'Open Source';
  description: string;
  rank?: string;
}

export interface UserProfile {
  id: string;
  slug: string;
  fullName: string;
  headline: string;
  photoUrl: string;
  institution: string;
  degree: string;
  graduationYear: string;
  location: string;
  availability: 'Available Immediately' | 'Available in 30 Days' | 'Open to Offers' | 'Not Available';
  email: string;
  phone: string;
  about: string;
  handles: CodingHandles;
  linkedInStats: LinkedInStats;
  codeChefStats: CodeChefStats;
  hackerRankStats: HackerRankStats;
  codeStudioStats: CodeStudioStats;
  skills: Skill[];
  projects: Project[];
  education: Education[];
  experience: Experience[];
  courses: Course[];
  badges: ProfileBadge[];
  certifications: Certification[];
  publications: ResearchPublication[];
  achievements: Achievement[];
  githubStats: GitHubStats;
  leetcodeStats: LeetCodeStats;
  codeforcesStats: CodeforcesStats;
  resumeFileName: string;
  resumeLastUpdated: string;
}

export type AppViewMode = 'student' | 'public' | 'recruiter';

export interface UserAuthSession {
  isAuthenticated: boolean;
  user: {
    name: string;
    email: string;
    avatarUrl: string;
    provider: 'google' | 'email';
  } | null;
}
