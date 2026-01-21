🌳 AVL Tree Visualizer

An interactive AVL Tree Visualization tool built using HTML, CSS, and Vanilla JavaScript.
This project demonstrates how self-balancing binary search trees work by visually showing insertions, deletions, balance factors, and rotations in real time.

🧠 What is an AVL Tree?

An AVL Tree is a self-balancing Binary Search Tree (BST) where, for every node:

Balance Factor = height(left subtree) − height(right subtree)

The balance factor must always be −1, 0, or +1.

To maintain this balance, the tree performs rotations automatically after insertions and deletions.

Supported Rotations

Left Rotation – fixes right-heavy imbalance

Right Rotation – fixes left-heavy imbalance

Left-Right Rotation – left rotation on child + right rotation on node

Right-Left Rotation – right rotation on child + left rotation on node

All rotations are applied dynamically and logged during execution.

🎮 Features & Usage

Tree Operations

Insert Node

Enter a numeric value and click Insert

Duplicate values are prevented

Delete Node

Enter an existing value and click Delete

Tree automatically rebalances after deletion

Random Insert

Inserts a random unique value (1–100)

Clear Tree

Resets the entire tree and history

📊 Live Visualization

Animated SVG-based tree rendering

Nodes are color-coded based on balance factor:

🟢 Balanced (BF = 0)

🟡 Slightly imbalanced (BF = ±1)

🔴 Requires rotation (BF = ±2)

Each node displays:

Node value

Balance factor

📈 Tree Statistics

Inorder Traversal (always sorted)

Total number of nodes

Height of the AVL tree

📜 Operation History

Tracks last 10 operations:

Insertions

Deletions

Rotations

Includes visual icons for clarity

🔔 Notifications

Success, warning, and error notifications

User-friendly feedback for:

Invalid inputs

Duplicate values

Missing nodes

💻 Technical Implementation
Core Data Structure

AVLNode class:

value, left, right

height tracking

Recursive insertion and deletion

Automatic rebalancing using rotations

Balance factor calculation at every node

Visualization Logic

SVG rendering without external libraries

Dynamic coordinate calculation for nodes

Recursive layout positioning

Smooth animations using CSS keyframes

Key Algorithms Implemented

Height calculation

Balance factor computation

Inorder traversal

Minimum value node selection

AVL rotations (LL, RR, LR, RL)

🛠️ Technologies Used

HTML5 – Structure

CSS3 – Styling, gradients, animations

JavaScript (ES6) – AVL logic & DOM manipulation

SVG – Tree visualization

No external libraries or frameworks required.

🚀 How to Run the Project

Clone or download the repository

Open avl.html in any modern web browser

Start inserting or deleting values to visualize AVL operations

🤝 Contributing

Contributions are welcome!

You can help by:

Reporting bugs

Suggesting enhancements

Improving UI or animations

Adding new traversal visualizations

Please follow clean code practices and test your changes before submitting a pull request.

📌 Future Enhancements

Step-by-step animation controls

Preorder and Postorder traversal views

Rotation-specific animations

Export tree structure

Dark/light theme toggle

📜 License

This project is open-source and available for educational and learning purposes.
