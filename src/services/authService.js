// 认证服务 - 处理用户注册、登录、登出等功能
import { mockUsers, setMockUsers } from '../data/mockData.js';

// 生成唯一ID
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// 模拟延迟
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 用户注册
export const registerUser = async (userData) => {
  try {
    // 模拟网络延迟
    await delay(1000);
    
    // 检查邮箱是否已存在
    const existingUser = mockUsers.find(user => user.email === userData.email);
    if (existingUser) {
      throw new Error('该邮箱已被注册');
    }
    
    // 创建新用户
    const newUser = {
      id: generateId(),
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password, // 在实际应用中，这里应该进行密码加密
      avatar: userData.avatar || null,
      role: 'reader', // 默认角色为读者
      createdAt: new Date().toISOString()
    };
    
    // 将新用户添加到模拟数据中
    const updatedUsers = [...mockUsers, newUser];
    setMockUsers(updatedUsers);
    
    // 保存到localStorage
    localStorage.setItem('mockUsers', JSON.stringify(updatedUsers));
    
    // 返回创建的用户（不包含密码）
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
    
  } catch (error) {
    console.error('注册失败:', error);
    throw error;
  }
};

// 用户登录
export const loginUser = async (email, password) => {
  try {
    // 模拟网络延迟
    await delay(800);
    
    // 查找用户
    const user = mockUsers.find(
      u => u.email === email && u.password === password // 在实际应用中，应该使用密码哈希比较
    );
    
    if (!user) {
      throw new Error('邮箱或密码错误');
    }
    
    // 创建认证令牌（在实际应用中，应该由后端生成）
    const token = generateId();
    
    // 保存用户信息和令牌到localStorage
    const { password: userPassword, ...userData } = user;
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    
    return { user: userData, token };
    
  } catch (error) {
    console.error('登录失败:', error);
    throw error;
  }
};

// 用户登出
export const logoutUser = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

// 获取当前登录用户
export const getCurrentUser = () => {
  const userData = localStorage.getItem('user');
  return userData ? JSON.parse(userData) : null;
};

// 检查用户是否已登录
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// 获取用户权限
export const getUserRole = () => {
  const user = getCurrentUser();
  return user ? user.role : null;
};

// 检查用户是否具有特定角色
export const hasRole = (role) => {
  const userRole = getUserRole();
  return userRole === role;
};

// 获取所有用户（管理员功能）
export const getAllUsers = async () => {
  try {
    // 模拟网络延迟
    await delay(500);
    
    // 从 localStorage 获取模拟用户数据
    const mockUsersStr = localStorage.getItem('mockUsers');
    let mockUsers = mockUsersStr ? JSON.parse(mockUsersStr) : [];
    
    // 返回所有用户（不包含密码）
    return mockUsers.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  } catch (error) {
    console.error('获取用户列表失败:', error);
    throw error;
  }
};

// 更新用户角色（管理员功能）
export const updateUserRole = async (userId, newRole) => {
  try {
    // 模拟网络延迟
    await delay(800);
    
    // 从 localStorage 获取模拟用户数据
    const mockUsersStr = localStorage.getItem('mockUsers');
    let mockUsers = mockUsersStr ? JSON.parse(mockUsersStr) : [];
    
    // 查找用户索引
    const userIndex = mockUsers.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    // 管理员不能被降级
    if (mockUsers[userIndex].role === 'admin') {
      throw new Error('Cannot modify admin user');
    }
    
    // 更新用户角色
    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      role: newRole,
      updatedAt: new Date().toISOString()
    };
    
    // 保存更新后的用户数据
    localStorage.setItem('mockUsers', JSON.stringify(mockUsers));
    setMockUsers(mockUsers);
    
    // 如果是当前登录用户，同时更新 user
    const currentLoggedInUser = getCurrentUser();
    if (currentLoggedInUser && currentLoggedInUser.id === userId) {
      const { password, ...userData } = mockUsers[userIndex];
      localStorage.setItem('user', JSON.stringify(userData));
    }
    
    // 返回更新后的用户（不包含密码）
    const { password, ...userWithoutPassword } = mockUsers[userIndex];
    return userWithoutPassword;
    
  } catch (error) {
    console.error('更新用户角色失败:', error);
    throw error;
  }
};

// 更新用户信息
export const updateUserProfile = async (userId, updateData) => {
  try {
    // 模拟网络延迟
    await delay(800);
    
    // 从 localStorage 获取模拟用户数据
    const mockUsersStr = localStorage.getItem('mockUsers');
    let mockUsers = mockUsersStr ? JSON.parse(mockUsersStr) : [];
    
    // 查找用户索引
    const userIndex = mockUsers.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    // 更新用户信息，保留不可修改的字段
    const currentUser = mockUsers[userIndex];
    const updatedUser = {
      ...currentUser,
      ...updateData,
      // 不可修改的字段
      id: currentUser.id,
      email: currentUser.email,
      role: currentUser.role,
      createdAt: currentUser.createdAt,
      updatedAt: new Date().toISOString()
    };
    
    // 保存更新后的用户数据
    mockUsers[userIndex] = updatedUser;
    localStorage.setItem('mockUsers', JSON.stringify(mockUsers));
    setMockUsers(mockUsers);
    
    // 如果是当前登录用户，同时更新 user
    const currentLoggedInUser = getCurrentUser();
    if (currentLoggedInUser && currentLoggedInUser.id === userId) {
      const { password, ...userData } = updatedUser;
      localStorage.setItem('user', JSON.stringify(userData));
    }
    
    // 返回更新后的用户（不包含密码）
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
    
  } catch (error) {
    console.error('Failed to update user profile:', error);
    throw error;
  }
};

// 上传头像处理函数
export const handleAvatarUpload = (file) => {
  return new Promise((resolve, reject) => {
    // 检查文件类型
    if (!file.type.match('image.*')) {
      reject(new Error('只支持图片文件'));
      return;
    }
    
    // 检查文件大小（5MB限制）
    if (file.size > 5 * 1024 * 1024) {
      reject(new Error('文件大小不能超过5MB'));
      return;
    }
    
    // 读取文件并返回DataURL
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.onerror = (error) => {
      reject(new Error('文件读取失败'));
    };
    reader.readAsDataURL(file);
  });
};