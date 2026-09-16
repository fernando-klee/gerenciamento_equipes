import styled from 'styled-components'

export const Container = styled.div`
  .react-datepicker {
    font-family: inherit;
    border-radius: 8px;
    border: 1px solid #E2E8F0;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .react-datepicker__header {
    background-color: #F7FAFC;
    border-bottom: 1px solid #E2E8F0;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  .react-datepicker__month-container {
    background-color: white;
  }

  .react-datepicker__day {
    color: #2D3748;
    border-radius: 4px;
    margin: 0.2rem;
    width: 2rem;
    line-height: 2rem;
  }

  .react-datepicker__day--outside-month {
    color: #A0AEC0;
    opacity: 0.5;
  }

  .react-datepicker__day--selected {
    background-color: #3182CE !important;
    color: white !important;
  }

  .react-datepicker__day:hover {
    background-color: #EBF8FF;
  }

  .react-datepicker__navigation {
    top: 1rem;
  }

  .react-datepicker__navigation--previous {
    left: 1rem;
  }

  .react-datepicker__navigation--next {
    right: 1rem;
  }

  .react-datepicker__current-month {
    font-size: 1rem;
    font-weight: 600;
    color: #2D3748;
    padding: 0.5rem 0;
  }

  .react-datepicker__day-name {
    color: #4A5568;
    font-weight: 600;
    width: 2rem;
    margin: 0.2rem;
  }

  .react-datepicker__month-year-select {
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid #E2E8F0;
    background-color: white;
    color: #2D3748;
    font-weight: 500;
  }

  .react-datepicker__month-year-dropdown {
    background-color: white;
    border: 1px solid #E2E8F0;
    border-radius: 4px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  .react-datepicker__month-year-option {
    padding: 0.5rem;
    color: #2D3748;
  }

  .react-datepicker__month-year-option:hover {
    background-color: #EBF8FF;
  }

  .react-datepicker__month-year-option--selected {
    background-color: #3182CE;
    color: white;
  }
`