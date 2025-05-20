import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { LanguageService } from '../../../core/services/language.service';

interface CourseSchedule {
  day: string;
  time: string;
  topic: string;
  instructor: string;
}

interface CourseModule {
  title: string;
  description: string;
  duration: string;
  videoUrl: string;
}

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <!-- Course Header -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div class="relative h-96">
          <img [src]="course?.image" [alt]="course?.title" class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div class="absolute bottom-0 left-0 p-6 text-white">
            <h1 class="text-3xl font-bold mb-2">{{ course?.title }}</h1>
            <div class="flex items-center space-x-4">
              <span class="flex items-center">
                <i class="fas fa-star text-yellow-400 mr-1"></i>
                {{ course?.rating }}
              </span>
              <span class="flex items-center">
                <i class="fas fa-users mr-1"></i>
                {{ course?.students }} students
              </span>
              <span class="flex items-center">
                <i class="fas fa-clock mr-1"></i>
                {{ course?.duration }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Course Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Course Description -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 class="text-2xl font-bold mb-4">{{ translate('course_description') }}</h2>
            <p class="text-gray-600 dark:text-gray-300">{{ course?.description }}</p>
          </div>

          <!-- Course Modules -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 class="text-2xl font-bold mb-4">{{ translate('course_modules') }}</h2>
            <div class="space-y-4">
              <div *ngFor="let module of course?.modules" class="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h3 class="text-xl font-semibold mb-2">{{ module.title }}</h3>
                <p class="text-gray-600 dark:text-gray-300 mb-2">{{ module.description }}</p>
                <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <i class="fas fa-clock mr-1"></i>
                  {{ module.duration }}
                </div>
              </div>
            </div>
          </div>

          <!-- Course Schedule -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 class="text-2xl font-bold mb-4">{{ translate('course_schedule') }}</h2>
            <div class="overflow-x-auto">
              <table class="min-w-full">
                <thead>
                  <tr class="bg-gray-100 dark:bg-gray-700">
                    <th class="px-4 py-2 text-left">{{ translate('day') }}</th>
                    <th class="px-4 py-2 text-left">{{ translate('time') }}</th>
                    <th class="px-4 py-2 text-left">{{ translate('topic') }}</th>
                    <th class="px-4 py-2 text-left">{{ translate('instructor') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let schedule of course?.schedule" class="border-b border-gray-200 dark:border-gray-700">
                    <td class="px-4 py-2">{{ schedule.day }}</td>
                    <td class="px-4 py-2">{{ schedule.time }}</td>
                    <td class="px-4 py-2">{{ schedule.topic }}</td>
                    <td class="px-4 py-2">{{ schedule.instructor }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-8">
          <!-- Course Info Card -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-gray-600 dark:text-gray-300">{{ translate('level') }}</span>
                <span class="font-semibold">{{ course?.level }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-600 dark:text-gray-300">{{ translate('category') }}</span>
                <span class="font-semibold">{{ course?.category }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-600 dark:text-gray-300">{{ translate('language') }}</span>
                <span class="font-semibold">{{ course?.language }}</span>
              </div>
            </div>

            <button class="w-full mt-6 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              {{ translate('enroll_now') }}
            </button>
          </div>

          <!-- Instructor Card -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 class="text-xl font-bold mb-4">{{ translate('instructor') }}</h3>
            <div class="flex items-center space-x-4">
              <img [src]="course?.instructor.avatar" [alt]="course?.instructor.name" 
                   class="w-16 h-16 rounded-full object-cover">
              <div>
                <h4 class="font-semibold">{{ course?.instructor.name }}</h4>
                <p class="text-sm text-gray-600 dark:text-gray-300">{{ course?.instructor.title }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CourseDetailComponent implements OnInit {
  course: any = null;

  constructor(
    private route: ActivatedRoute,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    // Get course ID from route params and load course data
    this.route.params.subscribe(params => {
      const courseId = params['id'];
      // TODO: Load course data from service
      // For now, using mock data
      this.course = {
        id: courseId,
        title: 'Web Development Bootcamp',
        description: 'Learn web development from scratch. This comprehensive course covers HTML, CSS, JavaScript, and modern frameworks.',
        image: 'assets/images/courses/web-dev.jpg',
        rating: 4.8,
        students: 1234,
        duration: '12 weeks',
        level: 'Beginner',
        category: 'Web Development',
        language: 'English',
        instructor: {
          name: 'John Doe',
          title: 'Senior Web Developer',
          avatar: 'assets/images/instructors/john-doe.jpg'
        },
        modules: [
          {
            title: 'Introduction to Web Development',
            description: 'Learn the basics of web development and set up your development environment.',
            duration: '2 hours',
            videoUrl: 'https://example.com/video1'
          },
          {
            title: 'HTML Fundamentals',
            description: 'Master HTML5 and learn how to structure web pages.',
            duration: '3 hours',
            videoUrl: 'https://example.com/video2'
          }
        ],
        schedule: [
          {
            day: 'Monday',
            time: '10:00 AM - 12:00 PM',
            topic: 'Introduction to Web Development',
            instructor: 'John Doe'
          },
          {
            day: 'Wednesday',
            time: '10:00 AM - 12:00 PM',
            topic: 'HTML Fundamentals',
            instructor: 'John Doe'
          }
        ]
      };
    });
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }
} 