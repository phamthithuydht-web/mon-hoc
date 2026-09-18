import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, 
  School, 
  BookOpen, 
  CheckSquare, 
  Award, 
  ArrowLeft, 
  Save, 
  ShieldAlert, 
  GraduationCap
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { 
    profile, 
    updateProfile, 
    lessons, 
    tasks, 
    quizResults, 
    setActiveTab, 
    presentationMode 
  } = useApp();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [nameInput, setNameInput] = useState<string>(profile.name);
  const [classInput, setClassInput] = useState<string>(profile.className);

  const completedLessons = lessons.filter(l => l.status === 'completed');
  const completedTasks = tasks.filter(t => t.status === 'completed');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: nameInput.trim() || 'Học sinh lớp 10',
      className: classInput.trim() || '10A1',
    });
    setIsEditing(false);
  };

  return (
    <div className={`space-y-6 ${presentationMode ? 'text-lg' : ''}`}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
            <User className="w-4 h-4" />
            <span>Thông tin cá nhân • Học sinh THPT</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Hồ sơ học tập của học sinh
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Xem tiến độ, kết quả rèn luyện và danh hiệu học tập môn Tin học 10.
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

      {/* Main Profile Info Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar Icon */}
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg text-3xl font-extrabold shrink-0">
            {profile.name.charAt(0)}
          </div>

          <div className="flex-1 text-center sm:text-left space-y-2">
            {!isEditing ? (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-2xl font-extrabold text-slate-900">
                      {profile.name}
                    </h3>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-1">
                      <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">
                        <GraduationCap className="w-3.5 h-3.5" />
                        Lớp {profile.className}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                        <School className="w-3.5 h-3.5" />
                        Trường THPT Vĩnh Cửu
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setNameInput(profile.name);
                      setClassInput(profile.className);
                      setIsEditing(true);
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors cursor-pointer self-center sm:self-auto"
                  >
                    Chỉnh sửa tên & lớp
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 pt-1">
                  Giáo viên phụ trách bộ môn: <strong>Cô Phạm Thị Thủy</strong> • Môn học: <strong>Tin học 10</strong>
                </p>
              </>
            ) : (
              <form onSubmit={handleSave} className="space-y-4 max-w-md">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Họ và tên học sinh
                  </label>
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập họ và tên..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Lớp học (Khối 10 THPT Vĩnh Cửu)
                  </label>
                  <select
                    value={classInput}
                    onChange={(e) => setClassInput(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    <option value="10A1">10A1</option>
                    <option value="10A2">10A2</option>
                    <option value="10A3">10A3</option>
                    <option value="10A4">10A4</option>
                    <option value="10A5">10A5</option>
                    <option value="10A6">10A6</option>
                    <option value="10A7">10A7</option>
                    <option value="10A8">10A8</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-xs cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Lưu thông tin</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    Hủy
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Privacy Note */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-400">
          <ShieldAlert className="w-4 h-4 text-slate-400 shrink-0" />
          <span>Hệ thống học tập bảo mật: Không yêu cầu hoặc thu thập bất kỳ thông tin cá nhân nhạy cảm nào (CCCD, SĐT, email cá nhân).</span>
        </div>
      </div>

      {/* 3 Quick Performance Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase mb-2">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span>Bài học hoàn thành</span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">
            {completedLessons.length} <span className="text-base font-normal text-slate-400">/ {lessons.length}</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Đã tích lũy đủ các bài cơ bản</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase mb-2">
            <CheckSquare className="w-4 h-4 text-emerald-600" />
            <span>Nhiệm vụ đã hoàn thành</span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">
            {completedTasks.length} <span className="text-base font-normal text-slate-400">/ {tasks.length}</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Đã nộp đầy đủ bài thực hành</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase mb-2">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Số bài Quiz đã làm</span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">
            {quizResults.length} <span className="text-base font-normal text-slate-400">bài</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {quizResults.length > 0 ? `Điểm gần nhất: ${quizResults[0].score}/10` : 'Chưa tham gia kiểm tra'}
          </p>
        </div>
      </div>

      {/* Quiz Results Table in Profile */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h3 className="text-lg font-bold text-slate-900">
          Kết quả rèn luyện trắc nghiệm gần đây
        </h3>

        {quizResults.length === 0 ? (
          <p className="text-sm text-slate-500">Chưa có kết quả bài kiểm tra nào được lưu.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-bold text-slate-500 uppercase">
                  <th className="pb-3 pr-4">Tên bài Quiz</th>
                  <th className="pb-3 px-4">Thời gian</th>
                  <th className="pb-3 px-4">Điểm số</th>
                  <th className="pb-3 pl-4">Đánh giá</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {quizResults.map((r) => (
                  <tr key={r.id}>
                    <td className="py-3 pr-4 font-semibold text-slate-900">{r.quizTitle}</td>
                    <td className="py-3 px-4 text-xs text-slate-500">{r.completedAt}</td>
                    <td className="py-3 px-4 font-bold text-amber-600">{r.score} / 10</td>
                    <td className="py-3 pl-4">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        r.score >= 8 ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {r.score >= 8 ? 'Hoàn thành tốt' : 'Đạt'}
                      </span>
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
