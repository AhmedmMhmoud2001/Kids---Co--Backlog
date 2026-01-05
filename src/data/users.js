// Static user data for authentication
// In a real application, this would be stored in a database

// Mock users database
export const users = [
  {
    id: 1,
    firstName: 'Ahmed',
    lastName: 'Ali',
    email: 'ahmed@example.com',
    password: 'password123', // In real app, this would be hashed
    phone: '+20 100 123 4567',
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    firstName: 'Sarah',
    lastName: 'Mohamed',
    email: 'sarah@example.com',
    password: 'password123',
    phone: '+20 100 234 5678',
    createdAt: '2024-02-20',
  },
  {
    id: 3,
    firstName: 'Omar',
    lastName: 'Hassan',
    email: 'omar@example.com',
    password: 'password123',
    phone: '+20 100 345 6789',
    createdAt: '2024-03-10',
  },
];

// Get user by email
export const getUserByEmail = (email) => {
  return users.find(user => user.email.toLowerCase() === email.toLowerCase());
};

// Get user by ID
export const getUserById = (id) => {
  return users.find(user => user.id === parseInt(id));
};

// Check if email exists
export const emailExists = (email) => {
  return users.some(user => user.email.toLowerCase() === email.toLowerCase());
};

// Validate user credentials
export const validateCredentials = (email, password) => {
  const user = getUserByEmail(email);
  if (!user) {
    return { success: false, error: 'Email not found' };
  }
  if (user.password !== password) {
    return { success: false, error: 'Invalid password' };
  }
  return { success: true, user };
};

// Register new user
export const registerUser = (userData) => {
  // Check if email already exists
  if (emailExists(userData.email)) {
    return { success: false, error: 'Email already exists' };
  }

  // Validate password
  if (userData.password.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters' };
  }

  // Validate passwords match
  if (userData.password !== userData.confirmPassword) {
    return { success: false, error: 'Passwords do not match' };
  }

  // Create new user
  const newUser = {
    id: users.length + 1,
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    password: userData.password, // In real app, hash this
    phone: userData.phone || '',
    createdAt: new Date().toISOString().split('T')[0],
  };

  users.push(newUser);
  return { success: true, user: newUser };
};

// Update user profile
export const updateUserProfile = (userId, updates) => {
  const userIndex = users.findIndex(user => user.id === parseInt(userId));
  if (userIndex === -1) {
    return { success: false, error: 'User not found' };
  }

  users[userIndex] = {
    ...users[userIndex],
    ...updates,
  };

  return { success: true, user: users[userIndex] };
};

// Get all users (for admin purposes)
export const getAllUsers = () => {
  return users;
};

