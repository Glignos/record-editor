import { Component, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild, OnInit, OnDestroy } from '@angular/core';

import { ModalDirective } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { SavePreviewModalService, RecordApiService, DomUtilsService } from '../../core/services';
import { SavePreviewModalOptions } from '../../shared/interfaces';
import { SubscriberComponent, ApiError } from '../../shared/classes';
import { HOVER_TO_DISMISS_INDEFINITE_TOAST } from '../../shared/constants';

@Component({
  selector: 're-save-preview-modal',
  templateUrl: './save-preview-modal.component.html',
  styleUrls: ['./save-preview-modal.component.scss']
})
export class SavePreviewModalComponent extends SubscriberComponent implements OnInit, OnDestroy {

  @ViewChild('modal') modal: ModalDirective;
  private options: SavePreviewModalOptions;
  private previewHtml: string;

  constructor(private toastrService: ToastrService,
    private recordPreviewModalService: SavePreviewModalService,
    private apiService: RecordApiService,
    private changeDetectorRef: ChangeDetectorRef,
    private domUtilsService: DomUtilsService) {
    super();
  }

  ngOnInit() {
    this.recordPreviewModalService.onPreview
      .do(options => {
        this.options = options;
      })
      .switchMap(options => this.apiService.preview(options.record))
      .takeUntil(this.isDestroyed)
      .subscribe(previewHtml => {
        this.previewHtml = previewHtml;
        this.modal.show();
      });
  }

  onShown() {
    this.domUtilsService
      .writeContentIntoIFrameById(this.previewHtml, 're-preview-iframe');
  }

  onConfirm() {
    this.apiService.saveRecord(this.options.record)
      .subscribe(() => this.onSaveSuccess(), error => this.onSaveError(error));
  }

  private onSaveSuccess() {
    this.domUtilsService.unregisterBeforeUnloadPrompt();
    this.modal.hide();
    if (this.options.onConfirm) {
      this.options.onConfirm();
    }
  }

  private onSaveError(error: ApiError) {
    if (error.message) {
      this.toastrService.error(error.message, 'Error', HOVER_TO_DISMISS_INDEFINITE_TOAST);
    } else {
      this.toastrService.error('Could not save the record', 'Error');
    }

    this.modal.hide();
  }

  onCancel() {
    this.modal.hide();
    if (this.options.onCancel) {
      this.options.onCancel();
    }
  }
}
