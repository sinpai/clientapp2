import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from "../../models/Client";
import { ClientService } from '../../services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };
  id: string;

  disabledBalanceOnAdd = true;

  @ViewChild('clientForm') form: any;

  constructor(
    private clientService: ClientService,
    private flashMessagesService: FlashMessagesService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.activeRoute.snapshot.params.id;
    this.clientService.getClient(this.id).subscribe( client => {
        if ( client ) {
          this.client = client;
        }
      }
    );
  }

  onSubmit(form) {

    if ( !this.form.valid ) {
      this.flashMessagesService.show('Please enter form', {
        timeout: 4000,
        cssClass: 'alert-danger'
      });
    } else {
      this.clientService.updateClient(this.client);
      this.flashMessagesService.show('Client updated succesfully', {
        timeout: 4000,
        cssClass: 'alert-success'
      });
      this.router.navigate([`/client/${this.id}`]);
    }
  }

}
