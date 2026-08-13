export interface Guard {
  id: string;
  name: string;
  category: string;
  hourlyRate: number;
  yearsOfExperience: number;
  active: boolean;
}

export interface GuardSummary {
  total: number;
  active: number;
  inactive: number;
  averageHourlyRate: number;
  mostExpensive: Guard;
  cheapest: Guard;
  categories: string[];
}

export interface Report {
  generatedAt: string;
  appliedFilter: string | null;
  summary: GuardSummary;
  guards: Guard[];
}