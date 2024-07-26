import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ThemeService {
  private defaultTheme = 'theme-0';
  private currentThemeSubject = new BehaviorSubject<string>(this.defaultTheme);
  public currentTheme$ = this.currentThemeSubject.asObservable();
  public currentUrl!: string;
  private clientThemes = [
    {
      client: 'client-0',
      theme: 'theme-0'
    },
    {
      client: 'client-1',
      theme: 'theme-1'
    },
    {
      client: 'client-2',
      theme: 'theme-2'
    },
    {
      client: 'client-3',
      theme: 'theme-3'
    }
  ];

  constructor(public router: Router) {}

  get theme(): string {
    return this.currentThemeSubject.value;
  }

  set theme(value: string) {
    this.currentThemeSubject.next(value);
  }

  init(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe({
      next: (event: NavigationEnd) => {
        this.currentUrl = event.urlAfterRedirects;
        this.applyTheme();
      },
      error: (e) => {
        console.error('Error subscribe ThemeService init : ', e);
        throw(e);
      }
    });
  }

  applyTheme(): void {
    this.clientThemes.forEach((elem)=>{
      if (this.currentUrl.includes(elem.client)) {
        this.theme = elem.theme;
      }
    });
  }
}
