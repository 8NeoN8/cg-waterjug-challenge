# cg-waterjug-challenge

## Prerequisites

To properly run this project it requires the following:

+ Node.js version 18.6.0 or newer: [Download and Install](https://nodejs.org/en)
+ Git: [Download and Install](https://git-scm.com/downloads)

## Project Installation and Setup

Here is how you can install and run the project 

1. clone this project's repository dowloading this project as a ZIP file or through a terminal with git on your computer: https://github.com/8NeoN8/cg-mockup-challenge.git

2. Now open the projects directory with an IDE of choice or a terminal with this command
```
cd cg-mockup-challenge
```
3. Install the needed dependencies for the project to work
```
npm install
```

4. Now you can run the project, you can choose how to start the development server between Vite or Vue::
```
// Vite
npm run dev
```
```
// Vue
npm run serve
```
5. After the server has started succesfully the terminal will indicate you where the project is running, for Vite the usual is http://localhost:5173 and for Vue is http://localhost:8080

## Tests

This project has some Unit Tests made with [Jest](https://jestjs.io/) that you can run and see with the following command:
```
npm run test:unit
```

After you run this command once it will stay running to test file changes that you may do, to stop it use your terminal's command termination shortcut, for example Ctrl + c, feel free to add as many types and amounts of Unit Tests as you want given the projects reach of functionality

## Solving the puzzle

The Water Jug puzzle is a classic problem where need to measure Z litters of water within a jug of X litters and a jug o Y litters, is a good algorithim question, also seen as an AI problem, given the options of filling, emptying, and transfering between jugs, this puzzle could be seen as  a sequence of actions that start from the same point, 0 litters in both jugs or (0,0), thanks to this it can also be seen as a Tree of nodes starting from (0,0), so with this in mind in this project the BFS or Breadth First Search algorithm is used to solve it.

This algorithm is used with a tree or a graph data to search every option available for every node, eventually leading to the fastest path for solving this puzzle, given it's way of checking every action for every node on a specific level, and identifying the shortest path of steps taken to reach the target amount Z of littlers
