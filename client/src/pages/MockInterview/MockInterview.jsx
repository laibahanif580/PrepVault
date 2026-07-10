import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Clock,
  CheckCircle,
  AlertCircle,
  Brain,
  Target,
  Award,
  TrendingUp,
  SkipForward,
  RefreshCw,
  X,
  FileText,
  HelpCircle,
  Mic,
  Send,
  MessageSquare,
  BarChart3,
  Zap,
  BookOpen,
} from "lucide-react";

import bg from "../../assets/images/greeting.avif";

// Mock interview questions
const mockQuestions = [
  {
    id: 1,
    category: "Technical",
    difficulty: "Medium",
    question: "Explain the difference between let, const, and var in JavaScript. When would you use each?",
    options: [
      "A: var is block-scoped, let and const are function-scoped",
      "B: var is function-scoped, let and const are block-scoped",
      "C: All are block-scoped",
      "D: All are function-scoped",
    ],
    correctAnswer: 1,
    explanation: "var is function-scoped and can be redeclared, while let and const are block-scoped. Use const for values that shouldn't change, let for values that change, and avoid var in modern JavaScript.",
    sampleAnswer: "var is function-scoped and can be redeclared, while let and const are block-scoped. Use const for immutable values, let for mutable values, and avoid var in modern JavaScript.",
  },
  {
    id: 2,
    category: "Technical",
    difficulty: "Medium",
    question: "What is the virtual DOM and how does it work in React?",
    options: [
      "A: A copy of the real DOM stored in memory",
      "B: A React-specific HTML parser",
      "C: A JavaScript library for DOM manipulation",
      "D: A CSS framework",
    ],
    correctAnswer: 0,
    explanation: "The virtual DOM is a lightweight JavaScript representation of the real DOM. When state changes, React creates a new virtual DOM tree, compares it with the previous one using a diffing algorithm, and only updates the changed parts in the real DOM.",
    sampleAnswer: "The virtual DOM is a lightweight copy of the real DOM. React uses it to efficiently update the UI by comparing changes and only updating what's necessary.",
  },
  {
    id: 3,
    category: "Technical",
    difficulty: "Hard",
    question: "Explain the event loop in JavaScript. How does it handle asynchronous operations?",
    options: [
      "A: It runs all code in parallel",
      "B: It manages callbacks and promises in a queue",
      "C: It stops execution until all tasks complete",
      "D: It only works with synchronous code",
    ],
    correctAnswer: 1,
    explanation: "The event loop is a mechanism that handles asynchronous operations in JavaScript. It continuously checks the call stack and task queue. When the call stack is empty, it processes tasks from the queue, prioritizing microtasks over macrotasks.",
    sampleAnswer: "The event loop manages asynchronous operations by using a call stack and task queue. It processes microtasks (promises) before macrotasks (setTimeout), ensuring non-blocking execution.",
  },
  {
    id: 4,
    category: "Behavioral",
    difficulty: "Easy",
    question: "Tell me about a time you faced a challenging problem and how you solved it.",
    options: [
      "A: I ignored it and hoped it would go away",
      "B: I asked for help immediately without trying",
      "C: I analyzed the problem, researched solutions, and implemented a fix",
      "D: I blamed others for the problem",
    ],
    correctAnswer: 2,
    explanation: "Employers want to see problem-solving skills. STAR method: Situation, Task, Action, Result. Show how you took ownership and found a solution.",
    sampleAnswer: "In my previous project, we faced performance issues with our API. I analyzed the bottlenecks, implemented caching strategies, and optimized database queries, resulting in a 40% improvement in response time.",
  },
  {
    id: 5,
    category: "Behavioral",
    difficulty: "Medium",
    question: "How do you handle feedback and criticism in a professional setting?",
    options: [
      "A: I get defensive and argue back",
      "B: I ignore it completely",
      "C: I listen actively, ask clarifying questions, and create action plans",
      "D: I only accept positive feedback",
    ],
    correctAnswer: 2,
    explanation: "Employers value growth mindset. Show openness to feedback, willingness to learn, and ability to improve based on constructive criticism.",
    sampleAnswer: "I welcome feedback as an opportunity to grow. I listen actively, ask clarifying questions, and create action plans to improve. For example, when a senior developer suggested better code organization, I refactored my code and learned more about design patterns.",
  },
  {
    id: 6,
    category: "HR",
    difficulty: "Easy",
    question: "Where do you see yourself in 5 years?",
    options: [
      "A: In a completely different field",
      "B: As a technical leader mentoring others and contributing to impactful projects",
      "C: Still in the same position",
      "D: I don't plan ahead",
    ],
    correctAnswer: 1,
    explanation: "Employers want to see ambition and alignment with their company's growth. Show that you're committed to growth and development within the field.",
    sampleAnswer: "In 5 years, I see myself as a technical leader who mentors others, contributes to impactful projects, and continues learning. I want to be proficient in system design and architecture while helping my team grow.",
  },
];

