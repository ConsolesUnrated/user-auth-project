import React, { useState } from 'react';

const SecurityQuestionsPage = () => {
  const [selectedQuestions, setSelectedQuestions] = useState(['', '', '']);

  const handleQuestionChange = (index, questionId) => {
    const newSelectedQuestions = [...selectedQuestions];
    newSelectedQuestions[index] = questionId;
    setSelectedQuestions(newSelectedQuestions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle security questions verification logic here
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h1 style={styles.title}>Security Questions</h1>
        <form style={styles.form} onSubmit={handleSubmit}>
          {[0, 1, 2].map((index) => (
            <div key={index} style={styles.questionGroup}>
              <select 
                value={selectedQuestions[index]}
                onChange={(e) => handleQuestionChange(index, e.target.value)}
                style={styles.select}
              >
                <option value="">Select a security question</option>
                {securityQuestions.map((q) => (
                  <option 
                    key={q.id} 
                    value={q.id}
                    disabled={selectedQuestions.includes(q.id) && selectedQuestions[index] !== q.id}
                  >
                    {q.question}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Your answer"
                style={styles.input}
              />
            </div>
          ))}
          <button style={styles.button}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

const securityQuestions = [
  { id: "pet", question: "What was the name of your first pet?" },
  { id: "city", question: "What is the name of the city where you were born?" },
  { id: "friend", question: "What was your childhood best friend's name?" },
  { id: "car", question: "What was the make and model of your first car?" },
  { id: "concert", question: "What was the first concert you attended?" },
];

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    width: '100%',
    backgroundColor: '#f5f5f5',
  },
  formWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2.5rem',
    marginTop: '-10rem',
    width: '100%',
    maxWidth: '440px',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '2rem',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '1rem',
  },
  input: {
    padding: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    transition: 'border-color 0.2s ease',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    ':focus': {
      borderColor: '#4A90E2',
    },
  },
  button: {
    padding: '1rem',
    backgroundColor: '#4A90E2',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1.2rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    marginTop: '1rem',
    ':hover': {
      backgroundColor: '#357ABD',
    },
  },
  questionGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    width: '100%',
    marginBottom: '0.5rem',
  },
  select: {
    padding: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    transition: 'all 0.2s ease',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    cursor: 'pointer',
    backgroundColor: 'white',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 1rem center',
    backgroundSize: '1rem',
    paddingRight: '2.5rem',
    ':hover': {
      borderColor: '#4A90E2',
      backgroundColor: '#f8f9fa',
    },
    ':focus': {
      borderColor: '#4A90E2',
      boxShadow: '0 0 0 3px rgba(74, 144, 226, 0.1)',
    },
  },
};

export default SecurityQuestionsPage; 