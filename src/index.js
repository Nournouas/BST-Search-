class Node {
    constructor(data, left = null, right = null){
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

function Tree(array){
    let treeRoot = buildTree(array);
    
    function buildTree(arr){
        let cleandArr = cleanArray(arr);
        let root = makeBST(cleandArr);

        return root;
    }

    function makeBST(arr, start = 0, end = arr.length - 1){
        if (start > end){
            return null;
        }
        let mid = start + Math.floor((end - start)/ 2);
        let root = new Node(arr[mid]);
        

        
        root.left = makeBST(arr, start, mid-1);
        root.right = makeBST(arr, mid + 1, end);

        return root;
    }

    function cleanArray(arr){
        let noDuplicatesArray = removeDuplicates(arr);
        let sortedArray = noDuplicatesArray.sort(compare);

        return sortedArray;
    }

    function levelOrderForEach(callback = null){
        if (callback === null){
            throw new Error("callback is required")
        }
        let queueArray = [];
        queueArray.push(treeRoot);

        while (queueArray.length != 0){
            let currNode = queueArray.shift();

            if (currNode.left != null){
                queueArray.push(currNode.left)
            }
            if (currNode.right != null){
                queueArray.push(currNode.right)
            }

            callback(currNode);
        }

    }

    function rebalance(){
        let newArray = [];
        let queueArray = [];
        queueArray.push(treeRoot);
        newArray.push(treeRoot.data)

        while (queueArray.length != 0){
            let currNode = queueArray.shift();

            if (currNode.left != null){
                queueArray.push(currNode.left)
                newArray.push(currNode.left.data)
            }
            if (currNode.right != null){
                queueArray.push(currNode.right)
                newArray.push(currNode.right.data)
            }
        }
        
        treeRoot = buildTree(newArray);

    }


    function height(value, node = treeRoot){
        if (node === null) return null
        
        if (node.data === value){
            return getHeight(node);
        }

        if (value < node.data){
            return height(value, node.left);
        }else{
            return height(value, node.right)
        }
    }
    
    function getHeight(node){
        if (node === null) return -1;

        let leftHeight = getHeight(node.left);
        let rightHeight = getHeight(node.right);

        return 1 + Math.max(leftHeight, rightHeight);
    }

    function preOrderForEach(callback = null, node = treeRoot){
        if (callback === null){
            throw new Error("callback is required")
        }
        if (node === null){
            return
        }

        callback(node);
        preOrderForEach(callback, node.left);
        preOrderForEach(callback, node.right);
        
        return;
    }

    function isBalanced(node = treeRoot, balancedState = true){
        if (node === null) return balancedState

        let leftHeight = getHeight(node.left);
        let rightHeight = getHeight(node.right);
        let difference = leftHeight - rightHeight;

        if (difference >= -1 && difference <= 1){
            balancedState = isBalanced(node.left, balancedState);
            balancedState = isBalanced(node.right, balancedState);
        }else{
            balancedState = false;
        }

        return balancedState
    }

    function inOrderForEach(callback = null, node = treeRoot){
        if (callback === null){
            throw new Error("callback is required")
        }
        if (node === null){
            return 
        }

        inOrderForEach(callback, node.left);
        callback(node);
        inOrderForEach(callback, node.right);
        
    }



    function postOrderForEach(callback = null, node = treeRoot){
        if (callback === null){
            throw new Error("callback is required")
        }
        if (node === null){
            return
        }

        postOrderForEach(callback, node.left);
        postOrderForEach(callback, node.right);
        callback(node);
        
        return;
    }

    function find(value, node = treeRoot){
        if (node === null){
            return null;
        }

        if (node.data === value){
            return node;
        }

        let search = null;
        if (value > node.data){
            search = find(value, node.right);
        } else if (value < node.data){
            search = find(value, node.left);
        }

        return search
    }

    function depth(value, node = treeRoot, depthLevel = 0){
        if (node === null){
            return null;
        }
        
        if (node.data === value){
            return depthLevel;
        }

        if (value > node.data){
            return depth(value, node.right, depthLevel + 1);
        } else if (value < node.data){
            return depth(value, node.left, depthLevel + 1);
        }

    }
    

    function insert(value, root = treeRoot){
        if (root === null){
            return new Node(value);
        }

        if (root.data === value){
            return root;
        }

        if (value < root.data){
            root.left = insert(value, root.left);
        } else if (value > root.data){
            root.right = insert(value, root.right);
        }

        return root;

    }

    function deleteItem(value, node = treeRoot){
        if (node === null){
            return node;
        }

        if (value > node.data){
            node.right = deleteItem(value, node.right);
        }else if (value < node.data){
            node.left = deleteItem(value, node.left);
        }else{
            //the else statement runs when the node to be delelted is found
            if (node.left === null){
                return node.right;
            }

            if (node.right === null){
                return node.left;
            }

            let successor = node.right;
            while (successor !== null && successor.left !== null){
                successor = successor.left;
            }
            node.data = successor.data;
            node.right = deleteItem(successor.data, node.right);
            
        }

        return node;

    }

    function removeDuplicates(arr){
        let cleanedArray = [];

        for (let i = 0; i < arr.length; i++){
            if (!cleanedArray.includes(arr[i])) cleanedArray.push(arr[i]);
        }

        return cleanedArray;
    }

    function compare(a, b){
        return a - b;
    }

    let root = () => treeRoot;

    return {cleanArray, buildTree, insert, deleteItem, levelOrderForEach, preOrderForEach, inOrderForEach, postOrderForEach, find, depth, height, isBalanced, rebalance, root}
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

let testFunc = function(node){
    console.log("I am: " + node.data);
}

let randomNumbers = [
  12, 47, 85, 23, 67, 12, 34, 56, 78, 90,
  45, 67, 89, 22, 11, 33, 44, 55, 66, 77,
  88, 99, 10, 20, 30, 40, 50, 60, 70, 80
];;

let tree = Tree(randomNumbers);

prettyPrint(tree.root());

console.log("checking balanced state: " + tree.isBalanced());
console.log("----------------------------------")
console.log("----- level order -----")
tree.levelOrderForEach(testFunc);
console.log("----- in order -----")
tree.inOrderForEach(testFunc);
console.log("----- pre order -----")
tree.preOrderForEach(testFunc);
console.log("----- post order -----")
tree.postOrderForEach(testFunc);

tree.find(99).right = new Node(150);
tree.find(150).left = new Node(340);
tree.find(56).right = new Node(200);
tree.find(11).left = new Node(2000);
tree.find(10).left = new Node(101);

prettyPrint(tree.root());

console.log("checking balanced state: " + tree.isBalanced());

tree.rebalance();

console.log("checking balanced state: " + tree.isBalanced());

prettyPrint(tree.root());




