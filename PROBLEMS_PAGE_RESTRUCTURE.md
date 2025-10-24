# Problems Page Restructure

## Major Changes

### Category-Based Organization ✅
Replaced difficulty-level tabs with **category tabs**:
- **VLSI** - Digital design, logic gates, processors, memory controllers
- **Embedded** - Communication protocols, GPIO, interrupts, real-time systems
- **DSP** - Signal processing, filters, FFT, oscillators
- **Software** - Data structures, algorithms, memory management, design patterns

### Filtering System ✅
- **Primary Filter:** Category tabs (VLSI, Embedded, DSP, Software)
- **Secondary Filter:** Difficulty levels (All, Beginner, Intermediate, Expert)
- **Search:** Text search across problem titles and tags

### User Experience Flow
1. User selects a category (e.g., VLSI)
2. Only VLSI problems are displayed
3. User can further filter by difficulty (Beginner/Intermediate/Expert)
4. Search works within the selected category

## Problem Distribution

### VLSI (6 problems)
- 2 Beginner
- 2 Intermediate  
- 2 Expert

### Embedded (4 problems)
- 1 Beginner
- 2 Intermediate
- 1 Expert

### DSP (4 problems)
- 1 Beginner
- 2 Intermediate
- 1 Expert

### Software (4 problems)
- 1 Beginner
- 2 Intermediate
- 1 Expert

**Total: 18 problems across 4 categories**

## Visual Design

### Category Tabs
- Large, prominent buttons with bold styling
- Active category has secondary-500 background with strong shadow
- Inactive categories have white background with subtle shadow
- 4px black borders for sticker effect

### Filter Section
- Difficulty filters below category tabs
- "Filter:" label for clarity
- Smaller buttons compared to category tabs
- Active filter highlighted with accent-500 color

### Dynamic Header
- Title changes based on selected category
- Shows "{Category} Problems" (e.g., "VLSI Problems")
- Subtitle adapts to category context

## Benefits

1. **Better Organization:** Problems grouped by domain expertise
2. **Easier Navigation:** Users can focus on their area of interest
3. **Scalability:** Easy to add more problems to each category
4. **Clear Hierarchy:** Category → Difficulty → Search
5. **Professional Structure:** Matches industry domains

## Future Enhancements

- Add problem count badges to category tabs
- Show completion percentage per category
- Add subcategories (e.g., VLSI → Combinational, Sequential)
- Category-specific icons or colors
- Recommended learning paths within each category
