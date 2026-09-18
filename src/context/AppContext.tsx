import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Lesson, 
  Task, 
  Quiz, 
  QuizResult, 
  Announcement, 
  StudentProfile, 
  StudentProgressSample, 
  ActiveTab,
  Status,
  QuizQuestion
} from '../types';
import { 
  INITIAL_PROFILE, 
  INITIAL_LESSONS, 
  INITIAL_TASKS, 
  INITIAL_QUIZZES, 
  INITIAL_ANNOUNCEMENTS, 
  INITIAL_CLASS_SAMPLES 
} from '../data/initialData';

interface AppContextType {
  lessons: Lesson[];
  tasks: Task[];
  quizzes: Quiz[];
  quizResults: QuizResult[];
  announcements: Announcement[];
  profile: StudentProfile;
  classSamples: StudentProgressSample[];
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedLessonId: string | null;
  setSelectedLessonId: (id: string | null) => void;
  selectedTaskId: string | null;
  setSelectedTaskId: (id: string | null) => void;
  selectedQuizId: string | null;
  setSelectedQuizId: (id: string | null) => void;
  presentationMode: boolean;
  togglePresentationMode: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Lesson actions
  updateLessonStatus: (id: string, status: Status, progress?: number) => void;
  saveLesson: (lesson: Lesson) => void;
  deleteLesson: (id: string) => void;

  // Task actions
  updateTaskStatus: (id: string, status: Status, submission?: string) => void;
  saveTask: (task: Task) => void;
  deleteTask: (id: string) => void;

  // Quiz actions
  saveQuizResult: (result: QuizResult) => void;
  saveQuiz: (quiz: Quiz) => void;
  deleteQuiz: (id: string) => void;
  saveQuizQuestion: (quizId: string, question: QuizQuestion) => void;
  deleteQuizQuestion: (quizId: string, questionId: string) => void;

  // Announcement actions
  saveAnnouncement: (announcement: Announcement) => void;
  deleteAnnouncement: (id: string) => void;

  // Profile
  updateProfile: (profile: Partial<StudentProfile>) => void;

