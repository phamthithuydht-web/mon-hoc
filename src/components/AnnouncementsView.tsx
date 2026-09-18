import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Announcement } from '../types';
import { 
  Bell, 
  BookOpen, 
  CheckSquare, 
  Calendar, 
  Award, 
  AlertCircle, 
  ArrowLeft, 
  Pin,
  Filter
} from 'lucide-react';

export const AnnouncementsView: React.FC = () => {
  const { announcements, setActiveTab, presentationMode } = useApp();
  const [filterType, setFilterType] = useState<string>('all');

  const filtered = announcements.filter(a => {
    if (filterType !== 'all' && a.type !== filterType) return false;
    return true;
  });

  const getAnnouncementMeta = (type: Announcement['type']) => {
    switch (type) {
      case 'lesson':
        return { label: 'Bài học mới', bg: 'bg-blue-100 text-blue-800 border-blue-200', icon: BookOpen };
      case 'task':
        return { label: 'Nhiệm vụ mới', bg: 'bg-amber-100 text-amber-800 border-amber-200', icon: CheckSquare };
      case 'reminder':
        return { label: 'Nhắc hạn / Lịch học', bg: 'bg-red-100 text-red-800 border-red-200', icon: AlertCircle };
      case 'result':
      default:
        return { label: 'Thông báo kết quả', bg: 'bg-emerald-100 text-emerald-800 border-emerald-200', icon: Award };
    }
  };

  return (
    <div className={`space-y-6 ${presentationMode ? 'text-lg' : ''}`}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
            <Bell className="w-4 h-4" />
            <span>Bảng tin thông báo • Cô Phạm Thị Thủy</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Thông báo từ giáo viên bộ môn
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Các tin tức, dặn dò bài tập, thông báo bài học mới và kết quả rèn luyện môn Tin học 10.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('overview')}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer self-start md:self-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Về trang tổng quan</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto bg-slate-50/80 p-3 rounded-xl border border-slate-200/80">
        <div className="flex items-center gap-1 text-xs font-bold text-slate-500 mr-2 shrink-0">
          <Filter className="w-3.5 h-3.5" />
          <span>Lọc:</span>
        </div>
        {[
          { id: 'all', label: 'Tất cả thông báo' },
          { id: 'lesson', label: 'Bài học mới' },
          { id: 'task', label: 'Nhiệm vụ mới' },
          { id: 'reminder', label: 'Nhắc hạn' },
          { id: 'result', label: 'Kết quả' },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setFilterType(item.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              filterType === item.id
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-slate-500">
            <Bell className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-bold">Không có thông báo nào trong danh mục này.</p>
          </div>
        ) : (
          filtered.map((item) => {
            const meta = getAnnouncementMeta(item.type);
            const Icon = meta.icon;

            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl border p-5 sm:p-6 transition-all relative ${
                  item.isPinned 
                    ? 'border-amber-300 bg-amber-50/20 shadow-xs' 
                    : 'border-slate-200 hover:border-blue-300 hover:shadow-xs'
                }`}
              >
                {item.isPinned && (
                  <div className="absolute top-5 right-5 text-amber-500 flex items-center gap-1 text-xs font-bold bg-amber-100 px-2 py-0.5 rounded-full">
                    <Pin className="w-3.5 h-3.5 fill-amber-500" />
                    <span>Được ghim</span>
                  </div>
                )}

                <div className="flex items-start gap-3.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${meta.bg}`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0 pr-16 sm:pr-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${meta.bg}`}>
                        {meta.label}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {item.date}
                      </span>
                      <span className="text-xs text-slate-400">• Người gửi: Cô Phạm Thị Thủy</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-sm text-slate-700 mt-2 leading-relaxed whitespace-pre-line">
                      {item.content}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
