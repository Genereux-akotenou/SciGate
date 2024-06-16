### SciGate
SciGate is a user-friendly graphical interface designed to simplify access to high-performance computing (HPC) resources. By seamlessly integrating SSH connections, SciGate allows researchers to manage files, execute commands, and interact with HPC servers without needing extensive terminal experience.

#### Contribution
- Open a pull request with a description of the changes.
- Ensure your code follows the project's coding standards.
- Include relevant tests and ensure all existing tests pass.

#### Setup
- npm i
- npm run dev

#### Directory

```diff
+ ├─┬ electron
+ │ ├─┬ main
+ │ │ └── index.ts
+ │ └─┬ preload
+ │   └── index.ts
  ├─┬ src
  │ └── main.ts
  ├── index.html
  ├── package.json
  └── vite.config.ts
```

#### Source
This project is based on this template https://electron-vite.github.io/