export type LanguageCode = 'en' | 'te' | 'hi';

export interface Translations {
  // Navigation
  prep: string;
  explore: string;
  opportunities: string;
  dashboard: string;
  prephub: string;
  mypath: string;
  planlyPlanner: string;
  community: string;
  myCourses: string;
  assignments: string;
  certificates: string;
  myProgress: string;
  hackathons: string;
  internships: string;
  jobs: string;
  hiringSimulator: string;

  // Header & Controls
  searchPlaceholder: string;
  smartIntern: string;
  streak: string;
  xpEarned: string;
  profile: string;
  profileAndGoals: string;
  notifications: string;
  logout: string;
  account: string;
  accountAndSecurity: string;
  theme: string;
  themeAndDisplay: string;
  troubleshooting: string;

  // Dashboard
  welcomeBack: string;
  continueLearning: string;
  coursesInProgress: string;
  lessonsCompleted: string;
  improvementRate: string;
  explorePopularTopics: string;
  problemOfTheDay: string;
  solveProblem: string;
  studyCalendar: string;
  interviewExperiences: string;
  placementMilestone: string;

  // Courses & Topics
  allCourses: string;
  development: string;
  design: string;
  dataScience: string;
  resumeCourse: string;
  modules: string;
  completed: string;
  markComplete: string;

  // Certificates & LinkedIn
  verifiedCertifications: string;
  addToLinkedIn: string;
  shareOnLinkedIn: string;
  downloadPdf: string;
  viewCertificate: string;
  credentialId: string;
  issuedBy: string;

  // Auth / Login
  loginTitle: string;
  loginSubtitle: string;
  continueWithGoogle: string;
  continueWithEmail: string;
  continueWithPhone: string;
  orDivider: string;
  emailLabel: string;
  passwordLabel: string;
  phoneLabel: string;
  sendOtp: string;
  enterOtp: string;
  verifyAndContinue: string;
  exploreAsGuest: string;
  signIn: string;
  getStarted: string;
  applyNow: string;
  applied: string;
}

