import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { Language, LanguageTranslation } from '../models/language.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { StorageService } from './storage.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    private readonly STORAGE_KEY = 'selected_language';
    private platformId = inject(PLATFORM_ID);
    private languages: Language[] = [
        {
            id: 1,
            code: 'en',
            name: 'English',
            flag: '🇺🇸',
            isActive: true,
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01')
        },
        {
            id: 2,
            code: 'vn',
            name: 'Vietnamese',
            flag: '🇻🇳',
            isActive: true,
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01')
        }
    ];

    private translations: LanguageTranslation[] = [
        // English translations
        { id: 1, languageId: 1, key: 'settings', value: 'Settings', createdAt: new Date(), updatedAt: new Date() },
        { id: 2, languageId: 1, key: 'theme', value: 'Theme', createdAt: new Date(), updatedAt: new Date() },
        { id: 3, languageId: 1, key: 'language', value: 'Language', createdAt: new Date(), updatedAt: new Date() },
        { id: 4, languageId: 1, key: 'dark_mode', value: 'Dark Mode', createdAt: new Date(), updatedAt: new Date() },
        { id: 5, languageId: 1, key: 'home', value: 'Home', createdAt: new Date(), updatedAt: new Date() },
        { id: 6, languageId: 1, key: 'home_title', value: 'EduPlatform - Transform Your Future with Online Learning', createdAt: new Date(), updatedAt: new Date() },
        { id: 7, languageId: 1, key: 'home_decs', value: 'Access world-class education from anywhere. Learn from expert instructors and earn recognized certificates.', createdAt: new Date(), updatedAt: new Date() },
        { id: 8, languageId: 1, key: 'courses', value: 'Courses', createdAt: new Date(), updatedAt: new Date() },
        { id: 9, languageId: 1, key: 'teachers', value: 'Teachers', createdAt: new Date(), updatedAt: new Date() },
        { id: 10, languageId: 1, key: 'resources', value: 'Resources', createdAt: new Date(), updatedAt: new Date() },
        { id: 11, languageId: 1, key: 'about', value: 'About', createdAt: new Date(), updatedAt: new Date() },
        { id: 12, languageId: 1, key: 'login', value: 'Login', createdAt: new Date(), updatedAt: new Date() },
        { id: 13, languageId: 1, key: 'signup', value: 'Sign up', createdAt: new Date(), updatedAt: new Date() },
        { id: 14, languageId: 1, key: 'about_title', value: 'About EduPlatform', createdAt: new Date(), updatedAt: new Date() },
        { id: 15, languageId: 1, key: 'about_mission', value: 'Our Mission', createdAt: new Date(), updatedAt: new Date() },
        { id: 16, languageId: 1, key: 'about_mission_text', value: 'To provide accessible, high-quality education to learners worldwide through innovative technology and expert instruction.', createdAt: new Date(), updatedAt: new Date() },
        { id: 17, languageId: 1, key: 'about_vision', value: 'Our Vision', createdAt: new Date(), updatedAt: new Date() },
        { id: 18, languageId: 1, key: 'about_vision_text', value: 'To become the leading global platform for online education, empowering millions of learners to achieve their goals.', createdAt: new Date(), updatedAt: new Date() },
        { id: 19, languageId: 1, key: 'about_values', value: 'Our Values', createdAt: new Date(), updatedAt: new Date() },
        { id: 20, languageId: 1, key: 'about_quality', value: 'Quality Education', createdAt: new Date(), updatedAt: new Date() },
        { id: 21, languageId: 1, key: 'about_innovation', value: 'Innovation', createdAt: new Date(), updatedAt: new Date() },
        { id: 22, languageId: 1, key: 'about_accessibility', value: 'Accessibility', createdAt: new Date(), updatedAt: new Date() },
        { id: 23, languageId: 1, key: 'home_hero_title', value: 'Transform Your Future with Online Learning', createdAt: new Date(), updatedAt: new Date() },
        { id: 24, languageId: 1, key: 'home_hero_subtitle', value: 'Access world-class education from anywhere. Learn from expert instructors and earn recognized certificates.', createdAt: new Date(), updatedAt: new Date() },
        { id: 25, languageId: 1, key: 'home_get_started', value: 'Get Started', createdAt: new Date(), updatedAt: new Date() },
        { id: 26, languageId: 1, key: 'home_view_courses', value: 'View Courses', createdAt: new Date(), updatedAt: new Date() },
        { id: 27, languageId: 1, key: 'home_featured_courses', value: 'Featured Courses', createdAt: new Date(), updatedAt: new Date() },
        { id: 28, languageId: 1, key: 'home_featured_courses_subtitle', value: 'Explore our most popular courses and start your learning journey today', createdAt: new Date(), updatedAt: new Date() },
        { id: 29, languageId: 1, key: 'home_top_teachers', value: 'Our Expert Instructors', createdAt: new Date(), updatedAt: new Date() },
        { id: 30, languageId: 1, key: 'home_top_teachers_subtitle', value: 'Learn from industry professionals with years of experience', createdAt: new Date(), updatedAt: new Date() },
        { id: 31, languageId: 1, key: 'home_certificates', value: 'Professional Certificates', createdAt: new Date(), updatedAt: new Date() },
        { id: 32, languageId: 1, key: 'home_certificates_subtitle', value: 'Earn recognized certificates to advance your career', createdAt: new Date(), updatedAt: new Date() },
        { id: 33, languageId: 1, key: 'home_stats_students', value: 'Active Students', createdAt: new Date(), updatedAt: new Date() },
        { id: 34, languageId: 1, key: 'home_stats_courses', value: 'Available Courses', createdAt: new Date(), updatedAt: new Date() },
        { id: 35, languageId: 1, key: 'home_stats_teachers', value: 'Expert Teachers', createdAt: new Date(), updatedAt: new Date() },
        { id: 36, languageId: 1, key: 'home_stats_certificates', value: 'Certificates', createdAt: new Date(), updatedAt: new Date() },

        // Vietnamese translations
        { id: 21, languageId: 2, key: 'settings', value: 'Cài đặt', createdAt: new Date(), updatedAt: new Date() },
        { id: 22, languageId: 2, key: 'theme', value: 'Giao diện', createdAt: new Date(), updatedAt: new Date() },
        { id: 23, languageId: 2, key: 'language', value: 'Ngôn ngữ', createdAt: new Date(), updatedAt: new Date() },
        { id: 24, languageId: 2, key: 'dark_mode', value: 'Chế độ tối', createdAt: new Date(), updatedAt: new Date() },
        { id: 25, languageId: 2, key: 'home', value: 'Trang chủ', createdAt: new Date(), updatedAt: new Date() },
        { id: 26, languageId: 2, key: 'home_title', value: 'EduPlatform - Thay Đổi Tương Lai Của Bạn Với Học Trực Tuyến', createdAt: new Date(), updatedAt: new Date() },
        { id: 27, languageId: 2, key: 'home_decs', value: 'Tiếp cận nền giáo dục đẳng cấp thế giới từ mọi nơi. Học từ các giảng viên chuyên môn và nhận chứng chỉ được công nhận.', createdAt: new Date(), updatedAt: new Date() },
        { id: 28, languageId: 2, key: 'courses', value: 'Khóa học', createdAt: new Date(), updatedAt: new Date() },
        { id: 29, languageId: 2, key: 'teachers', value: 'Giảng viên', createdAt: new Date(), updatedAt: new Date() },
        { id: 30, languageId: 2, key: 'resources', value: 'Tài nguyên', createdAt: new Date(), updatedAt: new Date() },
        { id: 31, languageId: 2, key: 'about', value: 'Giới thiệu', createdAt: new Date(), updatedAt: new Date() },
        { id: 32, languageId: 2, key: 'login', value: 'Đăng nhập', createdAt: new Date(), updatedAt: new Date() },
        { id: 33, languageId: 2, key: 'signup', value: 'Đăng ký', createdAt: new Date(), updatedAt: new Date() },
        { id: 34, languageId: 2, key: 'about_title', value: 'Về EduPlatform', createdAt: new Date(), updatedAt: new Date() },
        { id: 35, languageId: 2, key: 'about_mission', value: 'Sứ mệnh của chúng tôi', createdAt: new Date(), updatedAt: new Date() },
        { id: 36, languageId: 2, key: 'about_mission_text', value: 'Cung cấp nền giáo dục chất lượng cao, dễ tiếp cận cho người học trên toàn thế giới thông qua công nghệ tiên tiến và hướng dẫn chuyên môn.', createdAt: new Date(), updatedAt: new Date() },
        { id: 37, languageId: 2, key: 'about_vision', value: 'Tầm nhìn của chúng tôi', createdAt: new Date(), updatedAt: new Date() },
        { id: 38, languageId: 2, key: 'about_vision_text', value: 'Trở thành nền tảng giáo dục trực tuyến hàng đầu toàn cầu, trao quyền cho hàng triệu người học đạt được mục tiêu của họ.', createdAt: new Date(), updatedAt: new Date() },
        { id: 39, languageId: 2, key: 'about_values', value: 'Giá trị cốt lõi', createdAt: new Date(), updatedAt: new Date() },
        { id: 40, languageId: 2, key: 'about_quality', value: 'Chất lượng giáo dục', createdAt: new Date(), updatedAt: new Date() },
        { id: 41, languageId: 2, key: 'about_innovation', value: 'Đổi mới', createdAt: new Date(), updatedAt: new Date() },
        { id: 42, languageId: 2, key: 'about_accessibility', value: 'Khả năng tiếp cận', createdAt: new Date(), updatedAt: new Date() },
        { id: 43, languageId: 2, key: 'home_hero_title', value: 'Thay Đổi Tương Lai Của Bạn Với Học Trực Tuyến', createdAt: new Date(), updatedAt: new Date() },
        { id: 44, languageId: 2, key: 'home_hero_subtitle', value: 'Tiếp cận nền giáo dục đẳng cấp thế giới từ mọi nơi. Học từ các giảng viên chuyên môn và nhận chứng chỉ được công nhận.', createdAt: new Date(), updatedAt: new Date() },
        { id: 45, languageId: 2, key: 'home_get_started', value: 'Bắt Đầu Ngay', createdAt: new Date(), updatedAt: new Date() },
        { id: 46, languageId: 2, key: 'home_view_courses', value: 'Xem Khóa Học', createdAt: new Date(), updatedAt: new Date() },
        { id: 47, languageId: 2, key: 'home_featured_courses', value: 'Khóa Học Nổi Bật', createdAt: new Date(), updatedAt: new Date() },
        { id: 48, languageId: 2, key: 'home_featured_courses_subtitle', value: 'Khám phá các khóa học phổ biến nhất và bắt đầu hành trình học tập của bạn ngay hôm nay', createdAt: new Date(), updatedAt: new Date() },
        { id: 49, languageId: 2, key: 'home_top_teachers', value: 'Giảng Viên Chuyên Môn', createdAt: new Date(), updatedAt: new Date() },
        { id: 50, languageId: 2, key: 'home_top_teachers_subtitle', value: 'Học từ các chuyên gia trong ngành với nhiều năm kinh nghiệm', createdAt: new Date(), updatedAt: new Date() },
        { id: 51, languageId: 2, key: 'home_certificates', value: 'Chứng Chỉ Chuyên Nghiệp', createdAt: new Date(), updatedAt: new Date() },
        { id: 52, languageId: 2, key: 'home_certificates_subtitle', value: 'Nhận chứng chỉ được công nhận để thăng tiến trong sự nghiệp', createdAt: new Date(), updatedAt: new Date() },
        { id: 53, languageId: 2, key: 'home_stats_students', value: 'Học Viên Đang Học', createdAt: new Date(), updatedAt: new Date() },
        { id: 54, languageId: 2, key: 'home_stats_courses', value: 'Khóa Học Có Sẵn', createdAt: new Date(), updatedAt: new Date() },
        { id: 55, languageId: 2, key: 'home_stats_teachers', value: 'Giảng Viên Chuyên Môn', createdAt: new Date(), updatedAt: new Date() },
        { id: 56, languageId: 2, key: 'home_stats_certificates', value: 'Chứng Chỉ', createdAt: new Date(), updatedAt: new Date() },

        // English translations for courses page
        { id: 55, languageId: 1, key: 'courses_title', value: 'Explore Our Courses', createdAt: new Date(), updatedAt: new Date() },
        { id: 56, languageId: 1, key: 'courses_subtitle', value: 'Discover a wide range of courses to enhance your skills', createdAt: new Date(), updatedAt: new Date() },
        { id: 57, languageId: 1, key: 'courses_free', value: 'Free', createdAt: new Date(), updatedAt: new Date() },
        { id: 58, languageId: 1, key: 'courses_register', value: 'Register Now', createdAt: new Date(), updatedAt: new Date() },
        { id: 59, languageId: 1, key: 'courses_duration', value: 'Duration', createdAt: new Date(), updatedAt: new Date() },
        { id: 60, languageId: 1, key: 'courses_level', value: 'Level', createdAt: new Date(), updatedAt: new Date() },
        { id: 61, languageId: 1, key: 'courses_category', value: 'Category', createdAt: new Date(), updatedAt: new Date() },
        { id: 62, languageId: 1, key: 'courses_search', value: 'Search courses...', createdAt: new Date(), updatedAt: new Date() },
        { id: 63, languageId: 1, key: 'courses_filter', value: 'Filter', createdAt: new Date(), updatedAt: new Date() },
        { id: 64, languageId: 1, key: 'courses_beginner', value: 'Beginner', createdAt: new Date(), updatedAt: new Date() },
        { id: 65, languageId: 1, key: 'courses_intermediate', value: 'Intermediate', createdAt: new Date(), updatedAt: new Date() },
        { id: 66, languageId: 1, key: 'courses_advanced', value: 'Advanced', createdAt: new Date(), updatedAt: new Date() },

        // Vietnamese translations for courses page
        { id: 67, languageId: 2, key: 'courses_title', value: 'Khám Phá Khóa Học', createdAt: new Date(), updatedAt: new Date() },
        { id: 68, languageId: 2, key: 'courses_subtitle', value: 'Khám phá nhiều khóa học để nâng cao kỹ năng của bạn', createdAt: new Date(), updatedAt: new Date() },
        { id: 69, languageId: 2, key: 'courses_free', value: 'Miễn phí', createdAt: new Date(), updatedAt: new Date() },
        { id: 70, languageId: 2, key: 'courses_register', value: 'Đăng Ký Ngay', createdAt: new Date(), updatedAt: new Date() },
        { id: 71, languageId: 2, key: 'courses_duration', value: 'Thời lượng', createdAt: new Date(), updatedAt: new Date() },
        { id: 72, languageId: 2, key: 'courses_level', value: 'Cấp độ', createdAt: new Date(), updatedAt: new Date() },
        { id: 73, languageId: 2, key: 'courses_category', value: 'Danh mục', createdAt: new Date(), updatedAt: new Date() },
        { id: 74, languageId: 2, key: 'courses_search', value: 'Tìm kiếm khóa học...', createdAt: new Date(), updatedAt: new Date() },
        { id: 75, languageId: 2, key: 'courses_filter', value: 'Lọc', createdAt: new Date(), updatedAt: new Date() },
        { id: 76, languageId: 2, key: 'courses_beginner', value: 'Cơ bản', createdAt: new Date(), updatedAt: new Date() },
        { id: 77, languageId: 2, key: 'courses_intermediate', value: 'Trung cấp', createdAt: new Date(), updatedAt: new Date() },
        { id: 78, languageId: 2, key: 'courses_advanced', value: 'Nâng cao', createdAt: new Date(), updatedAt: new Date() },

        // English translations for user profile
        { id: 79, languageId: 1, key: 'profile', value: 'Profile', createdAt: new Date(), updatedAt: new Date() },
        { id: 80, languageId: 1, key: 'my_courses', value: 'My Courses', createdAt: new Date(), updatedAt: new Date() },
        { id: 81, languageId: 1, key: 'logout', value: 'Logout', createdAt: new Date(), updatedAt: new Date() },

        // Vietnamese translations for user profile
        { id: 82, languageId: 2, key: 'profile', value: 'Hồ sơ', createdAt: new Date(), updatedAt: new Date() },
        { id: 83, languageId: 2, key: 'my_courses', value: 'Khóa học của tôi', createdAt: new Date(), updatedAt: new Date() },
        { id: 84, languageId: 2, key: 'logout', value: 'Đăng xuất', createdAt: new Date(), updatedAt: new Date() },

        // English translations for auth pages
        { id: 85, languageId: 1, key: 'login_title', value: 'Welcome Back', createdAt: new Date(), updatedAt: new Date() },
        { id: 86, languageId: 1, key: 'login_subtitle', value: 'Sign in to continue your learning journey', createdAt: new Date(), updatedAt: new Date() },
        { id: 87, languageId: 1, key: 'email', value: 'Email or UserName', createdAt: new Date(), updatedAt: new Date() },
        { id: 88, languageId: 1, key: 'password', value: 'Password', createdAt: new Date(), updatedAt: new Date() },
        { id: 89, languageId: 1, key: 'remember_me', value: 'Remember me', createdAt: new Date(), updatedAt: new Date() },
        { id: 90, languageId: 1, key: 'forgot_password', value: 'Forgot password?', createdAt: new Date(), updatedAt: new Date() },
        { id: 91, languageId: 1, key: 'sign_in', value: 'Sign In', createdAt: new Date(), updatedAt: new Date() },
        { id: 92, languageId: 1, key: 'or', value: 'or', createdAt: new Date(), updatedAt: new Date() },
        { id: 93, languageId: 1, key: 'continue_with_google', value: 'Continue with Google', createdAt: new Date(), updatedAt: new Date() },
        { id: 94, languageId: 1, key: 'continue_with_facebook', value: 'Continue with Facebook', createdAt: new Date(), updatedAt: new Date() },
        { id: 95, languageId: 1, key: 'dont_have_account', value: 'Don\'t have an account?', createdAt: new Date(), updatedAt: new Date() },
        { id: 96, languageId: 1, key: 'signup_title', value: 'Create Account', createdAt: new Date(), updatedAt: new Date() },
        { id: 97, languageId: 1, key: 'signup_subtitle', value: 'Join our learning community today', createdAt: new Date(), updatedAt: new Date() },
        { id: 98, languageId: 1, key: 'full_name', value: 'Full Name', createdAt: new Date(), updatedAt: new Date() },
        { id: 99, languageId: 1, key: 'confirm_password', value: 'Confirm Password', createdAt: new Date(), updatedAt: new Date() },
        { id: 100, languageId: 1, key: 'agree_terms', value: 'I agree to the Terms and Conditions', createdAt: new Date(), updatedAt: new Date() },
        { id: 101, languageId: 1, key: 'create_account', value: 'Create Account', createdAt: new Date(), updatedAt: new Date() },
        { id: 102, languageId: 1, key: 'already_have_account', value: 'Already have an account?', createdAt: new Date(), updatedAt: new Date() },

        // Vietnamese translations for auth pages
        { id: 102, languageId: 2, key: 'login_title', value: 'Chào Mừng Trở Lại', createdAt: new Date(), updatedAt: new Date() },
        { id: 103, languageId: 2, key: 'login_subtitle', value: 'Đăng nhập để tiếp tục hành trình học tập của bạn', createdAt: new Date(), updatedAt: new Date() },
        { id: 104, languageId: 2, key: 'email', value: 'Email Hoặc Tên Tài Khoản', createdAt: new Date(), updatedAt: new Date() },
        { id: 105, languageId: 2, key: 'password', value: 'Mật khẩu', createdAt: new Date(), updatedAt: new Date() },
        { id: 106, languageId: 2, key: 'remember_me', value: 'Ghi nhớ đăng nhập', createdAt: new Date(), updatedAt: new Date() },
        { id: 107, languageId: 2, key: 'forgot_password', value: 'Quên mật khẩu?', createdAt: new Date(), updatedAt: new Date() },
        { id: 108, languageId: 2, key: 'sign_in', value: 'Đăng Nhập', createdAt: new Date(), updatedAt: new Date() },
        { id: 109, languageId: 2, key: 'or', value: 'hoặc', createdAt: new Date(), updatedAt: new Date() },
        { id: 110, languageId: 2, key: 'continue_with_google', value: 'Tiếp tục với Google', createdAt: new Date(), updatedAt: new Date() },
        { id: 111, languageId: 2, key: 'continue_with_facebook', value: 'Tiếp tục với Facebook', createdAt: new Date(), updatedAt: new Date() },
        { id: 112, languageId: 2, key: 'dont_have_account', value: 'Chưa có tài khoản?', createdAt: new Date(), updatedAt: new Date() },
        { id: 113, languageId: 2, key: 'signup_title', value: 'Tạo Tài Khoản', createdAt: new Date(), updatedAt: new Date() },
        { id: 114, languageId: 2, key: 'signup_subtitle', value: 'Tham gia cộng đồng học tập của chúng tôi ngay hôm nay', createdAt: new Date(), updatedAt: new Date() },
        { id: 115, languageId: 2, key: 'full_name', value: 'Họ và tên', createdAt: new Date(), updatedAt: new Date() },
        { id: 116, languageId: 2, key: 'confirm_password', value: 'Xác nhận mật khẩu', createdAt: new Date(), updatedAt: new Date() },
        { id: 117, languageId: 2, key: 'agree_terms', value: 'Tôi đồng ý với Điều khoản và Điều kiện', createdAt: new Date(), updatedAt: new Date() },
        { id: 118, languageId: 2, key: 'create_account', value: 'Tạo Tài Khoản', createdAt: new Date(), updatedAt: new Date() },
        { id: 119, languageId: 2, key: 'already_have_account', value: 'Đã có tài khoản?', createdAt: new Date(), updatedAt: new Date() },

        // Course Detail Page
        { id: 120, key: 'course_description', value: 'Course Description', languageId: 1, createdAt: new Date(), updatedAt: new Date() },
        { id: 121, key: 'course_modules', value: 'Course Modules', languageId: 1, createdAt: new Date(), updatedAt: new Date() },
        { id: 122, key: 'course_schedule', value: 'Course Schedule', languageId: 1, createdAt: new Date(), updatedAt: new Date() },
        { id: 123, key: 'day', value: 'Day', languageId: 1, createdAt: new Date(), updatedAt: new Date() },
        { id: 124, key: 'time', value: 'Time', languageId: 1, createdAt: new Date(), updatedAt: new Date() },
        { id: 125, key: 'topic', value: 'Topic', languageId: 1, createdAt: new Date(), updatedAt: new Date() },
        { id: 126, key: 'language', value: 'Language', languageId: 1, createdAt: new Date(), updatedAt: new Date() },
        { id: 127, key: 'enroll_now', value: 'Enroll Now', languageId: 1, createdAt: new Date(), updatedAt: new Date() },

        // Vietnamese translations
        { id: 128, key: 'course_description', value: 'Mô tả khóa học', languageId: 2, createdAt: new Date(), updatedAt: new Date() },
        { id: 129, key: 'course_modules', value: 'Các bài học', languageId: 2, createdAt: new Date(), updatedAt: new Date() },
        { id: 130, key: 'course_schedule', value: 'Lịch học', languageId: 2, createdAt: new Date(), updatedAt: new Date() },
        { id: 131, key: 'day', value: 'Ngày', languageId: 2, createdAt: new Date(), updatedAt: new Date() },
        { id: 132, key: 'time', value: 'Thời gian', languageId: 2, createdAt: new Date(), updatedAt: new Date() },
        { id: 133, key: 'topic', value: 'Chủ đề', languageId: 2, createdAt: new Date(), updatedAt: new Date() },
        { id: 134, key: 'language', value: 'Ngôn ngữ', languageId: 2, createdAt: new Date(), updatedAt: new Date() },
        { id: 135, key: 'enroll_now', value: 'Đăng ký ngay', languageId: 2, createdAt: new Date(), updatedAt: new Date() }
    ];

    private currentLanguage = signal<Language>(this.getDefaultLanguage());
    private translationsSubject = new BehaviorSubject<{[key: string]: string}>({});

    constructor(private storageService: StorageService) {
        this.loadStoredLanguage();
        this.loadTranslations(this.currentLanguage().code);
    }

    private getSystemLanguage(): string | null {
        if (isPlatformBrowser(this.platformId)) {
            const browserLang = navigator.language.toLowerCase();
            // Check for exact matches first
            const exactMatch = this.languages.find(lang => 
                lang.code === browserLang || 
                lang.code === browserLang.split('-')[0]
            );
            if (exactMatch) {
                return exactMatch.code;
            }

            // Check for language matches without region
            const langMatch = this.languages.find(lang => 
                browserLang.startsWith(lang.code) || 
                browserLang.startsWith(lang.code + '-')
            );
            if (langMatch) {
                return langMatch.code;
            }
        }
        return null;
    }

    private getDefaultLanguage(): Language {
        // First try to get system language
        const systemLang = this.getSystemLanguage();
        if (systemLang) {
            const language = this.languages.find(lang => lang.code === systemLang);
            if (language) {
                return language;
            }
        }
        // Fallback to English or first available language
        return this.languages.find(lang => lang.code === 'en') || this.languages[0];
    }

    private loadStoredLanguage(): void {
        const storedLang = this.storageService.getItem(this.STORAGE_KEY);
        if (storedLang) {
            const language = this.languages.find(lang => lang.code === storedLang);
            if (language) {
                this.currentLanguage.set(language);
            }
        } else {
            // If no stored language, use system language
            const defaultLang = this.getDefaultLanguage();
            this.currentLanguage.set(defaultLang);
            // Store the default language
            this.storageService.setItem(this.STORAGE_KEY, defaultLang.code);
        }
    }

    private loadTranslations(languageCode: string): void {
        const language = this.languages.find(lang => lang.code === languageCode);
        if (!language) return;

        const translations = this.translations
            .filter(t => t.languageId === language.id)
            .reduce((acc, curr) => ({
                ...acc,
                [curr.key]: curr.value
            }), {});
        this.translationsSubject.next(translations);
    }

    getLanguages(): Observable<Language[]> {
        return of(this.languages.filter(lang => lang.isActive));
    }

    getCurrentLanguage(): Language {
        return this.currentLanguage();
    }

    getTranslations(): Observable<{[key: string]: string}> {
        return this.translationsSubject.asObservable();
    }

    setLanguage(languageCode: string): void {
        const language = this.languages.find(lang => lang.code === languageCode);
        if (!language) return;

        this.currentLanguage.set(language);
        this.storageService.setItem(this.STORAGE_KEY, languageCode);
        this.loadTranslations(languageCode);
    }

    translate(key: string): string {
        const translations = this.translationsSubject.value;
        return translations[key] || key;
    }
} 