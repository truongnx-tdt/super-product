import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';

interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  rating: number;
  students: number;
  image: string;
  isFree: boolean;
  price?: number;
}

@Component({
  selector: 'app-courses',
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header Section -->
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {{ translate('courses_title') }}
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300">
            {{ translate('courses_subtitle') }}
          </p>
        </div>

        <!-- Search and Filter Section -->
        <div class="mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div class="w-full md:w-96">
            <input
              type="text"
              [placeholder]="translate('courses_search')"
              class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
          </div>
          <div class="flex gap-4">
            <select class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
              <option value="">{{ translate('courses_level') }}</option>
              <option value="beginner">{{ translate('courses_beginner') }}</option>
              <option value="intermediate">{{ translate('courses_intermediate') }}</option>
              <option value="advanced">{{ translate('courses_advanced') }}</option>
            </select>
            <select class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
              <option value="">{{ translate('courses_category') }}</option>
              <option value="programming">Programming</option>
              <option value="design">Design</option>
              <option value="business">Business</option>
              <option value="marketing">Marketing</option>
            </select>
          </div>
        </div>

        <!-- Courses Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div *ngFor="let course of courses" 
               class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
               [routerLink]="['/courses', course.id]">
            <div class="relative">
              <img [src]="course.image" [alt]="course.title" class="w-full h-48 object-cover">
              @if (course.isFree) {
                <span class="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {{ translate('courses_free') }}
                </span>
              }
            </div>
            <div class="p-6">
              <div class="flex items-center justify-between mb-4">
                <span class="text-sm text-blue-600 dark:text-blue-400">{{ course.category }}</span>
                <span class="text-sm text-gray-600 dark:text-gray-300">{{ course.level }}</span>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">{{ course.title }}</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">{{ course.description }}</p>
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center">
                  <span class="text-yellow-400">★</span>
                  <span class="ml-1 text-gray-600 dark:text-gray-300">{{ course.rating }}</span>
                </div>
                <span class="text-gray-600 dark:text-gray-300">{{ course.students }} students</span>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center text-gray-600 dark:text-gray-300">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ course.duration }}
                </div>
                <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  {{ translate('courses_register') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CoursesComponent {
  constructor(private languageService: LanguageService) {}

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  courses: Course[] = [
    {
      id: 1,
      title: 'Introduction to Web Development',
      description: 'Learn the basics of HTML, CSS, and JavaScript to build modern websites.',
      instructor: 'John Smith',
      duration: '8 weeks',
      level: 'beginner',
      category: 'Programming',
      rating: 4.8,
      students: 1200,
      image: 'assets/images/courses/web-dev.jpg',
      isFree: true
    },
    {
      id: 2,
      title: 'Advanced Data Science',
      description: 'Master data analysis, machine learning, and statistical methods.',
      instructor: 'Sarah Johnson',
      duration: '12 weeks',
      level: 'advanced',
      category: 'Data Science',
      rating: 4.9,
      students: 850,
      image: 'assets/images/courses/data-science.jpg',
      isFree: false,
      price: 99
    },
    {
      id: 3,
      title: 'UI/UX Design Fundamentals',
      description: 'Learn essential design principles and create beautiful user interfaces.',
      instructor: 'Emily Davis',
      duration: '6 weeks',
      level: 'intermediate',
      category: 'Design',
      rating: 4.7,
      students: 1500,
      image: 'assets/images/courses/design.jpg',
      isFree: true
    },
    {
      id: 4,
      title: 'Digital Marketing Strategy',
      description: 'Develop effective marketing strategies for the digital age.',
      instructor: 'Michael Brown',
      duration: '10 weeks',
      level: 'intermediate',
      category: 'Marketing',
      rating: 4.6,
      students: 980,
      image: 'assets/images/courses/marketing.jpg',
      isFree: false,
      price: 79
    },
    {
      id: 5,
      title: 'Python for Beginners',
      description: 'Start your programming journey with Python.',
      instructor: 'David Wilson',
      duration: '6 weeks',
      level: 'beginner',
      category: 'Programming',
      rating: 4.8,
      students: 2000,
      image: 'assets/images/courses/python.jpg',
      isFree: true
    },
    {
      id: 6,
      title: 'Business Analytics',
      description: 'Learn to analyze business data and make data-driven decisions.',
      instructor: 'Lisa Anderson',
      duration: '8 weeks',
      level: 'intermediate',
      category: 'Business',
      rating: 4.7,
      students: 750,
      image: 'assets/images/courses/business.jpg',
      isFree: false,
      price: 89
    }
  ];
} 