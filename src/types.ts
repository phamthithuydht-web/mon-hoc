export type Priority = 'high' | 'medium' | 'low';
export type Status = 'not_started' | 'in_progress' | 'completed';

export interface Lesson {
  id: string;
  topic: string; // Tên chủ đề (VD: Chủ đề 1: Máy tính và xã hội tri thức)
  title: string; // Tên bài học
  duration: string; // VD: 2 tiết
  description: string; // Mô tả ngắn
  status: Status;
  progressPercent: number; // 0 - 100
  objectives: string[]; // Mục tiêu bài học
  contentSummary: string; // Tóm tắt lý thuyết trọng tâm
  teacherNotes: string; // Dặn dò của Cô Phạm Thị Thủy
  resources?: { name: string; type: 'doc' | 'slides' | 'link'; url: string }[];
}

export interface Task {
  id: string;
  title: string;
  content: string; // Nội dung yêu cầu nhiệm vụ
  dueDate: string; // Hạn hoàn thành
  priority: Priority; // Mức độ ưu tiên
  status: Status; // Chưa làm / Đang làm / Đã hoàn thành
  lessonId?: string; // Liên kết bài học (nếu có)
  submission?: string; // Nội dung bài nộp mô phỏng của học sinh
  submittedAt?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0, 1, 2, 3 tương ứng A, B, C, D
  explanation: string; // Giải thích chi tiết đáp án
}

export interface Quiz {
  id: string;
  lessonId: string;
  topicTitle: string;
  title: string;
  description: string;
  timeLimitMinutes: number;
  questions: QuizQuestion[];
}

export interface QuizResult {
  id: string;
  quizId: string;
  quizTitle: string;
  score: number; // Điểm thang 10
  correctCount: number;
  totalQuestions: number;
  completedAt: string;
  answers: Record<string, number>; // questionId -> selected option index
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'lesson' | 'task' | 'reminder' | 'result';
  isPinned?: boolean;
}

export interface StudentProfile {
  name: string;
  className: string;
  school: string;
  teacher: string;
  avatarIcon: string;
}

export interface StudentProgressSample {
  id: string;
  name: string;
  className: string;
  completedLessonsCount: number;
  completedTasksCount: number;
  quizAverage: number;
  lastActive: string;
}

export type ActiveTab = 
  | 'overview' 
  | 'lessons' 
  | 'tasks' 
  | 'quizzes' 
  | 'progress' 
  | 'announcements' 
  | 'profile' 
  | 'admin';
