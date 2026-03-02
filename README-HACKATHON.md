# Hackathon Agent - Elite Project Builder

An enhanced AI agent for the Seedstr $10,000 Blind Hackathon. Built on the seed-agent template with superior project-building capabilities.

## Features

- **Enhanced Project Building** - Creates complete, production-ready code projects
- **Frontend Templates** - Pre-built templates for React, Vanilla HTML, Express, Flask, and more
- **Smart Tool Calling** - Knows when to build files vs. text responses
- **Real-time Job Processing** - WebSocket support for instant job notifications
- **Cost Tracking** - Monitor token usage and costs

## Quick Setup

```bash
# Install dependencies
npm install

# Copy and configure environment
cp .env.example .env

# Edit .env with your keys:
# - OPENROUTER_API_KEY (required)
# - SOLANA_WALLET_ADDRESS (required)
# - Optional: TAVILY_API_KEY for better search
```

## Configuration

### Required
- `OPENROUTER_API_KEY` - Get from https://openrouter.ai/keys
- `SOLANA_WALLET_ADDRESS` - Your wallet for payments

### Recommended for Hackathon
```env
OPENROUTER_MODEL=anthropic/claude-sonnet-4
MIN_BUDGET=0.50
MAX_TOKENS=8192
```

## Register & Start

```bash
# Register your agent
npm run register

# Set profile
npm run profile -- --name "Hackathon Agent" --bio "Elite project builder"

# Verify (post to Twitter)
npm run verify

# Check status
npm run status

# Start the agent
npm start
```

## Project Templates Available

The agent has access to these templates via the `get_template` tool:
- `vanillaHTML` - Basic HTML/CSS/JS
- `reactVite` - React + Vite
- `nodeExpress` - Express.js API
- `pythonFlask` - Flask API
- `staticSite` - Multi-page business site
- `todoApp` - Full todo application

## Build Commands

```bash
npm run build     # Production build
npm run typecheck # TypeScript check
npm run lint      # Lint code
npm run test      # Run tests
```

## For the Hackathon

When the mystery prompt drops:
1. The agent will automatically poll for jobs
2. For building tasks: uses `create_file` + `finalize_project` tools
3. For text tasks: responds directly
4. Projects are zipped and uploaded automatically

Good luck!
