import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FillBlank from '@/components/lessons/FillBlank';

describe('FillBlank', () => {
  const defaultProps = {
    value: '',
    onChange: jest.fn(),
    submitted: false,
    correctAnswer: 'bone marrow',
  };

  beforeEach(() => jest.clearAllMocks());

  it('renders an input field', () => {
    render(<FillBlank {...defaultProps} />);
    expect(screen.getByPlaceholderText('Type your answer...')).toBeInTheDocument();
  });

  it('calls onChange when user types', () => {
    render(<FillBlank {...defaultProps} />);
    const input = screen.getByPlaceholderText('Type your answer...');
    fireEvent.change(input, { target: { value: 'bone marrow' } });
    expect(defaultProps.onChange).toHaveBeenCalledWith('bone marrow');
  });

  it('does NOT call onChange after submission', () => {
    render(<FillBlank {...defaultProps} submitted={true} value="wrong" />);
    const input = screen.getByPlaceholderText('Type your answer...');
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(defaultProps.onChange).not.toHaveBeenCalled();
  });

  it('shows green border when submitted with correct answer', () => {
    render(
      <FillBlank
        {...defaultProps}
        submitted={true}
        value="bone marrow"
      />
    );
    const input = screen.getByPlaceholderText('Type your answer...');
    expect(input.className).toContain('green');
  });

  it('shows red border when submitted with wrong answer', () => {
    render(
      <FillBlank
        {...defaultProps}
        submitted={true}
        value="heart"
      />
    );
    const input = screen.getByPlaceholderText('Type your answer...');
    expect(input.className).toContain('red');
  });

  it('shows correct answer hint when submitted with wrong answer', () => {
    render(
      <FillBlank
        {...defaultProps}
        submitted={true}
        value="heart"
      />
    );
    expect(screen.getByText('bone marrow')).toBeInTheDocument();
  });

  it('does NOT show correct answer hint when answer is right', () => {
    render(
      <FillBlank
        {...defaultProps}
        submitted={true}
        value="bone marrow"
      />
    );
    // The "Correct answer:" hint should not appear
    expect(screen.queryByText(/Correct answer/i)).not.toBeInTheDocument();
  });

  it('is case-insensitive for correct answer check', () => {
    render(
      <FillBlank
        {...defaultProps}
        submitted={true}
        value="Bone Marrow"
      />
    );
    const input = screen.getByPlaceholderText('Type your answer...');
    expect(input.className).toContain('green');
  });
});
