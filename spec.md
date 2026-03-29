# Women Safety Hub — Feature Expansion

## Current State
App has 5 pages: Home, Laws, Helpline, Chatbot, Feedback.
- Backend stores: Feedback, Helpline, Law
- Chatbot is static keyword-matching (no backend)
- No admin, no stories, no FAQ, no quiz, no SOS, no safety tips page

## Requested Changes (Diff)

### Add
- **Emergency SOS button** — prominent button on Home and a dedicated SOS modal with emergency numbers
- **Safety Tips page** — self-defense, online safety, travel, workplace tips
- **Know Your Rights Quiz** — interactive quiz with questions/answers about women's legal rights
- **Anonymous Story Sharing** — women can submit stories anonymously; stories stored on-chain and displayed
- **Resource Directory** — shelters, NGOs, legal aid orgs with name, type, location, contact
- **FAQ section** — stored on backend, manageable from admin
- **Admin Dashboard** — secured by Internet Identity; manage laws, helplines, FAQs, chatbot responses, view feedback, approve/reject stories
- **Success Stories** — curated stories (via admin) shown publicly
- **Safety Checklist** — interactive printable checklist
- **Incident Report Form** — structured form that submits to backend
- **Dynamic Chatbot** — responses stored in backend, editable by admin; chatbot rules/responses can be added/updated/deleted
- **Multilingual support** — English + Hindi language toggle

### Modify
- Chatbot: replace static keyword matching with backend-fetched responses
- Navigation: add new pages (Safety Tips, Quiz, Stories, Resources, FAQ, Admin)
- Home: add SOS button prominently

### Remove
- Static BOT_RULES array in Chatbot.tsx (replaced by backend)

## Implementation Plan
1. Backend: Add types for ChatbotRule, Story, Resource, FAQ, IncidentReport, QuizQuestion
2. Backend: CRUD for all new types; admin check for sensitive operations; public reads
3. Backend: Seed initial chatbot rules, FAQs, quiz questions, resources
4. Frontend: Add pages — SafetyTips, Quiz, Stories, Resources, FAQ, Admin, IncidentReport
5. Frontend: Update Chatbot to fetch rules from backend
6. Frontend: Add SOS modal/button to Home and Layout
7. Frontend: Add language context (EN/HI) and basic translated strings
8. Frontend: Admin dashboard with tabs for each content type
