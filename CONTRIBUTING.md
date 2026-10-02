# Contributing to UNO Multiplayer

Thank you for your interest in contributing to UNO Multiplayer! 🎮

Contributions, bug fixes, improvements, and suggestions are welcome.

## 🚀 Getting Started

1. Fork the repository.
2. Clone your fork.
3. Create a new branch for your changes.
4. Install the client and server dependencies.
5. Make your changes.
6. Test your changes locally.
7. Commit your changes.
8. Open a Pull Request.

## 💻 Development Setup

### Server

```bash
cd server
npm install
npm run dev
```

### Client

Open another terminal:

```bash
cd client
npm install
npm start
```

The server runs on port `5000` by default.

## 🌿 Branches

Use descriptive branch names such as:

```text
feature/add-chat
fix/uno-validation
improvement/lobby-ui
```

Avoid making unrelated changes in the same branch.

## 📝 Commit Guidelines

Keep commit messages short and descriptive.

Examples:

```text
feat: add private room support
fix: correct draw card validation
ui: improve lobby animations
docs: update README
```

## 🔍 Pull Requests

Before submitting a Pull Request:

- Make sure the client builds successfully.
- Make sure the server starts without errors.
- Check that your changes do not break existing gameplay.
- Keep the Pull Request focused on one feature or fix.
- Clearly describe what was changed.

## 🎨 Code Guidelines

- Keep the existing project structure where possible.
- Use clear and meaningful names.
- Avoid unnecessary dependencies.
- Keep game-rule logic on the server.
- Never commit secrets, API keys, passwords, or `.env` files.
- Keep UI components reusable where practical.

## 🐛 Reporting Bugs

When reporting a bug, include:

- A clear description of the problem.
- Steps to reproduce it.
- Expected behavior.
- Actual behavior.
- Screenshots or logs when useful.

## 💡 Feature Requests

For new features, explain:

- What problem the feature solves.
- How you expect it to work.
- Any relevant UI or gameplay considerations.

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).
