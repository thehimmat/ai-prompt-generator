# AI Prompt Generator

A web application that helps developers create detailed AI development prompts by guiding them through a structured questionnaire about their app requirements.

## Purpose

This tool streamlines the process of creating comprehensive AI development prompts by:
- Walking through all important aspects of app development
- Collecting structured information about requirements
- Generating a well-formatted prompt ready for AI coding assistants

## Features

- **Structured Survey Flow**: Questions organized by categories:
  - General Overview
  - Tech Stack
  - Core Features & Functionality
  - AI & Automation
  - Design & User Experience
  - Deployment & Hosting
  - Scalability & Performance
  - Security & Privacy
  - Additional Considerations

- **User-Friendly Interface**:
  - Progress tracking
  - One question at a time
  - Support for text, textarea, and yes/no inputs
  - Easy navigation between questions
  - Dark theme for reduced eye strain

## Prerequisites

1. Get a Hugging Face API token (required for both installation methods):
   - Visit [Hugging Face](https://huggingface.co/)
   - Create an account or sign in
   - Go to your profile settings
   - Navigate to "Access Tokens"
   - Create a new token
   - Keep this token handy for the setup process

## Getting Started

### Option 1: Using Docker (Recommended)

Prerequisites: Docker and Docker Compose installed on your system

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-prompt-generator.git
cd ai-prompt-generator
```

2. Create and configure the environment:
```bash
cp .env.example .env
```
Then edit the `.env` file and add your Hugging Face token:
```
VITE_HUGGING_FACE_TOKEN=your_token_here
```

3. Build and run with Docker Compose:
```bash
docker compose up --build
```

4. Open your browser and navigate to `http://localhost:5173`

### Option 2: Local Installation

Prerequisites: Node.js (version 14 or higher) and npm installed

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-prompt-generator.git
cd ai-prompt-generator
```

2. Create and configure the environment:
```bash
cp .env.example .env
```
Then edit the `.env` file and add your Hugging Face token:
```
VITE_HUGGING_FACE_TOKEN=your_token_here
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Technology Stack

- React + Vite
- Tailwind CSS for styling
- Built with modern JavaScript

## Development

This project uses:
- Vite for fast development and building
- ESLint for code quality
- Tailwind CSS for utility-first styling

## Deployment

The app can be easily deployed to platforms like Vercel with zero configuration needed.

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this tool for any purpose.
