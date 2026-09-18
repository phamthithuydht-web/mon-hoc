import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Toast } from './components/Toast';
import { OverviewView } from './components/OverviewView';
import { LessonsView } from './components/LessonsView';
import { TasksView } from './components/TasksView';
import { QuizView } from './components/QuizView';
import { ProgressView } from './components/ProgressView';
import { AnnouncementsView } from './components/AnnouncementsView';
import { ProfileView } from './components/ProfileView';
import { AdminView } from './components/AdminView';
import { School, Heart, ShieldCheck } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab, presentationMode, setActiveTab } = useApp();

  return (
    <div className={`min-h-screen flex flex-col bg-slate-100/70 text-slate-900 ${presentationMode ? 'projector-mode text-base sm:text-lg' : ''}`}>
      {/* Top Header */}
      <Header />

      {/* Main View Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'overview' && <OverviewView />}
        {activeTab === 'lessons' && <LessonsView />}
        {activeTab === 'tasks' && <TasksView />}
        {activeTab === 'quizzes' && <QuizView />}
        {activeTab === 'progress' && <ProgressView />}
        {activeTab === 'announcements' && <AnnouncementsView />}
        {activeTab === 'profile' && <ProfileView />}
        {activeTab === 'admin' && <AdminView />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 px-4 sm:px-6 mt-12 text-slate-500 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-center md:text-left">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <School className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-slate-800">
                Hệ thống quản trị học tập Tin học 10 — Cô Phạm Thị Thủy
              </p>
              <p className="text-slate-500 text-xs">
                Trường THPT Vĩnh Cửu • Phục vụ học trực tiếp, trình chiếu phòng máy và tự học tại nhà
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-xs font-semibold">
            <button 
              onClick={() => setActiveTab('admin')} 
              className="text-purple-700 hover:text-purple-900 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Góc Cô Thủy (Quản trị)</span>
            </button>
            <span className="text-slate-300">•</span>
            <button 
              onClick={() => setActiveTab('overview')} 
              className="hover:text-blue-600 cursor-pointer"
            >
              Trang tổng quan
            </button>
          </div>
        </div>
      </footer>

      {/* Floating Toast notification */}
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
