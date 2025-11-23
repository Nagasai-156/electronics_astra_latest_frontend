# API Integration Guide - Student Frontend

## Overview
The student frontend is now fully integrated with the backend API for real-time problem fetching, code execution, and submission.

## API Endpoints

### Base URL
- Development: `http://localhost:4000`
- Configured via: `NEXT_PUBLIC_API_URL` environment variable

### Available Endpoints

1. **Get All Problems**
   - Endpoint: `GET /api/problems`
   - Function: `getProblems()`
   - Returns: Array of all problems

2. **Get Problem by Slug**
   - Endpoint: `GET /api/problems/:slug`
   - Function: `getProblemBySlug(slug)`
   - Returns: Single problem object

3. **Get Problem by ID**
   - Endpoint: `GET /api/problems/:id`
   - Function: `getProblemById(id)`
   - Returns: Single problem object
   - Fallback: If direct ID fetch fails, gets all problems and returns by index

4. **Get Published Problems**
   - Function: `getPublishedProblems()`
   - Returns: Array of problems where `isActive === true`

5. **Run Code (Sample Tests)**
   - Endpoint: `POST /api/submissions/run`
   - Function: `runCode(problemId, code, language)`
   - Body: `{ problemId, code, language, runType: 'sample' }`
   - Returns: Test results for sample test cases only

6. **Submit Solution (All Tests)**
   - Endpoint: `POST /api/submissions`
   - Function: `submitSolution(problemId, code, language)`
   - Body: `{ problemId, code, language, runType: 'full' }`
   - Returns: Test results for all test cases (including hidden)

## Pages with API Integration

### 1. Problems List Page (`/problems`)
**File**: `app/problems/page.tsx`

**Features**:
- Fetches all published problems on page load
- Displays problems in a table with pagination
- Guest access: Limited to first 2 problems
- Authenticated users: Full access to all problems

**API Calls**:
```typescript
useEffect(() => {
  async function fetchProblems() {
    const data = await getPublishedProblems()
    setProblems(transformedProblems)
  }
  fetchProblems()
}, [])
```

**Data Transformation**:
- Maps API response to display format
- Adds display ID (index + 1)
- Includes slug for routing
- Filters by category, difficulty, and search

### 2. Problem Solving Page (`/problems/[id]`)
**File**: `app/problems/[id]/page.tsx`

**Features**:
- Fetches problem data by ID
- Loads starter code for selected language
- Initializes test cases from problem data
- Real-time code execution
- Solution submission with full test suite

**API Calls**:

1. **Load Problem**:
```typescript
useEffect(() => {
  async function fetchProblem() {
    const data = await getProblemById(problemId)
    setProblem(data)
    // Initialize language and test cases
  }
  fetchProblem()
}, [problemId])
```

2. **Run Code**:
```typescript
const handleRun = async () => {
  const result = await runCode(problem.id, code, selectedLanguage)
  // Update test cases with results
  setTestCases(updatedTests)
}
```

3. **Submit Solution**:
```typescript
const handleSubmit = async () => {
  const result = await submitSolution(problem.id, code, selectedLanguage)
  // Display all test results
  setTestCases(allTests)
}
```

## Problem Data Structure

### Expected API Response Format

```typescript
{
  id: number
  slug: string
  title: string
  description: string // HTML content
  difficulty: 'BEGINNER' | 'MEDIUM' | 'HARD'
  category: string
  tags: string[]
  points: number
  isActive: boolean
  languages: string[] // e.g., ['Verilog', 'VHDL']
  starterCode: {
    Verilog?: string
    VHDL?: string
    SystemVerilog?: string
  }
  testCases: Array<{
    id: number
    input: string
    expectedOutput: string
    isSample: boolean
  }>
}
```

### Test Result Format

```typescript
{
  testResults: Array<{
    id: number
    input: string
    expectedOutput: string
    actualOutput: string
    passed: boolean
    error?: string
  }>
  totalTests: number
  passedTests: number
  failedTests: number
  executionTime?: string
}
```

## Error Handling

### Graceful Degradation
Both pages include fallback mechanisms:

1. **API Failure Fallback**:
   - Problems page: Uses mock data if API fails
   - Solving page: Uses mock execution if API fails

2. **Loading States**:
   - Displays loading spinners during API calls
   - Shows error messages if requests fail

3. **User Feedback**:
   - Clear error messages
   - Status indicators for code execution
   - Progress messages during submission

### Example Error Handling

```typescript
try {
  const result = await runCode(problemId, code, language)
  // Handle success
} catch (error) {
  console.error('Run error:', error)
  setOutput(`❌ Error: ${error.message}`)
  // Fallback to mock execution
}
```

## Authentication Integration

### Guest Access
- Can view first 2 problems
- Can access problem solving page for problems 1-2
- Cannot submit solutions
- Prompted to sign in for full access

### Authenticated Users
- Full access to all problems
- Can run code and submit solutions
- Access to submission history (when implemented)
- Access to discussions and hints

### Access Control

```typescript
const canAccess = isAuthenticated || problemId <= guestProblemLimit

if (!canAccess) {
  // Show locked screen with sign-in prompt
}
```

## Environment Configuration

### Required Environment Variables

Create `.env.local` in the frontend root:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### Backend Requirements

The backend must be running and accessible at the configured URL:
- Default: `http://localhost:4000`
- Endpoints must return data in the expected format
- CORS must be configured to allow frontend origin

## Testing the Integration

### 1. Start Backend
```bash
cd electronics_astra_backend
npm run dev
```

### 2. Start Frontend
```bash
cd electronics_astra_latest_frontend
npm run dev
```

### 3. Test Flows

**Problems List**:
1. Navigate to http://localhost:3001/problems
2. Verify problems load from API
3. Test filters and search
4. Test pagination

**Problem Solving**:
1. Click on a problem
2. Verify problem data loads
3. Select language (if multiple available)
4. Write code
5. Click "Run" to test with sample cases
6. Click "Submit" to test with all cases
7. Verify test results display correctly

## Future Enhancements

### Planned Features
1. **Submission History**: Fetch and display previous submissions
2. **Real-time Compilation**: WebSocket integration for live feedback
3. **Discussions API**: Backend integration for discussions
4. **Hints System**: API for unlocking hints with points
5. **User Progress**: Track solved problems and statistics
6. **Leaderboard**: Global and category-specific rankings

### API Endpoints to Implement
- `GET /api/submissions/user/:userId` - User's submission history
- `GET /api/discussions/problem/:problemId` - Problem discussions
- `POST /api/hints/unlock` - Unlock hint with points
- `GET /api/users/:userId/progress` - User progress stats
- `GET /api/leaderboard` - Global leaderboard

## Troubleshooting

### Common Issues

1. **404 Errors**:
   - Check backend is running on correct port
   - Verify API_URL environment variable
   - Check CORS configuration

2. **Data Not Loading**:
   - Open browser console for errors
   - Check network tab for failed requests
   - Verify backend response format

3. **Code Execution Fails**:
   - Check backend compilation service is running
   - Verify problem has test cases defined
   - Check backend logs for errors

### Debug Mode

Enable detailed logging:
```typescript
// In api.ts
console.log('API Request:', endpoint, body)
console.log('API Response:', response)
```

## Contact & Support

For issues or questions:
- Check backend logs: `electronics_astra_backend/logs`
- Check frontend console: Browser DevTools
- Review API documentation: Backend README.md
