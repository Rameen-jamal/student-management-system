# Student Management System - Tasks & Issues

**Last Updated:** 2025-11-21

## Status Overview
- ✅ Backend: Mostly Complete
- ⚠️ Frontend: Needs Work
- ⚠️ Integration: Multiple Issues

---

## 🔴 Critical Issues

### 1. Student Registration Not Reflecting on Faculty Dashboard
**Priority:** HIGH  
**Status:** 🔴 Not Started

**Problem:**
- Students added/registered through Django admin and assigned to faculty
- Faculty dashboard shows 0 students
- Breaks dependent features: attendance, submissions, marks

**Potential Causes:**
- Serializer not including student relationships
- Frontend fetch not retrieving student data correctly
- Database relationship mapping issue (Student → Faculty)

**Dependencies:**
- Blocks Task #4 (Attendance Feature)

**Action Items:**
- [ ] Check Django model relationships (Student → Faculty)
- [ ] Verify serializer includes student queryset
- [ ] Test API endpoint response (check if students are in JSON)
- [ ] Debug frontend fetch/state management
- [ ] Verify role-based filtering logic

---

### 2. Faculty Dashboard – Announcements Not Posting
**Priority:** HIGH  
**Status:** ✅ COMPLETED

**Problem:**
- Faculty creates an announcement
- Announcement doesn't appear on dashboard

**Root Cause:**
- API endpoint `post_announcement` in `backend/core/views.py` was incomplete
- Method only validated permissions but never created the announcement object
- No return statement after permission check caused 500 Internal Server Error

**Solution Applied:**
- Added missing code to create CourseAnnouncement object
- Returns serialized announcement with 201 status
- Minimal change (9 lines added) to complete the incomplete method

**Action Items:**
- [x] Test API endpoint directly (Postman/curl)
- [x] Check serializer validation errors
- [x] Verify frontend form data structure
- [x] Check network tab for failed requests
- [x] Verify authentication/permissions on endpoint

---

## 🟡 Major Features Incomplete

### 3. Admin Dashboard Not Working Yet
**Priority:** MEDIUM  
**Status:** 🟡 Partially Built

**Problem:**
- Admin dashboard code exists but not connected/tested
- Uncertain about routing, APIs, and role-based access control

**Action Items:**
- [ ] Review existing admin dashboard code
- [ ] Set up proper routing (frontend + backend)
- [ ] Implement/verify role-based access control (RBAC)
- [ ] Test all admin API endpoints
- [ ] Connect frontend components to APIs
- [ ] End-to-end testing

---

### 4. Attendance Feature Not Testable
**Priority:** MEDIUM  
**Status:** 🔴 Blocked

**Problem:**
- Cannot test attendance because faculty sees zero students
- Depends on Task #1 being resolved

**Dependencies:**
- ⚠️ **Blocked by Task #1**

**Action Items:**
- [ ] Wait for student→faculty mapping fix
- [ ] Test attendance marking UI
- [ ] Verify attendance API endpoints
- [ ] Test attendance report generation
- [ ] Validate date/time handling

---

### 5. TA Dashboard Not Built Yet
**Priority:** MEDIUM  
**Status:** 🔴 Not Started

**Problem:**
- Teacher Assistant dashboard completely missing
- No UI or functionality implemented

**Required Features:**
- [ ] TA dashboard UI/layout
- [ ] View assigned courses
- [ ] Grading assistance interface
- [ ] View student submissions
- [ ] Communication with faculty
- [ ] API endpoints for TA-specific data
- [ ] Role-based access control for TA

---

### 6. Student Dashboard Incomplete
**Priority:** MEDIUM  
**Status:** 🟡 Partially Built

**Problem:**
- Course list not fully connected
- Assignments view incomplete
- Submissions functionality missing
- Quizzes not integrated

**Action Items:**
- [ ] Connect course list to API
- [ ] Build assignments view component
- [ ] Implement submission upload functionality
- [ ] Integrate quiz taking interface
- [ ] Display grades/feedback
- [ ] Test all student-facing features

---

## 📋 Testing Checklist

### Once Issues Are Resolved:
- [ ] Test complete student registration flow
- [ ] Verify faculty can see all assigned students
- [ ] Test announcement creation and display
- [ ] Test attendance marking and reports
- [ ] Verify admin dashboard functionality
- [ ] Test TA dashboard features
- [ ] Test student dashboard features
- [ ] End-to-end integration testing
- [ ] Role-based access control verification

---

## 🔧 Technical Debt & Notes

### Common Issues to Check:
- CORS configuration
- Authentication token handling
- Serializer relationships (nested vs. flat)
- Frontend state management
- API response error handling
- Database migrations up to date

### Recommended Investigation Order:
1. **Task #1** (Student-Faculty mapping) - Unblocks attendance
2. **Task #2** (Announcements) - Quick win, high visibility
3. **Task #3** (Admin Dashboard) - Core functionality
4. **Task #4** (Attendance) - After Task #1 is fixed
5. **Task #6** (Student Dashboard) - User-facing priority
6. **Task #5** (TA Dashboard) - New feature development

---

## 📝 Notes
- Backend is mostly complete
- Focus on frontend integration and API connections
- Many issues likely related to serializers and data fetching
- Test APIs independently before debugging frontend
