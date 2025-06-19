import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService } from './notification.service';
import { Notification, NotificationType } from './notification';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-notification',
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {

  notifications: Notification[] = [];
  private _subscription: Subscription | undefined;
  protected _notificationSvc = inject(NotificationService);
  private _translate = inject(LanguageService);

  private _addNotification(notification: Notification) {
    this.notifications.push(notification);

    if (notification.timeout !== 0) {
      setTimeout(() => this.close(notification), notification.timeout);
    }
  }

  ngOnInit() {
    this._subscription = this._notificationSvc.getObservable().subscribe(notification => this._addNotification(notification));
  }

  ngOnDestroy() {
    this._subscription?.unsubscribe();
  }

  close(notification: Notification) {
    this.notifications = this.notifications.filter(notif => notif.id !== notification.id);
  }


  className(notification: Notification): string {

    let style: string;

    switch (notification.type) {

      case NotificationType.success:
        style = 'bg-green-600';
        break;

      case NotificationType.warning:
        style = 'bg-yellow-500 text-black';
        break;

      case NotificationType.error:
        style = 'bg-red-600';
        break;

      default:
        style = 'bg-blue-500';
        break;
    }

    return style;
  }

  TranslateKey(key: string): string {
    return this._translate.translate(key);
  }
}
