import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AlertService } from '../../services/alert/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: [ './alert.component.scss' ]
})
export class AlertComponent implements OnInit, OnDestroy {

  private subscription!: Subscription;
  message: any;


  constructor(public toastController: ToastController, private _alertService: AlertService) { }

  ngOnInit(): void {
    this.subscription = this._alertService.getAlert()
      .subscribe(async (message: { type: any; cssClass: string; }) => {
        switch (message && message.type) {
          case 'success':
            message.cssClass = 'alert alert-success';
            break;
          case 'error':
            const toast = await this.toastController.create({
              header: 'Alert',
              message: 'Username or password is incorrect',
              position: 'top',
              duration: 3000,
              color: "warning",
            });
            toast.present();

          // message.cssClass = 'alert alert-danger';
            break;
        }

        this.message = message;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
