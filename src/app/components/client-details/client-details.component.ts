import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

//Services
import { ClientService } from "../../services/client.service";
import { FlashMessagesService } from "angular2-flash-messages";

//Modules
import { Client } from "../../models/Client";

//Router
import { Router } from "@angular/router";

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };
  currentRouteId: string;
  showBalanceUpdateInput: boolean;

  constructor(
    private clientServices: ClientService,
    public route: ActivatedRoute,
    public router: Router,
    public flashMessages: FlashMessagesService
  ) { }

  ngOnInit() {
    this.currentRouteId = this.route.snapshot.params.id;

    this.clientServices.getClient(this.currentRouteId).subscribe( client => {
      this.client = client;
    } )

  }

  deleteClient( client: Client ) {
    this.clientServices.deleteClient(client);
    // show message success
    this.flashMessages.show('Client deleted with success', {
      cssClass: 'alert-success',
      timeout: 4000
    });
    //Redirect
    this.router.navigate(['/'])
  };

  updateBalance() {
    this.clientServices.updateClient(this.client);
    this.flashMessages.show('Balance updated', {
      cssClass: 'alert-success', timeout: 4000
    })
    this.showBalanceUpdateInput = false;
  }

}
