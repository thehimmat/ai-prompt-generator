import { useState, useEffect, useRef } from 'react'
import './App.css'

const QUESTIONS = [
  // General Overview
  {
    id: 'appName',
    category: 'General Overview',
    question: 'What is the name of the app (if you have one in mind)?',
    type: 'text'
  },
  {
    id: 'purpose',
    category: 'General Overview',
    question: 'What is the core purpose of the app? What problem does it solve?',
    type: 'textarea'
  },
  // {
  //   id: 'targetAudience',
  //   category: 'General Overview',
  //   question: 'Who is the target audience for this app?',
  //   type: 'textarea'
  // },
  // {
  //   id: 'appType',
  //   category: 'General Overview',
  //   question: 'Will this be a web app, mobile app, or both?',
  //   type: 'text'
  // },
  // {
  //   id: 'inspiration',
  //   category: 'General Overview',
  //   question: 'Do you have any similar apps in mind for reference or inspiration?',
  //   type: 'textarea'
  // },
  // // Tech Stack
  // {
  //   id: 'frontend',
  //   category: 'Tech Stack',
  //   question: 'What technologies or frameworks do you want to use for the front end (e.g., React, Vue, Next.js)?',
  //   type: 'text'
  // },
  // {
  //   id: 'backend',
  //   category: 'Tech Stack',
  //   question: 'What back-end technologies or frameworks do you prefer (e.g., Node.js, Django, Firebase)?',
  //   type: 'text'
  // },
  // {
  //   id: 'database',
  //   category: 'Tech Stack',
  //   question: 'What database solution do you want (e.g., PostgreSQL, MongoDB, Firebase)?',
  //   type: 'text'
  // },
  {
    id: 'auth',
    category: 'Tech Stack',
    question: 'Will this app require user authentication?',
    type: 'yesno',
    followUp: 'How should authentication work (e.g., email/password, social login, OAuth, magic links)?',
    followUpType: 'textarea'
  },
  // // Core Features & Functionality
  // {
  //   id: 'mainFeatures',
  //   category: 'Core Features & Functionality',
  //   question: 'What are the main features the app must have? (List essential functionalities.)',
  //   type: 'textarea'
  // },
  // {
  //   id: 'userFlows',
  //   category: 'Core Features & Functionality',
  //   question: 'How should users interact with the app? Describe the main user flows.',
  //   type: 'textarea'
  // },
  // {
  //   id: 'userRoles',
  //   category: 'Core Features & Functionality',
  //   question: 'Will the app need to support multiple user roles (e.g., admin, regular user)?',
  //   type: 'textarea'
  // },
  // {
  //   id: 'fileUploads',
  //   category: 'Core Features & Functionality',
  //   question: 'Will users be able to upload files or media? If so, what types and formats?',
  //   type: 'textarea'
  // },
  // {
  //   id: 'payments',
  //   category: 'Core Features & Functionality',
  //   question: 'Will users need to make payments in the app? If yes, which payment processors should be supported (e.g., Stripe, PayPal)?',
  //   type: 'textarea'
  // },
  // {
  //   id: 'notifications',
  //   category: 'Core Features & Functionality',
  //   question: 'Should the app include push notifications, emails, or SMS alerts? If so, what kind?',
  //   type: 'textarea'
  // },
  // // AI & Automation
  // {
  //   id: 'aiFeatures',
  //   category: 'AI & Automation',
  //   question: 'Should AI handle any part of the app\'s functionality? If yes, what features should AI power (e.g., chatbots, recommendations, summarization)?',
  //   type: 'textarea'
  // },
  // {
  //   id: 'externalApis',
  //   category: 'AI & Automation',
  //   question: 'Will the app integrate with external APIs or services? If so, which ones?',
  //   type: 'textarea'
  // },
  // // Design & User Experience
  // {
  //   id: 'designStyle',
  //   category: 'Design & User Experience',
  //   question: 'Do you have a preferred design style? (Minimalist, modern, colorful, etc.)',
  //   type: 'text'
  // },
  // {
  //   id: 'uiFeatures',
  //   category: 'Design & User Experience',
  //   question: 'Do you need specific UI/UX features such as dark mode, animations, or accessibility options?',
  //   type: 'textarea'
  // },
  // {
  //   id: 'responsive',
  //   category: 'Design & User Experience',
  //   question: 'Should the app be responsive and mobile-friendly?',
  //   type: 'text'
  // },
  // {
  //   id: 'uiLibrary',
  //   category: 'Design & User Experience',
  //   question: 'Do you have a preferred UI library or component system (e.g., Material UI, Tailwind CSS, Bootstrap)?',
  //   type: 'text'
  // },
  // // Deployment & Hosting
  // {
  //   id: 'deployment',
  //   category: 'Deployment & Hosting',
  //   question: 'Where do you want to deploy this app (e.g., Vercel, AWS, Firebase)?',
  //   type: 'text'
  // },
  // {
  //   id: 'cicd',
  //   category: 'Deployment & Hosting',
  //   question: 'Do you need CI/CD integration for automated deployment?',
  //   type: 'text'
  // },
  // {
  //   id: 'environments',
  //   category: 'Deployment & Hosting',
  //   question: 'Should the app support multiple environments (e.g., dev, staging, production)?',
  //   type: 'text'
  // },
  // // Scalability & Performance
  // {
  //   id: 'userScale',
  //   category: 'Scalability & Performance',
  //   question: 'How many users do you expect initially? How many in the future?',
  //   type: 'textarea'
  // },
  // {
  //   id: 'trafficOptimization',
  //   category: 'Scalability & Performance',
  //   question: 'Should the app be optimized for high traffic and scalability?',
  //   type: 'textarea'
  // },
  // {
  //   id: 'performance',
  //   category: 'Scalability & Performance',
  //   question: 'Are there any performance concerns or speed optimizations you want to consider?',
  //   type: 'textarea'
  // },
  // // Security & Privacy
  // {
  //   id: 'security',
  //   category: 'Security & Privacy',
  //   question: 'Are there any specific security measures you need (e.g., encryption, GDPR compliance)?',
  //   type: 'textarea'
  // },
  // {
  //   id: 'rbac',
  //   category: 'Security & Privacy',
  //   question: 'Should the app have role-based access control (RBAC)?',
  //   type: 'yesno'
  // },
  // // Additional Considerations
  // {
  //   id: 'extraFeatures',
  //   category: 'Additional Considerations',
  //   question: 'Are there any extra features or customizations you\'d like to include?',
  //   type: 'textarea'
  // },
  // {
  //   id: 'timeline',
  //   category: 'Additional Considerations',
  //   question: 'What is your ideal timeline for building this app?',
  //   type: 'text'
  // },
  // {
  //   id: 'aiTestingDocs',
  //   category: 'Additional Considerations',
  //   question: 'Would you like AI to generate test cases and documentation for the app?',
  //   type: 'yesno'
  // },
  {
    id: 'additionalInfo',
    category: 'Additional Considerations',
    question: 'Is there anything else I should know before generating the blueprint?',
    type: 'textarea'
  }
]

