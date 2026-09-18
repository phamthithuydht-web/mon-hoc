import React from 'react';
import { useApp } from '../context/AppContext';
import { ActiveTab } from '../types';
import { 
  BookOpen, 
  CheckSquare, 
  Award, 
  BarChart3, 
  Bell, 
  User, 
  ShieldCheck, 
  Home, 
  Tv, 
  RotateCcw,
  Sparkles,
  School
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    profile, 
    presentationMode, 
    togglePresentationMode, 
    resetToDefaults,
    showToast,
    announcements,
    tasks
  } = useApp();

  const pendingTasksCount = tasks.filter(t => t.status !== 'completed').length;
  const unreadAnnouncementsCount = announcements.length;

  const navItems: { id: ActiveTab; label: string; icon: React.FC<{ className?: string }>; badge?: number }[] = [
    { id: 'overview', label: 'Tổng quan', icon: Home },
    { id: 'lessons', label: 'Bài học', icon: BookOpen },
    { id: 'tasks', label: 'Nhiệm vụ', icon: CheckSquare, badge: pendingTasksCount > 0 ? pendingTasksCount : undefined },
    { id: 'quizzes', label: 'Bài tập / Quiz', icon: Award },
    { id: 'progress', label: 'Tiến độ', icon: BarChart3 },
    { id: 'announcements', label: 'Thông báo', icon: Bell, badge: unreadAnnouncementsCount },
    { id: 'profile', label: 'Hồ sơ học sinh', icon: User },
    { id: 'admin', label: 'Quản trị giáo viên', icon: ShieldCheck },
  ];

  const handleResetConfirm = () => {
    if (window.confirm('Bạn có chắc chắn muốn khôi phục lại toàn bộ dữ liệu bài học, nhiệm vụ và quiz về mẫu ban đầu của Cô Phạm Thị Thủy?')) {
      resetToDefaults();
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      {/* Top Banner - School & Teacher Info */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-800 text-white px-4 py-2.5 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* School and Teacher branding */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xs flex items-center justify-center border border-white/20 shadow-inner">
              <School className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                  Trường THPT Vĩnh Cửu
                </span>
                <span className="text-blue-300/60">•</span>
                <span className="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full bg-blue-500/30 text-blue-100 border border-blue-400/30">
                  Môn Tin học 10
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                Hệ thống quản trị học tập Tin học 10
                <span className="text-amber-300 font-semibold">— Cô Phạm Thị Thủy</span>
              </h1>
            </div>
          </div>

          {/* Quick utility actions */}
          <div className="flex items-center space-x-2">
            {/* Projector / Presentation Mode */}
            <button
              onClick={togglePresentationMode}
              title={presentationMode ? 'Tắt chế độ máy chiếu' : 'Bật chế độ máy chiếu (Font chữ lớn)'}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                presentationMode
                  ? 'bg-amber-400 text-slate-900 shadow-md font-semibold ring-2 ring-amber-300'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
              }`}
            >
              <Tv className="w-4 h-4" />
              <span className="hidden sm:inline">
                {presentationMode ? 'Máy chiếu: BẬT' : 'Chế độ máy chiếu'}
              </span>
            </button>

            {/* Reset sample data */}
            <button
              onClick={handleResetConfirm}
              title="Đặt lại dữ liệu mẫu của Cô Thủy"
              className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white/10 hover:bg-red-500/30 hover:border-red-400/40 text-blue-100 border border-white/15 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Khôi phục mẫu</span>
            </button>

            {/* Student badge */}
            <button
              onClick={() => setActiveTab('profile')}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-blue-700/60 hover:bg-blue-600/70 text-white text-xs font-medium border border-blue-400/30 transition-all cursor-pointer"
            >
              <div className="w-5 h-5 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center font-bold text-[11px]">
                {profile.name.charAt(0)}
              </div>
              <span className="max-w-[110px] truncate">{profile.name}</span>
              <span className="text-blue-200 font-semibold">({profile.className})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-2 sm:px-6">
        <nav className="flex space-x-1 overflow-x-auto py-2 scrollbar-none" aria-label="Tabs">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const isAdmin = item.id === 'admin';

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`group flex items-center space-x-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? isAdmin 
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'bg-blue-600 text-white shadow-sm'
                    : isAdmin
                      ? 'text-purple-700 hover:bg-purple-50 hover:text-purple-900 font-bold'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                  isActive 
                    ? 'text-white' 
                    : isAdmin ? 'text-purple-600' : 'text-slate-500'
                }`} />
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span className={`inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold rounded-full ${
                    isActive 
                      ? 'bg-white text-blue-700' 
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {item.badge}
                  </span>
                )}
                {isAdmin && !isActive && (
                  <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 font-bold">
                    GV
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Projector Notice Banner if active */}
      {presentationMode && (
        <div className="bg-amber-500 text-slate-950 px-4 py-1.5 text-center text-xs font-bold flex items-center justify-center gap-2 shadow-inner">
          <Sparkles className="w-4 h-4 animate-bounce" />
          <span>Đang bật chế độ trình chiếu trên máy chiếu: Cỡ chữ và nút bấm được phóng to tối ưu cho lớp học THPT Vĩnh Cửu</span>
          <button 
            onClick={togglePresentationMode} 
            className="underline ml-2 hover:text-white cursor-pointer"
          >
            Tắt
          </button>
        </div>
      )}
    </header>
  );
};
