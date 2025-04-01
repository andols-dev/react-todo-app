# 🚀 **Todo List App with React & Bootstrap**

## ✨ Description
Welcome to my Todo List App! This application makes it easy to manage your daily tasks with a clean and responsive interface built with **React** and **Bootstrap**. Keep track of your to-dos, add new tasks, update or delete them – all in real-time, and saved to **localStorage** to ensure your tasks remain even if you close the browser!

## 🛠️ **Features**
- ✅ **Add new todo items**: Easily input new tasks directly into the app.
- ✏️ **Update todo items**: Click on "Update" to modify your task at any time.
- 🗑️ **Delete todo items**: If a task is no longer relevant, you can remove it with a single click.
- 💾 **LocalStorage support**: Your todo list is saved to the browser’s localStorage, meaning your tasks persist even after closing or refreshing the page.

## 🎨 **Style and Design**
This app uses **Bootstrap** to provide a modern and responsive design that works seamlessly on mobile devices, tablets, and desktops. This ensures that your todo list looks great on all devices without any extra effort!

## 📦 **Installation**
To get started with the app on your local machine, follow these simple steps:

### Step 1: Clone the repository
```bash
git clone https://github.com/andols-dev/todo-list-react.git
```

### Step 2: Install dependencies
Navigate to the project folder and install all dependencies using npm:
```bash
cd todo-list-react
npm install
```

### Step 3: Run the app
Start the app locally:
```bash
npm start
```
The app will now open at `http://localhost:3000`.

## 🛠️ **Tech Stack**
- **React**: For building a dynamic user interface.
- **Bootstrap**: For a sleek and responsive design without needing to write custom CSS rules.
- **uuid**: For generating unique IDs for each todo item.

## 🔄 **How It Works**
The app is built using React’s state management (`useState`) to keep track of the todo list. We also use `useEffect` to read from and write to **localStorage**, meaning your list is saved and can be used even after closing and reopening the app.

