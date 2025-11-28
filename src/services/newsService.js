// 新闻服务模块
import { deleteNewsById, getNewsList, getNewsById, deleteCommentById, createNews } from '../data/mockData';
import { getCurrentUser, hasRole } from './authService';

// 删除新闻
export const deleteNews = async (newsId) => {
  try {
    // 检查当前用户是否为管理员
    const currentUser = getCurrentUser();
    if (!currentUser || !hasRole(currentUser, 'admin')) {
      throw new Error('Unauthorized: Only administrators can delete news');
    }
    
    // 调用删除新闻功能
    const result = deleteNewsById(newsId, true);
    return result;
  } catch (error) {
    console.error('Error deleting news:', error);
    throw error;
  }
};

// 获取新闻列表
export const fetchNewsList = (includeDeleted = false) => {
  try {
    // 检查是否为管理员，管理员可以看到已删除的新闻
    const currentUser = getCurrentUser();
    const isAdmin = currentUser && hasRole(currentUser, 'admin');
    
    // 根据权限决定是否包含已删除的新闻
    const includeDeletedItems = isAdmin && includeDeleted;
    return getNewsList(includeDeletedItems);
  } catch (error) {
    console.error('Error fetching news list:', error);
    return [];
  }
};

// 获取单个新闻详情
export const fetchNewsDetail = (newsId) => {
  try {
    // 检查是否为管理员，管理员可以看到已删除的新闻
    const currentUser = getCurrentUser();
    const isAdmin = currentUser && hasRole(currentUser, 'admin');
    
    const news = getNewsById(newsId, isAdmin);
    return news;
  } catch (error) {
    console.error('Error fetching news detail:', error);
    return null;
  }
};

// 删除评论
export const deleteComment = async (newsId, commentId) => {
  try {
    // 检查当前用户是否为管理员
    const currentUser = getCurrentUser();
    if (!currentUser || !hasRole(currentUser, 'admin')) {
      throw new Error('Unauthorized: Only administrators can delete comments');
    }
    
    // 调用删除评论功能
    const result = deleteCommentById(newsId, commentId, true);
    return result;
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};

// 创建新闻
export const publishNews = async (newsData) => {
  try {
    // 检查当前用户是否已登录且具有成员或管理员角色
    const currentUser = getCurrentUser();
    if (!currentUser) {
      throw new Error('Unauthorized: You must be logged in to publish news');
    }
    
    if (!hasRole(currentUser, 'member') && !hasRole(currentUser, 'admin')) {
      throw new Error('Unauthorized: Only members and administrators can publish news');
    }
    
    // 验证必要字段
    if (!newsData.topic || newsData.topic.trim().length === 0) {
      throw new Error('Topic is required');
    }
    
    if (!newsData.shortDetail || newsData.shortDetail.trim().length === 0) {
      throw new Error('Short detail is required');
    }
    
    if (!newsData.fullDetail || newsData.fullDetail.trim().length === 0) {
      throw new Error('Full detail is required');
    }
    
    // 添加报告者信息
    const enhancedNewsData = {
      ...newsData,
      reporterName: currentUser.name || 'Anonymous'
    };
    
    // 调用创建新闻功能
    const result = createNews(enhancedNewsData, currentUser.id);
    return result;
  } catch (error) {
    console.error('Error publishing news:', error);
    throw error;
  }
};