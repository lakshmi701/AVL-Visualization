class AVLNode {
            constructor(value) {
                this.value = value;
                this.left = null;
                this.right = null;
                this.height = 1;
                this.x = 0;
                this.y = 0;
            }
        }

        // Global variables
        let root = null;
        let history = [];

        // Get height of node
        function getHeight(node) {
            return node ? node.height : 0;
        }

        // Get balance factor
        function getBalanceFactor(node) {
            return node ? getHeight(node.left) - getHeight(node.right) : 0;
        }

        // Update height
        function updateHeight(node) {
            if (node) {
                node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right));
            }
        }

        // Right rotation
        function rightRotate(y) {
            const x = y.left;
            const T2 = x.right;

            x.right = y;
            y.left = T2;

            updateHeight(y);
            updateHeight(x);

            addHistory('rotate', `Right rotation on ${y.value}`);
highlightNode(y.value);

            return x;
        }

        // Left rotation
        function leftRotate(x) {
            const y = x.right;
            const T2 = y.left;

            y.left = x;
            x.right = T2;

            updateHeight(x);
            updateHeight(y);

            addHistory('rotate', `Left rotation on ${x.value}`);
highlightNode(x.value);

            return y;
        }

        // Insert a node
        function insert(node, value) {
            if (!node) {
                return new AVLNode(value);
            }

            if (value < node.value) {
                node.left = insert(node.left, value);
            } else if (value > node.value) {
                node.right = insert(node.right, value);
            } else {
                return node; // Duplicate values not allowed
            }

            updateHeight(node);

            const balance = getBalanceFactor(node);

            // Left Left Case
            if (balance > 1 && value < node.left.value) {
                return rightRotate(node);
            }

            // Right Right Case
            if (balance < -1 && value > node.right.value) {
                return leftRotate(node);
            }

            // Left Right Case
            if (balance > 1 && value > node.left.value) {
                node.left = leftRotate(node.left);
                return rightRotate(node);
            }

            // Right Left Case
            if (balance < -1 && value < node.right.value) {
                node.right = rightRotate(node.right);
                return leftRotate(node);
            }

            return node;
        }

        // Find minimum value node
        function minValueNode(node) {
            let current = node;
            while (current.left) {
                current = current.left;
            }
            return current;
        }

        // Delete a node
        function deleteNodeHelper(node, value) {
            if (!node) return null;

            if (value < node.value) {
                node.left = deleteNodeHelper(node.left, value);
            } else if (value > node.value) {
                node.right = deleteNodeHelper(node.right, value);
            } else {
                if (!node.left || !node.right) {
                    node = node.left || node.right;
                } else {
                    const temp = minValueNode(node.right);
                    node.value = temp.value;
                    node.right = deleteNodeHelper(node.right, temp.value);
                }
            }

            if (!node) return null;

            updateHeight(node);

            const balance = getBalanceFactor(node);

            // Left Left Case
            if (balance > 1 && getBalanceFactor(node.left) >= 0) {
                return rightRotate(node);
            }

            // Left Right Case
            if (balance > 1 && getBalanceFactor(node.left) < 0) {
                node.left = leftRotate(node.left);
                return rightRotate(node);
            }

            // Right Right Case
            if (balance < -1 && getBalanceFactor(node.right) <= 0) {
                return leftRotate(node);
            }

            // Right Left Case
            if (balance < -1 && getBalanceFactor(node.right) > 0) {
                node.right = rightRotate(node.right);
                return leftRotate(node);
            }

            return node;
        }

        // Inorder traversal
        function inorderTraversal(node, result = []) {
            if (node) {
                inorderTraversal(node.left, result);
                result.push(node.value);
                inorderTraversal(node.right, result);
            }
            return result;
        }

        // Count nodes
        function countNodes(node) {
            if (!node) return 0;
            return 1 + countNodes(node.left) + countNodes(node.right);
        }

        // Calculate positions for visualization
        function calculatePositions(node, x, y, horizontalSpacing, positions = []) {
            if (!node) return positions;

            node.x = x;
            node.y = y;
            positions.push({
                value: node.value,
                x: x,
                y: y,
                balanceFactor: getBalanceFactor(node),
                left: node.left ? { x: x - horizontalSpacing, y: y + 80 } : null,
                right: node.right ? { x: x + horizontalSpacing, y: y + 80 } : null
            });

            calculatePositions(node.left, x - horizontalSpacing, y + 80, horizontalSpacing / 2, positions);
            calculatePositions(node.right, x + horizontalSpacing, y + 80, horizontalSpacing / 2, positions);

            return positions;
        }

        // Render the tree
        function renderTree() {
            const canvas = document.getElementById('tree-canvas');
            const emptyState = document.getElementById('empty-state');
            const traversalDiv = document.getElementById('traversal');
            const nodeCountDiv = document.getElementById('node-count');
            const treeHeightDiv = document.getElementById('tree-height');

            if (!root) {
                canvas.innerHTML = '';
                emptyState.style.display = 'flex';
                traversalDiv.innerHTML = '';
                nodeCountDiv.textContent = '0';
                treeHeightDiv.textContent = '0';
                return;
            }

            emptyState.style.display = 'none';

            const canvasRect = canvas.parentElement.getBoundingClientRect();
            const width = canvasRect.width - 40;
            const height = 400;

            canvas.setAttribute('width', width);
            canvas.setAttribute('height', height);
            canvas.setAttribute('viewBox', `0 0 ${width} ${height}`);

            const positions = calculatePositions(root, width / 2, 50, width / 4);

            let svgContent = '';

            // Draw edges first
            positions.forEach(pos => {
                if (pos.left) {
                    svgContent += `
                        <line 
                            x1="${pos.x}" y1="${pos.y}" 
                            x2="${pos.left.x}" y2="${pos.left.y}" 
                            stroke="#4a5568" 
                            stroke-width="2"
                        />`;
                }
                if (pos.right) {
                    svgContent += `
                        <line 
                            x1="${pos.x}" y1="${pos.y}" 
                            x2="${pos.right.x}" y2="${pos.right.y}" 
                            stroke="#4a5568" 
                            stroke-width="2"
                        />`;
                }
            });

            // Draw nodes
            positions.forEach(pos => {
                let gradient;
                if (pos.balanceFactor === 0) {
                    gradient = 'url(#balanced)';
                } else if (Math.abs(pos.balanceFactor) === 1) {
                    gradient = 'url(#warning)';
                } else {
                    gradient = 'url(#critical)';
                }

                svgContent += `
                    <g class="node" style="animation: nodeAppear 0.3s ease-out">
                        <circle cx="${pos.x}" cy="${pos.y}" r="25" fill="${gradient}" />
                        <text x="${pos.x}" y="${pos.y + 5}" text-anchor="middle" fill="white" font-weight="bold" font-size="14">${pos.value}</text>
                        <circle cx="${pos.x + 20}" cy="${pos.y - 20}" r="12" fill="#1a1a2e" stroke="#333" stroke-width="1"/>
                        <text x="${pos.x + 20}" y="${pos.y - 16}" text-anchor="middle" fill="#888" font-size="10">${pos.balanceFactor}</text>
                    </g>`;
            });

            // Add gradient definitions
            svgContent = `
                <defs>
                    <linearGradient id="balanced" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#10b981"/>
                        <stop offset="100%" style="stop-color:#059669"/>
                    </linearGradient>
                    <linearGradient id="warning" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#f59e0b"/>
                        <stop offset="100%" style="stop-color:#d97706"/>
                    </linearGradient>
                    <linearGradient id="critical" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#ef4444"/>
                        <stop offset="100%" style="stop-color:#dc2626"/>
                    </linearGradient>
                </defs>
            ` + svgContent;

            // Animate transitions instead of instant redraw
if (!canvas.innerHTML) {
    canvas.innerHTML = svgContent;
} else {
    const old = canvas.innerHTML;
    canvas.innerHTML = svgContent;

    const nodes = canvas.querySelectorAll('.node');
    nodes.forEach(node => {
        node.style.transition = "transform 0.6s ease, opacity 0.4s ease";
    });

    const lines = canvas.querySelectorAll('line');
    lines.forEach(line => {
        line.style.strokeDasharray = 200;
        line.style.strokeDashoffset = 200;
        line.getBoundingClientRect(); // force reflow
        line.style.transition = "stroke-dashoffset 0.8s ease";
        line.style.strokeDashoffset = 0;
    });
}


            // Update traversal display
            const traversal = inorderTraversal(root);
            traversalDiv.innerHTML = traversal.map(v => `<span class="traversal-node">${v}</span>`).join('');

            // Update stats
            nodeCountDiv.textContent = countNodes(root);
            treeHeightDiv.textContent = getHeight(root);
        }

        // Add to history
        function addHistory(type, message) {
            history.unshift({ type, message, time: new Date() });
            if (history.length > 10) history.pop();
            updateHistoryDisplay();
        }

        // Update history display
        function updateHistoryDisplay() {
            const historyDiv = document.getElementById('history');
            historyDiv.innerHTML = history.map(h => `
                <div class="history-item">
                    <div class="history-icon ${h.type}">${h.type === 'insert' ? '+' : h.type === 'delete' ? '−' : '↻'}</div>
                    <span>${h.message}</span>
                </div>
            `).join('');
        }

        // Show notification
        function showNotification(message, type = 'success') {
            const notification = document.getElementById('notification');
            notification.textContent = message;
            notification.className = `notification ${type} show`;
            setTimeout(() => {
                notification.className = 'notification';
            }, 3000);
        }

        // Insert node handler
        function insertNode() {
            const input = document.getElementById('nodeValue');
            const value = parseInt(input.value);

            if (isNaN(value)) {
                showNotification('Please enter a valid number', 'error');
                return;
            }

            // Check if value already exists
            const existing = inorderTraversal(root);
            if (existing.includes(value)) {
                showNotification(`Value ${value} already exists`, 'warning');
                return;
            }

            root = insert(root, value);
            addHistory('insert', `Inserted ${value}`);
            showNotification(`Inserted ${value} successfully`);
            renderTree();
            input.value = '';
        }

        // Delete node handler
        function deleteNode() {
            const input = document.getElementById('nodeValue');
            const value = parseInt(input.value);

            if (isNaN(value)) {
                showNotification('Please enter a valid number', 'error');
                return;
            }

            const existing = inorderTraversal(root);
            if (!existing.includes(value)) {
                showNotification(`Value ${value} not found`, 'error');
                return;
            }

            root = deleteNodeHelper(root, value);
            addHistory('delete', `Deleted ${value}`);
            showNotification(`Deleted ${value} successfully`);
            renderTree();
            input.value = '';
        }

        // Insert random value
        function insertRandom() {
            const existing = inorderTraversal(root);
            let value;
            do {
                value = Math.floor(Math.random() * 100) + 1;
            } while (existing.includes(value) && existing.length < 100);

            if (existing.length >= 100) {
                showNotification('Tree is full (max 100 unique values)', 'warning');
                return;
            }

            root = insert(root, value);
            addHistory('insert', `Inserted ${value}`);
            showNotification(`Inserted ${value} successfully`);
            renderTree();
        }

        // Clear tree
        function clearTree() {
            root = null;
            history = [];
            updateHistoryDisplay();
            showNotification('Tree cleared');
            renderTree();
        }

        // Handle Enter key
        document.getElementById('nodeValue').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                insertNode();
            }
        });

        // Handle window resize
        window.addEventListener('resize', renderTree);

        // Initial render
        renderTree();
function highlightNode(value) {
    setTimeout(() => {
        const nodes = document.querySelectorAll('.node text');
        nodes.forEach(text => {
            if (text.textContent == value) {
                const group = text.parentElement;
                group.classList.add('pulse');
                setTimeout(() => group.classList.remove('pulse'), 1000);
            }
        });
    }, 200);
}
