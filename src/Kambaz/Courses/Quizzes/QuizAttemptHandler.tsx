import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Quiz, QuizAttempt, QuizAnswer, QuizQuestion } from './client';
import { findQuizById, fetchQuizAttempts, submitQuizAttempt } from './client';
import QuizAttemptDetails from './QuizAttemptDetails';

interface RootState {
  accountReducer: {
    currentUser: {
      id: string;
    };
  };
}

const QuizAttemptHandler: React.FC = () => {
  const { quizId, courseId } = useParams<{ quizId: string; courseId: string }>();
  const currentUser = useSelector((state: RootState) => state.accountReducer.currentUser);
  const [attempts, setAttempts] = React.useState<QuizAttempt[]>([]);
  const [quiz, setQuiz] = React.useState<Quiz | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [answers, setAnswers] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    const fetchQuizAndAttempts = async () => {
      try {
        const [quizData, attemptsData] = await Promise.all([
          findQuizById(courseId!, quizId!),
          fetchQuizAttempts(quizId!, currentUser.id)
        ]);
        setQuiz(quizData);
        setAttempts(attemptsData);
      } catch (error) {
        setError('Failed to load quiz data');
        console.error('Error fetching quiz data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizAndAttempts();
  }, [quizId, courseId, currentUser.id]);

  const canTakeQuiz = (): boolean => {
    if (!quiz) return false;
    if (!quiz.multipleAttempts) return attempts.length === 0;
    return attempts.length < quiz.numberAttempts;
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleQuizSubmission = async (): Promise<void> => {
    try {
      if (!canTakeQuiz()) {
        throw new Error('Maximum attempts reached');
      }

      if (!quiz) {
        throw new Error('Quiz not found');
      }

      const quizAnswers: QuizAnswer[] = quiz.questions.map(question => {
        const studentAnswer = answers[question._id] || '';
        const isCorrect = question.type === 'fillInTheBlank' 
          ? question.answers?.includes(studentAnswer) || false
          : question.answer === studentAnswer;
        
        return {
          questionId: question._id,
          studentAnswer,
          isCorrect,
          correctAnswer: question.type === 'fillInTheBlank' 
            ? question.answers?.join(', ') || ''
            : question.answer || ''
        };
      });

      const result = await submitQuizAttempt(quizId!, currentUser.id, quizAnswers);
      setAttempts([...attempts, result]);
      setAnswers({});
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Failed to submit quiz');
      }
      console.error('Error submitting quiz:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  return (
    <div className="quiz-attempt-handler">
      {canTakeQuiz() ? (
        <div>
          <h3>{quiz.title}</h3>
          <p>Attempt {attempts.length + 1} of {quiz.numberAttempts}</p>
          <div className="quiz-content">
            {quiz.questions.map((question, index) => (
              <div key={question._id} className="question-item">
                <h4>Question {index + 1} ({question.points} points)</h4>
                <p>{question.question}</p>
                {question.type === 'multipleChoice' && question.choices && (
                  <div className="choices">
                    {question.choices.map(choice => (
                      <label key={choice._id}>
                        <input
                          type="radio"
                          name={`question-${question._id}`}
                          value={choice.title}
                          checked={answers[question._id] === choice.title}
                          onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                        />
                        {choice.title}
                      </label>
                    ))}
                  </div>
                )}
                {question.type === 'trueFalse' && (
                  <div className="choices">
                    <label>
                      <input
                        type="radio"
                        name={`question-${question._id}`}
                        value="true"
                        checked={answers[question._id] === "true"}
                        onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                      />
                      True
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`question-${question._id}`}
                        value="false"
                        checked={answers[question._id] === "false"}
                        onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                      />
                      False
                    </label>
                  </div>
                )}
                {question.type === 'fillInTheBlank' && (
                  <input
                    type="text"
                    value={answers[question._id] || ''}
                    onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                    placeholder="Enter your answer"
                  />
                )}
              </div>
            ))}
            <button 
              onClick={handleQuizSubmission}
              className="submit-quiz-btn"
              disabled={!canTakeQuiz()}
            >
              Submit Quiz
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3>Quiz Attempts Exhausted</h3>
          <p>You have completed all available attempts for this quiz.</p>
          {attempts.length > 0 && (
            <QuizAttemptDetails attempt={attempts[attempts.length - 1]} />
          )}
        </div>
      )}
    </div>
  );
};

export default QuizAttemptHandler; 