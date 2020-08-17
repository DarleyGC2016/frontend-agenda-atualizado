import { Component, OnInit } from '@angular/core';
import { LiveService } from 'src/app/shared/service/live.service';
import { Live } from 'src/app/shared/model/live.model';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { LiveUpdateComponent } from '../live-update/live-update.component';

@Component({
  selector: 'app-live-list',
  templateUrl: './live-list.component.html',
  styleUrls: ['./live-list.component.css'],
})
export class LiveListComponent implements OnInit {
  livePrevious: Live[];
  liveNext: Live[];
  next: boolean = false;
  previous: boolean = false;
  tudo: boolean = false;
  lives: Live[];
  categoria: '';
  categorias: Live[];
  constructor(
    public liveService: LiveService,
    public sanitizer: DomSanitizer,
    public dialogo: MatDialog
  ) {}

  ngOnInit(): void {
    this.getLives();
    this.resultadoCategoria();
  }

  getLives() {
    this.liveService.getLiveWithFlag('previous').subscribe((data) => {
      this.livePrevious = data.content;

      console.log(this.livePrevious);
      console.log(data);
      this.livePrevious.forEach((live) => {
        live.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
          live.liveLink
        );
      });
      this.previous = true;
    });

    this.liveService.getLiveWithFlag('next').subscribe((data) => {
      this.liveNext = data.content;
      console.log(this.liveNext);
      this.liveNext.forEach((live) => {
        live.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
          live.liveLink
        );
      });
      this.next = true;
    });
  }

  resultadoCategoria() {
    LiveService.emitirCategoria.subscribe((name) => {
      this.categoria = name;
      this.liveService
        .getLiveWithCategoria(this.categoria)
        .subscribe((data) => {
          this.categorias = data;
          console.log(this.categorias);
          this.categorias.forEach((live) => {
            live.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
              live.liveLink
            );
          });
          this.tudo = true;
        });
    });
  }

  excluir(id: string) {
    this.liveService.deleteLive(id).subscribe((data) => console.log(data));
    window.location.reload();
  }

  update(live: Live) {
    let dateTime = live.liveDate.split('T');
    let date = dateTime[0];
    let time = dateTime[1];

    let dialogoRef = this.dialogo.open(LiveUpdateComponent, {
      data: {
        id: live.id,
        liveName: live.liveName,
        channelName: live.channelName,
        categoria: live.categoria,
        liveLink: live.liveLink,
        liveDate: date,
        liveTime: time,
      },
      minWidth: '400px',
    });

    dialogoRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