function formatPrompt(answers) {
  const sections = {
    'General Overview': [],
    'Tech Stack': [],
    'Core Features & Functionality': [],
    'AI & Automation': [],
    'Design & User Experience': [],
    'Deployment & Hosting': [],
    'Scalability & Performance': [],
    'Security & Privacy': [],
    'Additional Considerations': []
  }

  // Group answers by category
  QUESTIONS.forEach(q => {
    if (answers[q.id]) {
      sections[q.category].push({
        question: q.question,
        answer: answers[q.id],
        followUpAnswer: q.followUp && answers[q.id] === 'Yes' ? answers[`${q.id}_details`] : null
      })
    }
  })

  // Format the prompt
  let prompt = `# AI Development Prompt: ${answers.appName || 'New Application'}\n\n`
  
  prompt += `## Instructions for AI Assistant\n`
  prompt += `Please follow these steps when processing this development request:\n\n`
  prompt += `1. Read all requirements carefully before starting\n`
  prompt += `2. Generate code based on the structured information below\n`
  prompt += `3. Follow best practices for the specified tech stack\n`
  prompt += `4. Implement features in order of priority\n`
  prompt += `5. Consider security and scalability in all implementations\n\n`

  prompt += `## App Name & Purpose\n`
  prompt += `${answers.appName || 'New Application'}: ${answers.purpose || 'Purpose to be determined'}\n\n`

  // Add each section with specific formatting
  if (sections['General Overview'].length > 0) {
    prompt += `## Target Audience & Scope\n`
    sections['General Overview'].forEach(item => {
      if (!['appName', 'purpose'].includes(item.id)) {
        prompt += `- ${item.answer}\n`
      }
    })
    prompt += '\n'
  }

  if (sections['Tech Stack'].length > 0) {
    prompt += `## Technical Requirements\n`
    prompt += `### Tech Stack:\n`
    sections['Tech Stack'].forEach(item => {
      prompt += `- ${item.question}: ${item.answer}\n`
      if (item.followUpAnswer) {
        prompt += `  Details: ${item.followUpAnswer}\n`
      }
    })
    prompt += '\n'
  }

  if (sections['Core Features & Functionality'].length > 0) {
    prompt += `## Core Features\n`
    sections['Core Features & Functionality'].forEach(item => {
      prompt += `### ${item.question}\n${item.answer}\n\n`
    })
  }

  if (sections['AI & Automation'].length > 0) {
    prompt += `## AI & Automation Features\n`
    sections['AI & Automation'].forEach(item => {
      prompt += `- ${item.answer}\n`
    })
    prompt += '\n'
  }

  if (sections['Design & User Experience'].length > 0) {
    prompt += `## Design & UI Requirements\n`
    sections['Design & User Experience'].forEach(item => {
      prompt += `- ${item.question}: ${item.answer}\n`
    })
    prompt += '\n'
  }

  if (sections['Deployment & Hosting'].length > 0) {
    prompt += `## Deployment Strategy\n`
    sections['Deployment & Hosting'].forEach(item => {
      prompt += `- ${item.question}: ${item.answer}\n`
    })
    prompt += '\n'
  }

  prompt += `## Implementation Guidelines\n`
  prompt += `1. Start with core functionality first\n`
  prompt += `2. Follow best practices for the chosen tech stack\n`
  prompt += `3. Implement proper error handling and validation\n`
  prompt += `4. Write clean, maintainable, and well-documented code\n`
  prompt += `5. Consider scalability and performance in the implementation\n`
  prompt += `6. Include appropriate tests for critical functionality\n\n`

  prompt += `## Development Process\n`
  prompt += `1. Begin with project setup and basic infrastructure\n`
  prompt += `2. Implement authentication and user management (if required)\n`
  prompt += `3. Develop core features in order of priority\n`
  prompt += `4. Add secondary features and enhancements\n`
  prompt += `5. Implement UI/UX according to design requirements\n`
  prompt += `6. Add tests and documentation\n`
  prompt += `7. Prepare deployment configuration\n\n`

  prompt += `## Additional Notes\n`
  prompt += `- Provide clear documentation for setup and deployment\n`
  prompt += `- Include instructions for local development\n`
  prompt += `- List any required environment variables or configuration\n`
  prompt += `- Consider implementing proper logging and monitoring\n`
  prompt += `- Follow security best practices throughout development\n\n`

  return prompt
}

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResult, setShowResult] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [showFollowUp, setShowFollowUp] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current && !showResult) {
      inputRef.current.focus()
    }
  }, [currentQuestionIndex, showFollowUp, showResult])

  const handlePrevious = () => {
    if (showFollowUp) {
      setShowFollowUp(false)
      setInputValue('')
    } else if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
      setInputValue(answers[QUESTIONS[currentQuestionIndex - 1].id] || '')
    }
  }

  const handleNext = () => {
    if (inputValue.trim()) {
      if (showFollowUp) {
        // Handle follow-up answer
        setAnswers(prev => ({
          ...prev,
          [`${QUESTIONS[currentQuestionIndex].id}_details`]: inputValue
        }))
        setShowFollowUp(false)
        setInputValue('')
        if (currentQuestionIndex < QUESTIONS.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1)
        } else {
          setShowResult(true)
        }
      } else {
        handleAnswer(inputValue)
      }
    }
  }

  const handleAnswer = (answer) => {
    const currentQuestion = QUESTIONS[currentQuestionIndex]
    
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }))

    if (currentQuestion.type === 'yesno') {
      if (answer === 'Yes' && currentQuestion.followUp) {
        setShowFollowUp(true)
        setInputValue('')
        return
      }
    }

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      setInputValue('')
    } else {
      setShowResult(true)
    }
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (inputValue.trim()) {
        handleNext()
      }
    }
  }

  const currentQuestion = QUESTIONS[currentQuestionIndex]

  const renderInput = () => {
    if (showFollowUp) {
      return (
        <div className="mt-6">
          <p className="text-lg mb-3 text-gray-300"></p>
          {currentQuestion.followUpType === 'textarea' ? (
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={handleInputChange}
              className="w-full bg-gray-700 p-3 rounded min-h-[100px]"
              onKeyDown={handleKeyDown}
              placeholder="Type your answer here..."
            />
          ) : (
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="w-full bg-gray-700 p-3 rounded"
              onKeyDown={handleKeyDown}
              placeholder="Type your answer here..."
            />
          )}
        </div>
      )
    }

    if (currentQuestion.type === 'yesno') {
      return (
        <div className="flex gap-4 justify-center mt-6">
          <button
            onClick={() => handleAnswer('Yes')}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg transition-colors"
          >
            Yes
          </button>
          <button
            onClick={() => handleAnswer('No')}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg transition-colors"
          >
            No
          </button>
        </div>
      )
    }

    if (currentQuestion.type === 'text') {
      return (
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="w-full bg-gray-700 p-3 rounded"
          onKeyDown={handleKeyDown}
          placeholder="Type your answer here..."
        />
      )
    }

    return (
      <textarea
        ref={inputRef}
        value={inputValue}
        onChange={handleInputChange}
        className="w-full bg-gray-700 p-3 rounded min-h-[100px]"
        onKeyDown={handleKeyDown}
        placeholder="Type your answer here..."
      />
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-3xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">AI Prompt Generator</h1>
        
        {!showResult ? (
          <div className="space-y-6">
            <div className="w-full bg-gray-700 h-2 rounded-full">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all"
                style={{ width: `${((currentQuestionIndex + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <p className="text-sm text-gray-400 mb-2">{currentQuestion.category}</p>
              <p className="text-xl mb-4">
                {showFollowUp ? currentQuestion.followUp : currentQuestion.question}
              </p>
              
              {renderInput()}

              <div className={`flex ${currentQuestionIndex === 0 && !showFollowUp ? 'justify-end' : 'justify-between'} mt-6`}>
                {(currentQuestionIndex > 0 || showFollowUp) && (
                  <button
                    onClick={handlePrevious}
                    className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
                  >
                    Previous
                  </button>
                )}
                {(showFollowUp || currentQuestion.type !== 'yesno') && (
                  <button
                    onClick={handleNext}
                    disabled={!inputValue.trim()}
                    className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl">Generated Prompt</h2>
              <button
                onClick={() => navigator.clipboard.writeText(formatPrompt(answers))}
                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Copy to Clipboard
              </button>
            </div>
            <pre className="whitespace-pre-wrap bg-gray-900 p-4 rounded-lg overflow-auto">
              {formatPrompt(answers)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
