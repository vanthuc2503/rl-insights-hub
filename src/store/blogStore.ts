import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BlogPost, BlogStore } from '@/types/blog';

const initialPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Introduction to Reinforcement Learning',
    excerpt: 'Learn the fundamentals of RL, including agents, environments, states, actions, and rewards.',
    content: `# Introduction to Reinforcement Learning

Reinforcement Learning (RL) is a type of machine learning where an agent learns to make decisions by interacting with an environment. Unlike supervised learning, the agent isn't told the correct actions but must discover them through trial and error.

## Key Concepts

### Agent and Environment
The **agent** is the learner and decision-maker. The **environment** is everything the agent interacts with.

### States, Actions, and Rewards
- **State (s)**: A representation of the current situation
- **Action (a)**: A choice made by the agent
- **Reward (r)**: Feedback signal indicating how good the action was

### The RL Loop
\`\`\`
Agent observes state → Takes action → Receives reward → Observes new state
\`\`\`

## Why Reinforcement Learning?

RL excels in scenarios where:
- The optimal behavior is unknown beforehand
- Sequential decision-making is required
- Learning from interaction is more practical than from examples

## Applications
- Game playing (AlphaGo, Atari games)
- Robotics and autonomous systems
- Resource management
- Recommendation systems`,
    author: 'Admin',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    tags: ['basics', 'introduction', 'fundamentals'],
  },
  {
    id: '2',
    title: 'Q-Learning: A Deep Dive',
    excerpt: 'Explore the Q-Learning algorithm, one of the most fundamental model-free RL methods.',
    content: `# Q-Learning: A Deep Dive

Q-Learning is a model-free reinforcement learning algorithm that learns the value of actions in states without requiring a model of the environment.

## The Q-Function

The Q-function, Q(s, a), represents the expected cumulative reward of taking action a in state s and following the optimal policy thereafter.

## The Q-Learning Update Rule

\`\`\`
Q(s, a) ← Q(s, a) + α[r + γ max Q(s', a') - Q(s, a)]
\`\`\`

Where:
- α (alpha): Learning rate
- γ (gamma): Discount factor
- r: Immediate reward
- s': Next state

## Algorithm Steps

1. Initialize Q-table with zeros
2. For each episode:
   - Observe current state
   - Choose action (ε-greedy)
   - Take action, observe reward and new state
   - Update Q-value using the update rule
   - Repeat until terminal state

## Advantages
- Simple to implement
- Guaranteed to converge (under certain conditions)
- Model-free: doesn't need environment dynamics

## Code Example

\`\`\`python
import numpy as np

def q_learning(env, episodes=1000, alpha=0.1, gamma=0.99, epsilon=0.1):
    Q = np.zeros((env.observation_space.n, env.action_space.n))
    
    for _ in range(episodes):
        state = env.reset()
        done = False
        
        while not done:
            if np.random.random() < epsilon:
                action = env.action_space.sample()
            else:
                action = np.argmax(Q[state])
            
            next_state, reward, done, _ = env.step(action)
            Q[state, action] += alpha * (reward + gamma * np.max(Q[next_state]) - Q[state, action])
            state = next_state
    
    return Q
\`\`\``,
    author: 'Admin',
    createdAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
    tags: ['q-learning', 'algorithms', 'model-free'],
  },
  {
    id: '3',
    title: 'Deep Q-Networks (DQN) Explained',
    excerpt: 'How neural networks revolutionized Q-Learning and enabled RL to tackle complex problems.',
    content: `# Deep Q-Networks (DQN) Explained

Deep Q-Networks combine Q-Learning with deep neural networks, enabling RL agents to learn directly from high-dimensional sensory inputs like images.

## The Problem with Traditional Q-Learning

Traditional Q-Learning uses a table to store Q-values. This becomes impractical when:
- State space is continuous
- State space is very large (e.g., images)

## DQN Architecture

Instead of a Q-table, DQN uses a neural network to approximate Q(s, a):

\`\`\`
Input: State (e.g., raw pixels)
→ Convolutional layers
→ Fully connected layers
→ Output: Q-values for each action
\`\`\`

## Key Innovations

### Experience Replay
Store transitions (s, a, r, s') in a replay buffer and sample randomly for training. This:
- Breaks correlation between consecutive samples
- Increases data efficiency

### Target Network
Use a separate network for computing targets, updated periodically:
\`\`\`
Target = r + γ max Q_target(s', a')
\`\`\`

## Training Loop

1. Store experience in replay buffer
2. Sample random mini-batch
3. Compute target Q-values using target network
4. Update main network via gradient descent
5. Periodically update target network

## Results

DQN achieved superhuman performance on many Atari 2600 games, learning directly from raw pixels—a landmark achievement in AI.`,
    author: 'Admin',
    createdAt: '2024-02-01T09:15:00Z',
    updatedAt: '2024-02-01T09:15:00Z',
    tags: ['dqn', 'deep-learning', 'neural-networks'],
  },
];

export const useBlogStore = create<BlogStore>()(
  persist(
    (set, get) => ({
      posts: initialPosts,
      addPost: (post) => {
        const newPost: BlogPost = {
          ...post,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({ posts: [newPost, ...state.posts] }));
      },
      updatePost: (id, updatedFields) => {
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === id
              ? { ...post, ...updatedFields, updatedAt: new Date().toISOString() }
              : post
          ),
        }));
      },
      deletePost: (id) => {
        set((state) => ({
          posts: state.posts.filter((post) => post.id !== id),
        }));
      },
      getPost: (id) => {
        return get().posts.find((post) => post.id === id);
      },
    }),
    {
      name: 'rl-blog-storage',
    }
  )
);
