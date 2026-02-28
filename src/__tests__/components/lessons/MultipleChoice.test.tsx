import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MultipleChoice from '@/components/lessons/MultipleChoice';

const OPTIONS = ['Blood and bone marrow', 'Heart', 'Lungs', 'Liver'];
const CORRECT = 'Blood and bone marrow';

describe('MultipleChoice', () => {
  const defaultProps = {
    options: OPTIONS,
    selected: '',
    onSelect: jest.fn(),
    submitted: false,
    correctAnswer: CORRECT,
  };

  beforeEach(() => jest.clearAllMocks());

  it('renders all options', () => {
    render(<MultipleChoice {...defaultProps} />);
    OPTIONS.forEach((opt) => {
      expect(screen.getByText(opt)).toBeInTheDocument();
    });
  });

  it('calls onSelect when an option is clicked', () => {
    render(<MultipleChoice {...defaultProps} />);
    fireEvent.click(screen.getByText('Heart'));
    expect(defaultProps.onSelect).toHaveBeenCalledWith('Heart');
  });

  it('does NOT call onSelect when submitted', () => {
    render(<MultipleChoice {...defaultProps} submitted={true} selected="Heart" />);
    fireEvent.click(screen.getByText('Heart'));
    expect(defaultProps.onSelect).not.toHaveBeenCalled();
  });

  it('highlights selected option before submission', () => {
    const { container } = render(
      <MultipleChoice {...defaultProps} selected="Heart" />
    );
    const selectedBtn = screen.getByText('Heart').closest('button');
    expect(selectedBtn?.className).toContain('orange');
  });

  it('shows green highlight on correct answer after submission', () => {
    render(
      <MultipleChoice
        {...defaultProps}
        selected={CORRECT}
        submitted={true}
      />
    );
    const correctBtn = screen.getByText(CORRECT).closest('button');
    expect(correctBtn?.className).toContain('green');
  });

  it('shows red highlight on wrong answer after submission', () => {
    render(
      <MultipleChoice
        {...defaultProps}
        selected="Heart"
        submitted={true}
      />
    );
    const wrongBtn = screen.getByText('Heart').closest('button');
    expect(wrongBtn?.className).toContain('red');
  });

  it('still shows correct answer green even when wrong was selected', () => {
    render(
      <MultipleChoice
        {...defaultProps}
        selected="Heart"
        submitted={true}
      />
    );
    const correctBtn = screen.getByText(CORRECT).closest('button');
    expect(correctBtn?.className).toContain('green');
  });
});
