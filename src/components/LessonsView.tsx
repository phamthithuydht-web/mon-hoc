import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Lesson, Status } from '../types';
import { 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Filter, 
  ArrowLeft, 
  FileText, 
  Award, 
  Check, 
  HelpCircle,
  ExternalLink
} from 'lucide-react';

export const LessonsView: React.FC = () => {
  const { 
    lessons, 
    selectedLessonId, 
    setSelectedLessonId, 
    updateLessonStatus, 
    setActiveTab, 
    setSelectedQuizId, 
    quizzes,
    presentationMode 
  } = useApp();

  const [topicFilter, setTopicFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Unique topics
  const topics = Array.from(new Set(lessons.map(l => l.topic)));

  const filteredLessons = lessons.filter(lesson => {
    if (topicFilter !== 'all' && lesson.topic !== topicFilter) return false;
    if (statusFilter !== 'all' && lesson.status !== statusFilter) return false;
    return true;
  });

  const selectedLesson = lessons.find(l => l.id === selectedLessonId);
  const relatedQuiz = selectedLesson ? quizzes.find(q => q.lessonId === selectedLesson.id) : null;

  const getStatusBadge = (status: Status) => {
    switch (status) {
      case 'completed':
        return { label: 'Đã hoàn thành', bg: 'bg-emerald-100 text-emerald-800 border-emerald-300', icon: CheckCircle2 };
      case 'in_progress':
        return { label: 'Đang học', bg: 'bg-blue-100 text-blue-800 border-blue-300', icon: Clock };
      case 'not_started':
      default:
        return { label: 'Chưa học', bg: 'bg-slate-100 text-slate-700 border-slate-300', icon: HelpCircle };
    }
  };

  return (
    <div className={`space-y-6 ${presentationMode ? 'text-lg' : ''}`}>
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Môn Tin học 10 • THPT Vĩnh Cửu</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Danh sách bài học & Chủ đề
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Dữ liệu bài học được biên soạn bởi Cô Phạm Thị Thủy, bám sát chương trình Tin học lớp 10.
          </p>
        </div>

        {/* Back to Overview button */}
        <button
          onClick={() => setActiveTab('overview')}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer self-start md:self-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Về trang tổng quan</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/80">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 shrink-0">
          <Filter className="w-4 h-4" />
          <span>Bộ lọc:</span>
        </div>

        {/* Topic filter */}
        <select
          value={topicFilter}
          onChange={(e) => setTopicFilter(e.target.value)}
          className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          <option value="all">Tất cả chủ đề ({lessons.length})</option>
          {topics.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        {/* Status filter */}
        <div className="flex items-center gap-1 overflow-x-auto">
          {[
            { id: 'all', label: 'Tất cả' },
            { id: 'not_started', label: 'Chưa học' },
            { id: 'in_progress', label: 'Đang học' },
            { id: 'completed', label: 'Đã hoàn thành' },
          ].map(st => (
            <button
              key={st.id}
              onClick={() => setStatusFilter(st.id)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                statusFilter === st.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Lessons Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredLessons.map((lesson) => {
          const badge = getStatusBadge(lesson.status);
          const BadgeIcon = badge.icon;
          const hasQuiz = quizzes.some(q => q.lessonId === lesson.id);

          return (
            <div
              key={lesson.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all p-5 flex flex-col justify-between group"
            >
              <div>
                {/* Topic and Duration */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 line-clamp-1">
                    {lesson.topic}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold shrink-0 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {lesson.duration}
                  </span>
                </div>

                {/* Lesson Title */}
                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mt-1">
                  {lesson.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                  {lesson.description}
                </p>

                {/* Progress bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-500">Tiến độ bài học</span>
                    <span className="text-slate-800">{lesson.progressPercent}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        lesson.status === 'completed'
                          ? 'bg-emerald-500'
                          : lesson.status === 'in_progress'
                            ? 'bg-blue-600'
                            : 'bg-slate-300'
                      }`}
                      style={{ width: `${lesson.progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Card Footer: Status Badge & Buttons */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border ${badge.bg}`}>
                  <BadgeIcon className="w-3.5 h-3.5" />
                  <span>{badge.label}</span>
                </span>

                <div className="flex items-center gap-1.5">
                  {hasQuiz && (
                    <button
                      onClick={() => {
                        const q = quizzes.find(item => item.lessonId === lesson.id);
                        if (q) {
                          setSelectedQuizId(q.id);
                          setActiveTab('quizzes');
                        }
                      }}
                      title="Làm bài trắc nghiệm bài này"
                      className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition-colors cursor-pointer"
                    >
                      <Award className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    onClick={() => setSelectedLessonId(lesson.id)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow transition-all cursor-pointer"
                  >
                    <span>Xem bài học</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lesson Details Modal */}
      {selectedLesson && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Top Header */}
            <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-6 relative">
              <button
                onClick={() => setSelectedLessonId(null)}
                className="absolute top-5 right-5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors cursor-pointer"
                title="Đóng"
              >
                ✕
              </button>
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-200 block mb-1">
                {selectedLesson.topic} • {selectedLesson.duration}
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold pr-8">
                {selectedLesson.title}
              </h2>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Objectives */}
              <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5 mb-2">
                  <Check className="w-4 h-4 text-blue-600" />
                  <span>Mục tiêu cần đạt</span>
                </h4>
                <ul className="space-y-1.5 text-sm text-slate-700">
                  {selectedLesson.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Content Summary */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mb-2">
                  <FileText className="w-4 h-4 text-slate-700" />
                  <span>Tóm tắt lý thuyết trọng tâm</span>
                </h4>
                <div className="text-sm text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200 leading-relaxed">
                  {selectedLesson.contentSummary}
                </div>
              </div>

              {/* Teacher Notes */}
              <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-1.5">
                  Dặn dò của Cô Phạm Thị Thủy
                </h4>
                <p className="text-sm text-amber-900 leading-relaxed font-medium">
                  "{selectedLesson.teacherNotes}"
                </p>
              </div>

              {/* Resources */}
              {selectedLesson.resources && selectedLesson.resources.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Tài liệu học tập
                  </h4>
                  <div className="space-y-2">
                    {selectedLesson.resources.map((res, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-semibold text-slate-800">{res.name}</span>
                        </div>
                        <span className="text-xs font-bold text-blue-600 flex items-center gap-1">
                          Xem tài liệu <ExternalLink className="w-3 h-3" />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Status Update Actions */}
              <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-600">Trạng thái của em:</span>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => updateLessonStatus(selectedLesson.id, 'not_started', 0)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        selectedLesson.status === 'not_started'
                          ? 'bg-slate-700 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Chưa học
                    </button>
                    <button
                      onClick={() => updateLessonStatus(selectedLesson.id, 'in_progress', 50)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        selectedLesson.status === 'in_progress'
                          ? 'bg-blue-600 text-white'
                          : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                      }`}
                    >
                      Đang học
                    </button>
                    <button
                      onClick={() => updateLessonStatus(selectedLesson.id, 'completed', 100)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        selectedLesson.status === 'completed'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                      }`}
                    >
                      ✓ Đã hoàn thành
                    </button>
                  </div>
                </div>

                {relatedQuiz && (
                  <button
                    onClick={() => {
                      setSelectedQuizId(relatedQuiz.id);
                      setSelectedLessonId(null);
                      setActiveTab('quizzes');
                    }}
                    className="inline-flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs sm:text-sm transition-all cursor-pointer shadow-xs"
                  >
                    <Award className="w-4 h-4 text-slate-950" />
                    <span>Làm bài Quiz của bài này &rarr;</span>
                  </button>
                )}
              </div>
            </div>

            {/* Modal Bottom Footer */}
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedLessonId(null)}
                className="px-5 py-2 rounded-xl text-sm font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