  // Reset
  resetToDefaults: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  LESSONS: 'thpt_vc_lessons_v1',
  TASKS: 'thpt_vc_tasks_v1',
  QUIZZES: 'thpt_vc_quizzes_v1',
  RESULTS: 'thpt_vc_quiz_results_v1',
  ANNOUNCEMENTS: 'thpt_vc_announcements_v1',
  PROFILE: 'thpt_vc_profile_v1',
  PRESENTATION: 'thpt_vc_presentation_mode_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [presentationMode, setPresentationMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.PRESENTATION) === 'true';
    } catch {
      return false;
    }
  });

  const [profile, setProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return saved ? JSON.parse(saved) : INITIAL_PROFILE;
    } catch {
      return INITIAL_PROFILE;
    }
  });

  const [lessons, setLessons] = useState<Lesson[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LESSONS);
      return saved ? JSON.parse(saved) : INITIAL_LESSONS;
    } catch {
      return INITIAL_LESSONS;
    }
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TASKS);
      return saved ? JSON.parse(saved) : INITIAL_TASKS;
    } catch {
      return INITIAL_TASKS;
    }
  });

  const [quizzes, setQuizzes] = useState<Quiz[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.QUIZZES);
      return saved ? JSON.parse(saved) : INITIAL_QUIZZES;
    } catch {
      return INITIAL_QUIZZES;
    }
  });

  const [quizResults, setQuizResults] = useState<QuizResult[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RESULTS);
      return saved ? JSON.parse(saved) : [
        {
          id: 'res-sample-1',
          quizId: 'quiz-1',
          quizTitle: 'Bài kiểm tra trắc nghiệm: Thông tin và Dữ liệu',
          score: 10,
          correctCount: 4,
          totalQuestions: 4,
          completedAt: '2026-09-17 20:15',
          answers: { 'q1-1': 1, 'q1-2': 0, 'q1-3': 2, 'q1-4': 1 }
        }
      ];
    } catch {
      return [];
    }
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
      return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
    } catch {
      return INITIAL_ANNOUNCEMENTS;
    }
  });

  const [classSamples] = useState<StudentProgressSample[]>(INITIAL_CLASS_SAMPLES);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.LESSONS, JSON.stringify(lessons));
    } catch (e) {
      console.error(e);
    }
  }, [lessons]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    } catch (e) {
      console.error(e);
    }
  }, [tasks]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(quizzes));
    } catch (e) {
      console.error(e);
    }
  }, [quizzes]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(quizResults));
    } catch (e) {
      console.error(e);
    }
  }, [quizResults]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(announcements));
    } catch (e) {
      console.error(e);
    }
  }, [announcements]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error(e);
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRESENTATION, String(presentationMode));
    } catch (e) {
      console.error(e);
    }
  }, [presentationMode]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const togglePresentationMode = () => {
    setPresentationMode(prev => {
      const next = !prev;
      showToast(next ? 'Đã bật chế độ trình chiếu / font chữ lớn' : 'Đã chuyển về chế độ tiêu chuẩn');
      return next;
    });
  };

  // Lesson functions
  const updateLessonStatus = (id: string, status: Status, progress?: number) => {
    setLessons(prev => prev.map(l => {
      if (l.id === id) {
        const p = progress !== undefined ? progress : (status === 'completed' ? 100 : (status === 'in_progress' ? 50 : 0));
        return { ...l, status, progressPercent: p };
      }
      return l;
    }));
    showToast(`Đã cập nhật trạng thái bài học thành công!`);
  };

  const saveLesson = (lesson: Lesson) => {
    setLessons(prev => {
      const exists = prev.some(l => l.id === lesson.id);
      if (exists) {
        return prev.map(l => l.id === lesson.id ? lesson : l);
      } else {
        return [lesson, ...prev];
      }
    });
    showToast(`Đã lưu bài học thành công!`);
  };

  const deleteLesson = (id: string) => {
    setLessons(prev => prev.filter(l => l.id !== id));
    showToast(`Đã xóa bài học.`);
  };

  // Task functions
  const updateTaskStatus = (id: string, status: Status, submission?: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        return {
          ...t,
          status,
          submission: submission !== undefined ? submission : t.submission,
          submittedAt: status === 'completed' ? new Date().toLocaleString('vi-VN') : t.submittedAt,
        };
      }
      return t;
    }));
    showToast(status === 'completed' ? 'Tuyệt vời! Bạn đã hoàn thành nhiệm vụ.' : 'Đã cập nhật trạng thái nhiệm vụ!');
  };

  const saveTask = (task: Task) => {
    setTasks(prev => {
      const exists = prev.some(t => t.id === task.id);
      if (exists) {
        return prev.map(t => t.id === task.id ? task : t);
      } else {
        return [task, ...prev];
      }
    });
    showToast(`Đã lưu nhiệm vụ thành công!`);
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    showToast(`Đã xóa nhiệm vụ.`);
  };

  // Quiz functions
  const saveQuizResult = (result: QuizResult) => {
    setQuizResults(prev => [result, ...prev]);
    showToast(`Đã lưu kết quả bài kiểm tra: ${result.score} điểm!`);
  };

  const saveQuiz = (quiz: Quiz) => {
    setQuizzes(prev => {
      const exists = prev.some(q => q.id === quiz.id);
      if (exists) {
        return prev.map(q => q.id === quiz.id ? quiz : q);
      } else {
        return [quiz, ...prev];
      }
    });
    showToast(`Đã lưu bộ câu hỏi Quiz thành công!`);
  };

  const deleteQuiz = (id: string) => {
    setQuizzes(prev => prev.filter(q => q.id !== id));
    showToast(`Đã xóa bài trắc nghiệm.`);
  };

  const saveQuizQuestion = (quizId: string, question: QuizQuestion) => {
    setQuizzes(prev => prev.map(q => {
      if (q.id === quizId) {
        const questionExists = q.questions.some(item => item.id === question.id);
        const updatedQuestions = questionExists
          ? q.questions.map(item => item.id === question.id ? question : item)
          : [...q.questions, question];
        return { ...q, questions: updatedQuestions };
      }
      return q;
    }));
    showToast(`Đã cập nhật câu hỏi trắc nghiệm!`);
  };

  const deleteQuizQuestion = (quizId: string, questionId: string) => {
    setQuizzes(prev => prev.map(q => {
      if (q.id === quizId) {
        return { ...q, questions: q.questions.filter(item => item.id !== questionId) };
      }
      return q;
    }));
    showToast(`Đã xóa câu hỏi.`);
  };

  // Announcements
  const saveAnnouncement = (announcement: Announcement) => {
    setAnnouncements(prev => {
      const exists = prev.some(a => a.id === announcement.id);
      if (exists) {
        return prev.map(a => a.id === announcement.id ? announcement : a);
      } else {
        return [announcement, ...prev];
      }
    });
    showToast(`Đã cập nhật thông báo của Cô Thủy!`);
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
    showToast(`Đã xóa thông báo.`);
  };

  // Profile
  const updateProfile = (data: Partial<StudentProfile>) => {
    setProfile(prev => ({ ...prev, ...data }));
    showToast(`Đã cập nhật thông tin học sinh.`);
  };

  // Reset to Defaults
  const resetToDefaults = () => {
    setLessons(INITIAL_LESSONS);
    setTasks(INITIAL_TASKS);
    setQuizzes(INITIAL_QUIZZES);
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    setProfile(INITIAL_PROFILE);
    setQuizResults([]);
    showToast(`Đã khôi phục dữ liệu mẫu ban đầu của Cô Phạm Thị Thủy!`);
  };

  return (
    <AppContext.Provider
      value={{
        lessons,
        tasks,
        quizzes,
        quizResults,
        announcements,
        profile,
        classSamples,
        activeTab,
        setActiveTab,
        selectedLessonId,
        setSelectedLessonId,
        selectedTaskId,
        setSelectedTaskId,
        selectedQuizId,
        setSelectedQuizId,
        presentationMode,
        togglePresentationMode,
        toastMessage,
        showToast,
        updateLessonStatus,
        saveLesson,
        deleteLesson,
        updateTaskStatus,
        saveTask,
        deleteTask,
        saveQuizResult,
        saveQuiz,
        deleteQuiz,
        saveQuizQuestion,
        deleteQuizQuestion,
        saveAnnouncement,
        deleteAnnouncement,
        updateProfile,
        resetToDefaults,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
