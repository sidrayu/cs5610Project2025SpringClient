import React from 'react';
import { QuizAttempt } from './client';

interface QuizAttemptDetailsProps {
  attempt: QuizAttempt;
}

/**
 * QuizAttemptDetails
 * 
 * What it does:
 * - Shows detailed quiz attempt results
 * - Shows each answer and if it's right
 * - Uses colors to show right/wrong
 */
const QuizAttemptDetails: React.FC<QuizAttemptDetailsProps> = ({ attempt }) => {
  return (
    <div className="quiz-attempt-details">
      <div className="attempt-header">
        <h3>Quiz Results</h3>
        <div className="attempt-meta">
          <p>Submitted on: {new Date(attempt.timestamp).toLocaleString()}</p>
          <p>Score: {attempt.score}%</p>
        </div>
      </div>

      <div className="answers-list">
        {attempt.answers.map((answer, index) => (
          <div 
            key={answer.questionId} 
            className={`answer-item ${answer.isCorrect ? 'correct' : 'incorrect'}`}
          >
            <div className="answer-header">
              <h4>Question {index + 1}</h4>
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
        .quiz-attempt-details {
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }

        .attempt-header {
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid #eee;
        }

        .attempt-meta {
          display: flex;
          justify-content: space-between;
          color: #666;
        }

        .answers-list {
          margin-top: 20px;
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

export default QuizAttemptDetails; 