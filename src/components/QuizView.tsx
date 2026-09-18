import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Quiz, QuizQuestion } from '../types';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowLeft, 
  HelpCircle, 
  Clock, 
  ArrowRight,
  Info,
  Sparkles,
  Trophy
} from 'lucide-react';

export const QuizView: React.FC = () => {
  const { 
    quizzes, 
    selectedQuizId, 
    setSelectedQuizId, 
    saveQuizResult, 
    quizResults, 
    setActiveTab, 
    presentationMode 
  } = useApp();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);

  const activeQuiz = quizzes.find(q => q.id === selectedQuizId);

  const handleStartQuiz = (quizId: string) => {
    setSelectedQuizId(quizId);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setIsQuizCompleted(false);
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    // If already answered this question, don't allow changing to see immediate feedback
    if (selectedAnswers[questionId] !== undefined) return;

    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (!activeQuiz) return;
    setShowExplanation(false);
    if (currentQuestionIndex + 1 < activeQuiz.questions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Complete quiz
      handleFinishQuiz();
    }
  };

  const handleFinishQuiz = () => {
    if (!activeQuiz) return;
    setIsQuizCompleted(true);

    let correctCount = 0;
    activeQuiz.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount += 1;
      }
    });

    const score = Number(((correctCount / activeQuiz.questions.length) * 10).toFixed(1));

    saveQuizResult({
      id: `result-${Date.now()}`,
      quizId: activeQuiz.id,
      quizTitle: activeQuiz.title,
      score,
      correctCount,
      totalQuestions: activeQuiz.questions.length,
      completedAt: new Date().toLocaleString('vi-VN'),
      answers: selectedAnswers
    });
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setIsQuizCompleted(false);
  };

  return (
    <div className={`space-y-6 ${presentationMode ? 'text-lg' : ''}`}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">
            <Award className="w-4 h-4" />
            <span>Trắc nghiệm Tin học 10 • THPT Vĩnh Cửu</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Khu vực bài tập & Trắc nghiệm (Quiz)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Luyện tập củng cố kiến thức các bài học. Tự động chấm điểm và phản hồi đáp án chi tiết.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeQuiz && (
            <button
              onClick={() => setSelectedQuizId(null)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Đổi bài Quiz</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('overview')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <span>Về tổng quan</span>
          </button>
        </div>
      </div>

      {/* Note badge */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 flex items-center gap-3 text-xs sm:text-sm text-blue-800">
        <Info className="w-5 h-5 text-blue-600 shrink-0" />
        <span>
          <strong>Dữ liệu mẫu - giáo viên có thể chỉnh sửa:</strong> Thầy cô có thể thêm/sửa/xóa câu hỏi trong mục "Quản trị giáo viên" bất kỳ lúc nào.
        </span>
      </div>

      {/* Active Quiz Player OR List of Quizzes */}
      {!activeQuiz ? (
        /* Quiz Selection Cards */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {quizzes.map((quiz) => {
            const previousResult = quizResults.find(r => r.quizId === quiz.id);

            return (
              <div
                key={quiz.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all p-5 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 line-clamp-1">
                      {quiz.topicTitle}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold flex items-center gap-1 shrink-0">
                      <Clock className="w-3.5 h-3.5" />
                      {quiz.timeLimitMinutes} phút
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors mt-1">
                    {quiz.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {quiz.description}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <HelpCircle className="w-4 h-4 text-slate-400" />
                    <span>Số lượng: {quiz.questions.length} câu trắc nghiệm</span>
                  </div>

                  {/* Previous result if any */}
                  {previousResult && (
                    <div className="mt-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center justify-between">
                      <span>Điểm cao nhất: <strong>{previousResult.score}/10</strong></span>
                      <span className="text-emerald-600">({previousResult.correctCount}/{previousResult.totalQuestions} câu đúng)</span>
                    </div>
                  )}
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    {previousResult ? 'Đã làm trước đó' : 'Chưa làm'}
                  </span>

                  <button
                    onClick={() => handleStartQuiz(quiz.id)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-xs hover:shadow transition-all cursor-pointer"
                  >
                    <span>{previousResult ? 'Làm lại' : 'Bắt đầu làm bài'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : isQuizCompleted ? (
        /* Quiz Summary Screen */
        (() => {
          let correctCount = 0;
          activeQuiz.questions.forEach((q) => {
            if (selectedAnswers[q.id] === q.correctAnswer) {
              correctCount += 1;
            }
          });
          const score = Number(((correctCount / activeQuiz.questions.length) * 10).toFixed(1));
          const isPassed = score >= 5.0;

          return (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 text-center max-w-2xl mx-auto shadow-md space-y-6">
              <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
                <Trophy className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Kết quả bài kiểm tra
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
                  {activeQuiz.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Môn Tin học 10 • Giáo viên: Cô Phạm Thị Thủy
                </p>
              </div>

              {/* Score Display */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <div className="text-5xl font-black text-amber-600 tracking-tight">
                  {score} <span className="text-2xl font-bold text-slate-400">/ 10</span>
                </div>
                <div className="mt-2 text-sm font-semibold text-slate-700">
                  Trả lời đúng: <strong className="text-emerald-600">{correctCount}</strong> / {activeQuiz.questions.length} câu
                </div>

                <div className="mt-3 text-xs sm:text-sm text-slate-600 italic">
                  {score === 10
                    ? 'Xuất sắc! Em đã trả lời đúng tuyệt đối tất cả các câu hỏi.'
                    : score >= 8
                      ? 'Rất giỏi! Em đã nắm rất vững kiến thức bài học.'
                      : isPassed
                        ? 'Khá tốt! Hãy xem lại các câu chưa đúng để hoàn thiện hơn nhé.'
                        : 'Em hãy ôn tập lại lý thuyết bài học và thử làm lại nhé!'}
                </div>
              </div>

              {/* Detailed answers review */}
              <div className="text-left space-y-3">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Chi tiết từng câu hỏi:
                </h4>
                <div className="space-y-3">
                  {activeQuiz.questions.map((q, idx) => {
                    const studentAns = selectedAnswers[q.id];
                    const isCorrect = studentAns === q.correctAnswer;

                    return (
                      <div
                        key={q.id}
                        className={`p-3.5 rounded-xl border text-xs sm:text-sm ${
                          isCorrect
                            ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                            : 'bg-red-50/70 border-red-200 text-red-950'
                        }`}
                      >
                        <div className="flex items-start gap-2 font-bold mb-1">
                          {isCorrect ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                          )}
                          <span>Câu {idx + 1}: {q.question}</span>
                        </div>
                        <div className="ml-6 space-y-1 text-xs">
                          <div>Em chọn: <strong>{studentAns !== undefined ? q.options[studentAns] : 'Chưa chọn'}</strong></div>
                          {!isCorrect && (
                            <div className="text-emerald-700 font-semibold">
                              Đáp án đúng: {q.options[q.correctAnswer]}
                            </div>
                          )}
                          <div className="text-slate-600 bg-white/60 p-2 rounded-lg mt-1 border border-slate-200/50">
                            <strong>Giải thích:</strong> {q.explanation}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-slate-200">
                <button
                  onClick={handleRestartQuiz}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Làm lại bài này</span>
                </button>

                <button
                  onClick={() => setSelectedQuizId(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors cursor-pointer"
                >
                  Chọn bài Quiz khác
                </button>

                <button
                  onClick={() => setActiveTab('progress')}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  Xem bảng tiến độ học tập &rarr;
                </button>
              </div>
            </div>
          );
        })()
      ) : (
        /* Quiz Question Active Player */
        (() => {
          const currentQuestion: QuizQuestion = activeQuiz.questions[currentQuestionIndex];
          const hasAnsweredCurrent = selectedAnswers[currentQuestion.id] !== undefined;
          const selectedOptionIndex = selectedAnswers[currentQuestion.id];
          const isCorrect = selectedOptionIndex === currentQuestion.correctAnswer;

          return (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 max-w-3xl mx-auto shadow-sm space-y-6">
              {/* Progress bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-600">
                  <span className="flex items-center gap-1.5 text-blue-600">
                    <Sparkles className="w-4 h-4" />
                    {activeQuiz.title}
                  </span>
                  <span>
                    Câu hỏi {currentQuestionIndex + 1} / {activeQuiz.questions.length}
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-amber-500 h-2.5 rounded-full transition-all duration-300"
                    style={{
                      width: `${((currentQuestionIndex + 1) / activeQuiz.questions.length) * 100}%`
                    }}
                  />
                </div>
              </div>

              {/* Question Text */}
              <div className="py-2">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
                  Câu hỏi {currentQuestionIndex + 1}:
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                  {currentQuestion.question}
                </h3>
              </div>

              {/* Options list */}
              <div className="space-y-3">
                {currentQuestion.options.map((option, idx) => {
                  let optionStyle = 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800';

                  if (hasAnsweredCurrent) {
                    if (idx === currentQuestion.correctAnswer) {
                      // Correct option
                      optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-400';
                    } else if (idx === selectedOptionIndex) {
                      // Student selected wrong
                      optionStyle = 'bg-red-50 border-red-500 text-red-950 font-bold ring-2 ring-red-300';
                    } else {
                      optionStyle = 'bg-slate-50/50 border-slate-200 text-slate-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={hasAnsweredCurrent}
                      onClick={() => handleSelectOption(currentQuestion.id, idx)}
                      className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-start justify-between gap-3 text-sm sm:text-base cursor-pointer disabled:cursor-default ${optionStyle}`}
                    >
                      <div className="flex-1 font-medium leading-relaxed">
                        {option}
                      </div>

                      {hasAnsweredCurrent && (
                        <div className="shrink-0 mt-0.5">
                          {idx === currentQuestion.correctAnswer ? (
                            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                          ) : idx === selectedOptionIndex ? (
                            <XCircle className="w-6 h-6 text-red-600" />
                          ) : null}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Immediate Feedback & Explanation */}
              {hasAnsweredCurrent && (
                <div
                  className={`p-4 sm:p-5 rounded-2xl border text-sm animate-in fade-in slide-in-from-top-2 duration-200 ${
                    isCorrect
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-red-50 border-red-200 text-red-900'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold mb-1 text-base">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span>Chính xác! Em làm rất tốt.</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-red-600" />
                        <span>Chưa chính xác! Đáp án đúng là phương án {String.fromCharCode(65 + currentQuestion.correctAnswer)}.</span>
                      </>
                    )}
                  </div>
                  <p className="mt-2 text-xs sm:text-sm text-slate-700 bg-white/70 p-3 rounded-xl border border-slate-200">
                    <strong>Giải thích chi tiết:</strong> {currentQuestion.explanation}
                  </p>
                </div>
              )}

              {/* Next Question Navigation */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <div className="text-xs text-slate-500">
                  {hasAnsweredCurrent ? 'Bấm tiếp tục để sang câu tiếp theo' : 'Vui lòng chọn 1 phương án trả lời'}
                </div>

                {hasAnsweredCurrent && (
                  <button
                    onClick={handleNextQuestion}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer animate-pulse"
                  >
                    <span>
                      {currentQuestionIndex + 1 < activeQuiz.questions.length
                        ? 'Câu tiếp theo'
                        : 'Xem kết quả bài Quiz'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })()
      )}
    </div>
  );
};
