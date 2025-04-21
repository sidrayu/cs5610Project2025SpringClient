/**
 * QuizResults.tsx
 * 
 * Step 3: Show results
 * - Shows total score
 * - Shows each answer
 * - Uses colors to show right/wrong
 * 
 * What it shows:
 * - When quiz was taken
 * - Total score
 * - Each answer and if it's right
 */

import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import GreenCheckmark from './GreenCheckmark';
import './quizstyle.css';
import { QuizAttempt, QuizAnswer } from './client';

interface QuizResult {
  questionId: string;
  studentAnswer: string;
  isCorrect: boolean;
  correctAnswer: string;
}

interface RootState {
  accountReducer: {
    currentUser: {
      id: string;
    };
  };
}

interface QuizResultsProps {
  attempt: QuizAttempt;
}

/**
 * QuizResults
 * 
 * What it does:
 * - Takes quiz data
 * - Shows results nicely
 * - Uses colors to show right/wrong
 */
const QuizResults: React.FC<QuizResultsProps> = ({ attempt }) => {
  /**
   * Format date
   * 
   * What it does:
   * - Changes timestamp to local time
   * - Makes date easy to read
   */
  const formatDate = (timestamp: string): string => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="quiz-results">
      <div className="quiz-results-header">
        <h2>Quiz Results</h2>
        <div className="quiz-results-meta">
          <p>Submitted on: {formatDate(attempt.timestamp)}</p>
          <p>Score: {attempt.score}%</p>
        </div>
      </div>

      <div className="quiz-answers">
        {attempt.answers.map((answer, index) => (
          <div 
            key={answer.questionId} 
            className={`answer-item ${answer.isCorrect ? 'correct' : 'incorrect'}`}
          >
            <div className="answer-header">
              <h3>Question {index + 1}</h3>
              <span className="answer-status">
                {answer.isCorrect ? '✓' : '✗'}
              </span>
            </div>
            
            <div className="answer-content">
              <p>Your answer: {answer.studentAnswer}</p>
              {!answer.isCorrect && (
                <p>Correct answer: {answer.correctAnswer}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .quiz-results {
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }

        .quiz-results-header {
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid #eee;
        }

        .quiz-results-meta {
          display: flex;
          justify-content: space-between;
          color: #666;
        }

        .answer-item {
          margin-bottom: 20px;
          padding: 15px;
          border-radius: 5px;
          background-color: #f9f9f9;
        }

        .answer-item.correct {
          border-left: 4px solid #4caf50;
        }

        .answer-item.incorrect {
          border-left: 4px solid #f44336;
        }

        .answer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .answer-status {
          font-size: 1.2em;
          font-weight: bold;
        }

        .answer-item.correct .answer-status {
          color: #4caf50;
        }

        .answer-item.incorrect .answer-status {
          color: #f44336;
        }

        .answer-content {
          color: #333;
        }
      `}</style>
    </div>
  );
};

export default QuizResults; 