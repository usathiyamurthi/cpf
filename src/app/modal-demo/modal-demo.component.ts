import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalDialogService } from '../../lib/modals/modaldialog.service';

@Component({
  selector: 'app-modal-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-demo.component.html',
  styleUrls: ['./modal-demo.component.scss']
})
export class ModalDemoComponent {
  private currentModalRef?: BsModalRef;
  public lastAction: string = 'No action yet';

  constructor(private modalService: ModalDialogService) {}

  private setLastActionAsync(message: string): void {
    setTimeout(() => {
      this.lastAction = message;
    }, 0);
  }

  // Alert Danger Modal
  showAlertDanger(): void {
    this.currentModalRef = this.modalService.alertDanger({
      title: 'Danger Alert',
      msg: 'This is a <strong>danger</strong> alert message. Something went wrong!',
      details: 'Error Code: 500\nStack trace: Lorem ipsum dolor sit amet...',
      okLabel: 'Acknowledge',
      okCallback: () => {
        this.setLastActionAsync('Danger Alert: OK clicked');
        this.currentModalRef?.hide();
      },
      cancelCallback: () => {
        this.setLastActionAsync('Danger Alert: Closed');
      }
    });
  }

  // Alert Warning Modal
  showAlertWarning(): void {
    this.currentModalRef = this.modalService.alertWarning({
      title: 'Warning Alert',
      msg: 'This is a <strong>warning</strong> alert. Please be careful!',
      details: 'Warning details: This action may have consequences.',
      okLabel: 'Got it',
      okCallback: () => {
        this.setLastActionAsync('Warning Alert: OK clicked');
        this.currentModalRef?.hide();
      }
    });
  }

  // Simple Alert Modal
  showAlert(): void {
    this.currentModalRef = this.modalService.alert({
      title: 'Simple Alert',
      msg: 'This is a simple alert dialog with basic information.',
      okLabel: 'Close',
      okCallback: () => {
        this.setLastActionAsync('Simple Alert: Closed');
        this.currentModalRef?.hide();
      }
    });
  }

  // Information Modal
  showInfo(): void {
    this.currentModalRef = this.modalService.info({
      title: 'Information',
      msg: 'This is an <em>informational</em> modal with optional cancel button.',
      details: 'Additional information can be shown here...',
      okLabel: 'Confirm',
      cancelLabel: 'Cancel',
      okCallback: () => {
        this.setLastActionAsync('Info Modal: Confirmed');
        this.currentModalRef?.hide();
      },
      cancelCallback: () => {
        this.setLastActionAsync('Info Modal: Cancelled');
      }
    });
  }

  // Error Modal
  showError(): void {
    this.currentModalRef = this.modalService.error({
      title: 'Error Occurred',
      msg: 'An unexpected error has occurred. Please try again.',
      details: 'Error Details:\nHTTP 404 - Resource not found\nTimestamp: ' + new Date().toISOString(),
      okLabel: 'Retry',
      okCallback: () => {
        this.setLastActionAsync('Error Modal: Retry clicked');
        this.currentModalRef?.hide();
      }
    });
  }

  // Warning Modal
  showWarning(): void {
    this.currentModalRef = this.modalService.warning({
      title: 'Warning',
      msg: 'You are about to perform a potentially dangerous action.',
      details: 'This action cannot be undone. Please review carefully.',
      okLabel: 'Proceed',
      cancelLabel: 'Go Back',
      okCallback: () => {
        this.setLastActionAsync('Warning Modal: Proceeded');
        this.currentModalRef?.hide();
      },
      cancelCallback: () => {
        this.setLastActionAsync('Warning Modal: Went back');
      }
    });
  }

  // Loading Modal
  showLoading(): void {
    this.currentModalRef = this.modalService.loading(
      'Loading data, please wait...'
    );
    
    // Simulate async operation
    setTimeout(() => {
      this.currentModalRef?.hide();
      this.setLastActionAsync('Loading: Completed after 3 seconds');
    }, 3000);
  }

  // Confirm Modal (with icon)
  showConfirm(): void {
    this.currentModalRef = this.modalService.confirm(
      'Are you sure you want to delete this item?',
      () => {
        this.setLastActionAsync('Confirm Modal: Confirmed deletion');
        this.currentModalRef?.hide();
      },
      () => {
        this.setLastActionAsync('Confirm Modal: Cancelled deletion');
      },
      'Confirm Deletion',
      'Yes, Delete',
      'No, Keep it',
      'fa-trash' // icon class
    );
  }

  // Confirm Modal (without icon)
  showConfirmNoIcon(): void {
    this.currentModalRef = this.modalService.confirm(
      'Do you want to save the changes?',
      () => {
        this.setLastActionAsync('Confirm Modal: Changes saved');
        this.currentModalRef?.hide();
      },
      () => {
        this.setLastActionAsync('Confirm Modal: Changes discarded');
      },
      'Save Changes',
      'Save',
      'Discard'
    );
  }

  // Success Modal
  showSuccess(): void {
    this.currentModalRef = this.modalService.success(
      'Your operation completed successfully!',
      () => {
        this.setLastActionAsync('Success Modal: Confirmed');
        this.currentModalRef?.hide();
      },
      () => {
        this.setLastActionAsync('Success Modal: Cancelled');
      },
      'Success',
      'Continue',
      'Close',
      true // showCloseButton
    );
  }

  // Success Modal (without cancel)
  showSuccessSimple(): void {
    this.currentModalRef = this.modalService.success(
      'Data has been saved successfully!',
      () => {
        this.setLastActionAsync('Success Modal: Acknowledged');
        this.currentModalRef?.hide();
      },
      undefined,
      'Operation Successful',
      'OK',
      undefined,
      false // hide close button
    );
  }

  // Custom Template Example (placeholder)
  showCustomTemplate(): void {
    this.setLastActionAsync('Custom Template: Not implemented in this demo');
    alert('Custom template modal requires TemplateRef. See modalTemplate() method in service.');
  }

  // Custom Component Example (placeholder)
  showCustomComponent(): void {
    this.setLastActionAsync('Custom Component: Not implemented in this demo');
    alert('Custom component modal requires component class. See modalComponent() method in service.');
  }

  // Clear last action
  clearAction(): void {
    this.setLastActionAsync('No action yet');
  }
}
