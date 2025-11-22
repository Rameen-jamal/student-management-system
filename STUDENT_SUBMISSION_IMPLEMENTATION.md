# Student Assignment Submission Implementation

## Overview
This document describes the implementation of the student assignment submission feature, which allows students to upload and submit assignments through the web interface.

## Changes Made

### Backend Changes

#### 1. `backend/core/serializers.py` - SubmissionSerializer
**Updated to support student submission creation:**

- Changed `student` and `assignment` fields to use `PrimaryKeyRelatedField`
- `student` is read-only (automatically set from request.user)
- `assignment` accepts a PK for creation
- Added `to_representation()` method to provide nested student and assignment details for frontend consumption
- Added `create()` method that:
  - Automatically sets the student from `request.user.student_profile`
  - Validates that the user has an associated student profile
  - Prevents duplicate submissions for the same assignment
  - Raises clear validation errors if requirements are not met

**Key Features:**
- Submissions are created with the authenticated student automatically
- Duplicate submission prevention (enforced by serializer and database constraint)
- Full nested representation for frontend display (includes student name, enrollment number, assignment details, course info)

### Frontend Changes

#### 2. `frontend/src/Dashboard.js` - Student Dashboard
**Added submission UI and functionality:**

**New State Variables:**
```javascript
const [showSubmitModal, setShowSubmitModal] = useState(false);
const [selectedAssignment, setSelectedAssignment] = useState(null);
const [submissionFile, setSubmissionFile] = useState(null);
const [submitting, setSubmitting] = useState(false);
```

**New Functions:**
- `handleSubmitAssignmentOpen(assignment)` - Opens submission modal for selected assignment
- `handleSubmitAssignment()` - Handles file upload and submission via POST to API

**UI Updates:**
- Added "Submit" button for each pending assignment in the Assignments tab
- Button only appears for assignments that haven't been submitted yet
- Submission modal with:
  - Assignment title and description display
  - File upload input with visual feedback
  - Cancel and Submit buttons
  - Loading state during submission
  - Disabled state when no file is selected

**Submission Flow:**
1. Student clicks "Submit" button on an assignment card
2. Modal opens showing assignment details and file upload
3. Student selects a file
4. Student clicks "Submit Assignment"
5. FormData is created with `assignment` (ID), `file`, and `status` ('pending')
6. POST request sent to `/api/submissions/` with multipart/form-data
7. On success:
   - Submissions are refreshed from server
   - Modal closes
   - Success alert shown
8. On error:
   - Error message displayed (from backend or generic)

## API Endpoint Used

**POST** `/api/submissions/`

**Headers:**
- `Authorization: Bearer {token}`
- `Content-Type: multipart/form-data`

**Body (FormData):**
- `assignment`: Assignment ID (integer)
- `file`: File object
- `status`: 'pending' (default)

**Response:**
- 201 Created: Submission object with nested student and assignment details
- 400 Bad Request: Validation error (missing fields, duplicate submission, etc.)
- 403 Forbidden: User not authenticated or not a student

## Backend Permissions

The `SubmissionViewSet` in `backend/core/views.py` already has:
- `IsAuthenticated` permission class
- `MultiPartParser` and `FormParser` for file uploads
- `get_queryset()` that filters submissions based on user role:
  - Faculty: see submissions for their assignments
  - TAs: see submissions for courses they're assigned to
  - Students: see only their own submissions

## Testing Instructions

### 1. Start the Backend
```bash
cd backend
python manage.py runserver
```

### 2. Start the Frontend
```bash
cd frontend
npm start
```

### 3. Test Submission Flow

**As a Student:**
1. Log in with student credentials (e.g., `student1` / `password123`)
2. Navigate to the "Assignments" tab
3. Verify that pending assignments show a "Submit" button
4. Click "Submit" on an assignment
5. Select a file (any file type for testing)
6. Click "Submit Assignment"
7. Verify:
   - Success alert appears
   - Assignment card updates to show "Submitted" badge
   - Submit button disappears
8. Try to submit the same assignment again - should see error message

**As Faculty/TA:**
1. Log in as faculty or TA
2. Navigate to submissions view
3. Verify you can see the newly submitted assignment
4. Grade the submission
5. Verify student can see the grade

### 4. Test Edge Cases

**Duplicate Submission Prevention:**
- Try submitting the same assignment twice (should be blocked)

**No File Selected:**
- Open submission modal
- Try to submit without selecting a file (button should be disabled)

**File Upload:**
- Test with different file types (PDF, DOCX, ZIP, etc.)
- Verify files are saved in `backend/media/submissions/`

**Permission Checks:**
- Verify students can only see their own submissions
- Verify faculty/TAs can see submissions for their courses

## Database Schema

The `Submission` model has:
- `assignment` (ForeignKey to Assignment)
- `student` (ForeignKey to StudentProfile)
- `submitted_at` (auto-generated timestamp)
- `file` (uploaded file)
- `grade` (nullable float)
- `feedback` (text)
- `status` ('pending', 'approved', 'rejected', 'graded')
- Unique constraint on (assignment, student) - prevents duplicates at DB level

## Future Enhancements

Potential improvements for the submission system:
1. Add submission comments/messages between student and grader
2. Support multiple file uploads per submission
3. Add submission history and version tracking
4. Implement automatic late submission detection and penalties
5. Add file type/size restrictions
6. Provide submission preview before final submit
7. Add email notifications on submission/grading
8. Support resubmission with approval workflow

## Troubleshooting

**"Request context is required" error:**
- Ensure the ViewSet is passing request context (default behavior in DRF)

**"User does not have an associated student profile" error:**
- Check that the logged-in user has a `student_profile` relationship
- Verify seed data correctly links User to StudentProfile

**"You have already submitted for this assignment" error:**
- This is expected behavior for duplicate submissions
- Check database for existing submission records

**File not uploading:**
- Verify `MEDIA_ROOT` and `MEDIA_URL` are configured in `settings.py`
- Check file permissions on `backend/media/` directory
- Ensure frontend is sending correct `Content-Type: multipart/form-data`

**Submissions not appearing:**
- Check backend console for errors
- Verify JWT token is being sent in Authorization header
- Check `get_queryset()` filtering logic for the user's role

## Related Files

- `backend/core/models.py` - Submission model definition
- `backend/core/serializers.py` - SubmissionSerializer
- `backend/core/views.py` - SubmissionViewSet
- `backend/flex/urls.py` - API routing
- `frontend/src/Dashboard.js` - Student UI
- `frontend/src/config/api.js` - API endpoint configuration

## Summary

The student submission feature is now fully implemented with:
- ✅ Backend API for submission creation
- ✅ Automatic student linkage from authenticated user
- ✅ Duplicate submission prevention
- ✅ File upload support
- ✅ Frontend submission modal and UI
- ✅ Error handling and user feedback
- ✅ Integration with existing grading workflow

Students can now submit assignments, and faculty/TAs can view, grade, and provide feedback on those submissions through their respective dashboards.
