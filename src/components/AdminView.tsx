import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Lesson, Task, Quiz, QuizQuestion, Announcement, Priority } from '../types';
import { 
  ShieldCheck, 
  BookOpen, 
  CheckSquare, 
  Award, 
  Bell, 
  Users, 
  Plus, 
  Trash2, 
  Edit3, 
  RotateCcw, 
  Save, 
  Sparkles,
  Info,
  Clock
} from 'lucide-react';

type AdminTab = 'lessons' | 'tasks' | 'quizzes' | 'announcements' | 'students';

export const AdminView: React.FC = () => {
  const { 
    lessons, 
    saveLesson, 
    deleteLesson, 
    tasks, 
    saveTask, 
    deleteTask, 
    quizzes, 
    saveQuizQuestion, 
    deleteQuizQuestion, 
    announcements, 
    saveAnnouncement, 
    deleteAnnouncement, 
    classSamples, 
    resetToDefaults, 
    presentationMode 
  } = useApp();

  const [currentAdminTab, setCurrentAdminTab] = useState<AdminTab>('lessons');

  // Form states for adding/editing lessons
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [isAddingLesson, setIsAddingLesson] = useState<boolean>(false);
  const [lessonForm, setLessonForm] = useState<Partial<Lesson>>({
    topic: 'Chủ đề 1: Máy tính và xã hội tri thức',
    title: '',
    duration: '2 tiết',
    description: '',
    status: 'not_started',
    progressPercent: 0,
    objectives: ['Mục tiêu cơ bản bài học'],
    contentSummary: '',
    teacherNotes: 'Các em chú ý đọc trước tài liệu trước khi lên lớp.'
  });

  // Form states for tasks
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isAddingTask, setIsAddingTask] = useState<boolean>(false);
  const [taskForm, setTaskForm] = useState<Partial<Task>>({
    title: '',
    content: '',
    dueDate: '2026-09-30',
    priority: 'medium',
    status: 'not_started'
  });

  // Form states for quiz questions
  const [selectedQuizForQuestion, setSelectedQuizForQuestion] = useState<string>(quizzes[0]?.id || '');
  const [isAddingQuestion, setIsAddingQuestion] = useState<boolean>(false);
  const [questionForm, setQuestionForm] = useState<{
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }>({
    question: '',
    options: ['Phương án A', 'Phương án B', 'Phương án C', 'Phương án D'],
    correctAnswer: 0,
    explanation: ''
  });

  // Form states for announcements
  const [isAddingAnn, setIsAddingAnn] = useState<boolean>(false);
  const [annForm, setAnnForm] = useState<Partial<Announcement>>({
    title: '',
    content: '',
    type: 'lesson',
    isPinned: false
  });

  // Handle Lesson Submit
  const handleSaveLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonForm.title?.trim()) return;

    const newLesson: Lesson = {
      id: editingLesson ? editingLesson.id : `lesson-${Date.now()}`,
      topic: lessonForm.topic || 'Chủ đề 1: Máy tính và xã hội tri thức',
      title: lessonForm.title.trim(),
      duration: lessonForm.duration || '2 tiết',
      description: lessonForm.description || '',
      status: lessonForm.status || 'not_started',
      progressPercent: lessonForm.progressPercent || 0,
      objectives: lessonForm.objectives || ['Nắm vững kiến thức trọng tâm'],
      contentSummary: lessonForm.contentSummary || 'Nội dung tóm tắt bài giảng.',
      teacherNotes: lessonForm.teacherNotes || 'Dặn dò của Cô Phạm Thị Thủy.'
    };

    saveLesson(newLesson);
    setIsAddingLesson(false);
    setEditingLesson(null);
    setLessonForm({
      topic: 'Chủ đề 1: Máy tính và xã hội tri thức',
      title: '',
      duration: '2 tiết',
      description: '',
      status: 'not_started',
      progressPercent: 0,
      objectives: ['Mục tiêu cơ bản bài học'],
      contentSummary: '',
      teacherNotes: 'Các em chú ý đọc trước tài liệu trước khi lên lớp.'
    });
  };

  // Handle Task Submit
  const handleSaveTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskForm.title?.trim()) return;

    const newTask: Task = {
      id: editingTask ? editingTask.id : `task-${Date.now()}`,
      title: taskForm.title.trim(),
      content: taskForm.content || '',
      dueDate: taskForm.dueDate || '2026-09-30',
      priority: (taskForm.priority as Priority) || 'medium',
      status: taskForm.status || 'not_started'
    };

    saveTask(newTask);
    setIsAddingTask(false);
    setEditingTask(null);
    setTaskForm({
      title: '',
      content: '',
      dueDate: '2026-09-30',
      priority: 'medium',
      status: 'not_started'
    });
  };

  // Handle Question Submit
  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionForm.question.trim() || !selectedQuizForQuestion) return;

    const newQ: QuizQuestion = {
      id: `q-${Date.now()}`,
      question: questionForm.question.trim(),
      options: questionForm.options.map(opt => opt.trim() || 'Lựa chọn'),
      correctAnswer: questionForm.correctAnswer,
      explanation: questionForm.explanation.trim() || 'Đáp án chính xác theo sách giáo khoa Tin học 10.'
    };

    saveQuizQuestion(selectedQuizForQuestion, newQ);
    setIsAddingQuestion(false);
    setQuestionForm({
      question: '',
      options: ['Phương án A', 'Phương án B', 'Phương án C', 'Phương án D'],
      correctAnswer: 0,
      explanation: ''
    });
  };

  // Handle Announcement Submit
  const handleSaveAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annForm.title?.trim()) return;

    const newAnn: Announcement = {
      id: `ann-${Date.now()}`,
      title: annForm.title.trim(),
      content: annForm.content || '',
      date: new Date().toISOString().split('T')[0],
      type: annForm.type || 'lesson',
      isPinned: annForm.isPinned || false
    };

    saveAnnouncement(newAnn);
    setIsAddingAnn(false);
    setAnnForm({
      title: '',
      content: '',
      type: 'lesson',
      isPinned: false
    });
  };

  return (
    <div className={`space-y-6 ${presentationMode ? 'text-lg' : ''}`}>
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-800 via-indigo-900 to-purple-950 text-white p-6 sm:p-7 rounded-3xl shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-semibold backdrop-blur-xs border border-white/20">
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              <span>Góc làm việc của giáo viên • Trường THPT Vĩnh Cửu</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Bảng quản trị học tập — Cô Phạm Thị Thủy
            </h2>
            <p className="text-purple-200 text-xs sm:text-sm max-w-2xl">
              Thầy cô có thể thêm, chỉnh sửa các bài học, giao nhiệm vụ, cấu hình câu hỏi trắc nghiệm hoặc đăng thông báo cho học sinh khối 10.
            </p>
          </div>

          {/* Reset button */}
          <button
            onClick={() => {
              if (window.confirm('Khôi phục lại toàn bộ dữ liệu bài học, nhiệm vụ, quiz về bản mẫu chuẩn ban đầu?')) {
                resetToDefaults();
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-red-500/80 text-white text-xs sm:text-sm font-bold border border-white/20 transition-all cursor-pointer self-start sm:self-auto shrink-0"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Khôi phục dữ liệu gốc</span>
          </button>
        </div>
      </div>

      {/* Note Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-3 text-xs sm:text-sm text-amber-900 shadow-xs">
        <Info className="w-5 h-5 text-amber-600 shrink-0" />
        <div>
          <strong>Ghi chú giáo viên:</strong> Dữ liệu được lưu trữ trực tiếp trên trình duyệt (Local Storage) nên thầy cô có thể tự do thử nghiệm thêm bài học mới hoặc sửa câu hỏi mà không lo mất dữ liệu.
        </div>
      </div>

      {/* Sub-tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto bg-white p-2 rounded-2xl border border-slate-200 shadow-xs">
        {[
          { id: 'lessons', label: `Quản lý Bài học (${lessons.length})`, icon: BookOpen },
          { id: 'tasks', label: `Quản lý Nhiệm vụ (${tasks.length})`, icon: CheckSquare },
          { id: 'quizzes', label: `Quản lý Quiz (${quizzes.length})`, icon: Award },
          { id: 'announcements', label: `Quản lý Thông báo (${announcements.length})`, icon: Bell },
          { id: 'students', label: `Theo dõi cả lớp mẫu (${classSamples.length})`, icon: Users },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = currentAdminTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setCurrentAdminTab(tab.id as AdminTab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. Tab: Lessons Management */}
      {currentAdminTab === 'lessons' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">
              Danh sách bài giảng Tin học 10
            </h3>
            <button
              onClick={() => {
                setEditingLesson(null);
                setIsAddingLesson(true);
                setLessonForm({
                  topic: 'Chủ đề 1: Máy tính và xã hội tri thức',
                  title: '',
                  duration: '2 tiết',
                  description: '',
                  status: 'not_started',
                  progressPercent: 0,
                  objectives: ['Mục tiêu bài học mới'],
                  contentSummary: '',
                  teacherNotes: 'Dặn dò của Cô Thủy.'
                });
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm font-bold shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm bài học mới</span>
            </button>
          </div>

          {/* Form Modal / Inline Editor */}
          {isAddingLesson && (
            <form onSubmit={handleSaveLesson} className="bg-purple-50/70 border-2 border-purple-300 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-purple-200">
                <h4 className="font-bold text-purple-950 text-base">
                  {editingLesson ? 'Chỉnh sửa bài học' : 'Thêm bài học Tin học 10 mới'}
                </h4>
                <button
                  type="button"
                  onClick={() => setIsAddingLesson(false)}
                  className="text-slate-500 hover:text-slate-800 text-sm font-bold cursor-pointer"
                >
                  ✕ Đóng
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Chủ đề</label>
                  <input
                    type="text"
                    value={lessonForm.topic}
                    onChange={(e) => setLessonForm(prev => ({ ...prev, topic: e.target.value }))}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-sm"
                    placeholder="VD: Chủ đề 1: Máy tính và xã hội tri thức"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Thời lượng (Số tiết)</label>
                  <input
                    type="text"
                    value={lessonForm.duration}
                    onChange={(e) => setLessonForm(prev => ({ ...prev, duration: e.target.value }))}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-sm"
                    placeholder="VD: 2 tiết"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tên bài học</label>
                <input
                  type="text"
                  value={lessonForm.title}
                  onChange={(e) => setLessonForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-sm"
                  placeholder="VD: Bài 6: Các kiểu dữ liệu cơ bản trong Python"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mô tả ngắn</label>
                <textarea
                  value={lessonForm.description}
                  onChange={(e) => setLessonForm(prev => ({ ...prev, description: e.target.value }))}
                  rows={2}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-sm"
                  placeholder="Mô tả tóm tắt nội dung bài học..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tóm tắt lý thuyết trọng tâm</label>
                <textarea
                  value={lessonForm.contentSummary}
                  onChange={(e) => setLessonForm(prev => ({ ...prev, contentSummary: e.target.value }))}
                  rows={3}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-sm"
                  placeholder="Kiến thức lý thuyết học sinh cần nắm..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Dặn dò của Cô Phạm Thị Thủy</label>
                <input
                  type="text"
                  value={lessonForm.teacherNotes}
                  onChange={(e) => setLessonForm(prev => ({ ...prev, teacherNotes: e.target.value }))}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-sm"
                  placeholder="Lời dặn học sinh..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingLesson(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-white border border-slate-300 cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Lưu bài học</span>
                </button>
              </div>
            </form>
          )}

          {/* Lessons Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase">
                    <th className="p-4">Chủ đề & Tên bài</th>
                    <th className="p-4">Thời lượng</th>
                    <th className="p-4">Trạng thái mẫu</th>
                    <th className="p-4 text-right">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {lessons.map((lesson) => (
                    <tr key={lesson.id} className="hover:bg-slate-50/80">
                      <td className="p-4">
                        <span className="text-xs text-blue-700 font-semibold block">{lesson.topic}</span>
                        <span className="font-bold text-slate-900">{lesson.title}</span>
                      </td>
                      <td className="p-4 text-xs font-semibold text-slate-600">
                        {lesson.duration}
                      </td>
                      <td className="p-4">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          {lesson.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setEditingLesson(lesson);
                              setLessonForm(lesson);
                              setIsAddingLesson(true);
                            }}
                            className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 cursor-pointer"
                            title="Chỉnh sửa"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Xóa bài học "${lesson.title}"?`)) {
                                deleteLesson(lesson.id);
                              }
                            }}
                            className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 cursor-pointer"
                            title="Xóa"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. Tab: Tasks Management */}
      {currentAdminTab === 'tasks' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">
              Quản lý nhiệm vụ & Bài tập thực hành
            </h3>
            <button
              onClick={() => {
                setEditingTask(null);
                setIsAddingTask(true);
                setTaskForm({
                  title: '',
                  content: '',
                  dueDate: '2026-09-30',
                  priority: 'medium',
                  status: 'not_started'
                });
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-bold shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Giao nhiệm vụ mới</span>
            </button>
          </div>

          {isAddingTask && (
            <form onSubmit={handleSaveTask} className="bg-amber-50/70 border-2 border-amber-300 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-amber-200">
                <h4 className="font-bold text-amber-950 text-base">
                  {editingTask ? 'Chỉnh sửa nhiệm vụ' : 'Giao nhiệm vụ học tập mới'}
                </h4>
                <button
                  type="button"
                  onClick={() => setIsAddingTask(false)}
                  className="text-slate-500 hover:text-slate-800 text-sm font-bold cursor-pointer"
                >
                  ✕ Đóng
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tên nhiệm vụ</label>
                <input
                  type="text"
                  value={taskForm.title}
                  onChange={(e) => setTaskForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-sm"
                  placeholder="VD: Nhiệm vụ 5: Viết chương trình Python tính chu vi hình tròn"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nội dung chi tiết yêu cầu</label>
                <textarea
                  value={taskForm.content}
                  onChange={(e) => setTaskForm(prev => ({ ...prev, content: e.target.value }))}
                  rows={3}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-sm"
                  placeholder="Yêu cầu học sinh làm gì, nộp sản phẩm như thế nào..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Hạn hoàn thành</label>
                  <input
                    type="date"
                    value={taskForm.dueDate}
                    onChange={(e) => setTaskForm(prev => ({ ...prev, dueDate: e.target.value }))}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mức độ ưu tiên</label>
                  <select
                    value={taskForm.priority}
                    onChange={(e) => setTaskForm(prev => ({ ...prev, priority: e.target.value as Priority }))}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-sm cursor-pointer"
                  >
                    <option value="high">Ưu tiên cao</option>
                    <option value="medium">Trung bình</option>
                    <option value="low">Bình thường</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingTask(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-white border border-slate-300 cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Lưu nhiệm vụ</span>
                </button>
              </div>
            </form>
          )}

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase">
                    <th className="p-4">Tên nhiệm vụ</th>
                    <th className="p-4">Hạn nộp</th>
                    <th className="p-4">Mức độ</th>
                    <th className="p-4">Trạng thái</th>
                    <th className="p-4 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tasks.map((task) => (
                    <tr key={task.id} className="hover:bg-slate-50/80">
                      <td className="p-4 font-bold text-slate-900 max-w-xs">{task.title}</td>
                      <td className="p-4 text-xs font-semibold text-slate-600">{task.dueDate}</td>
                      <td className="p-4">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                          task.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {task.priority}
                        </span>
                      </td>
                      <td className="p-4 text-xs text-slate-600 font-semibold">{task.status}</td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setEditingTask(task);
                              setTaskForm(task);
                              setIsAddingTask(true);
                            }}
                            className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 cursor-pointer"
                            title="Sửa"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Xóa nhiệm vụ "${task.title}"?`)) {
                                deleteTask(task.id);
                              }
                            }}
                            className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 cursor-pointer"
                            title="Xóa"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. Tab: Quizzes Management */}
      {currentAdminTab === 'quizzes' && (
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Quản lý ngân hàng câu hỏi Quiz
              </h3>
              <p className="text-xs text-slate-500">Chọn bài trắc nghiệm để xem hoặc bổ sung câu hỏi mới.</p>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedQuizForQuestion}
                onChange={(e) => setSelectedQuizForQuestion(e.target.value)}
                className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-slate-800 cursor-pointer"
              >
                {quizzes.map(q => (
                  <option key={q.id} value={q.id}>{q.title}</option>
                ))}
              </select>

              <button
                onClick={() => setIsAddingQuestion(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-xs cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Thêm câu hỏi</span>
              </button>
            </div>
          </div>

          {/* Add Question Form */}
          {isAddingQuestion && (
            <form onSubmit={handleSaveQuestion} className="bg-indigo-50/70 border-2 border-indigo-300 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-indigo-200">
                <h4 className="font-bold text-indigo-950 text-base">
                  Thêm câu hỏi trắc nghiệm mới vào bài Quiz
                </h4>
                <button
                  type="button"
                  onClick={() => setIsAddingQuestion(false)}
                  className="text-slate-500 hover:text-slate-800 text-sm font-bold cursor-pointer"
                >
                  ✕ Đóng
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nội dung câu hỏi</label>
                <textarea
                  value={questionForm.question}
                  onChange={(e) => setQuestionForm(prev => ({ ...prev, question: e.target.value }))}
                  rows={2}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-sm"
                  placeholder="Nhập nội dung câu hỏi trắc nghiệm..."
                  required
                />
              </div>

              {/* 4 Options */}
              <div className="space-y-2.5">
                <label className="block text-xs font-bold text-slate-700 uppercase">4 Phương án trả lời (A, B, C, D):</label>
                {questionForm.options.map((opt, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) => {
                        const newOpts = [...questionForm.options];
                        newOpts[idx] = e.target.value;
                        setQuestionForm(prev => ({ ...prev, options: newOpts }));
                      }}
                      className="flex-1 bg-white border border-slate-300 rounded-xl px-3.5 py-1.5 text-sm"
                      placeholder={`Nội dung phương án ${String.fromCharCode(65 + idx)}`}
                      required
                    />
                    <label className="flex items-center gap-1 text-xs font-semibold text-slate-700 shrink-0 cursor-pointer">
                      <input
                        type="radio"
                        name="correctAnswer"
                        checked={questionForm.correctAnswer === idx}
                        onChange={() => setQuestionForm(prev => ({ ...prev, correctAnswer: idx }))}
                        className="cursor-pointer"
                      />
                      <span>Đúng</span>
                    </label>
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Giải thích chi tiết đáp án</label>
                <input
                  type="text"
                  value={questionForm.explanation}
                  onChange={(e) => setQuestionForm(prev => ({ ...prev, explanation: e.target.value }))}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-sm"
                  placeholder="Giải thích vì sao đáp án đó là đúng để học sinh học hỏi..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingQuestion(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-white border border-slate-300 cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Lưu câu hỏi</span>
                </button>
              </div>
            </form>
          )}

          {/* Current Questions List for Selected Quiz */}
          {(() => {
            const currentQuiz = quizzes.find(q => q.id === selectedQuizForQuestion);
            if (!currentQuiz) return null;

            return (
              <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h4 className="font-bold text-slate-900">
                    Danh sách câu hỏi của: <span className="text-indigo-600">{currentQuiz.title}</span> ({currentQuiz.questions.length} câu)
                  </h4>
                </div>

                <div className="space-y-3">
                  {currentQuiz.questions.map((q, idx) => (
                    <div key={q.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-start justify-between gap-3">
                        <div className="font-bold text-slate-900 text-sm">
                          Câu {idx + 1}: {q.question}
                        </div>
                        <button
                          onClick={() => {
                            if (window.confirm('Bạn có muốn xóa câu hỏi này?')) {
                              deleteQuizQuestion(currentQuiz.id, q.id);
                            }
                          }}
                          className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                          title="Xóa câu hỏi"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                        {q.options.map((opt, optIdx) => (
                          <div
                            key={optIdx}
                            className={`p-2 rounded-lg border ${
                              optIdx === q.correctAnswer
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                                : 'bg-white border-slate-200'
                            }`}
                          >
                            {opt} {optIdx === q.correctAnswer && ' (Đáp án đúng ✓)'}
                          </div>
                        ))}
                      </div>

                      <div className="text-xs text-slate-500 italic">
                        Giải thích: {q.explanation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* 4. Tab: Announcements Management */}
      {currentAdminTab === 'announcements' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">
              Quản lý Bảng thông báo của Cô Thủy
            </h3>
            <button
              onClick={() => setIsAddingAnn(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Đăng thông báo mới</span>
            </button>
          </div>

          {isAddingAnn && (
            <form onSubmit={handleSaveAnnouncement} className="bg-blue-50/70 border-2 border-blue-300 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-blue-200">
                <h4 className="font-bold text-blue-950 text-base">
                  Đăng thông báo mới gửi học sinh
                </h4>
                <button
                  type="button"
                  onClick={() => setIsAddingAnn(false)}
                  className="text-slate-500 hover:text-slate-800 text-sm font-bold cursor-pointer"
                >
                  ✕ Đóng
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tiêu đề thông báo</label>
                <input
                  type="text"
                  value={annForm.title}
                  onChange={(e) => setAnnForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-sm"
                  placeholder="VD: Lịch thực hành phòng máy tính tuần 3..."
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nội dung chi tiết</label>
                <textarea
                  value={annForm.content}
                  onChange={(e) => setAnnForm(prev => ({ ...prev, content: e.target.value }))}
                  rows={3}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-sm"
                  placeholder="Nhập nội dung lời dặn của giáo viên..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phân loại thông báo</label>
                  <select
                    value={annForm.type}
                    onChange={(e) => setAnnForm(prev => ({ ...prev, type: e.target.value as Announcement['type'] }))}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-sm cursor-pointer"
                  >
                    <option value="lesson">Bài học mới</option>
                    <option value="task">Nhiệm vụ mới</option>
                    <option value="reminder">Nhắc hạn / Lịch học</option>
                    <option value="result">Thông báo kết quả</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="isPinned"
                    checked={annForm.isPinned}
                    onChange={(e) => setAnnForm(prev => ({ ...prev, isPinned: e.target.checked }))}
                    className="cursor-pointer"
                  />
                  <label htmlFor="isPinned" className="text-xs font-bold text-slate-800 cursor-pointer">
                    Ghim lên đầu trang thông báo
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingAnn(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-white border border-slate-300 cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Đăng ngay</span>
                </button>
              </div>
            </form>
          )}

          <div className="space-y-3">
            {announcements.map((ann) => (
              <div key={ann.id} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between gap-3 shadow-xs">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                      {ann.type}
                    </span>
                    <span className="text-xs text-slate-400">{ann.date}</span>
                    {ann.isPinned && (
                      <span className="text-xs text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded">Được ghim</span>
                    )}
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">{ann.title}</h4>
                  <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">{ann.content}</p>
                </div>
                <button
                  onClick={() => {
                    if (window.confirm(`Xóa thông báo "${ann.title}"?`)) {
                      deleteAnnouncement(ann.id);
                    }
                  }}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Tab: Sample Class Progress (Theo dõi tình hình cả lớp) */}
      {currentAdminTab === 'students' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Tình hình học tập mẫu lớp 10 (THPT Vĩnh Cửu)
              </h3>
              <p className="text-xs text-slate-500">Dữ liệu mẫu mô phỏng danh sách học sinh theo dõi cho giáo viên.</p>
            </div>
            <span className="text-xs font-bold px-3 py-1 bg-purple-100 text-purple-800 rounded-full">
              Khối 10 • THPT Vĩnh Cửu
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase">
                    <th className="p-4">Họ và tên học sinh</th>
                    <th className="p-4">Lớp</th>
                    <th className="p-4">Bài học đã xem</th>
                    <th className="p-4">Nhiệm vụ xong</th>
                    <th className="p-4">Điểm Quiz TB</th>
                    <th className="p-4">Hoạt động gần nhất</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {classSamples.map((st) => (
                    <tr key={st.id} className="hover:bg-slate-50">
                      <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                          {st.name.charAt(0)}
                        </div>
                        <span>{st.name}</span>
                      </td>
                      <td className="p-4 text-xs font-semibold text-slate-600">{st.className}</td>
                      <td className="p-4 text-xs font-medium text-slate-700">
                        {st.completedLessonsCount} / {lessons.length} bài
                      </td>
                      <td className="p-4 text-xs font-medium text-slate-700">
                        {st.completedTasksCount} / {tasks.length}
                      </td>
                      <td className="p-4">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                          st.quizAverage >= 8 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {st.quizAverage} / 10
                        </span>
                      </td>
                      <td className="p-4 text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{st.lastActive}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