export const translations: Record<LanguageCode, Translations> = {
  en: {
    prep: 'Prep',
    explore: 'Explore',
    opportunities: 'Opportunities',
    dashboard: 'Dashboard',
    prephub: 'Prephub',
    mypath: 'MyPath',
    planlyPlanner: 'MyPath Study Planner',
    community: 'Community',
    myCourses: 'My Courses',
    assignments: 'Assignments',
    certificates: 'Certificates',
    myProgress: 'My Progress',
    hackathons: 'Hackathons',
    internships: 'Internships',
    jobs: 'Jobs',
    hiringSimulator: 'Hiring Simulator',

    searchPlaceholder: 'Search topics, sheets, problems (e.g. Sliding Window, Redis)...',
    smartIntern: 'Smart Intern',
    streak: 'Streak',
    xpEarned: 'XP',
    profile: 'Profile & Level',
    profileAndGoals: 'Profile & Goals',
    notifications: 'Notifications',
    logout: 'Log Out',
    account: 'Account & Plan',
    accountAndSecurity: 'Account & Security',
    theme: 'Theme',
    themeAndDisplay: 'Theme & Display',
    troubleshooting: 'Troubleshooting',

    welcomeBack: 'Welcome back',
    continueLearning: 'Continue Learning',
    coursesInProgress: 'Courses in Progress',
    lessonsCompleted: 'Lessons Completed',
    improvementRate: 'Improvement Rate',
    explorePopularTopics: 'Explore Popular Topics',
    problemOfTheDay: 'Problem of the Day',
    solveProblem: 'Solve Problem',
    studyCalendar: 'Study Calendar',
    interviewExperiences: 'Interview Experiences & Debriefs',
    placementMilestone: 'Placement Readiness Milestone',

    allCourses: 'All Courses',
    development: 'Development',
    design: 'Design',
    dataScience: 'Data Science',
    resumeCourse: 'Resume Curriculum',
    modules: 'Modules',
    completed: 'Completed',
    markComplete: 'Mark Complete & Review',

    verifiedCertifications: 'Sample Learning Records',
    addToLinkedIn: 'Add to LinkedIn Profile',
    shareOnLinkedIn: 'Share on LinkedIn',
    downloadPdf: 'Download PDF',
    viewCertificate: 'View Certificate',
    credentialId: 'Credential ID',
    issuedBy: 'Issued by',

    loginTitle: 'Sign in to Smart Intern',
    loginSubtitle: 'Choose a sign-in method to open your study plan and preparation tools.',
    continueWithGoogle: 'Continue with Google',
    continueWithEmail: 'Continue with Gmail / Email',
    continueWithPhone: 'Continue with Phone Number (OTP)',
    orDivider: 'or sign in with credentials',
    emailLabel: 'Gmail or College Email Address',
    passwordLabel: 'Password',
    phoneLabel: '10-Digit Mobile Number',
    sendOtp: 'Send Verification OTP',
    enterOtp: 'Enter 6-Digit OTP',
    verifyAndContinue: 'Verify & Sign In',
    exploreAsGuest: 'Explore as Guest / Demo Student',
    signIn: 'Sign In',
    getStarted: 'Get Started Free',
    applyNow: 'Apply Now',
    applied: 'Applied',
  },
  te: {
    prep: 'సన్నద్ధత (Prep)',
    explore: 'అన్వేషణ (Explore)',
    opportunities: 'అవకాశాలు (Opportunities)',
    dashboard: 'డ్యాష్‌బోర్డ్ (Dashboard)',
    prephub: 'ప్రిప్‌హబ్ (Prephub)',
    mypath: 'మైపాత్ (MyPath)',
    planlyPlanner: 'మైపాత్ AI స్టడీ ప్లానర్',
    community: 'కమ్యూనిటీ (Community)',
    myCourses: 'నా కోర్సులు (Courses)',
    assignments: 'అసైన్‌మెంట్లు (Assignments)',
    certificates: 'సర్టిఫికేట్లు (Certificates)',
    myProgress: 'నా పురోగతి (Progress)',
    hackathons: 'హ్యాకథాన్‌లు (Hackathons)',
    internships: 'ఇంటర్న్‌షిప్‌లు (Internships)',
    jobs: 'ఉద్యోగాలు (Jobs)',
    hiringSimulator: 'హైరింగ్ సిమ్యులేటర్ (Hiring Simulator)',

    searchPlaceholder: 'టాపిక్స్, షీట్స్ లేదా ప్రశ్నలను శోధించండి (ఉదా. స్లైడింగ్ విండో, రెడ్డిస్)...',
    smartIntern: 'స్మార్ట్ ఇంటర్న్ (Smart Intern)',
    streak: 'రోజుల స్ట్రీక్',
    xpEarned: 'XP పాయింట్లు',
    profile: 'ప్రొఫైల్ & స్థాయి',
    profileAndGoals: 'ప్రొఫైల్ & లక్ష్యాలు',
    notifications: 'నోటిఫికేషన్లు',
    logout: 'లాగ్ అవుట్',
    account: 'ఖాతా & ప్లాన్',
    accountAndSecurity: 'ఖాతా & భద్రత',
    theme: 'థీమ్',
    themeAndDisplay: 'థీమ్ & డిస్‌ప్లే',
    troubleshooting: 'ట్రబుల్‌షూటింగ్',

    welcomeBack: 'తిరిగి స్వాగతం',
    continueLearning: 'నేర్చుకోవడం కొనసాగించండి',
    coursesInProgress: 'ప్రస్తుత కోర్సులు',
    lessonsCompleted: 'పూర్తయిన పాఠాలు',
    improvementRate: 'పురోగతి రేటు',
    explorePopularTopics: 'జనాదరణ పొందిన అంశాలు',
    problemOfTheDay: 'నేటి ప్రధాన సమస్య',
    solveProblem: 'సమస్యను పరిష్కరించండి',
    studyCalendar: 'అధ్యయన క్యాలెండర్',
    interviewExperiences: 'ఇంటర్వ్యూ అనుభవాలు & సమీక్షలు',
    placementMilestone: 'ప్లేస్‌మెంట్ సన్నద్ధత మైలురాయి',

    allCourses: 'అన్ని కోర్సులు',
    development: 'డెవలప్‌మెంట్',
    design: 'డిజైన్',
    dataScience: 'డేటా సైన్స్',
    resumeCourse: 'కోర్సును కొనసాగించండి',
    modules: 'మాడ్యూల్స్',
    completed: 'పూర్తయింది',
    markComplete: 'పూర్తయినట్లు గుర్తించి సమీక్షించండి',

    verifiedCertifications: 'నమూనా అభ్యాస రికార్డులు',
    addToLinkedIn: 'LinkedIn ప్రొఫైల్‌కు జోడించండి',
    shareOnLinkedIn: 'LinkedIn లో పోస్ట్ చేయండి',
    downloadPdf: 'సర్టిఫికేట్ డౌన్‌లోడ్ చేయండి',
    viewCertificate: 'సర్టిఫికేట్ వీక్షించండి',
    credentialId: 'ధృవీకరణ ID',
    issuedBy: 'జారీ చేసినవారు',

    loginTitle: 'స్మార్ట్ ఇంటర్న్‌కి సైన్ ఇన్ చేయండి',
    loginSubtitle: 'మీ వ్యక్తిగతీకరించిన అడాప్టివ్ పాఠ్యాంశాలను యాక్సెస్ చేయడానికి సైన్ ఇన్ చేయండి.',
    continueWithGoogle: 'Google తో కొనసాగించండి',
    continueWithEmail: 'Gmail / ఇమెయిల్‌తో కొనసాగించండి',
    continueWithPhone: 'ఫోన్ నంబర్ (OTP)తో కొనసాగించండి',
    orDivider: 'లేదా ఈ క్రింది పద్ధతిలో సైన్ ఇన్ చేయండి',
    emailLabel: 'Gmail లేదా కాలేజ్ ఇమెయిల్ చిరునామా',
    passwordLabel: 'పాస్‌వర్డ్',
    phoneLabel: '10 అంకెల మొబైల్ నంబర్',
    sendOtp: 'ధృవీకరణ OTP పంపండి',
    enterOtp: '6 అంకెల OTP నమోదు చేయండి',
    verifyAndContinue: 'ధృవీకరించి సైన్ ఇన్ చేయండి',
    exploreAsGuest: 'గెస్ట్ / డెమో విద్యార్థిగా అన్వేషించండి',
    signIn: 'సైన్ ఇన్',
    getStarted: 'ఉచితంగా ప్రారంభించండి',
    applyNow: 'దరఖాస్తు చేసుకోండి',
    applied: 'దరఖాస్తు చేయబడింది',
  },
  hi: {
    prep: 'तैयारी (Prep)',
    explore: 'अन्वेषण (Explore)',
    opportunities: 'अवसर (Opportunities)',
    dashboard: 'डैशबोर्ड (Dashboard)',
    prephub: 'प्रेपहब (Prephub)',
    mypath: 'माईपाथ (MyPath)',
    planlyPlanner: 'माईपाथ AI अध्ययन योजनाकार',
    community: 'समुदाय (Community)',
    myCourses: 'मेरे पाठ्यक्रम',
    assignments: 'असाइनमेंट',
    certificates: 'प्रमाणपत्र (Certificates)',
    myProgress: 'मेरी प्रगति (Progress)',
    hackathons: 'हैकाथॉन (Hackathons)',
    internships: 'इंटर्नशिप (Internships)',
    jobs: 'नौकरियां (Jobs)',
    hiringSimulator: 'हायरिंग सिम्युलेटर (Hiring Simulator)',

    searchPlaceholder: 'विषय, शीट या प्रश्न खोजें (जैसे स्लाइडिंग विंडो, रेडिस)...',
    smartIntern: 'स्मार्ट इंटर्न (Smart Intern)',
    streak: 'दिन स्ट्रीक',
    xpEarned: 'एक्सपी अंक',
    profile: 'प्रोफ़ाइल और स्तर',
    profileAndGoals: 'प्रोफ़ाइल और लक्ष्य',
    notifications: 'सूचनाएं',
    logout: 'लॉग आउट',
    account: 'खाता और योजना',
    accountAndSecurity: 'खाता और सुरक्षा',
    theme: 'थीम',
    themeAndDisplay: 'थीम और प्रदर्शन',
    troubleshooting: 'समस्या निवारण',

    welcomeBack: 'वापसी पर स्वागत है',
    continueLearning: 'पढ़ाई जारी रखें',
    coursesInProgress: 'प्रगति में पाठ्यक्रम',
    lessonsCompleted: 'पूरे किए गए पाठ',
    improvementRate: 'सुधार दर',
    explorePopularTopics: 'लोकप्रिय विषय खोजें',
    problemOfTheDay: 'आज का मुख्य प्रश्न',
    solveProblem: 'प्रश्न हल करें',
    studyCalendar: 'अध्ययन कैलेंडर',
    interviewExperiences: 'साक्षात्कार अनुभव व चर्चा',
    placementMilestone: 'प्लेसमेंट तैयारी मील का पत्थर',

    allCourses: 'सभी पाठ्यक्रम',
    development: 'डेवलपमेंट',
    design: 'डिजाइन',
    dataScience: 'डेटा साइंस',
    resumeCourse: 'पाठ्यक्रम जारी रखें',
    modules: 'मॉड्यूल',
    completed: 'पूर्ण',
    markComplete: 'पूर्ण चिह्नित करें और समीक्षा करें',

    verifiedCertifications: 'नमूना लर्निंग रिकॉर्ड्स',
    addToLinkedIn: 'LinkedIn प्रोफ़ाइल में जोड़ें',
    shareOnLinkedIn: 'LinkedIn पर शेयर करें',
    downloadPdf: 'पीडीएफ डाउनलोड करें',
    viewCertificate: 'प्रमाणपत्र देखें',
    credentialId: 'क्रेडेंशियल आईडी',
    issuedBy: 'द्वारा जारी',

    loginTitle: 'स्मार्ट इंटर्न में साइन इन करें',
    loginSubtitle: 'अपने व्यक्तिगत पाठ्यक्रम तक पहुँचने के लिए पसंदीदा विधि चुनें।',
    continueWithGoogle: 'Google से जारी रखें',
    continueWithEmail: 'Gmail / ईमेल से जारी रखें',
    continueWithPhone: 'फोन नंबर (OTP) से जारी रखें',
    orDivider: 'या क्रेडेंशियल्स से साइन इन करें',
    emailLabel: 'जीमेल या कॉलेज ईमेल पता',
    passwordLabel: 'पासवर्ड',
    phoneLabel: '10 अंकों का मोबाइल नंबर',
    sendOtp: 'सत्यापन OTP भेजें',
    enterOtp: '6 अंकों का OTP दर्ज करें',
    verifyAndContinue: 'सत्यापित करें और साइन इन करें',
    exploreAsGuest: 'अतिथि / डेमो छात्र के रूप में देखें',
    signIn: 'साइन इन करें',
    getStarted: 'मुफ्त शुरुआत करें',
    applyNow: 'आवेदन करें',
    applied: 'आवेदन किया गया',
  },
};
