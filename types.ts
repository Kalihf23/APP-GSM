
export enum UserRole {
  AGENT = 'agent',
  TACHES = 'tâches',
  CAISSE = 'caisse',
  ADMIN = 'Admin',
  ADMINP = 'AdminP',
  SUPERVISEUR = 'superviseur'
}

export enum CaseType {
  ACCESS = 'ACCESS',
  MAIL = 'MAIL',
  FEEDBACK = 'FEEDBACK',
  EXCEL = 'EXCEL',
  IPAC_REMBOURSEMENT = 'IPAC REMBOURSEMENT',
  URGENCE = 'URGENCE',
  AUTRE = 'AUTRE'
}

export interface User {
  id: string;
  nom: string;
  prenoms: string;
  username: string;
  role: UserRole;
  team: string;
  group?: string;
  status: 'Actif' | 'Inactif' | 'Suspendu';
  email: string;
  city: string;
  country: string;
}

export interface PerformanceEntry {
  id: string;
  userId: string;
  date: string;
  caseType: string;
  resolved: number;
  unreachable: number;
  untreated: number;
  total: number;
  resolutionRate: number;
}

export interface CaisseOperation {
  id: string;
  type: 'Cotisation' | 'Dépense';
  amount: number;
  date: string;
  userId: string;
  agentName: string;
  details: string;
  status: 'à jour' | 'en retard' | 'validé';
}
