import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  AppRoute,
  ContentFormat,
  ProficiencyLevel,
  OpportunityItem,
  CommunityPost,
  AssignmentItem,
  NotificationItem,
  TopicContent,
} from '../types';
import {
  initialUserProfile,
  sampleOpportunities,
  sampleCommunityPosts,
  sampleAssignments,
  sampleNotifications,
  sampleTopics,
} from '../data/mockData';
import { translations, LanguageCode, Translations } from '../i18n/translations';

interface AppContextType {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  updateUserLevel: (level: ProficiencyLevel) => void;
  currentRoute: AppRoute;
  setCurrentRoute: (route: AppRoute) => void;
  currentLang: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: Translations;
  activeTopicId: string;
  setActiveTopicId: (id: string) => void;
  activeTopic: TopicContent;
  openTopic: (topicId: string, format?: ContentFormat) => void;
  selectedFormat: ContentFormat;
  setSelectedFormat: (format: ContentFormat) => void;
  opportunities: OpportunityItem[];
  applyOpportunity: (id: string) => void;
  communityPosts: CommunityPost[];
  upvotePost: (id: string) => void;
  addComment: (postId: string, text: string) => void;
  createPost: (title: string, content: string, category: CommunityPost['category'], tags?: string[]) => void;
  deletePost: (postId: string) => void;
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  assignments: AssignmentItem[];
  submitAssignment: (id: string) => void;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  showProfileModal: boolean;
  setShowProfileModal: (show: boolean) => void;
  showFlashcardsModal: boolean;
  setShowFlashcardsModal: (show: boolean) => void;
  showQuizModal: boolean;
  setShowQuizModal: (show: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  completeTopicAndTriggerReview: (topicId: string) => void;
  recoverMissedTasks: () => void;
  addXp: (amount: number) => void;
  loginAsDemoUser: (name?: string, level?: ProficiencyLevel) => void;
  loginAsGuest: () => void;
  logoutUser: () => void;
  isGuest: boolean;
  // Hoisted background study timer (Step 4 Pomodoro)
  studyTimerSeconds: number;
  studyTimerRunning: boolean;
  toggleStudyTimer: () => void;
  resetStudyTimer: () => void;
  setStudyTimerSeconds: React.Dispatch<React.SetStateAction<number>>;
  focusMinutesLogged: number;
  logCompletedFocusSession: (minutes?: number) => void;
  // Role-Based Hiring Simulator
  selectedHiringRoleId: string;
  setSelectedHiringRoleId: (id: string) => void;
  startHiringSimulation: (roleId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('smart_intern_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return { ...initialUserProfile, isOnboarded: false, isGuest: false };
  });

  const [isGuest, setIsGuest] = useState<boolean>(() => {
    const saved = localStorage.getItem('smart_intern_is_guest');
    return saved === 'true';
  });

  // Default starting route is 'login' as requested by the user
  const [currentRoute, setCurrentRoute] = useState<AppRoute>('login');
  const [currentLang, setCurrentLang] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('smart_intern_lang');
    return (saved as LanguageCode) || 'en';
  });

  const t = translations[currentLang] || translations.en;

  const setLanguage = (lang: LanguageCode) => {
    setCurrentLang(lang);
    localStorage.setItem('smart_intern_lang', lang);
  };

  const [activeTopicId, setActiveTopicId] = useState<string>('topic-sliding-window');
  const [selectedFormat, setSelectedFormat] = useState<ContentFormat>('text');
  const [opportunities, setOpportunities] = useState<OpportunityItem[]>(sampleOpportunities);

  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(() => {
    const saved = localStorage.getItem('smart_intern_community_posts');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return sampleCommunityPosts;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(sampleNotifications);
  const [assignments, setAssignments] = useState<AssignmentItem[]>(sampleAssignments);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [showFlashcardsModal, setShowFlashcardsModal] = useState<boolean>(false);
  const [showQuizModal, setShowQuizModal] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  // Hiring Simulator active role selection
  const [selectedHiringRoleId, setSelectedHiringRoleId] = useState<string>('role-ai-engineer');

  // Hoisted background study timer (runs across all routes/pages)
  const [studyTimerSeconds, setStudyTimerSeconds] = useState<number>(25 * 60);
  const [studyTimerRunning, setStudyTimerRunning] = useState<boolean>(false);
  const [focusMinutesLogged, setFocusMinutesLogged] = useState<number>(() => {
    const saved = localStorage.getItem('smart_intern_focus_mins');
    return saved ? parseInt(saved, 10) : 50;
  });

  const logCompletedFocusSession = (minutes = 25) => {
    setFocusMinutesLogged((prev) => {
      const updated = prev + minutes;
      localStorage.setItem('smart_intern_focus_mins', String(updated));
      return updated;
    });
    if (!isGuest) {
      setUser((prev) => ({
        ...prev,
        xp: prev.xp + 50,
      }));
    }
  };

  useEffect(() => {
    let interval: any = null;
    if (studyTimerRunning && studyTimerSeconds > 0) {
      interval = setInterval(() => {
        setStudyTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (studyTimerSeconds === 0) {
      setStudyTimerRunning(false);
      logCompletedFocusSession(25);
      setStudyTimerSeconds(25 * 60);
    }
    return () => clearInterval(interval);
  }, [studyTimerRunning, studyTimerSeconds, isGuest]);

  const toggleStudyTimer = () => setStudyTimerRunning((prev) => !prev);
  const resetStudyTimer = () => {
    setStudyTimerRunning(false);
    setStudyTimerSeconds(25 * 60);
  };

  useEffect(() => {
    localStorage.setItem('smart_intern_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('smart_intern_is_guest', String(isGuest));
  }, [isGuest]);

  useEffect(() => {
    localStorage.setItem('smart_intern_community_posts', JSON.stringify(communityPosts));
  }, [communityPosts]);

  const activeTopic = sampleTopics.find((t) => t.id === activeTopicId) || sampleTopics[0];

  const updateUserLevel = (level: ProficiencyLevel) => {
    setUser((prev) => ({ ...prev, level }));
  };

  const openTopic = (topicId: string, format?: ContentFormat) => {
    setActiveTopicId(topicId);
    if (format) {
      setSelectedFormat(format);
    }
    setCurrentRoute('topic-viewer');
  };

  const applyOpportunity = (id: string) => {
    setOpportunities((prev) =>
      prev.map((opp) =>
        opp.id === id ? { ...opp, isApplied: true, appliedCount: opp.appliedCount + 1 } : opp
      )
    );
  };

  const upvotePost = (id: string) => {
    setCommunityPosts((prev) =>
      prev.map((post) => {
        if (post.id === id) {
          const isUpvoted = !post.isUpvoted;
          return {
            ...post,
            isUpvoted,
            upvotes: isUpvoted ? post.upvotes + 1 : post.upvotes - 1,
          };
        }
        return post;
      })
    );
  };

  const addComment = (postId: string, text: string) => {
    setCommunityPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const newComment = {
            id: `comment-${Date.now()}`,
            author: isGuest ? 'Guest Explorer' : user.name,
            avatar: isGuest
              ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
              : user.avatar,
            text,
            timeAgo: 'Just now',
          };
          return {
            ...post,
            commentsCount: post.commentsCount + 1,
            comments: [newComment, ...post.comments],
          };
        }
        return post;
      })
    );
  };

  const createPost = (title: string, content: string, category: CommunityPost['category'], tags?: string[]) => {
    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      author: {
        name: isGuest ? 'Guest Explorer' : user.name,
        avatar: isGuest
          ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
          : user.avatar,
        role: isGuest ? 'Guest Preview' : `${user.level} Scholar`,
        companyOrCollege: isGuest ? 'Guest Community' : 'Smart Intern Cohort',
      },
      title,
      content,
      category,
      tags: tags && tags.length > 0 ? tags : ['General', 'Prep'],
      postedAt: 'Just now',
      upvotes: 1,
      views: 1,
      commentsCount: 0,
      isUpvoted: true,
      comments: [],
    };
    setCommunityPosts((prev) => [newPost, ...prev]);
  };

  const deletePost = (postId: string) => {
    setCommunityPosts((prev) => prev.filter((p) => p.id !== postId));
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const submitAssignment = (id: string) => {
    setAssignments((prev) =>
      prev.map((asg) =>
        asg.id === id ? { ...asg, status: 'Submitted' } : asg
      )
    );
    addXp(50);
  };

  const addXp = (amount: number) => {
    if (isGuest) return;
    setUser((prev) => ({
      ...prev,
      xp: prev.xp + amount,
    }));
  };

  const completeTopicAndTriggerReview = (topicId: string) => {
    if (!isGuest) {
      setUser((prev) => ({
        ...prev,
        lessonsCompleted: prev.lessonsCompleted + 1,
        xp: prev.xp + 30,
      }));
    }
    // Open flashcards modal first, then quiz will follow
    setShowFlashcardsModal(true);
  };

  const recoverMissedTasks = () => {
    setUser((prev) => ({
      ...prev,
      improvementRate: Math.min(100, prev.improvementRate + 4),
    }));
  };

  const loginAsDemoUser = (name = 'Alex Chen', level: ProficiencyLevel = 'Intermediate') => {
    setIsGuest(false);
    setUser({
      ...initialUserProfile,
      name,
      level,
      isOnboarded: true,
      isGuest: false,
    });
    // Immediately after login/signup, prompt 4-step diagnostic wizard or dashboard
    setCurrentRoute('onboarding');
  };

  const loginAsGuest = () => {
    setIsGuest(true);
    setUser((prev) => ({
      ...prev,
      name: 'Guest User',
      isGuest: true,
      isOnboarded: true,
    }));
    setCurrentRoute('dashboard');
  };

  const logoutUser = () => {
    setIsGuest(false);
    setUser((prev) => ({ ...prev, isOnboarded: false, isGuest: false }));
    localStorage.removeItem('smart_intern_user');
    localStorage.removeItem('smart_intern_is_guest');
    setCurrentRoute('login');
  };

  const startHiringSimulation = (roleId: string) => {
    setSelectedHiringRoleId(roleId);
    setCurrentRoute('hiring-simulator');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        updateUserLevel,
        currentRoute,
        setCurrentRoute,
        currentLang,
        setLanguage,
        t,
        activeTopicId,
        setActiveTopicId,
        activeTopic,
        openTopic,
        selectedFormat,
        setSelectedFormat,
        opportunities,
        applyOpportunity,
        communityPosts,
        upvotePost,
        addComment,
        createPost,
        deletePost,
        notifications,
        markNotificationRead,
        assignments,
        submitAssignment,
        showAuthModal,
        setShowAuthModal,
        showProfileModal,
        setShowProfileModal,
        showFlashcardsModal,
        setShowFlashcardsModal,
        showQuizModal,
        setShowQuizModal,
        searchQuery,
        setSearchQuery,
        sidebarCollapsed,
        setSidebarCollapsed,
        completeTopicAndTriggerReview,
        recoverMissedTasks,
        addXp,
        loginAsDemoUser,
        loginAsGuest,
        logoutUser,
        isGuest,
        studyTimerSeconds,
        studyTimerRunning,
        toggleStudyTimer,
        resetStudyTimer,
        setStudyTimerSeconds,
        focusMinutesLogged,
        logCompletedFocusSession,
        selectedHiringRoleId,
        setSelectedHiringRoleId,
        startHiringSimulation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
