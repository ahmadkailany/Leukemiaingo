import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TrueFalse from '@/components/lessons/TrueFalse';

describe('TrueFalse', () => {
  const defaultProps = {
    selected: '',
    onSelect: jest.fn(),
    submitted: false,
    correctAnswer: 'true',
  };

  beforeEach(() => jest.clearAllMocks());

  it('renders both True and False buttons', () => {
    render(<TrueFalse {...defaultProps} />);
    expect(screen.getByText('true')).toBeInTheDocument();
    expect(screen.getByText('false')).toBeInTheDocument();
  });

  it('calls onSelect with "true" when True button is clicked', () => {
    render(<TrueFalse {...defaultProps} />);
    fireEvent.click(screen.getByText('true'));
    expect(defaultProps.onSelect).toHaveBeenCalledWith('true');
  });

  it('calls onSelect with "false" when False button is clicked', () => {
    render(<TrueFalse {...defaultProps} />);
    fireEvent.click(screen.getByText('false'));
    expect(defaultProps.onSelect).toHaveBeenCalledWith('false');
  });

  it('does NOT call onSelect after submission', () => {
    render(<TrueFalse {...defaultProps} submitted={true} selected="false" />);
    fireEvent.click(screen.getByText('false'));
    expect(defaultProps.onSelect).not.toHaveBeenCalled();
  });

  it('applies green style to correct answer after submission', () => {
    render(<TrueFalse {...defaultProps} submitted={true} selected="true" correctAnswer="true" />);
    const trueBtn = screen.getByText('true').closest('button');
    expect(trueBtn?.className).toContain('green');
  });

  it('applies red style to wrong selected answer after submission', () => {
    render(<TrueFalse {...defaultProps} submitted={true} selected="false" correctAnswer="true" />);
    const falseBtn = screen.getByText('false').closest('button');
    expect(falseBtn?.className).toContain('red');
  });

  it('shows correct answer as green even when wrong option was selected', () => {
    render(<TrueFalse {...defaultProps} submitted={true} selected="false" correctAnswer="true" />);
    const trueBtn = screen.getByText('true').closest('button');
    expect(trueBtn?.className).toContain('green');
  });
});
