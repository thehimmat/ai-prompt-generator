import { useState, useEffect, useRef } from 'react'
import './App.css'

const QUESTIONS = [
  // General Overview
  {
    id: 'appName',
    category: 'General Overview',
    question: 'What is the name of the app?',
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
    question: 'Who is the target audience?',
    type: 'textarea'
  },
  {
    id: 'appType',
    category: 'General Overview',
    question: 'Will this be a web app, mobile app, or both?',
    type: 'text'
  },
  // Tech Stack
  {
    id: 'frontend',
    category: 'Tech Stack',
    question: 'What technologies or frameworks should be used for the frontend (e.g., React, Next.js, Vue)?',
    type: 'text'
  },
  {
    id: 'backend',
    category: 'Tech Stack',
    question: 'What backend technologies or frameworks should be used (e.g., Node.js, Django, Firebase)?',
    type: 'text'
  },
  {
    id: 'database',
    category: 'Tech Stack',
    question: 'What database solution should be used (e.g., PostgreSQL, MongoDB, Firebase, SQLite)?',
    type: 'text'
  },
  {
    id: 'auth',
    category: 'Tech Stack',
    question: 'Will this app require user authentication? If so, what method (e.g., email/password, OAuth)?',
    type: 'textarea'
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
    id: 'fileUploads',
    category: 'Core Features & Functionality',
    question: 'Will users be able to upload files or media? If so, what types and formats?',
    type: 'textarea'
  },
  // Deployment & Hosting
  {
    id: 'deployment',
    category: 'Deployment & Hosting',
    question: 'Where do you want to deploy this app (e.g., Vercel, AWS, Firebase)?',
    type: 'text'
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
  let prompt = `# App Specification Summary: ${answers.appName || 'New Application'}\n\n`

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

  return prompt
}

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResult, setShowResult] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [showFollowUp, setShowFollowUp] = useState(false)
  const inputRef = useRef(null)
  const [aiResponse, setAiResponse] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    if (inputRef.current && !showResult) {
      inputRef.current.focus()
    }
  }, [currentQuestionIndex, showFollowUp, showResult])

  useEffect(() => {
    console.log('isGenerating changed:', isGenerating)
  }, [isGenerating])

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

  const handleSkip = () => {
    const currentQuestion = QUESTIONS[currentQuestionIndex]
    
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: "Question skipped – Use best judgment based on standard practices and similar apps."
    }))

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      setInputValue('')
    } else {
      setShowResult(true)
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
        <div className="space-y-6">
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

  const generateAIResponse = async () => {
    setIsGenerating(true)
    try {
      const prompt = formatPrompt(answers)
      console.log('=== Generated Prompt ===')
      console.log(prompt)
      console.log('=== Prompt Length ===')
      console.log(prompt.length, 'characters')

      // Rough estimate: average English word is 5 characters, and tokens are roughly word pieces
      const estimatedTokens = Math.ceil(prompt.length / 5)
      console.log('=== Estimated Tokens ===')
      console.log(estimatedTokens, 'tokens (rough estimate)')

      if (estimatedTokens > 2048) {
        throw new Error('Prompt may be too long for the model. Try reducing the length of your answers.')
      }

      const requestBody = {
        inputs: `You are an AI software engineer. Your task is to generate an AI-ready development prompt that can be copied into Cursor Pro to create a fully functional app.  

      Instructions:  
      1. DO NOT generate any code yourself. Instead, generate a structured prompt that can be copied into Cursor Pro.  
      2. Ensure the prompt is action-oriented and designed for AI-based code generation.  
      3. The output should be in the following structured format:  

      AI-READY DEVELOPMENT PROMPT

      App Name & Purpose  
      - Clearly define what the app does and who it serves.  

      Tech Stack  
      - Frontend: [Framework]  
      - Backend: [Framework]  
      - Database: [Database]  
      - Authentication: [Method]  

      Core Features  
      1. Feature 1  
      2. Feature 2  
      3. Feature 3  

      User Flow  
      1. Step 1  
      2. Step 2  
      3. Step 3  

      Development Tasks for Cursor Pro  
      1. Project Setup & Dependencies  
        - Initialize the project with necessary dependencies.  
        - Set up project structure (frontend/, backend/).  

      2. Database Schema & Models  
        - Generate database models (models.py).  

      3. API & Backend Logic  
        - Implement RESTful API endpoints (routes/api.py).  

      4. Frontend Components & UI  
        - Build UI components (components/OfferCard.vue).  

      5. Integration  
        - Connect the frontend to the backend (services/api.js).  

      6. Deployment Instructions  
        - Provide environment variable setup (.env).  
        - Configure deployment (vercel.json).  

      AI Features (If Applicable)  
      - Use NLP for search functionality.  
      - Implement an AI-powered recommendation engine.  

      Additional Notes  
      - Ensure the prompt is clear, structured, and immediately usable in Cursor Pro.  
      - The goal is for Cursor Pro to generate the app with minimal modifications.  

      Now, generate the AI-ready development prompt in this format.

      ${prompt}`,
        parameters: {
          max_length: 4096,
          temperature: 0.7,
          top_p: 0.95,
          return_full_text: false
        }
      }

      console.log('=== Request Body ===')
      console.log(JSON.stringify(requestBody, null, 2))

      // Log the API URL and token presence
      console.log('=== API Token Present? ===')
      console.log(!!import.meta.env.VITE_HUGGING_FACE_TOKEN)

      const response = await fetch('https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_HUGGING_FACE_TOKEN}`
        },
        body: JSON.stringify(requestBody)
      })
      
      // Log the raw response
      console.log('=== Raw Response ===')
      console.log('Status:', response.status)
      console.log('Status Text:', response.statusText)
      
      const data = await response.json()
      console.log('=== API Response Data ===')
      console.log(JSON.stringify(data, null, 2))

      if (data.error) {
        throw new Error(`API Error: ${data.error}`)
      }
      
      if (!data[0]?.generated_text) {
        throw new Error('No generated text in response')
      }
      
      setAiResponse(data[0].generated_text)
    } catch (error) {
      console.error('Detailed error:', error)
      setAiResponse(`Error generating response: ${error.message}. Please make sure you have a valid Hugging Face API token and try again.`)
    } finally {
      setIsGenerating(false)
    }
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
                  <div className="flex gap-2">
                    {!inputValue.trim() && (
                      <button
                        onClick={handleSkip}
                        className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 transition-colors"
                      >
                        Skip
                      </button>
                    )}
                    {inputValue.trim() && (
                      <button
                        onClick={handleNext}
                        className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition-colors"
                      >
                        Next
                      </button>
                    )}
                  </div>
                )}
                {currentQuestion.type === 'yesno' && (
                  <button
                    onClick={handleSkip}
                    className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 transition-colors"
                  >
                    Skip
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-800 p-6 rounded-lg space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl">Generated Prompt</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => navigator.clipboard.writeText(formatPrompt(answers))}
                  className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Copy to Clipboard
                </button>
                <button
                  onClick={generateAIResponse}
                  disabled={isGenerating}
                  className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {isGenerating ? 'Generating...' : 'Generate Response'}
                </button>
              </div>
            </div>
            <pre className="whitespace-pre-wrap bg-gray-900 p-4 rounded-lg overflow-auto">
              {formatPrompt(answers)}
            </pre>
            
            {aiResponse && (
              <div className="mt-6">
                <h3 className="text-xl mb-3">AI Response</h3>
                <div className="bg-gray-900 p-4 rounded-lg whitespace-pre-wrap">
                  {aiResponse}
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText(aiResponse)}
                  className="mt-2 px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Copy Response
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
