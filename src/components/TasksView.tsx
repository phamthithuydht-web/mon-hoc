import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Task, Status, Priority } from '../types';
import { 
  CheckSquare, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Filter, 
  ArrowLeft, 
  Send,
  HelpCircle,
  FileCheck2
} from 'lucide-react';

export const TasksView: React.FC = () => {
  const { 
    tasks, 
    selectedTaskId, 
    setSelectedTaskId, 
    updateTaskStatus, 
    setActiveTab, 
    lessons,
    presentationMode 
  } = useApp();

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [submissionText, setSubmissionText] = useState<string>('');

  const selectedTask = tasks.find(t => t.id === selectedTaskId);

  const filteredTasks = tasks.filter(task => {
    if (statusFilter !== 'all' && task.status !== statusFilter) return false;
    if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;
    return true;
  });

  const getPriorityBadge = (p: Priority) => {
    switch (p) {
      case 'high':
        return { label: 'Ưu tiên cao', class: 'bg-red-100 text-red-800 border-red-200' };
      case 'medium':
        return { label: 'Trung bình', class: 'bg-amber-100 text-amber-800 border-amber-200' };
      case 'low':
      default:
        return { label: 'Bình thường', class: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
    }
  };

  const getStatusBadge = (s: Status) => {
    switch (s) {
      case 'completed':
        return { label: 'Đã hoàn thành', class: 'bg-emerald-100 text-emerald-800 border-emerald-300', icon: CheckCircle2 };
      case 'in_progress':
        return { label: 'Đang làm', class: 'bg-blue-100 text-blue-800 border-blue-300', icon: Clock };
      case 'not_started':
      default:
        return { label: 'Chưa làm', class: 'bg-slate-100 text-slate-700 border-slate-300', icon: HelpCircle };
    }
  };

  const handleOpenTask = (task: Task) => {
    setSelectedTaskId(task.id);
    setSubmissionText(task.submission || '');
  };

  const handleSubmit = (taskId: string) => {
    updateTaskStatus(taskId, 'completed', submissionText || 'Đã hoàn thành bài tập thực hành theo yêu cầu của Cô Thủy.');
    setSelectedTaskId(null);
  };

  return (
    <div className={`space-y-6 ${presentationMode ? 'text-lg' : ''}`}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">
            <CheckSquare className="w-4 h-4" />
            <span>Nhiệm vụ học tập • Tin học 10</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Khu vực nhiệm vụ học tập
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Các bài tập, bài thực hành và nhiệm vụ rèn luyện do Cô Phạm Thị Thủy giao.
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
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/80">
        {/* Status Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Trạng thái:
          </span>
          {[
            { id: 'all', label: `Tất cả (${tasks.length})` },
            { id: 'not_started', label: `Chưa làm (${tasks.filter(t => t.status === 'not_started').length})` },
            { id: 'in_progress', label: `Đang làm (${tasks.filter(t => t.status === 'in_progress').length})` },
            { id: 'completed', label: `Đã hoàn thành (${tasks.filter(t => t.status === 'completed').length})` },
          ].map(st => (
            <button
              key={st.id}
              onClick={() => setStatusFilter(st.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                statusFilter === st.id
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>

        {/* Priority Filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-slate-500">Ưu tiên:</span>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="all">Tất cả mức độ</option>
            <option value="high">Ưu tiên cao</option>
            <option value="medium">Trung bình</option>
            <option value="low">Bình thường</option>
          </select>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
            <CheckCircle2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-base font-bold text-slate-700">Không có nhiệm vụ nào phù hợp với bộ lọc</p>
            <p className="text-xs text-slate-400 mt-1">Hãy thử chọn lại trạng thái hoặc xem tất cả nhiệm vụ.</p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const pBadge = getPriorityBadge(task.priority);
            const sBadge = getStatusBadge(task.status);
            const SIcon = sBadge.icon;
            const relatedLesson = lessons.find(l => l.id === task.lessonId);

            return (
              <div
                key={task.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Priority badge */}
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${pBadge.class}`}>
                      {pBadge.label}
                    </span>

                    {/* Status badge */}
                    <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${sBadge.class}`}>
                      <SIcon className="w-3 h-3" />
                      <span>{sBadge.label}</span>
                    </span>

                    {/* Due date */}
                    <span className="text-xs text-slate-500 flex items-center gap-1 ml-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      Hạn: <strong className="text-slate-700">{task.dueDate}</strong>
                    </span>

                    {relatedLesson && (
                      <span className="text-[11px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-semibold">
                        {relatedLesson.title.split(':')[0]}
                      </span>
                    )}
                  </div>

                  {/* Task title */}
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {task.title}
                  </h3>

                  {/* Task content */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                    {task.content}
                  </p>

                  {/* Submission note if completed */}
                  {task.status === 'completed' && task.submission && (
                    <div className="mt-2 text-xs bg-emerald-50 text-emerald-900 border border-emerald-200 p-2.5 rounded-xl font-medium flex items-center gap-2">
                      <FileCheck2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Đã nộp bài: "{task.submission}" ({task.submittedAt || 'Đã ghi nhận'})</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap md:flex-col items-end gap-2 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                    {/* Quick status cycle button */}
                    {task.status !== 'completed' ? (
                      <button
                        onClick={() => updateTaskStatus(task.id, 'completed')}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs hover:shadow transition-all cursor-pointer"
                      >
                        ✓ Hoàn thành
                      </button>
                    ) : (
                      <button
                        onClick={() => updateTaskStatus(task.id, 'in_progress')}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors cursor-pointer"
                      >
                        Làm lại
                      </button>
                    )}

                    <button
                      onClick={() => handleOpenTask(task)}
                      className="px-4 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 transition-colors cursor-pointer"
                    >
                      Xem chi tiết &rarr;
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Task Detail & Submission Modal */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-6 relative">
              <button
                onClick={() => setSelectedTaskId(null)}
                className="absolute top-5 right-5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors cursor-pointer"
                title="Đóng"
              >
                ✕
              </button>
              <div className="flex items-center gap-2 text-amber-200 text-xs font-bold uppercase tracking-wider mb-1">
                <CheckSquare className="w-4 h-4" />
                <span>Chi tiết nhiệm vụ học tập</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold pr-8">
                {selectedTask.title}
              </h2>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              {/* Metadata row */}
              <div className="flex flex-wrap items-center gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="font-semibold text-slate-600">
                  Hạn hoàn thành: <strong className="text-red-600">{selectedTask.dueDate}</strong>
                </span>
                <span>•</span>
                <span className="font-semibold text-slate-600">
                  Mức độ: <strong className="text-amber-700">{selectedTask.priority === 'high' ? 'Ưu tiên cao' : 'Trung bình'}</strong>
                </span>
                <span>•</span>
                <span className="font-semibold text-slate-600">
                  Trạng thái hiện tại: <strong className="text-blue-700">{selectedTask.status === 'completed' ? 'Đã hoàn thành' : selectedTask.status === 'in_progress' ? 'Đang làm' : 'Chưa làm'}</strong>
                </span>
              </div>

              {/* Requirement details */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Nội dung yêu cầu từ Cô Thủy:
                </h4>
                <div className="bg-amber-50/60 border border-amber-200 text-slate-800 p-4 rounded-2xl text-sm leading-relaxed font-medium">
                  {selectedTask.content}
                </div>
              </div>

              {/* Submission section */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center justify-between">
                  <span>Bài nộp / Kết quả của học sinh:</span>
                  <span className="text-slate-400 font-normal">Có thể gõ câu trả lời hoặc dán liên kết sản phẩm</span>
                </h4>
                <textarea
                  value={submissionText}
                  onChange={(e) => setSubmissionText(e.target.value)}
                  placeholder="Nhập câu trả lời, giải bài tập hoặc ghi chú kết quả nộp bài của em tại đây..."
                  rows={4}
                  className="w-full rounded-2xl border border-slate-300 p-3.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-400"
                />
              </div>

              {/* Fast status switcher */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500">Chuyển nhanh trạng thái:</span>
                  <button
                    onClick={() => updateTaskStatus(selectedTask.id, 'not_started')}
                    className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                  >
                    Chưa làm
                  </button>
                  <button
                    onClick={() => updateTaskStatus(selectedTask.id, 'in_progress')}
                    className="text-xs font-semibold px-2.5 py-1 rounded bg-blue-100 hover:bg-blue-200 text-blue-800 cursor-pointer"
                  >
                    Đang làm
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => setSelectedTaskId(null)}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-800 cursor-pointer"
              >
                Đóng
              </button>

              <button
                onClick={() => handleSubmit(selectedTask.id)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Nộp bài & Đánh dấu hoàn thành</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
