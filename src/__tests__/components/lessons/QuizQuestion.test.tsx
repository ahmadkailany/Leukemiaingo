import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import QuizQuestion from '@/components/lessons/QuizQuestion';
import { Question } from '@/types/lesson';

const MULTIPLE_CHOICE_Q: Question = {
  id: 'q1',
  type: 'multiple-choice',
  questionText: 'Leukemia primarily affects which part of the body?',
  options: ['Heart', 'Blood and bone marrow', 'Lungs', 'Liver'],
  correctAnswer: 'Blood and bone marrow',
  explanation: 'Leukemia is a cancer of blood-forming tissues including bone marrow.',
};

const TRUE_FALSE_Q: Question = {
  id: 'q2',
  type: 'true-false',
  questionText: 'Leukemia is contagious.',
  correctAnswer: 'false',
  explanation: 'Leukemia is NOT contagious. It is caused by genetic mutations.',
};

const FILL_BLANK_Q: Question = {
  id: 'q3',
  type: 'fill-blank',
  questionText: 'Leukemia originates in the _____.',
  correctAnswer: 'bone marrow',
  explanation: 'Bone marrow is where all blood cells are produced.',
};

describe('QuizQuestion', () => {
  const onAnswerMock = jest.fn();
  const onNextMock = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  // ─── Multiple Choice ───────────────────────────────────────────────────
  describe('with multiple-choice question', () => {
    it('renders the question text', () => {
      render(<QuizQuestion question={MULTIPLE_CHOICE_Q} onAnswer={onAnswerMock} onNext={onNextMock} />);
      expect(screen.getByText(MULTIPLE_CHOICE_Q.questionText)).toBeInTheDocument();
    });

    it('renders all answer options', () => {
      render(<QuizQuestion question={MULTIPLE_CHOICE_Q} onAnswer={onAnswerMock} onNext={onNextMock} />);
      MULTIPLE_CHOICE_Q.options!.forEach((opt) => {
        expect(screen.getByText(opt)).toBeInTheDocument();
      });
    });

    it('shows "Check Answer" button initially', () => {
      render(<QuizQuestion question={MULTIPLE_CHOICE_Q} onAnswer={onAnswerMock} onNext={onNextMock} />);
      expect(screen.getByText('Check Answer')).toBeInTheDocument();
    });

    it('"Check Answer" button is disabled when nothing is selected', () => {
      render(<QuizQuestion question={MULTIPLE_CHOICE_Q} onAnswer={onAnswerMock} onNext={onNextMock} />);
      const btn = screen.getByText('Check Answer');
      expect(btn).toBeDisabled();
    });

    it('enables "Check Answer" after selecting an option', () => {
      render(<QuizQuestion question={MULTIPLE_CHOICE_Q} onAnswer={onAnswerMock} onNext={onNextMock} />);
      fireEvent.click(screen.getByText('Heart'));
      expect(screen.getByText('Check Answer')).not.toBeDisabled();
    });

    it('shows feedback and explanation after submitting a correct answer', () => {
      render(<QuizQuestion question={MULTIPLE_CHOICE_Q} onAnswer={onAnswerMock} onNext={onNextMock} />);
      fireEvent.click(screen.getByText('Blood and bone marrow'));
      fireEvent.click(screen.getByText('Check Answer'));
      expect(screen.getByText(/Correct!/i)).toBeInTheDocument();
      expect(screen.getByText(MULTIPLE_CHOICE_Q.explanation)).toBeInTheDocument();
    });

    it('shows incorrect feedback after submitting a wrong answer', () => {
      render(<QuizQuestion question={MULTIPLE_CHOICE_Q} onAnswer={onAnswerMock} onNext={onNextMock} />);
      fireEvent.click(screen.getByText('Heart'));
      fireEvent.click(screen.getByText('Check Answer'));
      expect(screen.getByText(/Incorrect/i)).toBeInTheDocument();
    });

    it('calls onAnswer with the selected value on submit', () => {
      render(<QuizQuestion question={MULTIPLE_CHOICE_Q} onAnswer={onAnswerMock} onNext={onNextMock} />);
      fireEvent.click(screen.getByText('Heart'));
      fireEvent.click(screen.getByText('Check Answer'));
      expect(onAnswerMock).toHaveBeenCalledWith('Heart');
    });

    it('shows "Continue" button after submitting', () => {
      render(<QuizQuestion question={MULTIPLE_CHOICE_Q} onAnswer={onAnswerMock} onNext={onNextMock} />);
      fireEvent.click(screen.getByText('Blood and bone marrow'));
      fireEvent.click(screen.getByText('Check Answer'));
      expect(screen.getByText('Continue')).toBeInTheDocument();
    });

    it('calls onNext when "Continue" is clicked', () => {
      render(<QuizQuestion question={MULTIPLE_CHOICE_Q} onAnswer={onAnswerMock} onNext={onNextMock} />);
      fireEvent.click(screen.getByText('Blood and bone marrow'));
      fireEvent.click(screen.getByText('Check Answer'));
      fireEvent.click(screen.getByText('Continue'));
      expect(onNextMock).toHaveBeenCalled();
    });
  });

  // ─── True / False ───────────────────────────────────────────────────────
  describe('with true-false question', () => {
    it('renders True and False buttons', () => {
      render(<QuizQuestion question={TRUE_FALSE_Q} onAnswer={onAnswerMock} onNext={onNextMock} />);
      expect(screen.getByText('true')).toBeInTheDocument();
      expect(screen.getByText('false')).toBeInTheDocument();
    });

    it('validates a correct "false" answer', () => {
      render(<QuizQuestion question={TRUE_FALSE_Q} onAnswer={onAnswerMock} onNext={onNextMock} />);
      fireEvent.click(screen.getByText('false'));
      fireEvent.click(screen.getByText('Check Answer'));
      expect(screen.getByText(/Correct!/i)).toBeInTheDocument();
    });

    it('shows incorrect for wrong true-false answer', () => {
      render(<QuizQuestion question={TRUE_FALSE_Q} onAnswer={onAnswerMock} onNext={onNextMock} />);
      fireEvent.click(screen.getByText('true'));
      fireEvent.click(screen.getByText('Check Answer'));
      expect(screen.getByText(/Incorrect/i)).toBeInTheDocument();
    });
  });

  // ─── Fill in the Blank ─────────────────────────────────────────────────
  describe('with fill-blank question', () => {
    it('renders an input field', () => {
      render(<QuizQuestion question={FILL_BLANK_Q} onAnswer={onAnswerMock} onNext={onNextMock} />);
      expect(screen.getByPlaceholderText('Type your answer...')).toBeInTheDocument();
    });

    it('validates correct fill-blank answer', () => {
      render(<QuizQuestion question={FILL_BLANK_Q} onAnswer={onAnswerMock} onNext={onNextMock} />);
      const input = screen.getByPlaceholderText('Type your answer...');
      fireEvent.change(input, { target: { value: 'bone marrow' } });
      fireEvent.click(screen.getByText('Check Answer'));
      expect(screen.getByText(/Correct!/i)).toBeInTheDocument();
    });

    it('is case-insensitive for fill-blank answers', () => {
      render(<QuizQuestion question={FILL_BLANK_Q} onAnswer={onAnswerMock} onNext={onNextMock} />);
      const input = screen.getByPlaceholderText('Type your answer...');
      fireEvent.change(input, { target: { value: 'BONE MARROW' } });
      fireEvent.click(screen.getByText('Check Answer'));
      expect(screen.getByText(/Correct!/i)).toBeInTheDocument();
    });

    it('shows incorrect for wrong fill-blank answer', () => {
      render(<QuizQuestion question={FILL_BLANK_Q} onAnswer={onAnswerMock} onNext={onNextMock} />);
      const input = screen.getByPlaceholderText('Type your answer...');
      fireEvent.change(input, { target: { value: 'heart' } });
      fireEvent.click(screen.getByText('Check Answer'));
      expect(screen.getByText(/Incorrect/i)).toBeInTheDocument();
    });
  });
});
