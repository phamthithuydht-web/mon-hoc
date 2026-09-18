import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  BarChart3, 
  BookOpen, 
  CheckSquare, 
  Award, 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';

export const ProgressView: React.FC = () => {
  const { 
    lessons, 
    tasks, 
    quizResults, 
    setActiveTab, 
    setSelectedLessonId, 
    presentationMode 
  } = useApp();

  const completedLessons = lessons.filter(l => l.status === 'completed');
  const inProgressLessons = lessons.filter(l => l.status === 'in_progress');
  const completedTasks = tasks.filter(t => t.status === 'completed');

  const lessonPercent = lessons.length ? Math.round((completedLessons.length / lessons.length) * 100) : 0;
  const taskPercent = tasks.length ? Math.round((completedTasks.length / tasks.length) * 100) : 0;

  // Quiz average score
  const quizAvg = quizResults.length 
    ? (quizResults.reduce((acc, r) => acc + r.score, 0) / quizResults.length).toFixed(1)
    : 'Chưa có';

  // Group lessons by Topic to calculate topic-level progress
  const topicMap: Record<string, { total: number; completed: number; inProgress: number; percentSum: number }> = {};

  lessons.forEach(l => {
    if (!topicMap[l.topic]) {
      topicMap[l.topic] = { total: 0, completed: 0, inProgress: 0, percentSum: 0 };
    }
    topicMap[l.topic].total += 1;
    topicMap[l.topic].percentSum += l.progressPercent;
    if (l.status === 'completed') topicMap[l.topic].completed += 1;
    if (l.status === 'in_progress') topicMap[l.topic].inProgress += 1;
  });

  const topicsProgress = Object.keys(topicMap).map(topicName => {
    const data = topicMap[topicName];
    const avgPercent = Math.round(data.percentSum / data.total);
    return {
      name: topicName,
      total: data.total,
      completed: data.completed,
      avgPercent
    };
  });

  return (
    <div className={`space-y-6 ${presentationMode ? 'text-lg' : ''}`}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
            <BarChart3 className="w-4 h-4" />
            <span>Tiến độ học tập • Tin học 10</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Bảng theo dõi tiến độ học tập
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Trực quan hóa tỷ lệ hoàn thành bài học, nhiệm vụ và kết quả bài kiểm tra môn Tin học 10.
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

      {/* 3 Large Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Lesson rate */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Tỷ lệ bài học đã xong</span>
            <BookOpen className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-4xl font-extrabold text-blue-600">
            {lessonPercent}%
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${lessonPercent}%` }} />
          </div>
          <div className="text-xs text-slate-500 flex justify-between">
            <span>Đã xong: {completedLessons.length}/{lessons.length} bài</span>
            <span>Đang học: {inProgressLessons.length} bài</span>
          </div>
        </div>

        {/* Task rate */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Nhiệm vụ đã hoàn thành</span>
            <CheckSquare className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-4xl font-extrabold text-emerald-600">
            {taskPercent}%
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${taskPercent}%` }} />
          </div>
          <div className="text-xs text-slate-500 flex justify-between">
            <span>Đã làm: {completedTasks.length}/{tasks.length} nhiệm vụ</span>
            <span>Còn lại: {tasks.length - completedTasks.length} nhiệm vụ</span>
          </div>
        </div>

        {/* Quiz score average */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Điểm Quiz trung bình</span>
            <Award className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-4xl font-extrabold text-amber-500">
            {quizAvg} <span className="text-lg font-medium text-slate-400">/ 10</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-amber-400 h-2.5 rounded-full transition-all duration-500" 
              style={{ width: `${typeof quizAvg === 'string' && quizAvg !== 'Chưa có' ? Number(quizAvg) * 10 : 0}%` }} 
            />
          </div>
          <div className="text-xs text-slate-500 flex justify-between">
            <span>Đã làm: {quizResults.length} bài</span>
            <span>{quizResults.length > 0 ? 'Thang điểm 10' : 'Chưa có bài thi'}</span>
          </div>
        </div>
      </div>

      {/* Progress by Topic (Chủ đề 1 đến 5) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-bold text-slate-900">
              Tiến độ theo từng chủ đề Tin học 10
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">Theo phân phối chương trình môn Tin học</span>
        </div>

        <div className="space-y-4">
          {topicsProgress.map((tp, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-sm font-bold text-slate-800">
                  {tp.name}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  Đã hoàn thành {tp.completed} / {tp.total} bài học ({tp.avgPercent}%)
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-200/70 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${
                    tp.avgPercent === 100
                      ? 'bg-emerald-500'
                      : tp.avgPercent > 0
                        ? 'bg-indigo-600'
                        : 'bg-slate-300'
                  }`}
                  style={{ width: `${tp.avgPercent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quiz History Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-bold text-slate-900">
              Lịch sử làm bài trắc nghiệm (Quiz)
            </h3>
          </div>
          <button
            onClick={() => setActiveTab('quizzes')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
          >
            Làm thêm bài trắc nghiệm &rarr;
          </button>
        </div>

        {quizResults.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <Clock className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-medium">Chưa có kết quả bài kiểm tra nào.</p>
            <p className="text-xs text-slate-400 mt-0.5">Em hãy vào mục "Bài tập / Quiz" để làm bài luyện tập nhé.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-bold text-slate-500 uppercase">
                  <th className="pb-3 pr-4">Tên bài kiểm tra</th>
                  <th className="pb-3 px-4">Số câu đúng</th>
                  <th className="pb-3 px-4">Điểm số</th>
                  <th className="pb-3 px-4">Thời gian hoàn thành</th>
                  <th className="pb-3 pl-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {quizResults.map((result) => (
                  <tr key={result.id} className="hover:bg-slate-50">
                    <td className="py-3.5 pr-4 font-semibold text-slate-900">
                      {result.quizTitle}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {result.correctCount} / {result.totalQuestions} câu
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        result.score >= 8.0 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : result.score >= 5.0 
                            ? 'bg-amber-100 text-amber-800' 
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {result.score} / 10
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-500">
                      {result.completedAt}
                    </td>
                    <td className="py-3.5 pl-4 text-right">
                      <button
                        onClick={() => setActiveTab('quizzes')}
                        className="text-xs font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
                      >
                        Làm lại &rarr;
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
