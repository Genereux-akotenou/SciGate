### SciGate
SciGate is a user-friendly graphical interface designed to simplify access to high-performance computing (HPC) resources. By seamlessly integrating SSH connections, SciGate allows researchers to manage files, execute commands, and interact with HPC servers without needing extensive terminal experience.

<img src="./app0.png" style="width: 95%;" />
<img src="./app1.png" style="width: 95%;" />
<img src="./app2.png" style="width: 95%;" />

#### Setup
- `npm i`
- `npm run dev`

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
We use as start bleuprint this template https://electron-vite.github.io/

#### Contribution
- Open a pull request with a description of the changes.
- Ensure your code follows the project's coding standards.