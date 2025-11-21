import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "./config/api";
import { 
    User, BookOpen, ClipboardCheck, Clock, Users, LogOut, 
    CheckCircle, AlertCircle, Target, MessageSquare, 
    Award, FileText, TrendingUp, Briefcase, Edit2, Save, X
} from 'lucide-react';

// Export content
