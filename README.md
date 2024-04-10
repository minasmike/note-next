# NoteApp Readme

This is a README file for a NoteApp built using Next.js, Formik, Yup, Quill, and other related dependencies. The NoteApp allows users to create and manage notes with rich text formatting.

## Installation

To install and run the NoteApp, follow these steps:

1. Clone the repository or download the source code.

2. Navigate to the project directory.

3. Install the dependencies by running the following command:

   ```shell
   npm install
   ```

4. Start the development server:

   ```shell
   npm run dev
   ```

5. Open your web browser and visit `http://localhost:3000` to access the NoteApp.

## Usage

Once the NoteApp is up and running, you can perform the following actions:

- Create a new note by clicking on the "New Note" button.

- Edit an existing note by clicking on it in the note list.

- Delete a note by clicking on the delete icon next to it.

- Format the text of a note using the rich text editor provided by Quill.

- Save changes to a note by clicking on the "Save" button.

- View the list of all notes on the sidebar.

## Dependencies

The NoteApp relies on the following dependencies:

- **@emotion/react**: Provides CSS-in-JS capabilities for styling components.

- **@emotion/styled**: A CSS-in-JS library that works seamlessly with Next.js.

- **@mui/icons-material**: Material-UI icons library for adding icons to the UI.

- **@mui/material**: Material-UI component library for building the UI.

- **@tiptap/pm**: ProseMirror, a toolkit for building rich-text editors.

- **@tiptap/react**: React bindings for ProseMirror.

- **@tiptap/starter-kit**: A starter kit for building ProseMirror editors with React.

- **@types/dompurify**: TypeScript type definitions for dompurify.

- **dompurify**: A DOM-only, super-fast, and secure sanitizer library.

- **flowbite-react**: A UI component library based on React.

- **formik**: A popular form management library for React.

- **isomorphic-dompurify**: A DOM purifier that works in both browser and server environments.

- **next**: A React framework for building server-rendered applications.

- **react**: A JavaScript library for building user interfaces.

- **react-dom**: Provides DOM-specific methods for React.

- **react-quill**: A Quill.js component for React, providing a rich text editor.

- **react-router-dom**: A routing library for React applications.

- **yup**: A JavaScript schema builder for value parsing and validation.

## Development Dependencies

The NoteApp uses the following development dependencies:

- **@types/node**: TypeScript type definitions for Node.js.

- **@types/react**: TypeScript type definitions for React.

- **@types/react-dom**: TypeScript type definitions for ReactDOM.

- **autoprefixer**: A tool to parse CSS and add vendor prefixes automatically.

- **daisyui**: A utility-first CSS framework for rapid UI development.

- **eslint**: A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.

- **eslint-config-next**: ESLint configuration for Next.js projects.

- **mini-css-extract-plugin**: Extracts CSS into separate files during the build process.

- **postcss**: A tool for transforming CSS with JavaScript.

- **tailwindcss**: A utility-first CSS framework used with PostCSS.

- **typescript**: A typed superset of JavaScript that compiles to plain JavaScript.

## Scripts

The following scripts are available to run the NoteApp:

- **dev**: Starts the development server.

- **build**: Builds the production-ready version of the application.

- **start**: Runs the built version of the application.

- **lint**: Runs ESLint to check the code for potential issues.

## License

The NoteApp is released under the [MIT License](LICENSE).
