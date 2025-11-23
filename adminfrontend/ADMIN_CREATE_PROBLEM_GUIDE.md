# Admin - Create HDL Problem Page

## Complete Implementation Guide

This document describes the fully implemented admin problem creation page for HDL (Verilog/VHDL) problems with testbench-based autograding.

---

## ✅ Implemented Features

### 1. Problem Metadata Section
- **Title** (required) - Problem name
- **Slug** (required) - Auto-generated URL identifier
- **Category** (required) - VLSI / Logic / Sequential / FSM / Combinational
- **Difficulty** (required) - BEGINNER / MEDIUM / HARD
- **Language** (required) - VERILOG or VHDL (radio buttons)
- **Tags** (optional) - Multi-tag input with add/remove

### 2. Problem Description Section
- **Description** (required) - Rich textarea for problem explanation
- **Diagram** (optional) - Two options:
  - URL input
  - File upload with preview
- **Input Description** (optional)
- **Output Description** (optional)
- **Constraints** (optional)

### 3. Examples Section
- Multiple examples support
- Each example contains:
  - **Input** - Example input values
  - **Output** - Expected output values
  - **Explanation** - Detailed explanation
  - **Image** (optional) - Visual diagram with upload and preview
- Add/Remove examples dynamically

### 4. HDL Code Editors Section
Three Monaco-style code editors:

#### a) Student Template Code (Required, Visible)
- Module/entity skeleton for students
- Syntax highlighting based on selected language
- Placeholder examples for Verilog/VHDL

#### b) Hidden Testbench Code (Required, Admin Only)
- Show/Hide toggle for security
- Must print PASS/FAIL for each test case
- Used for autograding
- Yellow background to indicate admin-only
- Example format:
  ```verilog
  $display("TEST:TC1 STATUS:PASS");
  $display("TEST:TC2 STATUS:FAIL EXP:1 GOT:%b", y);
  ```

#### c) Reference Solution (Optional, Admin Only)
- Show/Hide toggle
- Internal reference implementation
- Green background to indicate optional

### 5. Auto-Grading Settings Section
- **Enable Waveform Output** - Toggle for VCD generation
- **Timeout** - Execution timeout (1000-10000ms, default 3000)
- **Runner** - Auto-detected based on language:
  - Verilog → Icarus Verilog (iverilog)
  - VHDL → GHDL

### 6. Action Buttons
- **Save as Draft** - Saves with `isActive: false`
- **Publish Problem** - Saves with `isActive: true`
- Form validation before save
- Loading state during save

---

## 📁 File Structure

```
adminfrontend/
├── app/
│   └── dashboard/
│       └── problems/
│           └── create/
│               └── page.tsx                    # Main create page
├── components/
│   ├── ProblemForm.tsx                         # Main form orchestrator
│   └── form/
│       ├── MetadataSection.tsx                 # Section 1
│       ├── DescriptionSection.tsx              # Section 2
│       ├── ExamplesSection.tsx                 # Section 3
│       ├── CodeEditorsSection.tsx              # Section 4
│       └── AutogradingSection.tsx              # Section 5
```

---

## 🔄 Data Flow

### Form Data Structure
```typescript
{
  // Metadata
  title: string
  slug: string
  category: 'VLSI' | 'Logic' | 'Sequential' | 'FSM' | 'Combinational'
  difficulty: 'BEGINNER' | 'MEDIUM' | 'HARD'
  language: 'VERILOG' | 'VHDL'
  tags: string[]
  
  // Description
  description: string
  diagram_url: string
  diagram_upload_type: 'url' | 'upload'
  input_description: string
  output_description: string
  constraints: string
  
  // Examples
  examples: Array<{
    input: string
    output: string
    explanation: string
    image: string | null
  }>
  
  // Code
  studentTemplate: string
  testbench: string
  referenceSolution: string
  
  // Settings
  settings: {
    waveform: boolean
    timeout: number
  }
  
  // Status
  isActive: boolean
}
```

### Backend API Payload

#### Step 1: Create Problem
```typescript
POST /api/problems
{
  title: string
  slug: string
  category: string
  difficulty: string
  language: string
  tags: string[]
  description: string
  diagram_url: string
  input_description: string
  output_description: string
  constraints: string
  examples: Array<{...}>
  settings: {
    waveform: boolean
    timeout: number
  }
  isActive: boolean
}

Response: { problemId: string }
```

#### Step 2: Upload Code Files
```typescript
POST /api/problems/:problemId/files
{
  type: 'STUDENT_TEMPLATE' | 'TESTBENCH' | 'REFERENCE_SOLUTION'
  language: 'VERILOG' | 'VHDL'
  content: string
}
```

---

## 🎨 UI/UX Features

- **Neobrutalism Design** - Bold borders, shadows, vibrant colors
- **Responsive Layout** - Works on all screen sizes
- **Real-time Validation** - Checks required fields before save
- **Auto-slug Generation** - Creates URL-friendly slug from title
- **Language-aware Placeholders** - Code examples change based on Verilog/VHDL
- **Image Previews** - Instant preview for uploaded diagrams
- **Toggle Visibility** - Hide sensitive testbench/reference code
- **Loading States** - Visual feedback during save operations

---

## 🚀 Usage

1. Navigate to `/dashboard/problems/create`
2. Fill in all required fields (marked with *)
3. Add examples with optional images
4. Write student template and testbench code
5. Configure autograding settings
6. Click "Save as Draft" or "Publish Problem"

---

## ✅ Validation Rules

- Title, Slug, Category, Difficulty, Language are required
- Description is required
- Student Template code is required
- Testbench code is required
- Slug must be unique (backend validation)
- Timeout must be between 1000-10000ms

---

## 🔧 Customization

### Adding New Categories
Edit `MetadataSection.tsx`:
```tsx
<option value="NewCategory">New Category</option>
```

### Changing Default Settings
Edit `ProblemForm.tsx` initial state:
```tsx
settings: {
  waveform: true,
  timeout: 5000  // Change default
}
```

### Adding More Code Editors
Add new editor in `CodeEditorsSection.tsx` following the same pattern.

---

## 📝 Notes

- Currently uses localStorage for demo purposes
- Replace API calls in `create/page.tsx` with actual backend endpoints
- Testbench must follow the output format: `TEST:TCX STATUS:PASS/FAIL`
- Images are stored as base64 data URLs (consider cloud storage for production)
- Monaco editor integration can be added for better code editing experience

---

## 🎯 Production Checklist

- [ ] Replace localStorage with actual API calls
- [ ] Add Monaco editor for syntax highlighting
- [ ] Implement image upload to cloud storage (S3, Cloudinary)
- [ ] Add rich text editor for description (TipTap, Quill)
- [ ] Implement slug uniqueness validation
- [ ] Add autosave functionality
- [ ] Add preview mode before publishing
- [ ] Implement edit problem page (reuse same form)
- [ ] Add bulk import from JSON
- [ ] Add problem duplication feature

---

## 🐛 Troubleshooting

**Issue**: Code not saving
- Check browser console for errors
- Verify all required fields are filled
- Check localStorage quota

**Issue**: Images not displaying
- Verify file size < 5MB
- Check image format (PNG, JPG, SVG)
- Ensure base64 encoding is correct

**Issue**: Language-specific placeholders not updating
- Check that language field is properly set
- Verify CodeEditorsSection is receiving updated data

---

## 📚 Related Documentation

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide
- [HOW-TO-USE.txt](./HOW-TO-USE.txt) - General usage guide
- [example-problem.json](./example-problem.json) - Sample problem structure
