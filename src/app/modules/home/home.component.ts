import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';

interface Course {
  id: number;
  title: string;
  instructor: string;
  rating: number;
  students: number;
  image: string;
  category: string;
}

interface Teacher {
  id: number;
  name: string;
  specialization: string;
  rating: number;
  students: number;
  image: string;
}

interface Certificate {
  id: number;
  title: string;
  description: string;
  image: string;
  duration: string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
      <!-- Hero Section -->
      <section class="relative bg-blue-600 dark:bg-blue-900 text-white py-20">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="max-w-3xl mx-auto text-center">
            <h1 class="text-4xl md:text-5xl font-bold mb-6">
              {{ translate('home_hero_title') }}
            </h1>
            <p class="text-xl mb-8 text-blue-100">
              {{ translate('home_hero_subtitle') }}
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button class="px-8 py-3 bg-white text-blue-600 rounded-full font-medium hover:bg-blue-50 transition-colors">
                {{ translate('home_get_started') }}
              </button>
              <button class="px-8 py-3 border-2 border-white rounded-full font-medium hover:bg-blue-700 transition-colors">
                {{ translate('home_view_courses') }}
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Featured Courses Section -->
      <section class="py-16 px-4 sm:px-6 lg:px-8">
        <div class="container mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {{ translate('home_featured_courses') }}
            </h2>
            <p class="text-gray-600 dark:text-gray-300">
              {{ translate('home_featured_courses_subtitle') }}
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            @for (course of featuredCourses; track course.id) {
              <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <img [src]="course.image" [alt]="course.title" class="w-full h-48 object-cover">
                <div class="p-6">
                  <span class="text-sm text-blue-600 dark:text-blue-400">{{ course.category }}</span>
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white mt-2 mb-2">{{ course.title }}</h3>
                  <p class="text-gray-600 dark:text-gray-300 mb-4">{{ course.instructor }}</p>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center">
                      <span class="text-yellow-400">★</span>
                      <span class="ml-1 text-gray-600 dark:text-gray-300">{{ course.rating }}</span>
                    </div>
                    <span class="text-gray-600 dark:text-gray-300">{{ course.students }} students</span>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Top Teachers Section -->
      <section class="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-800">
        <div class="container mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {{ translate('home_top_teachers') }}
            </h2>
            <p class="text-gray-600 dark:text-gray-300">
              {{ translate('home_top_teachers_subtitle') }}
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            @for (teacher of topTeachers; track teacher.id) {
              <div class="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 text-center">
                <img [src]="teacher.image" [alt]="teacher.name" class="w-32 h-32 rounded-full mx-auto mb-4 object-cover">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">{{ teacher.name }}</h3>
                <p class="text-gray-600 dark:text-gray-300 mb-4">{{ teacher.specialization }}</p>
                <div class="flex items-center justify-center gap-4">
                  <div class="flex items-center">
                    <span class="text-yellow-400">★</span>
                    <span class="ml-1 text-gray-600 dark:text-gray-300">{{ teacher.rating }}</span>
                  </div>
                  <span class="text-gray-600 dark:text-gray-300">{{ teacher.students }} students</span>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Certificates Section -->
      <section class="py-16 px-4 sm:px-6 lg:px-8">
        <div class="container mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {{ translate('home_certificates') }}
            </h2>
            <p class="text-gray-600 dark:text-gray-300">
              {{ translate('home_certificates_subtitle') }}
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            @for (cert of certificates; track cert.id) {
              <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <img [src]="cert.image" [alt]="cert.title" class="w-full h-48 object-cover">
                <div class="p-6">
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">{{ cert.title }}</h3>
                  <p class="text-gray-600 dark:text-gray-300 mb-4">{{ cert.description }}</p>
                  <div class="flex items-center text-gray-600 dark:text-gray-300">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {{ cert.duration }}
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Stats Section -->
      <section class="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600 dark:bg-blue-900 text-white">
        <div class="container mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div class="text-4xl font-bold mb-2">10K+</div>
              <div class="text-blue-100">{{ translate('home_stats_students') }}</div>
            </div>
            <div>
              <div class="text-4xl font-bold mb-2">500+</div>
              <div class="text-blue-100">{{ translate('home_stats_courses') }}</div>
            </div>
            <div>
              <div class="text-4xl font-bold mb-2">100+</div>
              <div class="text-blue-100">{{ translate('home_stats_teachers') }}</div>
            </div>
            <div>
              <div class="text-4xl font-bold mb-2">50+</div>
              <div class="text-blue-100">{{ translate('home_stats_certificates') }}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class HomeComponent {
  constructor(private languageService: LanguageService) {}

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  featuredCourses: Course[] = [
    {
      id: 1,
      title: 'Web Development Bootcamp',
      instructor: 'John Smith',
      rating: 4.8,
      students: 1200,
      image: 'assets/images/courses/web-dev.jpg',
      category: 'Programming'
    },
    {
      id: 2,
      title: 'Data Science Fundamentals',
      instructor: 'Sarah Johnson',
      rating: 4.9,
      students: 850,
      image: 'assets/images/courses/data-science.jpg',
      category: 'Data Science'
    },
    {
      id: 3,
      title: 'Digital Marketing Masterclass',
      instructor: 'Michael Brown',
      rating: 4.7,
      students: 1500,
      image: 'assets/images/courses/digital-marketing.jpg',
      category: 'Marketing'
    }
  ];

  topTeachers: Teacher[] = [
    {
      id: 1,
      name: 'John Smith',
      specialization: 'Web Development',
      rating: 4.9,
      students: 5000,
      image: 'assets/images/teachers/teacher1.jpg'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      specialization: 'Data Science',
      rating: 4.8,
      students: 3500,
      image: 'assets/images/teachers/teacher2.jpg'
    },
    {
      id: 3,
      name: 'Michael Brown',
      specialization: 'Digital Marketing',
      rating: 4.7,
      students: 4200,
      image: 'assets/images/teachers/teacher3.jpg'
    },
    {
      id: 4,
      name: 'Emily Davis',
      specialization: 'UI/UX Design',
      rating: 4.9,
      students: 3800,
      image: 'assets/images/teachers/teacher4.jpg'
    }
  ];

  certificates: Certificate[] = [
    {
      id: 1,
      title: 'Full Stack Development',
      description: 'Comprehensive certification covering front-end and back-end development',
      image: 'assets/images/certificates/fullstack.jpg',
      duration: '6 months'
    },
    {
      id: 2,
      title: 'Data Science Professional',
      description: 'Advanced data analysis and machine learning certification',
      image: 'assets/images/certificates/data-science.jpg',
      duration: '8 months'
    },
    {
      id: 3,
      title: 'Digital Marketing Expert',
      description: 'Complete digital marketing strategy and implementation certification',
      image: 'assets/images/certificates/digital-marketing.jpg',
      duration: '4 months'
    }
  ];
}