function MockInterview() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = mockQuestions[currentQuestionIndex];
  const categories = ["All", "Technical", "Behavioral", "HR"];

  const filteredQuestions = selectedCategory === "All"
    ? mockQuestions
    : mockQuestions.filter(q => q.category === selectedCategory);

  const totalQuestions = filteredQuestions.length;
  const answeredCount = Object.keys(selectedAnswers).length;
  const progress = (answeredCount / totalQuestions) * 100;

  const handleSelectAnswer = (optionIndex) => {
    if (isAnswered) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIndex,
    }));
    setIsAnswered(true);
  };

  const handleShowFeedback = () => {
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowFeedback(false);
      setIsAnswered(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowFeedback(false);
      const prevAnswer = selectedAnswers[filteredQuestions[currentQuestionIndex - 1]?.id];
      setIsAnswered(prevAnswer !== undefined);
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setShowFeedback(false);
    setIsAnswered(false);
    setQuizCompleted(false);
  };

  const calculateScore = () => {
    let correct = 0;
    filteredQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: filteredQuestions.length,
      percentage: Math.round((correct / filteredQuestions.length) * 100),
    };
  };

  const score = calculateScore();
  const isOptionSelected = selectedAnswers[currentQuestion?.id] !== undefined;
  const selectedOption = isOptionSelected ? selectedAnswers[currentQuestion?.id] : null;

  if (quizCompleted) {
    return (
      <section
        className="relative min-h-screen overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="absolute inset-0 bg-[#090909]/85" />
        <div className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-[#C8A96A]/10 blur-[150px]" />
        <div className="absolute right-0 bottom-0 h-[450px] w-[450px] rounded-full bg-white/5 blur-[150px]" />

        <div className="relative px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 md:p-10 lg:p-12 backdrop-blur-xl"
            >
              <div className="mx-auto mb-4 sm:mb-6 h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-full bg-[#C8A96A]/20 flex items-center justify-center">
                {score.percentage >= 70 ? (
                  <Award size={32} sm:size={40} md:size={48} className="text-[#C8A96A]" />
                ) : score.percentage >= 40 ? (
                  <Brain size={32} sm:size={40} md:size={48} className="text-[#C8A96A]" />
                ) : (
                  <BookOpen size={32} sm:size={40} md:size={48} className="text-[#C8A96A]" />
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white">Quiz Complete!</h2>
              <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-400">Here's how you performed</p>

              <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-3 sm:gap-4">
                <div className="rounded-xl border border-white/10 bg-black/30 p-3 sm:p-4">
                  <p className="text-2xl sm:text-3xl font-bold text-[#C8A96A]">{score.correct}</p>
                  <p className="text-[10px] sm:text-xs text-gray-400">Correct</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/30 p-3 sm:p-4">
                  <p className="text-2xl sm:text-3xl font-bold text-white">{score.total - score.correct}</p>
                  <p className="text-[10px] sm:text-xs text-gray-400">Incorrect</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/30 p-3 sm:p-4">
                  <p className="text-2xl sm:text-3xl font-bold text-white">{score.percentage}%</p>
                  <p className="text-[10px] sm:text-xs text-gray-400">Score</p>
                </div>
              </div>

              <div className="mt-4 sm:mt-6 h-2 sm:h-3 w-full rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-[#C8A96A] transition-all duration-500"
                  style={{ width: `${score.percentage}%` }}
                />
              </div>

              <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-3">
                <button
                  onClick={handleRestart}
                  className="flex items-center gap-2 rounded-xl bg-[#C8A96A] px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-black transition hover:scale-105"
                >
                  <RefreshCw size={16} sm:size={18} />
                  Retry Quiz
                </button>
                <button
                  onClick={() => window.location.href = "/dashboard"}
                  className="flex items-center gap-2 rounded-xl border border-white/10 px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base text-gray-400 transition hover:bg-white/5 hover:text-white"
                >
                  Back to Dashboard
                </button>
              </div>

              <div className="mt-6 sm:mt-8 text-left">
                <h3 className="text-xs sm:text-sm font-medium text-[#C8A96A]">Review Your Answers</h3>
                <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3 max-h-48 sm:max-h-60 overflow-y-auto">
                  {filteredQuestions.map((q, index) => {
                    const userAnswer = selectedAnswers[q.id];
                    const isCorrect = userAnswer === q.correctAnswer;
                    return (
                      <div
                        key={q.id}
                        className={`flex items-center justify-between rounded-xl border p-2 sm:p-3 ${
                          isCorrect
                            ? "border-green-500/30 bg-green-500/10"
                            : "border-red-500/30 bg-red-500/10"
                        }`}
                      >
                        <span className="text-xs sm:text-sm text-gray-300 truncate flex-1">
                          {index + 1}. {q.question.substring(0, 40)}...
                        </span>
                        <span className={`text-xs sm:text-sm font-semibold flex-shrink-0 ml-2 ${
                          isCorrect ? "text-green-400" : "text-red-400"
                        }`}>
                          {isCorrect ? "✓ Correct" : "✗ Incorrect"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 bg-[#090909]/85" />
      <div className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-[#C8A96A]/10 blur-[150px]" />
      <div className="absolute right-0 bottom-0 h-[450px] w-[450px] rounded-full bg-white/5 blur-[150px]" />

      <div className="relative px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="uppercase tracking-[0.2rem] sm:tracking-[0.3rem] text-[#C8A96A] text-xs sm:text-sm">
              PrepVault
            </p>
            <h1 className="hero-font mt-2 sm:mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic text-white">
              Mock Interview
            </h1>
            <p className="mt-2 sm:mt-4 text-sm sm:text-base text-gray-400">
              Practice with AI-powered interview questions.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 sm:px-6 py-2 sm:py-3 backdrop-blur-xl">
            <p className="text-[10px] sm:text-xs text-gray-400">Progress</p>
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-base sm:text-lg font-semibold text-white">
                {answeredCount}/{totalQuestions}
              </span>
              <div className="h-2 w-16 sm:w-24 rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-[#C8A96A] transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-4 sm:mt-6 flex flex-wrap gap-3 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 sm:px-6 py-2 sm:py-3 backdrop-blur-xl">
            <Brain size={16} sm:size={20} className="text-[#C8A96A]" />
            <div>
              <p className="text-xs sm:text-sm font-semibold text-white">{totalQuestions}</p>
              <p className="text-[10px] sm:text-xs text-gray-400">Total</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 sm:px-6 py-2 sm:py-3 backdrop-blur-xl">
            <Target size={16} sm:size={20} className="text-[#C8A96A]" />
            <div>
              <p className="text-xs sm:text-sm font-semibold text-white">
                {currentQuestion?.difficulty || "N/A"}
              </p>
              <p className="text-[10px] sm:text-xs text-gray-400">Difficulty</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 sm:px-6 py-2 sm:py-3 backdrop-blur-xl">
            <Award size={16} sm:size={20} className="text-[#C8A96A]" />
            <div>
              <p className="text-xs sm:text-sm font-semibold text-white">{answeredCount}</p>
              <p className="text-[10px] sm:text-xs text-gray-400">Answered</p>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentQuestionIndex(0);
                setShowFeedback(false);
                setIsAnswered(false);
              }}
              className={`whitespace-nowrap rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm transition ${
                selectedCategory === category
                  ? "bg-[#C8A96A] text-black"
                  : "border border-white/10 bg-white/5 text-gray-400 hover:border-[#C8A96A]/30"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="mt-6 sm:mt-8">
          {/* Question & Answer - Full Width on Mobile */}
          <div className="w-full space-y-4">
            {/* Question Display */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 md:p-6 backdrop-blur-xl">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#C8A96A]/20 px-2 sm:px-3 py-0.5 text-[10px] sm:text-xs text-[#C8A96A]">
                      {currentQuestion?.category}
                    </span>
                    <span className={`rounded-full px-2 sm:px-3 py-0.5 text-[10px] sm:text-xs ${
                      currentQuestion?.difficulty === "Hard"
                        ? "bg-red-500/20 text-red-400"
                        : currentQuestion?.difficulty === "Medium"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-green-500/20 text-green-400"
                    }`}>
                      {currentQuestion?.difficulty}
                    </span>
                    <span className="text-[10px] sm:text-xs text-gray-500">
                      {currentQuestionIndex + 1}/{totalQuestions}
                    </span>
                  </div>
                  <h2 className="mt-2 sm:mt-3 text-base sm:text-lg md:text-xl font-semibold text-white">
                    {currentQuestion?.question}
                  </h2>
                </div>
                {/* ✅ Navigation Buttons - Always Visible */}
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={handlePrevQuestion}
                    disabled={currentQuestionIndex === 0}
                    className="rounded-lg border border-white/10 p-1.5 sm:p-2 text-gray-400 transition hover:border-[#C8A96A]/30 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={16} sm:size={18} />
                  </button>
                  <button
                    onClick={handleNextQuestion}
                    disabled={currentQuestionIndex === totalQuestions - 1 && !isAnswered}
                    className="rounded-lg border border-white/10 p-1.5 sm:p-2 text-gray-400 transition hover:border-[#C8A96A]/30 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight size={16} sm:size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Options */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 md:p-6 backdrop-blur-xl">
              <h3 className="text-xs sm:text-sm font-medium text-gray-400">Select your answer</h3>
              <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
                {currentQuestion?.options.map((option, index) => {
                  const isSelected = selectedOption === index;
                  const isCorrect = isSelected && index === currentQuestion.correctAnswer;
                  const isWrong = isSelected && index !== currentQuestion.correctAnswer;
                  const showCorrect = showFeedback && index === currentQuestion.correctAnswer;

                  let borderColor = "border-white/10";
                  let bgColor = "hover:bg-white/5";
                  if (isSelected && !showFeedback) {
                    borderColor = "border-[#C8A96A]";
                    bgColor = "bg-[#C8A96A]/10";
                  }
                  if (showFeedback) {
                    if (isCorrect || showCorrect) {
                      borderColor = "border-green-500";
                      bgColor = "bg-green-500/10";
                    } else if (isWrong) {
                      borderColor = "border-red-500";
                      bgColor = "bg-red-500/10";
                    }
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleSelectAnswer(index)}
                      disabled={isAnswered || showFeedback}
                      className={`w-full rounded-xl border p-3 sm:p-4 text-left text-sm sm:text-base text-gray-300 transition ${borderColor} ${bgColor} ${
                        !isAnswered && !showFeedback ? "hover:border-[#C8A96A]/50" : ""
                      } ${isAnswered || showFeedback ? "cursor-default" : "cursor-pointer"}`}
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        <span className="text-xs sm:text-sm font-medium text-gray-500">
                          {String.fromCharCode(65 + index)}.
                        </span>
                        <span className="text-sm sm:text-base">{option}</span>
                        {showFeedback && (isCorrect || showCorrect) && (
                          <CheckCircle size={16} sm:size={18} className="ml-auto text-green-400" />
                        )}
                        {showFeedback && isWrong && (
                          <X size={16} sm:size={18} className="ml-auto text-red-400" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit & Feedback */}
            <AnimatePresence mode="wait">
              {isAnswered && !showFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <button
                    onClick={handleShowFeedback}
                    className="flex-1 rounded-xl bg-[#C8A96A] py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-black transition hover:scale-[1.02]"
                  >
                    Check Answer
                  </button>
                </motion.div>
              )}

              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-[#C8A96A]/30 bg-[#C8A96A]/5 p-4 sm:p-5 md:p-6 backdrop-blur-xl"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                    {selectedOption === currentQuestion.correctAnswer ? (
                      <CheckCircle size={18} sm:size={20} className="flex-shrink-0 text-green-400" />
                    ) : (
                      <AlertCircle size={18} sm:size={20} className="flex-shrink-0 text-red-400" />
                    )}
                    <div>
                      <h3 className={`text-sm sm:text-base font-semibold ${
                        selectedOption === currentQuestion.correctAnswer
                          ? "text-green-400"
                          : "text-red-400"
                      }`}>
                        {selectedOption === currentQuestion.correctAnswer
                          ? "✅ Correct!"
                          : `❌ Incorrect. The correct answer is ${String.fromCharCode(65 + currentQuestion.correctAnswer)}`}
                      </h3>
                      <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-300">
                        {currentQuestion.explanation}
                      </p>
                      <div className="mt-2 sm:mt-3 rounded-xl border border-white/10 bg-black/30 p-3 sm:p-4">
                        <p className="text-xs sm:text-sm text-gray-400">
                          <span className="text-[#C8A96A]">💡 Sample Answer:</span>{" "}
                          {currentQuestion.sampleAnswer}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Sidebar - Below Question on Mobile */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Question List */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 md:p-6 backdrop-blur-xl">
            <h3 className="text-sm sm:text-base font-semibold text-white">Questions</h3>
            <div className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2 max-h-48 sm:max-h-60 overflow-y-auto">
              {filteredQuestions.map((q, index) => {
                const isAnswered = selectedAnswers[q.id] !== undefined;
                const isCurrent = currentQuestionIndex === index;
                const isCorrect = isAnswered && selectedAnswers[q.id] === q.correctAnswer;
                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentQuestionIndex(index);
                      setShowFeedback(false);
                      setIsAnswered(selectedAnswers[q.id] !== undefined);
                    }}
                    className={`flex items-center gap-2 sm:gap-3 rounded-xl p-2 sm:p-3 text-left text-xs sm:text-sm transition w-full ${
                      isCurrent
                        ? "bg-[#C8A96A]/20 border border-[#C8A96A]/30"
                        : "hover:bg-white/5"
                    }`}
                  >
                    <span className={`text-[10px] sm:text-xs flex-shrink-0 ${
                      isCorrect ? "text-green-400" : isAnswered ? "text-red-400" : "text-gray-500"
                    }`}>
                      {isCorrect ? "✓" : isAnswered ? "✗" : index + 1}
                    </span>
                    <span className="flex-1 truncate text-gray-300">
                      {q.question}
                    </span>
                    <span className={`text-[10px] sm:text-xs flex-shrink-0 ${
                      q.difficulty === "Hard"
                        ? "text-red-400"
                        : q.difficulty === "Medium"
                        ? "text-yellow-400"
                        : "text-green-400"
                    }`}>
                      {q.difficulty}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tips */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 md:p-6 backdrop-blur-xl">
            <div className="flex items-center gap-2">
              <HelpCircle size={16} sm:size={18} className="text-[#C8A96A]" />
              <h3 className="text-sm sm:text-base font-semibold text-white">Tips</h3>
            </div>
            <ul className="mt-2 sm:mt-3 space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-400">
              <li className="flex items-start gap-1.5 sm:gap-2">
                <Sparkles size={12} sm:size={14} className="mt-0.5 flex-shrink-0 text-[#C8A96A]" />
                Read each question carefully
              </li>
              <li className="flex items-start gap-1.5 sm:gap-2">
                <Sparkles size={12} sm:size={14} className="mt-0.5 flex-shrink-0 text-[#C8A96A]" />
                Think before selecting an answer
              </li>
              <li className="flex items-start gap-1.5 sm:gap-2">
                <Sparkles size={12} sm:size={14} className="mt-0.5 flex-shrink-0 text-[#C8A96A]" />
                Review the explanation after each question
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MockInterview;