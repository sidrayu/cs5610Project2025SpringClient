/**
 * QuizPersistence.tsx
 * 
 * Step 1: Save quiz data
 * - Saves student answers
 * - Saves quiz score
 * - Records submission time
 * 
 * Step 2: Calculate score
 * - Gets latest score for a quiz
 * - Sorts attempts by time
 * - Returns score as percentage
 */

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchQuizAttempts, QuizAttempt } from './client';
import QuizResults from './QuizResults';

/**
 * QuizPersistenceWrapper
 * 
 * What it does:
 * - Shows quiz results
 * - Handles loading and errors
 * - Passes data to QuizResults
 */
export const QuizPersistenceWrapper: React.FC = () => {
    const { attemptId } = useParams();
    const [attempt, setAttempt] = useState<QuizAttempt | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    /**
     * Load quiz data
     * 
     * What it does:
     * - Gets quiz attempt by ID
     * - Updates state
     * - Shows errors if any
     */
    useEffect(() => {
        const fetchAttempt = async () => {
            if (!attemptId) return;
            try {
                const attempts = await fetchQuizAttempts(attemptId, '');
                if (attempts.length > 0) {
                    setAttempt(attempts[0]);
                }
            } catch (err) {
                setError('Failed to load quiz results');
                console.error('Error fetching quiz attempt:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchAttempt();
    }, [attemptId]);

    if (loading) return <div>Loading results...</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (!attempt) return <div>Quiz attempt not found</div>;

    return <QuizResults attempt={attempt} />;
};

/**
 * getLatestQuizScore
 * 
 * What it does:
 * - Gets latest score for a quiz
 * - Sorts attempts by time
 * - Returns score as percentage
 * 
 * Input:
 * - quizId: Quiz ID
 * - studentId: Student ID
 * - attempts: List of quiz attempts
 * 
 * Output:
 * - Score as percentage (e.g. "85%")
 * - null if no attempts
 */
export const getLatestQuizScore = (quizId: string, studentId: string, attempts: QuizAttempt[]): string | null => {
    const quizAttempts = attempts.filter(attempt => 
        attempt.quizId === quizId && attempt.studentId === studentId
    );
    
    if (quizAttempts.length > 0) {
        const sortedAttempts = [...quizAttempts].sort((a, b) => 
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        return `${sortedAttempts[0].score}%`;
    }
    return null;
}; 