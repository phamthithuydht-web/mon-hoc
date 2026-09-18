import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  BookOpen, 
  CheckSquare, 
  Award, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  AlertCircle,
  Calendar,
  CheckCircle2,
  PlayCircle
} from 'lucide-react';

export const OverviewView: React.FC = () => {
  const { 
    lessons, 
    tasks, 
    quizzes, 
    announcements, 
    profile, 
    setActiveTab, 
    setSelectedLessonId, 
    setSelectedTaskId, 
    setSelectedQuizId,
    updateTaskStatus,
    presentationMode
  } = useApp();

  const completedLessons = lessons.filter(l => l.status === 'completed');
  const inProgressLessons = lessons.filter(l => l.status === 'in_progress');
  const completedTasks = tasks.filter(t => t.status === 'completed');
  const pendingTasks = tasks.filter(t => t.status !== 'completed');

  // Overall progress calculation: weighted average of lessons progress and tasks completed
  const totalLessonsCount = lessons.length || 1;
  const lessonsProgressSum = lessons.reduce((acc, l) => acc + l.progressPercent, 0);
  const averageLessonProgress = Math.round(lessonsProgressSum / totalLessonsCount);

  const tasksProgress = tasks.length ? Math.round((completedTasks.length / tasks.length) * 100) : 0;
  const overallProgress = Math.round((averageLessonProgress * 0.6) + (tasksProgress * 0.4));

  const recentLessons = lessons.slice(0, 3);
  const urgentTasks = tasks
    .filter(t => t.status !== 'completed')
    .sort((a, b) => (a.priority === 'high' ? -1 : 1))
    .slice(0, 3);

  const pinnedAnnouncement = announcements.find(a => a.isPinned) || announcements[0];

  return (
    <div className={`space-y-6 ${presentationMode ? 'text-lg' : ''}`}>
      {/* Welcome Banner Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 via-indigo-700 to-blue-900 text-white p-6 sm:p-8 shadow-md">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-blue-100 text-xs sm:text-sm font-medium backdrop-blur-xs border border-white/20">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Trường THPT Vĩnh Cửu • Lớp 10 Năm học 2026 - 2027</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Chào mừng em <span className="text-amber-300 underline decoration-amber-400/60">{profile.name}</span> ({profile.className})!
          </h2>

          <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
            Chào mừng em đến với <strong>Hệ thống quản trị học tập Tin học 10</strong> của <strong>Cô Phạm Thị Thủy</strong>. Chúc em có những giờ học bổ ích, phát triển tư duy thuật toán và làm chủ công nghệ số.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('lessons')}
              className="inline-flex items-center space-x-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-5 py-2.5 rounded-xl shadow-md transition-all cursor-pointer hover:shadow-lg active:scale-98 text-sm sm:text-base"
            >
              <BookOpen className="w-5 h-5 text-slate-950" />
              <span>Vào học ngay</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('tasks')}
              className="inline-flex items-center space-x-2 bg-white/15 hover:bg-white/25 text-white font-semibold px-4 py-2.5 rounded-xl border border-white/20 backdrop-blur-xs transition-all cursor-pointer active:scale-98 text-sm sm:text-base"
            >
              <CheckSquare className="w-5 h-5 text-blue-200" />
              <span>Xem nhiệm vụ ({pendingTasks.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('quizzes')}
              className="inline-flex items-center space-x-2 bg-white/15 hover:bg-white/25 text-white font-semibold px-4 py-2.5 rounded-xl border border-white/20 backdrop-blur-xs transition-all cursor-pointer active:scale-98 text-sm sm:text-base"
            >
              <Award className="w-5 h-5 text-amber-300" />
              <span>Làm bài Quiz</span>
            </button>
          </div>
        </div>

        {/* Decorative corner element */}
        <div className="absolute -right-8 -bottom-10 opacity-15 pointer-events-none">
          <BookOpen className="w-72 h-72 text-white" />
        </div>
      </div>

      {/* 4 Main Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: Total lessons */}
        <div 
          onClick={() => setActiveTab('lessons')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider">Tổng số bài học</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{lessons.length}</span>
            <span className="text-xs text-slate-500 font-medium">bài / 5 chủ đề</span>
          </div>
          <div className="mt-2 text-xs text-blue-600 font-medium flex items-center gap-1">
            <span>Đang học: {inProgressLessons.length} bài</span>
            <span>•</span>
            <span>Xem chi tiết &rarr;</span>
          </div>
        </div>

        {/* Card 2: Pending Tasks */}
        <div 
          onClick={() => setActiveTab('tasks')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-amber-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider">Nhiệm vụ đang làm</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CheckSquare className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-600">{pendingTasks.length}</span>
            <span className="text-xs text-slate-500 font-medium">cần hoàn thành</span>
          </div>
          <div className="mt-2 text-xs text-amber-700 font-medium flex items-center gap-1">
            <span>{tasks.filter(t => t.priority === 'high' && t.status !== 'completed').length} ưu tiên cao</span>
            <span>•</span>
            <span>Làm ngay &rarr;</span>
          </div>
        </div>

        {/* Card 3: Completed Lessons */}
        <div 
          onClick={() => setActiveTab('lessons')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider">Bài đã hoàn thành</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-600">{completedLessons.length}</span>
            <span className="text-xs text-slate-500 font-medium">/ {lessons.length} bài</span>
          </div>
          <div className="mt-2 text-xs text-emerald-700 font-medium">
            {completedLessons.length === lessons.length ? 'Đã hoàn thành tất cả!' : `Còn ${lessons.length - completedLessons.length} bài chưa xong`}
          </div>
        </div>

        {/* Card 4: Overall Progress */}
        <div 
          onClick={() => setActiveTab('progress')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider">Tiến độ học tập</span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-indigo-600">{overallProgress}%</span>
            <span className="text-xs text-slate-500 font-medium">mục tiêu kỳ 1</span>
          </div>
          <div className="mt-2.5 w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Pinned Teacher Announcement Notice */}
      {pinnedAnnouncement && (
        <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-200 text-amber-900">
                Thông báo từ Cô Phạm Thị Thủy
              </span>
              <span className="text-xs text-amber-800/70 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {pinnedAnnouncement.date}
              </span>
            </div>
            <h3 className="font-bold text-slate-900 text-base">
              {pinnedAnnouncement.title}
            </h3>
            <p className="text-sm text-slate-700 mt-1 leading-relaxed">
              {pinnedAnnouncement.content}
            </p>
          </div>
          <button
            onClick={() => setActiveTab('announcements')}
            className="shrink-0 text-xs font-bold text-amber-900 bg-amber-200/80 hover:bg-amber-300 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            Xem tất cả
          </button>
        </div>
      )}

      {/* Two Column Layout: Recent Lessons & Urgent Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Recent Lessons */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-slate-900 text-lg">Bài học môn Tin học 10</h3>
            </div>
            <button
              onClick={() => setActiveTab('lessons')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
            >
              Xem tất cả ({lessons.length}) &rarr;
            </button>
          </div>

          <div className="mt-4 divide-y divide-slate-100">
            {recentLessons.map((lesson) => {
              const isComp = lesson.status === 'completed';
              const isInProg = lesson.status === 'in_progress';

              return (
                <div key={lesson.id} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3 group">
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-semibold text-slate-500 block mb-0.5">
                      {lesson.topic} • {lesson.duration}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                      {lesson.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                      {lesson.description}
                    </p>
                    {/* Mini progress bar */}
                    <div className="mt-2 flex items-center gap-2">
                      <div className="w-24 bg-slate-100 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${
                            isComp ? 'bg-emerald-500' : isInProg ? 'bg-blue-500' : 'bg-slate-300'
                          }`}
                          style={{ width: `${lesson.progressPercent}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500">{lesson.progressPercent}%</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      isComp 
                        ? 'bg-emerald-100 text-emerald-800'
                        : isInProg 
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-slate-100 text-slate-600'
                    }`}>
                      {isComp ? 'Đã hoàn thành' : isInProg ? 'Đang học' : 'Chưa học'}
                    </span>

                    <button
                      onClick={() => {
                        setSelectedLessonId(lesson.id);
                        setActiveTab('lessons');
                      }}
                      className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                    >
                      <PlayCircle className="w-3.5 h-3.5" />
                      <span>Xem bài</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Urgent Tasks */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <CheckSquare className="w-5 h-5 text-amber-600" />
              <h3 className="font-bold text-slate-900 text-lg">Nhiệm vụ cần làm</h3>
            </div>
            <button
              onClick={() => setActiveTab('tasks')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
            >
              Xem tất cả ({tasks.length}) &rarr;
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {urgentTasks.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-700">Tuyệt vời! Em đã hoàn thành tất cả nhiệm vụ.</p>
                <p className="text-xs text-slate-500">Cô Thủy sẽ cập nhật nhiệm vụ mới trong tiết học tới.</p>
              </div>
            ) : (
              urgentTasks.map((task) => {
                const isHigh = task.priority === 'high';

                return (
                  <div 
                    key={task.id}
                    className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-300 bg-slate-50/50 hover:bg-white transition-all space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            isHigh ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                            {isHigh ? 'Ưu tiên cao' : 'Trung bình'}
                          </span>
                          <span className="text-[11px] text-slate-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Hạn: {task.dueDate}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 leading-snug">
                          {task.title}
                        </h4>
                        <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                          {task.content}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                      <button
                        onClick={() => {
                          setSelectedTaskId(task.id);
                          setActiveTab('tasks');
                        }}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
                      >
                        Chi tiết nhiệm vụ &rarr;
                      </button>

                      <button
                        onClick={() => updateTaskStatus(task.id, 'completed')}
                        className="text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                      >
                        Đánh dấu đã xong ✓
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
