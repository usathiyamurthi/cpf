import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { Subscription } from 'rxjs';
import { CpfModalDialogModule } from '../lib/cpf-modaldialog.module';
import { Base } from './features/components/base/base';
import { DiagnosticService, SpiDiagnosticsModule } from '@spi/diagnostics';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CpfModalDialogModule, Base, SpiDiagnosticsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
    // Inject the service to access raw data for building HistogramData
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  // Separate signals for different component data types
  protected readonly selectedIso3 = signal<string | null>(null);

  // Signal to track histogram panel state
  protected readonly isHistogramPanelOpen = signal<boolean>(false);

  // Signal to track histogram button top position - static viewport position
  protected readonly histogramButtonTop = signal<string>('50vh');

  // Signal to track if histogram button should be visible (only after scrolling past landing page)
  protected readonly showHistogramButton = signal<boolean>(false);

  // Signal to track current route URL (reactive to navigation)
  private readonly currentUrl = signal<string>(this.router.url);

  // Computed signal to check if we're on a route that should show the landing page
  protected readonly showLandingPage = computed(() => {
    const url = this.currentUrl();
    return url === '/' || url === '/compass' || url.startsWith('/compass');
  });

  // Store bound function references for cleanup
  private checkScrollPositionBound = () => this.checkScrollPosition();
  private routerSubscription?: Subscription;

  // MSAL services
  private readonly msalService = inject(MsalService);

  // Auth state signals for simple UI bindings
  protected readonly isAuthenticated = signal<boolean>(false);
  protected readonly signedInUsername = signal<string | null>(null);

  constructor(private diagnosticService: DiagnosticService) {}

  protected login(): void {
    this.msalService.loginRedirect();
  }

  protected logout(): void {
    this.msalService.logoutRedirect();
  }

  ngAfterViewInit(): void {
    // Position histogram button statically at fixed viewport position
    // Set to approximately 50% of viewport height - static, doesn't update on scroll
    this.histogramButtonTop.set('50vh');
    // Check initial scroll position and set up scroll listener
    this.checkScrollPosition();
    window.addEventListener('scroll', this.checkScrollPositionBound, { passive: true });
  }
  ngOnDestroy(): void {
    // Clean up scroll listener
    window.removeEventListener('scroll', this.checkScrollPositionBound);
    // Clean up router subscription
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
  /**
   * Check scroll position to determine if histogram button should be visible
   * Only show button when user has scrolled past the landing page (thermometer section)
   * and into the dashboard section (heatmap/globe/summary area)
   * Hide button once user scrolls past the country-outcomes component or reaches country-table
   */
  private checkScrollPosition(): void {
    const dashboardContainer = document.querySelector('.dashboard-container');
    const thermometersSection = document.querySelector('.thermometers-section');
    const countryOutcomesComponent = document.querySelector('app-country-outcomes');
    const countryTableComponent = document.querySelector('app-country-table');

    if (dashboardContainer && thermometersSection) {
      const dashboardRect = dashboardContainer.getBoundingClientRect();
      const thermometersRect = thermometersSection.getBoundingClientRect();

      // Check if we've scrolled past the country-outcomes component
      let isPastCountryOutcomes = false;
      if (countryOutcomesComponent) {
        const outcomesRect = countryOutcomesComponent.getBoundingClientRect();
        // If country-outcomes component is above the viewport top, we've scrolled past it
        isPastCountryOutcomes = outcomesRect.bottom < 0;
      }
      // Also check if country-table component is visible or we're past it
      // This handles cases where country-outcomes might not exist
      let isAtOrPastCountryTable = false;
      if (countryTableComponent) {
        const tableRect = countryTableComponent.getBoundingClientRect();
        // If country-table is visible or we've scrolled past it, hide the button
        isAtOrPastCountryTable = tableRect.top < window.innerHeight;
      }
      // Show button if dashboard is visible and thermometers section is above viewport
      // This means user has scrolled past the landing page
      // BUT hide it if we've scrolled past the country-outcomes component or reached country-table
      const isDashboardVisible = dashboardRect.top < window.innerHeight && dashboardRect.bottom > 0;
      const isPastLandingPage = thermometersRect.bottom < window.innerHeight;

      const shouldShow = isDashboardVisible && isPastLandingPage && !isPastCountryOutcomes && !isAtOrPastCountryTable;

      this.showHistogramButton.set(shouldShow);
    } else {
      // Fallback: hide button if we can't determine position
      this.showHistogramButton.set(false);
    }
  }
  /**
   * Toggle the Histogram panel
   */
  protected toggleHistogramPanel(): void {
    const newState = !this.isHistogramPanelOpen();
    this.isHistogramPanelOpen.set(newState);
  }

}
