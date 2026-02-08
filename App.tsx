
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { User, UserRole, PerformanceEntry } from './types';
import PerformanceView from './views/PerformanceView';
import DashboardView from './views/DashboardView';
import CaisseView from './views/CaisseView';
import MessagingView from './views/MessagingView';
import AdminView from './views/AdminView';

// Mock Data
const MOCK_USER: User = {
  id: 'agent-4502',
  nom: 'Dupont',
  prenoms: 'Jean',
  username: 'j.dupont',
  role: UserRole.ADMIN, // Set to ADMIN to see all modules for testing
  team: 'GSM Sud',
  status: 'Actif',
  email: 'j.dupont@gsm-agents.com',
  city: 'OUAGA',
  country: 'Burkina Faso'
};

const MOCK_HISTORY: PerformanceEntry[] = [
  { id: '1', userId: 'agent-4502', date: '24 Mai', caseType: 'MAIL', resolved: 38, unreachable: 2, untreated: 2, total: 42, resolutionRate: 92 },
  { id: '2', userId: 'agent-4502', date: '23 Mai', caseType: 'URGENCE', resolved: 34, unreachable: 1, untreated: 3, total: 38, resolutionRate: 88 },
  { id: '3', userId: 'agent-4502', date: '22 Mai', caseType: 'EXCEL', resolved: 38, unreachable: 4, untreated: 9, total: 51, resolutionRate: 74 },
  { id: '4', userId: 'agent-4502', date: '21 Mai', caseType: 'ACCESS', resolved: 28, unreachable: 7, untreated: 10, total: 45, resolutionRate: 61 },
];

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('stats');
  const [user, setUser] = useState<User | null>(null);

  // Authentication Mock
  useEffect(() => {
    const timer = setTimeout(() => {
      setUser(MOCK_USER);
      setIsLoggedIn(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background-light dark:bg-background-dark p-8 animate-pulse">
        <div className="w-20 h-20 bg-primary/20 rounded-3xl flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-primary text-4xl animate-bounce">trending_up</span>
        </div>
        <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">GSM Performance</h1>
        <div className="w-12 h-1 bg-primary rounded-full mb-2"></div>
        <p className="text-slate-400 font-medium">Initialisation du portail...</p>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'stats':
        return <DashboardView history={MOCK_HISTORY} />;
      case 'performance':
        return <PerformanceView user={user!} history={MOCK_HISTORY} />;
      case 'messages':
        return <MessagingView />;
      case 'caisse':
        return <CaisseView />;
      case 'admin':
        return <AdminView />;
      case 'profile':
        return (
          <div className="p-8 text-center space-y-8 animate-in fade-in duration-500">
             <div className="relative w-32 h-32 mx-auto">
               <img src={`https://picsum.photos/seed/${user?.id}/200/200`} alt="Profile" className="w-full h-full rounded-full object-cover border-4 border-primary shadow-2xl p-1" />
               <div className="absolute bottom-1 right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-background-dark flex items-center justify-center">
                 <span className="material-symbols-outlined text-white text-xs">check</span>
               </div>
             </div>
             
             <div>
               <h2 className="text-2xl font-black">{user?.prenoms} {user?.nom}</h2>
               <p className="text-slate-400 font-medium uppercase tracking-[0.2em] text-[10px] mt-1">{user?.team} • Burkina Faso</p>
               <div className="mt-3 inline-block bg-primary text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                 {user?.role}
               </div>
             </div>
             
             <div className="space-y-3 pt-4">
                <button className="w-full bg-white dark:bg-white/5 p-4 rounded-3xl flex items-center justify-between font-bold border border-slate-100 dark:border-white/5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-slate-400">person</span>
                    <span>Détails personnels</span>
                  </div>
                  <span className="material-symbols-outlined text-slate-300">chevron_right</span>
                </button>
                <button className="w-full bg-white dark:bg-white/5 p-4 rounded-3xl flex items-center justify-between font-bold border border-slate-100 dark:border-white/5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-slate-400">lock</span>
                    <span>Sécurité & Password</span>
                  </div>
                  <span className="material-symbols-outlined text-slate-300">chevron_right</span>
                </button>
                <button className="w-full bg-white dark:bg-white/5 p-4 rounded-3xl flex items-center justify-between font-bold border border-slate-100 dark:border-white/5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-slate-400">notifications</span>
                    <span>Préférences notifications</span>
                  </div>
                  <span className="material-symbols-outlined text-slate-300">chevron_right</span>
                </button>

                <button 
                  onClick={() => setIsLoggedIn(false)}
                  className="w-full bg-slate-900 text-white p-5 rounded-3xl flex items-center justify-center gap-3 font-black mt-8 shadow-xl active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined">logout</span>
                  DÉCONNEXION
                </button>
             </div>
          </div>
        );
      default:
        return <DashboardView history={MOCK_HISTORY} />;
    }
  };

  const getTitle = () => {
    switch(activeTab) {
      case 'stats': return 'Tableau de Bord';
      case 'performance': return 'Saisir Performance';
      case 'messages': return 'Échanges Équipe';
      case 'caisse': return 'Finance & Caisse';
      case 'admin': return 'Administration';
      case 'profile': return 'Mon Profil';
      default: return 'GSM Performance';
    }
  }

  return (
    <Layout 
      title={getTitle()} 
      activeTab={activeTab}
      onTabChange={setActiveTab}
      role={user?.role}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
