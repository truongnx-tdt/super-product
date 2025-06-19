
import { Inject, inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { LanguageService } from "./language.service";
import { DOCUMENT, isPlatformBrowser } from "@angular/common";

@Injectable({
    providedIn: 'root'
})
export class HeadService {
    private titleService = inject(Title);
    private metaService = inject(Meta);
    private languageService = inject(LanguageService);

    private linkElement: HTMLLinkElement | null = null; // Initialize as null
    private isBrowser: boolean;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) platformId: Object // Inject PLATFORM_ID
    ) {
        this.isBrowser = isPlatformBrowser(platformId); // Check platform

        if (this.isBrowser) {
            this.linkElement = this.document.querySelector('link[rel="icon"]') as HTMLLinkElement;
        }
    }

    setFavicon(faviconUrl: string): void {
        if (this.isBrowser && this.linkElement) { // Only manipulate in the browser
            this.linkElement.href = faviconUrl;
        }
    }

    setTitle(title: string) {
        this.titleService.setTitle(this.languageService.translate(title));
        return this;
    }

    setDescription(description: string) {
        this.metaService.updateTag({ name: 'description', content: this.languageService.translate(description) });
        return this;
    }

    setTitleAndDescription(title: string, description: string, iconPath?: string) {
        this.setTitle(title);
        this.setDescription(description);
        if (iconPath) {
            this.setFavicon(iconPath)
        }
        return this;
    }
}
