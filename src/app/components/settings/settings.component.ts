import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  user: User;
  loading: boolean = false;

  constructor(private settingsService: SettingsService) { }

  ngOnInit() {
    this.loading = true;
    this.settingsService.getCurrentUserInformations().subscribe(
      response => {
        this.user = response.user;
        this.loading = false;
      }
    )
  }

}
