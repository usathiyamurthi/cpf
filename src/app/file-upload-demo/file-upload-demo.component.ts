import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FileUploadComponent, IExtendedFieldConfig } from '../../lib/file-upload/file-upload.component';

@Component({
  selector: 'app-file-upload-demo',
  templateUrl: './file-upload-demo.component.html',
  styleUrls: ['./file-upload-demo.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FileUploadComponent]
})
export class FileUploadDemoComponent implements OnInit {
  // Form Group for reactive forms demo
  demoForm = new FormGroup({
    basicUpload: new FormControl<any[]>([]),
    singleFile: new FormControl<any[]>([]),
    multipleFiles: new FormControl<any[]>([]),
    restrictedTypes: new FormControl<any[]>([]),
    requiredFile: new FormControl<any[]>([], Validators.required),
    largeUpload: new FormControl<any[]>([]),
    readonlyUpload: new FormControl<any[]>([]),
    disabledUpload: new FormControl<any[]>([])
  });

  // Configuration objects for different use cases
  basicConfig: IExtendedFieldConfig = {
    label: 'Portfolio',
    required: false,
    editable: true,
    disabled: false,
    readonly: false,
    isLarge: false,
    multiselect: true,
    base64Encode: true,
    noteText: 'Upload your project concept note or PAD draft.'
  };

  singleFileConfig: IExtendedFieldConfig = {
    label: 'Single File Upload',
    required: false,
    editable: true,
    disabled: false,
    readonly: false,
    isLarge: false,
    multiselect: false, // Single file only
    base64Encode: true,
    noteText: 'Only one file can be uploaded at a time'
  };

  multipleFilesConfig: IExtendedFieldConfig = {
    label: 'Multiple Files Upload',
    required: false,
    editable: true,
    disabled: false,
    readonly: false,
    isLarge: false,
    multiselect: true,
    base64Encode: true,
    noteText: 'Upload multiple files at once'
  };

  restrictedTypesConfig: IExtendedFieldConfig = {
    label: 'Document Upload (PDF, Word only)',
    required: false,
    editable: true,
    disabled: false,
    readonly: false,
    isLarge: false,
    multiselect: true,
    base64Encode: true,
    noteText: 'Upload project documents. Only PDF and Word files are allowed.',
    extraProperties: {
      allowedfiletypes: ['.pdf', '.doc', '.docx']
    }
  };

  requiredFileConfig: IExtendedFieldConfig = {
    label: 'Required File Upload',
    required: true,
    showHelpIcon: true,
    helpContent: 'This field is required. Please upload at least one file.',
    editable: true,
    disabled: false,
    readonly: false,
    isLarge: false,
    multiselect: true,
    base64Encode: true,
    showError: false,
    errorText: 'Please upload at least one file',
    noteText: 'This is a required field'
  };

  largeUploadConfig: IExtendedFieldConfig = {
    label: 'Portfolio (Large Upload Area)',
    required: false,
    editable: true,
    disabled: false,
    readonly: false,
    isLarge: true, // Large upload area
    multiselect: true,
    base64Encode: true,
    noteText: 'Upload your project concept note or PAD draft with a larger drop zone.'
  };

  readonlyConfig: IExtendedFieldConfig = {
    label: 'Readonly Upload (View Only)',
    required: false,
    editable: false,
    disabled: false,
    readonly: true, // Readonly mode
    isLarge: false,
    multiselect: true,
    base64Encode: true,
    noteText: 'Files cannot be uploaded or modified in readonly mode'
  };

  disabledConfig: IExtendedFieldConfig = {
    label: 'Disabled Upload',
    required: false,
    editable: true,
    disabled: true, // Disabled state
    readonly: false,
    isLarge: false,
    multiselect: true,
    base64Encode: true,
    noteText: 'Upload is disabled'
  };

  warningConfig: IExtendedFieldConfig = {
    label: 'Upload with Warning',
    required: false,
    editable: true,
    disabled: false,
    readonly: false,
    isLarge: false,
    multiselect: true,
    base64Encode: true,
    showError: true,
    warning: true,
    errorText: 'Warning: File size should not exceed 5MB',
    noteText: 'Files will be validated after upload'
  };

  errorConfig: IExtendedFieldConfig = {
    label: 'Upload with Error',
    required: true,
    editable: true,
    disabled: false,
    readonly: false,
    isLarge: false,
    multiselect: true,
    base64Encode: true,
    showError: true,
    warning: false,
    errorText: 'Error: Invalid file format uploaded',
    noteText: 'Please correct the errors'
  };

  customWidthConfig: IExtendedFieldConfig = {
    label: 'Custom Width Upload (50%)',
    required: false,
    editable: true,
    disabled: false,
    readonly: false,
    isLarge: false,
    multiselect: true,
    base64Encode: true,
    controlWidth: '50%',
    noteText: 'Custom width control'
  };

  noEncodeConfig: IExtendedFieldConfig = {
    label: 'Upload without Base64 Encoding',
    required: false,
    editable: true,
    disabled: false,
    readonly: false,
    isLarge: false,
    multiselect: true,
    base64Encode: false, // Files will not be base64 encoded
    noteText: 'Files are stored as File objects instead of base64'
  };

  // Sample data for readonly demo
  preloadedFiles = [
    {
      name: 'sample-document.pdf',
      data: 'JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PC9UeXBl',
      type: 'pdf',
      icon: 'pdf'
    },
    {
      name: 'sample-image.jpg',
      data: '/9j/4AAQSkZJRgABAQEAYABgAAD',
      type: 'jpg',
      icon: 'jpg'
    }
  ];

  // Event handlers output logs
  eventLogs: string[] = [];

  ngOnInit(): void {
    // Preload files for readonly demo
    this.demoForm.patchValue({
      readonlyUpload: this.preloadedFiles
    });

    // Subscribe to form changes
    this.demoForm.valueChanges.subscribe(() => {
      this.logEvent('Form value changed');
    });
  }

  onFileChange(event: any, uploadType: string): void {
    this.logEvent(`${uploadType}: Files changed - ${event?.length || 0} file(s)`);
    console.log(`${uploadType} files:`, event);
  }

  onFileRemove(event: any, uploadType: string): void {
    this.logEvent(`${uploadType}: File removed - ${event?.name || 'Unknown'}`);
    console.log(`${uploadType} removed file:`, event);
  }

  validateRequiredFile(): void {
    const control = this.demoForm.get('requiredFile');
    if (control && (control.value === null || control.value.length === 0)) {
      this.requiredFileConfig = {
        ...this.requiredFileConfig,
        showError: true,
        errorText: 'Please upload at least one file'
      };
      this.logEvent('Validation failed: Required file not uploaded');
    } else {
      this.requiredFileConfig = {
        ...this.requiredFileConfig,
        showError: false
      };
      this.logEvent('Validation passed: Required file uploaded');
    }
  }

  clearLogs(): void {
    this.eventLogs = [];
  }

  private logEvent(message: string): void {
    const timestamp = new Date().toLocaleTimeString();
    this.eventLogs.unshift(`[${timestamp}] ${message}`);
    // Keep only last 20 logs
    if (this.eventLogs.length > 20) {
      this.eventLogs.pop();
    }
  }

  submitForm(): void {
    this.logEvent('Form submitted');
    console.log('Form values:', this.demoForm.value);
    alert('Form submitted! Check console for values.');
  }
}
