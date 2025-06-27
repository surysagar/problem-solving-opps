# Problem Solving Editor

A modern web application for practicing coding problems with a beautiful UI and interactive features.

## Features

- Browse a collection of coding problems
- View problem details and test cases
- Toggle solution visibility
- **Add custom problems dynamically** - Create your own coding problems with a form interface
- **Generate code for problem files** - Automatically generate TypeScript code to add custom problems to the actual problem files
- **Persistent storage** - Custom cards are saved locally and persist across sessions
- **Delete custom cards** - Remove custom cards with hover-to-reveal delete button
- Modern and responsive UI
- Dark mode support

## Custom Cards Feature

### Adding New Cards
- Click the "Add New Card" button on any problem category page
- Fill out the form with:
  - **Title**: The problem title
  - **Description**: Brief description of the problem
  - **Difficulty**: Easy, Medium, or Hard
  - **Solution**: Your code solution
  - **Explanation**: Optional explanation of the solution
- Click "Create Card" to add the card to the top of the list
- **Code Generation**: After creating a card, a code generator will automatically open showing the TypeScript code to add to the problem file

### Managing Custom Cards
- Custom cards appear with a blue "Custom" badge
- Hover over custom cards to reveal action buttons:
  - **&lt;/&gt;** button: Generate code for the problem file
  - **×** button: Delete the custom card
- Custom cards are automatically saved to localStorage
- Custom cards appear at the top of each category's problem list

### Adding to Problem Files
- After creating a custom card, the code generator will show the exact TypeScript code needed
- Copy the generated code
- Open the corresponding problem file (e.g., `src/lib/problems/recursionProblems.ts`)
- Paste the code at the beginning of the problems array
- Save the file and restart your development server
- The custom problem will now be part of the permanent codebase

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Radix UI
- Lucide Icons

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
  ├── app/              # Next.js app directory
  ├── components/       # React components
  │   ├── AddCardDialog.tsx  # Custom card creation form
  │   ├── CodeGenerator.tsx  # Code generation for problem files
  │   ├── ProblemCard.tsx    # Individual problem cards
  │   └── ...
  ├── lib/             # Utility functions and data
  │   └── problems/    # Problem definitions
  ├── styles/          # Global styles
  └── types/           # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

MIT 