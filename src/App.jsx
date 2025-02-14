import { useState } from 'react'
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
  {
    id: 'targetAudience',
    category: 'General Overview',
    question: 'Who is the target audience for this app?',
    type: 'textarea'
  },
  {
    id: 'appType',
    category: 'General Overview',
    question: 'Will this be a web app, mobile app, or both?',
    type: 'text'
  },
  {
    id: 'inspiration',
    category: 'General Overview',
    question: 'Do you have any similar apps in mind for reference or inspiration?',
    type: 'textarea'
  },
  // Tech Stack
  {
    id: 'frontend',
    category: 'Tech Stack',
    question: 'What technologies or frameworks do you want to use for the front end (e.g., React, Vue, Next.js)?',
    type: 'text'
  },
  {
    id: 'backend',
    category: 'Tech Stack',
    question: 'What back-end technologies or frameworks do you prefer (e.g., Node.js, Django, Firebase)?',
    type: 'text'
  },
  {
    id: 'database',
    category: 'Tech Stack',
    question: 'What database solution do you want (e.g., PostgreSQL, MongoDB, Firebase)?',
    type: 'text'
  },
  {
    id: 'auth',
    category: 'Tech Stack',
    question: 'Will this app require user authentication?',
    type: 'yesno',
    followUp: 'How should authentication work (e.g., email/password, social login, OAuth, magic links)?',
    followUpType: 'textarea'
  },
  // Core Features & Functionality
  {
    id: 'mainFeatures',
    category: 'Core Features & Functionality',
    question: 'What are the main features the app must have? (List essential functionalities.)',
    type: 'textarea'
  },
  {
    id: 'userFlows',
    category: 'Core Features & Functionality',
    question: 'How should users interact with the app? Describe the main user flows.',
    type: 'textarea'
  },
  {
    id: 'userRoles',
    category: 'Core Features & Functionality',
    question: 'Will the app need to support multiple user roles (e.g., admin, regular user)?',
    type: 'textarea'
  },
  {
    id: 'fileUploads',
    category: 'Core Features & Functionality',
    question: 'Will users be able to upload files or media? If so, what types and formats?',
    type: 'textarea'
  },
  {
    id: 'payments',
    category: 'Core Features & Functionality',
    question: 'Will users need to make payments in the app? If yes, which payment processors should be supported (e.g., Stripe, PayPal)?',
    type: 'textarea'
  },
  {
    id: 'notifications',
    category: 'Core Features & Functionality',
    question: 'Should the app include push notifications, emails, or SMS alerts? If so, what kind?',
    type: 'textarea'
  },
  // AI & Automation
  {
    id: 'aiFeatures',
    category: 'AI & Automation',
    question: 'Should AI handle any part of the app\'s functionality? If yes, what features should AI power (e.g., chatbots, recommendations, summarization)?',
    type: 'textarea'
  },
  {
    id: 'externalApis',
    category: 'AI & Automation',
    question: 'Will the app integrate with external APIs or services? If so, which ones?',
    type: 'textarea'
  },
  // Design & User Experience
  {
    id: 'designStyle',
    category: 'Design & User Experience',
    question: 'Do you have a preferred design style? (Minimalist, modern, colorful, etc.)',
    type: 'text'
  },
  {
    id: 'uiFeatures',
    category: 'Design & User Experience',
    question: 'Do you need specific UI/UX features such as dark mode, animations, or accessibility options?',
    type: 'textarea'
  },
  {
    id: 'responsive',
    category: 'Design & User Experience',
    question: 'Should the app be responsive and mobile-friendly?',
    type: 'text'
  },
  {
    id: 'uiLibrary',
    category: 'Design & User Experience',
    question: 'Do you have a preferred UI library or component system (e.g., Material UI, Tailwind CSS, Bootstrap)?',
    type: 'text'
  },
  // Deployment & Hosting
  {
    id: 'deployment',
    category: 'Deployment & Hosting',
    question: 'Where do you want to deploy this app (e.g., Vercel, AWS, Firebase)?',
    type: 'text'
  },
  {
    id: 'cicd',
    category: 'Deployment & Hosting',
    question: 'Do you need CI/CD integration for automated deployment?',
    type: 'text'
  },
  {
    id: 'environments',
    category: 'Deployment & Hosting',
    question: 'Should the app support multiple environments (e.g., dev, staging, production)?',
    type: 'text'
  },
  // Scalability & Performance
  {
    id: 'userScale',
    category: 'Scalability & Performance',
    question: 'How many users do you expect initially? How many in the future?',
    type: 'textarea'
  },
  {
    id: 'trafficOptimization',
    category: 'Scalability & Performance',
    question: 'Should the app be optimized for high traffic and scalability?',
    type: 'textarea'
  },
  {
    id: 'performance',
    category: 'Scalability & Performance',
    question: 'Are there any performance concerns or speed optimizations you want to consider?',
    type: 'textarea'
  },
  // Security & Privacy
  {
    id: 'security',
    category: 'Security & Privacy',
    question: 'Are there any specific security measures you need (e.g., encryption, GDPR compliance)?',
    type: 'textarea'
  },
  {
    id: 'rbac',
    category: 'Security & Privacy',
    question: 'Should the app have role-based access control (RBAC)?',
    type: 'yesno'
  },
  // Additional Considerations
  {
    id: 'extraFeatures',
    category: 'Additional Considerations',
    question: 'Are there any extra features or customizations you\'d like to include?',
    type: 'textarea'
  },
  {
    id: 'timeline',
    category: 'Additional Considerations',
    question: 'What is your ideal timeline for building this app?',
    type: 'text'
  },
  {
    id: 'aiTestingDocs',
    category: 'Additional Considerations',
    question: 'Would you like AI to generate test cases and documentation for the app?',
    type: 'yesno'
  },
  {
    id: 'additionalInfo',
    category: 'Additional Considerations',
    question: 'Is there anything else I should know before generating the blueprint?',
    type: 'textarea'
  }
]

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResult, setShowResult] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
      setInputValue(answers[QUESTIONS[currentQuestionIndex - 1].id] || '')
    }
  }

  const handleNext = () => {
    if (inputValue.trim()) {
      handleAnswer(inputValue)
    }
  }

  const handleAnswer = (answer) => {
    const currentQuestion = QUESTIONS[currentQuestionIndex]
    
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }))

    // If it's a yes/no question with a follow-up and the answer is yes
    if (currentQuestion.type === 'yesno' && answer === 'Yes' && currentQuestion.followUp) {
      setAnswers(prev => ({
        ...prev,
        [`${currentQuestion.id}_details`]: null
      }))
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

  const currentQuestion = QUESTIONS[currentQuestionIndex]

  const renderInput = () => {
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
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="w-full bg-gray-700 p-3 rounded"
          onKeyDown={e => e.key === 'Enter' && handleNext()}
        />
      )
    }

    return (
      <textarea
        value={inputValue}
        onChange={handleInputChange}
        className="w-full bg-gray-700 p-3 rounded min-h-[100px]"
        onKeyDown={e => e.key === 'Enter' && e.ctrlKey && handleNext()}
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
              <p className="text-xl mb-4">{currentQuestion.question}</p>
              
              {renderInput()}

              <div className="flex justify-between mt-6">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                {currentQuestion.type !== 'yesno' && (
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
            <h2 className="text-2xl mb-4">Generated Prompt</h2>
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(answers, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
