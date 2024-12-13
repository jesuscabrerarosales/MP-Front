import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Output, EventEmitter } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { CloseBtnComponent } from '../close-btn/close-btn.component';

@Component({
  selector: 'upload-files',
  standalone: true,
  imports: [CloseBtnComponent, MatCardModule, MatDividerModule, MatListModule],
  templateUrl: './upload-files.component.html',
  styleUrl: './upload-files.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadFilesComponent {
  constructor(private cdRef: ChangeDetectorRef) {}

  @Input() imageUrls: string[] = [];
  @Output() onUploadFiles = new EventEmitter<FileList>();

  @Output() imageUrlsChange = new EventEmitter<string[]>();
  @Output() onFilesAndUrlsChange = new EventEmitter<{ files: File[], urls: string[] }>();

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.onUpload(files)
    this.onUploadFiles.emit(files);
  }

  files = signal<File[]>([]);
  imgModal = signal<boolean>(false);
  imgModalSrc = signal<string>("");

  getFilesAsBase64 = async (): Promise<string[]> => {
    const promises = this.files().map(file => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          let base64 = reader.result as string;

          if (base64.startsWith('data:image')) {
            base64 = base64.split(',')[1];
          }

          resolve(base64);
        };
        reader.onerror = error => {
          reject(error);
        };
        reader.readAsDataURL(file);
      });
    });

    const base64List = await Promise.all(promises);
    return base64List;
  }

  getFiles() {
    return this.files()
  }

  onUpload(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.update(l => [...l, files[i]]);
    }
    this.emitFilesAndUrls(); // Emitir ambos (archivos y URLs) al componente padre
  }

  getUrl(file: File) {
    return URL.createObjectURL(file)
  }

  deleteFile(file: File) {
    this.files.update(f => f.filter(f => f !== file));
    this.emitFilesAndUrls();
  }

  deleteImageUrl(url: string) {
    this.imageUrls = this.imageUrls.filter(imageUrl => imageUrl !== url);
    this.emitFilesAndUrls();
  }

  emitFilesAndUrls() {
    this.onFilesAndUrlsChange.emit({ files: this.files(), urls: this.imageUrls });
  }

  openImgModal(file: File){
    this.imgModalSrc.set(URL.createObjectURL(file))
    this.imgModal.set(true)
  }

  openImgModalUrl(url: string) {
    this.imgModalSrc.set(url);
    this.imgModal.set(true);
  }

  closeImgModal(){
    this.imgModal.set(false)
  }
}
