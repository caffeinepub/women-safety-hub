import Array "mo:core/Array";
import Int "mo:core/Int";
import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Migration "migration";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Time "mo:core/Time";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

(with migration = Migration.run)
actor {
  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Feedback Record
  type Feedback = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Int;
  };

  module Feedback {
    public func compare(f1 : Feedback, f2 : Feedback) : Order.Order {
      Int.compare(f1.timestamp, f2.timestamp);
    };
  };

  // Helpline Record
  type Helpline = {
    name : Text;
    number : Text;
    category : Text;
  };

  module Helpline {
    public func compare(helpline1 : Helpline, helpline2 : Helpline) : Order.Order {
      Text.compare(helpline1.name, helpline2.name);
    };
  };

  // Law Record
  type Law = {
    title : Text;
    description : Text;
    category : Text;
  };

  module Law {
    public func compare(law1 : Law, law2 : Law) : Order.Order {
      Text.compare(law1.title, law2.title);
    };
  };

  // ChatbotRule Record
  type ChatbotRule = {
    id : Text;
    keywords : [Text];
    response : Text;
  };

  module ChatbotRule {
    public func compare(rule1 : ChatbotRule, rule2 : ChatbotRule) : Order.Order {
      Text.compare(rule1.id, rule2.id);
    };
  };

  // Story Record
  type Story = {
    id : Int;
    content : Text;
    isApproved : Bool;
    timestamp : Int;
  };

  module Story {
    public func compare(story1 : Story, story2 : Story) : Order.Order {
      if (story1.timestamp < story2.timestamp) { #less } else if (story1.timestamp > story2.timestamp) { #greater } else {
        Int.compare(story1.id, story2.id);
      };
    };
  };

  // Resource Record
  type Resource = {
    id : Text;
    name : Text;
    resourceType : Text;
    location : Text;
    contact : Text;
    description : Text;
  };

  module Resource {
    public func compare(res1 : Resource, res2 : Resource) : Order.Order {
      Text.compare(res1.id, res2.id);
    };
  };

  // FAQ Record
  type FAQ = {
    id : Text;
    question : Text;
    answer : Text;
    category : Text;
  };

  module FAQ {
    public func compare(faq1 : FAQ, faq2 : FAQ) : Order.Order {
      Text.compare(faq1.id, faq2.id);
    };
  };

  // IncidentReport Record
  type IncidentReport = {
    id : Int;
    description : Text;
    location : Text;
    incidentType : Text;
    timestamp : Int;
    status : Text;
  };

  module IncidentReport {
    public func compare(inc1 : IncidentReport, inc2 : IncidentReport) : Order.Order {
      Int.compare(inc1.timestamp, inc2.timestamp);
    };
  };

  // QuizQuestion Record
  type QuizQuestion = {
    id : Text;
    question : Text;
    options : [Text];
    correctIndex : Nat;
    explanation : Text;
  };

  module QuizQuestion {
    public func compare(q1 : QuizQuestion, q2 : QuizQuestion) : Order.Order {
      Text.compare(q1.id, q2.id);
    };
  };

  // Data Storage
  let feedbackData = Map.empty<Int, Feedback>();
  let helplineData = Map.empty<Text, Helpline>();
  let lawData = Map.empty<Text, Law>();
  let chatbotRuleData = Map.empty<Text, ChatbotRule>();
  var nextStoryId = 1;
  let storyData = Map.empty<Int, Story>();
  let resourceData = Map.empty<Text, Resource>();
  let faqData = Map.empty<Text, FAQ>();
  var nextIncidentId = 1;
  let incidentReportData = Map.empty<Int, IncidentReport>();
  let quizQuestionData = Map.empty<Text, QuizQuestion>();

  // Initialize default data
  func initializeDefaultData() {
    // Default Chatbot Rules
    chatbotRuleData.add("emergency", {
      id = "emergency";
      keywords = ["emergency", "help", "danger", "urgent"];
      response = "In case of emergency, dial 100 (Police), 112 (National Emergency Number), or 1091 (Women Helpline). Stay safe!";
    });
    chatbotRuleData.add("helpline", {
      id = "helpline";
      keywords = ["helpline", "contact", "number"];
      response = "Women Helpline: 1091, National Commission for Women: 011-26942369, Domestic Violence Helpline: 181";
    });
    chatbotRuleData.add("domestic_violence", {
      id = "domestic_violence";
      keywords = ["domestic violence", "abuse", "violence at home"];
      response = "Domestic violence is a crime. Contact 181 (Domestic Violence Helpline) or approach the nearest police station. Protection of Women from Domestic Violence Act, 2005 protects you.";
    });
    chatbotRuleData.add("harassment", {
      id = "harassment";
      keywords = ["harassment", "stalking", "eve teasing"];
      response = "Harassment is punishable under IPC Section 354A. Document evidence and file a complaint at the nearest police station or call 100.";
    });
    chatbotRuleData.add("legal_rights", {
      id = "legal_rights";
      keywords = ["legal rights", "rights", "law"];
      response = "Women have equal rights under the Constitution. Key laws: Dowry Prohibition Act, Sexual Harassment at Workplace Act, Domestic Violence Act. Consult a lawyer for specific advice.";
    });
    chatbotRuleData.add("safety_tips", {
      id = "safety_tips";
      keywords = ["safety", "tips", "precaution"];
      response = "Safety tips: Share your location with trusted contacts, avoid isolated areas at night, trust your instincts, keep emergency numbers handy, use safety apps.";
    });

    // Default FAQs
    faqData.add("faq1", {
      id = "faq1";
      question = "What should I do if I face harassment at workplace?";
      answer = "File a complaint with the Internal Complaints Committee (ICC) under the Sexual Harassment of Women at Workplace Act, 2013. Every organization with 10+ employees must have an ICC.";
      category = "workplace";
    });
    faqData.add("faq2", {
      id = "faq2";
      question = "How can I file a complaint against domestic violence?";
      answer = "You can file a complaint under the Protection of Women from Domestic Violence Act, 2005 at the nearest police station or approach a Protection Officer or Magistrate.";
      category = "domestic_violence";
    });
    faqData.add("faq3", {
      id = "faq3";
      question = "What is the punishment for dowry harassment?";
      answer = "Dowry demand is punishable under Section 304B IPC with imprisonment up to 7 years. Dowry death can lead to life imprisonment.";
      category = "legal";
    });
    faqData.add("faq4", {
      id = "faq4";
      question = "Can I file a complaint online?";
      answer = "Yes, many states offer online complaint filing through their police websites. You can also use the National Cyber Crime Reporting Portal for cyber crimes.";
      category = "general";
    });
    faqData.add("faq5", {
      id = "faq5";
      question = "What are my rights during police investigation?";
      answer = "You have the right to be informed about the progress, right to privacy, right to free legal aid, and right to be treated with dignity. Female officers should be present during questioning.";
      category = "legal";
    });

    // Default Quiz Questions
    quizQuestionData.add("q1", {
      id = "q1";
      question = "What is the national emergency number in India?";
      options = ["100", "112", "1091", "181"];
      correctIndex = 1;
      explanation = "112 is the national emergency number that connects to police, ambulance, and fire services.";
    });
    quizQuestionData.add("q2", {
      id = "q2";
      question = "Which act protects women from domestic violence?";
      options = ["Dowry Prohibition Act", "Protection of Women from Domestic Violence Act, 2005", "IPC Section 498A", "All of the above"];
      correctIndex = 3;
      explanation = "All these laws provide protection against domestic violence in different forms.";
    });
    quizQuestionData.add("q3", {
      id = "q3";
      question = "What is the women helpline number?";
      options = ["100", "1091", "181", "1098"];
      correctIndex = 1;
      explanation = "1091 is the dedicated Women Helpline number across India.";
    });
    quizQuestionData.add("q4", {
      id = "q4";
      question = "Under which section is sexual harassment at workplace covered?";
      answer = "Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013";
      options = ["Companies Act", "Sexual Harassment of Women at Workplace Act, 2013", "IPC Section 354", "Labour Laws"];
      correctIndex = 1;
      explanation = "The Sexual Harassment of Women at Workplace Act, 2013 specifically addresses workplace harassment.";
    });
    quizQuestionData.add("q5", {
      id = "q5";
      question = "Can a woman file an FIR at any police station?";
      options = ["No, only in her jurisdiction", "Yes, anywhere in India", "Only with permission", "Only in metro cities"];
      correctIndex = 1;
      explanation = "As per Supreme Court guidelines, a woman can file an FIR at any police station regardless of jurisdiction.";
    });
  };

  // Call initialization
  initializeDefaultData();

  // ===== FEEDBACK FUNCTIONS =====
  public shared ({ caller }) func addFeedback(name : Text, email : Text, message : Text) : async () {
    // Public function - no authorization required
    let timestamp = Time.now();
    let feedback : Feedback = {
      name;
      email;
      message;
      timestamp;
    };
    feedbackData.add(timestamp, feedback);
  };

  public query ({ caller }) func getAllFeedback() : async [Feedback] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all feedback");
    };
    feedbackData.values().toArray().sort();
  };

  // ===== HELPLINE FUNCTIONS =====
  public shared ({ caller }) func addOrUpdateHelpline(name : Text, number : Text, category : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can manage helplines");
    };
    let helpline : Helpline = {
      name;
      number;
      category;
    };
    helplineData.add(name, helpline);
  };

  public shared ({ caller }) func deleteHelpline(name : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can manage helplines");
    };
    let existed = helplineData.containsKey(name);
    helplineData.remove(name);
    if (not existed) {
      Runtime.trap("Helpline does not exist");
    };
  };

  public query ({ caller }) func getAllHelplines() : async [Helpline] {
    // Public function - no authorization required
    helplineData.values().toArray().sort();
  };

  // ===== LAW FUNCTIONS =====
  public shared ({ caller }) func addOrUpdateLaw(title : Text, description : Text, category : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can manage laws");
    };
    let law : Law = {
      title;
      description;
      category;
    };
    lawData.add(title, law);
  };

  public shared ({ caller }) func deleteLaw(title : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can manage laws");
    };
    let existed = lawData.containsKey(title);
    lawData.remove(title);
    if (not existed) {
      Runtime.trap("Law does not exist");
    };
  };

  public query ({ caller }) func getAllLaws() : async [Law] {
    // Public function - no authorization required
    lawData.values().toArray().sort();
  };

  // ===== CHATBOT RULE FUNCTIONS =====
  public shared ({ caller }) func addOrUpdateChatbotRule(id : Text, keywords : [Text], response : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can manage chatbot rules");
    };
    let rule : ChatbotRule = {
      id;
      keywords;
      response;
    };
    chatbotRuleData.add(id, rule);
  };

  public shared ({ caller }) func deleteChatbotRule(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can manage chatbot rules");
    };
    let existed = chatbotRuleData.containsKey(id);
    chatbotRuleData.remove(id);
    if (not existed) {
      Runtime.trap("Chatbot rule does not exist");
    };
  };

  public query ({ caller }) func getAllChatbotRules() : async [ChatbotRule] {
    // Public function - no authorization required
    chatbotRuleData.values().toArray().sort();
  };

  // ===== STORY FUNCTIONS =====
  public shared ({ caller }) func addStory(content : Text) : async () {
    // Public function - anonymous allowed
    let timestamp = Time.now();
    let story : Story = {
      id = nextStoryId;
      content;
      isApproved = false;
      timestamp;
    };
    storyData.add(nextStoryId, story);
    nextStoryId += 1;
  };

  public shared ({ caller }) func approveStory(storyId : Int) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can approve stories");
    };
    switch (storyData.get(storyId)) {
      case (null) { Runtime.trap("Story does not exist") };
      case (?existing) {
        let approvedStory = { existing with isApproved = true };
        storyData.add(storyId, approvedStory);
      };
    };
  };

  public shared ({ caller }) func deleteStory(storyId : Int) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete stories");
    };
    let existed = storyData.containsKey(storyId);
    storyData.remove(storyId);
    if (not existed) {
      Runtime.trap("Story does not exist");
    };
  };

  public query ({ caller }) func getAllStories() : async [Story] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all stories");
    };
    let storiesArray = storyData.values().toArray();
    storiesArray.sort();
  };

  public query ({ caller }) func getApprovedStories() : async [Story] {
    // Public function - no authorization required
    storyData.values().filter(func(story) { story.isApproved }).toArray().sort();
  };

  // ===== RESOURCE FUNCTIONS =====
  public shared ({ caller }) func addOrUpdateResource(id : Text, name : Text, resourceType : Text, location : Text, contact : Text, description : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can manage resources");
    };
    let resource : Resource = {
      id;
      name;
      resourceType;
      location;
      contact;
      description;
    };
    resourceData.add(id, resource);
  };

  public shared ({ caller }) func deleteResource(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can manage resources");
    };
    let existed = resourceData.containsKey(id);
    resourceData.remove(id);
    if (not existed) {
      Runtime.trap("Resource does not exist");
    };
  };

  public query ({ caller }) func getAllResources() : async [Resource] {
    // Public function - no authorization required
    resourceData.values().toArray().sort();
  };

  // ===== FAQ FUNCTIONS =====
  public shared ({ caller }) func addOrUpdateFAQ(id : Text, question : Text, answer : Text, category : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can manage FAQs");
    };
    let faq : FAQ = {
      id;
      question;
      answer;
      category;
    };
    faqData.add(id, faq);
  };

  public shared ({ caller }) func deleteFAQ(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can manage FAQs");
    };
    let existed = faqData.containsKey(id);
    faqData.remove(id);
    if (not existed) {
      Runtime.trap("FAQ does not exist");
    };
  };

  public query ({ caller }) func getAllFAQs() : async [FAQ] {
    // Public function - no authorization required
    faqData.values().toArray().sort();
  };

  // ===== INCIDENT REPORT FUNCTIONS =====
  public shared ({ caller }) func addIncidentReport(description : Text, location : Text, incidentType : Text) : async () {
    // Public function - anonymous allowed
    let timestamp = Time.now();
    let report : IncidentReport = {
      id = nextIncidentId;
      description;
      location;
      incidentType;
      timestamp;
      status = "pending";
    };
    incidentReportData.add(nextIncidentId, report);
    nextIncidentId += 1;
  };

  public query ({ caller }) func getAllIncidentReports() : async [IncidentReport] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all incident reports");
    };
    incidentReportData.values().toArray().sort();
  };

  public shared ({ caller }) func updateIncidentStatus(incidentId : Int, status : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update incident status");
    };
    switch (incidentReportData.get(incidentId)) {
      case (null) { Runtime.trap("Incident report does not exist") };
      case (?existing) {
        let updatedReport = { existing with status = status };
        incidentReportData.add(incidentId, updatedReport);
      };
    };
  };

  // ===== QUIZ QUESTION FUNCTIONS =====
  public shared ({ caller }) func addOrUpdateQuizQuestion(id : Text, question : Text, options : [Text], correctIndex : Nat, explanation : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can manage quiz questions");
    };
    let quizQuestion : QuizQuestion = {
      id;
      question;
      options;
      correctIndex;
      explanation;
    };
    quizQuestionData.add(id, quizQuestion);
  };

  public shared ({ caller }) func deleteQuizQuestion(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can manage quiz questions");
    };
    let existed = quizQuestionData.containsKey(id);
    quizQuestionData.remove(id);
    if (not existed) {
      Runtime.trap("Quiz question does not exist");
    };
  };

  public query ({ caller }) func getAllQuizQuestions() : async [QuizQuestion] {
    // Public function - no authorization required
    quizQuestionData.values().toArray().sort();
  };
};
