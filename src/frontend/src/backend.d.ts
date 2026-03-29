import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface IncidentReport {
    id: bigint;
    status: string;
    description: string;
    timestamp: bigint;
    location: string;
    incidentType: string;
}
export interface FAQ {
    id: string;
    question: string;
    answer: string;
    category: string;
}
export interface Law {
    title: string;
    description: string;
    category: string;
}
export interface ChatbotRule {
    id: string;
    keywords: Array<string>;
    response: string;
}
export interface QuizQuestion {
    id: string;
    question: string;
    correctIndex: bigint;
    explanation: string;
    options: Array<string>;
}
export interface Story {
    id: bigint;
    isApproved: boolean;
    content: string;
    timestamp: bigint;
}
export interface Resource {
    id: string;
    contact: string;
    name: string;
    description: string;
    resourceType: string;
    location: string;
}
export interface Helpline {
    name: string;
    number: string;
    category: string;
}
export interface Feedback {
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addFeedback(name: string, email: string, message: string): Promise<void>;
    addIncidentReport(description: string, location: string, incidentType: string): Promise<void>;
    addOrUpdateChatbotRule(id: string, keywords: Array<string>, response: string): Promise<void>;
    addOrUpdateFAQ(id: string, question: string, answer: string, category: string): Promise<void>;
    addOrUpdateHelpline(name: string, number: string, category: string): Promise<void>;
    addOrUpdateLaw(title: string, description: string, category: string): Promise<void>;
    addOrUpdateQuizQuestion(id: string, question: string, options: Array<string>, correctIndex: bigint, explanation: string): Promise<void>;
    addOrUpdateResource(id: string, name: string, resourceType: string, location: string, contact: string, description: string): Promise<void>;
    addStory(content: string): Promise<void>;
    approveStory(storyId: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteChatbotRule(id: string): Promise<void>;
    deleteFAQ(id: string): Promise<void>;
    deleteHelpline(name: string): Promise<void>;
    deleteLaw(title: string): Promise<void>;
    deleteQuizQuestion(id: string): Promise<void>;
    deleteResource(id: string): Promise<void>;
    deleteStory(storyId: bigint): Promise<void>;
    getAllChatbotRules(): Promise<Array<ChatbotRule>>;
    getAllFAQs(): Promise<Array<FAQ>>;
    getAllFeedback(): Promise<Array<Feedback>>;
    getAllHelplines(): Promise<Array<Helpline>>;
    getAllIncidentReports(): Promise<Array<IncidentReport>>;
    getAllLaws(): Promise<Array<Law>>;
    getAllQuizQuestions(): Promise<Array<QuizQuestion>>;
    getAllResources(): Promise<Array<Resource>>;
    getAllStories(): Promise<Array<Story>>;
    getApprovedStories(): Promise<Array<Story>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateIncidentStatus(incidentId: bigint, status: string): Promise<void>;
}
