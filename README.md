# 🌳 AVL Tree Visualizer

An interactive AVL Tree Visualization tool built using HTML, CSS, and Vanilla JavaScript.  
This project demonstrates how self-balancing binary search trees work by visually showing insertions, deletions, balance factors, and rotations in real time.

---

## 🧠 What is an AVL Tree?

An AVL Tree is a self-balancing Binary Search Tree (BST) where, for every node:

    Balance Factor = height(left subtree) − height(right subtree)

The balance factor must always be −1, 0, or +1.

To maintain this balance, the tree automatically performs rotations after insertions and deletions.

---

## 🔄 Supported Rotations

1. Left Rotation  
   Applied when a right-heavy imbalance occurs.

2. Right Rotation  
   Applied when a left-heavy imbalance occurs.

3. Left-Right Rotation  
   A left rotation on the child node followed by a right rotation on the parent node.

4. Right-Left Rotation  
   A right rotation on the child node followed by a left rotation on the parent node.

All rotations are applied dynamically and logged during execution.

---

## 🎮 Features & Usage

### 🔢 Tree Operations

1. Insert Node  
   Enter a numeric value and click Insert to add the node to the AVL tree. Duplicate values are automatically prevented.

2. Delete Node  
   Enter an existing value and click Delete to remove the node. The tree automatically rebalances after deletion.

3. Random Insert  
   Inserts a randomly generated unique value between 1 and 100.

4. Clear Tree  
   Resets the entire tree and clears the operation history.

---

## 📊 Live Visualization

1. The tree is rendered using animated SVG graphics.
2. Nodes are color-coded based on their balance factor.
3. Green nodes represent balanced states with balance factor 0.
4. Yellow nodes indicate slight imbalance with balance factor ±1.
5. Red nodes indicate critical imbalance requiring rotation (±2).
6. Each node displays its value and current balance factor.

---

## 📈 Tree Statistics

1. Displays inorder traversal, which is always sorted.
2. Shows the total number of nodes in the tree.
3. Displays the current height of the AVL tree.

---

## 📜 Operation History

1. Tracks the last 10 operations performed.
2. Logs insertions, deletions, and rotations.
3. Uses visual icons to clearly distinguish operation types.

---

## 🔔 Notifications

1. Displays success notifications for valid operations.
2. Shows warning messages for duplicate values.
3. Shows error messages for invalid inputs or missing nodes.
4. Provides clear, user-friendly feedback for all actions.

---

## 💻 Technical Implementation

### Core Data Structure

1. Uses an AVLNode class containing value, left child, right child, and height.
2. Implements recursive insertion and deletion logic.
3. Automatically rebalances the tree using AVL rotations.
4. Calculates balance factor at every node after each operation.

---

### Visualization Logic

1. Uses pure SVG rendering without external libraries.
2. Dynamically calculates node coordinates.
3. Uses recursive layout positioning for tree structure.
4. Applies smooth animations using CSS keyframes.

---

### Key Algorithms Implemented

1. Height calculation
2. Balance factor computation
3. Inorder traversal
4. Minimum value node selection
5. AVL rotations (LL, RR, LR, RL)

---

## 🛠️ Technologies Used

1. HTML5 for structure
2. CSS3 for styling, gradients, and animations
3. JavaScript (ES6) for AVL logic and DOM manipulation
4. SVG for tree visualization

No external libraries or frameworks are required.

---

## 🚀 How to Run the Project

1. Clone or download the repository.
2. Open avl.html in any modern web browser.
3. Insert or delete values to visualize AVL tree operations.

---

## 🤝 Contributing

1. Report bugs by opening an issue.
2. Suggest new features or enhancements.
3. Improve UI design or animations.
4. Add support for additional tree traversals.

Please follow clean coding practices and test changes before submitting a pull request.

---

## 📌 Future Enhancements

1. Step-by-step animation controls
2. Preorder and Postorder traversal visualizations
3. Rotation-specific animations
4. Exportable tree structure
5. Dark and light theme toggle

---

## 🔗 Live Demo
You can try the live demo here:

➡️ https://lakshmi701.github.io/AVL-Visualization/

---

## 📜 License

This project is open-source and intended for educational and learning purposes.
